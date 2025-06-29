app.controller("PrioritySetDashboard", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'Dashboard', function ($scope, $window, $rootScope, filterFilter, $mdDialog, Dashboard) {
    Dashboard.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

    $scope.FindMachine = function () {
        Dashboard.GetMachineData($scope.Unit.Id, function (data) {
            $scope.MachineList = data;
        });
    }


    $scope.GetPriorityData = function () {
        $scope.PriorityData = Dashboard.GetPrioritySetData($scope.Unit.Id, $scope.Machine.MachineId, function (data) {
            $scope.PriorityData = data;
        });
    }

}]);