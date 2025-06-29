app.controller("PointSystemNameConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'PointSystemNameConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, PointSystemNameConfig, $filter) {
    //alert("Hello Boss")
    $scope.UserId = window.localStorage.getItem('UserId');

    GetPointSystemNameInfo();
    function GetPointSystemNameInfo() {

        PointSystemNameConfig.GetPointSystemNameInfo(function (data) { $scope.PointSystemName = data; $scope.totalItems = data.length; });
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Point System Name Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Point System Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Point System Name Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save") {
            $scope.Model.PHeadNo = 0;
            $scope.Model.UserId = $scope.UserId;
        }
        else {                      
            $scope.Model.UserId = $scope.UserId;
        }


        PointSystemNameConfig.PointSystemName_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetPointSystemNameInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetPointSystemNameInfoByID = function (dataModel) {
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
        var chkDup = $filter('filter')($scope.PointSystemName, function (item) {
            return (item.PointSystemName.toLowerCase() == $scope.Model.PointSystemName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].PointSystemNo != $scope.Model.PointSystemNo || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }
    function Delete(dataModel) {        
        dataModel.UserId = $rootScope.UserId;
        PointSystemNameConfig.Delete(dataModel).then(function (res) {
            //alert(angular.toJson(data))
            if (res.data.ErrorMsg == null) {
                $rootScope.alert(res.data.Msg);
                GetPointSystemNameInfo();
                Refresh();
            }
            else $rootScope.alert(res.data.ErrorMsg);           
        });
    }

}]);