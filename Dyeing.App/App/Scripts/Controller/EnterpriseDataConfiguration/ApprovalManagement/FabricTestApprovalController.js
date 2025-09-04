app.controller("FabricTestApproval", [
  "$scope",
  "$window",
  "$rootScope",
  "$mdDialog",
  "ApprovalManagement",
  function($scope, $window, $rootScope, $mdDialog, ApprovalManagement) {
    debugger;

    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function(data) {
      debugger;
      $scope.AllUnitData = data;
      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        $scope.GetBatchNoByUnit();
      }
    });

    $scope.GetBatchNoByUnit = function() {
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

        $scope.CA = false;
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.RollData = [];
        $scope.RollData = [];
        $scope.OkAll = undefined;
        $scope.NotOkAll = undefined;
        defaultUser();
        $scope.ApproveTime = atDefaultOption;
        $scope.CAReason = "";

        $scope.GetBatchNoByUnitNew();
      }
    });

    $scope.$watch("batchType", function(newVal, oldVal) {
      if (newVal) {
        $scope.CA = false;
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.RollData = [];
        $scope.RollData = [];
        $scope.OkAll = undefined;
        $scope.NotOkAll = undefined;
        defaultUser();
        $scope.ApproveTime = atDefaultOption;
        $scope.CAReason = "";
        debugger;
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

    $scope.DefaultCheck = function() {
      var Ok = $scope.RollData.filter(x => x.Ok === true);
      var NotOk = $scope.RollData.filter(x => x.NotOk === true);

      if (Ok.length == $scope.RollData.length) {
        $scope.OkAll = true;
        $scope.NotOkAll = false;
      } else if (NotOk.length == $scope.RollData.length) {
        $scope.NotOkAll = true;
        $scope.OkAll = false;
      } else {
        $scope.OkAll = false;
        $scope.NotOkAll = false;
      }
    };
    let atDefaultOption = [{ id: 1, name: "1st Time" }];
    $scope.ApproveTime = atDefaultOption;
    $scope.CurrApproveTime = 1;
    $scope.getDataByBatchId = function() {
      // updated by Sujan Das on 10-08-2025

      if ($scope.batchType == "Bulk") {
        GetBatchDataOld();
      } else if ($scope.batchType == "New") {
        GetBatchDataNew();
      }
    };

    function GetBatchDataNew() {
      if ($scope.Batch.BpmId > 0) {
        let appTime = $scope.Batch.ApproveTime;
        let pAppTime = 0;
        if (appTime == "") appTime = 1;
        if (appTime < $scope.CurrApproveTime) pAppTime = appTime;

        $scope.BatchData = ApprovalManagement.GetAllTypeApprovalBatchDataNew(
          $scope.Batch.BpmId,
          "FabricTest",
          pAppTime,
          function(data) {
            $scope.BatchData = data.m_Item1[0];
            $scope.RollData = data.m_Item2;

            let appTime = parseInt(data.m_Item1[0].ApproveTime);
            $scope.CurrApproveTime = appTime;
            $scope.ApproveTime = atDefaultOption;

            let CoApprove =
              angular.isDefined(data.m_Item2[0].ComApproved) &&
              data.m_Item2[0].ComApproved != null
                ? data.m_Item2[0].ComApproved
                : null;
            $scope.CA = CoApprove != null && CoApprove == 1 ? true : false;

            $scope.CAReason =
              angular.isDefined(data.m_Item2[0].CAReason) &&
              data.m_Item2[0].CAReason != null
                ? data.m_Item2[0].CAReason
                : null;

            if (appTime > 1) {
              for (i = 2; i <= appTime; i++) {
                let model = {
                  id: i,
                  name:
                    i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                };
                let isExist = $scope.ApproveTime.filter(x => x.id == i);
                if (isExist.length == 0) $scope.ApproveTime.push(model);
              }
            }
            if (pAppTime > 0) $scope.Batch.ApproveTime = pAppTime;
            else $scope.Batch.ApproveTime = appTime;

            $scope.RollData = angular.forEach($scope.RollData, function(obj) {
              if (obj.ApprovalTime === undefined || obj.ApprovalTime == null)
                obj.ApprovalTime = 0;
              else obj.ApprovalTime = parseInt(obj.ApprovalTime);

              if (obj.Approved != null && obj.Approved == 1) {
                obj.Ok = true;
              } else if (obj.Approved != null && obj.Approved == 0) {
                obj.NotOk = true;
              } else {
                $scope.OkAll = true;
                obj.Ok = true;
              }
            });

            $scope.DefaultCheck();
            $scope.BatchData.ApprovedWeight = $scope.RollData.filter(
              x => x.Ok === true
            )
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
    }

    function GetBatchDataOld() {
      if ($scope.Batch.BpmId > 0) {
        let appTime = $scope.Batch.ApproveTime;
        let pAppTime = 0;
        if (appTime == "") appTime = 1;
        if (appTime < $scope.CurrApproveTime) pAppTime = appTime;

        $scope.BatchData = ApprovalManagement.GetAllTypeApprovalBatchData(
          $scope.Batch.BpmId,
          "FabricTest",
          pAppTime,
          function(data) {
            $scope.BatchData = data.m_Item1[0];
            $scope.RollData = data.m_Item2;

            let appTime = parseInt(data.m_Item1[0].ApproveTime);
            $scope.CurrApproveTime = appTime;
            $scope.ApproveTime = atDefaultOption;

            let CoApprove =
              angular.isDefined(data.m_Item2[0].ComApproved) &&
              data.m_Item2[0].ComApproved != null
                ? data.m_Item2[0].ComApproved
                : null;
            $scope.CA = CoApprove != null && CoApprove == 1 ? true : false;

            $scope.CAReason =
              angular.isDefined(data.m_Item2[0].CAReason) &&
              data.m_Item2[0].CAReason != null
                ? data.m_Item2[0].CAReason
                : null;

            if (appTime > 1) {
              for (i = 2; i <= appTime; i++) {
                let model = {
                  id: i,
                  name:
                    i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                };
                let isExist = $scope.ApproveTime.filter(x => x.id == i);
                if (isExist.length == 0) $scope.ApproveTime.push(model);
              }
            }
            if (pAppTime > 0) $scope.Batch.ApproveTime = pAppTime;
            else $scope.Batch.ApproveTime = appTime;

            $scope.RollData = angular.forEach($scope.RollData, function(obj) {
              if (obj.ApprovalTime === undefined || obj.ApprovalTime == null)
                obj.ApprovalTime = 0;
              else obj.ApprovalTime = parseInt(obj.ApprovalTime);

              if (obj.Approved != null && obj.Approved == 1) {
                obj.Ok = true;
              } else if (obj.Approved != null && obj.Approved == 0) {
                obj.NotOk = true;
              } else {
                $scope.OkAll = true;
                obj.Ok = true;
              }
            });

            $scope.DefaultCheck();
            $scope.BatchData.ApprovedWeight = $scope.RollData.filter(
              x => x.Ok === true
            )
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
    }

    $scope.OkCheck = function() {
      if ($scope.OkAll === true) {
        $scope.NotOkAll = true;
        $scope.OkAll = false;
        angular.forEach($scope.RollData, function(obj) {
          obj.Ok = false;
          obj.NotOk = true;
        });
      } else if ($scope.OkAll === false) {
        $scope.NotOkAll = false;
        $scope.OkAll = true;
        angular.forEach($scope.RollData, function(obj) {
          obj.Ok = true;
          obj.NotOk = false;
        });
      }
      $scope.BatchData.ApprovedWeight = $scope.RollData.filter(
        x => x.Ok === true
      )
        .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
        .toFixed(1);
    };

    $scope.NotOkCheck = function() {
      if ($scope.NotOkAll === true) {
        $scope.NotOkAll = false;
        $scope.OkAll = true;
        angular.forEach($scope.RollData, function(obj) {
          obj.Ok = true;
          obj.NotOk = false;
        });
      } else if ($scope.NotOkAll === false) {
        $scope.NotOkAll = true;
        $scope.OkAll = false;
        angular.forEach($scope.RollData, function(obj) {
          obj.Ok = false;
          obj.NotOk = true;
        });
      }
      $scope.BatchData.ApprovedWeight = $scope.RollData.filter(
        x => x.Ok === true
      )
        .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
        .toFixed(1);
    };

    $scope.CheckState = function(data) {
      if ((data = "CAOk")) {
        $scope.CA = angular.isDefined($scope.CA) ? $scope.CA : null;
        $scope.CA = $scope.CA == true ? false : true;
        $scope.CAReason = $scope.CA == false ? $scope.CAReason : "";
      }
    };

    $scope.ChangeState = function(flag, index) {
      if (flag == "Ok") {
        if ($scope.RollData[index].Ok == true) {
          $scope.RollData[index].NotOk = false;
          $scope.RollData[index].Ok = true;
          $scope.DefaultCheck();
        } else {
          $scope.RollData[index].NotOk = true;
          $scope.RollData[index].Ok = false;
          $scope.DefaultCheck();
        }
      } else if (flag == "NotOk") {
        if ($scope.RollData[index].NotOk == true) {
          $scope.RollData[index].Ok = false;
          $scope.RollData[index].NotOk = true;
          $scope.DefaultCheck();
        } else {
          $scope.RollData[index].Ok = true;
          $scope.RollData[index].NotOk = false;
          $scope.DefaultCheck();
        }
      }
      $scope.BatchData.ApprovedWeight = $scope.RollData.filter(
        x => x.Ok === true
      )
        .reduce((accumulator, x) => accumulator + x.RollWeight, 0)
        .toFixed(1);
    };

    $scope.actionDialog = function(action, dataModel) {
      let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
      if (appTime != $scope.Batch.ApproveTime) return;

      //if ($scope.CA = false && ($scope.CAReason = '' || $scope.CAReason == null)) return;

      $mdDialog
        .show(
          $mdDialog.dialogBox({
            locals: {
              model: objData(action)
            }
          })
        )
        .then(function(mode) {
          if (mode == "Save") {
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
          message: "Do you want to save Data?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      let SaveData = $scope.RollData.filter(
        x => x.Ok != null || x.NotOk != null
      );
      let New = angular.forEach(SaveData, function(obj) {
        if (obj.Ok == true) obj.Status = true;
        else if (obj.NotOk == true) obj.Status = false;

        delete obj.Ok;
        delete obj.NotOk;
        delete obj.ActualDia;
        delete obj.ActualGSM;
        delete obj.BodyPart;
        delete obj.RequiredDia;
        delete obj.RequiredGsm;
        delete obj.RollNo;
        delete obj.RollWeight;
      });

      let SendObj = {
        User: $rootScope.UserId,
        BpmId: $scope.Batch.BpmId,
        Process: "FABRIC",
        ApprovedTime: $scope.Batch.ApproveTime,
        ComApprove: $scope.CA == true ? 1 : 0,
        Reason: $scope.CAReason,
        MyProperty: New
      };

      if ($scope.batchType == "Bulk" || $scope.batchType == "Old") {
        ApprovalManagement.SaveUpdateApprovalData(SendObj, function(res) {
          if (res.ErrorMsg == null) {
            $rootScope.alert("Saved Successfully");
            SaveRefresh();
          } else $rootScope.alert(res.ErrorMsg);
        });
      } else if ($scope.batchType == "New") {
        ApprovalManagement.SaveUpdateApprovalDataNew(SendObj, function(res) {
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

      function SaveRefresh() {

         
          $scope.CA = false;
          $scope.Batch = "";

          $scope.BatchData = [];
          $scope.RollData = [];

          $scope.OkAll = undefined;
          $scope.NotOkAll = undefined;
          defaultUser();
          $scope.ApproveTime = atDefaultOption;
          $scope.CAReason = "";
      }

    function Refresh() {
      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        $scope.GetBatchNoByUnit();
      }
      $scope.CA = false;
      $scope.Batch = "";
      $scope.allBatch = [];
      $scope.BatchData = [];
      $scope.RollData = [];
 
      $scope.OkAll = undefined;
      $scope.NotOkAll = undefined;
      defaultUser();
      $scope.ApproveTime = atDefaultOption;
      $scope.CAReason = "";
    }
  }
]);
