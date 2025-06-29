app.controller("GSMNameConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'filterFilter', 'GSMNameConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, filterFilter, GSMNameConfig) {

    $scope.UserId = window.localStorage.getItem('UserId');

    //-----------Get GSM Name Information-----------------------//
    GetGSMNameInfo();
    function GetGSMNameInfo() {
        GSMNameConfig.GetGSMNameInfo(function (data) { $scope.GSMNameInfo = data; $scope.totalItems = data.length; });
    };

    //-----------Save/Update/Delete-------------------------------//
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    GSMNameConfig.GetGSMNameInfo(function (data) {
                        $scope.GSMNameInfo = data;
                        if (chkValidation() == "1")
                            SaveUpdate();
                    });
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }

    function chkValidation() {
        //1=Valid, 0=Invalid        
        var chkDup = $filter('filter')($scope.GSMNameInfo, function (item) {
            return (item.GSMName.toLowerCase() == $scope.Model.GSMName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate GSM Not Allowed, Please! Enter Valid GSM.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].GsmId != $scope.Model.GsmId || chkDup.length > 1) {
                $rootScope.alert("Duplicate GSM Not Allowed, Please! Enter Valid GSM.....");
                return "0";
            }
        }
        return "1";
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save GSM Name Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update GSM Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete GSM Name Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {

        if ($scope.btnSave == "Save") {
            $scope.Model.GsmId = 0;
            $scope.Model.UserId = $scope.UserId;
        }

        else {
            // $scope.Model.PprrId = 0;            
            $scope.Model.UserId = $scope.UserId;
        }

        //alert(angular.toJson($scope.Model))
        GSMNameConfig.GSMName_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                // $rootScope.Toast(data.Msg); 
                GetGSMNameInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetGSMNameInfoByID = function (dataModel) {
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


}]);