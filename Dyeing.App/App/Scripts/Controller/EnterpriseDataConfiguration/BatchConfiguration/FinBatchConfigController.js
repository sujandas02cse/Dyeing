app.controller("FinBatchConfigController", ['$scope', '$rootScope', 'filterFilter', '$parse', '$mdDialog', '$mdToast', '$q', 'FinBatchConfig', function ($scope, $rootScope, filterFilter, $parse, $mdDialog, $mdToast, $q, FinBatchConfig) {
    FinBatchConfig.GetBatchNoAndPlanNo(function (data) { $scope.PlanBatchList = data; });       
    FinBatchConfig.GetDDLFinishingBatch('', function (data) {
        $scope.DDLFinishDataAll = data;
        $scope.DiaPartList = filterFilter($scope.DDLFinishDataAll, { info: 'DiaPartName' }, true);
        $scope.DiaPartPFAll = filterFilter($scope.DDLFinishDataAll, { info: 'DiaPartPF' }, true);

        $scope.DyeingPFList = filterFilter($scope.DDLFinishDataAll, { info: 'DyeingPF' }, true);
        $scope.MatchingInfo = filterFilter($scope.DDLFinishDataAll, { info: 'MatchingWith' }, true);        
        $scope.OFabOpList = filterFilter($scope.DDLFinishDataAll, { info: 'FabricsOperation' }, true);

        $scope.FRecipeData = filterFilter($scope.DDLFinishDataAll, { info: 'FinRecipe' }, true);
    }); 
    $scope.FDate = new Date();

    //$scope.DFSpecList = [];
    $scope.getPlanInfoByPlan = function () {
        $scope.BatchNo = $scope.PlanNo.BatchNo;      
        GetFinBatchData($scope.PlanNo.MppmId);
    }
    $scope.getPlanInfoByBatch = function () {
        $scope.PlanNo = $scope.BatchNo.PlanNo;
        GetFinBatchData($scope.BatchNo.MppmId); 
    } 
    function GetFinBatchData(FinBatchHId) {
        FinBatchConfig.GetFinBatchData(FinBatchHId, function (data) {
            debugger;
            $scope.Head = {};
            $scope.DFSpecList = [];
            if (data.m_Item1.length == 0) {
                getPlanData($scope.PlanNo.MppmId);
                $scope.btnSave = "Save";
                $scope.Head.FinBatchHId = 0;
            }else {
                $scope.Head = data.m_Item1[0];
                $scope.FDate = $scope.Head.FDate;
                $scope.Head.DiaPart = $scope.DiaPartList.filter(elem => elem.name == $scope.Head.DiaPartName)[0];
                DiaPartWisePF();                
               
                if (data.m_Item2.length > 0) {                   
                    
                    for (i = 0; i < data.m_Item2.length; i++) {
                        var Spec = {};
                        var scope = "Spec." + data.m_Item2[i].DModel;
                        Spec.DpsdId = data.m_Item2[i].DpsdId;
                        Spec.DpfcId = data.m_Item2[i].DpfcId;
                        Spec.FbscId = data.m_Item2[i].FbscId;
                        Spec.DModel = data.m_Item2[i].DModel;
                        Spec.DiaPartName = data.m_Item2[i].DiaPartName;
                        var Value = data.m_Item2[i].Value;

                        $parse(scope).assign($scope, Value);
                        $scope.DFSpecList.push(Spec);
                    }
                    //$scope.DFSpecList = SpecList;
                }

                var DProcess = [], OFabOperation = [];
                var ArrDProcess = $scope.Head.DpfcId.split(',');
                for (i = 0; i < ArrDProcess.length; i++) {
                    var v = String(ArrDProcess[i]);
                    DProcess.push({ id: v });
                }
                
                if ($scope.Head.FabricsOperationNo != null) {
                    var FabricsOperationNo = $scope.Head.FabricsOperationNo.split(',');
                    for (i = 0; i < FabricsOperationNo.length; i++) {
                        var v = String(FabricsOperationNo[i]);
                        OFabOperation.push({ id: v });
                    }
                }
                
                $scope.DProcess = DProcess;
                $scope.OFabOperation = OFabOperation;

                if ($scope.Head.SQCStatus != null) {
                    var qStatus = $scope.Head.SQCStatus.split(',');
                    for (i = 0; i < qStatus.length; i++) {
                        if (qStatus[i] == "OK")
                            $scope.Head.OK = true;
                        else if (qStatus[i] == "Not OK")
                            $scope.Head.NotOK = true;
                        else if (qStatus[i] == "RPCS")
                            $scope.Head.RPCS = true;
                    }
                }

                if ($scope.Head.FrId != null) {
                    $scope.FRecipeList = [];
                    var FrId = $scope.Head.FrId.split(',');
                    for (i = 0; i < FrId.length; i++) {
                        var FRecipe = $scope.FRecipeData.filter(elem => elem.id == FrId[i])[0];
                        FRecipe.RecipeDesc = FRecipe.name;
                       
                        if (i == FrId.length - 1) {
                            FRecipe.label = false;
                            FRecipe.isPlus = true;
                        } else {
                            FRecipe.label = false;
                            FRecipe.isPlus = false;
                        }
                        if (i == 0)
                            FRecipe.label = true;

                        $scope.FRecipeList.push(FRecipe);
                    }
                }                
                var LTime = $scope.Head.LoadingTime.split(':');
                var ULTime = $scope.Head.UnloadingTime.split(':');

                var hr = parseInt(LTime[0]);
                var min = parseInt(LTime[1]);
                $scope.Head.LTime = new Date();
                $scope.Head.LTime.setHours(hr, min, 0, 0);

                var hr = parseInt(ULTime[0]);
                var min = parseInt(ULTime[1]);
                $scope.Head.ULTime = new Date();
                $scope.Head.ULTime.setHours(hr, min, 0, 0); 

                $scope.btnSave = "Update";
                //$scope.Head.FinBatchHId = 0;
            }
        });
    }
    function getPlanData(MppmId) {
        FinBatchConfig.GetProductionPlanData(MppmId, function (data) {   
                       
            $scope.Head = data[0];           
            var DProcess = [], OFabOperation = [];
            var ArrDProcess = data[0].DpfcId.split(',');
            for (i = 0; i < ArrDProcess.length; i++) {
                var v = String(ArrDProcess[i]);
                DProcess.push({ id: v });
            }            
            if (data[0].FabricsOperationNo != null) {
                var FabricsOperationNo = data[0].FabricsOperationNo.split(',');
                for (i = 0; i < FabricsOperationNo.length; i++) {
                    var v = String(FabricsOperationNo[i]);
                    OFabOperation.push({ id: v });
                }
            }
            
            $scope.DProcess = DProcess;
            $scope.OFabOperation = OFabOperation;

        });
    }

    function DiaPartWisePF() {
        $scope.Spec = {};
        $scope.ProcessFlowList = [];
        $scope.ProcessFlowList = filterFilter($scope.DiaPartPFAll, { name: $scope.Head.DiaPart.name }, true);
        FinBatchConfig.GetDPSpecification($scope.Head.DiaPart.name, function (data) {
            $scope.DFSpecAll = data;
        });
    }

    $scope.getProcessFlow = function () {
        DiaPartWisePF();    
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
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Dyeing Batch Configuration (Finishing) Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Dyeing Batch Configuration (Finishing) Data?' };
        } 
        return obj;
    }
    function SaveUpdate() {        
        debugger;        
        var SpecList = [];
        var Spec = {};
        if ($scope.DFSpecList != null) {
            //alert(angular.toJson($scope.DFSpecAll));//DFSpecList
            for (i = 0; i < $scope.DFSpecAll.length; i++) {
                Spec = {};
                var scope = "Spec." + $scope.DFSpecAll[i].DModel;
                Spec.DpsdId = $scope.DFSpecAll[i].DpsdId;
                Spec.DpfcId = $scope.DFSpecAll[i].DpfcId;
                Spec.FbscId = $scope.DFSpecAll[i].FbscId;
                Spec.DModel = $scope.DFSpecAll[i].DModel;
                Spec.DiaPartName = $scope.DFSpecAll[i].DiaPartName;
                Spec.Value = $scope.$eval(scope);
                SpecList.push(Spec);
            }
        }

        $scope.Head.SQCStatus = "";
        var OK = $scope.Head.OK;
        var NotOK = $scope.Head.NotOK;
        var RPCS = $scope.Head.RPCS;
        
        if (OK == true)
            $scope.Head.SQCStatus = "OK";
        else if (NotOK == true)
            $scope.Head.SQCStatus = "Not OK";

        if (RPCS == true) {
            if ($scope.Head.SQCStatus.length > 0)
                $scope.Head.SQCStatus += ",RPCS";
            else 
                $scope.Head.SQCStatus = "RPCS";
        }

        //Multiselect           
        $scope.Head.DpfcId = "";
        for (i = 0; i < $scope.DProcess.length; i++) {
            $scope.Head.DpfcId += $scope.DProcess[i].id + ',';
        }
        $scope.Head.DpfcId = $scope.Head.DpfcId.slice(0, -1);

        if ($scope.OFabOperation.length > 0) {
            $scope.Head.FabricsOperationNo = "";
            for (i = 0; i < $scope.OFabOperation.length; i++) {
                $scope.Head.FabricsOperationNo += $scope.OFabOperation[i].id + ',';
            }
            $scope.Head.FabricsOperationNo = $scope.Head.FabricsOperationNo.slice(0, -1);
        }
        else
            $scope.Head.FabricsOperationNo = null;

        if ($scope.Head.LTime != null)
            $scope.Head.LoadingTime = moment($scope.Head.LTime).format('HH:mm');
        if ($scope.Head.ULTime != null)
            $scope.Head.UnloadingTime = moment($scope.Head.ULTime).format('HH:mm');
                
        $scope.Head.FDate = $scope.FDate;
        $scope.Head.MppmId = $scope.PlanNo.MppmId;
        $scope.Head.DiaPartName = $scope.Head.DiaPart.name;        

        $scope.Head.child = SpecList;
        $scope.Head.recipe = [];//$scope.FRecipeList;
        for (var i = 0; i < $scope.FRecipeList.length; i++) {
            var RecipeDesc = $scope.FRecipeList[i].RecipeDesc;
            if (RecipeDesc != null) {
                if ($scope.FRecipeList[i].RecipeDesc.name != null)
                    RecipeDesc = $scope.FRecipeList[i].RecipeDesc.name;
            }
            $scope.Head.recipe.push({ FrId: $scope.FRecipeList[i].RecipeDesc.id, RecipeDesc: RecipeDesc })
        }

        $scope.Head.UserId = $rootScope.UserId;

        if ($scope.btnSave == "Save")
            $scope.Head.FinBatchHId = 0;

        FinBatchConfig.FinishingBatch_SaveUpdate($scope.Head,function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });        
    }

    $scope.FData = [{
        RecipeDesc: null, label: true, isPlus: true
        }];

    $scope.FRecipeList = angular.copy($scope.FData);
    //$scope.defaultState = 'plus';
    //$scope.op1 = angular.noop;

    $scope.CheckSQC = function (ctr) {
        var OK = $scope.Head.OK;
        var NotOK = $scope.Head.NotOK;
        if (OK == true && NotOK == true) {
            $rootScope.alert("Allow Ony one Check from OK and Not OK...");
            if (ctr == "OK")
                $scope.Head.OK = false;
            else 
                $scope.Head.NotOK = false;

            return;
        }        
    }

    $scope.AddNew = function (i) {
        $scope.FRecipeList[i].isPlus = false;        
        $scope.FRecipeList.push({
            RecipeDesc: null, label: false, isPlus:true
        });

    }
    $scope.RemoveRow = function (i) {
        $scope.FRecipeList.splice(i, 1);
        $scope.FRecipeList[0].label = true;
    }
    //Custom Popup
    $scope.ProcessWiseSpec = function (ev, id, name) { 
        id = parseInt(id);
        $scope.Process = [];
        $scope.Process.Id = id;
        $scope.Process.Name = name;
        
        $scope.DFSpecList = filterFilter($scope.DFSpecAll, { DpfcId: id }, true);
        if ($scope.DFSpecList.length <= 0) {
            $rootScope.alert("No Specification Found Aganist this Process...");
            return;
        }        

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/ProcessWiseSpecification.html',
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };
    $scope.OthersBatchData = function (ev) {  
        if ($scope.PlanNo ==null) {
            $rootScope.alert("Please! Enter Plan/Batch No...");
            return;
        }   
        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/OthersBatchData.html',
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };
    
    function DialogController($scope, $mdDialog) {

        $scope.calcTimeDiff = function () {
            //alert($scope.Head.LTime.getTime());
            var diff = $scope.Head.ULTime.getTime() - $scope.Head.LTime.getTime();

            var days = Math.floor(diff / (60 * 60 * 24 * 1000));
            var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
            var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
            var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));

            var timeDiff = hours + " Hour " + minutes+" Minute";
            //alert(timeDiff);
            $scope.Head.TotalTime = timeDiff
            //alert($scope.Head.ULTime);
        }

        $scope.hide = function () {           
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }  

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

    function Refresh() {
        $scope.Head = null;
        $scope.FRecipeList = [];
        $scope.FRecipeList = angular.copy($scope.FData);
        $scope.DFSpecList = [];
        $scope.ProcessFlowList = [];
        //$scope.PlanNo = null;
        //$scope.BatchNo = null;

        $scope.DProcess = [];
        $scope.OFabOperation = [];
        $scope.btnSave = "Save";
        $scope.FDate = new Date();//moment(new Date()).format('dd-MMM-yyyy');
    }
    $scope.Refresh = function () {        
        Refresh();    
    }

}]);
