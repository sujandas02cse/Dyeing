//var app1 = angular.module('MascoDyeing', []);
app.controller("MachineNameConfigController", ['$scope', '$rootScope', 'filterFilter', '$filter', '$state', '$mdDialog', 'MachineConfig', function ($scope, $rootScope, filterFilter, $filter, $state, $mdDialog, MachineConfig) {
    GetMachineInfo('0', 'Name');
    function GetMachineInfo(MId, Category) {
        MachineConfig.GetMachineInfo(MId, Category, function (data) {
            $scope.MachineInfo = data; $scope.totalItems = data.length;
        });
    };
    $scope.actionDialog = function (action, dataModel) {        
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {                    
                    MachineConfig.GetMachineInfo('0','Name',function (data) {
                        //debugger;
                        $scope.MachineInfo = data;
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Machine Name Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Name Configuration Data?' };
        }
        return obj;
    }
    function chkValidation() {
        //1=Valid, 0=Invalid        
        var chkDup = $filter('filter')($scope.MachineInfo, function (item) {
            return (item.MachineEng.toLowerCase() == $scope.Model.MachineEng.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].MId != $scope.Model.MId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }

    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.MId = 0;        

        $scope.Model.UserId = $rootScope.UserId;
        $scope.Model.Category = "Name";
        MachineConfig.MachineInfo_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {                
                $rootScope.alert(data.Msg);
                GetMachineInfo('0', 'Name');
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

     function Delete(dataModel) {    
         MachineConfig.MachineInfo_Delete(dataModel.MId, dataModel.Category, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetMachineInfo('0', 'Name');
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetMachineInfoByID = function (dataModel) {
        $scope.btnSave = "Update";
        $scope.Model = dataModel;
    };

    var vm = this;
    vm.reloadData = function () {
        $state.reload();
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