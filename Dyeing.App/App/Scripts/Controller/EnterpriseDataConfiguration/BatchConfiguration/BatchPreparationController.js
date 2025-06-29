app.controller("BatchPreparationController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'BatchPreparation', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, BatchPreparation) {
    BatchPreparation.GetDyeingProcessFlowInfo(function (data) {
        $scope.DyeingPFList = data;
        $scope.DyeingPFList1 = angular.copy(data);
    });
    BatchPreparation.GetBatchNoAndPlanNo(function (data) {
        $scope.PlanList = data;//.filter(x=>x.IsHalt==false);
        for (i = 0; i < $scope.PlanList.length; i++) {
            $scope.PlanData.push({ id: $scope.PlanList[i].MppmId, label: $scope.PlanList[i].PlanNo });
        }
        
        //$scope.PlanListAll = data;
        debugger;       
    });
    BatchPreparation.GetBatchAll(function (data) {
        $scope.BatchList = data;
    });
    BatchPreparation.GetDressPart(function (data) {
        $scope.DressPartList = data;
    });
    BatchPreparation.GetTrollyNo(0, function (data) {
        $scope.TrolleyList = data;
    });

    $scope.groupSetup = {
        multiple: true,
        formatSearching: 'Searching the plan...',
        formatNoMatches: 'No plan found'
    };

    $scope.Plan = [];
    $scope.getDataByBatch = function (e) {
        debugger;
        BatchPreparation.GetDataByBatch($scope.model.Batch.BpmId, function (result) {
            debugger;
            Refresh();

            var data = result.m_Item1[0];
            var details = result.m_Item2;
            var child = result.m_Item3;
            var barcode = result.m_Item4;
            var Plan = result.m_Item5;

            var planObj = [];
            for (g = 0; g < Plan.length; g++) {
                planObj.push({ id: Plan[g].MppmId });
            }

            $scope.Plan = planObj;
            $scope.cMDId = Plan[0].MDId;

            $scope.master.MachineNo = data.MachineNo;
            $scope.master.Capacity = data.Capacity;
            $scope.master.NoOfNozzle = data.NoOfNozzle;
            $scope.master.Enzyme = data.Enzyme;
            $scope.master.BatchWeight = data.BatchWeight;

            tableInitialStateNozzle();
            $scope.Nozzle[0].NozzleNo = 1;
            for (p = 1; p < data.NoOfNozzle; p++) {
                addNozzleRow();
                $scope.Nozzle[p].NozzleNo = p + 1;
            }

            $scope.master.EnzStatus = data.Enzyme ? '1' : '0';

            if (data.DpfcId) {
                var ArrDProcess = data.DpfcId.split(',');
                for (i = 0; i < ArrDProcess.length; i++) {
                    var v = parseInt(ArrDProcess[i]);
                    var e = $scope.DyeingPFList.findIndex(x => x.id == v);
                    if (e >= 0) {
                        $scope.DyeingPFList[e].DPFlow = true;
                    }
                }
            }
            //$scope.DyeingPFList = $scope.DyeingPFList;

            if (data.BpmId > 0) {
                $scope.batchNo = "Batch No# " + data.BatchNo;
                $scope.master.BpmId = data.BpmId;
                $scope.master.TuringStatus = data.Turing ? '1' : '0';
                //$scope.master.BatchWeight = data.BatchWeight;

                var ltime = data.LoadingTime.split(":");
                var hr = parseInt(ltime[0]);
                var min = parseInt(ltime[1]);

                $scope.master.PLoadingTime = new Date();
                $scope.master.PLoadingTime.setHours(hr, min, 0, 0);

                var utime = data.UnloadingTime.split(":");
                var hr = parseInt(utime[0]);
                var min = parseInt(utime[1]);

                $scope.master.PUnLoadingTime = new Date();
                $scope.master.PUnLoadingTime.setHours(hr, min, 0, 0);
                $scope.master.RecipeNo = data.RecipeNo;
                $scope.master.Turing = data.Turing;

                $scope.Details = details;

                $scope.btnSave = "Update";
            }

            BatchPreparation.GetFabricNameByPlan(Plan, function (result) {
                $scope.FabricNameList = result;
                if (data.BpmId > 0) {
                    for (b = 0; b < $scope.Details.length; b++) {
                        debugger;
                        $scope.Details[b].DressPart = $scope.DressPartList.filter(x => x.DressId == $scope.Details[b].DressPartId)[0];
                        $scope.Details[b].FabricName = $scope.FabricNameList.filter(x => x.Id == $scope.Details[b].IFID)[0];
                        $scope.Details[b].Nozzle = child.filter(x => x.BpdId == $scope.Details[b].BpdId);

                        for (p = 0; p < $scope.Details[b].Nozzle.length; p++) {
                            $scope.Details[b].Nozzle[p].BarcodeList = barcode.filter(x => x.BpdId == $scope.Details[b].BpdId && x.NozzleNo == $scope.Details[b].Nozzle[p].NozzleNo);
                            $scope.Details[b].Nozzle[p].TrolleyNo = $scope.TrolleyList.filter(x => x.id == $scope.Details[b].Nozzle[p].TncId)[0];
                        }

                        $scope.GetDiaInfo(b);
                    }
                }
            });
        })
    }
    
    $scope.PlanSelect = function (arg) {
        PlanBehaviour("1");
    };
    $scope.PlanDeselect = function (arg) {
        PlanBehaviour("0");
    };

    function PlanBehaviour(flag) {
        if ($scope.Plan.length > 1) {
            var plan = $scope.PlanList.filter(x => x.MppmId == $scope.Plan[$scope.Plan.length - 1].id);
           
            if (plan[0].MDId != $scope.cMDId) {
                $rootScope.alert("Please! Select a Plan No of Same Machine...");
                $scope.Plan.splice(-1);
                return;
            }
            var planObj = [];
            for (g = 0; g < $scope.Plan.length; g++) {
                plan = $scope.PlanList.filter(x => x.MppmId == $scope.Plan[g].id)[0];
                planObj.push(plan);
            }

            $scope.getDataByPlan(planObj);
        } else if ($scope.Plan.length == 1) {
            var plan = $scope.PlanList.filter(x => x.MppmId == $scope.Plan[0].id);
            $scope.cMDId = plan[0].MDId;
            $scope.getDataByPlan(plan);
        }
    }

    $scope.getDataByPlan = function (Plan) {
        debugger;
        BatchPreparation.GetMachineDataByPlan(Plan, function (result) {
            debugger;
            //Refresh();

            var data = result.m_Item1[0];
            var details = result.m_Item2;
            var child = result.m_Item3;
            var barcode = result.m_Item4;

            $scope.master.MachineNo = data.MachineNo;
            $scope.master.Capacity = data.Capacity;
            $scope.master.NoOfNozzle = data.NoOfNozzle;
            $scope.master.Enzyme = data.Enzyme;           
            $scope.master.BatchWeight = data.BatchWeight;

            tableInitialStateNozzle();
            $scope.Nozzle[0].NozzleNo = 1;
            for (p = 1; p < data.NoOfNozzle; p++) {
                addNozzleRow();
                $scope.Nozzle[p].NozzleNo = p+1;
            }            
            
            $scope.master.EnzStatus = data.Enzyme ? '1' : '0';           
           
            if (data.DpfcId) {
                var ArrDProcess = data.DpfcId.split(',');
                for (i = 0; i < ArrDProcess.length; i++) {
                    var v = parseInt(ArrDProcess[i]);
                    var e = $scope.DyeingPFList.findIndex(x => x.id == v);
                    if (e >= 0) {
                        $scope.DyeingPFList[e].DPFlow = true;
                    }
                }
            }
            //$scope.DyeingPFList = $scope.DyeingPFList;

            //if (data.BpmId > 0) {
            //    $scope.batchNo = "Batch No# "+data.BatchNo;
            //    $scope.master.BpmId = data.BpmId;
            //    $scope.master.TuringStatus = data.Turing ? '1' : '0';
            //    //$scope.master.BatchWeight = data.BatchWeight;

            //    var ltime = data.LoadingTime.split(":");
            //    var hr = parseInt(ltime[0]);
            //    var min = parseInt(ltime[1]);

            //    $scope.master.PLoadingTime = new Date();
            //    $scope.master.PLoadingTime.setHours(hr, min, 0, 0);

            //    var utime = data.UnloadingTime.split(":");
            //    var hr = parseInt(utime[0]);
            //    var min = parseInt(utime[1]);

            //    $scope.master.PUnLoadingTime = new Date();
            //    $scope.master.PUnLoadingTime.setHours(hr, min, 0, 0);
            //    $scope.master.RecipeNo = data.RecipeNo;
            //    $scope.master.Turing = data.Turing;
                
            //    $scope.Details = details;

            //    $scope.btnSave = "Update";
            //}

            BatchPreparation.GetFabricNameByPlan(Plan, function (result) {
                $scope.FabricNameList = result;
                //if (data.BpmId > 0) {
                //    for (g = 0; g < $scope.Details.length; g++) {
                //        debugger;
                //        $scope.Details[g].DressPart = $scope.DressPartList.filter(x => x.DressId == $scope.Details[g].DressPartId)[0];
                //        $scope.Details[g].FabricName = $scope.FabricNameList.filter(x => x.Id == $scope.Details[g].IFID)[0];
                //        $scope.Details[g].Nozzle = child.filter(x => x.BpdId == $scope.Details[g].BpdId);

                //        for (p = 0; p < $scope.Details[g].Nozzle.length; p++) {
                //            $scope.Details[g].Nozzle[p].BarcodeList = barcode.filter(x => x.BpdId == $scope.Details[g].BpdId && x.NozzleNo == $scope.Details[g].Nozzle[p].NozzleNo);
                //            $scope.Details[g].Nozzle[p].TrolleyNo = $scope.TrolleyList.filter(x => x.id == $scope.Details[g].Nozzle[p].TncId)[0];                                
                //        }

                //        $scope.GetDiaInfo(g);
                //    }
                //}
            });      
        })
    }
    $scope.getBarcodeData = function (content,i) {
        debugger;
        $scope.content = content;
        var data = content.split('\r\n');
        $scope.BarcodeFileData = [];
        for (g = 0; g < data.length; g++) {
            if (data[g].length > 5)
                $scope.BarcodeFileData.push({ Barcode: data[g] });
        }
        var planObj = [];
        for (g = 0; g < $scope.Plan.length; g++) {
            planObj.push({ MppmId: $scope.Plan[g].id });
        }
        var model = {
            PlanData: planObj,
            BarcodeData: $scope.BarcodeFileData
        }
        BatchPreparation.GetBarcodeData(model, function (data) {
            debugger;
            if (data.length == 0) return;
            for (g = 0; g < data.length; g++) {
                var isExist = 0;
                for (r = 0; r < $scope.Details[$scope.Index].Nozzle.length; r++) {
                    if ($scope.Details[$scope.Index].Nozzle[r].BarcodeList.length > 0) {
                        var rec = $scope.Details[$scope.Index].Nozzle[r].BarcodeList.filter(x => x.Barcode == data[g].BarcodeId);
                        if (rec.length > 0) {
                            isExist = 1;
                            break;
                        }
                    }
                }
                if (isExist == 0) {
                    if ($scope.Details[$scope.Index].Nozzle[i].BarcodeList.length > 0) {
                        var rec = $scope.Details[$scope.Index].Nozzle[i].BarcodeList.filter(x => x.Barcode == data[g].BarcodeId);
                        if (rec.length == 0) {
                            $scope.Details[$scope.Index].Nozzle[i].BarcodeList.push({
                                SlNo: $scope.Index,
                                NozzleNo: $scope.Details[$scope.Index].Nozzle[i].NozzleNo,
                                Barcode: data[g].BarcodeId,
                                Qty: data[g].BarCodeQty
                            });

                            $scope.Details[$scope.Index].Nozzle[i].Qty = parseFloat((parseFloat($scope.Details[$scope.Index].Nozzle[i].Qty) + parseFloat(data[g].BarCodeQty)).toFixed(2));
                        }
                    } else {
                        $scope.Details[$scope.Index].Nozzle[i].BarcodeList.push({
                            SlNo: $scope.Index,
                            NozzleNo: $scope.Details[$scope.Index].Nozzle[i].NozzleNo,
                            Barcode: data[g].BarcodeId,
                            Qty: data[g].BarCodeQty
                        });

                        $scope.Details[$scope.Index].Nozzle[i].Qty = data[g].BarCodeQty;
                    }
                }
            }
        });
    };

    $scope.GetQtyByBarcode = function (i) {
        var barcode = $scope.Details[$scope.Index].Nozzle[i].Barcode;
        if (barcode == null) return;
        $scope.BarcodeFileData = [];
        $scope.BarcodeFileData.push({ Barcode: barcode });

        var planObj = [];
        for (g = 0; g < $scope.Plan.length; g++) {
            planObj.push({ MppmId: $scope.Plan[g].id });
        }

        var model = {
            PlanData: planObj,
            BarcodeData: $scope.BarcodeFileData
        }
        BatchPreparation.GetBarcodeData(model, function (data) {
            debugger;
            if (data.length == 0) {
                $scope.Details[$scope.Index].Nozzle[i].Barcode = '';
                return;
            }
            var isExist = 0;
            for (r = 0; r < $scope.Details[$scope.Index].Nozzle.length; r++) {
                if ($scope.Details[$scope.Index].Nozzle[r].BarcodeList.length > 0) {
                    var rec = $scope.Details[$scope.Index].Nozzle[r].BarcodeList.filter(x => x.Barcode == barcode);
                    if (rec.length > 0) {
                        isExist = 1;
                        break;
                    }
                }
            }
            if (isExist == 0) {
                if ($scope.Details[$scope.Index].Nozzle[i].BarcodeList.length > 0) {
                    var rec = $scope.Details[$scope.Index].Nozzle[i].BarcodeList.filter(x => x.Barcode == barcode);
                    if (rec.length == 0) {
                        $scope.Details[$scope.Index].Nozzle[i].BarcodeList.push({
                            SlNo: $scope.Index,
                            NozzleNo: $scope.Details[$scope.Index].Nozzle[i].NozzleNo,
                            Barcode: barcode,
                            Qty: data[0].BarCodeQty
                        });

                        $scope.Details[$scope.Index].Nozzle[i].Qty = parseFloat((parseFloat($scope.Details[$scope.Index].Nozzle[i].Qty) + parseFloat(data[0].BarCodeQty)).toFixed(2));
                    }
                } else {
                    $scope.Details[$scope.Index].Nozzle[i].BarcodeList.push({
                        SlNo: $scope.Index,
                        NozzleNo: $scope.Details[$scope.Index].Nozzle[i].NozzleNo,
                        Barcode: barcode,
                        Qty: data[0].BarCodeQty
                    });

                    $scope.Details[$scope.Index].Nozzle[i].Qty = data[0].BarCodeQty;
                }
            }
            else {
                //$rootScope.alert("This Barcode Already Used...");
                $scope.Details[$scope.Index].Nozzle[i].Barcode = '';
            }
        });        
    }

    $scope.BackQty = function (i) {
        debugger;
        var len = $scope.Details[$scope.Index].Nozzle[i].BarcodeList.length;
        if (len > 0) {
            var lastRec = $scope.Details[$scope.Index].Nozzle[i].BarcodeList[len - 1];
            $scope.Details[$scope.Index].Nozzle[i].BarcodeList.splice(-1);
            $scope.Details[$scope.Index].Nozzle[i].Qty = parseFloat(($scope.Details[$scope.Index].Nozzle[i].Qty - lastRec.Qty).toFixed(2));
        }
    }
    $scope.changeIsManual = function (i) {
        $scope.Details[$scope.Index].Nozzle[i].BarcodeList = [];
        $scope.Details[$scope.Index].Nozzle[i].Qty = null;
        $scope.Details[$scope.Index].Nozzle[i].Barcode = null;
    }
    $scope.GetDiaInfo = function (i) {
        debugger;
        var fabId = $scope.Details[i].FabricName.Id;
        //var MppmId = $scope.Plan.MppmId;
        var dressPartId = $scope.Details[i].DressPart.DressId;

        var planObj = [];
        for (g = 0; g < $scope.Plan.length; g++) {
            planObj.push({ MppmId: $scope.Plan[g].id });
        }

        var data = {
            Plan: planObj,
            FabNameId: fabId,
            DressPartId: dressPartId
        }

        BatchPreparation.GetDiaInfoByFabric(data, function (data) {
            $scope.Details[i].FinDia = data.FinishedDiaName;
            $scope.Details[i].McDia = data.MachineDia;
        });
    }

    $scope.EnzStatusList = [
        { Id: '1', Name: 'Yes' },
        { Id: '0', Name: 'No' }
    ];
    var ts = Math.floor(Date.now() / 1000);

    function addRow() {
        var vd = {
            DressPart: [], FabricName: [], Identification: [], NoOfRoll: null, FabricWeight: null, Nozzle: []
        };
        $scope.Details.push(vd);
    }
    function deleteRow(index) {
        if ($scope.Details.length > 1) $scope.Details.splice(index, 1);
    }

    tableInitialState()
    function tableInitialState() {
        $scope.data = [{
            DressPart: [], FabricName: [], Identification: [], NoOfRoll: null, FabricWeight: null, Nozzle: []
        }];
        $scope.Details = angular.copy($scope.data);        
    }   

    function DialogController($scope, $mdDialog) {
        debugger
        if ($scope.CurrentPopup == "Nozzle") {
            $scope.Details[$scope.Index].Nozzle = $scope.Nozzle;
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }

    function addNozzleRow() {
        var vd1 = {
            NozzleNo: $scope.Nozzle.length+1, Qty: null, TrolleyNo: [], BarcodeList: []
        };
        $scope.Nozzle.push(vd1);
    }
    function deleteNozzleRow(index) {
        if ($scope.Nozzle.length > 1) $scope.Nozzle.splice(index, 1);
        for (i = 1; i <= $scope.Nozzle.length; i++) {
            $scope.Nozzle[i-1].NozzleNo = i;
        }
    }

    tableInitialStateNozzle()
    function tableInitialStateNozzle() {
        $scope.data1 = [{
            NozzleNo: [], Qty: null, TrolleyNo: [], BarcodeList: []
        }];
        $scope.Nozzle = angular.copy($scope.data1);        
    }
    
    //Custom Popup
    $scope.DProcessFlow = function (ev) {
        //if ($scope.Details[i].DyeingPFList)
        //    $scope.DyeingPFList = $scope.Details[i].DyeingPFList;
        //else
        //    $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);

        debugger;

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/MPlanDProcessFlow.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    $scope.actionDialog1 = function (action, dataModel) {
        if (action == 'AddNewRow') {
            addRow();
        } else if (action == 'DeleteRow') {
            deleteRow(dataModel);
        } if (action == 'AddRowNozzle') {
            addNozzleRow();
        } else if (action == 'DeleteRowNozzle') {
            deleteNozzleRow(dataModel);
        }
    }

    $scope.actionDialog = function (action, dataModel) {
        debugger;
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    SaveUpdate();
                }
            });
    }

    function objData(action) {
        var obj = [];
        var msg = "";
        if (action == 'Save')
            msg = 'Do you want to save Batch Data?';
        else if (action == 'Update')
            msg = 'Do you want to update Batch Data?';        

        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': msg };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': msg };
        }
        return obj;
    }

    $scope.NozzleSet = function (ev, i) {
        debugger;
        $scope.CurrentPopup = "Nozzle";
        $scope.Index = i;
        if ($scope.Details) {
            if ($scope.Details[i].Nozzle.length>0) {
                $scope.Nozzle = $scope.Details[i].Nozzle;
            }
            else {
                tableInitialStateNozzle();
                $scope.Nozzle[0].NozzleNo = 1;
                for (p = 1; p < $scope.master.NoOfNozzle; p++) {
                    addNozzleRow();
                    $scope.Nozzle[p].NozzleNo = p + 1;
                }
            }
        }

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/NozzleSetPopup.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    function SaveUpdate() {
        debugger;
        $scope.master.UserId = $rootScope.UserId;
        //$scope.master.MppmId = $scope.Plan.MppmId;
        $scope.master.LoadingTime = new Date();
        $scope.master.UnLoadingTime = new Date();

        $scope.master.LoadingTime = moment($scope.master.PLoadingTime).format('HH:mm');
        $scope.master.UnLoadingTime = moment($scope.master.PUnLoadingTime).format('HH:mm');

        var DpfcId = "";
        if ($scope.DyeingPFList) {
            var DProcess = $scope.DyeingPFList.filter(x => x.DPFlow == 1);
            for (i = 0; i < DProcess.length; i++) {
                DpfcId += DProcess[i].id + ',';
            }
            $scope.master.DpfcId = DpfcId.slice(0, -1);
        }

        var details = [], child=[], barcodeList=[];
        for (g = 0; g < $scope.Details.length; g++) {
            var bpdId = 0;
            if ($scope.Details[g].BpdId)
                bpdId = $scope.Details[g].BpdId;

            for (p = 0; p < $scope.Details[g].Nozzle.length; p++) {               
                var bpcId = 0;
                if ($scope.Details[g].Nozzle[p].BpcId)
                    bpcId = $scope.Details[g].Nozzle[p].BpcId;

                child.push({
                    BpcId: bpcId,
                    BpdId: bpdId,
                    SlNo: g,
                    NozzleNo: $scope.Details[g].Nozzle[p].NozzleNo,
                    Qty: $scope.Details[g].Nozzle[p].Qty,
                    TrolleyId: $scope.Details[g].Nozzle[p].TrolleyNo.id
                })

                if ($scope.Details[g].Nozzle[p].BarcodeList) {
                    for (j = 0; j < $scope.Details[g].Nozzle[p].BarcodeList.length; j++) {
                        barcodeList.push({
                            BpcId: bpcId,
                            BpdId: bpdId,
                            SlNo: g,
                            NozzleNo: $scope.Details[g].Nozzle[p].NozzleNo,
                            Barcode: $scope.Details[g].Nozzle[p].BarcodeList[j].Barcode,
                            Qty: $scope.Details[g].Nozzle[p].BarcodeList[j].Qty
                        })
                    }
                }
            }
            
            details.push({
                BpdId: bpdId,
                SlNo:g,
                DressPartId: $scope.Details[g].DressPart.DressId,
                FabricNameId: $scope.Details[g].FabricName.Id,
                FinDia: $scope.Details[g].FinDia,
                McDia: $scope.Details[g].McDia,
                Identification: $scope.Details[g].Identification,
                NoOfRoll: $scope.Details[g].NoOfRoll,
                FabricWeight: $scope.Details[g].FabricWeight,
                Nozzle: $scope.Details[g].Nozzle
            })           
        }

        var planObj = [];
        for (g = 0; g < $scope.Plan.length; g++) {
            planObj.push({ MppmId: $scope.Plan[g].id });
        }

        var obj = {
            master: $scope.master,
            details: details,
            child: child,
            barcode: barcodeList,
            plan: planObj
        }
        BatchPreparation.DyeingBatchPreparation_SaveUpdate(obj, function (data) {
            if (data.ErrorMsg == null) {                          
                $rootScope.alert(data.Msg);                
                Refresh();
                $scope.Plan = null;
                $scope.batchNo = "Batch No# "+data.Data;
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }

    $scope.Refresh = function () {
        Refresh();
        $scope.model = {};
        $scope.Mode = 'N';
    }

    function Refresh() {        
        $scope.master = {};        
        $scope.Details = [];
        $scope.Nozzle = [];

        tableInitialState();
        tableInitialStateNozzle();
        $scope.btnSave = "Save";
        $scope.batchNo = null;
        $scope.Plan = [];       


        debugger;
        $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);
    }

    $scope.Plan = [];
    $scope.PlanData = [];
    $scope.model = {};
    $scope.dropdownSetting = {
        scrollable: true,
        scrollableHeight: '300px',
        enableSearch: true,
        clearSearchOnClose: true,
        buttonClasses: 'btn btn-dropdown',      
        //smartButtonMaxItems: 2,
        styleActive: true,
        showCheckAll: false,
        showUncheckAll: false,
        checkBoxes:false
    }
    $scope.dropdownTextSetting = {
        buttonDefaultText: "Select Plan",
    }


}]);

