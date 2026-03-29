app.factory("MonthlyQualityInspectionSummary", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (UserId,cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUser?UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBuyerNo = function (UnitId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetBuyerByUnit?UnitNo=' + UnitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.GetJobNo = function (BuyerId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetAllJobByBuyer?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.GetMonthlyQualityInspectionSummary  = function (UnitId, BuyerId, JobId, RYear, RMonth, cb) {
        $http.get(baseApiURL + 'DataRelatedDashboard/GetMonthlyQualityInspectionSummary?UnitId=' + UnitId + '&BuyerId=' + BuyerId +
            '&JobId=' + JobId + '&RYear=' + RYear + '&RMonth=' + RMonth
        ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.GetJobWiseRftStatus = function (UnitId, BuyerId, JobId, RYear, RMonth, cb) {
        $http.get(baseApiURL + 'DataRelatedDashboard/GetJobWiseRftStatus?UnitId=' + UnitId + '&BuyerId=' + BuyerId +
            '&JobId=' + JobId + '&RYear=' + RYear + '&RMonth=' + RMonth
        ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.GetMonthlyProductionDeliveryWIPStatus = function (UnitId, BuyerId, JobId, RYear, RMonth, cb) {
        $http.get(baseApiURL + 'DataRelatedDashboard/GetMonthlyProductionDeliveryWIPStatus?UnitId=' + UnitId + '&BuyerId=' + BuyerId +
            '&JobId=' + JobId + '&RYear=' + RYear + '&RMonth=' + RMonth
        ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }


    
    return _obj;
}]);