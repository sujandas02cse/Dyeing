app.controller("ProductionPlanDashboardController", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'ProductionPlanDashboardFactory', function ($scope, $window,$rootScope, filterFilter, $mdDialog, ProductionPlanDashboardFactory) {

    ProductionPlanDashboardFactory.GetUnitAll(function (data) { $scope.UnitList = data; });

    $scope.GetDashboardData = function () {
        var fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
        var toDate = moment($scope.ToDate).format('DD-MMM-YYYY');
        ProductionPlanDashboardFactory.GetProductionPlanDashboard($scope.UnitId, fromDate, toDate,
            function (data) {
                $scope.PlanList = data;
            }
        );
    }
    $scope.ReportView = function (Format) {
        debugger;
        var UnitId = $scope.UnitId;
        var FromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
        var ToDate = moment($scope.ToDate).format('DD-MMM-YYYY');
        $window.open('../DashboardManagement/GetProductionPlanReport?UnitId=' + UnitId + '&&FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&Format=' + Format +'#view=FitH');

    }
    function InitilState() {
        $scope.rptParamList = angular.copy($scope.data);
    }
    $scope.Refresh = function () {
        InitilState();
        //$scope.rpt.ReportingId = null;
        $scope.parmData = {};
    }

}]);