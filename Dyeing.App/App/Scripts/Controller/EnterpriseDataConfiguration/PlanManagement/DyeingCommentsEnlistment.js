
app.controller("DyeingCommentsEnlistment", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {
    //$scope.Processing = false;
    var CommentEnlishmentList=[];
    var TodayDate = new Date();
    

    let Time = 0;
    let apptime = 0;
    let finalTime = 0;
    let MaxTime = 0;

    $scope.Emp = {
        Id: $rootScope.UserId,
        Name: $rootScope.EmpName,
        Designation: $rootScope.Designation,
        Date: TodayDate
    };

    function OpTimes() {
        let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }]
        $scope.OpsTime = atDefaultOption;
        $scope.CurrentOpTime = 1;

        if ($scope.OpsTime.length == 1) {
            $scope.OperationTime = $scope.OpsTime[0];
        }
    }

    let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }]
    $scope.OpsTime = atDefaultOption;
    $scope.CurrentOpTime = 1;
    
    if ($scope.OpsTime.length == 1) {
        $scope.OperationTime = $scope.OpsTime[0];
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
        debugger
        if ($scope.Color.ColorId > 0) {
            PlanManagement.GetCommentEnlishmentsData($scope.Buyer.BuyerId,
                $scope.Job.JobNo, $scope.Style.StyleId, $scope.Color.ColorId, 0, function (data) {

                    $scope.AllData = data.m_Item1;
                    //$scope.Emp = data.m_Item2[0];
                    appTime = data.m_Item3[0].maxOpTime;

                    if ($scope.OperationTime == "" || $scope.OperationTime == null || $scope.OperationTime === undefined) newData();
                    if (apptime < $scope.OperationTime.id) newData();


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
                    else
                        TimeCount = $scope.AllData[0].OpTime;
                    getCommentsTime(TimeCount);
                });
        }  
        
    }


    function newData() {
        angular.forEach($scope.AllData, function (obj) {
            obj.CFD = '';
            obj.CTD = '';
            obj.Comments = '';
        });
    }

    function getCommentsTime(count) {
        if (count == 0)
            Time = 1;
        else
            Time = count + 1;

        if (Time > 1) {
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
            debugger
            debugger
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
        finalTime = $scope.OperationTime.id;
        if (apptime < $scope.OperationTime.id) finalTime = 0
        else finalTime = $scope.OperationTime.id;
        if ($scope.AllData.length > 0) {
                PlanManagement.GetCommentEnlishmentsData($scope.Buyer.BuyerId,
                    $scope.Job.JobNo, $scope.Style.StyleId, $scope.Color.ColorId, finalTime, function (data) {

                        $scope.AllData = data.m_Item1;
                        apptime  = data.m_Item3[0].maxOpTime;
                        if (apptime < $scope.OperationTime.id) {
                            angular.forEach($scope.AllData, function (obj) {
                                obj.CFD = '';
                                obj.CTD = '';
                                obj.Comments = '';
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
    function formatDate(date) {
        debugger
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '1');
        return `${year}-${month}-${day}`;
    }

    function SaveData() {
        angular.forEach($scope.AllData, function (item) {
            var model = {
                InitInfoId: item.InitInfoId,
                CStartDate: formatDate(new Date(item.CFD)).toString(),
                CEndDate: formatDate(new Date(item.CTD)).toString(),
                Comments: item.Comments,
                OpTime: $scope.OperationTime.id
            };
            CommentEnlishmentList.push(model);
        });
        debugger
        let obj = {
            DyeingCommentEnlishmentList: CommentEnlishmentList.filter(x => x.OpTime == $scope.OperationTime.id),
            userId: $rootScope.UserId,
            OpTime: $scope.OperationTime.id
        };
        debugger
        PlanManagement.SaveCommentEnlishment(obj, function (res) {  
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
        $scope.OperationTime = $scope.OpsTime[0];
        DyeingCommentEnlishmentList = [];
        $scope.Emp = {
            Id: $rootScope.UserId,
            Name: $rootScope.EmpName,
            Designation: $rootScope.Designation,
            Date: TodayDate
        };
        
    }




}]);
