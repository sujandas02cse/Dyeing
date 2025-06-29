app.controller("MasterDataConfigController", ['$scope', '$rootScope', 'filterFilter', '$mdDialog', 'MasterDataConfig', 'FinFabReqConfig', function ($scope, $rootScope, filterFilter, $mdDialog, MasterDataConfig, FinFabReqConfig) {
    MasterDataConfig.GetBodyPartSetUp_All(function (data) { $scope.BodyPartList = data; });
    MasterDataConfig.GetFabricType(function (data) { $scope.FabTypeList = data; });
    MasterDataConfig.GetColorType(function (data) { $scope.ColorTypeList = data; });
    MasterDataConfig.GetColorShade(function (data) { $scope.ColorShadeList = data; });
    MasterDataConfig.GetColorTypeSpec(function (data) { $scope.ColorSpecList = data; });
    MasterDataConfig.GetAOPBackground(function (data) { $scope.AOPBackground = data; });
    MasterDataConfig.GetBorrowingParty(function (data) { $scope.BorrowerPartyList = data; });
    MasterDataConfig.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });
    MasterDataConfig.GetPantonType(function (data) { $scope.PantoneTypeList = data; });

    FinFabReqConfig.GetAllBuyers(function (data) { $scope.BuyerList = data;});
    FinFabReqConfig.GetPantoneNoNameAll(1, 0, 0, 0, 0, function (data) { $scope.PantoneList = data; });
    FinFabReqConfig.GetColorNameAll(1, 0, 0, 0, 0, function (data) { $scope.ColorListAll = data; });
    $scope.Mode = "N";
    $scope.PlanDate = new Date();
    $scope.IsDisabledProdStatus = true;
    $scope.FabGSMDisabled = false;
    GetGSMData();
    GetYarnHead();

    var ts = Math.floor(Date.now() / 1000);

    $scope.JobList = [];
    $scope.StyleList = [];
    $scope.OrderList = [];
    $scope.FabricNameAll = [];

    //$scope.PantoneTypeList = [{ "Id": 0, "name": "NONE" }, { "Id": 1, "name": "TCX" }, {"Id":2, "name":"TPX"}]

    MasterDataConfig.GetDyeingProcessFlowInfo(function (data) {
        $scope.DyeingPFList = data;
        $scope.DyeingPFList1 = data;
    });
    MasterDataConfig.GetOFabricOperationData(function (data) {
        $scope.OFabOpList = data;
        $scope.OFabOpList1 = data;
    });
      
    $scope.changeMode = function () {
        RefreshForm();
       
        if ($scope.Mode == "N") {
            $scope.btnSave = "Save";
        }
        else {
            $scope.btnSave = "Update";
        }

        tableInitialState();
    }

    $scope.OuterFactory=[];
    $scope.InhouseFac=[];

    $scope.changeDFac = function (i) {
        $scope.Details[i].InhouseFac = '';
        $scope.Details[i].OuterFactory = '';

        if ($scope.Details[i].DyeingFactory == "Outer") {          
            $scope.OuterFactory[i] = true;
            $scope.InhouseFac[i] = false;
        } else if ($scope.Details[i].DyeingFactory == "Inhouse") {           
            $scope.OuterFactory[i] = false;
            $scope.InhouseFac[i] = true;

            $scope.Details[i].InhouseFac = $scope.Unit;
        }        
    }

    $scope.setPType = function () {
        //$scope.PantoneTypeList = filterFilter($scope.PantoneList, { name: $scope.ddl.PantonNo.name }, true);
        $scope.ddl.PantonType = $scope.ddl.PantonNo.name1;
    }
    
    $scope.getDataByBuyer = function (i) {
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        if (buyerId == null) return;

        MasterDataConfig.GetBuyerJobOrderForMasterData(buyerId, '0', 'A', $scope.Mode, function (data) {
            $scope.JobList[i] = data.m_Item1; 
            $scope.StyleList[i] = data.m_Item2;
            $scope.OrderList[i] = data.m_Item3;
        });
    }
    $scope.getDiaInfoByFabric = function (i) {
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var jobId = $scope.Details[i].JobId;

        var fabNameId = null;
        if ($scope.Details[i].FabricName)
            fabNameId = $scope.Details[i].FabricName.IFID;

        if (buyerId == null || jobId == null || fabNameId==null) return;

        MasterDataConfig.GetDiaInfoByFabric(buyerId, jobId, fabNameId, function (data) {
            $scope.Details[i].FinishDia = data[0].FinishedDiaName;
        });
    }

    function GetGSMData() {        
        MasterDataConfig.GetGSMData(function (data) {
            $scope.GSMList = data;          
        });
    }
    function GetYarnHead() {
        MasterDataConfig.GetYarnHead(function (data) {
            $scope.YarnHList = data;
        });
    }
    $scope.getCompositionByHead = function () {
        var i = $scope.Index;
        var IHID = $scope.newFab.YarnHead.id;
        MasterDataConfig.GetComposition(IHID,function (data) {
            $scope.CompositionList = data;
        });
    }

    $scope.addNewFabric = function () {
        if ($scope.newFab.Composition.name) {
            if ($scope.newFab.NewFabric == undefined)
                $scope.newFab.NewFabric = $scope.newFab.Composition.name;
            else
                $scope.newFab.NewFabric = $scope.newFab.NewFabric + " + " + $scope.newFab.Composition.name;

            $scope.newFab.Composition = '';
        }
    }
    $scope.genNewFabric = function () {
        var i = $scope.Index;
        if ($scope.Details[i].OrderId == null || $scope.newFab.FabType.id == null || $scope.newFab.NewFabric == null || $scope.newFab.GSM.name==null)
            return;
        var model = {
            ItemIdEdit: 0,
            item: $scope.newFab.NewFabric,
            userId: $rootScope.UserId,
            mode: $scope.Mode,
            IFID: $scope.newFab.FabType.id,
            ItemDes: $scope.newFab.FabType.name+'(' + $scope.newFab.NewFabric + ')-' + $scope.newFab.GSM.name,
            ItemID: 0,
            BuyerId: $scope.Details[i].Buyer.BuyerId,
            JobId: $scope.Details[i].JobId
        }
        MasterDataConfig.GenNewFabric(model, function (data) {            
            getFabricByJob(i, 0);
            $scope.hide();
        });
    }

    $scope.getDataByJob = function (i) {

        var jobNo = "";
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        jobNo = $scope.Details[i].JobId;

        $scope.Details[i].ProdStatus = null;
        $scope.Details[i].ShipDate = null;       

        MasterDataConfig.GetBuyerJobOrderForMasterData(buyerId, jobNo, 'J', $scope.Mode, function (data) {
            $scope.StyleList[i] = data.m_Item2;
            $scope.OrderList[i] = data.m_Item3;
        });
    }
    $scope.getDataByStyle = function (i) {
        var buyerId = $scope.Details[i].Buyer.BuyerId;        
        var styleId = $scope.Details[i].StyleId;
        if (buyerId == null || styleId == null) return;

        MasterDataConfig.GetBuyerJobOrderForMasterData(buyerId, styleId, 'S', $scope.Mode, function (data) {
            $scope.OrderList[i] = data.m_Item3;
            if ($scope.Details[i].JobId == null) {
                $scope.JobList[i] = data.m_Item1;
                if (data.m_Item1.length == 1)
                    $scope.Details[i].JobId = data.m_Item1[0].Id;
            }
            if ($scope.OrderList[i].length == 1) {
                $scope.Details[i].OrderId = $scope.OrderList[i][0].Id;               

                var ProdStatus = $scope.OrderList[i][0].ProdStatus;
                ProdStatus = ProdStatus == "1" ? "Bulk" : "Sample";

                $scope.Details[i].ProdStatus = ProdStatus;
                $scope.Details[i].ShipDate = $scope.OrderList[i][0].ShipmentDate;
                if ($scope.Details[i].ProdStatus == null || $scope.Details[i].ProdStatus == "") {
                    $scope.IsDisabledProdStatus = false;
                }
                else {
                    $scope.IsDisabledProdStatus = true;
                }                             
            }            
            getFabricByJob(i, 0);
        });
    }

    $scope.getDataByOrder = function (i) {
        
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var orderId = $scope.Details[i].OrderId;

        if (buyerId == null || orderId == null) return;

        MasterDataConfig.GetBuyerJobOrderForMasterData(buyerId, orderId, 'O', $scope.Mode, function (data) {
            $scope.StyleList[i] = data.m_Item2;
            if ($scope.Details[i].JobId == null) {
                $scope.JobList[i] = data.m_Item1;
                if (data.m_Item1.length == 1)
                    $scope.Details[i].JobId = data.m_Item1[0].Id;
            }
            if ($scope.StyleList[i].length == 1) {
                $scope.Details[i].StyleId = $scope.StyleList[i][0].Id;                

                var ProdStatus = $scope.StyleList[i][0].ProdStatus;
                ProdStatus = ProdStatus == "1" ? "Bulk" : "Sample";

                $scope.Details[i].ProdStatus = ProdStatus;
                $scope.Details[i].ShipDate = $scope.StyleList[i][0].ShipmentDate;
                if ($scope.Details[i].ProdStatus == null || $scope.Details[i].ProdStatus == "") {
                    $scope.IsDisabledProdStatus = false;
                }
                else {
                    $scope.IsDisabledProdStatus = true;
                }                
            }            
            //getMasterData();
            getFabricByJob(i, 0);
        });
    }
    function getFabricByJob(i, IFID) {
        var buyerId = $scope.Details[i].Buyer.BuyerId;
        var jobId = $scope.Details[i].JobId;
        var orderId = $scope.Details[i].OrderId;
        if (jobId == null || orderId ==null) return;
        MasterDataConfig.GetFabricByBuyerJob(buyerId, jobId, orderId, function (data) {
            $scope.FabricNameAll[i] = data;
            if (IFID > 0)
                $scope.Details[0].FabricName = $scope.FabricNameAll[i].filter(elem => elem.IFID == IFID)[0];
            if ($scope.Mode == "R") {
                getMasterData();
            }
        });
    }

    function getMasterData() {        
        var buyerId = $scope.Details[0].Buyer.BuyerId; 
        var jobId = $scope.Details[0].JobId;
        var styleId = $scope.Details[0].StyleId;
        var orderId = $scope.Details[0].OrderId;
        if (jobId == null || styleId == null || orderId == null) return;
        MasterDataConfig.GetDyeingMasterData(buyerId, jobId, styleId, orderId, function (result) {
            var data = result[0];
            if (data == null) {
                //$scope.Details[0] = {};
                return;
            }
            //$scope.Details[0] = data;
            $scope.Unit = $scope.UnitList.filter(x => x.Id == data.UnitId)[0];
            $scope.Details[0].MDataId = data.MDataId;
            $scope.Details[0].Buyer = $scope.BuyerList.filter(x => x.BuyerId == data.BuyerId)[0];
            $scope.Details[0].JobId = $scope.JobList[0].filter(x => x.Id == data.JobId)[0].Id;
            $scope.Details[0].StyleId = $scope.StyleList[0].filter(x => x.Id == data.StyleId)[0].Id;
            $scope.Details[0].OrderId = $scope.OrderList[0].filter(x => x.Id == data.OrderId)[0].Id;
            $scope.Details[0].FabricName = $scope.FabricNameAll[0].filter(x => x.IFID == data.IFID)[0];
            $scope.Details[0].Color = $scope.ColorListAll.filter(x => x.id == data.ColorId)[0];
            $scope.Details[0].DiaPart = data.DiaId;
            $scope.Details[0].ShipDate = data.ShipDate;
            $scope.Details[0].BookingDate = data.BookingDate;
            $scope.Details[0].FinishDia = data.FinishDia;
            $scope.Details[0].LDNo = data.LDNo;
            $scope.Details[0].OrderQty = data.OrderQty;
            $scope.Details[0].RGreigeQty = data.RGreigeQty;
            $scope.Details[0].TDelvDate = data.TDelvDate;
            $scope.Details[0].FGReqDate = data.FGReqDate;
            $scope.Details[0].DyeingEndDate = data.DyeingEndDate;
            $scope.Details[0].Enzyme = data.Enzyme;
            $scope.Details[0].DyeingFactory = data.DyeingFactory;
            $scope.Details[0].OrderStatus = data.OrderStatus;
            $scope.Details[0].Remarks = data.Remarks;

            $scope.changeDFac(0);

            $scope.Details[0].InhouseFac = $scope.UnitList.filter(x => x.Id == data.InhouseFacId)[0];
            $scope.Details[0].OuterFactory = $scope.BorrowerPartyList.filter(x => x.Id == data.OuterFacId)[0];

            $scope.DyeingPFList = angular.copy($scope.DyeingPFList1);
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
            $scope.Details[0].DyeingPFList = $scope.DyeingPFList;

            $scope.OFabOpList = angular.copy($scope.OFabOpList1);

            if (data.OFabOpNo) {
                var OFabOpNo = data.OFabOpNo.split(',');
                for (i = 0; i < OFabOpNo.length; i++) {
                    var v = parseInt(OFabOpNo[i]);
                    var e = $scope.OFabOpList.findIndex(x => x.id == v);
                    if (e >= 0) {
                        $scope.OFabOpList[e].FabOp = true;
                    }
                }
            }
            $scope.Details[0].OFabOpList = $scope.OFabOpList;
            $scope.ddl = {};
            $scope.Details[0].ddl = {};
                
            $scope.ddl.bodyPart = $scope.BodyPartList.filter(elem => elem.BodyPartID == data.BodyPartId)[0];
            $scope.ddl.ColorType = $scope.ColorTypeList.filter(elem => elem.ColorTypeID == data.ColorTypeId)[0];
            $scope.ddl.ColorShade = $scope.ColorShadeList.filter(elem => elem.ColorShadeNo == data.ColorShadeId)[0];
            $scope.ddl.colorSpec = $scope.ColorSpecList.filter(elem => elem.Id == data.ColorSpecId)[0];

            $scope.ddl.AOPBg = $scope.AOPBackground.filter(elem => elem.Id == data.AopBackNo)[0];
            $scope.Details[0].ddl = $scope.ddl;

            var Pantone = $scope.PantoneList.filter(elem => elem.id == data.PantoneId)[0];
            if (Pantone != null) {
                $scope.ddl.PantonNo = Pantone.name;
                $scope.ddl.PantonType = Pantone.name1;

                if ($scope.Details[0].ddl) {
                    $scope.Details[0].ddl.PantonNo = Pantone;
                    $scope.Details[0].ddl.PantonType = Pantone.name1;
                }
            }
                          
                
        });        
    }

    $scope.EStatusChange = function (i) {
        $scope.Details[i].Enzyme = '';
    }
    $scope.EnzStatusList = [
        { Id: 'Y', Name: 'Yes' },
        { Id: 'N', Name: 'No' }
    ];
    $scope.DyeingFactory = [
        { Id: 'Inhouse', Name: 'Inhouse' },
        { Id: 'Outer', Name: 'Outer' }
    ];
    $scope.OrderStatusList = [
        { Id: 'Active', Name: 'Active' },
        { Id: 'Hold', Name: 'Hold' }
    ];
    $scope.DiaPartList = [
        //{ Id: 1, Name: 'Select' },
        { Id: 2, Name: 'Open' },
        { Id: 3, Name: 'Tube' }
    ];
    function addRow(i) {

        var new_data_col = {
            Buyer: [], JobId: [], StyleId: [], OrderId: [], ShipDate: null, BookingDate: null, FabricName: [], Color: [], DiaPart: [], FinishDia: [],
            OrderQty: null, RGreigeQty: null, TDelvDate: null, FGReqDate: null, DyeingEndDate: null, LDNo: [], Enzyme: [], DyeingPFlow: [], OFabOp: [],
            DyeingFactory: [], Unit: [], OuterFactory: [], OrderStatus: [], Remarks: null
        };

        $scope.Details.unshift(new_data_col);

        for (g = $scope.Details.length; g >= 0; g--) {
            $scope.JobList[g + 1] = angular.copy($scope.JobList[g]);
            $scope.StyleList[g + 1] = angular.copy($scope.StyleList[g]);
            $scope.OrderList[g + 1] = angular.copy($scope.OrderList[g]);
            $scope.JobList[g] = [];
            $scope.StyleList[g] = [];
            $scope.OrderList[g] = [];
            //$scope.DiaPartList[g] = $scope.DiaPartList;
            //$scope.DiaPartList[g] = $scope.DiaPartList[1].Id;

            $scope.FabricNameAll[g + 1] = $scope.FabricNameAll[g];
            $scope.FabricNameAll[g] = [];

            $scope.OuterFactory[g + 1] = $scope.OuterFactory[g];
            $scope.InhouseFac[g + 1] = $scope.InhouseFac[g];
            $scope.InhouseFac[g] = true;
            $scope.OuterFactory[g] = false;
        }
    }

    function DuplicateRow(i) {
        let buyer = $scope.Details[i].Buyer;
        let jobId = $scope.Details[i].JobId;
        let styleId = $scope.Details[i].StyleId;
        let orderId = $scope.Details[i].OrderId;
        let fabricName = $scope.Details[i].FabricName;

        //var new_data_col = {
        //    Buyer: [], JobId: [], StyleId: [], OrderId: [], ShipDate: $scope.Details[i].ShipDate, BookingDate: $scope.Details[i].BookingDate, FabricName: [], Color: [], DiaPart: [], FinishDia: [],
        //    OrderQty: $scope.Details[i].OrderQty, RGreigeQty: $scope.Details[i].RGreigeQty, TDelvDate: $scope.Details[i].TDelvDate, FGReqDate: $scope.Details[i].FGReqDate, DyeingEndDate: $scope.Details[i].DyeingEndDate, LDNo: [], Enzyme: [], DyeingPFlow: [], OFabOp: [],
        //    DyeingFactory: [], Unit: [], OuterFactory: [], OrderStatus: [], Remarks: null
        //};

        $scope.Details.unshift(angular.copy($scope.Details[i]));

        for (g = $scope.Details.length; g >= 0; g--) {
            
            $scope.BuyerList[g + 1] = angular.copy($scope.BuyerList[g]);
            $scope.JobList[g + 1] = angular.copy($scope.JobList[g]);
            $scope.StyleList[g + 1] = angular.copy($scope.StyleList[g]);
            $scope.OrderList[g + 1] = angular.copy($scope.OrderList[g]);
            $scope.FabricNameAll[g + 1] = $scope.FabricNameAll[g];

            $scope.OuterFactory[g + 1] = $scope.OuterFactory[g];
            $scope.InhouseFac[g + 1] = $scope.InhouseFac[g];
            $scope.InhouseFac[g] = true;
            $scope.OuterFactory[g] = false;
        }
        
        $scope.$watchCollection('getDataByBuyer', function (i) {
            $scope.Details[0].Buyer = buyer;
        }, true);

        $scope.$watchCollection('getDataByJob', function (i) {
            $scope.Details[0].JobId = jobId; 
        }, true);

        $scope.$watchCollection('getDataByStyle', function (i) {
            $scope.Details[0].StyleId = styleId;
        }, true);

        $scope.$watchCollection('getDataByOrder', function (i) {
            $scope.Details[0].OrderId = orderId;
        }, true);

        $scope.$watchCollection('getDiaInfoByFabric', function (i) {
            $scope.Details[0].FabricName = fabricName;
        }, true);
    }

    function deleteRow(index) {
        if ($scope.Details.length > 1) $scope.Details.splice(index, 1);
        for (g = index; g < $scope.Details.length; g++) {
            $scope.JobList[g] = angular.copy($scope.JobList[g+1]);
            $scope.StyleList[g] = angular.copy($scope.StyleList[g+1]);
            $scope.OrderList[g] = angular.copy($scope.OrderList[g+1]);
            $scope.JobList[g+1] = [];
            $scope.StyleList[g+1] = [];
            $scope.OrderList[g+1] = [];

            $scope.FabricNameAll[g] = $scope.FabricNameAll[g+1];
            $scope.FabricNameAll[g+1] = [];

            $scope.OuterFactory[g] = $scope.OuterFactory[g+1];
            $scope.InhouseFac[g] = $scope.InhouseFac[g+1];
            $scope.InhouseFac[g+1] = true;
            $scope.OuterFactory[g+1] = false;
        }
    }

    tableInitialState()
    function tableInitialState() {
        $scope.data = [{
            Buyer: [], JobId: [], StyleId: [], OrderId: [], ShipDate: null, BookingDate: null, FabricName: [], Color: [], DiaPart: [], FinishDia: [], OrderQty: null, RGreigeQty: null, TDelvDate: null, FGReqDate: null, DyeingEndDate: null, LDNo: [], Enzyme: [], DyeingPFlow: [], OFabOp: [], DyeingFactory: [], Unit: [], OuterFactory: [], OrderStatus: [], Remarks: null
        }];
        $scope.Details = angular.copy($scope.data);
        //$scope.Details[0].DiaPart = $scope.DiaPartList[0];
    }
    $scope.actionDialog1 = function (action, dataModel) {
        if (action == 'AddNewRow') {
            addRow(dataModel);           
        }
        else if (action == 'DuplicateRow') {
            DuplicateRow(dataModel);
        }
        else if (action == 'DeleteRow') {
            deleteRow(dataModel);
        } 
    }

    $scope.actionDialog = function (action, dataModel) {
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
            msg = 'Do you want to save this Master Data?';
        else if ($scope.Mode == 'R')
            msg = 'Do you want to Modify this Master Data?';       

        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': msg };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': msg };
        }
        return obj;
    }
    function SaveUpdate() {
        var details = [];
        for (g = 0; g < $scope.Details.length; g++) {
            debugger;
            var model = {};
            model.Mode = $scope.Mode;
            if ($scope.Mode == 'N')
                model.MDataId = 0;
            else
                model.MDataId = $scope.Details[g].MDataId;

            if ($scope.Unit == null) {
                $rootScope.alert("Please! Select Unit...")
                return;
            }
            model.UnitId = $scope.Unit.Id;
            model.BuyerId = $scope.Details[g].Buyer.BuyerId;
            model.JobId = $scope.Details[g].JobId;
            model.StyleId = $scope.Details[g].StyleId;
            model.OrderId = $scope.Details[g].OrderId;            
            model.ShipDate = moment($scope.Details[g].ShipDate).format('DD-MMM-YYYY');
            model.BookingDate = moment($scope.Details[g].BookingDate).format('DD-MMM-YYYY');
            model.IFID = $scope.Details[g].FabricName.IFID;
            model.ColorId = $scope.Details[g].Color.id;
            model.DiaId = $scope.Details[g].DiaPart;
            model.FinishDia = $scope.Details[g].FinishDia;
            model.OrderQty = $scope.Details[g].OrderQty;
            model.RGreigeQty = $scope.Details[g].RGreigeQty;
            model.TDelvDate = moment($scope.Details[g].TDelvDate).format('DD-MMM-YYYY');
            model.FGReqDate = moment($scope.Details[g].FGReqDate).format('DD-MMM-YYYY');
            model.DyeingEndDate = moment($scope.Details[g].DyeingEndDate).format('DD-MMM-YYYY');
            model.LDNo = $scope.Details[g].LDNo;
            model.Enzyme = $scope.Details[g].Enzyme;

            model.UserId = $rootScope.UserId;
            model.Remarks = $scope.Details[g].Remarks;
            
            model.DpfcId = "";
            if ($scope.Details[g].DyeingPFList) {
                var DProcess = $scope.Details[g].DyeingPFList.filter(x => x.DPFlow == 1);
                for (i = 0; i < DProcess.length; i++) {
                    model.DpfcId += DProcess[i].id + ',';
                }
                model.DpfcId = model.DpfcId.slice(0, -1);
            }

            model.OFabOpNo = "";
            if ($scope.Details[g].OFabOpList) {
                var OFabOpNo = $scope.Details[g].OFabOpList.filter(x => x.FabOp == 1);
                for (i = 0; i < OFabOpNo.length; i++) {
                    model.OFabOpNo += OFabOpNo[i].id + ',';
                }
                model.OFabOpNo = model.OFabOpNo.slice(0, -1);
            }

            model.DyeingFactory = $scope.Details[g].DyeingFactory;
            if ($scope.Details[g].InhouseFac)
                model.InhouseFacId = $scope.Details[g].InhouseFac.Id;
            if ($scope.Details[g].OuterFactory)
                model.OuterFacId = $scope.Details[g].OuterFactory.Id;

            model.OrderStatus = $scope.Details[g].OrderStatus;
            // model.Remarks = $scope.Details[g].Remarks;

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
                }
                if ($scope.Details[g].ddl.AOPBg)
                    model.AopBackNo = $scope.Details[g].ddl.AOPBg.Id;
            }
            details.push(model);
        }

        MasterDataConfig.MasterData_SaveUpdate(details, function (data) {
            if (data.ErrorMsg == null) {
                RefreshForm();
               
                $rootScope.alert(data.Msg);
                tableInitialState();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }    

    function RefreshForm() {
        $scope.Details = [];
        $scope.ddl = null;        
        $scope.Unit = [];
        $scope.DProcess = [];
        $scope.OFabOperation = [];
        $scope.newFab = {};
        $scope.btnSave = "Save";       
    }
    $scope.Refresh = function () {
        RefreshForm();
        $scope.Mode = 'N';
        tableInitialState();
    }

    $scope.NewFabricDialog = function (ev, i) {
        $scope.Index = i;
        $scope.CurrentPopup = "NewFabricDialog";
        if ($scope.Details[i].OFabOpList)
            $scope.OFabOpList = $scope.Details[i].OFabOpList;
        else
            $scope.OFabOpList = angular.copy($scope.OFabOpList1);

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/NewFabricDialog.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

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

}]);