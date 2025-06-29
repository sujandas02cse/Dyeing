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
        $http.post(baseApiURL + 'BatchReprocessConfig/BatchReprocessData_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    return _obj;
}]);