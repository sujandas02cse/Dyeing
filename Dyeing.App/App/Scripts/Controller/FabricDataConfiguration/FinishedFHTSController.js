app.controller("FinishedFHTSController", [
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
  "FinishedFabricHandoverToStore",
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
    FinishedFabricHandoverToStore
  ) {
    $scope.RollType = "Multiple";
    $scope.PackingList = [];
    $scope.StickerType = "SingleSticker";

    $scope.OpenMultiRollPopup = function() {
      $scope.MultiRollStickerNo = "";
      $("#multiRollModal").modal("show");
    };

    GetAllUnit();

    function GetAllUnit() {
      debugger;
      FinishedFabricHandoverToStore.GetUnitAll($rootScope.UserId, function(
        data
      ) {
        $scope.UnitList = data;
        debugger;
        if ($scope.UnitList.length == 1) {
          $scope.Unit = $scope.UnitList[0];
        }
      });
    }

    $scope.$watch("Unit", function(newVal, oldVal) {
      if (newVal) {
        debugger;
        clearTextFields();
        GetTrackingNo();
      }
    });

    function clearTextFields() {
      $scope.Tracking = "";
      $scope.PackingList = [];
      $scope.TrackingList = [];
    }

    function GetTrackingNo() {
      debugger;

      if ($scope.Unit) {
        FinishedFabricHandoverToStore.GetTrackingNo(
          $scope.Unit.UnitId,
          function(data) {
            debugger;
            $scope.TrackingList = data;
          }
        );
      }
    }

    $scope.GetDataByTracking = function() {
      debugger;
      var trackingId = null;

      // If object is selected from typeahead
      if (typeof $scope.Tracking === "object" && $scope.Tracking.Id) {
        trackingId = $scope.Tracking.Id;
      }

      // If user typed manually
      else if (typeof $scope.Tracking === "string") {
        // Try to match manually typed TrackingNo to the list and get its Id
        var match = $scope.TrackingList.find(function(item) {
          return item.TrackingNo === $scope.Tracking;
        });

        if (match) {
          trackingId = match.Id;
        } else {
          alert("Invalid Tracking No.");
          return;
        }
      }

      // Final fallback
      if (!trackingId) {
        alert("Tracking ID not found.");
        return;
      }

      FinishedFabricHandoverToStore.GetDataByTracking(
        trackingId,
        $scope.RollType,
        $rootScope.UserId,
        function(data) {
          /*  $scope.PackingList = $scope.PackingList.concat(data);*/
          data.forEach(function(newItem) {
            var exists = $scope.PackingList.some(function(existingItem) {
              return (
                existingItem.BatchNo === newItem.BatchNo &&
                existingItem.RollNo === newItem.RollNo
              );
            });
            if (!exists) {
              $scope.PackingList.push(newItem);
            }
          });
        }
      );
    };

    $scope.KeyPressHandler = function($event) {
      debugger;
      if ($event.which === 13) {
        $scope.GetDataByTracking();
      }
    };

    $scope.Refresh = function() {
      Refresh();
    };

    function Refresh() {
      $scope.RollType = "Multiple";
      $scope.Tracking = "";
      $scope.PackingList = [];
    }

    //-----------Save/Update/Delete-------------------------------//
    $scope.actionDialog = function(action, dataModel) {
      debugger;
      console.log("Update button clicked: " + action);
      $mdDialog
        .show(
          $mdDialog.dialogBox({
            locals: {
              model: objData(action)
            }
          })
        )
        .then(function(mode) {
          if (mode == "Save" || mode == "Update") {
            SaveUpdate();
          }
        });
    };

    function objData(action) {
      var obj = [];

      if (action == "Save" || action == "Update") {
        obj = {
          Mode: action,

          btnText: "Yes",

          Header: action + " Confirmation",
          message: "Do you want to " + action + "?"
        };

        return obj;
      }
    }

    function SaveUpdate() {
      debugger;

      var Obj = {
        PackingList: $scope.PackingList,
        UserId: $rootScope.UserId
      };

      console.log("Final Object:", Obj);

      FinishedFabricHandoverToStore.SaveUpdate(
        Obj,

        function(data) {
          if (data != null) {
            debugger;

            var message =
              "Handovered To Store Successfully. RFD Code is " +
              data[0]["RFDCode"].toString();

            $rootScope.alert(message); // Ensure your alert supports HTML
            Refresh();
          } else $rootScope.alert(data.ErrorMsg);
        }
      );
    }

    $scope.keyPressHandlerForSingleRoll = function($event) {
      debugger;
      if ($event.which == 13) {
        $scope.GetDataBySingleRoll();
      }
    };

    FetchRoll = function(finalRoll) {
      if (!finalRoll || finalRoll.trim() === "") {
        alert("Please Enter Roll Sticker Number.");
        return;
      }

      var qrCodeLines = finalRoll
        .split("\n")
        .map(function(line) {
          return line.trim();
        })
        .filter(function(line) {
          return line.length > 0;
        });

      var multiStickerNos = qrCodeLines.map(function(sticker) {
        return { StickerNo: sticker };
      });

      var payload = {
        multiStickerNos: multiStickerNos,
        UserId: $rootScope.UserId
      };

      FinishedFabricHandoverToStore.GetDataByMultiRoll(payload, function(data) {
        data.forEach(function(newItem) {
          debugger;
          var exists = $scope.PackingList.some(function(existingItem) {
            return (
              existingItem.BatchNo === newItem.BatchNo &&
              existingItem.RollNo === newItem.RollNo
            );
          });

          if (!exists) {
            $scope.PackingList.push(newItem);
          }
        });

        $("#multiRollModal").modal("hide");
      });
    };

    $scope.GetDataBySingleRoll = function() {
      FetchRoll($scope.SingleRollStickerNo);
    };

    $scope.GetDataByMultiRoll = function() {
      debugger;
      FetchRoll($scope.MultiRollStickerNo);
    };

    $scope.removeRow = function(index) {
      if (confirm("Are you sure you want to remove this row?")) {
        $scope.PackingList.splice(index, 1);
      }
    };
  }
]);
