app.controller("BatchFinishingController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'BatchFinishingFactory', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, BatchFinishingFactory) {

    var ts = Math.floor(Date.now() / 1000);
    function DialogController($scope, $mdDialog) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

    }

    //Custom Popup
    $scope.FinishingConfiguration = function (ev) {

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/BatchConfigFinishDialog.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    };

    $scope.actionDialog = function (action, dataModel) {
        debugger;
        //if (DataValidation()) {
        //    $rootScope.alert("Receipe List Can't be Empty..!");
        //    return;
        //}
      
        //console.log($scope.RecipeList)
        //console.log($scope.batchFins)
        //console.log($scope.machineFins)

        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    SaveUpdate();
                }
         });
        
    }




    function objData(action) {
        debugger;
        var obj = [];
        var msg = "";
      
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': "Do you want to save..?" };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': "Do you want to update..?"  };
        }
        return obj;
    }

    function DataValidation() {
        debugger;

        for (var i = 0; i < $scope.RecipeList.length; i++) {
            if ($scope.RecipeList[i].RecipeDrescription == '' || $scope.RecipeList[i].Unit == '') {
                return true;

            }

        }

    }



    tableInitialState()
    function tableInitialState() {
        debugger;
        $scope.data = [{
            RecipeDrescription: [], Unit: []
        }
        ];
        $scope.RecipeList = angular.copy($scope.data);
        debugger;
    }

    loadBatchNo()
    function loadBatchNo() {
        var batchId = 0;


        BatchFinishingFactory.GetBatchNoList(batchId, function (data) {
            debugger;
            console.log(data);
            if (data != null) {
                $scope.batchList = [];
                $scope.batchList = data;
            }
            else {

            }

        });
    }

    $scope.actionDialog1 = function (action, dataModel) {
        debugger;
        if (action == 'AddNewRow') {
            addRecipeRow();
        } else if (action == 'DeleteRow') {
            deleteRecipeRow(dataModel);
        }
    }


    function addRecipeRow() {
        debugger;
        var vd = {
            RecipeDrescription: [], Unit: []
        };
        $scope.RecipeList.push(vd);
    }
    function deleteRecipeRow(index) {

        if ($scope.RecipeList.length > 1) $scope.RecipeList.splice(index, 1);
    }


    var isUpdate = 0;
    $scope.getDataByBatchId = function (ob) {
        debugger;

        var batchId = $scope.batchFins.Batch.BatchId;


        BatchFinishingFactory.GetBatchConfigurationFinishingDetail(batchId, function (data) {
            debugger;
            console.log(data);
            if (data.m_Item1.length == 0) {
                $scope.btnSave = "Save";
                tableInitialState()
                //Refresh();
            }
            else {
                isUpdate = 1;
                $scope.btnSave = "Update";
                $scope.machineFins = data.m_Item1[0];
                $scope.RecipeList = data.m_Item2;
            }



        });

    }

    $scope.ShadeQuality = function (f) {
        if (f == 1) {
            $scope.machineFins.QualityOk = true;
            $scope.machineFins.QualityNotOk = false;
        } else {
            $scope.machineFins.QualityOk = false;
            $scope.machineFins.QualityNotOk = true;
        }
    }
    //$scope.QtlyOk = null;


    function SaveUpdate() {
        debugger;
        $scope.machineFins.UserId = $rootScope.UserId;
        $scope.machineFins.BatchId = $scope.batchFins.Batch.BatchId;

        var obj = {
            "MatchineFins": $scope.machineFins,
            "BatchFins": $scope.batchFins
            //"RecipeList": $scope.RecipeList
        }
        BatchFinishingFactory.SaveBatchConfigurationFinishing(obj, function (data) {
            if (data.ErrorMsg == null) {
                if (isUpdate == 1) {
                    isUpdate = 0;
                    $rootScope.alert("Data Successfully updated");
                  
                    Refresh()
                    loadBatchNo()
                    tableInitialState()
                }

                else {
                    $rootScope.alert(data.Msg);
                }

                $scope.btnSave = "Save";
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });


        //console.log($scope.RecipeList)
        //console.log($scope.batchFins)
        //console.log($scope.machineFins)
    }



    function Refresh() {
        $scope.machineFins = [];
        $scope.batchFins = [];
        $scope.RecipeList = [];
       
    }


}]);

