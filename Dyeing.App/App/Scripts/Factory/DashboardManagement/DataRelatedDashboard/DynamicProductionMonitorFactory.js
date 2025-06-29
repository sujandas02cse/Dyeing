app.factory("DynamicProductionMonitorFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + "MasterDataConfig/GetDyeingMasterUnitData?userCode=" + userCode).then(function successCallback(response) {
            cb(response.data);
        },
        function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    };

    _obj.GetDyeingProductionMonitorData = function (UnitId, Date, FabricIssue, cb) {
        $http.get(baseApiURL + "DataRelatedDashboard/GetDynamicProductionMonitor?UnitId=" + UnitId + "&&Date=" + Date + "&&FabricIssue=" + FabricIssue).then(function successCallback(response) {
            cb(response.data);
        },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };


    return _obj;
}]);