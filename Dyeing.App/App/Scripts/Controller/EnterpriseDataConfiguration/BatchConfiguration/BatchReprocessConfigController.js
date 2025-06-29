app.controller("BatchReprocessConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'BatchReprocessConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, BatchReprocessConfig) {
    var Batch;
    var Unit;
    var arr = [];
    var allRollData;
    var AllroleDataModel;


    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            }))
            .then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {
                    save();
                }
            });
    }
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Machine Model Configuration Data?' };
        }
        return obj;
    }

    function chkValidation() {
        //1=Valid, 0=Invalid        
        var chkDup = ($scope.Batch != null) ? true : false;

        if ($scope.btnSave == "Save" && chkDup == true) {

            return "0";
        } else if ($scope.btnSave == "Update" && chkDup == true) {
            return "0";
        }
        return "1";
    }


    ///all unit Data
    BatchReprocessConfig.GetDyeingUnit($rootScope.UserId, function (data) {
        debugger
        $scope.allUnit = data;
    });

    ///all batch data by unit
    $scope.getUnitVal = function () {
        Unit = $scope.Unit;
        debugger
        $scope.allBatch = BatchReprocessConfig.GetBatchNo(Unit.UnitId, function (data) {
            $scope.allBatch = data;
        });
    };

    ///batch value by bpm id
    $scope.getBatchVal = function () {
        Batch = $scope.Batch;
        debugger
        $scope.allRollData = BatchReprocessConfig.GetRollData(Batch.BpmId, function (data) {
            debugger
            console.log("data", data);
            $scope.allRollData = data;
            allRollData = $scope.allRollData;
            //$scope.hide = false; 
        });  
    };

    $scope.toggleRadio = function (index) {
        $scope.allRollData[index].RStatus = null;
        AllroleDataModel = $scope.allRollData.filter(x => x.RStatus != null);
    };

    $scope.selectRadio = function (val, index) {
        $scope.allRollData[index].RStatus = val;
        AllroleDataModel = $scope.allRollData.filter(x => x.RStatus != null);


        //var pushData = new Object();
        //var first = $scope.allRollData.filter(x => x.RollNo == $scope.allRollData[index].RollNo)
        //if (first.RollNo != $scope.allRollData[index].RollNo) {
        //    pushData.RollNo = $scope.allRollData[index].RollNo;
        //    pushData.BpmId = a.BpmId;
        //    pushData.RStatus = val;
        //    console.log(pushData);
        //    arr.push(pushData);
        //    console.log(arr);
        //}
        //else {
        //    first.RollNo = $scope.allRollData[index].RollNo;
        //    first.BpmId = $scope.allRollData[index].BpmId;
        //    first.RStatus = val;
        //}
    }

    

    function save (){
        arr = AllroleDataModel.filter(x => x.RStatus != null);
        

        ///Object creation for post  start
        let dataValue = angular.forEach(arr, function (obj) {
            obj.BpmId = Batch.BpmId;
            delete obj.Qty;
        });
        let finalData = {
            UserId: $rootScope.UserId,
            Details: dataValue
        };
        console.log("finalData", finalData);
        ///Object creation for post  end

        
        let response = BatchReprocessConfig.SaveRollData(finalData, function (data) {
            if (data.Msg == " Data Saved Successfully....") {
                
                $scope.allRollData = [];
                //$scope.allBatch = [];
                //$scope.allUnit = [];
                finalData = [];
                AllroleDataModel = [];
                $scope.Unit = [];
                $scope.Batch = [];
                Batch = [];
                Unit = [];
                arr = [];
                $rootScope.alert(data.Msg);
            }
            else {
                $rootScope.alert(data.Msg);
            }
        });
    }


    

}]);