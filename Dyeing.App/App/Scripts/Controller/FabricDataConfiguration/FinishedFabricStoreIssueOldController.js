app.controller("FinFabFloorToStoreIssueConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$timeout', '$q', '$window', 'fileReader', 'filterFilter', '$http', 'FinishedFabricFloorToStoreIssueConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $timeout, $q, $window, fileReader, filterFilter,$http, FinishedFabricFloorToStoreIssueConfig) {

    $scope.UserId = window.localStorage.getItem('UserId');
    $scope.IssueDate = new Date();
    
    //-----Initialize Combo------------//
    GetUnitName();    

    function GetUnitName() {
        FinishedFabricFloorToStoreIssueConfig.GetUnitName(function (data) {
            //alert(angular.toJson(data))
            $scope.Unit = data; $scope.totalItems = data.length;
        });
    }

    //Custom Popup
    $scope.OtherOpPopup = function (ev) {
        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/FinFabricFloorToStoreIssueDialog.html',
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

    $scope.InsBarcode = [];
    //-----Dialog load------//  

    $scope.Add = function () {
        if (!isNaN($scope.BarcodeID) && $scope.BarcodeID!=null) {
            // $scope.InsBarcode.push({ Barcode: $scope.Barcode, BarcodeWeight: 444 });
            //$scope.InsBarcode.push({ BarcodeID: $scope.BarcodeID});
            FinishedFabricFloorToStoreIssueConfig.getBarcodeQty($scope.BarcodeID, function (data) {
                //alert(angular.toJson(data))

                $scope.FBarcodeGernationIda = data[0].FBarcodeGernationId;
                $scope.BarcodeWeighta = data[0].BarcodeWeight;

                //alert("Hello Boss : " + $scope.BarcodeWeighta + " Second is : " + $scope.FBarcodeGernationIda);   
                $scope.InsBarcode.push({ BarcodeID: $scope.FBarcodeGernationIda, BarcodeWeight: $scope.BarcodeWeighta });
            });
            //alert("Hello Boss : " + $scope.BarcodeWeighta + " Second is : " + $scope.FBarcodeGernationIda); 



            //$scope.InsBarcode.push({ BarcodeWeight: $scope.BarcodeWeight });

            $scope.FBarcodeGernationIda = null;
            $scope.BarcodeWeighta = null;
            $scope.BarcodeID = null;
        }
        else {
            alert("Enter Barcode No.")
            let textarea = document.getElementById("txtMyInputBox");
            textarea.focus();
        }
       
    };

    $scope.Remove = function (index) {
        //Find the record using Index from Array.
        var FBarcodeGenId = $scope.InsBarcode[index].BarcodeID;
        if ($window.confirm("Do you want to delete: " + FBarcodeGenId)) {
            //Remove the item from Array using Index.
            $scope.InsBarcode.splice(index, 1);
        }
    }
   // $scope.NewTa = [];
    $scope.Process = function () {
        $scope.hide();       
        $scope.NewBarCode = $scope.InsBarcode;       
        FinishedFabricFloorToStoreIssueConfig.getAllFinishedDataOth($scope.NewBarCode, function (data) {                      
           // $scope.FabDataList = data;
            if (data.length > 0) {
                $scope.FabDataList = data;
            }
            else {
                alert("Already Inserted!!!!")
            }
                  
        });
        //return deferred.promise;
        
    };

    //function getBarcodeQty(barcode) {
        
    //    FinishedFabricFloorToStoreIssueConfig.getBarcodeQty(barcode, function (data) {
    //        $scope.barcodes = data;            
    //        alert(angular.toJson($scope.barcodes));          
    //    });      
       
    //}         
   
    $scope.getTextFile = function () {       
        fileReader.readAsText($scope.file, $scope).then(function (result) {            
            var BarCodeList = [];
            var barcodeDetails = result.split('\n');

            for (var i = 0; i < barcodeDetails.length - 1; i++) {               
                var varcode = { BarcodeID: barcodeDetails[i].split(',')[3].trim() };
                var cn = BarCodeList.filter(function (entry) { return entry.BarcodeID === barcodeDetails[i].split(',')[3].trim() });               
                if (cn <= 0) {
                    BarCodeList.push(varcode);
                }
            }           
            getAllFinishedData2(BarCodeList)
        });
    }


    function getAllFinishedData2(BarCodeList) {
        FinishedFabricFloorToStoreIssueConfig.getAllFinishedData(BarCodeList, function (data) {
            
            if (data.length > 0) {
                $scope.FabDataList = data;
            }
            else {
                alert("Already Inserted!!!!")
            }
        });
    }

    //--------------Get Total---------------------------//
    $scope.getTotal = function (index) {
        //alert("The total is " + index)
        if (parseInt($scope.FabDataList[index].ManualRollCount) > 0) {
            $scope.FabDataList[index].TotalRoll = parseInt($scope.FabDataList[index].RollCount) + parseInt($scope.FabDataList[index].ManualRollCount);
        }
        else {
            $scope.FabDataList[index].TotalRoll = parseInt($scope.FabDataList[index].RollCount) + 0;
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Finished Fabric Floor to Store Issue Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Finished Fabric Floor to Store Issue Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Finished Fabric Floor to Store Issue Configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {       
        $scope.Model.UserId = $scope.UserId;  
        $scope.Model.IssueDate = $scope.IssueDate;  

        for (var i = 0; i < $scope.FabDataList.length; i++) {           
            $scope.FabDataList[i].UserId = $scope.UserId;
        }
        
        $scope.Model.Details = $scope.FabDataList;        

        //alert(angular.toJson($scope.Model))

        FinishedFabricFloorToStoreIssueConfig.FinFabFlrToStoreIssue_SaveUpdate($scope.Model, function (data) {
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
        //$scope.selectedBatchNo = "";
        $scope.FabDataList = null;
        $scope.Model = null;
        $scope.file = null;
        $scope.btnSave = "Save";
        $scope.IssueDate = new Date();
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

