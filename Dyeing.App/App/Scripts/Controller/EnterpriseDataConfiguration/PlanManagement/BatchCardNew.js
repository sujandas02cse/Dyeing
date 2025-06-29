app.controller("BatchCardNew", [
  "$scope",
  "$rootScope",
  "$location",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "BatchCardNew",
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
    BatchCardNew
  ) {
    let UnitId = $location.search().u;
    $scope.Enzyme = [{ Value: "Yes" }, { Value: "No" }];
    BatchCardNew.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
    });

    BatchCardNew.GetMachineData(UnitId, function(data) {
      $scope.MachineList = data;
    });

    //BatchCardNew.GetFinMcByType('Dyeing', function (data) {
    //    $scope.MachineList = data;
    //});
    $scope.PPorC = function(type) {
      if (type === "IsPPSample") {
        $scope.batch.PPSample = $scope.batch.PPSample ? false : true;
        $scope.batch.China = false;
        $scope.batch.PPSamplewithChina = false;
      } else if (type === "IsCSample") {
        $scope.batch.PPSample = false;
        $scope.batch.China = $scope.batch.China ? false : true;
        $scope.batch.PPSamplewithChina = false;
      } else if (type === "IsPPSampleOrChina") {
        $scope.batch.PPSample = false;
        $scope.batch.China = false;
        $scope.batch.PPSamplewithChina = $scope.batch.PPSamplewithChina
          ? false
          : true;
      }
    };
    $scope.reviseNo = $location.search().r;
    //if (reviseNo == undefined) {
    //    reviseNo = 0;
    //}
    //else
    //    reviseNo = 1;
    //$scope.ReviseNo = reviseNo;


    $scope.batchSpec = [{}, {}, {}, {}, {}];
    $scope.nozzleTrolley = [{}, {}, {}, {}];

    BatchCardNew.GetBatchDataById(
      $location.search().id,
      $scope.reviseNo,
      function(data) {
        $scope.batch = data.m_Item1[0];
        $scope.batchDetails = data.m_Item2;
        $scope.batchSpec = data.m_Item3;
        
        $scope.batch.BpmId = $location.search().id;
        $scope.changePlanQty();
        $scope.changeActualQty();
        let totalRoll = 0;
        angular.forEach($scope.batchSpec, function(item) {
          totalRoll = totalRoll + item.Rolls === undefined ? 0 : item.Rolls;
        });

        $scope.batch.TotalRolls = totalRoll;

        if (data.m_Item4[0].IsActive === 0) $scope.isEditable = true;
          else $scope.isEditable = false;


        if ($scope.batch.EditOnly === "NULL") { $scope.btnSave = "Save"; }
          else { $scope.btnSave = "Update"; $scope.batch.EditOnly = 0;}
      }
    );

    BatchCardNew.GetTrollyNo(12, function(data) {
      $scope.TrollyInfo = data;
    });

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
          message: "Do you want to save Batch Data?"
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

    $scope.shadeChange = function(f) {
      if (f == 0) {
        $scope.batch.ShadeOk = false;
        $scope.batch.ShadeNOk = true;
      } else if (f == 1) {
        $scope.batch.ShadeOk = true;
        $scope.batch.ShadeNOk = false;
      }
    };

    $scope.qualityChange = function(f) {
      if (f == 0) {
        $scope.batch.QualityOk = false;
        $scope.batch.QualityNOk = true;
      } else if (f == 1) {
        $scope.batch.QualityOk = true;
        $scope.batch.QualityNOk = false;
      }
    };

    $scope.changePlanQty = function() {
      let totalPlan = 0.0;
      for (i = 0; i < $scope.batchSpec.length; i++) {
        let pQty = parseFloat($scope.batchSpec[i].PlanQty);
        if (isNaN(pQty)) pQty = 0;

        totalPlan += pQty;
      }

      $scope.batch.Total = parseFloat(totalPlan.toFixed(2));
    };

    $scope.changeActualQty = function() {
      let totalActual = 0.0;
      for (i = 0; i < $scope.batchSpec.length; i++) {
        let aQty = parseFloat($scope.batchSpec[i].ActualQty);
        if (isNaN(aQty)) aQty = 0;

        totalActual += aQty;
      }

      $scope.batch.ActualTotal = parseFloat(totalActual.toFixed(2));
    };

    $scope.updateActualQty = function(obj, newValue) {
      // Update the ActualQty for the specific row
      obj.ActualQty = parseFloat(newValue) || "";

      // Recalculate the total ActualQty
      let totalActual = 0;
      for (let i = 0; i < $scope.batchSpec.length; i++) {
        let aQty = parseFloat($scope.batchSpec[i].ActualQty) || 0; // Ensure valid numeric value
        totalActual += aQty;
      }

      // Update the total in batch.ActualTotal
      $scope.batch.ActualTotal = totalActual;
    };

    $scope.changeAPlanQty = function() {
      let total = 0;
      for (i = 0; i < $scope.batchSpec.length; i++) {
        total += isNaN(parseInt($scope.batchSpec[i].ActualQty))
          ? 0
          : parseInt($scope.batchSpec[i].ActualQty);
      }
      $scope.batch.ActualTotal = total;
    };

    function SaveUpdate() {
      debugger;
      var rType = "";

      if ($scope.batch.ShadeOk) $scope.batch.Shade = "Ok";
      else if ($scope.batch.ShadeNOk) $scope.batch.Shade = "Not Ok";

      if ($scope.batch.QualityOk) $scope.batch.Quality = "Ok";
      else if ($scope.batch.QualityOk) $scope.batch.Quality = "Not Ok";
      for (t = 0; t < $scope.nozzleTrolley.length; t++) {
        $scope.nozzleTrolley[t].TrolleyId = $scope.nozzleTrolley[t].Trolley.id;
      }
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
      //if ($scope.batch.McNo.MDId) {
      //    $scope.batch.McId = $scope.batch.McNo.MDId;
      //    $scope.batch.McNo = $scope.batch.McNo.MachineNo;
      //}

      let Source = 0;
      if (
        $scope.SourceUnit === undefined ||
        $scope.SourceUnit.UnitId === null ||
        $scope.SourceUnit.UnitId === undefined
      )
        Source = $scope.batch.DyeingUnitId;
      else Source = $scope.SourceUnit.UnitId;

      let obj = {
        BpmId: $scope.batch.Id,
        UnitId:$scope.batch.DyeingUnitId === undefined ? 0 : $scope.batch.DyeingUnitId,
        //LoadingDate:null,
        LoadingTime: $scope.batch.LoadingTime === null ? "" : $scope.batch.LoadingTime,
        UnloadingTime: $scope.batch.UnloadingTime === null ? "" : $scope.batch.UnloadingTime,
        ShadeName: $scope.batch.Color,
        //LabdipNo: null,
        Turing: $scope.batch.Turing === null ? "" : $scope.batch.Turing,
        Enzyme: $scope.batch.Enzyme === null ? "" : $scope.batch.Enzyme,
        IssueMethod: $scope.batch.IssueMethod === null ? "" : $scope.batch.IssueMethod,
        Barcode: $scope.batch.Barcode === null ? "" : $scope.batch.Barcode,
        Roll: $scope.batch.Roll === null ? "" : $scope.batch.Roll,
        Shade: $scope.batch.Shade === null ? "" : $scope.batch.Shade,
        Quality: $scope.batch.Quality === null ? "" : $scope.batch.Quality,
        NoteDyeing: $scope.batch.NoteDyeing === null ? "" : $scope.batch.NoteDyeing,
        NoteFinishing: $scope.batch.NoteFinishing === null ? "" : $scope.batch.NoteFinishing,
        Process: $scope.batch.Process === null ? "" : $scope.batch.Process,
        EditOnly: $scope.batch.EditOnly,
        ReviseNo: $scope.batch.ReviseNo,
        //Reprocess: null,
        PPSample:  $scope.batchPPSample === undefined ? "" : $scope.batchPPSample,
        China: $scope.batchChina === undefined ? "" : $scope.batchChina,
        PPSampleWithChina: $scope.batchPPSamplewithChina === undefined ? "" : $scope.batchPPSamplewithChina,
        SourceUnitId: Source,
        UserId: $rootScope.UserId,
        Remarks: $scope.batch.Remarks,
        McNo: $scope.batch.McNo.MachineId === undefined  ? $scope.batch.MDId  : $scope.batch.McNo.MachineId,
        NewBatchSpec: $scope.batchSpec,
        NewBatchCardData: $scope.batchDetails,
        nozzleTr: $scope.nozzleTrolley
      };

      $scope.batch.PPSample = $scope.batch.PPSample == 1 ? true : false;
      $scope.batch.China = $scope.batch.China == 1 ? true : false;
      $scope.batch.PPSamplewithChina =
        $scope.batch.PPSamplewithChina == 1 ? true : false;

      if ($scope.batch.PPSample === true) rType = "PPSample";
      else if ($scope.batch.China === true) rType = "China";
      else if ($scope.batch.PPSamplewithChina === true) rType = "PPC";
      else rType = "o";

      BatchCardNew.BatchData_SaveUpdateNew(obj, function(res) {
        let Unit = Source;
          if (res.ErrorMsg == null) {
              $scope.batch.EditOnly = undefined;
              $rootScope.alert(res.Msg);
              $window.open(
                "../DashboardManagement/NewBatchCardReport?BpmId=" +
                  $scope.batch.Id +
                  "&&Format=PDF&&rType=" +
                  rType +
                  "&&UnitNo=" +
                  Unit +
                  "#view = FitH"
              );
          
          
        } else $rootScope.alert(res.ErrorMsg);
      });
    }
  }
]);
