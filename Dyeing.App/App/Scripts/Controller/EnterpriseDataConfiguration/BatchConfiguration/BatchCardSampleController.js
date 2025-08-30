app.controller("BatchCardSampleController", [
  "$scope",
  "$rootScope",
  "$location",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "BatchCard",
  function(
    $scope,
    $rootScope,
    $location,
    $mdDialog,
    $mdToast,
    $q,
    $parse,
    fileReader,
    $window,
    BatchCard
  ) {
    BatchCard.GetFinMcByType("Dyeing", function(data) {
      $scope.MachineList = data;
    });

    let reviseNo = $location.search().r;
    if (reviseNo == undefined) {
      reviseNo = 0;
    }
    $scope.ReviseNo = reviseNo;

    $scope.batchSpec = [{}, {}, {}];
    $scope.nozzleTrolley = [{}, {}, {}, {}];

    debugger;

    BatchCard.GetSampleBatchDataById($location.search().id, reviseNo, function(
      data
    ) {
      debugger;
      //   $scope.batch.IsCSample = ($scope.batch.IsCSample != 1 || $scope.batch.IsCSample === undefined) ? false : true;

      console.log(data);

      $scope.batch = data.m_Item1;
      $scope.batchSpec = data.m_Item2;

      $scope.batch[0].BatchProcessingId = $location.search().id;
      $scope.batch.ReviseNo = reviseNo;

      $scope.batch[0].IsPPSample =
        $scope.batch[0].IsPPSample == 1 ? true : false;
      $scope.batch[0].IsCSample = $scope.batch[0].IsCSample == 1 ? true : false;

      $scope.batch[0].IsDVSample =
        $scope.batch[0].IsDVSample == 1 ? true : false;
      $scope.batch[0].IsTestSample =
        $scope.batch[0].IsTestSample == 1 ? true : false;
      $scope.batch[0].IsSMSSample =
        $scope.batch[0].IsSMSSample == 1 ? true : false;

      if (reviseNo > 0) {
        // $scope.batch.IsPPSample = $scope.batch.IsPPSample == 1 ? true : false;
        $scope.btnSave = "Update";
      } else {
        $scope.btnSave = "Save";
      }

      console.log("buyerID:", $scope.batch[0].BuyerId);
      console.log("JobID:", $scope.batch[0].JobId);

      debugger;

      // Load styles based on buyerId and jobId
      if ($scope.batch[0].BuyerId && $scope.batch[0].JobId) {
        $scope
          .LoadStylesByBuyerAndJob(
            $scope.batch[0].BuyerId,
            $scope.batch[0].JobId
          )
          .then(function() {
            // Set the initial selected style from the saved Style ID

            debugger;

            console.log("style no:", $scope.batch[0].Style);
            console.log("style ID:", $scope.batch[0].StyleId);
            console.log("STYLE LIST:", $scope.StyleList);

            $scope.$applyAsync(() => {
              debugger;
              $scope.batch[0].SelectedStyle =
                $scope.StyleList.find(
                  item => item.StyleId == $scope.batch[0].StyleId
                ) || null;

              console.log("Selected Style Set:", $scope.batch[0].SelectedStyle);
            });
          });
      }
    });

    //$scope.setSelectedStyleId = function (selectedStyle) {
    //    if (selectedStyle) {
    //        let selectedItem = $scope.StyleList.find(item => item.Style === selectedStyle);
    //        if (selectedItem) {

    //            $scope.batch[0].SelectedStyleId = selectedItem.StyleId;
    //        }
    //    }
    //};

    $scope.LoadStylesByBuyerAndJob = function(buyerId, jobId) {
      return new Promise((resolve, reject) => {
        if (!buyerId || !jobId) {
          console.warn("BuyerId or JobId is missing");
          return reject();
        }

        BatchCard.GetStylesByBuyerAndJob(buyerId, jobId, function(response) {
          if (response && response.length > 0) {
            $scope.StyleList = response;
          } else {
            $scope.StyleList = [];
            console.warn("No styles found for the given BuyerId and JobId");
          }
          resolve();
        });
      });
    };

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
          message: "Do you want to update Batch Data?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      debugger;
      //console.log("batch", $scope.batch);
      //console.log("batchSpec", $scope.batchSpec);

      $scope.batch[0].IsCSample = $scope.batch[0].IsCSample == 1 ? true : false;
      $scope.batch[0].IsPPSample =
        $scope.batch[0].IsPPSample == 1 ? true : false;

      $scope.batch[0].IsDVSample =
        $scope.batch[0].IsDVSample == 1 ? true : false;
      $scope.batch[0].IsTestSample =
        $scope.batch[0].IsTestSample == 1 ? true : false;
      $scope.batch[0].IsSMSSample =
        $scope.batch[0].IsSMSSample == 1 ? true : false;

      //console.log($scope.batch[0].IsCSample);
      //console.log($scope.batch[0].IsPPSample);

      for (t = 0; t < $scope.batchSpec.length; t++) {
        $scope.batchSpec[t].PlanQty =
          $scope.batchSpec[t].PlanQty == ""
            ? null
            : $scope.batchSpec[t].PlanQty;
        $scope.batchSpec[t].ActualQty =
          $scope.batchSpec[t].ActualQty == ""
            ? null
            : $scope.batchSpec[t].ActualQty;
      }
      if ($scope.batch[0].McNo.MDId) {
        $scope.batch[0].McId = $scope.batch[0].McNo.MDId;
        $scope.batch[0].McNo = $scope.batch[0].McNo.MachineNo;
      }
      console.log("mc:", $scope.batch[0].McId);
      console.log("mc:", $scope.batch[0].McNo);

      // Add ReviseNo to the batch object
      $scope.batch[0].ReviseNo = $scope.ReviseNo;

      if ($scope.batch[0].SelectedStyle) {
        $scope.batch[0].Style = $scope.batch[0].SelectedStyle.StyleId;
      }

      /* Updated by Sujan Das to catch the changes on Fabric Types of Different Fabrics*/
      debugger;

      let bodyWiseFabics = [];

      for (t1 = 0; t1 < $scope.batchSpec.length; t1++) {
        bodyWiseFabics.push({
          FabricId: t1 + 1,
          FabricFor: $scope.batch[t1].FabricFor,
          FabricType: $scope.batch[t1].FabType
        });
        //bodyWiseFabics.push({ FabricId: (t1 + 2), FabricFor: $scope.batch[t1 + 1].FabricFor, FabricType: $scope.batch[t1 + 1].FabType });
        //bodyWiseFabics.push({ FabricId: (t1 + 3), FabricFor: $scope.batch[t1 + 2].FabricFor, FabricType: $scope.batch[t1 + 2].FabType });
      }
      console.log(bodyWiseFabics);

      let obj = {
        UserId: $rootScope.UserId,
        sampleBatch: $scope.batch[0],
        batchSpec: $scope.batchSpec,
        bodyWiseFabrics: bodyWiseFabics
      };

      debugger;
      console.log("data", obj);

      BatchCard.SampleBatchData_SaveUpdate(obj, function(res) {
        debugger;
        if (res.ErrorMsg == null) {
          if (res.Data.Tag != "duplicate") {
            let reportType = "";
            if ($scope.batch[0].IsPPSample) {
              reportType = "PP";
            } else if ($scope.batch[0].IsCSample) {
              reportType = "C";
            } else if ($scope.batch[0].IsDVSample) {
              reportType = "DV";
            } else if ($scope.batch[0].IsSMSSample) {
              reportType = "SMS";
            } else if ($scope.batch[0].IsTestSample) {
              reportType = "Test";
            } else {
              reportType = "N";
            }
            const url = `../DashboardManagement/SampleBatchCardReport?BpmId=${
              res.Data.BpmId
            }&Format=PDF&ReportType=${reportType}#view=FitH`;
            $window.open(url);
          }
          $rootScope.alert(res.Msg);
        } else $rootScope.alert(res.ErrorMsg);
      });
    }

    $scope.getTotalPlanQty = function() {
      return $scope.batchSpec.reduce(function(total, spec) {
        return total + (parseFloat(spec.PlanQty) || 0);
      }, 0);
    };

    $scope.getTotalActualQty = function() {
      return $scope.batchSpec.reduce(function(total, spec) {
        return total + (parseFloat(spec.ActualQty) || 0);
      }, 0);
    };

    $scope.PPorC = function(type) {
      //if (type === 'IsPPSample') {
      //    if ($scope.batch[0].IsPPSample) {
      //        $scope.batch[0].IsCSample = false;
      //    } else {
      //        // Uncheck the other if currently checked
      //        if ($scope.batch[0].IsCSample) {
      //            $scope.batch[0].IsCSample = false;
      //        }
      //    }
      //}
      //else if (type === 'IsCSample') {
      //    if ($scope.batch[0].IsCSample) {
      //        $scope.batch[0].IsPPSample = false;
      //    } else {
      //        // Uncheck the other if currently checked
      //        if ($scope.batch[0].IsPPSample) {
      //            $scope.batch[0].IsPPSample = false;
      //        }
      //    }
      //}

      if (type === "IsPPSample") {
        $scope.batch[0].IsCSample = false;
        $scope.batch[0].IsDVSample = false;
        $scope.batch[0].IsSMSSample = false;
        $scope.batch[0].IsTestSample = false;
      } else if (type === "IsCSample") {
        $scope.batch[0].IsPPSample = false;
        $scope.batch[0].IsDVSample = false;
        $scope.batch[0].IsSMSSample = false;
        $scope.batch[0].IsTestSample = false;
      } else if (type === "IsDVSample") {
        $scope.batch[0].IsPPSample = false;
        $scope.batch[0].IsCSample = false;
        $scope.batch[0].IsSMSSample = false;
        $scope.batch[0].IsTestSample = false;
      } else if (type === "IsSMSSample") {
        $scope.batch[0].IsPPSample = false;
        $scope.batch[0].IsCSample = false;
        $scope.batch[0].IsDVSample = false;
        $scope.batch[0].IsTestSample = false;
      } else if (type === "IsTestSample") {
        $scope.batch[0].IsPPSample = false;
        $scope.batch[0].IsCSample = false;
        $scope.batch[0].IsDVSample = false;
        $scope.batch[0].IsSMSSample = false;
      }
    };
  }
]);
