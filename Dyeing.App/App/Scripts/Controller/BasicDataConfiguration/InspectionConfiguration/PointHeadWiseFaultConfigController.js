app.controller("PointHeadWiseFaultConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'PointHeadWiseFaultConfig', function ($scope, $rootScope, $mdDialog, $mdToast, PointHeadWiseFaultConfig) {
    $scope.UserId = window.localStorage.getItem('UserId');
    var objPHeadName = [];
    var simulateQuery = false;
    $scope.chk = false;
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    PointHeadWiseFaultConfig.GetPointHead(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["PHeadNo"], display: val["PointHeadName"] };
            objPHeadName.push(vd);
        });
    });
    self.PHeadNameList = objPHeadName;
    $scope.querySearch = querySearch;
    function querySearch(query) {
        obj = objPHeadName;
        self.list = self.PHeadNameList;
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
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    if ($scope.master.selectedHead == null) {
                        $rootScope.alert("Select Point Head Name");
                    } else {
                        SaveUpdate();
                    }
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }
    $scope.selectedHeadChange = selectedHeadChange;
    function selectedHeadChange(item) {
        if (item) {
            GetFaultName(item.value);
        }
    }
    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        $scope.master = null;
        GetFaultName(0);
        $scope.btnSave = "Save";
    };
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Point Head Wise Fault Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Point Head Wise Fault Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Point Head Wise Fault Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        //PointHeadWiseFaultConfig
        //$scope.master.UserId = $scope.UserId;
        //$scope.master.PHeadNo = $scope.selectedHead.value;
        
            $scope.PointHeadWiseFaultConfig = [];
            for (var i = 0; i < $scope.details.length; i++) {
                if ($scope.details[i].IsActive == true) {
                    var vd = { NameID: $scope.details[i].NameID };
                    $scope.PointHeadWiseFaultConfig.push(vd);
                }
            }
            $scope.master.lDetails = $scope.PointHeadWiseFaultConfig;
            $scope.master.UserId = $rootScope.UserId;
            $scope.master.PHeadNo = $scope.master.selectedHead.value;
            // var vdM = { UserId: $scope.UserId, PHeadNo: $scope.selectedHead.value, lDetails: $scope.PointHeadWiseFaultConfig };

            PointHeadWiseFaultConfig.SaveUpdate($scope.master, function (data) {
                if (data.ErrorMsg == null) {
                    $rootScope.alert(data.Msg);
                    GetFaultName(0);
                    Refresh();
                }
                else $rootScope.alert(data.ErrorMsg);
            });
        
    }
    GetFaultName(0);
    function GetFaultName(PheadId) {
        PointHeadWiseFaultConfig.GetFaultName(PheadId, function (data) {
            $scope.count = 0;
            $scope.details = data;
            for (var i = 0; i < data.length; i++) {
                $scope.details[i].IsActive = Boolean(Number(data[i].IsActive));
                if ($scope.details[i].IsActive == true) {
                    $scope.count = $scope.count + 1;
                }
            }
            if ($scope.count > 0) {
                if ($scope.count == data.length) {
                    $scope.chk = true;
                }
                else {
                    $scope.chk = false;
                }
                $scope.btnSave = "Update";
            } else {
                $scope.chk = false;
                $scope.btnSave = "Save";
            }
            
        });
    }
    $scope.GetFaultNameByID = function (dataModel) {
        if (dataModel.HeadName != null) {
            $scope.master.selectedHead = { value: dataModel.HeadID, display: dataModel.HeadName };
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
    $scope.chkAll = function () {
        if ($scope.chk) {
            for (var i = 0; i < $scope.details.length; i++) {
                $scope.details[i].IsActive = Boolean(1);
            }
        } else {
            for (var i = 0; i < $scope.details.length; i++) {
                $scope.details[i].IsActive = Boolean(0);
            }
        }
    }
}]);