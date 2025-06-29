app.controller("SCMSynchronizationController", [
  "$scope",
  "$rootScope",
  "filterFilter",
  "$mdDialog",
  "$mdToast",
  "$q",
  "SCMSynchronization",
  function(
    $scope,
    $rootScope,
    filterFilter,
    $mdDialog,
    $mdToast,
    $q,
    SCMSynchronization
  ) {
    debugger;
    //---------------------Batch Combo Load------------//
    SCMSynchronization.GetBatchNo(function(data) {
      debugger;
      $scope.BatchList = data;
    });

    $scope.Refresh = function() {
      Refresh();
    };
    function Refresh() {
      $scope.Batch = "";

      $scope.Model = null;
      $scope.btnSave = "Save";
    }

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
          s;
        });
    };

    function objData(action) {
      var obj = [];

      if (action == "Save") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to Synchronize with SCM?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      debugger;
      var obj = {
        BpmId: $scope.Batch.BpmId,
        UserId: $rootScope.UserId
      };
      debugger;
        SCMSynchronization.SCMSynchronization_Save(obj, function(data) {
        if (data.ErrorMsg == null) {
          $rootScope.alert(data.Msg);
          Refresh();
        } else $rootScope.alert(data.ErrorMsg);
      });
    }
  }
]);
