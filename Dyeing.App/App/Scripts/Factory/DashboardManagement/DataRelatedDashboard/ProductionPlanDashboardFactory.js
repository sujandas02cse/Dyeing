app.factory("ProductionPlanDashboardFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }
    _obj.GetProductionPlanDashboard = function (unitId, fromDate, toDate, cb) {
        $http.get(baseApiURL + 'DataRelatedDashboard/GetPlanData?UnitId=' + unitId + '&&FromDate=' + fromDate + '&&ToDate=' + toDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    return _obj;
}]);