app.controller("MToMTransfer", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    let Current = 0;
    let maxOpTime = 0;
    
    var TodayDate = new Date();

    $scope.Emp = {
        Id: $rootScope.UserId,
        Name: $rootScope.EmpName,
        Designation: $rootScope.Designation,
        Date: TodayDate
    };

    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBatchAndMachine();

            PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
                $scope.MachineList = data;
            });
        }
    });

    $scope.LoadBatchAndMachine = function () {
        PlanManagement.GetBatchAndMachineData($scope.Unit.Id, function (data) {
            $scope.BatchList = data.m_Item1;
            $scope.MachineList = data.m_Item2;
            debugger
            PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
                $scope.MachineList = data;
            });
        });
    }

    let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }]
    $scope.OpsTime = atDefaultOption;
    $scope.CurrentOpTime = 1;

    if ($scope.OpsTime.length == 1) {
        $scope.OperationTime = $scope.OpsTime[0];
    }

    $scope.LoadDataByBatch = function () {
        if ($scope.OpsTime.length == 1)
            Current = 0;
        else if ($scope.OpsTime.length == $scope.OperationTime.id)
            Current = 0;
        else
            Current = $scope.OperationTime.id;
        debugger
        PlanManagement.GetBatchDetailData($scope.Batch.BpmId, Current, function (data) {

            $scope.BatchData = data.m_Item1[0];
            $scope.BatchData.MaxOpTime = data.m_Item1[0].MaxOpTime = null ? 0 : data.m_Item1[0].MaxOpTime;
            var a = data.m_Item2[0];

            if (Current > 0 && $scope.BatchData.MaxOpTime > 0) {
                $scope.NewMc = $scope.MachineList.filter(x => x.MDId == data.m_Item1[0].ToMDId)[0];
            }
            $scope.Emp = data.m_Item2[0] == undefined ? $scope.Emp : {
                Id: data.m_Item2[0].Id,
                Name: data.m_Item2[0].Name,
                Designation: data.m_Item2[0].Designation,
                Date: data.m_Item2[0].CreateDate
            };

            getCommentsTime($scope.BatchData.MaxOpTime);
        });
    }

    function getCommentsTime(count) {
        

        if (count == 0)
            Time = 1;
        else
            Time = count + 1;

        if (Time > 1) {
            $scope.OpsTime = [{ 'id': 1, 'name': '1st Time' }];
            for (i = 2; i <= Time; i++) {
                let model = {
                    id: i,
                    name: i == 2 ? '2nd Time' : (i == 3 ? '3rd Time' : i + 'th Time')
                }
                let isExist = $scope.OpsTime.filter(x => x.id == i);
                if (isExist.length == 0)
                    $scope.OpsTime.push(model);
            }
        }
        if (Current == 0) {
            $scope.BatchData.ToQty = "";
            $scope.NewMc = "";
            curentTime = $scope.OpsTime.filter(x => x.id == Time);
            $scope.OperationTime = curentTime[0];
        }
        else if (Current == $scope.BatchData.MaxOpTime) {
            curentTime = $scope.OpsTime.filter(x => x.id == $scope.BatchData.MaxOpTime);
            $scope.OperationTime = curentTime[0];
        }
        else if (Current == $scope.$scope.OperationTime.id) {
            curentTime = $scope.OpsTime.filter(x => x.id == ($scope.OperationTime.id));
            $scope.OperationTime = curentTime[0];
        }
        else if (Current != $scope.BatchData.MaxOpTime) {
            curentTime = $scope.OpsTime.filter(x => x.id == Time);
            $scope.OperationTime = curentTime[0];
        }  
    }

    $scope.actionDialog = function (action, dataModel) {
        if ($scope.OperationTime.id != ($scope.BatchData.MaxOpTime + 1))
            return;

        debugger;
        if (($scope.BatchData.AvailQty < $scope.BatchData.ToQty) || $scope.NewMc == null) return;

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

        let Obj = {
            BpmId: $scope.BatchData.BpmId,
            FromMDId: $scope.BatchData.MDId,
            ToMDId: $scope.NewMc.MDId,
            BaseQty: $scope.BatchData.AvailQty,
            Qty: $scope.BatchData.AvailQty - $scope.BatchData.ToQty,
            OpTime: $scope.OperationTime.id,
            User: $rootScope.UserId
        }

        debugger
        PlanManagement.SaveMachineChangeData(Obj, function (res) {
            debugger
            if (res.ErrorMsg == null) {
                debugger
                Refresh();
                $rootScope.alert("Saved Successfully");

            }
            else {
                debugger
                Refresh();
                $rootScope.alert(res.ErrorMsg);

            }
        });
    }

    $scope.Refresh = function () {
        Refresh();
    }

    function Refresh() {
        debugger
        //$scope.Unit = "";
        //$scope.UnitList = [];
        $scope.MachineList = [];
        $scope.BatchList = [];
        $scope.Batch = '';
        $scope.NewMc = '';
        $scope.BatchData = '';
        $scope.Unit = '';
        CurrentTime = 0;
        $scope.OpsTime = [{ 'id': 1, 'name': '1st Time' }];
        Current = 0;
        /*$scope.LoadDataByBatch = [];*/
        LoadBatchAndMachine();
    }
    

}]);