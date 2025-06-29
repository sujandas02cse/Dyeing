app.controller("BatchWiseGSMConfigController", [
  "$scope",
  "$rootScope",
  "filterFilter",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$window",
  "BatchWiseGSMConfig",
  function(
    $scope,
    $rootScope,
    filterFilter,
    $mdDialog,
    $mdToast,
    $q,
    $window,
    BatchWiseGSMConfig
  ) {
    //$scope.required = true;
    //$scope.AGSMList = [];
    var Remarks = [];
    $scope.Details = [];
    $scope.CompactingTime = [{ id: 1, name: "1st Time" }];

    /* Updated By Sujan Das on 27-April-2025 to check new system*/

    BatchWiseGSMConfig.GetUnitAll($rootScope.UserId, function(data) {
      debugger;
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    $scope.$watch("Unit", function(newVal, oldVal) {
      if (newVal) {
        Refresh();
        loadBatchList();
      }
    });

    $scope.$watch("batchType", function(newVal, oldVal) {
      if (newVal) {
        Refresh();
        loadBatchList();
      }
    });

    function loadBatchList() {
      debugger;
      if ($scope.Unit && $scope.batchType) {
        BatchWiseGSMConfig.GetBatchNoListUnitStatusWise(
          $scope.batchType,
          $scope.Unit.UnitId,
          function(dataNew) {
            debugger;
            $scope.BatchList = dataNew;
          }
        );
      }
    }

    //---------------------Batch Combo Load------------//
    //BatchWiseGSMConfig.GetBatchNo(function(data) {
    //  $scope.BatchList = data;
    //});

    //-----------------Get Master and Details data from the database------------//
    $scope.BatchChange = function() {
      if (isNaN($scope.Batch.BpmId)) return;

      getBatchDataWithCompTime(0);
    };

    function getBatchDataWithCompTime(pCompTime) {
      debugger;

      // Updated by Sujan Das on 13-01-2025
      // to distinguish between old and new system

      if ($scope.Batch.Status == "Old" || $scope.Batch.Status == "Bulk") {
        debugger;

        BatchWiseGSMConfig.GetBatchWiseGSMInfo(
          $scope.Batch.BpmId,
          pCompTime,
          function(data) {
            $scope.Model = data;
            if (pCompTime == 0) {
              let compTime = data.CompTime;
              if (compTime > 1) {
                for (i = 2; i <= compTime; i++) {
                  let model = {
                    id: i,
                    name:
                      i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                  };
                  let isExist = $scope.CompactingTime.filter(x => x.id == i);
                  if (isExist.length == 0) $scope.CompactingTime.push(model);
                }
              }
              //$scope.Model.CompTime = data.CompTime;
            }
            //if (pCompTime > 0)
            //    $scope.Model.CompTime = pCompTime;
          }
        );

        BatchWiseGSMConfig.GetBatchWiseGSMDetailsInfo(
          $scope.Batch.BpmId,
          pCompTime,
          function(data) {
            debugger;
            $scope.Details = data.m_Item1;
            $scope.totalItems = data.m_Item1.length;

            for (var j = 0; j < $scope.Details.length; j++) {
              //$scope.Details[j].ActualGSM = $scope.Details[j].ActualGSM;//{ id: $scope.Details[j].AGId, name: $scope.Details[j].ActualGSM };
              $scope.Details[j].Variation =
                $scope.Details[j].ReqGSM - $scope.Details[j].ActualGSM;
            }

            var Comments = data.m_Item2;
            $scope.Plan = Comments.map(function(item) {
              debugger;
              var chk = reasons.find(x => x.label == item.FinalComment);
              if (chk != null) {
                Remarks.push(chk);
              }

              return {
                id: chk.id
              };
            });
          }
        );
      } else {
        debugger;

        BatchWiseGSMConfig.GetBatchWiseGSMInfoNew(
          $scope.Batch.BpmId,
          pCompTime,
          function(data) {
            $scope.Model = data;
            if (pCompTime == 0) {
              let compTime = data.CompTime;
              if (compTime > 1) {
                for (i = 2; i <= compTime; i++) {
                  let model = {
                    id: i,
                    name:
                      i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                  };
                  let isExist = $scope.CompactingTime.filter(x => x.id == i);
                  if (isExist.length == 0) $scope.CompactingTime.push(model);
                }
              }
            }
          }
        );

        debugger;

        BatchWiseGSMConfig.GetBatchWiseGSMDetailsInfoNew(
          $scope.Batch.BpmId,
          pCompTime,
          function(data) {
            debugger;
            $scope.Details = data.m_Item1;
            $scope.totalItems = data.m_Item1.length;

            for (var j = 0; j < $scope.Details.length; j++) {
              $scope.Details[j].Variation =
                $scope.Details[j].ReqGSM - $scope.Details[j].ActualGSM;
            }
            var Comments = data.m_Item2;
            $scope.Plan = Comments.map(function(item) {
              debugger;
              var chk = reasons.find(x => x.label == item.FinalComment);
              if (chk != null) {
                Remarks.push(chk);
              }
              return {
                id: chk.id
              };
            });
          }
        );
      }
    }

    $scope.changeCompTime = function() {
      getBatchDataWithCompTime($scope.Model.CompTime);
    };

    //-----Variation Display--------//
    $scope.valVariation = function(index, newval) {
      if (newval == undefined || newval == "") newval = 0;
      $scope.Details[index].Variation = (
        $scope.Details[index].ReqGSM - newval
      ).toFixed(2);
    };

    //-----------Save/Update/Delete-------------------------------//
    $scope.actionDialog = function(action, dataModel) {
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
          } else if (mode == "Delete") {
            Delete(dataModel);
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
          message: "Do you want to save GSM Data?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update GSM Data?"
        };
      } else if (action == "Delete") {
        obj = {
          Mode: "Delete",
          btnText: "Yes",
          Header: "Delete Confirmation",
          message: "Do you want to delete GSM Data?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      //var maxStepNo = $scope.Details[0].StepNo;
      //if ($scope.btnSave == "Update") {
      //    $scope.Details = $scope.Details.filter(elem => elem.ActualGSM != null);
      //}
      //alert(angular.toJson($scope.Details))

      //for (var i = 0; i < $scope.Details.length; i++) {
      //   $scope.Details[i].UserId = $scope.UserId;
        //}
        debugger;
      var Comments = Remarks.map(function(item) {
        return {
          BpmId: $scope.Batch.BpmId,
          CompTime: $scope.Model.CompTime,
          FinalComment: item.label,
          UserId: $rootScope.UserId
        };
      });
      var obj = {
        CompTime: $scope.Model.CompTime,
        UserId: $rootScope.UserId,
        Details: $scope.Details,
        FinalComments: Comments
      };

      var ReportObject = {
        BpmId: $scope.Batch.BpmId,
        CompTime: $scope.Model.CompTime,
        Status: $scope.batchType,
        UnitId: $scope.Unit.UnitId
      };

        if ($scope.Batch.Status == "Old" || $scope.Batch.Status == "Bulk") {
        BatchWiseGSMConfig.BatchWiseGSM_SaveUpdate(obj, function(data) {
          if (data.ErrorMsg == null) {
            $rootScope.alert(data.Msg);

            Refresh();
            Show4PointInspectionReport(ReportObject);
          } else $rootScope.alert(data.ErrorMsg);
        });
      } else {
        debugger;
        BatchWiseGSMConfig.BatchWiseGSM_SaveUpdateNew(obj, function(data) {
          if (data.ErrorMsg == null) {
            $rootScope.alert(data.Msg);
            Refresh();
            Show4PointInspectionReport(ReportObject);
          } else {
            $rootScope.alert(data.ErrorMsg);
          }
        });
      }
    }

    function Show4PointInspectionReport(ReportObject) {
      debugger;

      var rptParm = [
        { UnitId: ReportObject.UnitId },
        { BuyerId: "" },
        { JobId: "" },
        { StyleId: "" },
        { BpmId: ReportObject.BpmId },
        { CompTime: ReportObject.CompTime }
      ];
      var reportPath =
        ReportObject.Status === "Old" || ReportObject.Status === "Bulk"
          ? "~/Reports/QCManagement/4PointInspection.rdlc"
          : "~/Reports/QCManagement/4PointInspectionNew.rdlc";
      var fileName =
        ReportObject.Status === "Old" || ReportObject.Status === "Bulk"
          ? "FinishedFabricInspection"
          : "FinishedFabricInspectionNew";
      var rptComInfo = [
        { APIAction: "BroadcastManagement/GetReportingData" },
        { ReportPath: reportPath },
        { FileName: fileName },
        { Format: "PDF" }
      ];

      var sqlQuery =
        ReportObject.Status === "Old" || ReportObject.Status === "Bulk"
          ? "[dbo].[usp_rpt_DyedFabInspection]"
          : "[dbo].[usp_rpt_DyedFabInspectionNew]";

      var SQL = [{ SQL: sqlQuery }];

      var Dataset = [{ Dataset: "InspectionData" }];

      $window.open(
        "../BroadcastManagement/GetBroadcastData?rptComInfo=" +
          JSON.stringify(rptComInfo) +
          "&&rptParm=" +
          JSON.stringify(rptParm) +
          "&&SQL=" +
          JSON.stringify(SQL) +
          "&&Dataset=" +
          JSON.stringify(Dataset)
      );
    }

    var vm = this;
    vm.reloadData = function() {
      $state.reload();
    };

    $scope.Refresh = function() {
      Refresh();
    };

    function Refresh() {
      $scope.Batch = "";
      $scope.Details = null;
      $scope.Model = null;
      $scope.btnSave = "Save";
      $scope.Plan = [];
      Remarks = [];
      //tableInitialState();
      //hiddenDiv.style.display = 'none';
    }

    //for dropdown multiselect

    var reasons = [
      {
        id: 1,
        label: "aLabel"
      },
      {
        id: 2,
        label: "bLabel"
      },
      {
        id: 3,
        label: "cLabel"
      }
    ];

    $scope.Plan = [];
    $scope.PlanData = reasons;

    $scope.dropdownSetting = {
      scrollable: true,
      scrollableHeight: "300px",
      enableSearch: true,
      clearSearchOnClose: true,
      buttonClasses: "btn btn-dropdown",
      //smartButtonMaxItems: 2,
      styleActive: true,
      showCheckAll: false,
      showUncheckAll: false,
      checkBoxes: false
    };

    $scope.dropdownTextSetting = {
      buttonDefaultText: "Select Remarks"
    };

    $scope.RemarksSelect = function(item) {
      getRemarks(item, "add");
    };

    $scope.RemarksDeselect = function(item) {
      getRemarks(item, "re");
    };

    function getRemarks(item, process) {
      var single = $scope.PlanData.find(x => x.id === item.id);
      if (process === "add") {
        var check = Remarks.find(x => x.id == single.id);
        if (check == null) {
          Remarks.push(single);
        }
      } else if (process === "re") {
        if (Remarks.length == 1) {
          Remarks = [];
          $scope.Plan = [];
        } else {
          var single = $scope.PlanData.find(x => x.id === item.id);
          Remarks = Remarks.filter(x => x.id != single.id);
          $scope.Plan = $scope.Plan.filter(x => x.id != single.id);
        }
      }
    }
  }
]);
