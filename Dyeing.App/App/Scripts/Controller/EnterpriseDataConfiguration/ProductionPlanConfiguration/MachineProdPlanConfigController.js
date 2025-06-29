app.controller("MachineProdPlanConfigController", ['$scope', '$rootScope', 'filterFilter', '$mdDialog','MProdPlanConfig', 'FinFabReqConfig', function ($scope, $rootScope, filterFilter, $mdDialog, MProdPlanConfig, FinFabReqConfig) {
    MProdPlanConfig.GetBatchNoAndPlanNo(function (data) {
        debugger;
        $scope.PlanBatchListAll = data;
    });
    MProdPlanConfig.ProdPlanReviseReasonInfo_Get(function (data) { $scope.ReverseReason = data; });
    
    MProdPlanConfig.GetMatchingWithFieldInfo(function (data) { $scope.MatchingInfo = data; });
    MProdPlanConfig.GetBodyPartSetUp_All(function (data) { $scope.BodyPartList = data; });
    MProdPlanConfig.GetPantonType(function (data) { $scope.PantoneTypeList = data; });
    //MProdPlanConfig.GetFabricsInfo(1, 0, 0, 0, 0, function (data) {$scope.FabricInfoListAll = data;});
    MProdPlanConfig.GetColorType(function (data) { $scope.ColorTypeList = data; });
    MProdPlanConfig.GetColorShade(function (data) { $scope.ColorShadeList = data; });
    MProdPlanConfig.GetColorTypeSpec(function (data) { $scope.ColorSpecList = data; });
    MProdPlanConfig.GetAOPBackground(function (data) { $scope.AOPBackground = data; });

    MProdPlanConfig.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];

            MProdPlanConfig.GetMachineNo($scope.Unit.Id, function (data) { $scope.MachineInfo = data; });
        }
    });

    //MProdPlanConfig.GetFabric(function (data) { $scope.FabricNameAll = data; });
    MProdPlanConfig.GetDyeingProcessFlowInfo(function (data) {
        $scope.DyeingPFList = data;
        $scope.DyeingPFList1 = data;
    });
    MProdPlanConfig.GetOFabricOperationData(function (data) {
        $scope.OFabOpList = data;
        $scope.OFabOpList1 = data;        
    });

    FinFabReqConfig.GetAllBuyers(function (data) { $scope.BuyerList = data; });
    FinFabReqConfig.GetColorNameAll(1, 0, 0, 0, 0, function (data) { $scope.ColorListAll = data; });
    FinFabReqConfig.GetGSMAll(1, 0, 0, 0, 0, function (data) { $scope.GSMAll = data; });
    FinFabReqConfig.GetPantoneNoNameAll(1, 0, 0, 0, 0, function (data) { $scope.PantoneList = data; });
        
    $scope.PlanDate = new Date();
    $scope.IsDisabledProdStatus = true;
    $scope.FabGSMDisabled = false;

    var ts = Math.floor(Date.now() / 1000);

    $scope.LoadingType = [
        { Id: 1, Name: 'Manual' },
        { Id: 2, Name: 'Marchandising' },
        { Id: 3, Name: 'Kniting' },
        { Id: 4, Name: 'All' }
    ];
    $scope.EnzStatusList = [
        { Id: '1', Name: 'Yes' },
        { Id: '0', Name: 'No' }       
    ];
    $scope.OrderTypeList = [
        { Id: 'N', Name: 'New' },
        { Id: 'R', Name: 'Re-Process' }
    ];
    function populatePlanBatch() {
        if ($scope.Mode == 'U')
            $scope.PlanBatchList = filterFilter($scope.PlanBatchListAll, { IsHalt: true }, true);
        else
            $scope.PlanBatchList = filterFilter($scope.PlanBatchListAll, { IsHalt: false }, true);
        $scope.apply;
    }
    $scope.changeMode = function () {
        RefreshForm();
        $scope.PlanNo = null;
        $scope.BatchNo = null;
        debugger;        
        populatePlanBatch();

        if ($scope.Mode == "N")
            $scope.btnSave = "Save";
        else $scope.btnSave = "Update";

        tableInitialState();
    }

    $scope.UnitChange = function () {
        MProdPlanConfig.GetMachineNo($scope.Unit.Id, function (data) { $scope.MachineInfo = data; });
    }
      
    function getDyeingMasterData(i) {
        debugger;
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var jobId = $scope.Details[i].Job.Id;
        var styleId = $scope.Details[i].Style.Id;
        var orderId = $scope.Details[i].Order.Id;
        if (buyerId == null || jobId == null || styleId == null || orderId == null) return;

        MProdPlanConfig.GetMasterDataPlan(buyerId, jobId, styleId, orderId, function (result) {
            debugger;
            var data = result[0];
            if (data) {
                $scope.Details[i].LDNo = data.LDNo;
                $scope.Details[i].Color = data.ColorName;
                $scope.Details[i].FabricName = $scope.FabricNameAll.filter(elem => elem.IFID == data.IFID)[0];
                //$scope.Details[i].FabricName = data.IFID;
                $scope.Details[i].FabricQty = data.OrderQty;
                $scope.Details[i].EnzStatus = data.Enzyme;

                //$scope.DyeingPFList = angular.copy($scope.DyeingPFList1);
                //if (data.DpfcId) {
                //    var dpfc = data.DpfcId.split(",");
                //    for (d = 0; d < dpfc.length; d++) {
                //        var rowIndex = $scope.DyeingPFList.findIndex(x => x.DpfcId == parseInt(dpfc[d]));
                //        if (rowIndex >= 0) {
                //            $scope.DyeingPFList[rowIndex].DPFlow = true;
                //        }
                //    }
                //}
                $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);
                
                if (data.DpfcId) {
                    var ArrDProcess = data.DpfcId.split(',');
                    for (d = 0; d < ArrDProcess.length; d++) {
                        var v = parseInt(ArrDProcess[d]);
                        var e = $scope.DyeingPFList.findIndex(x => x.id == v);
                        if (e >= 0) {
                            $scope.DyeingPFList[e].DPFlow = true;
                        }
                    }
                }
                $scope.Details[i].DyeingPFList = $scope.DyeingPFList;

                $scope.OFabOpList = angular.copy($scope.OFabOpList1);

                if (data.OFabOpNo) {
                    var FabricsOperationNo = data.OFabOpNo.split(',');
                    for (r = 0; r < FabricsOperationNo.length; r++) {
                        var v = parseInt(FabricsOperationNo[r]);
                        var e = $scope.OFabOpList.findIndex(x => x.id == v);
                        if (e >= 0) {
                            $scope.OFabOpList[e].FabOp = true;
                        }
                    }
                }
                $scope.Details[i].OFabOpList = $scope.OFabOpList;
                //$scope.OFabOpList = OFabOperation;//[{ id: 6 }, { id: 7 }]
                $scope.ddl = {};
                $scope.Details[i].Color = $scope.ColorListAll.filter(elem => elem.id == data.ColorId)[0];
                $scope.ddl.bodyPart = $scope.BodyPartList.filter(elem => elem.BodyPartID == data.BodyPartId)[0];
                $scope.ddl.ColorType = $scope.ColorTypeList.filter(elem => elem.ColorTypeID == data.ColorTypeId)[0];
                $scope.ddl.ColorShade = $scope.ColorShadeList.filter(elem => elem.ColorShadeNo == data.ColorShadeId)[0];
                $scope.ddl.colorSpec = $scope.ColorSpecList.filter(elem => elem.Id == data.ColorSpecId)[0];

                debugger;

                var Pantone = $scope.PantoneList.filter(elem => elem.id == data.PantoneId)[0];
                if (Pantone != null) {
                    $scope.ddl.PantonNo = Pantone.name;
                    //$scope.PantoneTypeList = filterFilter($scope.PantoneList, { name: Pantone.name }, true);
                    $scope.ddl.PantonType = Pantone.name1;

                    $scope.digest;
                    $scope.apply;
                }

                $scope.ddl.AOPBg = $scope.AOPBackground.filter(elem => elem.Id == data.AopBackNo)[0];
                $scope.Details[i].ddl = $scope.ddl;
                
                $scope.Details[i].Remarks = data.Remarks;
            }
        });
    }

    function getFabricByJob(i, IFID) {
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var jobId = $scope.Details[i].Job.Id;
        var orderId = $scope.Details[i].Order.Id;
        if (orderId == null) return;
        MProdPlanConfig.GetFabricByBuyerJob(buyerId, jobId, orderId, function (data) {
            $scope.FabricNameAll = data;
            if (IFID > 0)
                $scope.Details[i].FabricName = $scope.FabricNameAll.filter(elem => elem.IFID == IFID)[0];
            if ($scope.Mode == 'N') {
                getDyeingMasterData(i);
            }            
        });
    }

    $scope.getPlanInfoByPlan = function () {
        $scope.BatchNo = $scope.PlanNo.BatchNo;
        if ($scope.Mode == "R" || $scope.Mode == "H" || $scope.Mode == "U") {            
            GetMachineProdPlanInfo($scope.PlanNo.MppmId);
        } 
    }

    $scope.getPlanInfoByBatch = function () {
        $scope.PlanNo = $scope.BatchNo.PlanNo;
        if ($scope.Mode == "R" || $scope.Mode == "H" || $scope.Mode == "U") {            
            GetMachineProdPlanInfo($scope.BatchNo.MppmId);
        }
    }

    $scope.setPType = function () {
        //$scope.PantoneTypeList = filterFilter($scope.PantoneList, { name: $scope.ddl.PantonNo.name }, true);

        $scope.ddl.PantonType = $scope.ddl.PantonNo.name1;

    }

    $scope.SetCapacity = function (i) {        
        $scope.Plan[i].Capacity = $scope.Plan[i].Machine.CapacityName;
    }

    $scope.loadDataByLoadingType = function (i) {        
    }

    $scope.getDataByBuyer = function (i) {
        
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        if (buyerId == null) return;             

        MProdPlanConfig.GetDropDataByBuyerId(buyerId,'0', 'A', function (data) {
            //$scope.ddlJobStyleOrder = data;
            $scope.JobList = data.m_Item1; //$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Job');
            $scope.StyleList = data.m_Item2;//$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Style');
            $scope.OrderList = data.m_Item3;//$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Order');
        });        
    }
    
    $scope.getDataByJob = function (i) {
        debugger
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var jobNo = $scope.Details[i].Job.Id;       
       
        $scope.Details[i].ProdStatus = null;
        $scope.Details[i].ShipDate = null;

        if (jobNo == null || buyerId == null) return;

        MProdPlanConfig.GetDropDataByBuyerId(buyerId, jobNo, 'J', function (data) {            
            $scope.StyleList = data.m_Item2;//$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Style');
            $scope.OrderList = data.m_Item3;//$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Order');
        });
    }
    $scope.getDataByStyle = function (i) {
        debugger;
       // var JobStyleOrder = $scope.ddlJobStyleOrder;
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        //var jobNo = $scope.Details[i].Job.Id;
        var styleId = $scope.Details[i].Style.Id;

        if (buyerId == null || styleId == null) return;

        MProdPlanConfig.GetDropDataByBuyerId(buyerId, styleId, 'S', function (data) {          
            $scope.OrderList = data.m_Item3;//$scope.ddlJobStyleOrder.filter(elem => elem.Info == 'Order');
            if ($scope.OrderList.length == 1) {
                $scope.Details[i].Order = $scope.OrderList[0];
                $scope.Details[i].Job = data.m_Item1[0];

                var ProdStatus = $scope.Details[i].Order.ProdStatus;
                ProdStatus = ProdStatus == "1" ? "Bulk" : "Sample";

                $scope.Details[i].ProdStatus = ProdStatus;
                $scope.Details[i].ShipDate = $scope.Details[i].Order.ShipmentDate;
                if ($scope.Details[i].ProdStatus == null || $scope.Details[i].ProdStatus == "") {
                    $scope.IsDisabledProdStatus = false;
                }
                else {
                    $scope.IsDisabledProdStatus = true;
                }
                getFabricByJob(i,0);
            }
        });
       
    }

    $scope.getDataByOrder = function (i) {        

        debugger
        var buyerId = $scope.Details[i].Buyer.BuyerId;        
        var orderId = $scope.Details[i].Order.Id;

      
        if (buyerId == null || orderId == null) return;

        MProdPlanConfig.GetDropDataByBuyerId(buyerId, orderId, 'O', function (data) {
            //$scope.JobList = data.m_Item1;
            $scope.StyleList = data.m_Item2;
            if ($scope.StyleList.length == 1) {
                $scope.Details[i].Style = $scope.StyleList[0];
                $scope.Details[i].Job = data.m_Item1[0];

                var ProdStatus = $scope.Details[i].Style.ProdStatus;
                ProdStatus = ProdStatus == "1" ? "Bulk" : "Sample";

                $scope.Details[i].ProdStatus = ProdStatus;
                $scope.Details[i].ShipDate = $scope.Details[i].Style.ShipmentDate;
                if ($scope.Details[i].ProdStatus == null || $scope.Details[i].ProdStatus == "") {
                    $scope.IsDisabledProdStatus = false;
                }
                else {
                    $scope.IsDisabledProdStatus = true;
                }
                getFabricByJob(i,0);
            }
        });
       
    }

    $scope.EStatusChange = function (i) {
        $scope.Details[i].Enzyme = '';
    }

    function addRow() {
        var vd = {
            BodyPart: [], FabName: [], GSM: [], YarnComposition: [], Color: [], ColorCode: [], PantoneNo: [], FinFabReq: 0, Consumption: 0, GrFabMF: 0
        };
        $scope.Details.push(vd);
    }
    function deleteRow(index) {
        if ($scope.Details.length > 1) $scope.Details.splice(index, 1);
    }

    tableInitialState()
    function tableInitialState() {
        $scope.data = [{
            BodyPart: [], FabName: [], GSM: [], YarnComposition: [], Color: [], ColorCode: [], PantoneNo: [], FinFabReq: 0, Consumption: 0, GrFabMF: 0
        }
        ];
        $scope.Details = angular.copy($scope.data);
        //$scope.btnSave = "Save";
    }

    function addPlanRow() {
        var vd = {
            Machine: [], Capacity: [], PlanQty: [], NoOfBatch: [], PlanDate:[]
        };
        $scope.Plan.push(vd);
    }
    function deletePlanRow(index) {
        if ($scope.Plan.length > 1) $scope.Plan.splice(index, 1);
    }

    tableInitialStatePlan()
    function tableInitialStatePlan() {
        $scope.data = [{
            Machine: [], Capacity: [], PlanQty: [], NoOfBatch: [], PlanDate: []
        }
        ];
        $scope.Plan = angular.copy($scope.data);
        $scope.Plan1 = angular.copy($scope.data);
    }

    $scope.actionDialog1 = function (action, dataModel) {
        if (action == 'AddNewRow') {
            addRow();
        } else if (action == 'DeleteRow') {
            deleteRow(dataModel);
        } else {
            $mdDialog.show(
                $mdDialog.dialogBox({
                    locals: {
                        model: objData(action)
                    }
                })).then(function (mode) {
                    if (mode == 'Update' || mode == 'Save') {
                        SaveUpdate();
                    } else if (mode == 'Delete') {
                        Delete(dataModel);
                    }
                });
        }

    }
    $scope.actionDialog2 = function (action, dataModel) {
        if (action == 'AddNewRow') {
            addPlanRow();
        } else if (action == 'DeleteRow') {
            deletePlanRow(dataModel);
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
        if ($scope.Mode == 'N')
            msg = 'Do you want to save Machine Production Plan Data?';
        else if ($scope.Mode == 'R')
            msg = 'Do you want to Revise this Production Plan Data?';
        else if ($scope.Mode == 'H')
            msg = 'Do you want to Halt this Production Plan?';
        else if ($scope.Mode == 'U')
            msg = msg = 'Do you want to Unhalt this Production Plan?';

        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': msg };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': msg };
        }
        return obj;
    }
    function SaveUpdate() {
        debugger;       

        var details = [];
        for (g = 0; g < $scope.Details.length; g++) {
            var model = {};

            if ($scope.Mode != 'N')
                model.PlanNo = $scope.PlanNo.PlanNo;

            //model.BulkSample = $scope.BulkSample;
            model.UnitId = $scope.Unit.Id;
            model.BuyerId = $scope.Details[g].Buyer.BuyerId;
            model.JobId = $scope.Details[g].Job.Id;
            model.StyleId = $scope.Details[g].Style.Id;
            model.OrderId = $scope.Details[g].Order.Id;
            model.ProdStatus = $scope.Details[g].ProdStatus;
            model.ShipDate = moment($scope.Details[g].ShipDate).format('DD-MMM-YYYY');
            model.IFID = $scope.Details[g].FabricName.IFID;
            model.ColorId = $scope.Details[g].Color.id;
            model.LDNo = $scope.Details[g].LDNo;
            model.RNNo = $scope.Details[g].RNNo;           

            model.UserId = $rootScope.UserId;
            model.Mode = $scope.Mode;
            model.MppmId = $scope.Details[g].MppmId;

            if ($scope.Mode == 'N') {
                model.MppmId = 0;
                model.PprrId = 0;
                model.PlanReasonName = "";
            }
            else if ($scope.Mode == 'R') {                
                if ($scope.ddl.RevReason.PprrId == null) {
                    model.PprrId = 0
                    model.PlanReasonName = $scope.ddl.RevReason;
                }
                else {
                    model.PprrId = $scope.ddl.RevReason.PprrId;
                    model.PlanReasonName = $scope.ddl.RevReason.PlanReasonName;
                }
            }
            model.DpfcId = "";
            if ($scope.Details[g].DyeingPFList) {
                var DProcess = $scope.Details[g].DyeingPFList.filter(x => x.DPFlow == 1);                
                for (i = 0; i < DProcess.length; i++) {
                    model.DpfcId += DProcess[i].id + ',';
                }
                model.DpfcId = model.DpfcId.slice(0, -1);
            }

            model.FabricsOperationNo = "";
            if ($scope.Details[g].OFabOpList) {
                var FabricsOperationNo = $scope.Details[g].OFabOpList.filter(x => x.FabOp == 1);                
                for (i = 0; i < FabricsOperationNo.length; i++) {
                    model.FabricsOperationNo += FabricsOperationNo[i].id + ',';
                }
                model.FabricsOperationNo = model.FabricsOperationNo.slice(0, -1);
            }

            model.FabricQty = $scope.Details[g].FabricQty;
            model.OrderType = $scope.Details[g].OrderType;
            model.MfcId = $scope.Details[g].MfcId;
            model.Enzyme = $scope.Details[g].Enzyme;
            model.Remarks = $scope.Details[g].Remarks;

            if ($scope.Details[g].ddl) {
                if ($scope.Details[g].ddl.bodyPart)
                    model.BodyPartId = $scope.Details[g].ddl.bodyPart.BodyPartID;
                if ($scope.Details[g].ddl.ColorType)
                    model.ColorTypeId = $scope.Details[g].ddl.ColorType.ColorTypeID;
                if ($scope.Details[g].ddl.ColorShade)
                    model.ColorShadeId = $scope.Details[g].ddl.ColorShade.ColorShadeNo;
                if ($scope.Details[g].ddl.colorSpec)
                    model.ColorSpecId = $scope.Details[g].ddl.colorSpec.Id;

                if ($scope.Details[g].ddl.PantonNo) {
                    model.PantoneId = $scope.Details[g].ddl.PantonNo.id;
                    model.PantonType = $scope.Details[g].ddl.PantonType;
                }
                if ($scope.Details[g].ddl.AOPBg)
                    model.AopBackNo = $scope.Details[g].ddl.AOPBg.Id;
            }           
            var plan_model = model;
            for (p = 0; p < $scope.Details[g].Plan.length; p++) {
                var plan = {};
                plan = angular.copy(plan_model);
                plan.MDId = $scope.Details[g].Plan[p].Machine.MDId;
                plan.PlanQty = $scope.Details[g].Plan[p].PlanQty;
                plan.NoOfBatch = $scope.Details[g].Plan[p].NoOfBatch;
                plan.PlanDate = $scope.Details[g].Plan[p].PlanDate;
                if (plan.NoOfBatch.length == 0)
                    plan.NoOfBatch = 0;
                
                details.push(plan);
            }            
        }          

        MProdPlanConfig.MachineProdPlan_SaveUpdate(details, function (data) {
            if (data.ErrorMsg == null) {
                RefreshForm();
                if ($scope.Mode == 'N' || $scope.Mode == 'R') {
                    $scope.PlanNo = data.PlanNo;
                    $scope.BatchNo = data.BatchNo;
                }
                MProdPlanConfig.GetBatchNoAndPlanNo(function (data) { $scope.PlanBatchListAll = data; });
                //populatePlanBatch();            
                
                $rootScope.alert(data.Msg);
                tableInitialState();                
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function GetMachineProdPlanInfo(MppmId) {
        MProdPlanConfig.GetMachineProdPlanInfo(MppmId, function (data) {
            $scope.Details = [];
            $scope.Plan = [];
            $scope.Details.push(data[0]);
            var plan = data[0];
            $scope.ddl = plan;
            var model = {
                Machine: $scope.MachineInfo.filter(elem => elem.MDId == plan.MDId)[0],
                Capacity: plan.CapacityName,
                PlanQty: plan.PlanQty,
                NoOfBatch: plan.NoOfBatch,
                PlanDate: plan.PlanDate
            }
            $scope.Plan.push(model);
            $scope.Details[0].Plan = $scope.Plan;
            $scope.Details[0].MppmId = plan.MppmId;

            //$scope.Capacity = data.CapacityName;

            if ($scope.Mode != 'N')
                $scope.ddl.RevReason = $scope.ReverseReason.filter(elem => elem.PprrId == $scope.ddl.PprrId)[0];

            $scope.Details[0].Buyer = $scope.BuyerList.filter(elem => elem.BuyerId == plan.BuyerId)[0];

            MProdPlanConfig.GetDropDataByBuyerId($scope.ddl.BuyerId, '0', 'A', function (data) {
                $scope.JobList = data.m_Item1;
                $scope.StyleList = data.m_Item2;
                $scope.OrderList = data.m_Item3;

                $scope.Details[0].Job = data.m_Item1.filter(elem => elem.Id == plan.JobId)[0];
                $scope.Details[0].Style = data.m_Item2.filter(elem => elem.Id == plan.StyleId)[0];
                $scope.Details[0].Order = data.m_Item3.filter(elem => elem.Id == plan.OrderId)[0];

                getFabricByJob(0, plan.IFID);                
            });
            
            $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);

            var DProcess = [], OFabOperation = [];
            if (plan.DpfcId) {
                var ArrDProcess = plan.DpfcId.split(',');
                for (i = 0; i < ArrDProcess.length; i++) {
                    var v = parseInt(ArrDProcess[i]);
                    var e = $scope.DyeingPFList.findIndex(x => x.id == v);
                    if (e >= 0) {
                        $scope.DyeingPFList[e].DPFlow = true;
                    }                    
                }
            }
            $scope.Details[0].DyeingPFList = $scope.DyeingPFList;
            
            $scope.OFabOpList = angular.copy($scope.OFabOpList1);
            
            if (plan.FabricsOperationNo) {
                var FabricsOperationNo = plan.FabricsOperationNo.split(',');
                for (i = 0; i < FabricsOperationNo.length; i++) {
                    var v = parseInt(FabricsOperationNo[i]);
                    var e = $scope.OFabOpList.findIndex(x => x.id == v);
                    if (e >= 0) {
                        $scope.OFabOpList[e].FabOp = true;
                    }
                }
            }
            $scope.Details[0].OFabOpList = $scope.OFabOpList;
            //$scope.OFabOpList = OFabOperation;//[{ id: 6 }, { id: 7 }]

            $scope.Details[0].Color = $scope.ColorListAll.filter(elem => elem.id == $scope.ddl.ColorId)[0];
            $scope.ddl.bodyPart = $scope.BodyPartList.filter(elem => elem.BodyPartID == plan.BodyPartId)[0];
            $scope.ddl.ColorType = $scope.ColorTypeList.filter(elem => elem.ColorTypeID == plan.ColorTypeId)[0];
            $scope.ddl.ColorShade = $scope.ColorShadeList.filter(elem => elem.ColorShadeNo == plan.ColorShadeId)[0];
            $scope.ddl.colorSpec = $scope.ColorSpecList.filter(elem => elem.Id == plan.ColorSpecId)[0];

            debugger;
            $scope.ddl.AOPBg = $scope.AOPBackground.filter(elem => elem.Id == $scope.ddl.AOPBachGround)[0];
            $scope.Details[0].ddl = $scope.ddl;

            var Pantone = $scope.PantoneList.filter(elem => elem.id == plan.PantoneId)[0];
            if (Pantone != null) {
                $scope.ddl.PantonNo = Pantone.name;
                //$scope.PantoneTypeList = filterFilter($scope.PantoneList, { name: Pantone.name }, true);
                $scope.ddl.PantonType = Pantone.name1;

                //$scope.digest;
                //$scope.apply;                
            }

                  
        });
    }    
    
    function RefreshForm() {
        $scope.Details = [];
        $scope.ddl = null; 
        $scope.PlanNo = null;
        $scope.BatchNo = null;
        $scope.Plan = [];

        $scope.DProcess = [];
        $scope.OFabOperation = [];
        $scope.btnSave = "Save";
        $scope.PlanDate = new Date();
    }
    $scope.Refresh = function () {
        RefreshForm();        
        $scope.Mode = 'N';
        tableInitialState();
    }

    $scope.FabOperationPopup = function (ev, i) {
        $scope.Index = i;
        $scope.CurrentPopup = "FabOperationPopup";
        if ($scope.Details[i].OFabOpList)
            $scope.OFabOpList = $scope.Details[i].OFabOpList;
        else
            $scope.OFabOpList = angular.copy($scope.OFabOpList1);

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/FabOperationDialog.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    //Custom Popup
    $scope.DProcessFlow = function (ev, i) {
        $scope.Index = i;
        $scope.CurrentPopup = "DProcessFlow";
        if ($scope.Details[i].DyeingPFList)
            $scope.DyeingPFList = $scope.Details[i].DyeingPFList;
        else
            $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);

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
     
    //Custom Popup
    $scope.OtherOpPopup = function (ev, i) {
        $scope.Index = i;
        $scope.CurrentPopup = "OtherOpPopup";
        if ($scope.Details[i].ddl)
            $scope.ddl = $scope.Details[i].ddl;
        else
            $scope.ddl = {};

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/MPlanOthersOpDialog.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,           
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })       
    };

    //Custom Popup
    $scope.PlanQtyPopup = function (ev, i) {
        $scope.Index = i;
        $scope.CurrentPopup = "PlanQtyPopup";
        if ($scope.Details[i].Plan)
            $scope.Plan = $scope.Details[i].Plan;
        else
            $scope.Plan = angular.copy($scope.Plan1);

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/PlanQtyDialog.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };    

    function DialogController($scope, $mdDialog) {
        $scope.data = [{
            MHeadID: null, MovementDate: null, FromPlace: null,
            TimeFrom: null, ToPlace: null, TimeTo: null,
            TotalDistance: null, chkMovement: false
        }]; 

        if ($scope.CurrentPopup == "DProcessFlow") {
            $scope.Details[$scope.Index].DyeingPFList = $scope.DyeingPFList;
        }
        else if ($scope.CurrentPopup == "FabOperationPopup") {
            $scope.Details[$scope.Index].OFabOpList = $scope.OFabOpList;
        }
        else if ($scope.CurrentPopup == "OtherOpPopup") {
            $scope.Details[$scope.Index].ddl = $scope.ddl;
        }
        else if ($scope.CurrentPopup == "PlanQtyPopup") {
            $scope.Details[$scope.Index].Plan = $scope.Plan;
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }   
    
    $scope.DProcess = [];
    $scope.OFabOperation = [];
   
    $scope.setting1 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };

    $scope.setting2 = {
        scrollableHeight: '250px',
        width: '200px',
        scrollable: true,
        enableSearch: true
    };

}]);