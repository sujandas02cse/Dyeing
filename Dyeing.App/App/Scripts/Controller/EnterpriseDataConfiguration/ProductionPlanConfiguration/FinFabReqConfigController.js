app.controller("FinFabReqConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', 'FinFabReqConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $q, FinFabReqConfig) {
    var objBuyers = [];
    var objJobs = [];
    var self = this;
    var simulateQuery = false;
    FinFabReqConfig.GetAllBuyers(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["BuyerId"], display: val["BuyerName"] };
            objBuyers.push(vd);
        });

        self.BuyerList = objBuyers;
    });

    FinFabReqConfig.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];            
        }
    });

    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    function querySearch(query, qc) {

        if (qc == 'buyer') {

            self.list = self.BuyerList;
        }
        if (qc == 'job') {

            self.list = self.JobList;
        }
        
        var results = query ? self.list.filter(createFilter(query, self.list)) : self.list,
            deferred;
        if (simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    function createFilter(query, List) {
        var lowercaseQuery = query;
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) !== -1);
        };
    }
    $scope.OrderList = [];
    $scope.StyleList = [];
    function selectedItemChange(item, sc,i) {

        if (item) {
            if (sc == 'buyer') {
                $scope.selectedJob = null;
                $scope.OrderList.length = 0;
                $scope.StyleList.length = 0;
                $scope.Head.BuyerId = item.value;

                FinFabReqConfig.GetAllJobsByBuyer(item.value, function (data) {
                    objJobs = [];
                    if (data.length) {
                        angular.forEach(data, function (val, key) {
                            var vd = { value: val["Value"], display: val["DisplayName"] };
                            objJobs.push(vd);
                        });
                        self.JobList = objJobs;
                    } else {
                        self.JobList = [];
                    }
                });
            } else if (sc == 'job') {

                $scope.Head.JobId = item.value;
                $scope.StyleList = [];
                $scope.OrderList = [];
                FinFabReqConfig.GetAllStylesByBuyerAndJob($scope.Head.BuyerId, item.value, function (data) {

                    $scope.StyleList = data;
                    if (data.length == 1) {
                        $scope.Head.StyleId = data[0].Value;
                    }
                });
                FinFabReqConfig.GetAllOrdersByBuyerJobAndStyle($scope.Head.BuyerId, $scope.Head.JobId, -1, function (data) {
                    $scope.OrderList = data;
                    if (data.length == 1) {
                        $scope.Head.OrderId = data[0].Value;
                    }
                });
            }
            
        }
    }

    $scope.GetOrderByStyleId = function () {

        if ($scope.StyleList.length == 1) return;
        $scope.OrderList.length = 0;
        if (!$scope.Head.StyleId) return;
        FinFabReqConfig.GetAllOrdersByBuyerJobAndStyle($scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, function (data) {
         
            $scope.OrderList = data;
            if (data.length == 1) {
                $scope.Head.OrderId = data[0].Value;
            }
        });
    }
    //Table Start

    tableInitialState()
    function tableInitialState() {
        $scope.data = [{
            BodyPart: [], FabName: [], GSM: [], YarnComposition: [], Color: [], ColorCode: [], PantoneNo: [], FinFabReq: 0, Consumption: 0, GrFabMF: 0
        }
        ];
        $scope.Details = angular.copy($scope.data);
        $scope.btnSave = "Save";
    }

    $scope.actionDialog = function (action, dataModel) {
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
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Finished Fabric Requirement Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Finished Fabric Requirement Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Finished Fabric Requirement Configuration Data?' };
        }
        return obj;
    }
    function addRow() {
        var vd = {
            BodyPart: [], FabName: [], GSM: [], YarnComposition: [], Color: [], ColorCode: [], PantoneNo: [], FinFabReq: 0, Consumption: 0, GrFabMF: 0
        };
        $scope.Details.push(vd);
    }
    function deleteRow(index) {
        if ($scope.Details.length >= 1) $scope.Details.splice(index, 1);
    }
    //.................
    $scope.LoadDetails = function () {

       // loadAllData();
       
        loadAllData()
            .then(function (rest) {
                GetFinFabReqConfig();
            })
            .catch(function (fallback) {
                alert("failed, to load Fininished Fabric Reqquirements Configuration data !");
            });
        
    };
   
    var loadAllData = function () {
    //function loadAllData() {
        var deferred = $q.defer();

        FinFabReqConfig.GetBodyPartAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
            $scope.bodyPartList = data;

            FinFabReqConfig.GetFabricNameAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                $scope.fabricNameList = data;

                FinFabReqConfig.GetGSMAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                    $scope.GSMList = data;

                    FinFabReqConfig.GetYarnCompositionAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                        $scope.yarnCompositionList = data;


                        FinFabReqConfig.GetColorNameAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                            $scope.colorNameList = data;

                            FinFabReqConfig.GetColorCodeNameAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                                $scope.colorCodeList = data;

                                FinFabReqConfig.GetPantoneNoNameAll($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, function (data) {
                                    $scope.pantonNoList = data;

                                    deferred.resolve('success');
                                    
                                });
                            });


                        });

                    });

                });


            });
            
        });

        return deferred.promise;
    }

    function SaveUpdate() {

        $scope.Head.UserId = $rootScope.UserId;

        $scope.Head.ShipmentDate = moment($scope.Head.ShipmentDate).format('YYYY-MM-DD')
        for (var i = 0; i < $scope.Details.length; i++) {
            $scope.Details[i].BodyPartId = $scope.Details[i].BodyPartId.id;
            $scope.Details[i].FabNameId = $scope.Details[i].FabNameId.id;
            $scope.Details[i].GSMId = $scope.Details[i].GSMId.id;
            $scope.Details[i].YarnCompositionId = $scope.Details[i].YarnCompositionId.id;
            $scope.Details[i].ColorId = $scope.Details[i].ColorId.id;
            $scope.Details[i].ColorCodeId = $scope.Details[i].ColorCodeId.id;
            $scope.Details[i].PantonId = $scope.Details[i].PantonId.id;
            
        }
        $scope.Head.Details = $scope.Details;
        //alert(angular.toJson($scope.Head));
        FinFabReqConfig.FinFabReqConfig_SaveUpdate($scope.Head, function (data) {
            $rootScope.alert(data.Msg);
            Refresh();
        });
    }
    function GetFinFabReqConfig() {
        FinFabReqConfig.GetFinFabReqConfig($scope.Head.LoadingType, $scope.Head.BuyerId, $scope.Head.JobId, $scope.Head.StyleId, $scope.Head.OrderId, moment($scope.Head.ShipmentDate).format('YYYY-MM-DD'), function (response) {

        
            if (response.length > 0) {

                $scope.Details = response;
                $scope.Head.FfrmId = response[0]["FfrmId"];

                for (var i = 0; i < response.length; i++) {
                    $scope.Details[i].BodyPartId = $scope.bodyPartList.filter(elem => elem.id == response[i].BodyPartId)[0]
                    $scope.Details[i].FabNameId = $scope.fabricNameList.filter(elem => elem.id == response[i].FabNameId)[0]
                    $scope.Details[i].GSMId = $scope.GSMList.filter(elem => elem.id == response[i].GSMId)[0]
                    $scope.Details[i].YarnCompositionId = $scope.yarnCompositionList.filter(elem => elem.id == response[i].YarnCompositionId)[0]
                    $scope.Details[i].ColorId = $scope.colorNameList.filter(elem => elem.id == response[i].ColorId)[0]
                    $scope.Details[i].ColorCodeId = $scope.colorCodeList.filter(elem => elem.id == response[i].ColorCodeId)[0]
                    $scope.Details[i].PantonId = $scope.pantonNoList.filter(elem => elem.id == response[i].PantonId)[0]

                   // $scope.Details[i]. = $scope.objects.filter(elem => elem.id == 2)[0]
                }
                $scope.btnSave = "Update";
            }
            else {
                $scope.Head.FfrmId = 0;
                tableInitialState();
            }
        });
    }

    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        debugger;
        $scope.Head.StyleId = null;
        $scope.Head.OrderId = null;
        $scope.Head.JobId = null;
        $scope.Head.LoadingType = null;
        $scope.Head.ShipmentDate = null;
        $scope.selectedJob = null;
        tableInitialState();
        $scope.selectedBuyer = null;
        self.JobList = [];
        $scope.StyleList = [];

    }
}]);