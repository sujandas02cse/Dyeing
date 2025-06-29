app.factory("BatchReprocess", ['$http', function ($http) {
    var _obj = {};

    _obj.GetTrollyNo = function (unitId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetTrollyNo?unitId=' + unitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetFinMcByType = function (mcType, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFinMcByType?Type=' + mcType).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchReprocessDataById = function (BpmId, ReprocessNo, cb) {
        $http.get(baseApiURL + 'BatchReprocess/GetBatchReprocessDataById?BpmId=' + BpmId + '&&ReprocessNo=' + ReprocessNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.BatchReprocessData_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchReprocess/BatchReprocessData_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    _obj.GetBatchReprocessData = function (unitId, fromDate, toDate, cb) {
        $http.get(baseApiURL + 'BatchReprocess/GetBatchReprocessData?unitId=' + unitId + '&&fromDate=' + fromDate + '&&toDate=' + toDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch Processing Data....");
        });
    }
    
    return _obj;
}]);