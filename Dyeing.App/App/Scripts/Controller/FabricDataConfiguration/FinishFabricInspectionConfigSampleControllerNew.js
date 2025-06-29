app.controller("FinishFabricInspectionConfigSampleControllerNew", [
  "$scope",
  "$rootScope",
  "$window",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$state",
  "FinishFabricInspectionSampleConfig",
  "FinFabReqConfig",
  "FinishFabricInspectionConfig",
  function(
    $scope,
    $rootScope,
    $window,
    $mdDialog,
    $mdToast,
    $q,
    $state,
    FinishFabricInspectionSampleConfig,
    FinFabReqConfig,
    FinishFabricInspectionConfig
  ) {
    $scope.pageId = "1";
    $rootScope.menu = false;
    $scope.Batch2 = true;
    $scope.btmDisplay = false;
    $scope.truefalseBar = false;
    $scope.RadioMode = "N";
    $scope.HideAndShow = false;
    $scope.btnSaveDisabled = false;

    $scope.mnFaultList = [];
    $scope.CompactingTime = [{ id: 1, name: "1st Time" }];
    $scope.BodyPart = []; //{ 'id': 'Body', 'name': 'Body' }, { 'id': 'Body2', 'name': 'Body2' }, { 'id': 'Body3', 'name': 'Body3' }, { 'id': 'Neck', 'name': 'Neck' }, { 'id': 'BNT', 'name': 'BNT' }

    $scope.RadioMode = "N";
    $scope.batchType = "Single";

    console.log("RadioMode:", $scope.RadioMode);
    console.log("Batch Type:", $scope.batchType);

    $scope.showBodyParts = false;

    $scope.setMnFault = function(nameId, flag) {
      let model = {
        FaultID: parseInt(nameId),
        Flag: parseInt(flag)
      };
      let indx = $scope.mnFaultList.findIndex(
        x => x.FaultID == nameId && x.Flag == flag
      );
      if (indx >= 0) $scope.mnFaultList.splice(indx, 1);
      else {
        let indx = $scope.mnFaultList.findIndex(x => x.FaultID == nameId);
        if (indx >= 0) $scope.mnFaultList.splice(indx, 1);

        $scope.mnFaultList.push(model);
      }
    };

    $scope.isSet = function(nameId, flag) {
      let res = $scope.mnFaultList.filter(
        x => x.FaultID == nameId && x.Flag == flag
      );
      if (res.length > 0) return true;
      else return false;
    };

    $scope.getDataByBuyer = function() {
      if ($scope.master.Buyer) {
        var buyerId = $scope.master.Buyer.BuyerId;
        if (buyerId == null) return;

        FinishFabricInspectionConfig.GetBuyerJobOrderForMasterData(
          buyerId,
          "0",
          "A",
          "N",
          function(data) {
            $scope.OrderList = data.m_Item3;
          }
        );
      }
    };

    $scope.changeMode = function() {
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.master = {};
      $scope.bodyDisplay = false;
      $scope.BodyPart = [];
      $scope.RollList = [];
      $scope.countList = [];

      if ($scope.RadioMode === "N") {
        $scope.RadioMode = "R";
        $scope.HideAndShow = true;
      } else {
        $scope.RadioMode = "N";
        $scope.HideAndShow = false;
      }

      $scope.master.CompTime = null;
      $scope.master.Roll = "";
      $scope.master.BatchNo = "";

      $scope.BodyPart.forEach(function(item) {
        item.Weight = "";
        item.ActualDia = "";
        item.ActualGSM = "";
      });

      $scope.ProcessBy = {};
      $scope.GivenBy = {};
    };

    $scope.LoadFaultDetailsByRoll = function() {
      LoadFaultInspectionDetailsMultiple();

      LoadQABodyPartMultiple(); // show that individual body part name

      LoadBodyWeightGivenByProcessBy();
    };

    function LoadBodyWeightGivenByProcessBy() {
      debugger;

      var rollNo = $scope.master.selectedRollNo.Counting;

      var compTime = $scope.master.selectedCount.Counting;

      FinishFabricInspectionSampleConfig.LoadBodyWeightGivenByProcessBy(
        encodeURIComponent($scope.master.BatchNo),
        rollNo,
        compTime,
        function(data) {
          debugger;
          console.log(data);
          data.forEach(item => {
            item.Weight = parseFloat(item.Weight) || 0;
            item.ActualDia = parseFloat(item.ActualDia) || 0;
            item.ActualGSM = parseFloat(item.ActualGSM) || 0;
            item.ActualWeight = parseFloat(item.ActualWeight) || 0;
          });
          $scope.BodyPart = data;

          $scope.master.LabSticker = data[0].LabSticker;
          $scope.master.ProcessBySelected = null;
          $scope.master.GivenBySelected = null;
          $scope.master.ProcessBySelected = data[0].ProcessBy;
          $scope.master.GivenBySelected = data[0].GivenBy;

          $scope.master.StickerDia = data[0].ReqDia;
          $scope.master.StickerGSM = data[0].ReqGSM;
        }
      );
    }

    function LoadQABodyPartMultiple() {
      debugger;

      var rollNo = $scope.master.selectedRollNo.Counting;
      var compTime = $scope.master.selectedCount.Counting;

      FinishFabricInspectionSampleConfig.LoadQABodyPartMultiple(
        encodeURIComponent($scope.master.BatchNo),
        rollNo,
        compTime,
        function(data) {
          debugger;
          var BSpecId = data[0].BSpecId;

          $scope.master.bodyPartForMultiple = data[0].BSpecId;
        }
      );
    }

    function LoadFaultInspectionDetailsMultiple() {
      debugger;
      var batchType = $scope.batchType;

      var rollNo = $scope.master.selectedRollNo.Counting;
      var compTime = $scope.master.selectedCount.Counting;

      FinishFabricInspectionConfig.GetInspectionInfo(
        batchType,
        encodeURIComponent($scope.master.BatchNo),
        rollNo,
        compTime,
        function(data) {
          debugger;
          $scope.details = null;
          $scope.grade = null;
          $scope.btmDisplay = false;
          $scope.bodyDisplay = false;

          $scope.TotalPoint = 0;
          $scope.Ptsperhundred = 0;
          $scope.master.IsWithoutBarcode = true;

          if (data.fault.length == 0) {
            $scope.msg = "No Fault Found";
            $rootScope.alert($scope.msg);
          } else {
            debugger;
            $scope.details = data.fault.filter(x => x.PHeadNo != "23");
            $scope.majorMinorFault = data.fault.filter(x => x.PHeadNo == "23");

            let majorMinor = $scope.majorMinorFault.filter(x => x.Flag != null);
            for (i = 0; i < majorMinor.length; i++) {
              let model = {
                FaultID: majorMinor[i].NameID,
                Flag: parseInt(majorMinor[i].Flag)
              };
              $scope.mnFaultList.push(model);
            }
          }
          $scope.btmDisplay = true;
          $scope.bodyDisplay = true;
        }
      );
    }

    function GetRollStatus(BatchNo, CompTime) {
      FinishFabricInspectionConfig.GetRollStatus(
        encodeURIComponent(BatchNo),
        CompTime,
        function(data) {
          $scope.master.TotalRoll = data[0].TotalRoll;
          $scope.master.TRollWeight = data[0].TRollWeight;
        }
      );
    }

    function GetRollList(BatchNo, CompTime) {
      debugger;
      $scope.RollList = {};
      FinishFabricInspectionConfig.GetRollList(
        encodeURIComponent(BatchNo),
        CompTime,
        function(data) {
          console.log(data);
          $scope.RollList = data;
        }
      );
    }

    $scope.ChangeRoll = function() {
      var roll = $scope.master.Roll.Value;
      console.log("roll", roll);
      if (roll == null) return;
      if ($scope.RadioMode == "R" && $scope.master.Roll.Value > 0) {
        LoadByBatch();
      }
    };

    $scope.changeCompTime = function() {
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];
      $scope.master.Roll = "";
      var compTime = $scope.master.CompTime;
      //console.log("roll", roll);
      if (compTime == null) return;
      if ($scope.RadioMode == "R" && $scope.master.CompTime > 0) {
        let Batch = $scope.master.BatchNo.split("(");
        GetRollStatus(Batch[0], compTime);
        FinishFabricInspectionConfig.GetRollNo(
          encodeURIComponent(Batch[0]),
          compTime,
          function(data) {
            $scope.RollNoInfo = data;
            //$scope.master.CompTime = data[0].CompTime;
            if ($scope.RadioMode == "R" && Batch.length > 1) {
              let rollNo = Batch[1].replace("(", "").replace(")", "");
              $scope.master.Roll = { Value: rollNo, DisplayValue: rollNo };
              LoadByBatch();
            }
          }
        );
      }
    };

    function LoadGivenBy() {
      $scope.GivenBy = [];
      FinishFabricInspectionSampleConfig.LoadGivenBy(function(givenBy) {
        $scope.GivenBy = givenBy;
      });
    }

    $scope.enterBatchClick = function() {
      if ($scope.RadioMode == "N" && $scope.batchType == "Single") {
        LoadByBatch();
      } else if ($scope.RadioMode == "N" && $scope.batchType == "Multiple") {
        LoadByBatchMultiple();
      } else if ($scope.RadioMode == "R" && $scope.batchType == "Single") {
        $scope.details = [];
        $scope.majorMinorFault = [];
        $scope.mnFaultList = [];
        $scope.master.Roll = "";
        $scope.RollList = [];
        $scope.countList = [];

        LoadProcessBy();
        LoadGivenBy();
        LoadCounting();
      } else if ($scope.RadioMode == "R" && $scope.batchType == "Multiple") {
        debugger;
        LoadByBatchMultipleModify();
      } else {
        $scope.details = [];
        $scope.majorMinorFault = [];
        $scope.mnFaultList = [];
        $scope.master.Roll = "";
        $scope.RollList = [];
        $scope.countList = [];

        let BatchNo = "";
        if ($scope.master.BatchNo.indexOf("(RP-") == -1) {
          let Batch = $scope.master.BatchNo.split("(");
          BatchNo = Batch[0];
        } else BatchNo = $scope.master.BatchNo;
      }
    };

    function LoadByBatchMultipleModify() {
      debugger;

      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];
      $scope.master.Roll = "";
      $scope.RollList = [];
      $scope.countList = [];

      LoadProcessBy();
      LoadGivenBy();
      LoadCounting();
      LoadBodyPart();
    }

    function LoadBodyPart() {
      debugger;
      $scope.master.BodyPartsMultiple = [];

      FinishFabricInspectionSampleConfig.LoadBodyPart(
        encodeURIComponent($scope.master.BatchNo),
        function(data) {
          debugger;
          $scope.master.BodyPartsMultiple = data;
        }
      );
    }

    function LoadByBatchMultiple() {
      $scope.mnFaultList = [];
      $scope.majorMinorFault = [];
      $scope.BodyPart = null;
      $scope.RollList = [];
      $scope.countList = [];

      //ClearAll();

      var type = "batch";
      if (
        $scope.master.BatchNo != undefined ||
        $scope.master.BatchNo != "" ||
        $scope.master.BatchNo != "undefined"
      ) {
        FinishFabricInspectionSampleConfig.GetInspectionInfoMultiple(
          type,
          encodeURIComponent($scope.master.BatchNo),
          // rollNo,
          // compTime,
          function(data) {
            $scope.details = null;
            $scope.grade = null;
            $scope.btmDisplay = false;
            $scope.bodyDisplay = false;

            debugger;

            $scope.TotalPoint = 0;
            $scope.Ptsperhundred = 0;
            $scope.master.IsWithoutBarcode = true;

            var model = data.master[0];

            //  $scope.BodyPart = data.batchSpecSample;

            $scope.ProcessBy = data.processBy;
            $scope.GivenBy = data.dyeingGivenBy;

            //if ($scope.BodyPart.length > 0 && $scope.RadioMode == "N") {
            //    $scope.master.BodyPart = $scope.BodyPart[0].id;

            debugger;
            $scope.master.BodyPartsMultiple = data.batchSpecSample;
            console.log("body part dropdown", $scope.master.BodyPartsMultiple);

            //} else if ($scope.RadioMode == "R") {
            //  $scope.master.BodyPart = model.BSpecId;
            //}

            $scope.master.Buyer = model.BuyerName;
            $scope.master.Job = model.JobInfo;
            $scope.master.Order = model.OrderNo;
            $scope.master.FabColor = model.FabColor;

            $scope.master.ReqDia = model.ReqDia;
            $scope.master.ReqGSM = model.ReqGSM;

            // for lab sticker

            debugger;

            $scope.master.StickerDia = model.ReqDia;
            $scope.master.StickerGSM = model.ReqGSM;

            console.log("sticker dia" + $scope.master.StickerDia);
            console.log("sticker gsm" + $scope.master.StickerGSM);

            $scope.master.Machine = model.MachineNo;
            $scope.master.UnitEName = model.UnitEName;

            $scope.master.BatchWeight = model.BatchWeight;
            $scope.master.FabType = model.FabType;
            //$scope.master.BodyPart = model.BodyPart;
            $scope.master.LabSticker = model.LabSticker == 1 ? true : false;

            $scope.master.TotalRoll = model.TotalRoll;
            $scope.master.TRollWeight = model.TRollWeight;

            debugger;
            $scope.master.CompTime = model.MaxCompTime;

            debugger;

            $scope.master.TestRequirement = model.TestRequirement;

            console.log("test requirement", $scope.master.TestRequirement);

            if (data.fault.length == 0) {
              $scope.msg = "No Fault Found";
              $rootScope.alert($scope.msg);
            } else {
              debugger;

              $scope.details = data.fault.filter(x => x.PHeadNo != "23");
              $scope.majorMinorFault = data.fault.filter(
                x => x.PHeadNo == "23"
              );

              let majorMinor = $scope.majorMinorFault.filter(
                x => x.Flag != null
              );
              for (i = 0; i < majorMinor.length; i++) {
                let model = {
                  FaultID: majorMinor[i].NameID,
                  Flag: parseInt(majorMinor[i].Flag)
                };
                $scope.mnFaultList.push(model);
              }

              //console.log($scope.details);
              console.log($scope.majorMinorFault);
              console.log("mnFaultList", $scope.mnFaultList);
            }

            //$scope.grade = data.grade;
            debugger;

            $scope.btmDisplay = true;
            $scope.bodyDisplay = true;
            // }
          }
        );
      }
    }

    function LoadByBatch() {
      $scope.mnFaultList = [];
      $scope.majorMinorFault = [];
      $scope.RollList = [];
      $scope.countList = [];

      //  ClearAll();

      var type = "batch";
      if (
        $scope.master.BatchNo != undefined ||
        $scope.master.BatchNo != "" ||
        $scope.master.BatchNo != "undefined"
      ) {
        var rollNo = 0;
        if ($scope.master.Roll) rollNo = $scope.master.Roll.Value;

        let compTime = 1;
        if ($scope.RadioMode == "R") {
          if (
            $scope.master.CompTime != "" &&
            $scope.master.CompTime != undefined
          )
            compTime = $scope.master.CompTime;
        }

        if (rollNo == null) rollNo = 0;

        FinishFabricInspectionSampleConfig.GetInspectionInfo(
          type,
          encodeURIComponent($scope.master.BatchNo),
          rollNo,
          compTime,
          function(data) {
            $scope.details = null;
            $scope.grade = null;
            $scope.btmDisplay = false;
            $scope.bodyDisplay = false;

            debugger;

            $scope.TotalPoint = 0;
            $scope.Ptsperhundred = 0;
            $scope.master.IsWithoutBarcode = true;

            var model = data.master[0];

            $scope.BodyPart = data.batchSpecSample;

            $scope.ProcessBy = data.processBy;
            $scope.GivenBy = data.dyeingGivenBy;

            if ($scope.BodyPart.length > 0 && $scope.RadioMode == "N") {
              $scope.master.BodyPart = $scope.BodyPart[0].id;
            } else if ($scope.RadioMode == "R") {
              $scope.master.BodyPart = model.BSpecId;
            }

            $scope.master.Buyer = model.BuyerName;
            $scope.master.Job = model.JobInfo;
            $scope.master.Order = model.OrderNo;
            $scope.master.FabColor = model.FabColor;

            $scope.master.ReqDia = model.ReqDia;
            $scope.master.ReqGSM = model.ReqGSM;

            // for lab sticker

            $scope.master.StickerDia = model.ReqDia;
            $scope.master.StickerGSM = model.ReqGSM;

            console.log("sticker dia" + $scope.master.StickerDia);
            console.log("sticker gsm" + $scope.master.StickerGSM);

            $scope.master.Machine = model.MachineNo;
            $scope.master.UnitEName = model.UnitEName;

            $scope.master.BatchWeight = model.BatchWeight;
            $scope.master.FabType = model.FabType;
            //$scope.master.BodyPart = model.BodyPart;
            $scope.master.LabSticker = model.LabSticker == 1 ? true : false;

            $scope.master.TotalRoll = model.TotalRoll;
            $scope.master.TRollWeight = model.TRollWeight;
            //$scope.master.CompTime = model.CompTime;

            debugger;

            $scope.master.TestRequirement = model.TestRequirement;

            console.log("test requirement", $scope.master.TestRequirement);

            if ($scope.RadioMode == "N") {
              $scope.master.CompTime = model.CompTime;
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
            }

            if (
              $scope.master.Machine == undefined ||
              $scope.master.Machine == ""
            )
              return;

            if (rollNo > 0) {
              $scope.master.Width = model.Width;
              $scope.master.FinishWeight = model.FinishWeight;
              $scope.master.Remarks = model.Remarks;
            }
            if (data.fault.length == 0) {
              $scope.msg = "No Fault Found";
              $rootScope.alert($scope.msg);
            } else {
              debugger;

              $scope.details = data.fault.filter(x => x.PHeadNo != "23");
              $scope.majorMinorFault = data.fault.filter(
                x => x.PHeadNo == "23"
              );

              let majorMinor = $scope.majorMinorFault.filter(
                x => x.Flag != null
              );
              for (i = 0; i < majorMinor.length; i++) {
                let model = {
                  FaultID: majorMinor[i].NameID,
                  Flag: parseInt(majorMinor[i].Flag)
                };
                $scope.mnFaultList.push(model);
              }

              //console.log($scope.details);
              console.log($scope.majorMinorFault);
              console.log("mnFaultList", $scope.mnFaultList);
            }

            //$scope.grade = data.grade;

            $scope.btmDisplay = true;
            $scope.bodyDisplay = true;
            // }
          }
        );
      }
    }

    function LoadProcessBy() {
      $scope.ProcessBy = [];
      FinishFabricInspectionSampleConfig.LoadProcessBy(function(processBy) {
        $scope.ProcessBy = processBy;
      });
    }

    function LoadCounting() {
      $scope.countList = $scope.countList = {};
      $scope.BodyPart = [];

      FinishFabricInspectionSampleConfig.LoadCounting(
        encodeURIComponent($scope.master.BatchNo),
        function(data) {
          debugger;
          $scope.countList = data;
          $scope.master.Buyer = data[0].BuyerName;
          $scope.master.Job = data[0].JobInfo;
          $scope.master.Order = data[0].OrderNo;
          $scope.master.FabType = data[0].FabType;
          $scope.master.FabColor = data[0].FabColor;
          $scope.master.TestRequirement = data[0].TestRequirement;
          $scope.master.UnitEName = data[0].UnitEName;

          $scope.master.StickerDia = data[0].ReqDia;
          $scope.master.StickerGSM = data[0].ReqGSM;
        }
      );
    }

    $scope.LoadQARecord = function() {
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];
      $scope.master.Roll = "";
      $scope.BodyPart = {};
      $scope.master.LabSticker = 0;

      $scope.master.TotalRoll = "";
      $scope.master.TRollWeight = "";

      if ($scope.master.selectedCount) {
        if ($scope.batchType === "Single" && $scope.RadioMode === "R") {
          LoadBodyPartDetails(
            $scope.master.BatchNo,
            $scope.master.selectedCount.Counting
          );

          LoadFaultInspectionDetails(
            $scope.master.BatchNo,
            $scope.master.selectedCount.Counting
          );
        }

        //if ($scope.master.selectedCount) {
        //  if ($scope.batchType === "Multiple" && $scope.RadioMode === "N") {
        //    LoadBodyPartDetails(
        //      $scope.master.BatchNo,
        //      $scope.master.selectedCount.Counting
        //    );

        //    LoadFaultInspectionDetails(
        //      $scope.master.BatchNo,
        //      $scope.master.selectedCount.Counting
        //    );
        //  }

        if ($scope.batchType === "Multiple" && $scope.RadioMode === "R") {
          // Load roll no dropdown

          GetRollList(
            $scope.master.BatchNo,
            $scope.master.selectedCount.Counting
          );

          // load total roll and total weight
          GetRollStatus(
            $scope.master.BatchNo,
            $scope.master.selectedCount.Counting
          );
        }
      }
    };

    $scope.LoadIndividualBodyPartDetail = function() {
      debugger;

      if (
        $scope.master.bodyPartForMultiple != null &&
        $scope.batchType === "Multiple" &&
        $scope.RadioMode === "N"
      ) {
        LoadIndividualBodyPartDetail(
          $scope.master.BatchNo,
          $scope.master.bodyPartForMultiple
        );
      }
    };

    function LoadIndividualBodyPartDetail(BatchNo, BSpecId) {
      FinishFabricInspectionSampleConfig.LoadBodyPartDetailsIndividual(
        encodeURIComponent(BatchNo),
        BSpecId,
        function(data) {
          debugger;
          console.log(data);

          data.forEach(item => {
            item.Weight = parseFloat(item.Weight) || 0;
            item.ActualDia = parseFloat(item.ActualDia) || 0;
            item.ActualGSM = parseFloat(item.ActualGSM) || 0;
            item.ActualWeight = parseFloat(item.ActualWeight) || 0;
          });

          //  $scope.BodyPart = data;

          $scope.BodyPart = data;
        }
      );
    }

    function LoadBodyPartDetails(BatchNo, Counting) {
      $scope.master.LabSticker = 0;

      FinishFabricInspectionSampleConfig.LoadBodyPartDetails(
        encodeURIComponent(BatchNo),
        Counting,
        function(data) {
          $scope.BodyPart = data;
          $scope.master.LabSticker = data[0].LabSticker;
          $scope.master.ProcessBySelected = null;
          $scope.master.GivenBySelected = null;
          $scope.master.ProcessBySelected = data[0].ProcessBy;
          $scope.master.GivenBySelected = data[0].GivenBy;
        }
      );
    }

    function LoadFaultInspectionDetails(BatchNo, Counting) {
      $scope.mnFaultList = [];
      $scope.majorMinorFault = [];
      debugger;

      FinishFabricInspectionSampleConfig.LoadFaultInspectionDetails(
        encodeURIComponent(BatchNo),
        Counting,
        function(data) {
          $scope.details = null;
          $scope.grade = null;
          $scope.btmDisplay = false;
          $scope.bodyDisplay = false;
          debugger;
          $scope.details = data.filter(x => x.PHeadNo != "23");
          $scope.majorMinorFault = data.filter(x => x.PHeadNo == "23");
          let majorMinor = $scope.majorMinorFault.filter(x => x.Flag != null);

          for (i = 0; i < majorMinor.length; i++) {
            let model = {
              FaultID: majorMinor[i].NameID,
              Flag: parseInt(majorMinor[i].Flag)
            };
            $scope.mnFaultList.push(model);
          }
          console.log($scope.majorMinorFault);
          console.log("mnFaultList", $scope.mnFaultList);

          $scope.btmDisplay = true;
          $scope.bodyDisplay = true;
        }
      );
    }

    $scope.pointClick = function(pVal, sl, f) {
      if (f == "mn") {
        if ($scope.majorMinorFault[sl].PointData == null) {
          $scope.majorMinorFault[sl].PointData = pVal;
        } else if ($scope.majorMinorFault[sl].PointData == "") {
          $scope.majorMinorFault[sl].PointData = pVal;
        } else {
          $scope.majorMinorFault[sl].PointData =
            $scope.majorMinorFault[sl].PointData + "+" + pVal;
        }
      } else {
        if ($scope.details[sl].PointData == null) {
          $scope.details[sl].PointData = pVal;
        } else if ($scope.details[sl].PointData == "") {
          $scope.details[sl].PointData = pVal;
        } else {
          $scope.details[sl].PointData =
            $scope.details[sl].PointData + "+" + pVal;
        }
      }
    };

    $scope.backSpaceClick = function(sl, fNameId, f) {
      if (f == "mn") {
        let index = $scope.mnFaultList.findIndex(x => x.FaultID == fNameId);
        $scope.mnFaultList.splice(index, 1);
      }

      if ($scope.RadioMode == "N") {
        if (
          $scope.details[sl].PointData == null ||
          $scope.details[sl].PointData == ""
        ) {
          $scope.details[sl].PointData = null;
          return;
        } else {
          var n = $scope.details[sl].PointData.lastIndexOf("+");
          //var pVal = $scope.details[sl].PointData.substring(n + 1);
          $scope.details[sl].PointData = $scope.details[sl].PointData.substring(
            0,
            n
          );
        }
      } else {
        if (
          $scope.details[sl].PointData == null ||
          $scope.details[sl].PointData == ""
        ) {
          $scope.details[sl].PointData = null;
          return;
        } else {
          var n = $scope.details[sl].PointData.lastIndexOf("+");
          //var pVal = $scope.details[sl].PointData.substring(n + 1);
          $scope.details[sl].PointData = $scope.details[sl].PointData.substring(
            0,
            n
          );
        }
      }
    };

    $scope.ConfirmSave = function(ev) {
      if (valid()) {
        if ($scope.batchType == "Single") {
          SaveUpdate();
        } else if ($scope.batchType == "Multiple") {
          SaveUpdateMultiple();
        }
      }
    };

    function SaveUpdateMultiple() {
      debugger;

      //if (parseFloat($scope.master.FinishWeight) <= 0) {
      //    $rootScope.alert("Please! Enter Valid Roll Weight....");
      //    return;
      //}

      $scope.master.UserId = $rootScope.UserId;

      //if ($scope.master.Roll) $scope.master.RollNo = $scope.master.Roll.Value;

      if ($scope.RadioMode === "R" && $scope.batchType === "Multiple") {
        debugger;
        $scope.master.CompTime = $scope.master.selectedCount.Counting;
        $scope.master.RollNo = $scope.master.selectedRollNo.Counting;
        //$scope.master.RollNo = 1;
      }

      $scope.master.list = [];

      for (var i = 0; i < $scope.details.length; i++) {
        if ($scope.details[i].PointData != null) {
          var totalpointArray = $scope.details[i].PointData.split("+");
          var totalpoint = 0;
          $.each(totalpointArray, function() {
            var val = this.trim();
            if ($.isNumeric(val)) {
              totalpoint += parseInt(val);
            }
            $scope.details[i].TotalPoint = totalpoint;
          });
        }
        if ($.isNumeric($scope.details[i].DetailID) == false) {
          $scope.details[i].DetaiID = -1;
        }
        if ($.isNumeric(totalpoint) == false) {
          $scope.details[i].TotalPoint = 0;
        }
        var vd = {
          FaultID: $scope.details[i].NameID,
          DyedInspectionDetailID: $scope.details[i].DyedInspectionDetailID,
          PointID: $scope.details[i].PointID,
          PointData: $scope.details[i].PointData,
          TotalPoint: $scope.details[i].TotalPoint,
          RollNo: $scope.master.RollNo
        };
        $scope.master.list.push(vd);
      }

      if ($scope.master.list.length <= 0) {
        $rootScope.alert("No Fault Found. Pls Select Fault to Save....");
        return;
      }

      $scope.master.mnFaultList = $scope.mnFaultList;

      $scope.btnSaveDisabled = true;

      if ($scope.BodyPart.length > 0) {
        let firstItem = $scope.BodyPart[0];

        debugger;
        console.log(firstItem);
        $scope.master.FinishWeight = firstItem.Weight;

        $scope.master.ReqDia = firstItem.ActualDia;
        $scope.master.ReqGSM = firstItem.ActualGSM;

        $scope.master.BodyPart = firstItem.Id;
        $scope.master.Width = firstItem.ActualDia;
      }

      $scope.master.LabSticker = $scope.master.LabSticker ? 1 : 0;

      console.log($scope.master);
      console.log($scope.BodyPart);

      // $scope.master.BatchSpecSampleList = $scope.BodyPart;

      FinishFabricInspectionSampleConfig.SaveUpdateSampleMultiple(
        $scope.master,
        function(res) {
          if (res.ErrorMsg == null) {
            let msg = "";
            if ($scope.master.RollNo > 0) {
              msg =
                "The Roll No: " +
                $scope.master.RollNo +
                " of Batch " +
                $scope.master.BatchNo +
                " Revised Successfully.";
            } else msg = res.Msg;

            let currentDate = new Date();

            let formattedDate = `${currentDate
              .getDate()
              .toString()
              .padStart(2, "0")}-${currentDate.toLocaleString("en-GB", {
              month: "short"
            })}-${currentDate
              .getFullYear()
              .toString()
              .slice(-2)}`;

            // Find selected ProcessBy and GivenBy display members

            let selectedProcessBy = $scope.ProcessBy.find(
              item => item.Id === $scope.master.ProcessBySelected
            );
            debugger;
            console.log("selectedProcessBy", selectedProcessBy);

            let selectedGivenBy = $scope.GivenBy.find(
              item => item.Id === $scope.master.GivenBySelected
            );

            debugger;
            console.log("selectedGivenBy", selectedGivenBy);

            let model = {
              UnitEName: $scope.master.UnitEName,
              Buyer: $scope.master.Buyer,
              Job: $scope.master.Job,
              Order: $scope.master.Order,
              BatchNo: $scope.master.BatchNo,
              FabColor: $scope.master.FabColor,

              ReqDia: $scope.master.StickerDia,
              ReqGSM: $scope.master.StickerGSM,

              RollNo: res.Data.rollNo,
              FabType: $scope.master.FabType,
              FinishWeight: $scope.master.FinishWeight,

              StickerPath: res.Data.stickerPath,
              LabStickerReq: $scope.master.LabSticker,

              BodyPart: $scope.BodyPart[0].BodyPart,

              CompTime: $scope.master.CompTime,
              TestRequirement: $scope.master.TestRequirement,
              ProcessBy: selectedProcessBy
                ? selectedProcessBy.DyeingProcessName
                : "",
              GivenBy: selectedGivenBy ? selectedGivenBy.GivenName : "",
              CurrentDate: formattedDate,
              ActualWeight: $scope.BodyPart[0].ActualWeight
              // ,
              //TotalWeightQA: totalWeightQA,
              //TotalWeightActual: totalWeightActual
            };

            debugger;
            console.log("model", model);

            debugger;

            //genSticker(model);

            GetRollStatus($scope.master.BatchNo, $scope.master.CompTime);

            genStickerMultiple(model);

            for (var i = 0; i < $scope.details.length; i++) {
              $scope.details[i].PointData = null;
              $scope.details[i].TotalPoint = 0;
            }

            $scope.mnFaultList = [];
            $scope.master.Remarks = "";
            $scope.master.FinishWeight = "";
            $scope.master.Width = "";
            $scope.master.LabSticker = false;

            debugger;

            //  $scope.master.Buyer = "";
            //  $scope.master.Job = "";
            //  $scope.master.Order = "";
            $scope.master.countList = [];
            $scope.master.selectedCount = 0;
            //$scope.master.CompTime = 0;

            $scope.master.ProcessBy = [];
            $scope.master.ProcessBySelected = 0;

            $scope.master.GivenBySelected = 0;
            $scope.master.GivenBy = [];
            //  $scope.BodyPart = {};
            //  $scope.btmDisplay = false;
            //  $scope.bodyDisplay = false;

            $mdDialog.cancel();

            //if ($scope.RadioMode == "R" && $scope.master.RollNo > 0) {
            //  $scope.Refresh();
            //  $scope.RadioMode = "N";
            //}
          } else $rootScope.alert(res.ErrorMsg);
        }
      );
    }

    function genStickerMultiple(data) {
      console.log("sticker", data);
      debugger;

      var printContents =
        `<div class="wrapper">
        <div class="header">
            <div class="logo">
                <img src="../../../Content/img/Masco.jpg" />               
            </div>

            <div class="unit">                
                <span><b>` +
        data.UnitEName +
        `</b></span>
            </div>
            <div class="qr_code">
                <img src="` +
        data.StickerPath +
        `" />
            </div>

        </div>
        <div class="body">
            <table class="table">
                <tr>
                    <td colspan="4">Buyer:
                    ` +
        data.Buyer +
        `</td>
                </tr>
                <tr>
                    <td colspan="4">J:` +
        data.Job +
        `, R.No:` +
        data.RollNo +
        ` (` +
        data.BodyPart +
        `)</td>
                </tr>
                <tr>
                    <td colspan="4">S:
                    ` +
        data.Order +
        `</td>
                </tr>
                <tr>
                    <td colspan="2">B:
                    ` +
        data.BatchNo +
        `</td>
                <td colspan="2">
                    ` +
        data.CurrentDate +
        `</td>
                </tr>
         <tr>

          <td colspan="4" style="font-size:` +
        (`C:`.length + data.FabColor.length > 72 ? "4pt" : "7pt") +
        `">C: ` +
        data.FabColor +
        `</td>
         </tr>
         <tr>
       <td colspan="4" style="font-size:` +
        (`F:`.length + data.FabType.length > 72 ? "4pt" : "7pt") +
        `">F: ` +
        data.FabType +
        `</td>
         </tr>
       
        <tr>
           <td colspan="4">TR: ` +
        data.TestRequirement +
        `</td>
         </tr>



        <tr>
           <td>Dia:
           ` +
        data.ReqDia +
        `</td>
           <td>GSM:
           ` +
        data.ReqGSM +
        `</td>
          <td colspan="2">R.Wgt:
           ` +
        data.FinishWeight +
        `kg</td>

        </tr>



          <tr>
           <td colspan="2">Prs By:
           ` +
        data.ProcessBy +
        `</td>
           <td colspan="2">Given:
           ` +
        data.GivenBy +
        `</td>
           </tr>

            </table>
        </div>    
    </div>`;

      if (data.LabStickerReq == true) {
        printContents +=
          `<div class="wrapper">
                <div class="header">
                    <div class="qr_code">
                        <img src="` +
          data.StickerPath +
          `" />
                    </div>                    

                    <div class="unit">                        
                        <span><b>` +
          data.UnitEName +
          `</b></span>
                    </div>

                    <div class="logo">
                        <img src="../../../Content/img/Masco.jpg" />
                    </div>

                </div>
                <div class="body">
                    <table class="table">
                        <tr>
                            <td colspan="4">Buyer:
                           ` +
          data.Buyer +
          `</td>
                        </tr>
                        <tr>
                              <td colspan="4">J:` +
          data.Job +
          `, R.No:` +
          data.RollNo +
          ` (` +
          data.BodyPart +
          `)</td>
                        </tr>
                        <tr>
                            <td colspan="4">S:
                            ` +
          data.Order +
          `</td>
                        </tr>
                        <tr>
                            <td colspan="2">B:
                            ` +
          data.BatchNo +
          `</td>           <td colspan="2">
                    ` +
          data.CurrentDate +
          `</td>
                        </tr>
                        <tr>

          <td colspan="4" style="font-size:` +
          (`C:`.length + data.FabColor.length > 72 ? "4pt" : "7pt") +
          `">C: ` +
          data.FabColor +
          `</td>
                        </tr>
                        <tr>

        <td colspan="4" style="font-size:` +
          (`F:`.length + data.FabType.length > 72 ? "4pt" : "7pt") +
          `">F: ` +
          data.FabType +
          `</td>

            </tr>
           <tr>
           <td colspan="4">TR :` +
          data.TestRequirement +
          `</td>
          </tr>

           <tr>
           <td>Dia:
           ` +
          data.ReqDia +
          `</td>
           <td>GSM:
           ` +
          data.ReqGSM +
          `</td>
          <td colspan="2">R.Wgt:
           ` +
          data.ActualWeight +
          `kg</td>
        </tr>


           <td colspan="2">Prs By:
           ` +
          data.ProcessBy +
          `</td>
           <td colspan="2">Given:
           ` +
          data.GivenBy +
          `</td>
           </tr>
                    </table>
                </div>
            </div>`;
      }

      var popupWin = window.open("", "_blank", "width=auto,height=auto");

      popupWin.document.open();
      popupWin.document.write(
        `<html><head><link href="../../../Content/css/sticker.css" rel="stylesheet" /></head><body onload="window.print()">` +
          printContents +
          `</body></html>`
      );
      popupWin.document.close();
    }

    function GetRollStatus(BatchNo, CompTime) {
      FinishFabricInspectionConfig.GetRollStatus(
        encodeURIComponent(BatchNo),
        CompTime,
        function(data) {
          $scope.master.TotalRoll = data[0].TotalRoll;
          $scope.master.TRollWeight = data[0].TRollWeight;
        }
      );
    }

    $scope.onlyNumbers = function(event) {
      var charCode = event.which || event.keyCode;

      if ((charCode >= 48 && charCode <= 57) || charCode === 46) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    };

    function DialogController($scope, $mdDialog) {
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.actionDialog = function() {
        SaveUpdate();
      };
    }

    function objData() {
      var obj = [];
      if ($scope.RadioMode == "N") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to save Data?"
        };
      } else if ($scope.RadioMode == "R") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Revise Confirmation",
          message: "Do you want to revise Data?"
        };
      }
      return obj;
    }

    function SaveUpdate() {
      debugger;

      //if (parseFloat($scope.master.FinishWeight) <= 0) {
      //    $rootScope.alert("Please! Enter Valid Roll Weight....");
      //    return;
      //}

      $scope.master.UserId = $rootScope.UserId;
      if ($scope.master.Roll) $scope.master.RollNo = $scope.master.Roll.Value;

      if ($scope.RadioMode == "R") {
        $scope.master.CompTime = $scope.master.selectedCount.Counting;
        $scope.master.RollNo = 1;
      }

      $scope.master.list = [];

      for (var i = 0; i < $scope.details.length; i++) {
        if ($scope.details[i].PointData != null) {
          var totalpointArray = $scope.details[i].PointData.split("+");
          var totalpoint = 0;
          $.each(totalpointArray, function() {
            var val = this.trim();
            if ($.isNumeric(val)) {
              totalpoint += parseInt(val);
            }
            $scope.details[i].TotalPoint = totalpoint;
          });
        }
        if ($.isNumeric($scope.details[i].DetailID) == false) {
          $scope.details[i].DetaiID = -1;
        }
        if ($.isNumeric(totalpoint) == false) {
          $scope.details[i].TotalPoint = 0;
        }
        var vd = {
          FaultID: $scope.details[i].NameID,
          DyedInspectionDetailID: $scope.details[i].DyedInspectionDetailID,
          PointID: $scope.details[i].PointID,
          PointData: $scope.details[i].PointData,
          TotalPoint: $scope.details[i].TotalPoint,
          RollNo: $scope.master.RollNo
        };
        $scope.master.list.push(vd);
      }

      if ($scope.master.list.length <= 0) {
        $rootScope.alert("No Fault Found. Pls Select Fault to Save....");
        return;
      }

      $scope.master.mnFaultList = $scope.mnFaultList;

      $scope.btnSaveDisabled = true;

      if ($scope.BodyPart.length > 0) {
        let firstItem = $scope.BodyPart[0];

        debugger;
        console.log(firstItem);
        $scope.master.FinishWeight = firstItem.Weight;

        $scope.master.ReqDia = firstItem.ActualDia;
        $scope.master.ReqGSM = firstItem.ActualGSM;

        $scope.master.BodyPart = firstItem.Id;
        $scope.master.Width = firstItem.ActualDia;
      }

      $scope.master.LabSticker = $scope.master.LabSticker ? 1 : 0;

      console.log($scope.master);
      console.log($scope.BodyPart);

      debugger;

      $scope.master.BatchSpecSampleList = $scope.BodyPart;

      debugger;
      console.log($scope.master);

      FinishFabricInspectionSampleConfig.SaveUpdateSample(
        $scope.master,
        function(res) {
          if (res.ErrorMsg == null) {
            let msg = "";
            //if ($scope.master.RollNo > 0) {
            //    msg = "The Roll No: " + $scope.master.RollNo + " of Batch " + $scope.master.BatchNo + " Revised Successfully.";
            //} else
            //    msg = res.Msg;

            let currentDate = new Date();
            let formattedDate = `${currentDate
              .getDate()
              .toString()
              .padStart(2, "0")}-${currentDate.toLocaleString("en-GB", {
              month: "short"
            })}-${currentDate
              .getFullYear()
              .toString()
              .slice(-2)}`;

            // Find selected ProcessBy and GivenBy display members
            let selectedProcessBy = $scope.ProcessBy.find(
              item => item.Id === $scope.master.ProcessBySelected
            );
            let selectedGivenBy = $scope.GivenBy.find(
              item => item.Id === $scope.master.GivenBySelected
            );

            // find the total weight of all the body parts

            let totalWeightQA = 0;

            for (let i = 0; i < $scope.master.BatchSpecSampleList.length; i++) {
              totalWeightQA =
                totalWeightQA +
                  parseFloat($scope.master.BatchSpecSampleList[i].Weight) || 0;
            }

            let totalWeightActual = 0;

            for (let i = 0; i < $scope.master.BatchSpecSampleList.length; i++) {
              totalWeightActual =
                totalWeightActual +
                  parseFloat(
                    $scope.master.BatchSpecSampleList[i].ActualWeight
                  ) || 0;
            }

            debugger;
            console.log(totalWeightActual);

            let model = {
              UnitEName: $scope.master.UnitEName,
              Buyer: $scope.master.Buyer,
              Job: $scope.master.Job,
              Order: $scope.master.Order,
              BatchNo: $scope.master.BatchNo,
              FabColor: $scope.master.FabColor,

              //    ReqDia: $scope.master.ReqDia, //$scope.master.ReqDia,
              //     ReqGSM: $scope.master.ReqGSM, //$scope.master.ReqGSM,

              ReqDia: $scope.master.StickerDia,
              ReqGSM: $scope.master.StickerGSM,

              // RollNo: res.Data.rollNo,
              FabType: $scope.master.FabType,
              FinishWeight: $scope.master.FinishWeight,
              // BatchWeight: res.Data.BatchWeight, //$scope.master.BatchWeight,
              StickerPath: res.Data.stickerPath,
              LabStickerReq: $scope.master.LabSticker,
              // BodyPart: res.Data.BodyPart,
              // CompTime: $scope.master.CompTime,
              TestRequirement: $scope.master.TestRequirement,
              ProcessBy: selectedProcessBy
                ? selectedProcessBy.DyeingProcessName
                : "",
              GivenBy: selectedGivenBy ? selectedGivenBy.GivenName : "",
              CurrentDate: formattedDate,
              TotalWeightQA: totalWeightQA,
              TotalWeightActual: totalWeightActual
            };
            debugger;

            console.log("model", model);

            debugger;

            genSticker(model);

            for (var i = 0; i < $scope.details.length; i++) {
              $scope.details[i].PointData = null;
              $scope.details[i].TotalPoint = 0;
            }

            $scope.mnFaultList = [];
            $scope.master.Remarks = "";
            $scope.master.FinishWeight = "";
            $scope.master.Width = "";
            $scope.master.LabSticker = false;

            debugger;

            $scope.master.Buyer = "";
            $scope.master.Job = "";
            $scope.master.Order = "";
            $scope.master.countList = [];
            $scope.master.selectedCount = 0;
            $scope.master.CompTime = "";

            $scope.master.ProcessBy = [];
            $scope.master.ProcessBySelected = 0;

            $scope.master.GivenBySelected = 0;
            $scope.master.GivenBy = [];
            $scope.BodyPart = {};
            $scope.btmDisplay = false;
            $scope.bodyDisplay = false;

            $mdDialog.cancel();

            // GetRollStatus($scope.master.BatchNo, $scope.master.CompTime);

            if ($scope.RadioMode == "R" && $scope.master.RollNo > 0) {
              $scope.Refresh();
              $scope.RadioMode = "N";
            }
          } else $rootScope.alert(res.ErrorMsg);
        }
      );
    }

    function valid() {
      debugger;

      //if ($scope.master.Machine == undefined) {
      //  $rootScope.alert("Machine not Found...");
      //  return false;
      //}

      if ($scope.master.Buyer == null) {
        $rootScope.alert("Buyer Not Found...");
        return false;
      } else if ($scope.master.Order == null) {
        $rootScope.alert("Order Not Found...");
        return false;
      }

      let invalidWeight = false;

      if ($scope.batchType == "Single") {
        $scope.BodyPart.forEach(function(part) {
          if (
            !part.Weight ||
            isNaN(part.Weight) ||
            parseFloat(part.Weight) <= 0
          ) {
            invalidWeight = true;
          }
        });
      }
      if ($scope.batchType == "Multiple") {
        if (
          !$scope.BodyPart[0].Weight ||
          isNaN($scope.BodyPart[0].Weight) ||
          parseFloat($scope.BodyPart[0].Weight) <= 0
        ) {
          invalidWeight = true;
        }
      }
      if (invalidWeight) {
        $scope.alert("Please! Enter valid Weight for all Body Parts...");
        return false;
      }

      let invalidWidth = false;

      if ($scope.batchType == "Single") {
        $scope.BodyPart.forEach(function(part) {
          if (
            !part.ActualDia ||
            isNaN(part.ActualDia) ||
            parseFloat(part.ActualDia) <= 0
          ) {
            invalidWidth = true;
          }
        });
      }

      if ($scope.batchType == "Multiple") {
        if (
          !$scope.BodyPart[0].ActualDia ||
          isNaN($scope.BodyPart[0].ActualDia) ||
          parseFloat($scope.BodyPart[0].ActualDia) <= 0
        ) {
          invalidWidth = true;
        }
      }

      if (invalidWidth) {
        $scope.alert("Please! Enter valid Dia for all Body Parts...");
        return false;
      }

      let invalidGsm = false;

      if ($scope.batchType == "Single") {
        $scope.BodyPart.forEach(function(part) {
          if (
            !part.ActualGSM ||
            isNaN(part.ActualGSM) ||
            parseFloat(part.ActualGSM) <= 0
          ) {
            invalidGsm = true;
          }
        });
      }
      if ($scope.batchType == "Multiple") {
        if (
          !$scope.BodyPart[0].ActualGSM ||
          isNaN($scope.BodyPart[0].ActualGSM) ||
          parseFloat($scope.BodyPart[0].ActualGSM) <= 0
        ) {
          invalidGsm = true;
        }
      }
      if (invalidGsm) {
        $scope.alert("Please! Enter valid GSM for all Body Parts... ");
        return false;
      }

      return true;
    }

    function genSticker(data) {
      console.log("sticker", data);
      debugger;

      var printContents =
        `<div class="wrapper">
        <div class="header">
            <div class="logo">
                <img src="../../../Content/img/Masco.jpg" />               
            </div>

            <div class="unit">                
                <span><b>` +
        data.UnitEName +
        `</b></span>
            </div>
            <div class="qr_code">
                <img src="` +
        data.StickerPath +
        `" />
            </div>

        </div>
        <div class="body">
            <table class="table">
                <tr>
                    <td colspan="4">Buyer:
                    ` +
        data.Buyer +
        `</td>
                </tr>
                <tr>
                    <td colspan="4">J:
                    ` +
        data.Job +
        `</td>
                </tr>
                <tr>
                    <td colspan="4">S:
                    ` +
        data.Order +
        `</td>
                </tr>
                <tr>
                    <td colspan="2">B:
                    ` +
        data.BatchNo +
        `</td>
                <td colspan="2">
                    ` +
        data.CurrentDate +
        `</td>
                </tr>
         <tr>

        <td colspan="4" style="font-size:` +
        (`C:`.length + data.FabColor.length > 72 ? "4pt" : "7pt") +
        `">C: ` +
        data.FabColor +
        `</td>

         </tr>
      
         <tr>

         <td colspan="4" style="font-size:` +
        (`F:`.length + data.FabType.length > 72 ? "4pt" : "7pt") +
        `">F: ` +
        data.FabType +
        `</td>


         </tr>
       
        <tr>
           <td colspan="4">TR: ` +
        data.TestRequirement +
        `</td>
          </tr>

           <tr>
           <td>Dia:
           ` +
        data.ReqDia +
        `</td>
           <td>GSM:
           ` +
        data.ReqGSM +
        `</td>
          <td colspan="2">R.Wgt:
           ` +
        data.TotalWeightQA +
        `kg</td>
           </tr>

          <tr>
           <td colspan="2">Prs By:
           ` +
        data.ProcessBy +
        `</td>
           <td colspan="2">Given:
           ` +
        data.GivenBy +
        `</td>
           </tr>

            </table>
        </div>    
    </div>`;

      if (data.LabStickerReq == true) {
        printContents +=
          `<div class="wrapper">
                <div class="header">
                    <div class="qr_code">
                        <img src="` +
          data.StickerPath +
          `" />
                    </div>                    

                    <div class="unit">                        
                        <span><b>` +
          data.UnitEName +
          `</b></span>
                    </div>

                    <div class="logo">
                        <img src="../../../Content/img/Masco.jpg" />
                    </div>

                </div>
                <div class="body">
                    <table class="table">
                        <tr>
                            <td colspan="4">Buyer:
                           ` +
          data.Buyer +
          `</td>
                        </tr>
                        <tr>
                            <td colspan="4">J:
                            ` +
          data.Job +
          `</td>
                        </tr>
                        <tr>
                            <td colspan="4">S:
                            ` +
          data.Order +
          `</td>
                        </tr>
                        <tr>
                            <td colspan="2">B:
                            ` +
          data.BatchNo +
          `</td>           <td colspan="2">
                    ` +
          data.CurrentDate +
          `</td>
                        </tr>

                        <tr>

          <td colspan="4" style="font-size:` +
          (`C:`.length + data.FabColor.length > 72 ? "4pt" : "7pt") +
          `">C: ` +
          data.FabColor +
          `</td>
                        </tr>

                        <tr>

         <td colspan="4" style="font-size:` +
          (`F:`.length + data.FabType.length > 72 ? "4pt" : "7pt") +
          `">F: ` +
          data.FabType +
          `</td>

                         </tr>
            <tr>
           <td colspan="4">TR :` +
          data.TestRequirement +
          `</td>
          </tr>

          <tr>
           <td>Dia:
           ` +
          data.ReqDia +
          `</td>
           <td>GSM:
           ` +
          data.ReqGSM +
          `</td>
          <td colspan="2">R.Wgt:
           ` +
          data.TotalWeightActual +
          `kg</td>
           </tr>
                     
          <tr>
           <td colspan="2">Prs By:
           ` +
          data.ProcessBy +
          `</td>
           <td colspan="2">Given:
           ` +
          data.GivenBy +
          `</td>
           </tr>
                    </table>
                </div>
            </div>`;
      }

      var popupWin = window.open("", "_blank", "width=auto,height=auto");

      popupWin.document.open();
      popupWin.document.write(
        `<html><head><link href="../../../Content/css/sticker.css" rel="stylesheet" /></head><body onload="window.print()">` +
          printContents +
          `</body></html>`
      );
      popupWin.document.close();
      //popupWin.focus();
      //popupWin.print();
      //popupWin.close();
    }

    $scope.NewInspection = function() {
      NewInspection();
    };

    function NewInspection() {
      var url = "/Home/Index#!/FinFabInspConfig";
      var win = window.open(url, "_blank");
      win.focus();
    }

    $scope.back = function() {
      window.name = "/Home/Index#!/FinishFabricInspectionConfig";
      window.name.blink();
    };

    $scope.Refresh = function() {
      $scope.master = {};
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];
      $scope.bodyDisplay = false;
      $scope.master.BodyPart = "Body";

      $window.document.getElementById("BatchNo").focus();
    };

    $scope.adjustDia = function(event, item) {
      if (event.keyCode === 38) {
        item.ActualDia = (parseFloat(item.ActualDia) || 0) + 1;
      } else if (event.keyCode === 40) {
        item.ActualDia = (parseFloat(item.ActualDia) || 0) - 1;
      }
    };

    function ClearAll() {
      $scope.mnFaultList = [];
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.master = {};
      $scope.bodyDisplay = false;
      $scope.BodyPart = [];

      $scope.master.CompTime = null;
      $scope.master.Roll = "";
      //   $scope.master.BatchNo = "";

      $scope.BodyPart.forEach(function(item) {
        item.Weight = "";
        item.ActualDia = "";
        item.ActualGSM = "";
      });

      $scope.ProcessBy = {};
      $scope.GivenBy = {};

      if ($scope.RadioMode === "R") {
        $scope.RadioMode = "N";
        $scope.HideAndShow = true;
      }
    }

    $scope.updateBatchType = function(selectedType) {
      ClearAll();

      $scope.showBodyParts = selectedType === "Multiple";
    };

    $scope.incrementCounting = function() {
      if ($scope.batchType === "Multiple" && $scope.RadioMode === "N") {
        if ($scope.master.CompTime) {
          $scope.master.CompTime = parseInt($scope.master.CompTime) + 1;
          $scope.master.TotalRoll = parseInt(0);
          $scope.master.TRollWeight = parseInt(0);
        } else {
          $scope.master.CompTime = 1;
        }
      }
    };
  }
]);
