app.controller("MonthlyQualityInspectionSummaryController", ['$scope', '$timeout', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'MonthlyQualityInspectionSummary', function ($scope, $timeout, $window, $rootScope, filterFilter, $mdDialog, MonthlyQualityInspectionSummary) {
    
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
        MonthlyQualityInspectionSummary.GetMonthlyQualityInspectionSummary(Unit.UnitId, BuyerId, JobId, RYear, RMonth, function (data) {
            $scope.ProductionData = data.m_Item1;
            $scope.penaltyDefects = data.m_Item2;
            $scope.appearanceDefects = data.m_Item3;
            $scope.Processing = false;
            $scope.disabledShow = false;
            if ($scope.appearanceDefects === undefined || $scope.penaltyDefects === undefined) return;
            createBarChart('penaltyChart', 'Penalty Point', $scope.penaltyDefects);
            createBarChart('appearanceChart', 'Appearence', $scope.appearanceDefects);
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();

    };


     //Chart.js bar chart creator
    function createBarChart(canvasId, DataTitle, dataArray) {
        debugger
        var ctx = document.getElementById(canvasId);
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataArray.map(x => x.name.split(' ')),
                datasets: [{
                    label: 'Defect Count',
                    data: dataArray.map(x => x.defCount),
                    backgroundColor: ['#007bff', '#28a745', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: 20 },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: false,
                            font: { size: 12 }
                        },
                        grid: { display: false },
                        categoryPercentage: 0.8,
                        barPercentage: 0.8
                    },
                    y: {
                        beginAtZero: true
                        , suggestedMax: 5000
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: DataTitle,
                        font: { size: 14 }
                    }
                }
            }
        });
    }


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

        $window.open('../DashboardManagement/GET_MonthlyQualityInspectionSummary?UnitId=' + Unit.UnitId + '&BuyerId=' + BuyerId +
            '&JobId=' + JobId + '&RYear=' + RYear + '&RMonth=' + RMonth +
            '&&Format=PDF&&#view=FitH');
    }

    function FormatDate(dateString) {
        var m = moment(dateString, 'YYYY/MM/DD', true);
        //return m.isValid() ? m.toDate() : new Date(NaN);
        return dateString ? moment(dateString).format('YYYY/MM/DD') : '';
    };



}]);