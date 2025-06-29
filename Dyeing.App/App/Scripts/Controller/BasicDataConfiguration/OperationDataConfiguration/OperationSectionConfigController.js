app.controller("OperationSectionConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'OperationSectionConfig', function ($scope, $rootScope, $filter,$mdDialog, $mdToast, OperationSectionConfig) {
    //alert("Hello Boss")    
    GetSectionInfo();
    function GetSectionInfo() {

        OperationSectionConfig.GetSectionInfo(function (data) { $scope.OperationSection = data; $scope.totalItems = data.length; });
    };
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    OperationSectionConfig.GetSectionInfo(function (data) {
                        //debugger;
                        $scope.OperationSection = data;
                        if (chkValidation() == "1")
                            SaveUpdate();
                    });
                    
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Operation Section Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Operation Section Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Operation Section Configuration Data?' };
        }
        return obj;
    }

    function chkValidation() {
        //1=Valid, 0=Invalid        
        var chkDup = $filter('filter')($scope.OperationSection, function (item) {
            return item.SectionName.toLowerCase() == $scope.Model.SectionName.toLowerCase();
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Section Not Allowed, Please! Enter Valid Section Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].OscId != $scope.Model.OscId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Section Not Allowed, Please! Enter Valid Section Name.....");
                return "0";
            }
        }
        return "1";
    }

    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.OscId = 0;
        else
           // $scope.Model.PprrId = 0;
        //debugger;
        $scope.Model.UserId = $scope.UserId;
        OperationSectionConfig.OperationSection_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetSectionInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        //debugger;
        OperationSectionConfig.OperationSection_Delete(dataModel.OscId, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetSectionInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetSectionInfoByID = function (dataModel) {
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
        //$scope.Model.SectionName = null;
        //$scope.Model.IsActive = true;
        //$scope.btnSave = "Save";
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