app.controller("ProductionShiftConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', 'ProductionShiftConfig', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, ProductionShiftConfig) {    
  
    $scope.UserId = window.localStorage.getItem('UserId');

    //-----Initialize Combo------------//
    GetUnitName();
    GetShiftType();
    GetSection();

    function GetUnitName() {
        ProductionShiftConfig.GetUnitName(function (data) {
            //alert(angular.toJson(data))
            $scope.Unit = data; $scope.totalItems = data.length;
        });
    }
    function GetShiftType() {
        
        ProductionShiftConfig.GetShiftType(function (data) {
            //alert(angular.toJson(data))
            $scope.Shift = data; $scope.totalItems = data.length;
        });
    }
    function GetSection() {
        ProductionShiftConfig.GetSection(function (data) {
            //alert(angular.toJson(data))
            $scope.SectionData = data; $scope.totalItems = data.length;
        });
    }

    //-----Shift Time load------//
    $scope.getShiftTime = function (ShiftTypeId) {
       // alert(angular.toJson($scope.master.UnitId));
        if ($scope.master.UnitId != null) {
            if (isNaN(ShiftTypeId)) {
                hiddenDiv.style.display = 'none';               
            }
            else {
                    hiddenDiv.style.display = 'inline-block';   
                    $scope.master.OscId = null;
                    ProductionShiftConfig.GetShitTime(ShiftTypeId, function (data) {                    
                    $scope.detail = data; $scope.totalItems = data.length;
                    var v = filterFilter($scope.detail, { IsChecked: true }, true);
                    //alert(v.length);
                    if (v.length > 0) $scope.btnSave = "Update";
                    else $scope.btnSave = "Save"
                });

                //ProductionShiftConfig.GetSelectedSection(ShiftTypeId, $scope.master.UnitId, function (data) {
                    
                //    if (data[0].OscId > 0) {                        
                //        $scope.master.OscId = data[0]["OscId"];
                //    }
                //    else {
                //        $scope.master.OscId = null;
                //    }
                   

                //});
            }

        }
        else {
            alert("Please Select Unit!!");
            $scope.master.ShiftTypeId = null;
        }
        
    };
    //-------------Set Shift/Section---------------//
    $scope.setShiftSection = function () {
        hiddenDiv.style.display = 'none';        
        $scope.master.ShiftTypeId = null;
        $scope.master.OscId = null;
        $scope.detail = [];       
        $scope.btnSave = "Save"

    }

    //-----Get Checked Shift---------------//
    $scope.getCheckedShift = function (OscId) {
        //$scope.detail = null;
        if ($scope.master.UnitId != null && $scope.master.ShiftTypeId != null) {

            //$scope.detail = {};   
            $scope.detail = [];
            ProductionShiftConfig.getCheckedShift($scope.master.UnitId, $scope.master.ShiftTypeId, OscId, function (data) {
                //alert(angular.toJson(data))
                $scope.detail = data;
                //for (i = 0; i < data.length; i++) {
                //    //alert(angular.toJson(data[0].IsCheckedN))
                //    debugger
                //    $scope.detail[i].IsChecked = data[i].IsCheckedN;
                //}
                //$scope.detail = data; $scope.totalItems = data.length;
                var v = filterFilter($scope.detail, { IsChecked: true }, true);
                //alert(v.length);
                if (v.length > 0) $scope.btnSave = "Update";
                else $scope.btnSave = "Save"


            });


        }
        else {
            alert("Please Select Fields!!");
            $scope.master.OscId = null;
        }


    }

    //$scope.getSelectedSection = function (ShiftTypeId) {
    //    //alert("The boss is : " + ShiftTypeId)
    //    //$scope.master.UnitId;
    //    ProductionShiftConfig.GetSelectedSection(ShiftTypeId, $scope.master.UnitId, function (data) {
    //            //alert(angular.toJson(data))
    //            $scope.master.UnitId = data.UnitId;
                
    //        });
        
    //};

    //--------Grid Table Work-------------------------------------------//
    $scope.data = [{
        PsdId: 0, ShiftNo: 0, ShiftName: "", ShiftIn: "", ShiftOut: "", Category: "", IsChecked: false, IsSaved: false
    }];

    tableInitialState()
    function tableInitialState() {
        //alert(angular.toJson($scope.data))
        $scope.detail = angular.copy($scope.data);
        $scope.btnSave = "Save";       
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Production Shift Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Production Shift Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Production Shift Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {               
        //alert(angular.toJson($scope.detail))
       // debugger
        //alert("The value is" + $scope.detail.PsmId)

        //if ($scope.btnSave =="Save")
        //    $scope.master.PsmId = 0;
        //else
        //    $scope.master.PsmId = 0;

        $scope.master.UserId = $scope.UserId; 
        $scope.master._details = $scope.detail;//filterFilter($scope.detail, { IsChecked: true }, true); 
        //alert(angular.toJson($scope.master))
        ProductionShiftConfig.ProductionShift_SaveUpdate($scope.master, function (data) {
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
        $scope.master = null;       
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