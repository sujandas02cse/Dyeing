app.controller("LabDipEnlistment", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    $scope.OpsTime = [{ 'id': 1, 'name': '1st Time' }]
    $scope.CurrentOpTime = 1;
    var CommentEnlishmentList = [];
    var TodayDate = new Date();

    let Time = 0;
    let apptime = 0;
    let finalTime = 0;
    let MaxTime = 0;
    let currentTime = 0;

    $scope.Emp = {
        Id: $rootScope.UserId,
        Name: $rootScope.EmpName,
        Designation: $rootScope.Designation,
        Date: TodayDate
    };

    $scope.TypeList = ['Bleach','Scouring','Normal Wash','Soda Bleach']


    function OpTimes(){
        let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }]
        $scope.OpsTime = atDefaultOption;
        $scope.CurrentOpTime = 1;

        if ($scope.OpsTime.length == 1) {
            $scope.OperationTime = $scope.OpsTime[0];
        }
    }


    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        //if ($scope.UnitList.length == 1) {
        //    $scope.Unit = $scope.UnitList[0];
        //}
    });


    $scope.FindBuyer = function () {
        PlanManagement.GetFabBookingBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;
        });
    }

    $scope.FindJob = function () {
        PlanManagement.GetFabBookingJobByBuyer($scope.Buyer.BuyerId, function (data) {
            $scope.JobList = data;
        });
    }

    $scope.FindStyle = function () {
        PlanManagement.GetFabBookingStyleByJob($scope.Job.JobNo, function (data) {
            $scope.StyleList = data;
        });
    }

    $scope.FindColor = function () {
        PlanManagement.GetFabBookingColorByStyle($scope.Style.StyleId, function (data) {
            $scope.ColorList = data;
        });
    }



    $scope.showData = function () {
       
        //currentTime = $scope.OpsTime.length = 1 ? 0 : $scope.OperationTime.id;
        if ($scope.Color.ColorId > 0) {
            PlanManagement.GetLabDipEnlishmentsData($scope.Buyer.BuyerId,
                $scope.Job.JobNo, $scope.Style.StyleId, $scope.Color.ColorId, 0, function (data) {

                    $scope.AllData = data.m_Item1;
                    //$scope.Emp = data.m_Item2[0];
                    appTime = data.m_Item3[0].maxOpTime;

                    if ($scope.OperationTime == "" || $scope.OperationTime == null || $scope.OperationTime === undefined) newData();
                    else if (apptime < $scope.OperationTime.id) newData();

                    $scope.Emp = data.m_Item2[0] == undefined ? $scope.Emp :
                    {
                        Id: data.m_Item2[0].CreateBy,
                        Name: data.m_Item2[0].EMP_ENAME,
                        Designation: data.m_Item2[0].Designation,
                        Date: TodayDate
                    };

                    let TimeCount = 0;

                    if (($scope.AllData[0].OpTime == null) || ($scope.AllData[0].OpTime == undefined)) {
                        TimeCount = 0;
                    }
                    else {
                        TimeCount = $scope.AllData[0].OpTime;
                    }
                    debugger
                    getCommentsTime(TimeCount);
                });
        }

    }



    if ($scope.OpsTime.length == 1) {
        $scope.OperationTime = $scope.OpsTime[0];
    }

    function newData() {
        angular.forEach($scope.AllData, function (obj) {
            obj.LabDipNo = '';
            obj.LabDipStatus = '';
            obj.PreTreatmentType = '';
            obj.Remarks = '';
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

        if (Time == 0) {
            OpTimes();
            let curentTime = $scope.OpsTime.filter(x => x.id == Time);
            $scope.OperationTime = curentTime[0];
        }
        else if (Time > 1) {
            let curentTime = $scope.OpsTime.filter(x => x.id == Time);
            $scope.OperationTime = curentTime[0];
        }
        else
            $scope.OperationTime = atDefaultOption;
    }


    $scope.getDyeingComments = function () {
        debugger
        finalTime = $scope.OperationTime.id;
        if (apptime < $scope.OperationTime.id) finalTime = 0
        else finalTime = $scope.OperationTime.id;

        if ($scope.AllData.length > 0) {    
            PlanManagement.GetLabDipEnlishmentsData($scope.Buyer.BuyerId,
                $scope.Job.JobNo, $scope.Style.StyleId, $scope.Color.ColorId, finalTime, function (data) {

                    $scope.AllData = data.m_Item1;
                    apptime = data.m_Item3[0].maxOpTime;
                    if (apptime < $scope.OperationTime.id) {
                        angular.forEach($scope.AllData, function (obj) {
                            obj.LabDipNo = '';
                            obj.LabDipStatus = '';
                            obj.PreTreatmentType = '';
                            obj.Remarks = '';
                        });
                    }

                });
        }
    }


    $scope.actionDialog = function (action, dataModel) {

        if (apptime >= $scope.OperationTime.id) return;

        //let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
        //if (appTime != $scope.Batch.ApproveTime) return;

        //if ($scope.CA == false && ($scope.CAReason == '' || $scope.CAReason == null)) return;

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

        debugger

        angular.forEach($scope.AllData, function (item) {
            debugger
            var model = {
                InitInfoId: item.InitInfoId,
                LabDipNo: item.LabDipNo,
                LabDipStatus: item.LabDipStatus,
                PreTreatmentType: item.PreTreatmentType,
                Remarks: item.Remarks,
                OpTime: $scope.OperationTime.id
            };
            CommentEnlishmentList.push(model);
        });

        let obj = {
            labDipEnlishment: CommentEnlishmentList.filter(x => x.OpTime == $scope.OperationTime.id),
            User: $rootScope.UserId,
            OpTime: $scope.OperationTime.id
        };
        return;
        PlanManagement.SaveLabDipEnlishment(obj, function (res) {
            if (res.ErrorMsg == null) {
                $rootScope.alert("Saved Successfully");
                Refresh();
            }
            else $rootScope.alert(res.ErrorMsg);
        });

    }



    $scope.Refresh = function () {
        Refresh();
    }

    function Refresh() {
        $scope.Unit = "";
        $scope.AllData = [];
        $scope.ColorList = [];
        $scope.StyleList = [];
        $scope.JobList = [];
        $scope.BuyerList = [];
        $scope.OpsTime = [{ 'id': 1, 'name': '1st Time' }];
        Time = 0;
        $scope.OperationTime = $scope.OpsTime[0]
        DyeingCommentEnlishmentList = [];
        $scope.Emp = {
            Id: $rootScope.UserId,
            Name: $rootScope.EmpName,
            Designation: $rootScope.Designation,
            Date: TodayDate
        };

    }

}]);