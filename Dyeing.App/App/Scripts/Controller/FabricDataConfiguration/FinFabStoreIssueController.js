app.controller("FinFabStoreIssue", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$timeout",
  "$q",
  "$window",
  "fileReader",
  "filterFilter",
  "$http",
  "FinFabStoreIssue",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $timeout,
    $q,
    $window,
    fileReader,
    filterFilter,
    $http,
    FinFabStoreIssue
  ) {
    $scope.TotalKg = 0;
    $scope.TotalYds = 0;

    $scope.IsCheck = true;
    $scope.IsCheck1 = true;
    $scope.TrackingNo = "";
    $scope.Mode = "N";

    $scope.CompactingTime = [{ id: 1, name: "1st Time" }];

    /* Updated By Sujan Das on 27-April-2025 to check new system*/

    //-----Initialize Combo------------//
    FinFabStoreIssue.GetBatchNo(function(data) {
      //alert(angular.toJson(data))
      debugger;
      $scope.BatchList = data;
    });

    FinFabStoreIssue.GetAllUnit($rootScope.UserId, function(data) {
      debugger;
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

      $scope.$watch("Unit", function (newVal, oldVal) {
          if (newVal) {
              Refresh();
              loadBatchList();
          }
      });

      $scope.$watch("batchType", function (newVal, oldVal) {
          if (newVal) {
              Refresh();
              loadBatchList();
          }
      });

    GetTrackingNo();
    function GetTrackingNo() {
      debugger;
      FinFabStoreIssue.GetTrackingNo(function(data) {
        debugger;
        $scope.TrackingList = data;
      });
    }

    //FinFabStoreIssue.GetUnitName(function (data) {
    //    $scope.Unit = data;
    //});

    $scope.ChangeMode = function() {
      Refresh();
      $scope.TrackingNo = "";
      if ($scope.Mode == "M") $rootScope.btnPrintShow = true;
      else $rootScope.btnPrintShow = false;
    };

    $scope.GetDataByBatch = function() {
      debugger;
      getDataByBatchWithCT(0);
    };

    function getDataByBatchWithCT(compTime) {
      debugger;
      $scope.master = null;
      $scope.details = null;
      $scope.details1 = null;

        if ($scope.Batch.Status == "Old" || $scope.Batch.Status=="Bulk") {
        FinFabStoreIssue.GetDataByBatch($scope.Batch.BpmId, compTime, function(
          data
        ) {
          //console.log(data);
          $scope.master = data.m_Item1[0];
          //$scope.master.CompTime = $scope.master.CompTime;
          if (compTime == 0) {
            let compTime = $scope.master.CompTime;
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
          } else $scope.master.CompTime = compTime;
          for (let i = 0; i < data.m_Item2.length; i++) {
            data.m_Item2[i].IsCheck = true;
            data.m_Item2[i].Remarks = data.m_Item2[i].BodyPart;
          }
          $scope.details = data.m_Item2.filter(x => x.RollNo <= 25);
          $scope.details1 = data.m_Item2.filter(x => x.RollNo > 25);
          $scope.ChangeCheck();
        });
      } else {
        debugger;
        FinFabStoreIssue.GetDataByBatchNew(
          $scope.Batch.BpmId,
          compTime,
          function(data) {
            $scope.master = data.m_Item1[0];
            if (compTime == 0) {
              let compTime = $scope.master.CompTime;
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
            } else $scope.master.CompTime = compTime;
            for (let i = 0; i < data.m_Item2.length; i++) {
              data.m_Item2[i].IsCheck = true;
              data.m_Item2[i].Remarks = data.m_Item2[i].BodyPart;
            }
            $scope.details = data.m_Item2.filter(x => x.RollNo <= 25);
            $scope.details1 = data.m_Item2.filter(x => x.RollNo > 25);
            $scope.ChangeCheck();
          }
        );
      }
    }

    $scope.changeCompTime = function() {
      debugger;
      getDataByBatchWithCT($scope.master.CompTime);
    };

    $scope.GetDataByTracking = function() {
      debugger;

      console.log($scope.Tracking);

      if ($scope.Tracking.IsFromAutomation == false) {
        FinFabStoreIssue.GetDataByTracking($scope.Tracking.Id, function(data) {
          debugger;
          $scope.master = data.m_Item1[0];
          for (let i = 0; i < data.m_Item2.length; i++) {
            if (data.m_Item2[i].IsCheck == 1) data.m_Item2[i].IsCheck = true;
            else data.m_Item2[i].IsCheck = false;
          }
          $scope.details = data.m_Item2.filter(x => x.RollNo <= 25);
          $scope.details1 = data.m_Item2.filter(x => x.RollNo > 25);
          $scope.ChangeCheck();
        });
      } else {
        FinFabStoreIssue.GetDataByTrackingNew($scope.Tracking.Id, function(
          data
        ) {
          debugger;
          $scope.master = data.m_Item1[0];
          for (let i = 0; i < data.m_Item2.length; i++) {
            if (data.m_Item2[i].IsCheck == 1) data.m_Item2[i].IsCheck = true;
            else data.m_Item2[i].IsCheck = false;
          }
          $scope.details = data.m_Item2.filter(x => x.RollNo <= 25);
          $scope.details1 = data.m_Item2.filter(x => x.RollNo > 25);
          $scope.ChangeCheck();
        });
      }
    };

    $scope.ChangeCheck = function() {
      var totalKg = 0,
        totalYds = 0;
      let checkDetails = $scope.details.filter(
        x => x.IsCheck == true || x.IsCheck == 1
      );
      let checkDetails1 = $scope.details1.filter(
        x => x.IsCheck == true || x.IsCheck == 1
      );
      angular.forEach(checkDetails, function(el) {
        totalKg += el.RollWeight;
        totalYds += el.RollWeightYds;
      });
      angular.forEach(checkDetails1, function(el) {
        totalKg += el.RollWeight;
        totalYds += el.RollWeightYds;
      });

      $scope.TotalKg = totalKg.toFixed(2);
      $scope.TotalYds = totalYds.toFixed(2);
    };

    $scope.ChangeCheckM = function() {
      for (let i = 0; i < $scope.details.length; i++) {
        $scope.details[i].IsCheck = $scope.IsCheck;
      }
      $scope.ChangeCheck();
    };
    $scope.ChangeCheckM1 = function() {
      for (let i = 0; i < $scope.details1.length; i++) {
        $scope.details1[i].IsCheck = $scope.IsCheck1;
      }
      $scope.ChangeCheck();
    };

    //$scope.ChangeMode = function () {

    //}

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
          message: "Do you want to save?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      debugger;
      let details = $scope.details.filter(x => x.IsCheck == true);
      let details1 = $scope.details1.filter(x => x.IsCheck == true);

      let Id = 0,
        BpmId = 0;
      if ($scope.Mode == "M") Id = $scope.Tracking.Id;
      else if ($scope.Mode == "N") BpmId = $scope.Batch.BpmId;

      let model = {
        Id: Id,
        BpmId: BpmId,
        CompTime: $scope.master.CompTime,
        UserId: $rootScope.UserId,
        Details: details.concat(details1)
      };
      if (model.Details.length == 0) {
        $rootScope.alert("Nothing to Save...");
        return;
      }
      console.log("model", model);
      debugger;

      //alert(angular.toJson($scope.Model))

        if ($scope.Batch.Status == "Old" || $scope.Batch.Status=="Bulk") {
        FinFabStoreIssue.PackingList_SaveUpdate(model, function(res) {
          debugger;
          if (res.ErrorMsg == null) {
            $rootScope.alert(res.Msg);
            // $rootScope.Toast(data.Msg);
            GetTrackingNo();
            Refresh();

            if ($scope.Mode == "N") {
              $scope.Mode = "M";
              $scope.TrackingNo = res.Data.TrackingNo;
              $scope.Tracking = {
                Id: res.Data.Id,
                TrackingNo: $scope.TrackingNo,
                IsFromAutomation: false
              };
              $scope.GetDataByTracking();
            }

            if ($scope.Mode == "M") $rootScope.btnPrintShow = true;
            else $rootScope.btnPrintShow = false;
          } else $rootScope.alert(res.ErrorMsg);
        });
      } else {
        debugger;

        FinFabStoreIssue.PackingList_SaveUpdateNew(model, function(res) {
          debugger;
          if (res.ErrorMsg == null) {
            $rootScope.alert(res.Msg);
            // $rootScope.Toast(data.Msg);
            GetTrackingNo();
            Refresh();

            if ($scope.Mode == "N") {
              $scope.Mode = "M";
              $scope.TrackingNo = res.Data.TrackingNo;
              $scope.Tracking = {
                Id: res.Data.Id,
                TrackingNo: $scope.TrackingNo,
                IsFromAutomation: true
              };
              $scope.GetDataByTracking();
            }

            if ($scope.Mode == "M") $rootScope.btnPrintShow = true;
            else $rootScope.btnPrintShow = false;
          } else $rootScope.alert(res.ErrorMsg);
        });
      }
    }

    $scope.Print = function() {
      debugger;
      let Id = $scope.Tracking.Id;
      if ($scope.Tracking.IsFromAutomation == false) {
        $window.open(
          "../DashboardManagement/GetPackingListReport?PackingId=" +
            Id +
            "&&BatchType=Bulk&&Format=PDF#view=FitH"
        );
      } else {
        $window.open(
          "../DashboardManagement/GetPackingListReportAuto?PackingId=" +
            Id +
            "&&BatchType=Bulk&&Format=PDF#view=FitH"
        );
      }
    };

    var vm = this;
    vm.reloadData = function() {
      $state.reload();
    };

    $scope.Refresh = function() {
      Refresh();
      $scope.Mode = "N";
      $scope.TrackingNo = "";
    };
    function Refresh() {
      $scope.details = [];
      $scope.details1 = [];
      $scope.master = {};

      $scope.btnSave = "Save";
      $scope.Batch = null;
      $scope.Tracking = null;
      $scope.TotalKg = 0;
      $scope.TotalYds = 0;
    }


      function loadBatchList() {
          debugger;
          if ($scope.Unit && $scope.batchType) {
              FinFabStoreIssue.GetBatchNoListUnitStatusWise(
                  $scope.batchType,
                  $scope.Unit.UnitId,
                  function (dataNew) {
                      debugger;
                      $scope.BatchList = dataNew;
                  }
              );
          }
      }

  }
]);
