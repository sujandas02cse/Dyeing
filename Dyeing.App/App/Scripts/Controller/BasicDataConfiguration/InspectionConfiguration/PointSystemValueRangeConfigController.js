app.controller("PointSystemValueRangeConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', 'PointSystemValueRangeConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, PointSystemValueRangeConfig, $filter) {

    $scope.UserId = window.localStorage.getItem('UserId');

    //-----Initialize Combo------------//
    GetPointSystemName();
    function GetPointSystemName() {
        PointSystemValueRangeConfig.GetPointSystemName(function (data) {
            //alert(angular.toJson(data))
            $scope.PSystemName = data; $scope.totalItems = data.length;
        });
    }

    ////-----------Get Point System value range Information-----------------------//
    //-----------Get Trolley No Information-----------------------//
    GetPointSystemValueRangeInfo();
    function GetPointSystemValueRangeInfo() {
        PointSystemValueRangeConfig.GetPointSystemValueInfo(function (data) { $scope.PointSysteInfoA = data; $scope.totalItems = data.length; });
    };

    //-----Point Range Display--------//
    $scope.updateRange = function () {
        //$scope.Model.PointRange = $scope.Model.FromPoint + ' - ' + $scope.Model.ToPoint;
        if ($scope.Model.ToPoint != undefined) {
            if ($scope.Model.FromPoint != undefined) {
                if ($scope.Model.FromPoint <= $scope.Model.ToPoint) {
                    $scope.Model.PointRange = $scope.Model.FromPoint + '-' + $scope.Model.ToPoint;
                }
                else {
                    $scope.Model.PointRange = '';
                    $rootScope.alert("From value should be less than To Value");
                }
            } else {
                $rootScope.alert("From value Required");
            }
        } else {
            $scope.Model.PointRange = '';
        }
    }
    $scope.fromRange = function () {
        if ($scope.Model.ToPoint != undefined) {
            if ($scope.Model.FromPoint < $scope.Model.ToPoint) {
                $scope.Model.PointRange = $scope.Model.FromPoint + '-' + $scope.Model.ToPoint;
            }
            else {
                $scope.Model.PointRange = '';
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Point System Value Range Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Point System Value Range Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Point System Value Range Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {

        if ($scope.btnSave == "Save") {
            $scope.Model.PointValueRangeNo = 0;
            //$scope.Model.PointSystemNo = 0;
            $scope.Model.UserId = $scope.UserId;
        }

        else {
            // $scope.Model.PprrId = 0;            
            $scope.Model.UserId = $scope.UserId;
        }

        //alert(angular.toJson($scope.Model))
        PointSystemValueRangeConfig.PointSystemValueRange_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                // $rootScope.Toast(data.Msg); 
                GetPointSystemValueRangeInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetPointSystemValueInfoByID = function (dataModel) {
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
        $scope.Model = null;
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
            return (item.PointRange == $scope.Model.PointRange)
                && (item.GradeNo == $scope.Model.GradeNo);
        }, true);
        var chkDup2 = $filter('filter')($scope.PointSysteInfoA, function (item) {
            return (item.PointSystemNo == $scope.Model.PointSystemNo)
                && (item.GradeNo == $scope.Model.GradeNo);
        }, true);
        var chkDup3 = $filter('filter')($scope.PointSysteInfoA, function (item) {
            return (item.PointRange == $scope.Model.PointRange)
                && (item.PointSystemNo == $scope.Model.PointSystemNo);
        }, true);
        if (($scope.btnSave == "Save" && chkDup1.length > 0) || ($scope.btnSave == "Save" && chkDup2.length > 0) || ($scope.btnSave == "Save" && chkDup3.length > 0)) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        }
        //else if ($scope.btnSave == "Update" && chkDup.length > 0) {
        //    if (chkDup[0].PointSystemNo != $scope.Model.PointSystemNo || chkDup.length > 1) {
        //        $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
        //        return "0";
        //    }
        //}
        return "1";
    }
    function Delete(dataModel) {
        PointSystemValueRangeConfig.Delete(dataModel.PointValueRangeNo, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetPointSystemValueRangeInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }
}]);