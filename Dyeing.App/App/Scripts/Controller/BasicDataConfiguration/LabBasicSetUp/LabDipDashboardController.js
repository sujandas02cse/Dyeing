app.controller("LabDipDashboardController", ["$scope", "$window", "$rootScope", "filterFilter", "$mdDialog", "LabDipDashboard", function ($scope, $window, $rootScope, filterFilter, $mdDialog, LabDipDashboard) {

    //BatchCardDashboardFactory.GetUnitByUser($rootScope.UserId, function(data) {
    //  debugger;
    //  $scope.UnitList = data;
    //  if ($scope.UnitList.length == 1) {
    //    $scope.Unit = $scope.UnitList[0];
    //  }
    //});

    LabDipDashboard.GetUnitWithoutUser(function (data) {
        debugger;
        $scope.UnitList = data;
    });


    $scope.GetDashboardData = function (BpmId, flag) {
        //var BpmId = $scope.BpmId;
        debugger;
        LabDipDashboard.GetDyeingUnitAll(function (data) {
            $scope.ReportingUnit = data;
        });

    };






    $scope.LoadingData = function () {
        let fromDate = null,
            toDate = null;


        debugger;

        if ($scope.FromDate != undefined && $scope.ToDate != undefined && $scope.Unit.Id != undefined) {
            fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
            toDate = moment($scope.ToDate).format("DD-MMM-YYYY");

            LabDipDashboard.GetLabDipDashboardReceipe($scope.Unit.Id, fromDate, toDate, function (data) {
                $scope.LabDipReceipeData = data;
                $scope.totalItems = data.length;
            });
        }
    };

    $scope.Refresh = function () {
        Refresh();
        $scope.search = "";
    };
    function Refresh() {
        $scope.Model = {};
        $scope.btnSave = "Save";
        $scope.Model.IsActive = true;
    }

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    // Start Pagination
    $scope.viewby = 20;

    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };

}
]);
