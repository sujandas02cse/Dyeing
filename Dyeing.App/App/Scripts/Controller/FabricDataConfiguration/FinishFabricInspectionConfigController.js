app.controller("FinishFabricInspectionConfigController", [
  "$scope",
  "$rootScope",
  "$window",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$state",
  "FinishFabricInspectionConfig",
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
    let skipClearTextOnce = false;

    FinishFabricInspectionConfig.GetUnitAll($rootScope.UserId, function(data) {
      debugger;
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    $scope.$watch("batchType", function(newVal, oldVal) {
      debugger;
      if (newVal && newVal !== oldVal) {
        if (!skipClearTextOnce) {
          clearTextFields();
        } else {
          skipClearTextOnce = false;
        }
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

    $scope.changeMode = function() {
      $scope.details = [];
      $scope.majorMinorFault = [];
      $scope.master = {};
      $scope.bodyDisplay = false;

      if ($scope.RadioMode === "N") {
        $scope.RadioMode = "R";
        $scope.HideAndShow = true;
      } else {
        $scope.RadioMode = "N";
        $scope.HideAndShow = false;
      }
    };

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
      var roll = $scope.master.Roll.Value;
      console.log("roll", roll);
      if (roll == null) return;
      if ($scope.RadioMode == "R" && $scope.master.Roll.Value > 0) {
        // updated by Sujan Das on 09-Jan-2025
        // to differentiate between old and new batch

        //LoadByBatch();

        FindStatus()
          .then(function(status) {
            /* if (status === "Old")*/
            if ($scope.batchType === "Bulk") {
              LoadByBatch();
            } else if ($scope.batchType === "New") {
              /*else if (status === "New")*/
              LoadByBatchNew();
            } else {
              $rootScope.alert("Status not found for the batch.");
            }
          })
          .catch(function(error) {
            $rootScope.alert("Error retrieving status: " + error);
          });
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

        //updated by Sujan Das on 09-Jan-2025
        // to fetch the roll list during update among old and new batches

        FindStatus().then(function(status) {
          /*if (status === "Old")*/
          if ($scope.batchType === "Bulk") {
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
          } else if ($scope.batchType === "New") {
            /* else if (status === "New")*/
            GetRollStatusNew(Batch[0], compTime);
            FinishFabricInspectionConfig.GetRollNoNew(
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
        });
      }
    };

    $scope.enterBatchClick = function() {
      //old code
      //if ($scope.RadioMode == "N") {
      //LoadByBatch();
      //}

      // Updated by Sujan Das on 04-Jan-2025
      //to determine where the batch comes from old or new system

      if ($scope.RadioMode == "N") {
        // Updated by Sujan Das on 20-April-2025
        // not to execute the FindStatus method

        //FindStatus()
        //  .then(function(status) {
        //    if (status === "Old")
        //    {
        //      LoadByBatch();
        //    }
        //    else if (status === "New")
        //    {
        //      LoadByBatchNew();
        //    }
        //    else {
        //      $rootScope.alert("Status not found for the batch.");
        //    }
        //  })
        //  .catch(function(error) {
        //    $rootScope.alert("Error retrieving status: " + error);
        //  });
        debugger;
        if ($scope.batchType === "Bulk") {
          LoadByBatch();
        } else if ($scope.batchType === "New") {
          LoadByBatchNew();
        }
      } else {
        $scope.details = [];
        $scope.majorMinorFault = [];
        $scope.mnFaultList = [];
        $scope.master.Roll = "";
        let BatchNo = "";
        if ($scope.master.BatchNo.indexOf("(RP-") == -1) {
          let Batch = $scope.master.BatchNo.split("(");
          BatchNo = Batch[0];
        } else BatchNo = $scope.master.BatchNo;

        // Updated by Sujan Das on 07-Jan-2025
        // to retrieve the information of during update of online qc

        FindStatus()
          .then(function(status) {
            /* if (status === "Old")*/

            if ($scope.batchType === "Bulk") {
              FinishFabricInspectionConfig.GetCompTimeByBatch(
                encodeURIComponent(BatchNo),
                /*  status,*/
                function(data) {
                  //$scope.RollNoInfo = data;
                  if (data.length > 0) {
                    let compTime = data[data.length - 1].CompTime;

                    if (compTime > 1) {
                      for (i = 2; i <= compTime; i++) {
                        let model = {
                          id: i,
                          name:
                            i == 2
                              ? "2nd Time"
                              : i == 3
                                ? "3rd Time"
                                : i + "th Time"
                        };
                        let isExist = $scope.CompactingTime.filter(
                          x => x.id == i
                        );
                        if (isExist.length == 0)
                          $scope.CompactingTime.push(model);
                      }
                    }
                    $scope.master.CompTime = compTime;
                  }
                  //let Batch = $scope.master.BatchNo.split('(');

                  FinishFabricInspectionConfig.GetRollNo(
                    encodeURIComponent(BatchNo),
                    $scope.master.CompTime,
                    function(data) {
                      $scope.RollNoInfo = data;
                      //$scope.master.CompTime = data[0].CompTime;
                      if ($scope.master.BatchNo.indexOf("(RP-") == -1) {
                        let Batch = $scope.master.BatchNo.split("(");
                        if ($scope.RadioMode == "R" && Batch.length > 1) {
                          let rollNo = Batch[1]
                            .replace("(", "")
                            .replace(")", "");
                          $scope.master.Roll = {
                            Value: rollNo,
                            DisplayValue: rollNo
                          };
                          LoadByBatch();
                        }
                      } else {
                        //if ($scope.RadioMode == "R" && $scope.master.BatchNo.indexOf('(RP-') > 0) {
                        //    let rollNo = (Batch[1].replace('(', '')).replace(')', '');
                        //    $scope.master.Roll = { Value: rollNo, DisplayValue: rollNo };
                        //    LoadByBatch();
                        //}
                      }
                    }
                  );
                }
              );
            } else if ($scope.batchType === "New") {
              /*   else if (status === "New")*/
              FinishFabricInspectionConfig.GetCompTimeByBatchNew(
                encodeURIComponent(BatchNo),
                function(data) {
                  //$scope.RollNoInfo = data;
                  if (data.length > 0) {
                    let compTime = data[data.length - 1].CompTime;

                    if (compTime > 1) {
                      for (i = 2; i <= compTime; i++) {
                        let model = {
                          id: i,
                          name:
                            i == 2
                              ? "2nd Time"
                              : i == 3
                                ? "3rd Time"
                                : i + "th Time"
                        };
                        let isExist = $scope.CompactingTime.filter(
                          x => x.id == i
                        );
                        if (isExist.length == 0)
                          $scope.CompactingTime.push(model);
                      }
                    }
                    $scope.master.CompTime = compTime;
                  }

                  FinishFabricInspectionConfig.GetRollNoNew(
                    encodeURIComponent(BatchNo),
                    $scope.master.CompTime,
                    function(data) {
                      $scope.RollNoInfo = data;

                      if ($scope.master.BatchNo.indexOf("(RP-") == -1) {
                        let Batch = $scope.master.BatchNo.split("(");
                        if ($scope.RadioMode == "R" && Batch.length > 1) {
                          let rollNo = Batch[1]
                            .replace("(", "")
                            .replace(")", "");
                          $scope.master.Roll = {
                            Value: rollNo,
                            DisplayValue: rollNo
                          };
                          LoadByBatchNew();
                        }
                      } else {
                      }
                    }
                  );
                }
              );
            } else {
              $rootScope.alert("Status not found for the batch.");
            }
          })
          .catch(function(error) {
            $rootScope.alert("Error retrieving status: " + error);
          });
      }
    };

    function LoadByBatch() {
      $scope.mnFaultList = [];
      //$scope.majorMinorFault = [];
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
        FinishFabricInspectionConfig.GetInspectionInfo(
          type,
          encodeURIComponent($scope.master.BatchNo),
          rollNo,
          compTime,
          function(data) {
            $scope.details = null;
            $scope.grade = null;
            $scope.btmDisplay = false;
            $scope.bodyDisplay = false;

            $scope.TotalPoint = 0;
            $scope.Ptsperhundred = 0;
            $scope.master.IsWithoutBarcode = true;

            var model = data.master[0];
            $scope.BodyPart = data.batchSpecs;
            if ($scope.BodyPart.length > 0 && $scope.RadioMode == "N") {
              $scope.master.BodyPart = $scope.BodyPart[0].id;
            } else if ($scope.RadioMode == "R") {
              $scope.master.BodyPart = model.BSpecId;
            }

            $scope.master.Buyer = model.BuyerName;
            $scope.master.Job = model.JobInfo;
            $scope.master.Order = model.OrderNo;
            $scope.master.FabColor = model.FabColor;
            $scope.master.ReqGSM = model.ReqGSM;
            $scope.master.Machine = model.MachineNo;
            $scope.master.UnitEName = model.UnitEName;
            $scope.master.ReqDia = model.ReqDia;
            $scope.master.BatchWeight = model.BatchWeight;
            $scope.master.FabType = model.FabType;
            //$scope.master.BodyPart = model.BodyPart;
            $scope.master.LabSticker = model.LabSticker == 1 ? true : false;

            $scope.master.TotalRoll = model.TotalRoll;
            $scope.master.TRollWeight = model.TRollWeight;
            //$scope.master.CompTime = model.CompTime;

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

    function LoadByBatchNew() {
      debugger;
      $scope.mnFaultList = [];
      //$scope.majorMinorFault = [];
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
        FinishFabricInspectionConfig.GetInspectionInfoNew(
          type,
          encodeURIComponent($scope.master.BatchNo),
          rollNo,
          compTime,
          function(data) {
            $scope.details = null;
            $scope.grade = null;
            $scope.btmDisplay = false;
            $scope.bodyDisplay = false;

            $scope.TotalPoint = 0;
            $scope.Ptsperhundred = 0;
            $scope.master.IsWithoutBarcode = true;

            debugger;

            var model = data.master[0];

            /*$scope.BodyPart = data.batchSpecs;*/
            $scope.BodyPart = data.batchSpecsWithDiaGSM;

            debugger;

            if ($scope.BodyPart.length > 0 && $scope.RadioMode == "N") {
              $scope.master.BodyPart = $scope.BodyPart[0].id;
            } else if ($scope.RadioMode == "R") {
              $scope.master.BodyPart = model.BSpecId;
            }

            $scope.master.Buyer = model.BuyerName;
            $scope.master.Job = model.JobInfo;
            $scope.master.Order = model.OrderNo;
            $scope.master.FabColor = model.FabColor;
            $scope.master.ReqGSM = model.ReqGSM;
            $scope.master.Machine = model.MachineNo;
            $scope.master.UnitEName = model.UnitEName;
            $scope.master.ReqDia = model.ReqDia;
            $scope.master.BatchWeight = model.BatchWeight;
            $scope.master.FabType = model.FabType;
            //$scope.master.BodyPart = model.BodyPart;
            $scope.master.LabSticker = model.LabSticker == 1 ? true : false;

            $scope.master.TotalRoll = model.TotalRoll;
            $scope.master.TRollWeight = model.TRollWeight;
            //$scope.master.CompTime = model.CompTime;

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
      skipClearTextOnce = true;
      debugger;

      if (valid()) {
        $scope.btnSaveDisabled = false;
        $mdDialog.show({
          async: false,
          controller: DialogController,
          templateUrl: "/App/template/Popup/FabricInspectionDialog.html",
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
        //$mdDialog.show(
        //    $mdDialog.dialogBox({
        //        locals: {
        //            model: objData()
        //        }
        //    })).then(function () {
        //        SaveUpdate();
        //    });
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

    async function SaveUpdate() {
      debugger;
      console.log($scope.master.BatchNo);

      if (parseFloat($scope.master.FinishWeight) <= 0) {
        $rootScope.alert("Please! Enter Valid Roll Weight....");
        return;
      }

      $scope.master.UserId = $rootScope.UserId;
      if ($scope.master.Roll) $scope.master.RollNo = $scope.master.Roll.Value;

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

      console.log("sticker", $scope.master);

      $scope.btnSaveDisabled = true;

      /* Updated by Sujan Das on 26-April-2025*/
      /*const status = await GetStatus($scope.master.BatchNo);*/
      let status = "";

      if ($scope.batchType === "Bulk") status = "Old";
      else if ($scope.batchType === "New") status = "New";

      console.log("Retrieved Status:", status);

      //updated by Sujan Das on 05-jan-2024
      // send status for saving new and old bactchNo

      debugger;

      // Updated by Sujan Das on 17-March-2025
      // Have to fetch Fabric Type for respected body

      let selectedBodyPart = $scope.BodyPart.find(
        a => a.id === $scope.master.BodyPart
      );

      if (selectedBodyPart) {
        $scope.master.FinishedDia = selectedBodyPart.FinishedDia || "";
        $scope.master.FinishedGSM = selectedBodyPart.FinishedGSM || "";

        $scope.master.FabricTypeOfBodyPart =
          selectedBodyPart.FabricTypeName || "";
        $scope.master.CompositionOfBodyPart =
          selectedBodyPart.Composition || "";
      }

      // #region oldSave
      //FinishFabricInspectionConfig.SaveUpdate($scope.master, function (res)
      //#endregion

      console.log($scope.master);

      FinishFabricInspectionConfig.SaveUpdateNew(
        $scope.master,
        status,
        function(res) {
          if (res.ErrorMsg == null) {
            let msg = "";
            // Updated by Sujan Das on 19-March-2025
            // create separeate model for old and new system sticker
            let model = {};
            if (status == "New") {
              model = {
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
                FabType:
                  $scope.master.FabricTypeOfBodyPart +
                  "(" +
                  $scope.master.CompositionOfBodyPart +
                  ")"
              };
            } else {
              model = {
                UnitEName: $scope.master.UnitEName,
                Buyer: $scope.master.Buyer,
                Job: $scope.master.Job,
                Order: $scope.master.Order,
                BatchNo: $scope.master.BatchNo,
                FabColor: $scope.master.FabColor,
                ReqDia: res.Data.FDia,
                ReqGSM: res.Data.FGSM,
                RollNo: res.Data.rollNo,
                FabType:
                  res.Data.BodyPart == "BNT" || res.Data.BodyPart == "Neck"
                    ? res.Data.FabType
                    : $scope.master.FabType,
                FinishWeight: $scope.master.FinishWeight,
                BatchWeight: res.Data.BatchWeight,
                StickerPath: res.Data.stickerPath,
                LabStickerReq: $scope.master.LabSticker,
                BodyPart: res.Data.BodyPart,
                CompTime: $scope.master.CompTime
              };
            }
            //console.log("model", model);
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

            $mdDialog.cancel();

            // updated by sujan das on 06-Jan-2025
            if (status == "Old") {
              GetRollStatus($scope.master.BatchNo, $scope.master.CompTime);
            } else if (status == "New") {
              GetRollStatusNew($scope.master.BatchNo, $scope.master.CompTime);
            }
            if ($scope.RadioMode == "R" && $scope.master.RollNo > 0) {
              $scope.Refresh();
              $scope.RadioMode = "N";
            }
          } else $rootScope.alert(res.ErrorMsg);
        }
      );
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
        $scope.master.BodyPart == null ||
        $scope.master.BodyPart == ""
      ) {
        $rootScope.alert("Please! Select Body Part...");
        return false;
      }
      //else if (parseFloat($scope.master.FinishWeight) <= 0) {
      //    $rootScope.alert('Please! Enter Roll Weight...');
      //    return false;
      //}
      return true;
    }

    function genSticker(data) {
      console.log("sticker", data);
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
                    <td>Buyer:</td>
                    <td colspan="3">` +
        data.Buyer +
        `</td>
                </tr>
                <tr>
                    <td>Job:</td>
                    <td colspan="3">` +
        data.Job +
        `</td>
                </tr>
                <tr>
                    <td>Order/Style:</td>
                    <td colspan="3">` +
        data.Order +
        `</td>
                </tr>
                <tr>
                    <td>Batch No:</td>
                    <td colspan="3">` +
        data.BatchNo +
        `</td>
                </tr>
                <tr>
                    <td>Color:</td>
                    <td colspan="3">` +
        data.FabColor +
        `</td>
                </tr>
                <tr>
                    <td>Fabric Type:</td>
                    <td colspan="3">` +
        data.FabType +
        `</td>
                </tr>
                <tr>
                    <td>Req.Dia:</td>
                    <td>` +
        data.ReqDia +
        `</td>
                    <td>R.GSM:</td>
                    <td>` +
        data.ReqGSM +
        `</td>
                </tr>
                <tr>
                    <td>Roll No:</td>
                    <td>` +
        data.RollNo +
        " (" +
        data.BodyPart +
        ")" +
        `</td>
                    <td>R.Wgt:</td>
                    <td>` +
        data.FinishWeight +
        ` kg</td>
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
                            <td>Buyer:</td>
                            <td colspan="3">` +
          data.Buyer +
          `</td>
                        </tr>
                        <tr>
                            <td>Job:</td>
                            <td colspan="3">` +
          data.Job +
          `</td>
                        </tr>
                        <tr>
                            <td>Order/Style:</td>
                            <td colspan="3">` +
          data.Order +
          `</td>
                        </tr>
                        <tr>
                            <td>Batch No:</td>
                            <td colspan="3">` +
          data.BatchNo +
          `</td>
                        </tr>
                        <tr>
                            <td>Color:</td>
                            <td colspan="3">` +
          data.FabColor +
          `</td>
                        </tr>
                        <tr>
                            <td>Fabric Type:</td>
                            <td colspan="3">` +
          data.FabType +
          `</td>
                         </tr>
                        <tr>
                            <td>Req.Dia:</td>
                            <td>` +
          data.ReqDia +
          `</td>
                            <td>R.GSM:</td>
                            <td>` +
          data.ReqGSM +
          `</td>
                        </tr>
                        <tr>
                            <td>Roll No:</td>
                            <td>` +
          data.RollNo +
          " (" +
          data.BodyPart +
          ")" +
          `</td>
                            <td>B.Wgt:</td>
                            <td>` +
          data.BatchWeight +
          ` kg</td>
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
      //return false;
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

      $scope.master.batchNo = "";
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

      $scope.details = [];
      $scope.majorMinorFault = [];

      $scope.master.BatchNo = "";

      $scope.RadioMode = "N";
    }
  }
]);
