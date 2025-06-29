app.controller("MachineProductionPlanCloseController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'MachineProductionPlanClose', function ($scope, $rootScope, $mdDialog, $mdToast, MachineProductionPlanClose) {
    var objPlanNo = [];
    var objBatchNo = [];
    var simulateQuery = false;
    $scope.UserId = window.localStorage.getItem('UserId');
    $scope.querySearch = querySearch;
    function querySearch(query, cn) {
        debugger;
        if (cn == 'plan') {
            obj = objPlanNo;
            self.list = self.PlanNoList;
        }
        if (cn == 'batch') {
            obj = objBatchNo;
            self.list = self.BatchNoList;
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
    $scope.Refresh = function () {
        $scope.selectedPlanNo = null;
        $scope.selectedBatchNo = null;
        Refresh();
    }
    function Refresh() {
        $scope.model = null;
        $scope.btnSave = "Save";
        $scope.selectedPlanNo = null;
        $scope.selectedBatchNo = null;
    };
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
            $scope.selectedBatchNo = { value: item.value, display: item.display1, display1: item.display };
            MachineProductionPlanClose.GetPlanInfo($scope.MppmId, function (data) {
                $scope.model = data[0];
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
    MachineProductionPlanClose.GetPlanNo(0, function (data) {
        debugger;
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MppmId"], display: val["PlanNo"], display1: val["BatchNo"] };
            var vd1 = { value: val["MppmId"], display1: val["PlanNo"], display: val["BatchNo"] };
            objPlanNo.push(vd);
            objBatchNo.push(vd1);
        });
    });
    self.PlanNoList = objPlanNo;
    self.BatchNoList = objBatchNo;
    $scope.ChangeControl = function () {
        $scope.searchPlanNo = null;
        $scope.selectedBatchNo = null;
        objPlanNo = [];
        objBatchNo = [];
       
       // $scope.model.PlanStatus = $scope.PlanStatus;
        MachineProductionPlanClose.GetPlanNo($scope.PlanStatusBit, function (data) {
            angular.forEach(data, function (val, key) {
                var vd = { value: val["MppmId"], display: val["PlanNo"], display1: val["BatchNo"] };
                var vd1 = { value: val["MppmId"], display1: val["PlanNo"], display: val["BatchNo"] };
                objPlanNo.push(vd);
                objBatchNo.push(vd1);
            });
        });
        self.PlanNoList = objPlanNo;
        self.BatchNoList = objBatchNo;
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
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });

    }
    function SaveUpdate() {
        $scope.model.UserId = $scope.UserId;
        $scope.model.MppmId = $scope.selectedPlanNo.value;
        $scope.model.PlanStatus = $scope.PlanStatusBit;
        MachineProductionPlanClose.SaveUpdate($scope.model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }
    function objData(action) {
        var obj = [];
        if ($scope.PlanStatusBit == 1) {
            if (action == 'Save') {
                obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to Active the plan?' };
            } else if (action == 'Update') {
                obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Name Configuration Data?' };
            } else if (action == 'Delete') {
                obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Name Configuration Data?' };
            }
        } else {
            if (action == 'Save') {
                obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to Close the plan?' };
            } else if (action == 'Update') {
                obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Name Configuration Data?' };
            } else if (action == 'Delete') {
                obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Name Configuration Data?' };
            }
        }
        return obj;
    }

}]);