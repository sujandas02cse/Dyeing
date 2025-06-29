app.controller("MachineCapacityConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'MachineCapacityConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, MachineCapacityConfig) {
   
    GetMachineCapacityInfo();
    function GetMachineCapacityInfo() {
        MachineCapacityConfig.GetMachineCapacityInfo(function (data) { $scope.MachineCapacity = data; $scope.totalItems = data.length; });
    };
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    MachineCapacityConfig.GetMachineCapacityInfo(function (data) {
                        $scope.MachineCapacity = data;
                        if (chkValidation() == "1")
                            SaveUpdate();
                    });
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Machine Capacity Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Capacity Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Capacity Configuration Data?' };
        }
        return obj;
    }
    function chkValidation() {
        //1=Valid, 0=Invalid        
        var chkDup = $filter('filter')($scope.MachineCapacity, function (item) {
            return item.CapacityName == $scope.Model.CapacityName;
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Capacity Not Allowed, Please! Enter Valid Machine Capacity.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].MCapacityId != $scope.Model.MCapacityId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Capacity Not Allowed, Please! Enter Valid Machine Capacity.....");
                return "0";
            }
        }
        return "1";
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.MCapacityId = 0;       

        $scope.Model.UserId = $rootScope.UserId;       
        MachineCapacityConfig.MachineCapacity_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetMachineCapacityInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        MachineCapacityConfig.MachineCapacity_Delete(dataModel.MCapacityId, $rootScope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetMachineCapacityInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetMachineCapacityInfoByID = function (dataModel) {
        $scope.btnSave = "Update";
        $scope.Model = dataModel;
    };

    $scope.Refresh = function () {
        Refresh();
        $scope.search = '';
    }
    function Refresh() {
        $scope.Model = {};
        $scope.btnSave = "Save";
        $scope.Model.IsActive = true;
    };

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

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
    // End Pagination

}]);