app.controller("FinishingSpecConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'FinishingSpecConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, FinishingSpecConfig) {
    //alert("Hello Boss")
    $scope.UserId = window.localStorage.getItem('UserId');
    Get_SpecificationConfig();
    function Get_SpecificationConfig() {

        FinishingSpecConfig.Get_SpecificationConfig(function (data) { $scope.SpecificationConfig = data; $scope.totalItems = data.length; });
    };
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    FinishingSpecConfig.Get_SpecificationConfig(function (data) {
                        $scope.SpecificationConfig = data;
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
        var chkDup = $filter('filter')($scope.SpecificationConfig, function (item) {
            return (item.SpecificationName.toLowerCase() == $scope.Model.SpecificationName.toLowerCase());
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Specification Not Allowed, Please! Enter Valid Specification.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].FbscId != $scope.Model.FbscId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Specification Not Allowed, Please! Enter Valid Specification.....");
                return "0";
            }
        }
        return "1";
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Finishing Specification Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Finishing Specification Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Finishing Specification Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.FbscId = 0;
        else
            // $scope.Model.PprrId = 0;
            $scope.Model.UserId = $scope.UserId;
        FinishingSpecConfig.SpecificationConfig_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Get_SpecificationConfig();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        FinishingSpecConfig.SpecificationConfig_Delete(dataModel.FbscId, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Get_SpecificationConfig();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetSpecificationConfigForEdit = function (dataModel) {
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