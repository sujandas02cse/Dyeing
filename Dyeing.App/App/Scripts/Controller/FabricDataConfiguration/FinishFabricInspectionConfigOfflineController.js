

app.controller("FinishFabricInspectionConfigOfflineController", [
    "$scope",
    "$rootScope",
    "filterFilter",
    "$mdDialog",
    "$mdToast",
    "$q",
    "$window",
    "FinishFabricInspectionConfigOffline",
    function (
        $scope,
        $rootScope,
        filterFilter,
        $mdDialog,
        $mdToast,
        $q,
        $window,
        FinishFabricInspectionConfigOffline
    ) {
        $scope.NumberOfRollList = [];
        $scope.DiaGsmDetails = [];
        $scope.ShowDiaGsmTable = false;
        $scope.DiaPartList = [];
        $scope.IsLabStickerChecked = false;
        $scope.MasterDiaPart = null;
        //for (var i = 1; i <= 10; i++) {
        //  $scope.DiaPartList.push("Dia-" + i);
        //}

        for (var i = 1; i <= 100; i++) {
            $scope.NumberOfRollList.push(i);
        }

        $scope.DCT = "1st";
        $scope.OperationMode = "New";

        $scope.btnSave = "Save";
        $scope.btnUpdate = "Update";

        $scope.onModeChange = function (selectMode) {
            debugger;
            $scope.OperationMode = selectMode;
            debugger;

            clearTxt();
        };

        FinishFabricInspectionConfigOffline.GetDiaPartList(function (data) {
            //$scope.DiaPartList = data;

            $scope.DiaPartList = data.map(function (item) {
                item.FabricDiaPartId = parseInt(item.FabricDiaPartId);
                return item;
            });
        });

        FinishFabricInspectionConfigOffline.GetUnitAll($rootScope.UserId, function (
            data
        ) {
            $scope.UnitList = data;
            if ($scope.UnitList.length == 1) {
                $scope.Unit = $scope.UnitList[0];
            }
        });

        $scope.$watch("Unit", function (newVal, oldVal) {
            if (newVal) {
                clearTxt();
                loadBatchList();
            }
        });

        $scope.$watch("batchType", function (newVal, oldVal) {
            if (newVal) {
                clearTxt();
                loadBatchList();
            }
        });

        function loadBatchList() {
            debugger;
            if ($scope.Unit && $scope.batchType) {
                FinishFabricInspectionConfigOffline.GetBatchNoListForOfflineQC(
                    $scope.batchType,
                    $scope.Unit.UnitId,
                    function (dataNew) {
                        debugger;
                        $scope.BatchList = dataNew;
                    }
                );
            }
        }

        function clearTxt() {
            $scope.BatchNo = "";
            $scope.Buyer = "";
            $scope.Job = "";
            $scope.Style = "";
            $scope.Order = "";
            $scope.Color = "";

            $scope.BodyPartList = null;
            $scope.SelectedBodyPart = null;

            $scope.FabricType = "";
            $scope.Composition = "";
            /* $scope.BatchList = null;*/

            $scope.ShowDiaGsmTable = null;
            $scope.DiaGsmDetails = [];
            $scope.TotalRolls = null;
        }

        debugger;
        //---------------------Batch Combo Load------------//
        //FinishFabricInspectionConfigOffline.GetBatchNo(function (data) {
        //    debugger;
        //    $scope.BatchList = data;
        //});

        $scope.Refresh = function () {
            Refresh();
        };
        function Refresh() {
            $scope.Batch = "";

            $scope.Model = null;
            /* clearTxt();*/
        }

        //-----------Save/Update/Delete-------------------------------//
        $scope.actionDialog = function (action, dataModel) {
            debugger;
            console.log('Update button clicked: ' + action);
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
            var obj = [];

            if (action == "Save" || action == "Update") {
                obj = {
                    Mode: action,

                    btnText: "Yes",

                    Header: action + "Confirmation",
                    message: "Do you want to " + action + "?"
                };

                return obj;
            }
        }

        function SaveUpdate() {
            debugger;

            let isValid = true;

            angular.forEach($scope.DiaGsmDetails, function (item) {
                item.hasError = {
                    ActualGsm: false,
                    ActualDia: false,
                    RollWeight: false,
                    FabricDiaPartId: false
                };
                if (!item.ActualGsm || isNaN(item.ActualGsm) || item.ActualGsm <= 0) {
                    item.hasError.ActualGsm = true;
                    isValid = false;
                }
                if (!item.ActualDia || isNaN(item.ActualDia) || item.ActualDia <= 0) {
                    item.hasError.ActualDia = true;
                    isValid = false;
                }
                if (
                    !item.RollWeight ||
                    isNaN(item.RollWeight) ||
                    item.RollWeight <= 0
                ) {
                    item.hasError.RollWeight = true;
                    isValid = false;
                }
                if (!item.FabricDiaPartId) {
                    item.hasError.FabricDiaPartId = true;
                    isValid = false;
                }
            });

            if (!isValid) {
                setTimeout(() => {
                    const el = document.querySelector(".error-cell");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
                return;
            }

            var labStickerFlag = $scope.IsLabStickerChecked ? 1 : 0;
            debugger;

            var Obj = {
                DiaGsmDetails: $scope.DiaGsmDetails,
                UserId: $scope.UserId,
                BatchType: $scope.batchType,
                OperationMode: $scope.OperationMode,
                BatchNo: $scope.BatchNo.BatchNo
            };

            var fixedCompactingTime = 1;

            FinishFabricInspectionConfigOffline.FinishFabricInspectionConfigOffline_Save(
                Obj,

                function (data) {
                    debugger;
                    console.log(data);
                    if (data != null) {
                        Refresh();
                        debugger;
                        ShowSticker(
                            Obj,
                            fixedCompactingTime,
                            $scope.BatchNo.BatchNo,
                            labStickerFlag,
                            $scope.batchType
                        );
                        debugger;
                        clearTxt();
                        $scope.DiaGsmDetails = [];
                        $scope.ShowDiaGsmTable = false;
                        $scope.TotalRolls = 0;
                        $scope.btnSave = "Save";

                        $scope.SelectedNumberOfRoll = null;
                        $scope.IsLabStickerChecked = false;
                    } else $rootScope.alert(data.ErrorMsg);
                }
            );
        }

        function ShowSticker(Obj, fixedCompactingTime, BatchNo, labStickerFlag, BatchType) {
            debugger;

            var rptParm = [
                { CompTime: fixedCompactingTime },
                { BatchNo: BatchNo },
                { BodyPartId: Obj.DiaGsmDetails[0]["BodyPartId"] },
                { BatchType: BatchType }
            ];
            debugger;
            var reportPath =
                $scope.batchType === "Old" || $scope.batchType === "Bulk"
                    ? "~/Reports/QCManagement/LabSticker.rdlc"
                    : "~/Reports/QCManagement/LabSticker.rdlc";
            debugger;
            var fileName =
                $scope.batchType === "Old" || $scope.batchType === "Bulk"
                    ? "LabStickerNew"
                    : "LabStickerNew";
            debugger;
            var rptComInfo = [
                { APIAction: "BroadcastManagement/GetReportingData" },
                { ReportPath: reportPath },
                { FileName: fileName },
                { Format: "PDF" }
            ];
            debugger;
            var sqlQuery =
                $scope.batchType === "Old" || $scope.batchType === "Bulk"
                    ? "[dbo].[usp_rpt_LabStickerOffline]"
                    : "[dbo].[usp_rpt_LabStickerOffline]";

            var SQL = [{ SQL: sqlQuery }];

            debugger;
            var Dataset = [{ Dataset: "LabSticker" }];
            debugger;
            $window.open(
                "../BroadcastManagement/GetBroadcastDataLabSticker?rptComInfo=" +
                JSON.stringify(rptComInfo) +
                "&&rptParm=" +
                JSON.stringify(rptParm) +
                "&&SQL=" +
                JSON.stringify(SQL) +
                "&&Dataset=" +
                JSON.stringify(Dataset) +
                "&&PartialParam=" +
                JSON.stringify(labStickerFlag)
            );
        }

        $scope.enterBatchClick = function () {
            debugger;
            LoadDetailsByBatch($scope.batchType, $scope.BatchNo.BatchNo);

            LoadBodyPartsByBatch($scope.batchType, $scope.BatchNo.BatchNo);
        };

        function LoadDetailsByBatch(batchType, BatchNo) {
            debugger;
            FinishFabricInspectionConfigOffline.LoadDetailsByBatch(
                batchType,
                encodeURIComponent(BatchNo),
                function (data) {
                    debugger;
                    console.log(data);
                    $scope.Buyer = data[0].BuyerName;
                    $scope.Job = data[0].JobInfo;
                    $scope.Style = data[0].StyleNo;
                    $scope.Order = data[0].OrderNo;
                    $scope.Color = data[0].Color;
                }
            );
        }

        function LoadBodyPartsByBatch(batchType, BatchNo) {
            debugger;
            FinishFabricInspectionConfigOffline.LoadBodyPartsByBatch(
                batchType,
                encodeURIComponent(BatchNo),
                function (data) {
                    debugger;
                    $scope.BodyPartList = data;
                    $scope.SelectedBodyPart = "";

                    if (data.length == 1) {
                        debugger;
                        //console.log('body part', data);
                        // $scope.SelectedBodyPart = data[0];
                        $scope.SelectedBodyPart = data[0]["id"];
                    }
                }
            );
        }

        $scope.LoadFabricTypeComposition = function () {
            debugger;

            if (!$scope.SelectedBodyPart || $scope.SelectedBodyPart === "Select") {
                console.warn("Invalid body part selected. Skipping load.");
                return;
            }

            FinishFabricInspectionConfigOffline.LoadFabricTypeComposition(
                $scope.batchType,
                encodeURIComponent($scope.BatchNo.BatchNo),
                $scope.SelectedBodyPart,
                function (dataNew) {
                    debugger;

                    if (dataNew && dataNew.length > 0) {
                        $scope.FabricType = dataNew[0].FabricType;
                        $scope.Composition = dataNew[0].Composition;
                    } else {
                        $scope.FabricType = "";
                        $scope.Composition = "";
                    }

                    setTimeout(() => {
                        const nextDropdown = document.getElementById("ddlNumberOfRoll");
                        if (nextDropdown) {
                            nextDropdown.focus();
                        }
                    }, 100);
                }
            );

            if ($scope.OperationMode === "Modify") {
                debugger;
                $scope.DiaGsmDetails = [];
                $scope.ShowDiaGsmTable = false;
                $scope.TotalRolls = 0;

                FinishFabricInspectionConfigOffline.LoadSavedDiaGSM(
                    $scope.batchType,
                    encodeURIComponent($scope.BatchNo.BatchNo),
                    $scope.SelectedBodyPart,
                    function (data) {
                        debugger;
                        if (data && data.length > 0) {
                            angular.forEach(data, function (item) {
                                item.FabricDiaPartId = item.FabricDiaPartId
                                    ? parseInt(item.FabricDiaPartId)
                                    : null;

                                // Convert string numbers to actual numbers
                                item.ActualGsm = item.ActualGsm
                                    ? parseFloat(item.ActualGsm)
                                    : null;
                                item.ActualDia = item.ActualDia
                                    ? parseFloat(item.ActualDia)
                                    : null;
                                item.RollWeight = item.RollWeight
                                    ? parseFloat(item.RollWeight)
                                    : null;

                                item.PrintLabSticker = item.PrintLabSticker === 1;
                            });

                            $scope.DiaGsmDetails = data;
                            $scope.ShowDiaGsmTable = true;
                            $scope.TotalRolls = $scope.DiaGsmDetails.length;
                        }
                    }
                );
            }
        };

        $scope.LoadDiaGSM = function () {
            debugger;

            if (
                !$scope.SelectedNumberOfRoll ||
                $scope.SelectedNumberOfRoll === "Number Of Roll"
            ) {
                console.warn("Ivalid Number of Roll");

                $scope.ShowDiaGsmTable = $scope.TotalRolls > 0;
                $scope.TotalRolls = $scope.DiaGsmDetails.length;
                return;
            }

            IsSecondCompactingON($scope.batchType, $scope.BatchNo.BatchNo, function (
                maxCompTime
            ) {
                debugger;

                $scope.MaxCompTime = maxCompTime;

                if ($scope.MaxCompTime > 1) {
                    $rootScope.alert(
                        "Second Compacting Already Started.User can't create roll for Manual QC"
                    );
                    return;
                }
                FinishFabricInspectionConfigOffline.LoadDiaGSM(
                    $scope.batchType,
                    encodeURIComponent($scope.BatchNo.BatchNo),
                    $scope.SelectedNumberOfRoll,
                    $scope.SelectedBodyPart,
                    function (data) {
                        debugger;
                        if (data && data.length > 0) {
                            $scope.DiaGsmDetails = $scope.DiaGsmDetails.concat(data);

                            angular.forEach(data, function (item) {
                                item.PrintLabSticker = true;
                            });

                            serializeRollNumbers();
                            $scope.ShowDiaGsmTable = true;
                            $scope.TotalRolls = $scope.DiaGsmDetails.length;
                        }
                    }
                );
            });
        };

        $scope.removeRow = function (index) {
            debugger;
            $scope.DiaGsmDetails.splice(index, 1);
            serializeRollNumbers();
            $scope.TotalRolls = $scope.DiaGsmDetails.length;
        };

        $scope.addRow = function (index) {
            debugger;
            const currentRow = $scope.DiaGsmDetails[index];
            const newRow = angular.copy(currentRow);

            //newRow.PrintLabSticker = false;

            $scope.DiaGsmDetails.splice(index + 1, 0, newRow);
            serializeRollNumbers();

            $scope.TotalRolls = $scope.DiaGsmDetails.length;
        };

        $scope.handleDiaPartChange = function (index, FabricDiaPartId) {
            debugger;
            if (index === 0) {
                angular.forEach($scope.DiaGsmDetails, function (item) {
                    item.FabricDiaPartId = FabricDiaPartId;
                });
            }
        };

        function serializeRollNumbers() {
            angular.forEach($scope.DiaGsmDetails, function (item, index) {
                item.NumberOfRoll = index + 1;
            });
        }

        function IsSecondCompactingON(batchType, BatchNo, callback) {
            debugger;
            FinishFabricInspectionConfigOffline.IsSecondCompactingON(
                batchType,
                encodeURIComponent(BatchNo),
                function (data) {
                    if (data && data.length > 0) {
                        callback(data[0].MaxCompTime);
                    } else {
                        callback(0); // Default to 0 if nothing is returned
                    }
                }
            );
        }
    }
]);
