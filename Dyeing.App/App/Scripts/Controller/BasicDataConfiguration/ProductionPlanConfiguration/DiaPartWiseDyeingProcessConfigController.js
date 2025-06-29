
app.controller("DiaPartWiseDyeingProcessConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'DiaPartConfig', function ($scope, $rootScope, $mdDialog, $mdToast, DiaPartConfig) {


    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    SaveUpdate();
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Dia part wise specification Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to updateDia part wise specification Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Dia part wise specification Configuration Data?' };
        }
        return obj;
    }


    var objDiaPartName = [];

    var obj = [];
    var self = this;
    var simulateQuery = false;


    DiaPartConfig.GetDiaPartName(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["DpnId"], display: val["DiaPartName"] };
            objDiaPartName.push(vd);
        });
    });
    self.DiaPartNameList = objDiaPartName;




    $scope.querySearch = querySearch;
    function querySearch(query, cn) {

        if (cn == 'DiaPartName') {
            obj = objDiaPartName;
            self.list = self.DiaPartNameList;
        }
        var results = query ? self.list.filter(createFilter(query, obj)) : self.list,
            deferred;
        if (simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    function qSearchData(query, obj, list) {
        var results = query ? list.filter(createFilter(query, obj)) : list,
            deferred;
        if (simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    function createFilter(query, List) {
        var lowercaseQuery = query;
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }


    GetDyeingProcessFlowInfo();
    function GetDyeingProcessFlowInfo() {
        DiaPartConfig.DyeingProcessFlowInfo_Get(function (data) { $scope.Details = data; });
    };


    $scope.selectedItemChange = selectedItemChange;

    function selectedItemChange(item) {
        debugger;

        if (item) {
            DiaPartConfig.sp_Get_ProcessByDiaPart(item.display, function (data) {
                if (data.length <= 0) {

                    GetDyeingProcessFlowInfo();
                    $scope.btnSave = "Save";

                }
                else {

                    $scope.Details = data;
                    $scope.btnSave = "Update";

                }
            });
        }

       
    }



    function SaveUpdate() {

        $scope.Head.UserId = $rootScope.UserId;

        if ($scope.selectedName != null) {
            $scope.Head.DiaPartName = $scope.selectedName.display;


        }
     
        $scope.Head.HostId = $scope.HostId;

        if ($scope.Details.length > 0) {
            for (var i = 0; i < $scope.Details.length; i++) {
                $scope.Details[i].DppId = $scope.Details[i].DppId;
                $scope.Details[i].DpfcId = $scope.Details[i].DpfcId;
                $scope.Details[i].IsActive = $scope.Details[i].IsActive;
              
            }
        }
        $scope.Head.DppId = $scope.Details[0].DppId;
        $scope.Head.Details = $scope.Details;
        if ($scope.btnSave == "Save") {
            $scope.Head.Mode = 'Save';
        }
        
        //alert(angular.toJson($scope.Head))

        if ($scope.Head != null) {
            if ($scope.Head.DiaPartName != null) {
                DiaPartConfig.DiaPartConfig_SaveUpdate($scope.Head, function (data) {

                    if (data.ErrorMsg != '') {
                        $rootScope.alert(data.Msg);
                        Refresh();
                        GetDyeingProcessFlowInfo();
                    }

                    else {
                        $rootScope.alert(data.ErrorMsg);
                    }

                    $rootScope.Toast(data.Msg);


                });
            }
            else {
                $rootScope.alert('Please Select Dia Part Name.');
            }
           
        }

       
    }



    $scope.Refresh = function () {
        Refresh();
        GetDyeingProcessFlowInfo();
    }
    function Refresh() {
        $scope.Head.Mode = null;
        $scope.selectedName = null
        $scope.Head.DiaPartName = null;
        $scope.btnSave = "Save";
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




