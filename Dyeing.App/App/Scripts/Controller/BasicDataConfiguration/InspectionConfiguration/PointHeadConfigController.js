app.controller("PointHeadConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'PointHeadConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, PointHeadConfig, $filter) {
    //alert("Hello Boss")
    $scope.UserId = window.localStorage.getItem('UserId');
    $scope.copyCount = 0;

    GetPointHeadInfo();
    function GetPointHeadInfo() {

        PointHeadConfig.GetPointHeadInfo(function (data) { $scope.PointHeadInfo = data; $scope.totalItems = data.length; });
    };
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
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Point Head Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Point Head Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Point Head Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save") {
            $scope.Model.PHeadNo = 0;
            $scope.Model.UserId = $scope.UserId;
        }

        else {
            // $scope.Model.PprrId = 0;            
            $scope.Model.UserId = $scope.UserId;
        }
        PointHeadConfig.PointHead_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetPointHeadInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetPointHeadInfoByID = function (dataModel) {
        $scope.btnSave = "Update";
        $scope.Model = dataModel;
    };

    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        $scope.Model = {};
        $scope.btnSave = "Save";
        $scope.search = '';
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

    function chkValidation() {
        //1=Valid, 0=Invalid
        var chkDup = $filter('filter')($scope.PointHeadInfo, function (item) {
            return (item.PointHeadName.toLowerCase() == $scope.Model.PointHeadName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].PHeadNo != $scope.Model.PHeadNo || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }
    function Delete(dataModel) {
        PointHeadConfig.Delete(dataModel.PHeadNo, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetPointHeadInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }
}]);