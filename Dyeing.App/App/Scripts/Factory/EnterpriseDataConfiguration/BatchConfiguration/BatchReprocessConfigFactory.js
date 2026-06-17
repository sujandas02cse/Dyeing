app.factory("BatchReprocessConfig", ['$http', function ($http) {
    var _obj = {};

    

    _obj.GetDyeingUnit = function (userId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUser?UserId=' + userId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.GetBatchNo = function (unitNo, cb) {
        $http.get(baseApiURL + 'BatchReprocessConfig/GetBatchDatabyUnit?UnitNo=' + unitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    

    _obj.GetRollData = function (bpmId, cb) {
        $http.get(baseApiURL + 'BatchReprocessConfig/GetRollDatabyBatch?BpmId=' + bpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveRollData = function (data, cb) {
        $http.post(baseApiURL + 'BatchReprocessConfig/BatchReprocessData_SaveUpdate?', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    //New Process


    _obj.GetBatchbyUnitNew = function (UnitId,Type, cb) {
        $http.get(baseApiURL + 'BatchReprocessConfig/GetBatchbyUnitNew?UnitId=' + UnitId + '&&Type=' + Type).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDatabyUnitNew = function (BpmId, cb) {
        $http.get(baseApiURL + 'BatchReprocessConfig/GetBatchDatabyUnitNew?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveUpdateRollData = function (data, cb) {
        $http.post(baseApiURL + 'BatchReprocessConfig/BatchReprocessData_SaveUpdateNew?', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    return _obj;
}]);