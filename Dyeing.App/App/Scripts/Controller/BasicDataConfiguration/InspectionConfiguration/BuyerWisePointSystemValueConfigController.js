app.controller("BuyerWisePointSystemValueConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', 'BuyerWisePointSystemValueConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $q, BuyerWisePointSystemValueConfig) {
    var objBuyers = [];
    var self = this;
    $scope.items = [];
    var simulateQuery = false;
    BuyerWisePointSystemValueConfig.GetAllBuyers(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["BuyerId"], display: val["BuyerName"] };
            objBuyers.push(vd);
        });

        self.BuyerList = objBuyers;
   
    });
    BuyerWisePointSystemValueConfig.GetPointSystemNames(function (data) {
        self.PointSystemNameList = data;
       
    }); 
   
    //............
    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item.id);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item.id);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item.id) > -1;
    };
    $scope.isIndeterminate = function () {
        return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.items.length);
    };
    $scope.isChecked = function () {
        if ($scope.items.length == 0) return false;
        return $scope.selected.length === $scope.items.length;
    };
    $scope.toggleAll = function () {

        if ($scope.selected.length === $scope.items.length) {
            
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
           
            angular.forEach($scope.items, function (val, key) {

                var idx = $scope.selected.indexOf(val["id"]);
                if (!(idx > -1)) {
                    $scope.selected.push(val["id"]);
                }
            }); 
        }
    };
    //..............
 
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    function querySearch(query, qc) {

        if (qc == 'buyer') {

            self.list = self.BuyerList;
        }
        if (qc == 'psname') {

            self.list = self.PointSystemNameList;
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
        var lowercaseQuery = query.toLowerCase();
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) !== -1);
        };
    }
    function selectedItemChange(item, sc) {

        if (item) {
            if (sc == 'buyer') {
                $scope.Model.BuyerId = item.value;
            } 
            if (sc == 'psname') {
                $scope.Model.PointSystemNo = item.value;
                GetDetails();
            }
        }
    }

    $scope.actionDialog = function (action, dataModel) {
        if (action == 'AddNewRow') {
           
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Buyer Wise Point System Value Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Buyer Wise Point System Value Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Buyer Wise Point System Value Configuration Data?' };
        }
        return obj;
    }
 
    function SaveUpdate() {

        $scope.Model.CreateBy = $rootScope.UserId;
        $scope.Model.FCHID = $scope.selected.toString();
     
        //alert(angular.toJson($scope.Model));
        BuyerWisePointSystemValueConfig.BuyerWisePointSystemValue_SaveUpdate($scope.Model, function (data) {
            $rootScope.alert(data.Msg);
            //location.reload();
            Refresh();
        });
    }
    function GetDetails() {
        if ($scope.Model.BuyerId == '')
            return;
        BuyerWisePointSystemValueConfig.GetBuyerWisePointSystemValue($scope.Model.BuyerId, $scope.Model.PointSystemNo, function (data) {
            $scope.items = data;
            angular.forEach(data, function (val, key) {
                if (val["fstatus"] == 'true')
                    $scope.selected.push(val["id"]);
                $scope.btnSave = "Update";
            });
            
        });
    }

    $scope.Refresh = function () {
        Refresh();
    };
    function Refresh(){
        $scope.selectedBuyer = null;
        $scope.selectedPoint = null;
        $scope.items = [];
        $scope.selected = [];
        $scope.btnSave = "Save";
    }

}]);