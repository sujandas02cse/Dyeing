app.controller("ShearingMcOpConfigController", ["$scope", "$rootScope", "$mdDialog", "$mdToast", "$q", "$parse", "fileReader", "$window", "NewMcOperationConfigFactory", function (
    $scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, NewMcOperationConfigFactory) {
    /* Updated By Sujan Das on 24-Mach-2025 to check new system*/

    //let status = 'Bulk';
    //let unitId = 4;
    NewMcOperationConfigFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

    //Old Code
    //McOperationConfigFactory.GetBatchNoList(0, function (data) {
    //    $scope.batchList = data;
    //});
    //Updated By Sujan Das on 07-April-2025 to check new system

    $scope.$watch("Unit", function (newVal, oldVal) {
        if (newVal) {
            clearTextFields();
            loadBatchList();
            loadMachineList();
        }
    });

    $scope.$watch("batchType", function (newVal, oldVal) {
        if (newVal) {
            clearTextFields();
            loadBatchList();
        }
    });

    function clearTextFields() {
        if (!$scope.McOperation) {
            $scope.McOperation = {};
        }
        $scope.McOperation.BuyerName = "";
        $scope.McOperation.StyleName = "";
        $scope.McOperation.OrderName = "";
        $scope.McOperation.ColorName = "";
        $scope.McOperation.Fabric = "";
        $scope.McOperation.BatchNo = "";
        $scope.McOperation.MachineNo = "";
        $scope.McOperation.JobName = "";
        $scope.McOperation.StartTime = null;
        $scope.McOperation.EndTime = null;
        $scope.McOperation.CompTime = 0;

        $scope.CompactingTime = [{ id: 1, name: "1st Time" }];

        $scope.CurrCompTime = 1;
    }

    function loadBatchList() {
        if ($scope.Unit && $scope.batchType) {
            NewMcOperationConfigFactory.GetBatchNoListUnitStatusWise($scope.batchType, $scope.Unit.UnitId, function (dataNew) {
                $scope.batchList = dataNew;
            });
        }
    }

    function loadMachineList() {
        if ($scope.Unit) {
            NewMcOperationConfigFactory.GetFinMcByTypeUnitWise("Shearing", $scope.Unit.UnitId, function (dataNew) {
                $scope.MachineList = dataNew;
                if ($scope.MachineList.length == 1) {
                    $scope.McOperation.MachineNo = $scope.MachineList[0];
                }
            });
        }
    }

    //Updated By Sujan Das on 07-April-2025 to check new system
    // comment out for new code

    //McOperationConfigFactory.GetFinMcByType("Dryer", function(data) {
    //  $scope.MachineList = data;
    //});

    $scope.CompactingTime = [{ id: 1, name: "1st Time" }];
    $scope.CurrCompTime = 1;
    var batchId = 0;
    $scope.getDataByBatchId = function () {
        debugger
        batchId = $scope.McOperation.BatchNo.BatchId;
        var batchNo = $scope.McOperation.BatchNo.BatchNo;

        let ct = $scope.McOperation.CompTime;
        let pCompTime = 0;
        if (ct == "") ct = 1;
        if (ct < $scope.CurrCompTime)
            pCompTime = ct;

        let selectedBatch = $scope.batchList.find(
            batch => batch.BatchNo === batchNo
        );
        let status = selectedBatch ? selectedBatch.Sts : null;

        // McOperationConfigFactory.GetDataByBatchIdDetail(batchId, pCompTime, 'GetDryerData', function (data)
        debugger
        NewMcOperationConfigFactory.GetDataByBatchIdDetailNew(batchId, pCompTime, status, "Shearing", function (data) {
            debugger
                $scope.McOperation = data.m_Item1[0];
                $scope.Fabrics = data.m_Item2;
                $scope.McOperation.BatchNo = { BatchId: batchId, BatchNo: batchNo };
                $scope.McOperation.MachineNo = $scope.MachineList[0];

                let compTime = parseInt(data.m_Item1[0].CompTime);
                $scope.CurrCompTime = compTime;

                // updated by Sujan Das on 31/12/2024
                // to keep same as CompactingMcOperationController.js

                //$scope.McOperation.CompTime = compTime;

                if (compTime > 1) {
                    for (i = 2; i <= compTime; i++) {
                        let model = {
                            id: i,
                            name: i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                        };
                        let isExist = $scope.CompactingTime.filter(x => x.id == i);
                        if (isExist.length == 0) $scope.CompactingTime.push(model);
                    }
                }

                if (data.m_Item1[0].EndTime != null && pCompTime == 0) {
                    // updated by Sujan Das on 31/12/2024
                    // to keep same as CompactingMcOperationController.js

                    $scope.McOperation.MachineNo = null;
                    $scope.McOperation.StartTime = null;
                    $scope.McOperation.EndTime = null;
                }

                if (pCompTime > 0) $scope.McOperation.CompTime = pCompTime;
                else $scope.McOperation.CompTime = compTime;

                if (data.m_Item1[0].StartTime != null) {
                    $scope.btnSave = "Update";
                } else {
                    $scope.btnSave = "Save";
                }
            }
        );
    };

    function objData(action) {
        var obj = [];
        var msg = "";

        if (action == "Save") {
            obj = {Mode: "Save",btnText: "Yes",Header: "Save Confirmation",message: "Do you want to save..?"};
        }
        else if (action == "Update") {
            obj = {Mode: "Update",btnText: "Yes",Header: "Update Confirmation",message: "Do you want to update..?"};
        }
        return obj;
    }

    $scope.actionDialog = function (action) {
        $mdDialog
            .show(
                $mdDialog.dialogBox({
                    locals: {
                        model: objData(action)
                    }
                })
            )
            .then(function (mode) {
                if (mode == "Update" || mode == "Save") {
                    SaveUpdate();
                }
            });
    };

    function SaveUpdate() {


        var obj = {
            Operation: "Shearing",
            OpTime: $scope.McOperation.CompTime === 0 ? 1 : $scope.McOperation.CompTime,
            BpmId: $scope.McOperation.BatchNo.BatchId,
            //BatchStart:,
            //BatchEnd:,
            MachineId: $scope.McOperation.MachineNo.MDId,
            UserId: $rootScope.UserId,
            Status: $scope.batchType === 'New' ? 1 : 0
        }

        debugger
        

        // McOperationConfigFactory.SaveMcConfigurationData($scope.McOperation, function (data)
        NewMcOperationConfigFactory.NewMachineConfigDataSaveUpdate(obj, function (data) {
            debugger
            if (data.response == true) {
                $rootScope.alert(data.ProofValue[0].Msg);

                //if ($scope.btnSave == "Save")
                //    $rootScope.alert("Batch Start Time Set Success!");
                //else {
                //    let status = data.ProofValue.m_Item1[0][""];
                //    if ($scope.McOperation.EndTime != undefined) {
                //        $rootScope.alert("Batch End Time Already Set...");
                //    } else if (status == 2) {
                //        $rootScope.alert("Batch End Time Set Success!");
                //    } else if (status == 0) {
                //        $rootScope.alert("Couldn't save this data.");
                //    }
                //}
                ClearData();
            } else $rootScope.alert(data.ErrorMsg);
        }
        );
    }

    $scope.Refresh = function () {
        ClearData();
    };

    function ClearData() {
        $scope.McOperation = {};
        document.getElementById("batch").focus();
    }
}
]);