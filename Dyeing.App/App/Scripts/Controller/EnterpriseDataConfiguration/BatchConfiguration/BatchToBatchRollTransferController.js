app.controller("BatchToBatchRollTransferController", [
  "$scope",
  "$rootScope",
  "filterFilter",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$window",
  "BatchToBatchRollTransfer",
  "$timeout",
  function(
    $scope,
    $rootScope,
    filterFilter,
    $mdDialog,
    $mdToast,
    $q,
    $window,
    BatchToBatchRollTransfer,
    $timeout
  ) {
    $scope.BatchList = [];
    $scope.RollList = [];
    $scope.DestinationBatchNoList = [];
    $scope.IsAllChecked = false;
    $scope.DestinationRollList = [];

    $scope.ToggleAll = function() {
      // Determine what value we want to apply
      var target = !$scope.IsAllChecked;

      // Update header checkbox
      $scope.IsAllChecked = target;

      // Loop through rows
      angular.forEach($scope.RollList, function(r) {
        // Only change rows that are NOT locked
        if (!$scope.IsLockedRow(r)) {
          r.IsCheck = target ? 1 : 0;
        }
      });
    };

    $scope.SyncHeader = function() {
      if (!$scope.RollList || !$scope.RollList.length) {
        $scope.IsAllChecked = false;
        return;
      }

      var allChecked = true;
      var hasEditableRow = false;

      angular.forEach($scope.RollList, function(r) {
        // Only consider unlocked rows
        if (!$scope.IsLockedRow(r)) {
          hasEditableRow = true;

          if (Number(r.IsCheck) !== 1) {
            allChecked = false;
          }
        }
      });

      if (!hasEditableRow) {
        $scope.IsAllChecked = false;
      } else {
        $scope.IsAllChecked = allChecked;
      }
    };

    BatchToBatchRollTransfer.GetUnitAll($rootScope.UserId, function(data) {
      debugger;
      $scope.UnitList = data;

      if ($scope.UnitList.length == 1) {
        $scope.SourceUnit = $scope.UnitList[0];
      }
    });

    $scope.$watch("SourceUnit", function(newVal, oldVal) {
      if (!newVal) return;
      var newId = newVal.UnitId;
      var oldId = oldVal ? oldVal.UnitId : null;
      if (newId === oldId) return; // ✅ stops loop

      debugger;
      ClearTextFields();
      GetBatchNo();
    });

    function ClearTextFields() {
      debugger;
      $scope.BatchList = [];
      $scope.BatchNo = null;
      $scope.RollList = [];
      $scope.DestinationRollList = [];
      $scope.IsAllChecked = false;
      $scope.DestinationBatchNoList = [];
      $scope.DestinationBatchNo = null;
    }

    function GetBatchNo() {
      debugger;

      if ($scope.SourceUnit) {
        BatchToBatchRollTransfer.GetBatchNo($scope.SourceUnit.UnitId, function(
          data
        ) {
          debugger;
          $scope.BatchList = data;
        });
      } else {
        $scope.BatchList = [];
      }
    }

    $scope.Reset = function() {
      $scope.BatchNo = "";
      $scope.DestinationBatchNo = "";

      $scope.QRCode = "";

      $scope.RollList = [];
      $scope.DestinationRollList = [];

      $scope.IsAllChecked = false;

      $scope.DestinationMaxCompactingTime = 0;
    };

    $scope.enterBatchClick = function() {
      debugger;
      if (!$scope.BatchNo || !$scope.BatchNo.BatchNo) return;

      GetRollList(GetMainBatchNo($scope.BatchNo.BatchNo));
      GetDestinationBatchList($scope.BatchNo.BatchNo);
    };

    $scope.enterBatchClickDestination = function() {
      debugger;
      if (!$scope.DestinationBatchNo || !$scope.DestinationBatchNo.BatchNo)
        return;

      GetDestinationRollList(
        GetDestinationBatchNo($scope.DestinationBatchNo.BatchNo)
      );

      GetDestinationMaxCompactingTime(
        GetDestinationBatchNo($scope.DestinationBatchNo.BatchNo)
      );
    };

    function GetRollList(BatchNo) {
      if (!BatchNo) {
        $scope.RollList = [];
        $scope.IsAllChecked = false;
        return;
      }

      BatchToBatchRollTransfer.GetRollList(
        encodeURIComponent(BatchNo),
        function(data) {
          debugger;
          $scope.RollList = data || [];

          // ✅ Normalize IsCheck (force 0/1)
          $scope.RollList.forEach(function(r) {
            r.IsCheck = Number(r.IsCheck) === 1 ? 1 : 0;
          });

          // ✅ Set header checkbox based on row state
          $scope.IsAllChecked =
            $scope.RollList.length > 0 &&
            $scope.RollList.every(function(r) {
              return Number(r.IsCheck) === 1;
            });
        }
      );
    }

    function GetDestinationMaxCompactingTime(DestinationBatchNo) {
      if (!DestinationBatchNo) {
        $scope.DestinationMaxCompactingTime = 0;

        return;
      }

      BatchToBatchRollTransfer.DestinationMaxCompactingTime(
        $scope.DestinationBatchNo.BpmId,
        function(data) {
          debugger;
          console.log(data);
          $scope.DestinationMaxCompactingTime = data || 0;
        }
      );
    }

    function GetDestinationRollList(DestinationBatchNo) {
      if (!DestinationBatchNo) {
        $scope.DestinationRollList = [];

        return;
      }

      BatchToBatchRollTransfer.GetDestinationRollList(
        encodeURIComponent(DestinationBatchNo),
        function(data) {
          $scope.DestinationRollList = data || [];
        }
      );
    }

    function GetDestinationBatchList(BatchNo) {
      if (!BatchNo) {
        $scope.DestinationBatchNoList = [];
        return;
      }
      BatchToBatchRollTransfer.GetDestinationBatchList(
        encodeURIComponent(BatchNo),
        function(data) {
          $scope.DestinationBatchNoList = data || [];
        }
      );
    }

    function GetMainBatchNo() {
      debugger;
      return $scope.BatchNo && $scope.BatchNo.BatchNo
        ? $scope.BatchNo.BatchNo.split("+")[0]
        : "";
    }

    function GetDestinationBatchNo() {
      debugger;
      return $scope.DestinationBatchNo && $scope.DestinationBatchNo.BatchNo
        ? $scope.DestinationBatchNo.BatchNo.split("+")[0]
        : "";
    }

    $scope.IsLockedRow = function(row) {
      return (
        row.PresentStatus === "Store Received" ||
        row.PresentStatus === "Handovered"
      );
    };

    $scope.QRCodeEnter = function(event) {
      var code = event.which || event.keyCode; // works in all browsers
      if (code !== 13) return;

      event.preventDefault();

      if ($scope.QRCode) {
        GetRollListByQRCode($scope.QRCode);

        // optional: clear + focus again for next scan
        $scope.QRCode = "";
        $timeout(function() {
          var el = document.getElementById("QRCode");
          if (el) el.focus();
        }, 0);
      }
    };

    function GetRollListByQRCode(QRCode) {
      if (!QRCode) {
        $scope.RollList = [];
        $scope.IsAllChecked = false;
        return;
      }

      BatchToBatchRollTransfer.GetRollListByQRCode(
        encodeURIComponent(QRCode),
        function(data) {
          $scope.RollList = data || [];

          // ✅ Normalize IsCheck (force 0/1)
          $scope.RollList.forEach(function(r) {
            r.IsCheck = Number(r.IsCheck) === 1 ? 1 : 0;
          });

          // ✅ Set header checkbox based on row state
          $scope.IsAllChecked =
            $scope.RollList.length > 0 &&
            $scope.RollList.every(function(r) {
              return Number(r.IsCheck) === 1;
            });
        }
      );
    }

    $scope.Transfer = function() {
      var errors = [];

      if (!$scope.SourceUnit || !$scope.SourceUnit.UnitId)
        errors.push("Select Source Unit");
      if (!$scope.ToUnit || !$scope.ToUnit.UnitId)
        errors.push("Select Destination Unit");
      if (!$scope.BatchNo || !$scope.BatchNo.BatchNo)
        errors.push("Select Source Batch No");
      if (!$scope.DestinationBatchNo || !$scope.DestinationBatchNo.BatchNo)
        errors.push("Select Destination Batch No");

      if ($scope.DestinationMaxCompactingTime == 0)
        errors.push("Destination Compating Time is Zero.");

      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      var sourceBatch = GetMainBatchNo($scope.BatchNo.BatchNo);
      var destBatch = GetDestinationBatchNo($scope.DestinationBatchNo.BatchNo);

      if (!sourceBatch || !destBatch) errors.push("Invalid batch no");

      if (sourceBatch === destBatch)
        errors.push("Source and Destination batch cannot be same.");

      if (errors.length) {
        alert(errors.join("\n"));
        return;
      }

      var selected = ($scope.RollList || []).filter(function(r) {
        return !$scope.IsLockedRow(r) && Number(r.IsCheck) === 1;
      });

      if (!selected.length) {
        alert("No roll selected to transfer.");
        return;
      }

      debugger;

      debugger;
      // ✅ Build TVP rows with SlNo
      var BatchRollTransferObjList = selected.map(function(r, idx) {
        return {
          Id: idx + 1,
          SourceInspectionMasterId: r.SourceInspectionMasterId,
          SourceBpmId: r.SourceBpmId,
          SourceRollNo: r.SourceRollNo,
          SourceBodyPartId: r.SourceBodyPartId,
          SourceBodyPartName: r.SourceBodyPartName,
          SourceFabricTypeId: r.SourceFabricTypeId,
          SourceFabricType: r.SourceFabricType,
          SourceComposition: r.SourceComposition,
          SourceItemId: r.SourceItemId,
          SourceOperationTime: r.SourceOperationTime,
          DestinationBpmId: $scope.DestinationBatchNo.BpmId,
          UserId: $rootScope.UserId,
          SourcePackingListDetailsId: r.SourcePackingListDetailsId,
          SourceBatchGsmConfigId: r.SourceBatchGsmConfigId
        };
      });

      console.log(BatchRollTransferObjList);

      BatchToBatchRollTransfer.Transfer(
        BatchRollTransferObjList,
        function(res) {
          // refresh both sides
          GetRollList(sourceBatch);
          GetDestinationRollList(destBatch);

          // clear QR input for next work
          $scope.QRCode = "";

          alert("Transfer completed.");
        },
        function(err) {
          alert(err && err.message ? err.message : "Transfer failed.");
        }
      );
    };
  }
]);
