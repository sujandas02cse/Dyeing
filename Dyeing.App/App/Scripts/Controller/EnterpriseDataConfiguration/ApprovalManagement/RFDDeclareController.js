app.controller("RFDDeclare", [
  "$scope",
  "$window",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "ApprovalManagement",
  function(
    $scope,
    $window,
    $rootScope,
    $mdDialog,
    $mdToast,
    ApprovalManagement
  ) {
    ///get all Unit Data
    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function(data) {
      $scope.AllUnitData = data;

      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        //$scope.GetDyeingUnit();
        $scope.GetBatchNoByUnitNew();
      }
    });

    ///get all batch data function calling from Unit
    $scope.GetDyeingUnit = function() {
      $scope.allBatch = ApprovalManagement.GetBatchNoByUnit(
        $scope.Unit.UnitId,
        function(data) {
          $scope.allBatch = data;
        }
      );
    };

    $scope.GetBatchNoByUnitNew = function() {
      debugger;
      if ($scope.Unit && $scope.batchType) {
        $scope.allBatch = ApprovalManagement.GetBatchNoByUnitNew(
          $scope.batchType,
          $scope.Unit.UnitId,
          function(data) {
            $scope.allBatch = data;
          }
        );
      }
    };

    $scope.$watch("Unit", function(newVal, oldVal) {
      if (newVal) {
        debugger;
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.allRollData = [];
        defaultUser();

        $scope.GetBatchNoByUnitNew();
      }
    });

    $scope.$watch("batchType", function(newVal, oldVal) {
      if (newVal) {
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.allRollData = [];
        defaultUser();
        $scope.GetBatchNoByUnitNew();
      }
    });

    defaultUser();
    function defaultUser() {
      $scope.Emp = {
        Id: $rootScope.UserId,
        Name: $rootScope.EmpName,
        Designation: $rootScope.Designation
      };
    }

    let atDefaultOption = [{ id: 1, name: "1st Time" }];
    $scope.ApproveTime = atDefaultOption;
    $scope.CurrApproveTime = 1;

    ///Get all Roll Data Function Calling from Batch
    $scope.getDataByBatchId = function() {
      if ($scope.batchType == "Bulk" || $scope.batchType == "Old") {
        GetBatchDataOld();
      } else if ($scope.batchType == "New") {
        GetBatchDataNew();
      }
    };

    function GetBatchDataOld() {
      let appTime = $scope.Batch.ApproveTime;
      let pAppTime = 0;
      if (appTime == "") appTime = 1;
      if (appTime < $scope.CurrApproveTime) pAppTime = appTime;
      ApprovalManagement.GetAllTypeApprovalBatchData(
        $scope.Batch.BpmId,
        "RFD",
        pAppTime,
        function(data) {
          $scope.BatchData = data.m_Item1[0];
          $scope.allRollData = data.m_Item2;

          let appTime = parseInt(data.m_Item1[0].ApproveTime);
          $scope.CurrApproveTime = appTime;
          $scope.ApproveTime = atDefaultOption;

          if (appTime > 1) {
            for (i = 2; i <= appTime; i++) {
              let model = {
                id: i,
                name: i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
              };
              let isExist = $scope.ApproveTime.filter(x => x.id == i);
              if (isExist.length == 0) $scope.ApproveTime.push(model);
            }
          }

          if (pAppTime > 0) $scope.Batch.ApproveTime = pAppTime;
          else $scope.Batch.ApproveTime = appTime;

          $scope.allRollData = angular.forEach($scope.allRollData, function(
            obj
          ) {
            obj.QualityApproved =
              obj.QualityApproved != null && obj.QualityApproved == 1
                ? true
                : false;
            obj.FabricTestApproved =
              obj.FabricTestApproved != null && obj.FabricTestApproved == 1
                ? true
                : false;
            obj.ShadeApproved =
              obj.ShadeApproved != null && obj.ShadeApproved == 1
                ? true
                : false;
            obj.RFDApproved =
              obj.RFDApproved != null && obj.RFDApproved == 1 ? true : false;
          });
          let approvedRow = $scope.allRollData.filter(
            x => x.RFDApproved == true
          ).length;
          let totalRow = $scope.allRollData.length;
          if (approvedRow == totalRow) $scope.CheckAll = true;
          else $scope.CheckAll = false;

          $scope.BatchData.ApprovedWeight = $scope.allRollData
            .filter(x => x.RFDApproved === true)
            .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
            .toFixed(1);

          let LastAppTime =
            $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
          if (LastAppTime != $scope.Batch.ApproveTime) {
            $scope.Emp = data.m_Item3[0];
          } else {
            defaultUser();
          }
        }
      );
    }

    function GetBatchDataNew() {
      let appTime = $scope.Batch.ApproveTime;
      let pAppTime = 0;
      if (appTime == "") appTime = 1;
      if (appTime < $scope.CurrApproveTime) pAppTime = appTime;
      debugger;

      ApprovalManagement.GetAllTypeApprovalBatchDataNew(
        $scope.Batch.BpmId,
        "RFD",
        pAppTime,
        function(data) {
          debugger;
          $scope.BatchData = data.m_Item1[0];
          $scope.allRollData = data.m_Item2;

          let appTime = parseInt(data.m_Item1[0].ApproveTime);
          $scope.CurrApproveTime = appTime;
          $scope.ApproveTime = atDefaultOption;

          if (appTime > 1) {
            for (i = 2; i <= appTime; i++) {
              let model = {
                id: i,
                name: i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
              };
              let isExist = $scope.ApproveTime.filter(x => x.id == i);
              if (isExist.length == 0) $scope.ApproveTime.push(model);
            }
          }

          if (pAppTime > 0) $scope.Batch.ApproveTime = pAppTime;
          else $scope.Batch.ApproveTime = appTime;

          $scope.allRollData = angular.forEach($scope.allRollData, function(
            obj
          ) {
            obj.QualityApproved =
              obj.QualityApproved != null && obj.QualityApproved == 1
                ? true
                : false;
            obj.FabricTestApproved =
              obj.FabricTestApproved != null && obj.FabricTestApproved == 1
                ? true
                : false;
            obj.ShadeApproved =
              obj.ShadeApproved != null && obj.ShadeApproved == 1
                ? true
                : false;
            obj.RFDApproved =
              obj.RFDApproved != null && obj.RFDApproved == 1 ? true : false;
          });
          let approvedRow = $scope.allRollData.filter(
            x => x.RFDApproved == true
          ).length;
          let totalRow = $scope.allRollData.length;
          if (approvedRow == totalRow) $scope.CheckAll = true;
          else $scope.CheckAll = false;

          $scope.BatchData.ApprovedWeight = $scope.allRollData
            .filter(x => x.RFDApproved === true)
            .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
            .toFixed(1);

          let LastAppTime =
            $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
          if (LastAppTime != $scope.Batch.ApproveTime) {
            $scope.Emp = data.m_Item3[0];
          } else {
            defaultUser();
          }
        }
      );
    }

    ///all check Function
    $scope.allCheck = function(CheckAll) {
      if (CheckAll === false) {
        angular.forEach($scope.allRollData, function(obj) {
          obj.RFDApproved = true;
          $scope.CheckAll = true;
        });
      } else if ((CheckAll = true)) {
        angular.forEach($scope.allRollData, function(obj) {
          obj.RFDApproved = false;
          $scope.CheckAll = false;
        });
      }
      $scope.BatchData.ApprovedWeight = $scope.allRollData
        .filter(x => x.RFDApproved === true)
        .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
        .toFixed(1);
    };

    $scope.ChangeState = function(index) {
      if (index != undefined || index != 0) {
        $scope.allRollData[index].RFDApproved =
          $scope.allRollData[index].RFDApproved === true ? true : false;
        //$scope.CheckAll = false;
        let approvedRow = $scope.allRollData.filter(x => x.RFDApproved == true)
          .length;
        let totalRow = $scope.allRollData.length;
        if (approvedRow == totalRow) $scope.CheckAll = true;
        else $scope.CheckAll = false;
      }
      $scope.BatchData.ApprovedWeight = $scope.allRollData
        .filter(x => x.RFDApproved === true)
        .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
        .toFixed(1);
    };

    $scope.actionDialog = function(action, dataModel) {
      let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
      if (appTime != $scope.Batch.ApproveTime) return;

      let recRFD = $scope.allRollData.filter(x => x.RFDApproved == true);
      if (recRFD.length == 0) {
        $rootScope.alert("Please! Select Approval Checkbox....");
        return;
      }

      $mdDialog
        .show(
          $mdDialog.dialogBox({
            locals: {
              model: objData(action)
            }
          })
        )
        .then(function(mode) {
          if (mode == "Update" || mode == "Save") {
            SaveUpdate();
          }
        });
    };

    function objData(action) {
      var obj = [];
      if (action == "Save") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to save RFD Approval Data?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update RFD Approval Data?"
        };
      }

      return obj;
    }

    function SaveUpdate() {
      debugger;
      var sendData = [];
      let SaveData = $scope.allRollData.filter(x => x.RFDApproved != null);
      sendData = SaveData.map(function(obj) {
        return {
          InsMasterId: obj.InsMasterId,
          QualityApproved: obj.QualityApproved,
          FabricTestApproved: obj.FabricTestApproved,
          ShadeApproved: obj.ShadeApproved,
          RFDApproved: obj.RFDApproved
        };
      });

      let SendObj = {
        UserId: $rootScope.UserId,
        BpmId: $scope.Batch.BpmId,
        ApprovedTime: $scope.Batch.ApproveTime,
        details: sendData
      };

      if ($scope.batchType == "Bulk" || $scope.batchType == "Old") {
        ApprovalManagement.SaveUpdateRFDApproval(SendObj, function(res) {
          if (res.ErrorMsg == null) {
            $rootScope.alert("Saved Successfully");
            SaveRefresh();
          } else $rootScope.alert(res.ErrorMsg);
        });
      } else if ($scope.batchType == "New") {
        ApprovalManagement.SaveUpdateRFDApprovalNew(SendObj, function(res) {
          if (res.ErrorMsg == null) {
            $rootScope.alert("Saved Successfully");
            SaveRefresh();
          } else $rootScope.alert(res.ErrorMsg);
        });
      }
    }

    $scope.Refresh = function() {
      Refresh();
    };
    function Refresh() {
      //ApprovalManagement.GetDyeingUnit($rootScope.UserId);
      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        $scope.GetDyeingUnit();
      }
      $scope.Batch = "";
      $scope.allBatch = [];
      $scope.BatchData = [];
      $scope.allRollData = [];
      defaultUser();
    }

    function SaveRefresh() {
      //if ($scope.AllUnitData.length == 1) {
      //  $scope.Unit = $scope.AllUnitData[0];
      //   $scope.GetDyeingUnit();
      //  }

      $scope.GetBatchNoByUnitNew();

      $scope.Batch = "";

      $scope.BatchData = [];
      $scope.allRollData = [];
      defaultUser();
    }
  }
]);
