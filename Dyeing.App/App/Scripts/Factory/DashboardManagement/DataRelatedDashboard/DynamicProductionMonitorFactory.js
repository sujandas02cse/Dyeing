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

    _obj.GetDyeingProductionMonitorData = function (UnitId, BuildingId, Date, FabricIssue, cb) {
        $http.get(baseApiURL + "DataRelatedDashboard/GetDynamicProductionMonitor?UnitId=" + UnitId + "&&BuildingId=" + BuildingId + "&&Date=" + Date + "&&FabricIssue=" + FabricIssue).then(function successCallback(response) {
            cb(response.data);
        },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };

    _obj.GetBuildingsByUnit = function (Unit, cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetBuildingsByUnit?Unit=' + Unit).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Building Information....");
        });
    }


    return _obj;
}]);