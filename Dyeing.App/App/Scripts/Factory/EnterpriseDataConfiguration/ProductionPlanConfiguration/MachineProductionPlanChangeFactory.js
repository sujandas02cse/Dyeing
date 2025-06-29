app.factory("MachineProductionPlanChange", ['$http', function ($http) {
    var _obj = {};
    _obj.GetPlanNo = function (cb) {
        $http.get(baseApiURL + 'MachineProductionPlanChange/GetPlanNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }
    _obj.GetBatchNo = function (cb) {
        $http.get(baseApiURL + 'MachineProductionPlanChange/GetBatchNo').then(function successCallback(response) {
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
    _obj.GetToMcNo = function (userid, cb) {
        $http.get(baseApiURL + 'MachineProductionPlanChange/GetToMcNo?userid=' + userid).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineProductionPlanChange/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    return _obj;
}]);