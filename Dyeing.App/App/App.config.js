//(function (angular) {
app.config(function ($routeProvider, $locationProvider, $mdDateLocaleProvider, $qProvider, $mdDialogProvider, $mdToastProvider, $mdIconProvider) {
    //alert(window.location.href);

    var ts = Date.now();   

    $routeProvider
        .when('/', {
            redirectTo: function () {
                return '/Home';
            }
        })
        .when('/Home', {
            templateUrl: '/App/Views/Home/index.html?' + ts,
            controller: 'HomeController'
        })

        //Basic Data Config=>Machine Data Config routing
        .when('/MachineNameConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/MachineDataConfiguration/MachineNameConfig.html?' + ts,
            controller: 'MachineNameConfigController'
        })
        .when('/MachineTypeConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/MachineDataConfiguration/MachineTypeConfig.html?'+ts,
            controller: 'MachineTypeConfigController'
        })
        .when('/MachineModelConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/MachineDataConfiguration/MachineModelConfig.html?'+ts,
            controller: 'MachineModelConfigController'
        })
        .when('/MachineCapacityConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/MachineDataConfiguration/MachineCapacityConfig.html?'+ts,
            controller: 'MachineCapacityConfigController'
        })

      
               

        //Basic Data Config=>Operation Data Config routing
        .when('/OperationSectionConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/OperationDataConfiguration/OperationSectionConfig.html?'+ts,
            controller: 'OperationSectionConfigController'
        })
        .when('/ProductionShiftConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/OperationDataConfiguration/ProductionShiftConfig.html?'+ts,
            controller: 'ProductionShiftConfigController'
        })
        

        //Basic Data Config=>Dyeing Batch Config routing
        .when('/FinishingSpecification', {
            templateUrl: '/App/Views/BasicDataConfiguration/DyeingBatchConfiguration/FinishingSpecificationConfiguration.html?'+ts,
            controller: 'FinishingSpecConfigController'
        })

        .when('/DiaPartSpecification', {
            templateUrl: '/App/Views/BasicDataConfiguration/DyeingBatchConfiguration/DiaPartWiseSpecificationConfiguration.html?'+ts,
            controller: 'DiaPartWiseSpecConfigController'
        })

        .when('/TrolleyInfo', {
            templateUrl: '/App/Views/BasicDataConfiguration/DyeingBatchConfiguration/TrolleyNoConfig.html?'+ts,
            controller: 'TolleyNoConfigController'
        })

        .when('/GSMNameConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/DyeingBatchConfiguration/GSMNameConfig.html?'+ts,
            controller: 'GSMNameConfigController'
        })


        //Basic Data Config=> Production Plan Configuration
        .when('/ProcessFlowConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/ProductionPlanConfiguration/DyeingProcessFlowConfig.html?'+ts,
            controller: 'DyeingProcessFlowConfigController'
        })
        .when('/MatchingFieldConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/ProductionPlanConfiguration/MatchingWithFieldConfig.html?'+ts,
            controller: 'MatchingWithFieldConfigController'
        })
        .when('/ProdPlanReviceReason', {
            templateUrl: '/App/Views/BasicDataConfiguration/ProductionPlanConfiguration/ProductionPlanReviseReason.html?'+ts,
            controller: 'ProductionPlanReviseReasonController'
        })
        .when('/DiaPartProcessFlow', {
            templateUrl: '/App/Views/BasicDataConfiguration/ProductionPlanConfiguration/DiaPartWiseDyeingProcessConfiguration.html?'+ts,
            controller: 'DiaPartWiseDyeingProcessConfigController'
        })
        


               
        //Basic Data Config=>Inspection Config routing
        .when('/UnitWiseMachine', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/UnitWiseInspectionMCConfig.html?'+ts,
            controller: 'UnitWiseInspectionMCConfigController'
        })
        .when('/FaultHeadConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/FaultHeadConfig.html?'+ts,
            controller: 'FaultHeadConfigController'
        })
        .when('/FaultNameConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/FaultNameConfig.html?'+ts,
            controller: 'FaultNameConfigController'
        })
        .when('/PointHeadConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/PointHeadConfig.html?'+ts,
            controller: 'PointHeadConfigController'
        })
        .when('/PointSystemNameConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/PointSystemNameConfig.html?'+ts,
            controller: 'PointSystemNameConfigController'
        })
        .when('/PointHeadWiseFaultConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/PointHeadWiseFaultConfig.html?'+ts,
            controller: 'PointHeadWiseFaultConfigController'
        })
        .when('/PointSystemValueRange', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/PointSystemValueRangeConfig.html?'+ts,
            controller: 'PointSystemValueRangeConfigController'
        })
        .when('/PointValueRangeConfig', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/PointValueRangeConfig.html?'+ts,
            controller: 'PointValueRangeConfigController'
        })
        .when('/BuyerPointSystemValue', {
            templateUrl: '/App/Views/BasicDataConfiguration/InspectionConfiguration/BuyerWisePointSystemValueConfig.html?'+ts,
            controller: 'BuyerWisePointSystemValueConfigController'
        })
               

        //Machine Data Config routing
        .when('/MachineDetailsConfig', {
            templateUrl: '/App/Views/MachineDataConfiguration/MachineDetailsConfig.html?'+ts,
            controller: 'MachineDetailsConfigController'
        })
        .when('/UnitWiseFinMcSet', {
            templateUrl: '/App/Views/MachineDataConfiguration/UnitWiseFinMcSet.html?' + ts,
            controller: 'UnitWiseFinMcController'
        })
        .when('/MachineWiseManpowerConfig', {
            templateUrl: '/App/Views/MachineDataConfiguration/MachineWiseManPowerConfig.html?'+ts,
            controller: 'MachineWiseManPowerConfigController'
        })

        .when('/McOperation', {
            templateUrl: '/App/Views/MachineDataConfiguration/McOperation.html?' + ts,
            controller: 'McOperationConfigController'
        })

        .when('/SlittingOperationConfig', {
            templateUrl: '/App/Views/MachineDataConfiguration/SlittingOperationConfigaration.html?' + ts,
            controller: 'SlitOperationConfigController'
        })

        .when('/StenterMcOprConfiguration', {
            templateUrl: '/App/Views/MachineDataConfiguration/StenterOperationConfig.html?' + ts,
            controller: 'StenterOperationConfigController'
        })

        .when('/CompactingMcOperation', {
            templateUrl: '/App/Views/MachineDataConfiguration/CompactingMcOperation.html?' + ts,
            controller: 'CompactingMcOperationController'
        })

        .when('/DryerMcOpConfig', {
            templateUrl: '/App/Views/MachineDataConfiguration/DryerMcOpConfig.html?' + ts,
            controller: 'DryerMcOpConfigController'
        })

        .when('/TumbleDryerMcOpConfig', {
            templateUrl: '/App/Views/MachineDataConfiguration/TumbleDryerMcOpConfig.html?' + ts,
            controller: 'TumbleDryerMcOpConfigController'
        })


        //EnterpriseDataConfiguration=>ProductionPlanConfig routing
        .when('/FinFabReqConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/FinFabReqConfig.html?'+ts,
            controller: 'FinFabReqConfigController'
        })
        .when('/ProdPrioritySetConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/ProductionPrioritySetConfig.html?'+ts,
            controller: 'ProductionPrioritySetConfigController'
        })
        .when('/MachineProdPlanConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/MachineProdPlanConfig.html?'+ts,
            controller: 'MachineProdPlanConfigController'
        })
        .when('/MachineProductionPlanChange', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/MachineProductionPlanChange.html?'+ts,
            controller: 'MachineProductionPlanChangeController'
        })
        .when('/MachineProductionPlanClose', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/MachineProductionPlanClose.html?'+ts,
            controller: 'MachineProductionPlanCloseController'
        })
        .when('/MasterDataConfiguration', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/MasterDataConfig.html?' + ts,
            controller: 'MasterDataConfigController'
        })
        .when('/InitialInformation', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ProductionPlanConfiguration/InitialInformation.html?' + ts,
            controller: 'InitialInformation'
        })
                     
        //EnterpriseDataConfiguration=>BatchConfig routing
        .when('/BatchGSMConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchWiseGSMConfig.html?'+ts,
            controller: 'BatchWiseGSMConfigController'
        })
        .when('/FabBatchConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/FabBatchConfig.html?'+ts,
            controller: 'DyeingBatchConfigFabricController'
        })
        .when('/FinBatchConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/FinBatchConfig.html?'+ts,
            controller: 'FinBatchConfigController'
        })
        .when('/BatchPreparation', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchPreparation.html?' + ts,
            controller: 'BatchPreparationController'
        })
        .when('/BatchDataProcessing', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchDataProcessing.html?' + ts,
            controller: 'BatchDataProcessingController'
        })
        .when('/BatchCard', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchCard.html?' + ts,
            controller: 'BatchCardController'
        })
        .when('/BatchCardSample', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchCardSample.html?' + ts,
            controller: 'BatchCardSampleController'
        })
        .when('/BatchCardReprocess', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchCardReprocess.html?' + ts,
            controller: 'BatchCardReprocessController'
        })

        .when('/BatchFinishing', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchFinishing.html?' + ts,
            controller: 'BatchFinishingController'
        })
        .when('/BatchReprocessConfig', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/BatchConfiguration/BatchReprocessConfig.html?' + ts,
            controller: 'BatchReprocessConfigController'
        })

        //EnterpriseDataConfiguration=>Dyeing Plan Management
        .when('/InitialInformation', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/InitialInformation.html?' + ts,
            controller: 'InitialInformation'
        })
        .when('/InitialPlan', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/InitialPlan.html?' + ts,
            controller: 'InitialPlan'
        })
        .when('/MachinePlan', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/MachinePlan.html?' + ts,
            controller: 'MachinePlan'
        })
        .when('/BatchPlan', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/BatchPlan.html?' + ts,
            controller: 'BatchPlan'
        })
        .when('/BatchPrepare', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/BatchPrepare.html?' + ts,
            controller: 'BatchPrepare'
        })
        .when('/DyeingUnitTransfer', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/DyeingUnitTransfer.html?' + ts,
            controller: 'DyeingUnitTransfer'
        })
        .when('/MToMTransfer', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/MToMTransfer.html?' + ts,
            controller: 'MToMTransfer'
        })
        .when('/LabDipEnlistment', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/LabDipEnlistment.html?' + ts,
            controller: 'LabDipEnlistment'
        })
        .when('/DyeingCommentsEnlistment', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/DyeingCommentsEnlistment.html?' + ts,
            controller: 'DyeingCommentsEnlistment'
        })
        .when('/BatchCardNew', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/BatchCardNew.html?' + ts,
            controller: 'BatchCardNew'
        })
        .when('/BatchPriority', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/PrioritySet.html?' + ts,
            controller: 'PrioritySet'
        })
        .when('/SCMSynchronization', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/PlanManagement/SCMSynchronization.html?' + ts,
            controller: 'SCMSynchronizationController'
        })

        //EnterpriseDataConfiguration=>Approval Management routing
        .when('/QualityApproval', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/QualityApproval.html?' + ts,
            controller: 'QualityApproval'
        })
        .when('/ShadeApproval', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/ShadeApproval.html?' + ts,
            controller: 'ShadeApproval'
        })
        .when('/FabricTestApproval', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/FabricTestApproval.html?' + ts,
            controller: 'FabricTestApproval'
        })
        .when('/RFDDeclare', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/RFDDeclare.html?' + ts,
            controller: 'RFDDeclare'
        })
        .when('/CheckRoll', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/CheckRoll.html?' + ts,
            controller: 'CheckRoll'
        })
        .when('/CheckRollSend', {
            templateUrl: '/App/Views/EnterpriseDataConfiguration/ApprovalManagement/CheckRollSend.html?' + ts,
            controller: 'CheckRollSend'
        })

       
        //var viewPath = '/InsideMyView';
        //var currentPath = window.location.href.substr(0, window.location.href.indexOf('#') + 1);
        //var fullPath = currentPath + viewPath;
        //$window.open(fullPath, '_blank');

        //Fabric Data Configuration routing
        .when('/FinFabInspConfig', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinishFabricInspectionConfig.html?'+ts,
            controller: 'FinishFabricInspectionConfigController'
        })
      
        .when('/FinishFabricInspectionConfig', {
            controller: function () {
                //$rootScope.menu = false;
               
                window.history.back();
               // window.location = "/Home/Index#!/home";               
                window.open("/Home/Index#!/FinFabInspConfig", '_blank')                
            },
            template: ''           
        })


        // Fabric data configuration rounting for sample

        .when('/FinFabInspConfigSample', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinishFabricInspectionConfigSample.html?' + ts,
            controller: 'FinishFabricInspectionConfigSampleControllerNew'
        })

        .when('/FinishFabricInspectionConfigSample', {
            controller: function () {
                //$rootScope.menu = false;

                window.history.back();
                // window.location = "/Home/Index#!/home";               
                window.open("/Home/Index#!/FinFabInspConfigSample", '_blank')
            },
            template: ''
        })
        .when('/FinInspTableConfig', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinFabInspTableConfig.html?' + ts,
            controller: 'FinishFabricInsTableConfigController'
        })
        .when('/FinFabInspTableConfig', {
            controller: function () {
                //$rootScope.menu = false;

                window.history.back();
                // window.location = "/Home/Index#!/home";               
                window.open("/Home/Index#!/FinInspTableConfig", '_blank')
            },
            template: ''
        })
        .when('/NewInspection', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinishFabricInspection.html?'+ts,
            controller: 'FinishFabricInspectionNewConfigController'
        })
        .when('/FinFabStoreIssue', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinFabStoreIssue.html?'+ts,
            controller: 'FinFabStoreIssue'
        })
        .when('/BarcodeConfig', {
            templateUrl: '/App/Views/FabricDataConfiguration/BarcodeConfig.html?'+ts,
            controller: 'BarcodeConfigController'
        })
        .when('/ReceiveIssueInv', {
            templateUrl: '/App/Views/FabricDataConfiguration/InventoryOperation/WashReceiveIssueInventory.html?' + ts,
            controller: 'WashReceiveIssueInventoryController'
        })
        .when('/FinishFabricInspectionConfigOffline', {
            templateUrl: '/App/Views/FabricDataConfiguration/FinishFabricInspectionConfigOffline.html?' + ts,
            controller: 'FinishFabricInspectionConfigOfflineController'
        })

        //Dashboard Routing
        .when('/MasterDataDashboard', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/MasterDataEntry.html?' + ts,
            controller: 'MasterDataEntryController'
        })

        .when('/ProductionPlanDashboard', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/ProductionPlanDashboard.html?' + ts,
            controller: 'ProductionPlanDashboardController'
        })
        .when('/BatchCardDashboard', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/BatchCardDashboard.html?' + ts,
            controller: 'BatchCardDashboardController'
        })
        .when('/StyleOrderDashboard', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/StyleOrderDashboard.html?' + ts,
            controller: 'StyleOrderDashboardController'
        })
        .when('/BatchOperationDashboard', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/BatchOperationDashboard.html?' + ts,
            controller: 'BatchOperationDashboard'
        })
        .when('/PackingListDashboard', {
            templateUrl: '/App/Views/DashboardManagement/PackingListDashboard.html?' + ts,
            controller: 'PackingListDashboard'
        })
        .when('/FloorStatusDashboard', {
            templateUrl: '/App/Views/DashboardManagement/FloorStatusDashboard.html?' + ts,
            controller: 'FloorStatusDashboard'
        })
        .when('/PrioritySetDashboard', {
            templateUrl: '/App/Views/DashboardManagement/PrioritySetDashboard.html?' + ts,
            controller: 'PrioritySetDashboard'
        })
        .when('/DynamicProductionMonitoring', {
            templateUrl: '/App/Views/DashboardManagement/DataRelatedDashboard/DynamicProductionMonitoring.html?' + ts,
            controller: 'DynamicProductionMonitoring'
        })
        

        //BroadcastManagement routing
        .when('/BasicBroadcast', {
            templateUrl: '/App/Views/BroadcastManagement/BasicBroadcast/BasicBroadcast.html?'+ts,
            controller: 'BasicBroadcastController'
        })
        .when('/QCManagement', {
            templateUrl: '/App/Views/BroadcastManagement/QCManagement/QCManagement.html?' + ts,
            controller: 'QCManagementController'
        })
        .when('/FabricManagement', {
            templateUrl: '/App/Views/BroadcastManagement/FabricManagement/FabricMgt.html?' + ts,
            controller: 'FabricMgtController'
        })
        .otherwise({
            templateUrl: '/App/Views/Shared/Error.html',
            controller: 'ErrorController'
        })
    //--http://localhost:34592/Home/Index#!/MachineWiseManpowerConfig
    //.when('/MachineNameConfig1', {
    //    templateUrl: '/BasicDataConfiguration/MachineNameConfig',
    //    controller: 'MachineNameConfigController'
    //})
    $locationProvider.html5Mode(false).hashPrefix('!')


    $qProvider.errorOnUnhandledRejections(false);
    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? moment(date).format('DD-MMM-YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = moment(dateString, 'DD-MMM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDialogProvider.addPreset('dialogBox', {
        options: function () {
            return {
                templateUrl: '/App/template/Common/CustomDialog.html',
                parent: angular.element(document.body),
                controller: DialogController,
                escapeToClose: true,
                clickOutsideToClose: true
            };
        }
    });

    $mdDialogProvider.addPreset('alertMessage', {
        options: function () {
            return {
                templateUrl: '/App/template/Common/CustomAlert.html',
                parent: angular.element(document.body),
                controller: DialogController,
                escapeToClose: true,
                clickOutsideToClose: true
            };
        }
    });

    $mdIconProvider.icon('md-close', '../../../Content/img/ic_close_24px.svg', 24);

    //function toast($scope, $mdToast, locals) {
    //    $scope.message = locals.message;
    //}
    function DialogController($scope, $http, $mdDialog, locals) {

        $scope.model = locals.model;
        $scope.action = function (mode) {
            $mdDialog.hide(mode);
        }
        $scope.OK = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }
})
    .controller('ErrorController', function ($scope) {
        $scope.Message = "Page You Requested Not Found!";
    })
    //.controller('HomeController', function ($scope) {
    //    $scope.Message = "";
    //})

