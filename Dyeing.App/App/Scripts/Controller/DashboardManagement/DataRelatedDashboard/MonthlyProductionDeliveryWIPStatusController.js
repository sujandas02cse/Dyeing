app.controller("MonthlyProductionDeliveryWIPStatusController", ['$scope', '$timeout', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'MonthlyQualityInspectionSummary', function ($scope, $timeout, $window, $rootScope, filterFilter, $mdDialog, MonthlyQualityInspectionSummary) {

    $scope.Mode = 'New';

    // Get the current year (Current year is 2025)
    var currentYear = new Date().getFullYear();
    // Calculate the start and end of the desired range
    var startYear = currentYear - 10; // 2015
    var endYear = currentYear + 10;   // 2035

    // Initialize an empty array to store the years
    $scope.years = [];

    // Loop from the start year to the end year and push each into the array
    for (var i = startYear; i <= endYear; i++) {
        $scope.years.push(i);
    }

    //Month List
    $scope.monthsList = [
        { name: 'January', value: 1 },
        { name: 'February', value: 2 },
        { name: 'March', value: 3 },
        { name: 'April', value: 4 },
        { name: 'May', value: 5 },
        { name: 'June', value: 6 },
        { name: 'July', value: 7 },
        { name: 'August', value: 8 },
        { name: 'September', value: 9 },
        { name: 'October', value: 10 },
        { name: 'November', value: 11 },
        { name: 'December', value: 12 }
    ];

    //Load All Unit
    MonthlyQualityInspectionSummary.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

    //Load Buyer By Unit
    $scope.GetBuyer = function (Unit) {
        $rootScope.ShowLoader('Loading Buying Data');

        MonthlyQualityInspectionSummary.GetBuyerNo(Unit.Id, function (data) {
            $scope.Unit = $scope.UnitList.find(x => x.UnitId === Unit.UnitId);
            $scope.BuyerList = data;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();
    }

    //Load Job Using Buyer
    $scope.GetJobNo = function (Buyer) {
        $rootScope.ShowLoader('Loading Job Data');
        MonthlyQualityInspectionSummary.GetJobNo(Buyer.BuyerId, function (data) {
            $scope.JobList = data;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();
    }


    //Function to load data   
    $scope.LoadingData = function (Unit, Buyer, Job, RYear, RMonth) {
        debugger
        if (!Unit) {
            $rootScope.alert('Please Select Unit');
        }
        else if (!RYear) {
            $rootScope.alert('Please Select Year');
        }
        var BuyerId = 0, JobId = 0;

        BuyerId = Buyer === undefined ? 0 : Buyer.BuyerId;
        JobId = Job === undefined ? 0 : Job.JobId;
        RMonth = RMonth === undefined ? 0 : RMonth;

        $scope.Processing = true;
        $scope.disabledShow = true;
        $rootScope.ShowLoader('Loading Data');
        debugger
        MonthlyQualityInspectionSummary.GetMonthlyProductionDeliveryWIPStatus(Unit.UnitId, BuyerId, JobId, RYear, RMonth, function (data) {
            debugger
            $scope.ProductionData = data;

            $scope.Processing = false;
            $scope.disabledShow = false;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();

    };



    //Pdf Extract
    $scope.DownloadPdf = function (Unit, Buyer, Job, RYear, RMonth) {
        debugger
        if (!Unit) {
            $rootScope.alert('Please Select Unit');
        }
        else if (!RYear) {
            $rootScope.alert('Please Select Year');
        }
        var BuyerId = 0, JobId = 0;

        BuyerId = Buyer === undefined ? 0 : Buyer.BuyerId;
        JobId = Job === undefined ? 0 : Job.JobId;
        RMonth = RMonth === undefined ? 0 : RMonth;

        $window.open('../DashboardManagement/GET_MonthlyProductionDeliveryWIPStatus?UnitId=' + Unit.UnitId + '&BuyerId=' + BuyerId +
            '&JobId=' + JobId + '&RYear=' + RYear + '&RMonth=' + RMonth +
            '&&Format=PDF&&#view=FitH');
    }

    function FormatDate(dateString) {
        var m = moment(dateString, 'YYYY/MM/DD', true);
        //return m.isValid() ? m.toDate() : new Date(NaN);
        return dateString ? moment(dateString).format('YYYY/MM/DD') : '';
    };



}]);