app.controller("LightSourceEnlishmentController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'filterFilter', 'LightSourceConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, filterFilter, LightSourceConfig) {

    $scope.UserId = $rootScope.UserId;

    //================ GET ALL LIGHT SOURCE =================//
    GetLightSourceInfo();

    function GetLightSourceInfo() {

        LightSourceConfig.GetLightSource(function (data) {
            $scope.LightSourceInfo = data;
            $scope.totalItems = data.length;
        });
    };

    //================ ACTION DIALOG =================//
    $scope.actionDialog = function (action, dataModel) {

        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })
        ).then(function (mode) {

            if (mode == 'Update' || mode == 'Save') {

                LightSourceConfig.GetLightSource(function (data) {
                    $scope.LightSourceInfo = data;

                    if (chkValidation() == "1")
                        SaveUpdate();
                });

            } else if (mode == 'Delete') {
                Delete(dataModel);
            }
        });
    };

    //================ DUPLICATE VALIDATION =================//
    function chkValidation() {

        var chkDup = $filter('filter')($scope.LightSourceInfo,
            function (item) {
                return (item.LightSourceName ==
                    $scope.Model.LightSourceName);
            }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Light Source Not Allowed!");
            return "0";
        }
        else if ($scope.btnSave == "Update" && chkDup.length > 0) {

            if (chkDup[0].Id != $scope.Model.Id || chkDup.length > 1) {
                $rootScope.alert("Duplicate Light Source Not Allowed!");
                return "0";
            }
        }

        return "1";
    }

    //================ CONFIRM MESSAGE =================//
    function objData(action) {

        var obj = [];

        if (action == 'Save') {
            obj = { Mode: 'Save', btnText: 'Yes', Header: 'Save Confirmation', message: 'Do you want to save Light Source Data?' };
        }
        else if (action == 'Update') {
            obj = { Mode: 'Update', btnText: 'Yes', Header: 'Update Confirmation', message: 'Do you want to update Light Source Data?' };
        }
        else if (action == 'Delete') {
            obj = { Mode: 'Delete', btnText: 'Yes', Header: 'Delete Confirmation', message: 'Do you want to delete Light Source Data?' };
        }
        return obj;
    }

    //================ SAVE / UPDATE =================//
    function SaveUpdate() {

            if ($scope.btnSave == "Save") {
                $scope.Model.Id = 0;
            }

            $scope.Model.UserId = $scope.UserId;

            LightSourceConfig.LightSource_SaveUpdate(
                $scope.Model,
                function (data) {

                    if (data.ErrorMsg == null) {
                        $rootScope.alert(data[0].Msg);
                        GetLightSourceInfo();
                        Refresh();
                    }
                    else {
                        $rootScope.alert(data.ErrorMsg);
                    }
                });
        }

    //================ DELETE =================//
    function Delete(dataModel) {

            LightSourceConfig.LightSource_Delete(dataModel.Id,$scope.UserId,function (data) {
                if (data.ErrorMsg == null) {
                    $rootScope.alert(data[0].Msg);
                    GetLightSourceInfo();
                    Refresh();
                }
                else {
                    $rootScope.alert(data.ErrorMsg);
                }
            });
        }

    //================ EDIT =================//
    $scope.GetLightSourceByID = function (dataModel) {
            $scope.btnSave = "Update";
            $scope.Model = angular.copy(dataModel);
        };

    //================ REFRESH =================//
    $scope.Refresh = function () {
            Refresh();
            $scope.search = '';
        };

    function Refresh() {
            $scope.Model = {};
            $scope.btnSave = "Save";
            $scope.Model.IsActive = true;
        }

    //================ SORT =================//
    $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };

    //================ PAGINATION =================//
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

    $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1;
        };

    }
]);