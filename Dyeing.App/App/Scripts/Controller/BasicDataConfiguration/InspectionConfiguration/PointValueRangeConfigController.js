app.controller("PointValueRangeConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', 'PointValueRangeConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, PointValueRangeConfig, $filter) {
    $scope.UserId = window.localStorage.getItem('UserId');

    //$scope.Model.IsActive = 1;
    //-----Initialize Combo------------//
    GetPointHeadName();
    function GetPointHeadName() {
        PointValueRangeConfig.GetPointHeadName(function (data) {
            //alert(angular.toJson(data))
            $scope.PHeadName = data; $scope.totalItems = data.length;
        });
    }

    ////-----------Get Point System value range Information-----------------------//
    //-----------Get Trolley No Information-----------------------//
    GetPointValueRangeMInfo();
    function GetPointValueRangeMInfo() {
        PointValueRangeConfig.GetPointValueRangeMInfo(function (data) { $scope.PointSysteInfoA = data; $scope.totalItems = data.length; });
    };

    //-----Point Range Display--------//
    $scope.updateRange = function () {
        if ($scope.Model.ToValue != undefined) {
            if ($scope.Model.FromValue != undefined) {
                if ($scope.Model.FromValue <= $scope.Model.ToValue || $scope.Model.PHeadNo==23) {
                    $scope.Model.FromTo = $scope.Model.FromValue + '-' + $scope.Model.ToValue;
                }
                else {
                    $scope.Model.FromTo = '';
                    $rootScope.alert("From value should be less than To Value");
                }
            } else {
                $rootScope.alert("From value Required");
            }
        } else {
            $scope.Model.FromTo = '';
        }
    }
    $scope.fromRange = function () {
        if ($scope.Model.ToValue != undefined) {
            if ($scope.Model.FromValue < $scope.Model.ToValue || $scope.Model.PHeadNo == 23) {
                $scope.Model.FromTo = $scope.Model.FromValue + '-' + $scope.Model.ToValue;
            }
            else {
                $scope.Model.FromTo = '';
                $rootScope.alert("From value should be less than To Value");
            }
        }
    }
    //-----------Save/Update/Delete-------------------------------//
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Point Value Range Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Point Value Range Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Point Value Range Configuration Data?' };
        }
        return obj;
    }
    function Delete(dataModel) {
        PointValueRangeConfig.Delete(dataModel.PointValueNo, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetPointValueRangeMInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }
    function SaveUpdate() {

        if ($scope.btnSave == "Save") {
            $scope.Model.PointValueNo = 0;
            $scope.Model.UserId = $scope.UserId;
        }

        else {
            // $scope.Model.PprrId = 0;            
            $scope.Model.UserId = $scope.UserId;
        }
       
            PointValueRangeConfig.PointValueRange_SaveUpdate($scope.Model, function (data) {
                if (data.ErrorMsg == null) {
                    $rootScope.alert(data.Msg);
                    // $rootScope.Toast(data.Msg); 
                    GetPointValueRangeMInfo();
                    Refresh();
                }
                else $rootScope.alert(data.ErrorMsg);

            });
        
    }

    $scope.GetPointValueInfoByID = function (dataModel) {
        $scope.btnSave = "Update";
        $scope.Model = dataModel;
    };

    var vm = this;
    vm.reloadData = function () {
        $state.reload();
    };

    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        $scope.Model.PHeadNo = null;
        $scope.Model.FromValue = null;
        $scope.Model.ToValue = null;
        $scope.Model.FromTo = null;
        $scope.Model.Point = null;
        $scope.Model.IsActive = true;
        $scope.btnSave = "Save";
        $scope.search = '';
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
    function chkValidation() {
        var chkDup1 = $filter('filter')($scope.PointSysteInfoA, function (item) {
            return (item.FromTo == $scope.Model.FromTo)
                && (item.Point == $scope.Model.Point);
        }, true);
        var chkDup2 = $filter('filter')($scope.PointSysteInfoA, function (item) {
            return (item.PHeadNo == $scope.Model.PHeadNo)
                && (item.Point == $scope.Model.Point);
        }, true);
        var chkDup3 = $filter('filter')($scope.PointSysteInfoA, function (item) {
            return (item.PHeadNo == $scope.Model.PHeadNo)
                && (item.FromTo == $scope.Model.FromTo);
        }, true);
        if (($scope.btnSave == "Save" && chkDup1.length > 0) || ($scope.btnSave == "Save" && chkDup2.length > 0) || ($scope.btnSave == "Save" && chkDup3.length > 0)) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].PointValueNo != $scope.Model.PointValueNo || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }


}]);