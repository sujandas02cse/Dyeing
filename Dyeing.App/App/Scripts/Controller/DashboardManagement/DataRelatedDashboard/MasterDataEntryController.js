app.controller("MasterDataEntryController", ['$window', '$scope', '$rootScope', 'filterFilter', '$mdDialog', 'MasterDataEntryFactory', function ($window,$scope, $rootScope, filterFilter, $mdDialog, MasterDataEntryFactory) {

    MasterDataEntryFactory.GetUnitAll(function (data) { $scope.UnitList = data; });



    $scope.GetData = function (master) {
        debugger
        if (chkValidation(master) == true) {
            MasterDataEntryFactory.GetMasterData(master.Unit.Id, formatDate(master.FromDate), formatDate(master.ToDate), function (data)
            {
             
                $scope.MotherDataList = data;
            });
        }
       
    }



    function chkValidation(master) {
        //1=Valid, 0=Invalid        
        
        if (master == null || master == undefined) {
            $rootScope.alert("Please Select Required Parameter.....");
            return false;
        }
        if (master.Unit == null || master.Unit == undefined) {
            $rootScope.alert("Please Select Required Unit.....");
            return false;
        }

        if (master.FromDate == null || master.FromDate == undefined) {
            $rootScope.alert("Please Select From Date.....");
            return false;
        }
        if (master.ToDate == null || master.ToDate == undefined) {
            $rootScope.alert("Please Select To Date.....");
            return false;
        }

        const  fd = formatDate(master.FromDate);
        const    td = formatDate(master.ToDate);
        if (fd > td) {
            $rootScope.alert("From Date is greater than To date.....");
            return false;
        }

        return true;
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    $scope.ReportView = function (Format) {
        debugger;
        var UnitId = $scope.master.Unit.Id;
        var FromDate = formatDate($scope.master.FromDate);
        var ToDate = formatDate($scope.master.ToDate);
        $window.open('../DashboardManagement/GetMasterDataReport?UnitId=' + UnitId + '&&FromDate=' + FromDate + '&&ToDate=' + ToDate + '&&Format=' + Format + '#view=FitH');

    }

}]);