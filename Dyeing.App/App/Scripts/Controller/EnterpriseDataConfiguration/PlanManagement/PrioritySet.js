app.controller("PrioritySet", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    let WrapperDataForSave = [];
    let NewPriorityData = [];

    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.FindMachine();
        }
    });

    $scope.FindMachine = function () {
        PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
            $scope.MachineList = data;
        });
    }

    $scope.GetPriorityData = function () {
        PlanManagement.GetPriorityData($scope.Unit.Id, $scope.Machine.MachineId, function (data) {
            $scope.MachinePriorityData = data;
            getPriorityTime($scope.MachinePriorityData.length);

            angular.forEach($scope.MachinePriorityData, function (item, index) {
                item.PrioritySet = item.PrioritySet == 0 ? index + 1 : item.PrioritySet;
                item.Sl = index + 1;
            });
        });
    }


    function getPriorityTime(count) {
        $scope.SetCountList = [];
        for (i = 1; i <= count; i++) {
            let isExist = $scope.SetCountList.filter(x => x.id == i);
            if (isExist.length == 0)
                $scope.SetCountList.push(i);
        }
    }

    $scope.GetPriorityDataChange = function (index, priority) {
        PreviousCount = 0;
        NewPriorityData = [];
        
        let SilcedPriorityData = $scope.MachinePriorityData.filter(x => x.Sl != index);
        
        // Find the item with the selected priority set
        var selectedItem = $scope.MachinePriorityData.filter(x => x.Sl == index );

        for (let a = 0; a <= $scope.MachinePriorityData.length - 1; a++) {
            if (a == priority - 1) {
                //selectedItem[0].Sl = a + 1;
                selectedItem[0].PrioritySet = a + 1;
                NewPriorityData.push(selectedItem[0]);
            }
            else{
                //SilcedPriorityData[a].Sl = a + 1;
                SilcedPriorityData[PreviousCount].PrioritySet = a + 1;
                NewPriorityData.push(SilcedPriorityData[PreviousCount]);
                PreviousCount++;
            }
        }
        $scope.MachinePriorityData = NewPriorityData;   
    }



    $scope.actionDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Save') {
                    SaveData();
                }
            });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Data?' };
        }
        return obj;
    }

    function SaveData() {
        angular.forEach(NewPriorityData, function (item) {
            var model = {
                BpmId: item.BpmId,
                PriorityNo: item.PrioritySet
            };
            WrapperDataForSave.push(model);

        });

        let SaveObj = {
            UserId: $rootScope.UserId,
            DataList: WrapperDataForSave
        }

        PlanManagement.SavePrioritySet(SaveObj, function (res) {
            if (res.ErrorMsg == null) {
                $rootScope.alert("Saved Successfully");
                Refresh();
            }
            else {
                Refresh();
                $rootScope.alert(res.ErrorMsg);
                
            }
        });
    }



    $scope.Refresh = function () {
        Refresh();
    }


    function Refresh() {
        $scope.Unit = "";
        $scope.Machine = "";
        $scope.MachineList = [];
        $scope.ColorList = [];
        $scope.StyleList = [];
        $scope.JobList = [];
        $scope.BuyerList = [];
        WrapperDataForSave = [];
        $scope.MachinePriorityData = [];
    }

}]);