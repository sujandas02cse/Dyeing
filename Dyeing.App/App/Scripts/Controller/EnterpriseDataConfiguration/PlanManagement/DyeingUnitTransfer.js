app.controller("DyeingUnitTransfer", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    

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

    $scope.FindOrder = function () {
        PlanManagement.GetDyeingUnitOrderByStyle($scope.Style.StyleId, function (data) {
            $scope.OrderList = data;
        });
    }

    $scope.FindDyeingChangeData = function () {
        PlanManagement.GetDyeingChangeData($scope.Unit.Id, $scope.Buyer.BuyerId, $scope.Job.JobNo, $scope.Style.StyleId, $scope.Order.OrderId, function (data) {
            $scope.ChangeDataList = data;
        });
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

        let DataWrapperList = [];
        angular.forEach($scope.ChangeDataList, function (item) {

            let obj = {
                InitInfoId : item.Id,
                PreUnitNo : item.DyeingUnitId,
                FinalUnitNo : item.TrDyeingUnit.Id
            }
            DataWrapperList.push(obj);
        });

        let SaveData = {
            UserId: $rootScope.UserId,
            ListData: DataWrapperList
        };


        PlanManagement.SaveDyeingUnitChange(SaveData, function (res) {

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
        $scope.BuyerList = [];
        $scope.ChangeDataList = [];
        $scope.OrderList = [];
        $scope.JobList = [];
        $scope.Order = [];
        $scope.Style = [];
        $scope.Job = [];
        $scope.Buyer = [];
    }

}]);