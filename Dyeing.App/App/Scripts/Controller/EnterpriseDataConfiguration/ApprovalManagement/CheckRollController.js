app.controller("CheckRoll", [
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
    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function(data) {
      $scope.AllUnitData = data;
      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        // $scope.GetDyeingUnit();
        $scope.GetBatchNoByUnitNew();
      }
    });

    ///get all batch data function calling from Unit
    $scope.GetDyeingUnit = function() {
      $scope.allBatch = ApprovalManagement.GetCRApprovalBatchList(
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
        SaveRefresh();

        $scope.GetBatchNoByUnitNew();
      }
    });

    $scope.$watch("batchType", function(newVal, oldVal) {
      if (newVal) {
        SaveRefresh();
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

    $scope.ReasonText = function() {
      //$scope.FTReason = $scope.FTAN == true ? $scope.FTReason : "";
      $scope.CAReason = $scope.CA == true ? $scope.CAReason : "";
      $scope.CRAReason = $scope.CRAN == true ? $scope.CRAReason : "";
    };

    ///get all Unit Data

    let atDefaultOption = [{ id: 1, name: "1st Time" }];
    $scope.ApproveTime = atDefaultOption;
      $scope.CurrApproveTime = 1;



    $scope.getDataByBatchId = function() {
      let appTime = $scope.Batch.ApproveTime;
      let pAppTime = 0;
      if (appTime == "") appTime = 1;
      if (appTime < $scope.CurrApproveTime) pAppTime = appTime;

        debugger;
        if ($scope.batchType == "Bulk" || $scope.batchType == "Old") {
            ApprovalManagement.GetAllTypeApprovalBatchData(
                $scope.Batch.BpmId,
                "CheckRoll",
                pAppTime,
                function (data) {
                    debugger;
                    $scope.BatchData = data.m_Item1[0];
                    let apRec = data.m_Item2;

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

                    let LastAppTime =
                        $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
                    if (LastAppTime != $scope.Batch.ApproveTime) {
                        $scope.Emp = data.m_Item3[0];
                    } else {
                        defaultUser();
                    }

                    debugger;
                    //$scope.FTA = apRec[0].FTApproved = undefined ? null : apRec[0].FTApproved;
                    $scope.CRA = apRec[0].CRollApproved = undefined
                        ? false
                        : apRec[0].CRollApproved;
                    $scope.CA = apRec[0].ComApproved = undefined
                        ? false
                        : apRec[0].ComApproved;

                    //$scope.FTReason = apRec[0].FTReason;
                    $scope.CRAReason = apRec[0].CRAReason;
                    $scope.CAReason = apRec[0].CAReason;

                    if ($scope.CRA == 1) {
                        $scope.CRA = true;
                        $scope.CRAN = false;
                    }
                    if ($scope.CA == 1) $scope.CA = true;
                    if ($scope.CRA == 0) {
                        $scope.CRA = false;
                        $scope.CRAN = true;
                    }
                    if ($scope.CA == 0 || $scope.CA == null) $scope.CA = false;
                    if ($scope.CRA == null) {
                        $scope.CRA = false;
                        $scope.CRAN = false;
                    }
                    //$scope.FTA = ($scope.FTA == null) ?
                    //    ($scope.FTAN = false, $scope.FTA = false) : (($scope.FTA == 0 || $scope.FTA==false) ? ($scope.FTAN = true, $scope.FTA = false):($scope.FTAN = false, $scope.FTA = true));
                    //$scope.CRA = ($scope.CRA == null) ?
                    //    ($scope.CRAN = false, $scope.CRA = false) : (($scope.CRA == 0 || $scope.CRAN == false) ? ($scope.CRAN = true, $scope.CRA = false) : ($scope.CRAN = false, $scope.CRA = true));
                    //$scope.CA = ($scope.CA == null) ?
                    //    ($scope.CA = false) : (($scope.CA == 0 || $scope.CA==false) ? ($scope.CA = false):($scope.CA = true));

                    $scope.ReasonText();
                }
            );
        }
        else if ($scope.batchType == "New") {
            debugger;
            ApprovalManagement.GetAllTypeApprovalBatchDataNew(
                $scope.Batch.BpmId,
                "CheckRoll",
                pAppTime,
                function (data) {
                    debugger;
                    $scope.BatchData = data.m_Item1[0];
                    let apRec = data.m_Item2;

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

                    let LastAppTime =
                        $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
                    if (LastAppTime != $scope.Batch.ApproveTime) {
                        $scope.Emp = data.m_Item3[0];
                    } else {
                        defaultUser();
                    }

                    debugger;
                    //$scope.FTA = apRec[0].FTApproved = undefined ? null : apRec[0].FTApproved;
                    $scope.CRA = apRec[0].CRollApproved = undefined
                        ? false
                        : apRec[0].CRollApproved;
                    $scope.CA = apRec[0].ComApproved = undefined
                        ? false
                        : apRec[0].ComApproved;

                    //$scope.FTReason = apRec[0].FTReason;
                    $scope.CRAReason = apRec[0].CRAReason;
                    $scope.CAReason = apRec[0].CAReason;

                    if ($scope.CRA == 1) {
                        $scope.CRA = true;
                        $scope.CRAN = false;
                    }
                    if ($scope.CA == 1) $scope.CA = true;
                    if ($scope.CRA == 0) {
                        $scope.CRA = false;
                        $scope.CRAN = true;
                    }
                    if ($scope.CA == 0 || $scope.CA == null) $scope.CA = false;
                    if ($scope.CRA == null) {
                        $scope.CRA = false;
                        $scope.CRAN = false;
                    }
                 
                    $scope.ReasonText();
                }
            );
        }

    };

    $scope.CheckState = function(data) {
      switch (data) {
        //case "FTAOk":
        //    $scope.FTA = $scope.FTA == true ? false : true;
        //    $scope.FTAN = false;
        //    $scope.ReasonText();
        //    break;
        //case "FTANotOk":
        //    $scope.FTA = false;
        //    $scope.FTAN = $scope.FTAN == true ? false : true;
        //    $scope.ReasonText();
        //    break;

        case "CROk":
          $scope.CRA = $scope.CRA == true ? false : true;
          $scope.CRAN = false;
          $scope.ReasonText();
          break;
        case "CRNotOk":
          $scope.CRA = false;
          $scope.CRAN = $scope.CRAN == true ? false : true;
          $scope.ReasonText();
          break;
        case "CAOk":
          $scope.CA = $scope.CA == true ? false : true;
          $scope.CAN = false;
          $scope.ReasonText();
          break;
        //case "CANotOk":
        //    $scope.CA = false;
        //    $scope.CAN = $scope.CAN == true ? false : true;
        //    $scope.ReasonText();
        //    break;
      }
    };

    $scope.actionDialog = function(action, dataModel) {
      let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
      if (appTime != $scope.Batch.ApproveTime) return;

      if (
        ($scope.CRA == undefined && $scope.CA == undefined) ||
        ($scope.CRA != true &&
          $scope.CRAN != true &&
          ($scope.CA != true && $scope.CAN != true))
      ) {
        $rootScope.alert("Please! Check At Least One");
        return;
      }

      //if ($scope.FTAN == true && $scope.FTReason == '') return
      //if ($scope.CA == true && $scope.CAReason == '') return
      //if ($scope.CRA == true && $scope.CRAReason == '') return

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
          message: "Do you want to save Data?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update Data?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      let sendObj = {
        UserId: $rootScope.UserId,
        BpmId: $scope.Batch.BpmId,
        //FTApproved: $scope.FTA == true ? 1 : ($scope.FTAN == true? 0: null),
        CRollApproved: $scope.CRA == true ? 1 : $scope.CRAN == true ? 0 : null,
        ComApproved: $scope.CA == true ? 1 : $scope.CAN == true ? 0 : null,
        //FTReason: $scope.FTReason,
        CRAReason: $scope.CRAReason,
        CAReason: $scope.CAReason,
        ApprovedTime: $scope.Batch.ApproveTime
      };
        console.log(sendObj);

        if ($scope.batchType == "Bulk" || $scope.batchType == "Old") {

            ApprovalManagement.SaveUpdateCRApproval(sendObj, function (res) {
                if (res.ErrorMsg == null) {
                    $rootScope.alert("Data saved Successfully");
                    SaveRefresh();
                } else $rootScope.alert(res.ErrorMsg);
            });
        }
        else if ($scope.batchType == "New") {
            debugger;
            ApprovalManagement.SaveUpdateCRApprovalNew(sendObj, function (res) {
                if (res.ErrorMsg == null) {
                    $rootScope.alert("Data saved Successfully");
                    SaveRefresh();
                } else $rootScope.alert(res.ErrorMsg);
            });
        }


    }

    $scope.Refresh = function() {
      Refresh();
    };

    function SaveRefresh() {
      $scope.Batch = "";

      $scope.BatchData = [];
      $scope.allRollData = [];
      $scope.CRA = false;
      $scope.CRAN = false;
      $scope.CA = false;
      $scope.CAN = false;
      $scope.ReasonText();
      $scope.ApproveTime = [{ id: 1, name: "1st Time" }];
    }

    function Refresh() {
      if ($scope.AllUnitData.length == 1) {
        $scope.Unit = $scope.AllUnitData[0];
        $scope.GetDyeingUnit();
      }
      $scope.Batch = "";
      $scope.allBatch = [];
      $scope.BatchData = [];
      $scope.allRollData = [];
      //$scope.FTA = false;
      //$scope.FTAN = false;
      $scope.CRA = false;
      $scope.CRAN = false;
      $scope.CA = false;
      $scope.CAN = false;
      $scope.ReasonText();
      $scope.ApproveTime = [{ id: 1, name: "1st Time" }];
    }
  }
]);
