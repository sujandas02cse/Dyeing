app.controller("MachineOperationConfigController", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$timeout",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "$location",
  "MachineOperationConfigFactory",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $timeout,
    $q,
    $parse,
    fileReader,
    $window,
    $location,
    MachineOperationConfigFactory
  ) {
    debugger;
    $scope.batchType = "New";
    $scope.IsEndMode = false;
    $scope.IsReadOnlyEndMode = false;
    $scope.IsHistoryView = false;

    $scope.PageTitle =
      $location.search().menuName || "M/C Operation Configuration";

    $scope.ParentTitle =
      $location.search().parentName || "Machine Data Configuration";

    debugger;
    $scope.machineType = GetMachineTypeFromMenu($scope.PageTitle);
    $scope.selectAll = false;

    function GetMachineTypeFromMenu(menuName) {
      debugger;
      if (!menuName) return "";

      var text = menuName.toLowerCase();

      if (text.indexOf("sueding") !== -1) return "Sueding";
      if (text.indexOf("shearing") !== -1) return "Shearing";
      if (text.indexOf("brush") !== -1) return "Brush";
      if (text.indexOf("squeezer") !== -1) return "Squeezer";

      if (text.indexOf("tumble") !== -1) return "Tumble";
      if (text.indexOf("dryer") !== -1) return "Dryer";
      if (text.indexOf("stenter") !== -1) return "Stenter";
      if (text.indexOf("slitting") !== -1) return "Slitting";

      if (text.indexOf("dyeing") !== -1) return "Dyeing";
      if (text.indexOf("compacting") !== -1) return "Compacting";

      return "";
    }

    MachineOperationConfigFactory.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    MachineOperationConfigFactory.GetMachineTypeId($scope.machineType, function(
      data
    ) {
      debugger;
      $scope.machineTypeId = data[0].MachineTypeId;
    });

    $scope.$watch("Unit", function(newVal, oldVal) {
      if (newVal) {
        clearTextFields();
        loadBatchList();
        loadMachineList();
      }
    });

    $scope.getDataByBatchId = function() {
      debugger;
      if (!$scope.McOperation || !$scope.McOperation.BatchNo) {
        return;
      }

      resetBatchWiseFields();
      GetBatchBasicInfo();
      // GetOperationTime();
      debugger;
      LoadCurrentStatus();
    };

    function LoadCurrentStatus() {
      debugger;

      MachineOperationConfigFactory.LoadCurrentStatus(
        $scope.McOperation.BatchNo.BpmId,
        $scope.machineTypeId,
        function(data) {
          debugger;
          if (data && data.length > 0) {
            var row = data[0];
            $scope.McOperation.Mode = data[0].Mode;
            $scope.IsEndMode = row.Mode === "EndMode";
            $scope.IsReadOnlyEndMode = row.Mode === "EndMode";

            if ($scope.McOperation.Mode == "StartMode") {
              $scope.IsEndMode = false;
              $scope.IsReadOnlyEndMode = false;
              $scope.McOperation.BatchStart = "";
              $scope.McOperation.BatchEnd = "";

              //GetBodyPartDetails();
              LoadBodyPartStatus(null);

              GetOperationTime();
            } else if ($scope.McOperation.Mode == "EndMode") {
              debugger;
              $scope.McOperation.BatchStart = data[0].BatchStart;
              $scope.McOperation.BatchEnd = data[0].BatchEnd;
              $scope.McOperation.OperationTime = data[0].OperationTime;
              $scope.McOperation.OperationTimeName = data[0].OperationTimeName;

              /* tag the right inspected machine*/
              if (
                row.MDId &&
                $scope.MachineList &&
                $scope.MachineList.length > 0
              ) {
                var selectedMachine = $scope.MachineList.find(function(m) {
                  return m.MDId == row.MDId;
                });

                $scope.McOperation.MachineNo = selectedMachine || null;
              } else {
                $scope.McOperation.MachineNo = null;
              }

              /*  //load operation time dropdown with only current time*/

              $scope.OperationTimeList = [
                {
                  OperationTime: row.OperationTime,
                  OperationTimeName: row.OperationTimeName
                }
              ];

              // load body part details and auto-check previous selected items
              //GetBodyPartDetailsForEndMode(row.Id);

              LoadBodyPartStatus(row.Id);
            }
          }
        }
      );
    }

    function LoadBodyPartStatus(mcOperationMasterId) {
      debugger;
      var mdId =
        $scope.McOperation &&
        $scope.McOperation.MachineNo &&
        $scope.McOperation.MachineNo.MDId
          ? $scope.McOperation.MachineNo.MDId
          : null;

      MachineOperationConfigFactory.GetBatchBodyPartStatus(
        $scope.McOperation.BatchNo.BpmId,
        mdId,
        mcOperationMasterId || null,
        $scope.machineTypeId,
        function(data) {
          if (data) {
            debugger;
            $scope.fabricList = data;

            angular.forEach($scope.fabricList, function(item) {
              item.selected = item.IsSelected === true || item.IsSelected === 1;

              item.isDisabled =
                item.IsDisabled === true || item.IsDisabled === 1;
            });

            /*$scope.checkIfAllSelected();*/
            syncHeaderCheckbox();
          }
        }
      );
    }

    function GetBodyPartDetailsForEndMode(mcOperationMasterId) {
      debugger;

      MachineOperationConfigFactory.GetBodyPartDetailsForEndMode(
        $scope.McOperation.BatchNo.BpmId,
        mcOperationMasterId,
        function(data) {
          if (data) {
            $scope.fabricList = data;

            angular.forEach($scope.fabricList, function(item) {
              item.selected =
                item.selected === true ||
                item.IsSelected === 1 ||
                item.IsSelected === true;
            });

            /*   $scope.checkIfAllSelected();*/
          }
        }
      );
    }

    function clearTextFields() {
      if (!$scope.McOperation) {
        $scope.McOperation = {};
      }
      $scope.McOperation.BuyerName = "";
      $scope.McOperation.StyleName = "";
      $scope.McOperation.OrderName = "";
      $scope.McOperation.ColorName = "";
      $scope.McOperation.Fabric = "";
      $scope.McOperation.BatchNo = "";
      $scope.McOperation.MachineNo = "";
      $scope.McOperation.JobName = "";

      $scope.McOperation.OperationTimeList = [];
      $scope.McOperation.OperationTime = 0;

      $scope.fabricList = [];

      $scope.McOperation.BatchStart = "";
      $scope.McOperation.BatchEnd = "";
      $scope.IsEndMode = false;
      $scope.IsReadOnlyEndMode = false;
      $scope.selectAll = false;
    }

    function loadBatchList() {
      debugger;
      if ($scope.Unit && $scope.batchType) {
        MachineOperationConfigFactory.GetBatchNoListUnitStatusWise(
          $scope.batchType,
          $scope.Unit.UnitId,
          function(data) {
            debugger;
            $scope.batchList = data;
          }
        );
      }
    }

    function loadMachineList() {
      if ($scope.Unit) {
        MachineOperationConfigFactory.GetFinMcByTypeUnitWise(
          GetMachineTypeFromMenu($scope.PageTitle),
          $scope.Unit.UnitId,
          function(dataNew) {
            $scope.MachineList = dataNew;
            if ($scope.MachineList.length == 1) {
              $scope.McOperation.MachineNo = $scope.MachineList[0];
            }
          }
        );
      }
    }

    $scope.toggleAll = function($event) {
      if ($scope.IsReadOnlyEndMode || $scope.IsHistoryView) {
        return;
      }

      var shouldCheck = $event.target.checked;

      angular.forEach($scope.fabricList, function(item) {
        if (!item.isDisabled) {
          item.selected = shouldCheck;
        }
      });

      syncHeaderCheckbox();
    };

    $scope.checkIfAllSelected = function() {
      syncHeaderCheckbox();
    };
    $window.document.title = $scope.PageTitle;

    $scope.Refresh = function() {
      ClearData();
    };

    function ClearData() {
      $scope.McOperation = {};
     /* document.getElementById("batch").focus();*/
    }

    function resetBatchWiseFields() {
      $scope.McOperation.ColorName = "";
      $scope.McOperation.JobName = "";
      $scope.McOperation.StyleName = "";
      $scope.McOperation.OrderName = "";
      $scope.McOperation.BatchStart = "";
      $scope.McOperation.BatchEnd = "";
      $scope.fabricList = [];
      $scope.OperationTimeList = [];

      $scope.IsEndMode = false;
      $scope.IsReadOnlyEndMode = false;
      $scope.selectAll = false;
    }

    function GetBatchBasicInfo() {
      debugger;

      MachineOperationConfigFactory.GetBatchBasicInfo(
        $scope.McOperation.BatchNo.BpmId,
        $scope.Unit.UnitId,
        function(data) {
          if (data) {
            debugger;
            $scope.McOperation.ColorName = data[0].ColorName || "";
            $scope.McOperation.JobName = data[0].JobName || "";
            $scope.McOperation.StyleName = data[0].StyleName || "";
            $scope.McOperation.OrderName = data[0].OrderName || "";
          } else {
            $scope.McOperation.ColorName = "";
            $scope.McOperation.JobName = "";
            $scope.McOperation.StyleName = "";
            $scope.McOperation.OrderName = "";
          }
        }
      );
    }

    function GetBodyPartDetails() {
      MachineOperationConfigFactory.GetBodyPartDetails(
        $scope.McOperation.BatchNo.BpmId,
        function(data) {
          if (data) {
            $scope.fabricList = data;

            angular.forEach($scope.fabricList, function(item) {
              item.selected = false;
              item.isDisabled =
                item.IsOccpied === true || item.IsOccupied === 1;
            });

            $scope.selectAll = false;
          }
        }
      );
    }

    function GetOperationTime() {
      debugger;

      MachineOperationConfigFactory.GetOperationTime(
        $scope.McOperation.BatchNo.BpmId,
        $scope.machineTypeId,
        function(data) {
          if (data && data.length > 0) {
            $scope.OperationTimeList = data;

            $scope.McOperation.OperationTime =
              data[data.length - 1].OperationTime;
            $scope.McOperation.OperationTimeName =
              data[data.length - 1].OperationTimeName;

            $scope.IsHistoryView = false;
            $scope.McOperation.BatchStart = "";
            $scope.McOperation.BatchEnd = "";
            $scope.McOperation.MachineNo = null;
          } else {
            $scope.OperationTimeList = [];
            $scope.McOperation.OperationTime = null;
            $scope.McOperation.BatchStart = "";
            $scope.McOperation.BatchEnd = "";
            $scope.IsHistoryView = false;
          }
        }
      );
    }

    $scope.OperationTimeChanged = function() {
      if ($scope.IsReadOnlyEndMode) return;

      var selectedTime = $scope.McOperation.OperationTime;
      var lastItem =
        $scope.OperationTimeList[$scope.OperationTimeList.length - 1];

      //if (!lastItem) {
      //  var lastTime = lastItem.OperationTime;
      //  }

      if (!lastItem) return;
      var lastTime = lastItem.OperationTime;

      // user selected "Select"
      if (!selectedTime) {
        $rootScope.alert("Please select a valid Operation Time");

        // move back to latest time
        $scope.McOperation.OperationTime = lastItem.OperationTime;
        $scope.McOperation.OperationTimeName = lastItem.OperationTimeName;

        // IMPORTANT: force fresh mode
        $scope.IsHistoryView = false;
        $scope.McOperation.BatchStart = "";
        $scope.McOperation.BatchEnd = "";
        $scope.McOperation.MachineNo = null;
        $scope.selectAll = false;

        // GetBodyPartDetails(); // reload fresh body parts
        LoadBodyPartStatus(null);

        return;
      }

      // latest time = fresh mode
      if (selectedTime == lastTime) {
        $scope.IsHistoryView = false;
        $scope.McOperation.BatchStart = "";
        $scope.McOperation.BatchEnd = "";
        $scope.McOperation.MachineNo = null;
        $scope.selectAll = false;

        // GetBodyPartDetails(); // reload fresh body parts
        LoadBodyPartStatus(null);

        return;
      }

      // old time = history mode
      LoadOldOperationHistory();
    };

    function LoadOldOperationHistory() {
      debugger;
      MachineOperationConfigFactory.GetOperationHistoryByTime(
        $scope.McOperation.BatchNo.BpmId,
        $scope.McOperation.OperationTime,
        $scope.machineTypeId,

        function(data) {
          debugger;
          var row = data[0];

          $scope.IsHistoryView = true;
          $scope.McOperation.BatchStart = row.BatchStart;
          $scope.McOperation.BatchEnd = row.BatchEnd;

          if (row.MDId && $scope.MachineList && $scope.MachineList.length > 0) {
            var selectedMachine = $scope.MachineList.find(function(m) {
              return m.MDId == row.MDId;
            });
            $scope.McOperation.MachineNo = selectedMachine || null;
          } else {
            $scope.McOperation.MachineNo = null;
          }

          GetBodyPartDetailsForEndMode(row.Id);
        }
      );
    }

    function objData(action) {
      var obj = [];

      if (action === "Save") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to save..?"
        };
      } else if (action === "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update..?"
        };
      }

      return obj;
    }

    $scope.actionDialog = function(action) {
      var selectedItems = ValidateBeforeSave();
      if (!selectedItems) return;

      $mdDialog
        .show(
          $mdDialog.dialogBox({
            locals: {
              model: objData(action)
            }
          })
        )
        .then(function(mode) {
          if (mode === "Save" || mode === "Update") {
            debugger;
            SaveUpdate(selectedItems);
          }
        });
    };

    function ValidateBeforeSave() {
      if (!$scope.Unit || !$scope.Unit.UnitId) {
        $rootScope.alert("Please select Unit");
        return null;
      }

      if (
        !$scope.McOperation ||
        !$scope.McOperation.BatchNo ||
        !$scope.McOperation.BatchNo.BpmId
      ) {
        $rootScope.alert("Please select Batch");
        return null;
      }

      if (!$scope.McOperation.MachineNo || !$scope.McOperation.MachineNo.MDId) {
        $rootScope.alert("Please select M/C No");
        return null;
      }

      if (
        !$scope.McOperation.OperationTime ||
        !$scope.McOperation.OperationTimeName
      ) {
        $rootScope.alert("Please select Operation Time");
        return null;
      }

      var selectedItems = [];

      if ($scope.McOperation.Mode !== "EndMode") {
        selectedItems = ($scope.fabricList || []).filter(function(x) {
          return x.selected === true && !x.isDisabled;
        });

        if (selectedItems.length === 0) {
          $rootScope.alert("Please select at least one body part");
          return null;
        }

        var invalidQty = selectedItems.some(function(item) {
          return !item.ActualQty || Number(item.ActualQty) <= 0;
        });

        if (invalidQty) {
          $rootScope.alert(
            "Please enter valid Actual Qty for selected body part(s)"
          );
          return null;
        }
      }

      return selectedItems;
    }

    function SaveUpdate(selectedItems) {
      debugger;

      //if (!$scope.Unit || !$scope.Unit.UnitId) {
      //  $rootScope.alert("Please select Unit");
      //  return;
      //}

      //if (
      //  !$scope.McOperation ||
      //  !$scope.McOperation.BatchNo ||
      //  !$scope.McOperation.BatchNo.BpmId
      //) {
      //  $rootScope.alert("Please select Batch");
      //  return;
      //}

      //if (!$scope.McOperation.MachineNo || !$scope.McOperation.MachineNo.MDId) {
      //  $rootScope.alert("Please select M/C No");
      //  return;
      //}

      //var selectedItems = [];
      //if ($scope.McOperation.Mode !== "EndMode") {
      //  var selectedItems = ($scope.fabricList || []).filter(function(x) {
      //    return x.selected === true && !x.isDisabled;
      //  });

      //  if (selectedItems.length === 0) {
      //    $rootScope.alert("Please select at least one body part");
      //    return;
      //  }
      //}

      //var invalidQty = selectedItems.some(function(item) {
      //  return (
      //    item.ActualQty === null ||
      //    item.ActualQty === undefined ||
      //    item.ActualQty <= 0
      //  );
      //});

      //if (invalidQty) {
      //  $rootScope.alert(
      //    "Please enter valid Actual Qty for selected body part(s)"
      //  );
      //  return;
      //}

      var Obj = {
        BpmId: $scope.McOperation.BatchNo.BpmId,
        MDId: $scope.McOperation.MachineNo.MDId,
        BatchTime: new Date(),
        CreatedBy: $rootScope.UserId,
        HostIP: "",
        OperationTimeName: $scope.McOperation.OperationTimeName,
        MachineTypeId: $scope.machineTypeId,
        Details: selectedItems.map(function(item) {
          return {
            BodyPartId: item.BodyPartId,
            Quantity: item.ActualQty || 0
          };
        })
      };

      console.log("Save payload:", Obj);

      MachineOperationConfigFactory.SaveMachineOperationConfig(Obj, function(
        data
      ) {
        console.log("API response:", data);

        if (data && data.response === true) {
          $rootScope.alert(data.Msg || "Saved successfully");
          ClearData();
        } else {
          $rootScope.alert(
            (data && (data.Msg || data.ErrorMsg)) || "Couldn't save this data."
          );
        }
      });
    }

    $scope.Refresh = function() {
      ClearData();
    };

    function ClearData() {
      $scope.McOperation = {};
      $scope.fabricList = [];
      $scope.OperationTimeList = [];
      $scope.selectAll = false;
      $scope.btnSave = "Save";

      var batchBox = document.getElementById("batch");
      if (batchBox) {
       /* batchBox.focus();*/
      }
    }

    function syncHeaderCheckbox() {
      var selectAllCheckbox = document.getElementById("selectAll");
      if (!selectAllCheckbox) return;

      var enabledItems = ($scope.fabricList || []).filter(function(x) {
        return !x.isDisabled;
      });

      var total = enabledItems.length;
      var checked = enabledItems.filter(function(x) {
        return x.selected;
      }).length;

      if (total === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
        return;
      }

      selectAllCheckbox.checked = checked === total;
      selectAllCheckbox.indeterminate = checked > 0 && checked < total;
    }
  }
]);
