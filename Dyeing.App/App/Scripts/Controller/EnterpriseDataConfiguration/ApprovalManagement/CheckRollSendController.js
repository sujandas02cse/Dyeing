app.controller("CheckRollSend", ['$scope', '$window', '$rootScope', '$mdDialog', '$mdToast', 'ApprovalManagement', function ($scope, $window, $rootScope, $mdDialog, $mdToast, ApprovalManagement) {
    
    debugger
    ///get all Unit Data
    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function (data) {
        $scope.AllUnitData = data;

        if ($scope.AllUnitData.length == 1) {
            $scope.Unit = $scope.AllUnitData[0];
            $scope.GetDyeingUnit();
        }
    });


    $scope.CheckState = function () {
        $scope.RollSend = $scope.RollSend = undefined ? false : true;
    }

    ///get all batch data function calling from Unit
    $scope.GetDyeingUnit = function () {
        $scope.allBatch = ApprovalManagement.GetCRApprovalBatchList($scope.Unit.UnitId, function (data) {
            $scope.allBatch = data;
        });
    }

    defaultUser();
    function defaultUser() {
        $scope.Emp = {
            Id: $rootScope.UserId,
            Name: $rootScope.EmpName,
            Designation: $rootScope.Designation
        };
    }

    let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }];
    $scope.ApproveTime = atDefaultOption;
    $scope.CurrApproveTime = 1;
    $scope.STShow = false;
    $scope.getDataByBatchId = function () {
        let appTime = $scope.Batch.ApproveTime;
        let pAppTime = 0;
        if (appTime == "") appTime = 1;
        if (appTime < $scope.CurrApproveTime)
            pAppTime = appTime;
        ApprovalManagement.GetAllTypeApprovalBatchData($scope.Batch.BpmId, 'CRSend', pAppTime, function (data) {
            console.log("data", data);
            $scope.BatchData = data.m_Item1[0];
            let appTime = parseInt(data.m_Item1[0].ApproveTime);
            $scope.CurrApproveTime = appTime;
            $scope.ApproveTime = atDefaultOption;

            if (appTime > 1) {
                for (i = 2; i <= appTime; i++) {
                    let model = {
                        id: i,
                        name: i == 2 ? '2nd Time' : (i == 3 ? '3rd Time' : i + 'th Time')
                    }
                    let isExist = $scope.ApproveTime.filter(x => x.id == i);
                    if (isExist.length == 0)
                        $scope.ApproveTime.push(model);
                }
            }

            if (pAppTime > 0)
                $scope.Batch.ApproveTime = pAppTime;
            else
                $scope.Batch.ApproveTime = appTime;

            let RollSend = data.m_Item2[0].RollSend;
            let ApprovedAt = data.m_Item2[0].ApprovedAt;
            $scope.RollSend = (RollSend = undefined || RollSend == 0) ? false : true;
            $scope.Batch.ApprovedAt = ApprovedAt;            

            let LastAppTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
            if (LastAppTime != $scope.Batch.ApproveTime) {
                $scope.Emp = data.m_Item3[0];
                $scope.STShow = true;
            } else {
                defaultUser();
                $scope.STShow = false;
            }

        });
    }

    $scope.actionDialog = function (action, dataModel) {
        let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
        if (appTime != $scope.Batch.ApproveTime) return;

        if ($scope.RollSend == undefined || $scope.RollSend==false) {
            $rootScope.alert("Please! Select Check Roll Send....");
            return;
        }

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
        if ($scope.RollSend != true) {
            $rootScope.alert("Please! Check Send");
            return;
        }
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Data?' };
        }
        return obj;
    }

    function SaveUpdate() {        
        let sendObj = {
            UserId: $rootScope.UserId,
            BpmId: $scope.Batch.BpmId,
            RollSend: $scope.RollSend === true ? 1 : 0,
            ApprovedTime: $scope.Batch.ApproveTime
        }

        ApprovalManagement.SaveUpdateCRSend(sendObj, function (res) {
            if (res.ErrorMsg == null) {                
                $rootScope.alert("Data saved Successfully");
                Refresh();
            }
            else $rootScope.alert(res.ErrorMsg);
        }); 
    }

    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {       
        if ($scope.AllUnitData.length == 1) {
            $scope.Unit = $scope.AllUnitData[0];
            $scope.GetDyeingUnit();
        }
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.allRollData = [];
        $scope.RollSend = false;
        $scope.STShow = false;
        $scope.ApproveTime = [{ 'id': 1, 'name': '1st Time' }];            
    };

}]);