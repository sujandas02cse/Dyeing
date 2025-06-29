app.controller("StyleOrderDashboardController", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'DataRelatedDashboardFactory', function ($scope, $window, $rootScope, filterFilter, $mdDialog, DataRelatedDashboardFactory) {

    $scope.GetDashboardData = function (BpmId) {        
        $window.open('../DashboardManagement/GetBatchCardReport?BpmId=' + BpmId + '&&Format=PDF#view=FitH');
    }

    DataRelatedDashboardFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        //if ($scope.UnitList.length == 1) {
        //    $scope.Unit = $scope.UnitList[0];

        //    DataRelatedDashboardFactory.GetBatchCardData($scope.Unit.Id, function (data) { $scope.BatchCardData = data; $scope.totalItems = data.length; });
        //}
    });

    $scope.UnitChange = function () {
        DataRelatedDashboardFactory.GetBuyerByUnit($scope.Unit.Id, function (data) { $scope.BuyerList = data; });
    }
    $scope.BuyerChange = function () {
        DataRelatedDashboardFactory.GetJobByBuyer($scope.Buyer.Id, function (data) { $scope.JobList = data; });
    }

    $scope.SearchData = function () {
        let fromDate = null, toDate=null;
        //if ($scope.FromDate == undefined) {
        //    fromDate=
        //}
        if ($scope.Unit.Id != undefined && $scope.Buyer.Id != undefined) {
            if ($scope.FromDate != undefined && $scope.ToDate != undefined) {
                fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
                toDate = moment($scope.ToDate).format('DD-MMM-YYYY');
            }

            let jobId = 0;
            if ($scope.Job)
                jobId = $scope.Job.Id;
            DataRelatedDashboardFactory.GetStyleOrderData($scope.Unit.Id, $scope.Buyer.Id, jobId, fromDate, toDate, function (data) { $scope.StyleOrderData = data; $scope.totalItems = data.length; });
        }
    }

    $scope.ExportData = function () {
        debugger
        if ($scope.StyleOrderData.length > 0) {
            debugger;
            let today = new Date();
            //console.log(today);

            let dd = today.getDate();
            let mm = today.getMonth() + 1;

            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = minutes + '' + hours + '' + dd + '' + mm + '' + yyyy;

            alasql('SELECT SlNo, Buyer, Job, Style AS StyleNo, OrderInfo AS OrderNo INTO XLSX("StyleOrderData_' + today + '.xlsx",{headers:true}) FROM ?', [$scope.StyleOrderData]);
        }
        //$scope.StyleOrderData;
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
    $scope.viewby = 50;

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