app.controller("UnitWiseInspectionMCConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', 'UnitWiseInspectionMCConfig', '$filter', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, UnitWiseInspectionMCConfig, $filter) {

    $scope.UserId = window.localStorage.getItem('UserId');

    //-----Initialize Combo------------//
    GetUnitName();

    function GetUnitName() {
        UnitWiseInspectionMCConfig.GetUnitName(function (data) {
            //alert(angular.toJson(data))
            $scope.Unit = data; $scope.totalItems = data.length;
        });
    }

    //-----------Get Trolley No Information-----------------------//
    GetUnitWiseInspectionMCInfo();
    function GetUnitWiseInspectionMCInfo() {
        UnitWiseInspectionMCConfig.GetUnitWiseInspectionMCInfo(function (data) { $scope.UnitWiseInfo = data; $scope.totalItems = data.length; });
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Unit Wise Inspection M/C Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Unit Wise Inspection M/C Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Unit Wise Inspection M/C Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {

        if ($scope.btnSave == "Save") {
            $scope.Model.TncId = 0;
            $scope.Model.UserId = $scope.UserId;
        }

        else {
            // $scope.Model.PprrId = 0;            
            $scope.Model.UserId = $scope.UserId;
        }

        //alert(angular.toJson($scope.Model))
        UnitWiseInspectionMCConfig.UnitWiseInspectionMCInfo_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                // $rootScope.Toast(data.Msg); 
                GetUnitWiseInspectionMCInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetUnitWiseInspectionMCByID = function (dataModel) {
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
    function chkValidation() {
        var chkDup = $filter('filter')($scope.UnitWiseInfo, function (item) {
            return (item.UnitId == $scope.Model.UnitId)
                && (item.InspMNo == $scope.Model.InspMNo);
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].UimId != $scope.Model.UimId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Name Not Allowed, Please! Enter Valid Name.....");
                return "0";
            }
        }
        return "1";
    }
    function Delete(dataModel) {
        //alert(dataModel.UimId);
        dataModel.UserId = $rootScope.UserId;
        UnitWiseInspectionMCConfig.Delete(dataModel).then( function (res) {
            if (res.data.ErrorMsg == null) {
                $rootScope.alert(res.data.Msg); 
                GetUnitWiseInspectionMCInfo();
                Refresh();
            }
            else $rootScope.alert(res.data.ErrorMsg);
            //$rootScope.alert(data.Msg);
            GetUnitWiseInspectionMCInfo();
            Refresh();
        });
    }

}]);