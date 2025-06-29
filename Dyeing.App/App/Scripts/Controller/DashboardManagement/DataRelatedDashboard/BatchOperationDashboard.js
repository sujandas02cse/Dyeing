app.controller("BatchOperationDashboard", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'DataRelatedDashboardFactory', function ($scope, $window, $rootScope, filterFilter, $mdDialog, DataRelatedDashboardFactory) {

    DataRelatedDashboardFactory.GetBatchNo(function (data) {
        $scope.batchList = data;
    });    

    $scope.UnitChange = function () {
        DataRelatedDashboardFactory.GetBuyerByUnit($scope.Unit.Id, function (data) { $scope.BuyerList = data; });
    }
    $scope.BuyerChange = function () {
        DataRelatedDashboardFactory.GetJobByBuyer($scope.Buyer.Id, function (data) { $scope.JobList = data; });
    }    

    $scope.SearchData = function () {
        let fromDate = null, toDate = null;
        
        if ($scope.Unit.Id != undefined && $scope.FromDate != undefined && $scope.ToDate != undefined) {
            //if ($scope.FromDate != undefined && $scope.ToDate != undefined) {
            fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
            toDate = moment($scope.ToDate).format('DD-MMM-YYYY');
            //}
            //debugger;
            let buyerId = 0;
            if ($scope.Buyer)
                buyerId = $scope.Buyer.Id;

            let jobId = 0;
            if ($scope.Job)
                jobId = $scope.Job.Id;

            let BpmId = 0;
            if ($scope.Batch)
                BpmId = $scope.Batch.BpmId;

            DataRelatedDashboardFactory.GetBatchOperationData($scope.Unit.Id, buyerId, jobId, fromDate, toDate, BpmId,
                function (data) {
                    $scope.BatchOperationData = data; $scope.totalItems = data.length;
                });
        }
    }

    $scope.GetDashboardData = function (BpmId) {        
        $window.open('../DashboardManagement/GetBatchCardReport?BpmId=' + BpmId + '&&Format=PDF#view=FitH');
    }

    DataRelatedDashboardFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

    $scope.LoadingData = function () {
        let fromDate = null, toDate = null;
        
        if ($scope.FromDate != undefined && $scope.ToDate != undefined && $scope.Unit.Id != undefined) {
            fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
            toDate = moment($scope.ToDate).format('DD-MMM-YYYY');

            DataRelatedDashboardFactory.GetBatchCardData($scope.Unit.Id, fromDate, toDate, function (data) { $scope.BatchCardData = data; $scope.totalItems = data.length; });
        }

    }

    $scope.Refresh = function () {
        Refresh();
        $scope.search = '';
    }
    function Refresh() {
        $scope.Model = {};
        $scope.btnSave = "Save";
        $scope.Model.IsActive = true;
    };

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

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
        $scope.currentPage = 1; //reset to first paghe
    }

}]);