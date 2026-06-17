app.controller("FinishFabricInspectionConfigNewFormatController", [
  "$scope",
  "$rootScope",
  "$window",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$state",
  "FinishFabricInspectionConfigNewFormat",
  "FinFabReqConfig",
  function(
    $scope,
    $rootScope,
    $window,
    $mdDialog,
    $mdToast,
    $q,
    $state,
    FinishFabricInspectionConfig,
    FinFabReqConfig
  ) {
    debugger;

    $scope.BatchList = [];
    $scope.master = {};

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
    $scope.BodyPart = [];
    let skipClearTextOnce = false;

    $scope.MachineWiseBodyPartList = [];
    $scope.selectedMachineStage = null;

    function loadBatchListByUnit() {
      debugger;
      if ($scope.Unit) {
        FinishFabricInspectionConfig.GetBatchNoListUnitWise(
          $scope.Unit.UnitId,
          function(data) {
            debugger;
            $scope.batchList = data;
          }
        );
      }
    }

    $scope.$watch("Unit", function(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        debugger;
        clearTextFields();
        loadBatchListByUnit();
      }
    });

    FinishFabricInspectionConfig.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

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

    $scope.changeMode = function(mode) {
      $scope.RadioMode = mode;

      clearAllForModeChange();

      if (mode === "R") {
        $scope.HideAndShow = true;
      } else {
        $scope.HideAndShow = false;
      }
    };

    function clearAllForModeChange() {
      $scope.mnFaultList = [];
      $scope.master.Remarks = "";
      $scope.master.FinishWeight = "";
      $scope.master.Width = "";
      $scope.master.LabSticker = false;

      $scope.master.Machine = "";
      $scope.master.Buyer = "";
      $scope.master.Job = "";
      $scope.master.Order = "";
      $scope.master.Length = "";
      $scope.master.Width = "";
      $scope.master.CompTime = 0;
      $scope.master.TotalRoll = "";
      $scope.master.TRollWeight = "";
      $scope.master.Roll = "";

      $scope.master.TotalPoint = 0;
      $scope.master.Ptsperhundred = 0;

      $scope.master.Grade = "";
      $scope.master.CommercialApproved = "";
      $scope.master.ItemDescription = "";

      $scope.CompactingTime = [{ id: 1, name: "1st Time" }];
      $scope.BodyPart = [];

      $scope.MachineWiseBodyPartList = [];

      $scope.details = [];
      $scope.majorMinorFault = [];

      $scope.MachineStageList = [];
      $scope.selectedMachineStage = null;

      $scope.bodyDisplay = false;
      $scope.btmDisplay = false;
      $scope.master.batchNo = "";
      $scope.master.TotalWeight = "";

      $scope.master.BatchNo = "";

      $scope.master.Roll = null;
      $scope.master.RollNo = 0;
      $scope.RollNoInfo = [];
    }

    function GetRollStatusNew(BatchNo, CompTime) {
      FinishFabricInspectionConfig.GetRollStatusNew(
        encodeURIComponent(BatchNo),
        CompTime,
        function(data) {
          $scope.master.TotalRoll = data[0].TotalRoll;
          $scope.master.TRollWeight = data[0].TRollWeight;
        }
      );
    }

    $scope.ChangeRoll = function() {
      debugger;
      if ($scope.RadioMode == "R" && $scope.master.Roll.DisplayValue > 0) {
        let RollNo = $scope.master.Roll.DisplayValue;
        let BpmId = $scope.master.BatchNo.BpmId;

        LoadRollWiseInspectionPoints(BpmId, RollNo);

        LoadRollWiseFaults(BpmId, RollNo);

        DisplayRollWiseBodyPart(BpmId, RollNo);
      }
    };

    function DisplayRollWiseBodyPart(BpmId, RollNo) {
      debugger;

      FinishFabricInspectionConfig.DisplayRollWiseBodyPart(
        BpmId,
        RollNo,
        function(data) {
          debugger;
          var rollBodyPartId = parseInt(
            data[0].BodyPartId || data[0].BodyPart || 0
          );
          $scope.master.BodyPartId = rollBodyPartId;
          $scope.master.BodyPart = rollBodyPartId;
        }
      );
    }

    function LoadRollWiseInspectionPoints(BpmId, RollNo) {
      $scope.details = [];
      $scope.bodyDisplay = false;

      FinishFabricInspectionConfig.LoadRollWiseInspectionPoints(
        BpmId,
        RollNo,
        function(data) {
          debugger;
          $scope.details = prepareInspectionPointDisplayList(data);

          $scope.bodyDisplay = $scope.details.length > 0;
        }
      );
    }

    function LoadRollWiseFaults(BpmId, RollNo) {
      debugger;

      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];

      FinishFabricInspectionConfig.LoadRollWiseFaults(BpmId, RollNo, function(
        data
      ) {
        debugger;
        $scope.majorMinorFault = prepareMajorMinorFaultForOldHtml(data);
        angular.forEach($scope.majorMinorFault, function(item) {
          if (
            item.Flag !== null &&
            item.Flag !== undefined &&
            item.Flag !== -1
          ) {
            $scope.mnFaultList.push({
              FaultID: parseInt(item.NameID),
              Flag: parseInt(item.Flag)
            });
          }
        });

        if ($scope.majorMinorFault.length > 0) {
          $scope.bodyDisplay = true;
        }
      });
    }

    $scope.enterBatchClick = function() {
      debugger;
      var BpmId = $scope.master.BatchNo.BpmId;
      if ($scope.RadioMode == "N") {
        clearTextFields();
        LoadBuyerJobStyle();
        LoadMachineStages();
        LoadTotalRollQuantity(BpmId);
        LoadInspectionPoint();
        LoadMajorMinorFault();
      } else if ($scope.RadioMode == "R") {
        LoadBuyerJobStyle();
        LoadMachineStages();
        LoadTotalRollQuantity(BpmId);
      }
    };

    function LoadBuyerJobStyle() {
      debugger;
      FinishFabricInspectionConfig.LoadBuyerJobStyle(
        $scope.master.BatchNo.BpmId,
        function(data) {
          $scope.master.Buyer = data[0].BuyerName;
          $scope.master.Job = data[0].JobInfo;
          $scope.master.Order = data[0].StyleInfo;
          $scope.master.FabColor = data[0].ColorName;
        }
      );
    }

    function LoadMachineStages() {
      debugger;

      $scope.MachineStageList = [];
      $scope.selectedMachineStage = null;

      FinishFabricInspectionConfig.LoadMachineStages(
        $scope.master.BatchNo.BpmId,
        function(data) {
          debugger;
          $scope.MachineStageList = data || [];
        }
      );
    }

    function LoadTotalRollQuantity(BpmId) {
      debugger;
      FinishFabricInspectionConfig.LoadTotalRollQuantity(BpmId, function(data) {
        debugger;
        $scope.master.TotalRoll = data[0].TotalRoll;
        $scope.master.TotalWeight = data[0].TotalWeight;
      });
    }

    function LoadInspectionPoint() {
      debugger;

      $scope.details = [];
      $scope.bodyDisplay = false;

      FinishFabricInspectionConfig.LoadInspectionPoint(function(data) {
        debugger;

        $scope.details = prepareInspectionPointDisplayList(data);

        $scope.bodyDisplay = $scope.details.length > 0;

        console.log("Raw inspection point data:", data);
        console.log("Grouped inspection point data:", $scope.details);
      });
    }

    function LoadMajorMinorFault() {
      debugger;

      $scope.majorMinorFault = [];
      $scope.mnFaultList = [];

      FinishFabricInspectionConfig.LoadFaultsForInspection(function(data) {
        debugger;

        $scope.majorMinorFault = prepareMajorMinorFaultForOldHtml(data);

        if ($scope.majorMinorFault.length > 0) {
          $scope.bodyDisplay = true;
        }

        console.log("Raw Major Minor Data:", data);
        console.log("Major Minor For Old HTML:", $scope.majorMinorFault);
      });
    }

    function prepareInspectionPointDisplayList(rawData) {
      var groupedList = [];

      if (!rawData || rawData.length === 0) {
        return groupedList;
      }

      angular.forEach(rawData, function(item) {
        var pointId = item.PointID || item.PointId || item.PHeadNo || 0;

        var fault = groupedList.find(function(x) {
          return x.NameID == item.NameID && x.PHeadNo == item.PHeadNo;
        });

        if (!fault) {
          fault = {
            DyedInspectionDetailID: item.DyedInspectionDetailID || -1,
            MasterId: item.MasterId || -1,

            FaultName: item.FaultName,
            NameID: item.NameID,
            PHeadNo: item.PHeadNo,

            PointID:
              item.SavedPointID || item.PointID || item.PointId || item.PHeadNo,

            PointData: item.PointData ? item.PointData.toString() : "",
            TotalPoint: item.TotalPoint || 0,

            lPoints: []
          };

          groupedList.push(fault);
        }

        fault.lPoints.push({
          PHeadNo: item.PHeadNo,
          PointID: pointId,
          PointName: item.FromTo,
          PointValue: item.Point
        });
      });

      return groupedList;
    }

    //function prepareMajorMinorFaultForOldHtml(rawData) {
    //  var groupedList = [];

    //  if (!rawData || rawData.length === 0) {
    //    return groupedList;
    //  }

    //  angular.forEach(rawData, function(item) {
    //    var existingFault = groupedList.find(function(x) {
    //      return x.NameID == item.NameID;
    //    });

    //    if (!existingFault) {
    //      existingFault = {
    //        DyedInspectionDetailID: -1,
    //        NameID: item.NameID,
    //        FaultID: null,
    //        PHeadNo: item.PHeadNo,
    //        FaultName: item.FaultName,
    //        PointData: null,
    //        TotalPoint: "0",
    //        Flag: null,
    //        lPoints: []
    //      };

    //      groupedList.push(existingFault);
    //    }

    //    existingFault.lPoints.push({
    //      PHeadNo: item.PHeadNo,
    //      PointID: item.PointID,
    //      PointName: item.FromTo,
    //      PointValue: item.Point
    //    });
    //  });

    //  return groupedList;
    //}

    function prepareMajorMinorFaultForOldHtml(rawData) {
      var groupedList = [];

      if (!rawData || rawData.length === 0) {
        return groupedList;
      }

      angular.forEach(rawData, function(item) {
        var existingFault = groupedList.find(function(x) {
          return x.NameID == item.NameID;
        });

        if (!existingFault) {
          var savedFlag = null;

          if (
            item.Flag !== null &&
            item.Flag !== undefined &&
            item.Flag !== -1
          ) {
            savedFlag = parseInt(item.Flag);
          } else if (
            item.IsMinor !== null &&
            item.IsMinor !== undefined &&
            item.IsMinor !== -1
          ) {
            savedFlag = parseInt(item.IsMinor);
          }

          existingFault = {
            MajorMinorFaultId: item.MajorMinorFaultId || -1,
            MasterId: item.MasterId || -1,

            DyedInspectionDetailID: -1,
            NameID: item.NameID,
            FaultID: item.NameID,
            PHeadNo: item.PHeadNo,
            FaultName: item.FaultName,

            PointData: null,
            TotalPoint: "0",

            // 0 = Major, 1 = Minor
            Flag: savedFlag,

            lPoints: []
          };

          groupedList.push(existingFault);
        }

        existingFault.lPoints.push({
          PHeadNo: item.PHeadNo,
          PointID: item.PointID,
          PointName: item.FromTo,
          PointValue: item.Point
        });
      });

      return groupedList;
    }

    $scope.changeOperationTime = function() {
      if (!$scope.selectedMachineStage) {
        $scope.master.OperationTime = null;
        $scope.master.Machine = "";
        $scope.master.MDId = null;
        $scope.master.MachineTypeId = null;
        $scope.master.MachineId = null;
        $scope.master.McOperationMasterId = null;

        $scope.MachineWiseBodyPartList = [];
        $scope.master.BodyPartId = null;
        $scope.master.BodyPart = null;

        return;
      }

      $scope.master.OperationTime =
        $scope.selectedMachineStage.OperationTime || 1;
      $scope.master.Machine = $scope.selectedMachineStage.MachineName || "";

      $scope.master.McOperationMasterId =
        $scope.selectedMachineStage.Id || null;

      $scope.master.MachineTypeId =
        $scope.selectedMachineStage.MachineTypeId ||
        $scope.selectedMachineStage.McTypeId ||
        null;

      $scope.master.MachineId =
        $scope.selectedMachineStage.MachineId ||
        $scope.selectedMachineStage.MDId ||
        $scope.selectedMachineStage.McId ||
        null;

      $scope.MachineWiseBodyPartList = [];
      $scope.master.BodyPartId = null;
      $scope.master.BodyPart = null;

      $scope.loadMachineWiseBodyParts($scope.master.McOperationMasterId);

      if ($scope.RadioMode == "R") {
        LoadAllGeneratedRolls($scope.master.McOperationMasterId);
      }
    };

    function LoadAllGeneratedRolls(McOperationMasterId) {
      debugger;
      $scope.RollNoInfo = [];
      FinishFabricInspectionConfig.LoadAllGeneratedRolls(
        McOperationMasterId,
        function(data) {
          debugger;
          $scope.RollNoInfo = data;
        }
      );
    }

    //$scope.loadMachineWiseBodyParts = function(mcOperationMasterId) {
    //  $scope.MachineWiseBodyPartList = [];
    //  $scope.master.BodyPartId = null;

    //  if (!mcOperationMasterId) {
    //    return;
    //  }

    //  FinishFabricInspectionConfig.GetMachineWiseBodyParts(
    //    mcOperationMasterId,
    //    function(data) {
    //      $scope.MachineWiseBodyPartList = data || [];

    //      if ($scope.MachineWiseBodyPartList.length > 0) {
    //        $scope.master.BodyPartId =
    //          $scope.MachineWiseBodyPartList[0].BodyPartId;
    //      }
    //    }
    //  );
    //};

    $scope.loadMachineWiseBodyParts = function(mcOperationMasterId) {
      $scope.MachineWiseBodyPartList = [];
      $scope.master.BodyPartId = null;

      if (!mcOperationMasterId) {
        return;
      }

      FinishFabricInspectionConfig.GetMachineWiseBodyParts(
        mcOperationMasterId,
        function(data) {
          $scope.MachineWiseBodyPartList = data || [];

          // New mode: select first body part automatically
          if ($scope.RadioMode == "N") {
            if ($scope.MachineWiseBodyPartList.length > 0) {
              $scope.master.BodyPartId =
                $scope.MachineWiseBodyPartList[0].BodyPartId;
              $scope.master.BodyPart = $scope.master.BodyPartId;
            }
          }

          // Modify mode: do not select first body part.
          // Body part will be selected after Roll No selection.
        }
      );
    };

    $scope.pointClick = function(lobj, index) {
      var pointValue = lobj.PointValue;
      var pointId = lobj.PointID;

      if (!$scope.details[index].PointData) {
        $scope.details[index].PointData = pointValue.toString();
      } else {
        $scope.details[index].PointData += "+" + pointValue;
      }

      $scope.details[index].PointID = pointId;
    };

    $scope.pointBackSpaceClick = function(index) {
      var pointData = $scope.details[index].PointData;

      if (!pointData) {
        $scope.details[index].PointData = "";
        $scope.details[index].TotalPoint = 0;
        return;
      }

      var arr = pointData.toString().split("+");
      arr.pop();

      $scope.details[index].PointData = arr.join("+");

      var total = 0;

      angular.forEach(arr, function(value) {
        if ($.isNumeric(value)) {
          total += parseInt(value);
        }
      });

      $scope.details[index].TotalPoint = total;
    };

    $scope.majorMinorBackSpaceClick = function(index, faultId) {
      var foundIndex = $scope.mnFaultList.findIndex(function(x) {
        return x.FaultID == faultId;
      });

      if (foundIndex >= 0) {
        $scope.mnFaultList.splice(foundIndex, 1);
      }

      if ($scope.majorMinorFault[index]) {
        $scope.majorMinorFault[index].PointData = null;
        $scope.majorMinorFault[index].TotalPoint = 0;
        $scope.majorMinorFault[index].Flag = null;
      }
    };

    $scope.ConfirmSave = function(ev) {
      skipClearTextOnce = true;

      if (valid()) {
        $scope.btnSaveDisabled = false;
        $mdDialog.show({
          async: false,
          controller: DialogController,
          templateUrl:
            $scope.batchType === "Bulk"
              ? "/App/template/Popup/FabricInspectionDialog.html"
              : "/App/template/Popup/FabricInspectionDialogNew.html",

          targetEvent: ev,
          scope: $scope,
          preserveScope: true,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
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

    function formatNow12Hour() {
      const d = new Date();

      const yyyy = d.getFullYear();
      const MM = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      return `${yyyy}-${MM}-${dd}`;
    }

    async function SaveUpdate() {
      debugger;

      if (parseFloat($scope.master.FinishWeight) <= 0) {
        $rootScope.alert("Please! Enter Valid Roll Weight....");
        return;
      }

      $scope.master.UserId = $rootScope.UserId;

      if (
        $scope.master.MasterId == null ||
        $scope.master.MasterId === undefined
      ) {
        $scope.master.MasterId = -1;
      }

      //if ($scope.master.Roll) {
      //  $scope.master.RollNo = $scope.master.Roll.Value;
      //}

      //if (
      //  $scope.master.RollNo == null ||
      //  $scope.master.RollNo === "" ||
      //  $scope.master.RollNo === undefined
      //) {
      //  $scope.master.RollNo = 0;
      //}

      if ($scope.master.Roll) {
        if (typeof $scope.master.Roll === "object") {
          $scope.master.RollNo = parseInt(
            $scope.master.Roll.Value || $scope.master.Roll.DisplayValue || 0
          );
        } else {
          $scope.master.RollNo = parseInt($scope.master.Roll || 0);
        }
      }

      if (
        $scope.master.RollNo == null ||
        $scope.master.RollNo === "" ||
        $scope.master.RollNo === undefined ||
        isNaN($scope.master.RollNo)
      ) {
        $scope.master.RollNo = 0;
      }

      if (
        $scope.master.CompTime == null ||
        $scope.master.CompTime === "" ||
        $scope.master.CompTime === 0
      ) {
        $scope.master.CompTime = 1;
      }

      if (
        typeof $scope.master.BatchNo === "object" &&
        $scope.master.BatchNo !== null
      ) {
        $scope.master.BpmId = $scope.master.BatchNo.BpmId || 0;
        $scope.master.BatchNo = $scope.master.BatchNo.BatchNo;
      }

      $scope.master.BodyPart = $scope.master.BodyPartId;

      if (
        $scope.master.OperationTime == null ||
        $scope.master.OperationTime === ""
      ) {
        $scope.master.OperationTime = 1;
      }

      if (
        $scope.master.MachineTypeId == null ||
        $scope.master.MachineTypeId === ""
      ) {
        $scope.master.MachineTypeId = 0;
      }

      if ($scope.master.MachineId == null || $scope.master.MachineId === "") {
        $scope.master.MachineId = 0;
      }

      if ($scope.master.ActualGSM == null || $scope.master.ActualGSM === "") {
        $scope.master.ActualGSM = 1;
      }

      $scope.master.list = [];

      for (var i = 0; i < $scope.details.length; i++) {
        var totalpoint = 0;

        if (
          $scope.details[i].PointData != null &&
          $scope.details[i].PointData !== ""
        ) {
          var pointDataString = $scope.details[i].PointData.toString();
          var totalpointArray = pointDataString.split("+");

          $.each(totalpointArray, function() {
            var val = this.trim();

            if ($.isNumeric(val)) {
              totalpoint += parseInt(val);
            }
          });

          $scope.details[i].TotalPoint = totalpoint;
          $scope.details[i].PointData = pointDataString;
        }

        if ($.isNumeric($scope.details[i].DyedInspectionDetailID) == false) {
          $scope.details[i].DyedInspectionDetailID = -1;
        }

        if ($.isNumeric($scope.details[i].TotalPoint) == false) {
          $scope.details[i].TotalPoint = 0;
        }

        var savePointId = $scope.details[i].PointID;

        if (!savePointId && $scope.details[i].lPoints.length > 0) {
          savePointId = $scope.details[i].lPoints[0].PointID;
        }

        var vd = {
          DyedInspectionDetailID: $scope.details[i].DyedInspectionDetailID,
          FaultID: $scope.details[i].NameID,
          PointID: parseInt(savePointId || 0),
          PointData: $scope.details[i].PointData || "",
          TotalPoint: $scope.details[i].TotalPoint || 0,
          RollNo: $scope.master.RollNo
        };

        $scope.master.list.push(vd);
      }

      debugger;

      if ($scope.master.list.length <= 0) {
        $rootScope.alert("No Fault Found. Pls Select Fault to Save....");
        return;
      }

      $scope.master.mnFaultList = $scope.mnFaultList || [];

      let selectedBodyPart = null;

      if (
        $scope.MachineWiseBodyPartList &&
        $scope.MachineWiseBodyPartList.length > 0
      ) {
        selectedBodyPart = $scope.MachineWiseBodyPartList.find(function(a) {
          return a.BodyPartId === $scope.master.BodyPartId;
        });
      }

      if (selectedBodyPart) {
        $scope.master.FinishedDia = selectedBodyPart.FinishedDia || "";
        $scope.master.FinishedGSM = selectedBodyPart.FinishedGSM || "";

        $scope.master.FabricTypeOfBodyPart =
          selectedBodyPart.FabricTypeName || "";
        $scope.master.CompositionOfBodyPart =
          selectedBodyPart.Composition || "";
      }

      if ($scope.RadioMode === "R" && $scope.master.RollNo <= 0) {
        $rootScope.alert("Please select valid Roll No for update.");
        return;
      }

      $scope.btnSaveDisabled = true;
      debugger;

      let status = $scope.RadioMode;

      FinishFabricInspectionConfig.Save(status, $scope.master, function(res) {
        $scope.btnSaveDisabled = false;

        if (res.ErrorMsg == null) {
          let model = {
            UnitEName: $scope.master.UnitEName,
            Buyer: $scope.master.Buyer,
            Job: $scope.master.Job,
            Order: $scope.master.Order,
            BatchNo: $scope.master.BatchNo,
            FabColor: $scope.master.FabColor,

            ReqDia: res.Data.FDia,
            ReqGSM: res.Data.FGSM,

            RollNo: res.Data.rollNo,
            FinishWeight: $scope.master.FinishWeight,
            BatchWeight: res.Data.BatchWeight,
            StickerPath: res.Data.stickerPath,
            LabStickerReq: $scope.master.LabSticker,

            BodyPart: res.Data.BodyPart,
            CompTime: $scope.master.CompTime,

            //FabType:
            //  ($scope.master.FabricTypeOfBodyPart || "") +
            //  "(" +
            //  ($scope.master.CompositionOfBodyPart || "") +
            //  ")",

            FabType:
              (res.Data.FabricType || "") +
              "(" +
              (res.Data.Composition || "") +
              ")",

            CurrentDate: formatNow12Hour(),
            UnitShortName: res.Data.UnitShortName,
            QRCode: res.Data.QRCode
          };

            if ($scope.master.Buyer == 'JM Fabrics') {
                genStickerJMFabrics(model);
            }
            else {
                genStickerNew(model);
            }
        

          for (var j = 0; j < $scope.details.length; j++) {
            $scope.details[j].PointData = null;
            $scope.details[j].TotalPoint = 0;
          }

          $scope.mnFaultList = [];
          $scope.master.Remarks = "";
          $scope.master.FinishWeight = "";
          $scope.master.Width = "";
          $scope.master.LabSticker = false;
          $scope.master.ActualGSM = "";

          $mdDialog.cancel();

          /* GetRollStatusNew($scope.master.BatchNo, $scope.master.CompTime);*/
          debugger;
          var BpmId = $scope.master.BpmId;
          LoadTotalRollQuantity(BpmId);

          if ($scope.RadioMode == "R" && $scope.master.RollNo > 0) {
            $scope.Refresh();
            $scope.RadioMode = "N";
          }
        } else {
          $rootScope.alert(res.ErrorMsg);
        }
      });
    }

    function valid() {
      if ($scope.master.Machine == undefined) {
        $rootScope.alert("Machine not Found...");
        return false;
      } else if (
        $scope.master.Width == "" ||
        $scope.master.Width == undefined
      ) {
        $rootScope.alert("Please! Enter Width...");
        return false;
      } else if (parseFloat($scope.master.Width) <= 0) {
        $rootScope.alert("Please! Enter valid Width...");
        return false;
      } else if ($scope.master.Buyer == null) {
        $rootScope.alert("Buyer Not Found...");
        return false;
      } else if ($scope.master.Order == null) {
        $rootScope.alert("Order Not Found...");
        return false;
      } else if (
        $scope.master.BodyPartId == null ||
        $scope.master.BodyPartId == ""
      ) {
        $rootScope.alert("Please! Select Body Part...");
        return false;
      }

      return true;
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
      //return false;
    };
    $scope.Refresh = function() {
      //$scope.master = {};
      //$scope.details = [];
      //$scope.majorMinorFault = [];
      //$scope.mnFaultList = [];
      //$scope.bodyDisplay = false;
      ///*  $scope.master.BodyPart = "Body";*/

      //$scope.master.Roll = null;
      //$scope.master.RollNo = 0;
      //$scope.RollNoInfo = [];

      /* $window.document.getElementById("BatchNo").focus();*/

      clearAllForModeChange();
    };

    function FindStatus() {
      let deferred = $q.defer();
      FinishFabricInspectionConfig.GetOriginStatus(
        encodeURI($scope.master.BatchNo),
        function(data) {
          if (data && data.length > 0) {
            let status = data[0].Origin;
            deferred.resolve(status);
          } else {
            deferred.resolve(null);
          }
        }
      );

      return deferred.promise;
    }

    function GetStatus(batchNo) {
      // Wrap asynchronous call in a promise
      return new Promise((resolve, reject) => {
        FinishFabricInspectionConfig.GetOriginStatus(
          encodeURI(batchNo),
          function(data) {
            if (data && data.length > 0) {
              resolve(data[0].Origin); // Resolve with the status
            } else {
              resolve(null); // Resolve with null if no status is found
            }
          },
          function(error) {
            reject("Error retrieving status: " + error); // Reject if there's an error
          }
        );
      });
    }

    function clearTextFields() {
      $scope.mnFaultList = [];
      $scope.master.Remarks = "";
      $scope.master.FinishWeight = "";
      $scope.master.Width = "";
      $scope.master.LabSticker = false;

      $scope.master.Machine = "";
      $scope.master.Buyer = "";
      $scope.master.Job = "";
      $scope.master.Order = "";
      $scope.master.Length = "";
      $scope.master.Width = "";
      $scope.master.CompTime = 0;
      $scope.master.TotalRoll = "";
      $scope.master.TRollWeight = "";
      $scope.master.Roll = "";

      $scope.master.TotalPoint = 0;
      $scope.master.Ptsperhundred = 0;

      $scope.master.Grade = "";
      $scope.master.CommercialApproved = "";
      $scope.master.ItemDescription = "";

      $scope.CompactingTime = [{ id: 1, name: "1st Time" }];
      $scope.BodyPart = [];

      $scope.MachineWiseBodyPartList = [];

      $scope.details = [];
      $scope.majorMinorFault = [];

      $scope.MachineStageList = [];
      $scope.selectedMachineStage = null;

      $scope.bodyDisplay = false;
      $scope.btmDisplay = false;

      $scope.RadioMode = "N";

      $scope.master.Roll = null;
      $scope.master.RollNo = 0;
      $scope.RollNoInfo = [];
      $scope.master.TotalRoll = "";
    }

    function genStickerNew(data) {
      console.log("sticker", data);
      var printContents =
        `<div class="wrapper">
        <div class="header">
            <div class="logo">
                <img src="../../../Content/img/Masco.jpg" />               
            </div>

            <div class="unit">                
                <span><b>` +
        data.UnitShortName +
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
                  
      <td colspan="4"><span class="label">Buyer :</span> <span class="value">` +
        data.Buyer +
        `</span></td>

                </tr>
                <tr>
                   
        <td colspan="4"><span class="label">Job :</span> <span class="value">` +
        data.Job +
        `</span></td>

                </tr>
                <tr>
                 
           <td colspan="4"><span class="label">Style :</span> <span class="value">` +
        data.Order +
        `</span></td>

                </tr>
                <tr>
                  
           <td colspan="4"><span class="label">Batch :</span> <span class="value">` +
        data.BatchNo +
        `</span></td>
                </tr>
                <tr>
                   
           <td colspan="4"><span class="label">Color :</span> <span class="value">` +
        data.FabColor +
        `</span></td>
                </tr>
                <tr>
                  
       <td colspan="4"><span class="label">Fabric :</span> <span class="value">` +
        data.FabType +
        `</span></td>
                </tr>
                <tr>
                    <td>R.Dia:</td>
                    <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
        data.ReqDia +
        `</td>
                    <td>R.GSM:</td>
                    <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
        data.ReqGSM +
        `</td>
                </tr>

                <tr>

  <td colspan="2">
    <span class="label">Roll :</span>
    <span class="value">` +
        data.RollNo +
        ` (` +
        data.BodyPart +
        `)</span>
  </td>

           <td colspan="2">
    <span class="label">R.Wgt :</span>
    <span class="value">` +
        data.FinishWeight +
        `</span>
  </td>

                </tr>

                <tr>
                    <td colspan="4"><span class="label">Date :</span> <span class="value dateValue">` +
        data.CurrentDate +
        " (" +
        data.QRCode +
        ")" +
        `</span></td>

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
          data.UnitShortName +
          `</b></span>
                    </div>

                    <div class="logo">
                        <img src="../../../Content/img/Masco.jpg" />
                    </div>

                </div>
                <div class="body">
                    <table class="table">
                        <tr>
                         
      <td colspan="4"><span class="label">Buyer :</span> <span class="value">` +
          data.Buyer +
          `</span></td>

                        </tr>
                        <tr>
                            
            <td colspan="4"><span class="label">Job :</span> <span class="value">` +
          data.Job +
          `</span></td>


                        </tr>
                        <tr>
                      
              <td colspan="4"><span class="label">Style :</span> <span class="value">` +
          data.Order +
          `</span></td>
                        </tr>
                        <tr>
                           
             <td colspan="4"><span class="label">Batch :</span> <span class="value">` +
          data.BatchNo +
          `</span></td>
                        </tr>
                        <tr>
                         
         <td colspan="4"><span class="label">Color :</span> <span class="value">` +
          data.FabColor +
          `</span></td>
                        </tr>
                        <tr>
                         
       <td colspan="4"><span class="label">Fabric :</span> <span class="value">` +
          data.FabType +
          `</span></td>
                         </tr>
                        <tr>
                            <td>R.Dia:</td>
                            <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
          data.ReqDia +
          `</td>
                            <td>R.GSM:</td>
                            <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
          data.ReqGSM +
          `</td>
                        </tr>
                        <tr>
                           
           <td colspan="2">
    <span class="label">Roll :</span>
    <span class="value">` +
          data.RollNo +
          ` (` +
          data.BodyPart +
          `)</span>
  </td>

           <td colspan="2">
    <span class="label">B.Wgt :</span>
    <span class="value">` +
          data.BatchWeight +
          `</span>
  </td>

                        </tr>
             <tr>
                  <td colspan="4"><span class="label">Date :</span> <span class="value dateValue">` +
          data.CurrentDate +
          " (" +
          data.QRCode +
          ")" +
          `</span></td>

              </tr>
                    </table>
                </div>
            </div>`;
      }
      var popupWin = window.open("", "_blank", "width=auto,height=auto");
      popupWin.document.open();
      popupWin.document.write(
        `<html><head><link href="../../../Content/css/stickerNew.css" rel="stylesheet" /></head><body onload="window.print()">` +
          printContents +
          `</body></html>`
      );
      popupWin.document.close();
      //popupWin.focus();
      //popupWin.print();
      //popupWin.close();
    }

    //$scope.onBatchSelected = function($item, $model, $label) {
    //  $scope.master.BatchNo = $model;

    //  setTimeout(function() {
    //    var el = document.getElementById("batch");
    //    if (el) {
    //      el.blur();
    //    }
    //  }, 100);

    //  $scope.$applyAsync(function() {
    //    $scope.enterBatchClick();
    //  });
    //  };

      $scope.onBatchSelected = function ($item, $model, $label) {
          $scope.master.BatchNo = $model;

          setTimeout(function () {
              var el = document.getElementById("BatchNo");
              if (el) {
                  el.blur();
              }
          }, 100);

          $scope.$applyAsync(function () {
              $scope.enterBatchClick();
          });
      };


      function genStickerJMFabrics(data) {
          console.log("sticker", data);
          var printContents =
              `<div class="wrapper">
        <div class="header">
            <div class="logo">
                           
            </div>

            <div class="unit">                
                <span><b>` +
              data.UnitShortName +
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
                  
      <td colspan="4"><span class="label">Buyer :</span> <span class="value">` +
              data.Buyer +
              `</span></td>

                </tr>
                <tr>
                   
        <td colspan="4"><span class="label">Job :</span> <span class="value">` +
              data.Job +
              `</span></td>

                </tr>
                <tr>
                 
           <td colspan="4"><span class="label">Style :</span> <span class="value">` +
              data.Order +
              `</span></td>

                </tr>
                <tr>
                  
           <td colspan="4"><span class="label">Batch :</span> <span class="value">` +
              data.BatchNo +
              `</span></td>
                </tr>
                <tr>
                   
           <td colspan="4"><span class="label">Color :</span> <span class="value">` +
              data.FabColor +
              `</span></td>
                </tr>
                <tr>
                  
       <td colspan="4"><span class="label">Fabric :</span> <span class="value">` +
              data.FabType +
              `</span></td>
                </tr>
                <tr>
                    <td>R.Dia:</td>
                    <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
              data.ReqDia +
              `</td>
                    <td>R.GSM:</td>
                    <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
              data.ReqGSM +
              `</td>
                </tr>

                <tr>

  <td colspan="2">
    <span class="label">Roll :</span>
    <span class="value">` +
              data.RollNo +
              ` (` +
              data.BodyPart +
              `)</span>
  </td>

           <td colspan="2">
    <span class="label">R.Wgt :</span>
    <span class="value">` +
              data.FinishWeight +
              `</span>
  </td>

                </tr>

                <tr>
                    <td colspan="4"><span class="label">Date :</span> <span class="value dateValue">` +
              data.CurrentDate +
              " (" +
              data.QRCode +
              ")" +
              `</span></td>

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
                  data.UnitShortName +
                  `</b></span>
                    </div>

                    <div class="logo">
                        
                    </div>

                </div>
                <div class="body">
                    <table class="table">
                        <tr>
                         
      <td colspan="4"><span class="label">Buyer :</span> <span class="value">` +
                  data.Buyer +
                  `</span></td>

                        </tr>
                        <tr>
                            
            <td colspan="4"><span class="label">Job :</span> <span class="value">` +
                  data.Job +
                  `</span></td>


                        </tr>
                        <tr>
                      
              <td colspan="4"><span class="label">Style :</span> <span class="value">` +
                  data.Order +
                  `</span></td>
                        </tr>
                        <tr>
                           
             <td colspan="4"><span class="label">Batch :</span> <span class="value">` +
                  data.BatchNo +
                  `</span></td>
                        </tr>
                        <tr>
                         
         <td colspan="4"><span class="label">Color :</span> <span class="value">` +
                  data.FabColor +
                  `</span></td>
                        </tr>
                        <tr>
                         
       <td colspan="4"><span class="label">Fabric :</span> <span class="value">` +
                  data.FabType +
                  `</span></td>
                         </tr>
                        <tr>
                            <td>R.Dia:</td>
                            <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
                  data.ReqDia +
                  `</td>
                            <td>R.GSM:</td>
                            <td style="font-weight:1000;font-size:10px;line-height:10px;white-space:nowrap;">` +
                  data.ReqGSM +
                  `</td>
                        </tr>
                        <tr>
                           
           <td colspan="2">
    <span class="label">Roll :</span>
    <span class="value">` +
                  data.RollNo +
                  ` (` +
                  data.BodyPart +
                  `)</span>
  </td>

           <td colspan="2">
    <span class="label">B.Wgt :</span>
    <span class="value">` +
                  data.BatchWeight +
                  `</span>
  </td>

                        </tr>
             <tr>
                  <td colspan="4"><span class="label">Date :</span> <span class="value dateValue">` +
                  data.CurrentDate +
                  " (" +
                  data.QRCode +
                  ")" +
                  `</span></td>

              </tr>
                    </table>
                </div>
            </div>`;
          }
          var popupWin = window.open("", "_blank", "width=auto,height=auto");
          popupWin.document.open();
          popupWin.document.write(
              `<html><head><link href="../../../Content/css/stickerNew.css" rel="stylesheet" /></head><body onload="window.print()">` +
              printContents +
              `</body></html>`
          );
          popupWin.document.close();
          
      }

  }
]);
