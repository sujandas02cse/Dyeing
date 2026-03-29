app.controller("StyleOrderUpdateController", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "StyleOrderUpdate",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $q,
    $parse,
    fileReader,
    $window,
    StyleOrderUpdate
  ) {
    //$scope.Type = 'New';
    $scope.Mode = "Order";

    //Change Mode
    $scope.changeMode = function() {
      $scope.Refresh();
    };

    //Change Type
    $scope.changeType = function() {
      $scope.Refresh();
    };

    //All Unit Load when load the page
    StyleOrderUpdate.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    //All BAtch Data Load by Unit when select Unit
    $scope.LoadBatchData = function(Unit) {
      if (!$scope.Unit.Id || $scope.Unit === null || Unit === null) return;
      $rootScope.ShowLoader("Loading Batch Data");
      StyleOrderUpdate.GetBatchByUnit(Unit.Id, $scope.Mode, function(data) {
        $scope.BatchList = data;
        $rootScope.HideLoader();
      });
      $rootScope.HideLoader();
    };

    //Load Batch Details data when Select The Batch
    $scope.LoadBatchDetailData = function(Batch) {
      if (!Batch.BpmId) return;

      $rootScope.ShowLoader("Loading Batch Detail Data");
      StyleOrderUpdate.GetBatchDetailByBatch(Batch.BpmId, function(data) {
        $scope.BatchData = data.m_Item3[0];
        $scope.Unit = $scope.UnitList.find(
          x => x.Id === data.m_Item3[0].UnitId
        );
        $scope.Batch = $scope.BatchList.find(
          x => x.BpmId === data.m_Item3[0].BpmId
        );
        $scope.StyleList = data.m_Item1;
        $scope.OrderList = data.m_Item2;
        //$scope.AllData = data.m_Item2;
        $rootScope.HideLoader();
      });
    };

    //Save Update Modal Control
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
            debugger;
            if (
              $scope.Batch.BpmId === "" &&
              (($scope.Type === "Order" &&
                $scope.Order.OrderId === undefined) ||
                ($scope.Type === "Style" && $scope.Style.StyleId === undefined))
            )
              return;
            SaveUpdate();
          }
          //else if (mode === 'Delete') {
          //    if (!dataModel || !dataModel.Id) return;
          //    DeleteData(dataModel);
          //}
        });
    };

    //Save Update Modal Message
    function objData(action) {
      var obj = [];
      if (action == "Save") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to save Batch data?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update Batch data?"
        };
      } else if (action == "Delete") {
        obj = {
          Mode: "Delete",
          btnText: "Yes",
          Header: "Delete Confirmation",
          message: "Do you want to delete Batch data?"
        };
      }
      return obj;
    }

    //Save Update Function to Save Data
    function SaveUpdate() {
      debugger;
      let Obj = {
        Type: $scope.Mode,
        StyleId: $scope.Mode === "Order" ? 0 : $scope.Style.StyleId,
        OrderId: $scope.Mode === "Style" ? 0 : $scope.Order.OrderId,
        BpmId: $scope.Batch.BpmId,
        CombinationId: $scope.BatchData.CombinationId
      };

      StyleOrderUpdate.SaveUpdateData(Obj, function(data) {
        $scope.Refresh();
        if (data[0].msg != "") $rootScope.alert("Data Saved Successfully");
        else $rootScope.alert("Error Occured To Save Data");
      });
    }

    //Global Refresh Function
    $scope.Refresh = function() {
      debugger;
      $scope.Unit = undefined;
      $scope.Batch = undefined;
      $scope.BatchData = undefined;
      $scope.Style = undefined;
      $scope.Order = undefined;
    };

    //Helper function to Format Date
    function formatDateForSQL(dateString) {
      if (!dateString) {
        return null; // Handle null or undefined dates
      }

      var date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return null; // Handle invalid date strings
      }

      // Format the date as 'yyyy-MM-dd HH:mm:ss'
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
      var day = ("0" + date.getDate()).slice(-2);
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);
      var seconds = ("0" + date.getSeconds()).slice(-2);

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }
]);
