app.controller("FaultNameConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'FaultNameConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, FaultNameConfig, $filter) {
    $scope.UserId = window.localStorage.getItem('UserId');
    
    var objHeadName = [];
    var simulateQuery = false;
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    FaultNameConfig.GetFaultHead(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["HeadID"], display: val["HeadName"] };
            objHeadName.push(vd);
        });
    });
    self.HeadNameList = objHeadName;  
    $scope.querySearch = querySearch;
    function querySearch(query) {
        obj = objHeadName;
        self.list = self.HeadNameList;
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
    GetFaultName(0);
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    if (chkValidation() == "1")
                    SaveUpdate();
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }
    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        $scope.master = {};
        //$scope.selectedHead.value = null;
        $scope.btnSave = "Save";
        $scope.search = '';
        $scope.master.IsActive = true;
        $scope.selectedHead = [];
    };
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Fault Name Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Fault Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Fault Name Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        $scope.master.UserId = $scope.UserId;
        $scope.master.HeadID = $scope.selectedHead.value;
        FaultNameConfig.SaveUpdate($scope.master, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetFaultName(0);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }
    function GetFaultName(headId) {
        FaultNameConfig.GetFaultName(headId,function (data) {
            $scope.FaultHeadConfig = data; $scope.totalItems = data.length;
        });
    }
    $scope.GetFaultNameByID = function (dataModel) {
        if (dataModel.HeadName != null) {
            $scope.selectedHead = { value: dataModel.HeadID, display: dataModel.HeadName };
        }
        $scope.btnSave = "Update";
        $scope.master = dataModel;
    };
   
    // Start Pagination
    $scope.viewby = 10;

    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first paghe
    }
    function Delete(dataModel) {
        FaultNameConfig.Delete(dataModel.NameID, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetFaultName(0);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }
    function chkValidation() {
        //1=Valid, 0=Invalid
        var chkDup = $filter('filter')($scope.FaultHeadConfig, function (item) {
            return (item.FaultName.toLowerCase() == $scope.master.FaultName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].NameID != $scope.master.NameID || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }
}]);