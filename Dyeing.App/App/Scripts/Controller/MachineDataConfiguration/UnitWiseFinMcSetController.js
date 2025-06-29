app.controller("UnitWiseFinMcController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'UnitWiseFinMc', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, UnitWiseFinMc) {
    $scope.Model = {};
    function objData(action) {
        debugger;
        var obj = [];
        var msg = "";

        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': "Do you want to save..?" };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': "Do you want to update..?" };
        }
        return obj;
    }

    UnitWiseFinMc.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

  
    UnitWiseFinMc.GetMachineInfo(0, 'Type', function (data) {
        debugger;
        $scope.MachineType = data;
    });


    $scope.GetMcConfigForEdit = function (item) {
        debugger;
        $scope.McOperation = item;
    }    

    function SaveUpdate() {
        debugger;

        $scope.model.BpmId = $scope.Batch.BatchId;
        $scope.model.UserId = $rootScope.UserId;
        $scope.model.Operation = 'SaveData';
        UnitWiseFinMc.SaveUpdate($scope.model, function (data) {
            debugger;
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                $scope.btnSave = "Save";
            }
            else
                $rootScope.alert("Data Not Saved..!");


            ClearData();

        });
    }
    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    SaveUpdate();
                }
                else if (mode == 'Delete') {
                    //Delete(dataModel);
                }
            });
    }

    function ClearData() {
        $scope.Batch = null;
        $scope.model = {};
        $scope.Fabrics = [];
    }

    $scope.Refresh = function () {
        ClearData();
    }

}]);

