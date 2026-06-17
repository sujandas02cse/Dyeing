app.controller("BatchFinishingController", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "BatchFinishingFactory",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $q,
    $parse,
    fileReader,
    $window,
    BatchFinishingFactory
  ) {
      // -----------------------------
      // Initial State
      // -----------------------------
      var isUpdate = 0;

      $scope.btnSave = "Save";
      $scope.batchList = [];
      $scope.batchFins = {};
      $scope.machineFins = {};

      init();

      function init() {
          tableInitialState();
          loadBatchNo();
      }

      function tableInitialState() {
          $scope.machineFins = {};
      }

      // -----------------------------
      // Load Batch List
      // -----------------------------
      function loadBatchNo() {
          var batchId = 0;

          BatchFinishingFactory.GetBatchNoList(batchId, function (data) {
              if (data != null) {
                  $scope.batchList = data;
              } else {
                  $scope.batchList = [];
              }
          });
      }

      // -----------------------------
      // Batch Select Event
      // -----------------------------
      $scope.getDataByBatchId = function (ob) {
          debugger;

          if (!$scope.batchFins.Batch) {
              $rootScope.alert("Please select batch first");
              return;
          }

          var batchId = $scope.batchFins.Batch.BatchId || $scope.batchFins.Batch.BpmId;

          if (!batchId) {
              $rootScope.alert("BatchId/BpmId not found from selected batch");
              return;
          }

          BatchFinishingFactory.GetBatchConfigurationFinishingDetail(batchId, function (data) {
              debugger;
              console.log(data);

              if (data == null || data.m_Item1 == null || data.m_Item1.length == 0) {
                  isUpdate = 0;
                  $scope.btnSave = "Save";
                  tableInitialState();
              } else {
                  isUpdate = 1;
                  $scope.btnSave = "Update";
                  $scope.machineFins = data.m_Item1[0];
              }
          });
      };

      // -----------------------------
      // Save/Update Confirmation
      // -----------------------------
      $scope.actionDialog = function (action, dataModel) {
          debugger;

          $mdDialog
              .show(
                  $mdDialog.dialogBox({
                      locals: {
                          model: objData(action)
                      }
                  })
              )
              .then(function (mode) {
                  if (mode == "Save" || mode == "Update") {
                      SaveUpdate();
                  }
              });
      };

      function objData(action) {
          var obj = {};

          if (action == "Save") {
              obj = {
                  Mode: "Save",
                  btnText: "Yes",
                  Header: "Save Confirmation",
                  message: "Do you want to save..?"
              };
          } else if (action == "Update") {
              obj = {
                  Mode: "Update",
                  btnText: "Yes",
                  Header: "Update Confirmation",
                  message: "Do you want to update..?"
              };
          }

          return obj;
      }

      // -----------------------------
      // Main Save/Update Method
      // -----------------------------
      function SaveUpdate() {
          debugger;

          if (!$scope.batchFins.Batch) {
              $rootScope.alert("Please select Batch No first");
              return;
          }

          var bpmId = $scope.batchFins.Batch.BatchId || $scope.batchFins.Batch.BpmId;

          if (!bpmId) {
              $rootScope.alert("BatchId/BpmId not found");
              return;
          }

          $scope.machineFins.BpmId = bpmId;
          $scope.machineFins.CreatedBy = $rootScope.UserId;
          $scope.machineFins.UserId = $rootScope.UserId;
          $scope.machineFins.HostIP = $rootScope.HostIP || "";

          var obj = {
              MachineFins: $scope.machineFins
          };

          BatchFinishingFactory.SaveBatchConfigurationFinishingNew(obj, function (data) {
              debugger;
              console.log(data);

              if (data.ErrorMsg == null) {
                  if (isUpdate == 1) {
                      $rootScope.alert("Data successfully updated");
                  } else {
                      $rootScope.alert(data.Msg || "Data successfully saved");
                  }

                  Refresh();
                  loadBatchNo();
              } else {
                  $rootScope.alert(data.ErrorMsg);
              }
          });
      }

      // -----------------------------
      // Reset
      // -----------------------------
      $scope.Refresh = function () {
          Refresh();
      };

      function Refresh() {
          isUpdate = 0;
          $scope.btnSave = "Save";
          $scope.batchFins = {};
          $scope.machineFins = {};
      }
  }
]);
