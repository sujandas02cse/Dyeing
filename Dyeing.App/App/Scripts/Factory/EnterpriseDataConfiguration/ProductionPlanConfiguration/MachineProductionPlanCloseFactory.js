app.factory("MachineProductionPlanClose", ['$http', function ($http) {
    var _obj = {};
    _obj.GetPlanNo = function (isActive, cb) {
        $http.get(baseApiURL + 'MachineProductionPlanClose/GetPlanNo?isActive=' + isActive).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }
    _obj.GetBatchNo = function (isActive,cb) {
        $http.get(baseApiURL + 'MachineProductionPlanClose/GetBatchNo?isActive=' + isActive).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }
    _obj.GetPlanInfo = function (MppmId, cb) {
        $http.get(baseApiURL + 'MachineProductionPlanChange/GetPlanInfo?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineProductionPlanClose/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    return _obj;
}]);