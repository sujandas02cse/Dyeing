app.controller("ProductionPrioritySetConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', '$filter', 'ProductionPrioritySetConfig', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, $filter, ProductionPrioritySetConfig) {

    $scope.UserId = window.localStorage.getItem('UserId');    

    //-----Initialize Combo------------//
    var objMachineName = [];    
    var obj = [];
    var self = this;
    var simulateQuery = false;    

    //ProductionPrioritySetConfig.GetMachineName("Name", function (data) {
    //    alert("Hello Boss!!!")
    //    debugger        
    //    angular.forEach(data, function (val, key) {
    //        var vd = { value: val["MId"], display: val["MachineEng"] };
    //        objMachineName.push(vd);
    //    });
    //});
    //self.MachineNameList = objMachineName;  

    var UserId = $scope.UserId;
    //alert("The Id is : " + UserId)
    ProductionPrioritySetConfig.GetMachineName(UserId, function (data) {        
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MDId"], display: val["MachineNo"]};
            objMachineName.push(vd);
        });
    });
    self.MachineNameList = objMachineName;

    $scope.querySearch = querySearch;
    function querySearch(query, cn) {
        if (cn == 'Name') {
            obj = objMachineName;
            self.list = self.MachineNameList;
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
    function createFilter(query, List) {
        var lowercaseQuery = query;
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }
    //-----Grid Data Load by Change Function-----------//
    $scope.getPriorityDetails = function () {
        //debugger
        //alert(angular.toJson($scope.selectedName.value));
        if (isNaN($scope.selectedName.value)) {
                hiddenDiv.style.display = 'none';
        }
        else {
                hiddenDiv.style.display = 'inline-block';
                ProductionPrioritySetConfig.GetProdPrioritySetDetails($scope.selectedName.value, function (data) {
                    
                    $scope.totalItems = data.length;
                    $scope.detail = data;
                    $scope.detail.totalItems = $scope.totalItems;
                    for (var i = 0; i < data.length; i++) {
                        $scope.detail[i].totalItems = $scope.totalItems+1;
                    }

                    //alert(angular.toJson($scope.detail.totalItems))

                   // alert(angular.toJson($scope.detail))
                    var v = filterFilter($scope.detail, { IsChecked: true }, true);
                    //alert(v.length);
                    if (v.length > 0) $scope.btnSave = "Update";
                    else $scope.btnSave = "Save"
                });
        }

    };

    //--------Grid Table Work--Create Bulk-------------------------------------------//  

    $scope.data = [{
        PpscId: 0, MId: 0, MppmId: 0, PriorityNo: "", HostIP: "", UserId: ""
    }];

    tableInitialState()
    function tableInitialState() {
        //alert(angular.toJson($scope.data))
        $scope.detail = angular.copy($scope.data);
        $scope.btnSave = "Save";
    }

    //----------Set Priority Sequence-----------------------------//
    $scope.sequenceCreate = function (index, hiddenPriority, PriorityNoChk) {        
        
        var indexPrevious;

        for (var i = 0; i < $scope.detail.length; i++) {
            if ($scope.detail[i].PriorityNo==PriorityNoChk && i!=index) {                
                indexPrevious = i;
            }    

        }

        if (indexPrevious > index) {           
            for (var p = index; p <= indexPrevious; p++) {
                if (p != index) {                   
                    $scope.detail[p].PriorityNo = $scope.detail[p].PriorityNo - 1;
                }                
            }
        }

        else {            
            for (var q = indexPrevious; q <= index; q++) {
                if (q != index) {                  
                    $scope.detail[q].PriorityNo = $scope.detail[q].PriorityNo + 1;
                }                
            }
        }

        $scope.isDisabled = true;
            

    }

    //-----------Save/Update/Delete-------------------------------//
    $scope.PriorityNo = [];
    var a = 1;
    var q = 2;
    var m = 0;
    function ChecKDuplicate(action, dataModel) {
        $scope.results = {};
        var p = 1;
        for (var i = 0; i < $scope.detail.length; i++) {
            var PriorityNoCount = $scope.detail[i].PriorityNo;
            if (PriorityNoCount) {
                p++;
                if ($scope.results.hasOwnProperty(PriorityNoCount)) {
                    a = a + $scope.results[PriorityNoCount]++;
                    if (a = 2) {
                        m = a;
                    }

                } else {
                    $scope.results[PriorityNoCount] = 1;
                }
            }

        }
        if (q = m) {
            alert("Priority is duplicate here!!!!")
            q = 0;
            m = 0;
        }
        else {
            //alert("Here is insert Query")
            q = 0;
            m = 0;

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
    }

    $scope.actionDialog = function (action, dataModel) {

        //-------------------Duplicacy Check ----------------------//
        ChecKDuplicate(action, dataModel);            
            
        //$mdDialog.show(
        //    $mdDialog.dialogBox({
        //        locals: {
        //            model: objData(action)
        //        }
        //    })).then(function (mode) {
        //        if (mode == 'Update' || mode == 'Save') {
        //            SaveUpdate();
        //        } else if (mode == 'Delete') {
        //            Delete(dataModel);
        //        }
        //    });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Production Priority Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Production Priority Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Production Priority Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {       
        $scope.detail.UserId = $scope.UserId;
        $scope._details = filterFilter($scope.detail, { PriorityNo: "!!" });
        //alert(angular.toJson($scope._details));
        ProductionPrioritySetConfig.ProductionPriority_SaveUpdate($scope._details, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                // $rootScope.Toast(data.Msg);               
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);
        });
    }

    var vm = this;
    vm.reloadData = function () {
        $state.reload();
    };

    $scope.Refresh = function () {
        Refresh();

    }
    function Refresh() {
        $scope.selectedName = "";
        tableInitialState();
        hiddenDiv.style.display = 'none';
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