app.controller("WashReceiveIssueInventoryController", ['$scope', '$rootScope', 'filterFilter', '$mdDialog', '$mdToast', '$q', 'WashReceiveIssueInventory', function ($scope, $rootScope, filterFilter, $mdDialog, $mdToast, $q, WashReceiveIssueInventory) {
   
    $scope.UserId = window.localStorage.getItem('UserId');
        
    //-----Initialize Combo-Tracking No-----------//   
    var objTracking = [];
    var obj = [];
    var self = this;
    var simulateQuery = false;

    WashReceiveIssueInventory.GetTrackingNo(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["TrackingNo"], display: val["TrackingNo"] };
            objTracking.push(vd);
        });
    });
    self.TrackingList = objTracking;

    $scope.querySearch = querySearch;
    function querySearch(query, cn) {

        $scope.Model.selectedBuyer = null;
        $scope.Model.selectedJob = null;
        $scope.Model.selectedOrder = null;
        $scope.Model.selectedColor = null;
       
        if (cn == 'Name') {
            obj = objTracking;
            self.list = self.TrackingList;
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

    //----- Combo-Buyer No-----------//   
    var objBuyer = [];
    var obj = [];
    var self = this;
    var simulateBuyerQuery = false;

    WashReceiveIssueInventory.GetBuyer(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["BuyerId"], display: val["BuyerName"] };
            objBuyer.push(vd);
        });
    });
    self.BuyerList = objBuyer;

    $scope.queryBuyerSearch = queryBuyerSearch;
    function queryBuyerSearch(query, cn) {        
       // $scope.Model.selectedName = null;
        if (cn == 'Name') {
            obj = objBuyer;
            self.list = self.BuyerList;
        }

        var results = query ? self.list.filter(createBuyerFilter(query, obj)) : self.list,
            deferred;
        if (simulateBuyerQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }
    function createBuyerFilter(query, List) {
        var lowercaseQuery = query;
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }    

    //----- Combo-Job No-----------//   
    $scope.LoadJob = function () { 

        $scope.HidBuyerID = $scope.Model.selectedBuyer.value;
        $scope.HidTrackingID = null;

        var objJob = [];
        var obj = [];
        var self = this;
        var simulateJobQuery = false;

        WashReceiveIssueInventory.GetJob($scope.Model.selectedBuyer.value, function (data) {           
            angular.forEach(data, function (val, key) {
                var vd = { value: val["JobId"], display: val["JobInfo"] };
                objJob.push(vd);
            });
        });
        self.JobList = objJob;

        $scope.queryJobSearch = queryJobSearch;
        function queryJobSearch(query, cn) {
            if (cn == 'Name') {
                obj = objJob;
                self.list = self.JobList;
            }

            var results = query ? self.list.filter(createJobFilter(query, obj)) : self.list,
                deferred;
            if (simulateJobQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function createJobFilter(query, List) {
            var lowercaseQuery = query;
            return function filterFn(List) {
                return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }    

    }

    //----- Combo-Order No-----------//   
    $scope.LoadOrder = function () {

        $scope.HidJobID = $scope.Model.selectedJob.value;

        var objOrder = [];
        var obj = [];
        var self = this;
        var simulateOrderQuery = false;

        WashReceiveIssueInventory.GetOrder($scope.Model.selectedBuyer.value,$scope.Model.selectedJob.value, function (data) {
           // alert(angular.toJson(data))
            angular.forEach(data, function (val, key) {
                var vd = { value: val["OrderId"], display: val["OrderNo"] };
                objOrder.push(vd);
            });
        });
        self.OrderList = objOrder;

        $scope.queryOrderSearch = queryOrderSearch;
        function queryOrderSearch(query, cn) {
            if (cn == 'Name') {
                obj = objOrder;
                self.list = self.OrderList;
            }

            var results = query ? self.list.filter(createOrderFilter(query, obj)) : self.list,
                deferred;
            if (simulateOrderQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function createOrderFilter(query, List) {
            var lowercaseQuery = query;
            return function filterFn(List) {
                return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }

    }

    //----- Combo-Color Name-----------//   
    $scope.LoadColor = function () {

        $scope.HidOrderID = $scope.Model.selectedOrder.value;

        var objColor = [];
        var obj = [];
        var self = this;
        var simulateColorQuery = false;

        WashReceiveIssueInventory.GetColor($scope.Model.selectedBuyer.value, $scope.Model.selectedJob.value, $scope.Model.selectedOrder.value, function (data) {
            //alert(angular.toJson(data))
            angular.forEach(data, function (val, key) {
                var vd = { value: val["ICLEID"], display: val["ItemColorName"] };
                objColor.push(vd);
            });
        });
        self.ColorList = objColor;

        $scope.queryColorSearch = queryColorSearch;
        function queryColorSearch(query, cn) {
            if (cn == 'Name') {
                obj = objColor;
                self.list = self.ColorList;
            }

            var results = query ? self.list.filter(createColorFilter(query, obj)) : self.list,
                deferred;
            if (simulateColorQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function createColorFilter(query, List) {
            var lowercaseQuery = query;
            return function filterFn(List) {
                return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
            };
        }

    }

  
    //-----------------Get details data By Tracking No------------//    

    $scope.ShowData = function () {
        $scope.Details = null;
        $scope.HidTrackingID = $scope.Model.selectedName.value;
        $scope.Model.TrackingNo = $scope.Model.selectedName.value;
        var p = 1;
        WashReceiveIssueInventory.GetUnitId($scope.Model.selectedName.value, function (data) {

            for (var i = 0; i < data.length; i++) {

                if (p == 1) {

                    $scope.Model.UnitId = data[i].UnitId;
                    //$scope.Model.BuyerId = data[i].BuyerId;
                    //$scope.Model.JobId = data[i].JobId;
                    //$scope.Model.StyleId = data[i].StyleId;
                    //$scope.Model.OrderId = data[i].OrderId;
                    //$scope.Model.ColorId = data[i].ColorId;

                    p++;
                }
            }
        });

        WashReceiveIssueInventory.GetDataInfo($scope.Model.selectedName.value, function (data) {
            $scope.Details = data; $scope.totalItems = data.length;
        });

    }

    //--------------Get details data by Buyer,Job,Order,Color-------------------------//    
    $scope.ShowDataOth = function () {

        $scope.HidColorID = $scope.Model.selectedColor.value;

        $scope.Details = null;        
        //$scope.Model.selectedBuyer.value, $scope.Model.selectedJob.value, $scope.Model.selectedOrder.value
        $scope.Model.BuyerId = $scope.Model.selectedBuyer.value;
        $scope.Model.JobId = $scope.Model.selectedJob.value;
        $scope.Model.OrderId = $scope.Model.selectedOrder.value;
        $scope.Model.ColorId = $scope.Model.selectedColor.value;

        var p = 1;

        WashReceiveIssueInventory.GetUnitIdOth($scope.Model.BuyerId, $scope.Model.JobId, $scope.Model.OrderId, $scope.Model.ColorId, function (data) {

            for (var i = 0; i < data.length; i++) {

                if (p == 1) {
                    $scope.Model.UnitId = data[i].UnitId;
                    //$scope.Model.BuyerId = data[i].BuyerId;
                    //$scope.Model.JobId = data[i].JobId;                   
                    //$scope.Model.OrderId = data[i].OrderId;
                    //$scope.Model.ColorId = data[i].ColorId;
                    //$scope.Model.StyleId = data[i].StyleId;

                    p++;
                }

            }

        });

        WashReceiveIssueInventory.GetDataInfoOth($scope.Model.BuyerId, $scope.Model.JobId, $scope.Model.OrderId, $scope.Model.ColorId, function (data) {
             //alert(angular.toJson(data));            
            $scope.Details = data; $scope.totalItems = data.length;

        });

    }

    //-----Check Box Enable/Disable------//   
    $scope.chkAll = function () {
        if ($scope.chk) {
            for (var i = 0; i < $scope.Details.length; i++) {
                $scope.Details[i].IsActiveRow = Boolean(1);
                //$scope.IsDisable = false;
                $scope.Details[i].isEditing = true;
            }
        } else {
            for (var i = 0; i < $scope.Details.length; i++) {
                $scope.Details[i].IsActiveRow = Boolean(0);
                //$scope.IsDisable = true;
                $scope.Details[i].isEditing = false;
            }
        }
    }

    //----Enable Particular checkbox row---------------------//
    $scope.enableTxtBox = function (index) {       
        if ($scope.Details[index].isEditing == true) {

            $scope.Details[index].isEditing = false;
        }
        else {
            $scope.Details[index].isEditing = true;
        }      
    }

    //------------Issue Qty Check------------------------//
    $scope.IssueQtyCheck = function (index) {
        var issueQtyval = parseInt($scope.Details[index].TotalIssueQtyValue) + parseInt($scope.Details[index].totalIssueQty);
        if ($scope.Details[index].totalRecQty >= issueQtyval) {
            //
        }
        else {
            alert("Issue Qty is greater than Total Receive Qty/Total Receive Qty is Empty!!")
            //alert(angular.toJson($scope.Details))
            $scope.Details[index].totalIssueQty = 0;
        }
    }

    //------------Receive Qty Check------------------------//
    $scope.RecQtyCheck = function (index) {

        if ($scope.Details[index].HiddenRcvQty >= $scope.Details[index].RcvQty) {
          //
        }
        else {
            alert("Receive quantity not greater than " + $scope.Details[index].HiddenRcvQty+" !!")
            //alert(angular.toJson($scope.Details))
            $scope.Details[index].RcvQty = $scope.Details[index].HiddenRcvQty;
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
                    SaveUpdate();
                } else if (mode == 'Delete') {
                    Delete(dataModel);
                }
            });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Wash Receive & Issue Inventory Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Wash Receive & Issue Inventory Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Wash Receive & Issue Inventory Data?' };
        }
        return obj;
    }
    $scope.allData = [];
    $scope.Savedata = [];

    $scope.Track = "";

    function SaveUpdate() {   
        
        $scope.Model.UserId = $scope.UserId; 
        $scope.allData = filterFilter($scope.Details, { IsActiveRow: true }, true);

        if (isNaN($scope.allData)) {

            $scope.Model._details = $scope.allData;
            WashReceiveIssueInventory.WashReceiveIssueInventory_SaveUpdate($scope.Model, function (data) {

                if (data.ErrorMsg == null) {

                    $rootScope.alert(data.Msg); 
                    //ReloadDispatchList();
                    //Refresh();

                    //--------------Auto Reload Data------------------//
                    if (isNaN($scope.HidTrackingID)) {
                        //alert("The tracking value is : " + $scope.HidTrackingID)
                        $scope.Details = null;
                        WashReceiveIssueInventory.GetDataInfo($scope.HidTrackingID, function (data) {
                            $scope.Details = data; $scope.totalItems = data.length;
                        });
                        ReloadDispatchList();
                    }
                    else {
                        //alert(" The Buyer value is : " + $scope.HidBuyerID + " The Job is " + $scope.HidJobID + " The order is " + $scope.HidOrderID + " The Color is " + $scope.HidColorID)
                        $scope.Details = null;
                        WashReceiveIssueInventory.GetDataInfoOth($scope.HidBuyerID, $scope.HidJobID, $scope.HidOrderID, $scope.HidColorID, function (data) {                                      
                            $scope.Details = data; $scope.totalItems = data.length;

                        });
                        ReloadDispatchList();
                    }
                   // -------------End--------------//
                   
                }

                else $rootScope.alert(data.ErrorMsg);

            });
        }
        else {
            alert("Please Select Your Item!!")     
        }
    }


    //-----Popup window work for dispatch list--------------------//
    $scope.OtherOpPopup = function (ev) {
        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/DispatchGenerationDialog.html',
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }

    //--------------Send to Dispatch Data  save----------------------// 
    $scope.Dispatch = function () {

        $scope.DispatchData = filterFilter($scope.DispatchList, { IsDispatchRow: true }, true);

        var gId = Math.floor(Math.random() * 10000000000000001);
        //alert(" The id is : " + gId);


        if (isNaN($scope.DispatchData)) {
            for (var i = 0; i < $scope.DispatchData.length; i++) {
                $scope.DispatchData[i].UserId = $scope.UserId;                
                $scope.DispatchData[i].Guid = gId;                 
            }            
            WashReceiveIssueInventory.Dispatch_SaveUpdate($scope.DispatchData, function (data) {
                if (data.ErrorMsg == null) {                 
                        //------------------ Page Load----------------//                            var url = "https://mis-gp.mascoknit.com/DispatchSlipGenerationCuttingPartAndOthers?MenuId=1138&WashGUID=" + gId;                                           var win = window.open(url, '_blank');                  
                        ReloadDispatchList();
                }
                else $rootScope.alert(data.ErrorMsg);
            });
        }
        else {
            alert("Please Select Your Dispatch Item!!")
        }

    };

    //-----------Reload Dispatch List after save or Dispatch-------------//
    function ReloadDispatchList() {
        $scope.DispatchList = null;
        WashReceiveIssueInventory.GetDispatchList(function (data) {
            $scope.DispatchList = data; $scope.totalItems = data.length;
        });
    };

    //----------Initially Load Dispatch List---------------------------//
    WashReceiveIssueInventory.GetDispatchList(function (data) {
        $scope.DispatchList = data; $scope.totalItems = data.length;
    });



    var vm = this;
    vm.reloadData = function () {
        $state.reload();
    };

    $scope.Refresh = function () {
        Refresh();

    }
    function Refresh() {
        //$scope.selectedBatchNo = "";
        $scope.Details = null;
        $scope.Model = null;
        //$scope.btnSave = "Save";
        //tableInitialState();
        //hiddenDiv.style.display = 'none';
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