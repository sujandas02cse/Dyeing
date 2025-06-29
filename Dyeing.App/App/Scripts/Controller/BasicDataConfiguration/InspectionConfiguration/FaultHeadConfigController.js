app.controller("FaultHeadConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'FaultHeadConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, FaultHeadConfig, $filter) {
   
    $scope.copyCount = 0;
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    
    GetFaultHead();
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
        $scope.btnSave = "Save";
        $scope.search = '';
        $scope.master.IsActive = true;
        $scope.selectedHead = [];
    };
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Fault Head Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Fault Head Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Fault Head Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        $scope.master.UserId = $rootScope.UserId;
        FaultHeadConfig.SaveUpdate($scope.master, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetFaultHead();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }
    function GetFaultHead() {
        FaultHeadConfig.GetFaultHead(function (data) {
            $scope.FaultHeadConfig = data; $scope.totalItems = data.length;
        });
    }
    $scope.GetFaultHeadByID = function (dataModel) {
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
        FaultHeadConfig.Delete(dataModel.HeadID, $rootScope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetFaultHead();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }
    function chkValidation() {
        //1=Valid, 0=Invalid
        var chkDup = $filter('filter')($scope.FaultHeadConfig, function (item) {
            return (item.HeadName.toLowerCase() == $scope.master.HeadName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].HeadID != $scope.master.HeadID || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
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