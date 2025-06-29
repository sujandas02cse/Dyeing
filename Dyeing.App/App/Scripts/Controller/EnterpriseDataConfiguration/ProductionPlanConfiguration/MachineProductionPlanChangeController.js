app.controller("MachineProductionPlanChangeController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'MachineProductionPlanChange', function ($scope, $rootScope, $mdDialog, $mdToast, MachineProductionPlanChange) {
    var objPlanNo = [];
    var objBatchNo = [];
    var objToMcNo = [];
    var simulateQuery = false;
   
    $scope.UserId = window.localStorage.getItem('UserId');
    MachineProductionPlanChange.GetPlanNo(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MppmId"], display: val["PlanNo"], display1: val["BatchNo"] };
            objPlanNo.push(vd);
        });
    });
    self.PlanNoList = objPlanNo;
    MachineProductionPlanChange.GetBatchNo(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MppmId"], display: val["BatchNo"], display1: val["PlanNo"] };
            objBatchNo.push(vd);
        });
    });
    
    self.BatchNoList = objBatchNo;
    $scope.cngPlanQty = function () {
        if ($scope.model.ToCapacityName != undefined) {
            if ($scope.model.PlanQty != '') {
                if ($scope.model.ToCapacityName < $scope.model.PlanQty) {
                    $scope.model.PlanQty = '';
                    $rootScope.alert("Plan Qty can't be greater than Capacity");
                }
            }
        } else {
            $rootScope.alert("Capacity required");
        }
    };
    $scope.querySearch = querySearch;
    function querySearch(query, cn) {
        if (cn == 'plan') {
            obj = objPlanNo;
            self.list = self.PlanNoList;
        }
        if (cn == 'batch') {
            obj = objBatchNo;
            self.list = self.BatchNoList;
        }
        if (cn == 'ToMc') {
            obj = objToMcNo;
            self.list = self.ToMcNoList;
        }
        
        var results = query ? self.list.filter(createFilter(query, obj)) : self.list,
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
        var lowercaseQuery = query.toLowerCase();
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }
    $scope.selectedPlanChange = selectedPlanChange;
    function selectedPlanChange(item) {
        if (item) {
            $scope.MppmId = item.value;
            $scope.selectedBatchNo = { value: item.value, display: item.display1, display1: item.display};
            MachineProductionPlanChange.GetPlanInfo($scope.MppmId, function (data) {
                $scope.model = data[0];
                $scope.model.PlanQtyOld = $scope.model.PlanQty;
                $scope.model.FMId = $scope.model.FMId;
                $scope.model.PlanDate = moment($scope.model.PlanDate).format('DD-MMM-YYYY');
                $scope.model.ToMcDate = moment($scope.model.ToMcDate).format('DD-MMM-YYYY');
                MachineProductionPlanChange.GetToMcNo($scope.UserId, function (data1) {
                    angular.forEach(data1, function (val, key) {
                        var vd = { value: val["MDId"], display: val["MachineNo"], CapacityName: val["CapacityName"] };
                        objToMcNo.push(vd);
                    });
                });
            });
        }
        else {
            $scope.model = null;
        }
    }
    $scope.selectedBatchChange = selectedBatchChange;
    function selectedBatchChange(item) {
        //if (item) {
        //    debugger;
        //    $scope.MppmId = item.value;
        //   // $scope.searchPlanNo = { value: item.value, display: item.display1, display1: item.display };
        //    MachineProductionPlanChange.GetPlanInfo($scope.MppmId, function (data) {
        //        $scope.model = data[0];
        //        $scope.model.PlanDate = moment($scope.model.PlanDate).format('DD-MMM-YYYY');
        //        MachineProductionPlanChange.GetToMcNo($scope.UserId, function (data1) {
        //            angular.forEach(data1, function (val, key) {
        //                var vd = { value: val["MDId"], display: val["MachineNo"], CapacityName: val["CapacityName"] };
        //                objToMcNo.push(vd);
        //            });
        //        });
        //    });
        //}
    }
    self.ToMcNoList = objToMcNo;
    $scope.actionDialog = function (action, dataModel) {
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
    function SaveUpdate() {
        $scope.model.MppchId = 0;
        $scope.model.UserId = $scope.UserId;
        $scope.model.MppmId = $scope.selectedPlanNo.value;
        $scope.model.TMId = $scope.selectedMachineNo.value;
        $scope.model.ToMcDate = moment($scope.model.ToDate ).format('DD-MMM-YYYY');
        MachineProductionPlanChange.SaveUpdate($scope.model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }
    $scope.selectedMachineNoChange = selectedMachineNoChange;
    function selectedMachineNoChange(item) {
        if (item) {
            //$scope.model.PlanQty = '';
            if (item.display == $scope.model.MachineNo) {
                $scope.selectedMachineNo = null;
                var msg = "From m/c and to m/c can't be same";
                $rootScope.alert(msg);
            } else {
                $scope.model.ToCapacityName = item.CapacityName;
                $scope.model.BalanceQty = $scope.model.CapacityName - $scope.model.ToCapacityName;
            }
        }
    }
    $scope.Refresh = function () {
        $scope.selectedPlanNo = null;
        $scope.selectedBatchNo = null;
        Refresh();
    }
    function Refresh() {
        $scope.model = null;
        $scope.btnSave = "Save";
        $scope.selectedMachineNo = null;
        $scope.selectedPlanNo = null;
        $scope.selectedBatchNo = null;
    };
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to change the production plan?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Name Configuration Data?' };
        }
        return obj;
    }
}]);