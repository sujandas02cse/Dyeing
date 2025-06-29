app.controller("DyeingProcessFlowConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'DyeingProcessFlowConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, DyeingProcessFlowConfig) {
    //alert("Hello Boss")
    $scope.UserId = window.localStorage.getItem('UserId');
    GetDyeingProcessFlowInfo();
    function GetDyeingProcessFlowInfo() {

        DyeingProcessFlowConfig.DyeingProcessFlowInfo_Get(function (data) { $scope.ProcessFlow = data; $scope.totalItems = data.length; });
    };
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    DyeingProcessFlowConfig.DyeingProcessFlowInfo_Get(function (data) {
                        //debugger;
                        $scope.ProcessFlow = data;
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
        var chkDup = $filter('filter')($scope.ProcessFlow, function (item) {
            return item.NameOfProcess.toLowerCase() == $scope.Model.NameOfProcess.toLowerCase();
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Process Name Not Allowed, Please! Enter Valid Process Name.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].DpfcId != $scope.Model.DpfcId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Process Name Not Allowed, Please! Enter Valid Process Name.....");
                return "0";
            }
        }
        return "1";
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Process flow Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Process flow Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Process flow Configuration Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.DpfcId = 0;
        else
           // $scope.Model.PprrId = 0;
        $scope.Model.UserId = $scope.UserId;
        DyeingProcessFlowConfig.DyeingProcessFlow_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetDyeingProcessFlowInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        //debugger;
        DyeingProcessFlowConfig.DyeingProcessFlow_Delete(dataModel.DpfcId, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                GetDyeingProcessFlowInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetProcessFlowInfoByID = function (dataModel) {
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