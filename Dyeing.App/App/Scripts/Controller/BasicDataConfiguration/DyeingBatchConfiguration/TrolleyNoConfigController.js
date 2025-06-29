app.controller("TolleyNoConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'filterFilter', 'TolleyNoConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, filterFilter, TolleyNoConfig) {

    $scope.UserId = window.localStorage.getItem('UserId');

    //-----Initialize Combo------------//
    GetUnitName();
    
    function GetUnitName() {       
        TolleyNoConfig.GetUnitName(function (data) {
            //alert(angular.toJson(data))
            $scope.Unit = data; $scope.totalItems = data.length;
        });
    }  

    //-----------Get Trolley No Information-----------------------//
    GetTrolleyNoInfo();
    function GetTrolleyNoInfo() {
        TolleyNoConfig.GetTrolleyNoInfo(function (data) { $scope.TolleyNoInf = data; $scope.totalItems = data.length; });
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
                    TolleyNoConfig.GetTrolleyNoInfo(function (data) {
                        $scope.TolleyNoInf = data;
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
        var chkDup = $filter('filter')($scope.TolleyNoInf, function (item) {
            return (item.UnitId == $scope.Model.UnitId && item.TrolleyNo == $scope.Model.TrolleyNo);
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Trolley No Not Allowed, Please! Enter Valid Trolley No.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].TncId != $scope.Model.TncId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Trolley No Not Allowed, Please! Enter Valid Trolley No.....");
                return "0";
            }
        }
        return "1";
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Trolley No Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Trolley No Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Trolley No Configuration Data?' };
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
        TolleyNoConfig.TrolleyNo_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                // $rootScope.Toast(data.Msg); 
                GetTrolleyNoInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        //alert("The Id is : "+dataModel.MfcId)
        TolleyNoConfig.TrolleyNo_Delete(dataModel.TncId, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                //$rootScope.Toast(data.Msg);
                $rootScope.alert(data.Msg);
                GetTrolleyNoInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }


    $scope.GetTrolleyNoInfoByID = function (dataModel) {
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