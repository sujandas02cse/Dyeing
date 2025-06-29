app.controller("MatchingWithFieldConfigController", ['$scope', '$rootScope', '$filter', '$mdDialog', '$mdToast', 'MatchingWithFieldConfig', function ($scope, $rootScope, $filter, $mdDialog, $mdToast, MatchingWithFieldConfig) {
    //alert("Hello Boss")
    $scope.UserId = window.localStorage.getItem('UserId');
    GetMatchingWithFieldInfo();
    function GetMatchingWithFieldInfo() {
        MatchingWithFieldConfig.MatchingWithFieldInfo_Get(function (data) { $scope.MatchingField = data; $scope.totalItems = data.length; });
    };
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    MatchingWithFieldConfig.MatchingWithFieldInfo_Get(function (data) {
                        //debugger;
                        $scope.MatchingField = data;
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
        var chkDup = $filter('filter')($scope.MatchingField, function (item) {
            return item.NameOfMatching.toLowerCase() == $scope.Model.NameOfMatching.toLowerCase();
        }, true);

        if ($scope.btnSave == "Save" && chkDup.length > 0) {
            $rootScope.alert("Duplicate Matching Not Allowed, Please! Enter Valid Matching With Field.....");
            return "0";
        } else if ($scope.btnSave == "Update" && chkDup.length > 0) {
            if (chkDup[0].MfcId != $scope.Model.MfcId || chkDup.length > 1) {
                $rootScope.alert("Duplicate Matching Not Allowed, Please! Enter Valid Matching With Field.....");
                return "0";
            }
        }
        return "1";
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Matching With Field Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Matching With Field Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Matching With Field Data?' };
        }
        return obj;
    }
    function SaveUpdate() {
        if ($scope.btnSave == "Save")
            $scope.Model.MfcId = 0;
        else
           // $scope.Model.PprrId = 0;
        $scope.Model.UserId = $scope.UserId;
       // alert("The Id is : " + dataModel.Model.MfcId)
        MatchingWithFieldConfig.MatchingWithField_SaveUpdate($scope.Model, function (data) {
            if (data.ErrorMsg == null) {
                //$rootScope.Toast(data.Msg);
                $rootScope.alert(data.Msg);
                GetMatchingWithFieldInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    function Delete(dataModel) {
        //debugger;
        //alert("The Id is : "+dataModel.MfcId)
        MatchingWithFieldConfig.MatchingWithField_Delete(dataModel.MfcId, $scope.UserId, function (data) {
            if (data.ErrorMsg == null) {
                //$rootScope.Toast(data.Msg);
                $rootScope.alert(data.Msg);
                GetMatchingWithFieldInfo();
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }

    $scope.GetMatchingFieldInfoByID = function (dataModel) {
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