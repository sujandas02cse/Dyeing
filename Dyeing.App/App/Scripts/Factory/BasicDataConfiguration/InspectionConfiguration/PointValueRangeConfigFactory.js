app.factory("PointValueRangeConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetPointHeadName = function (cb) {
        $http.get(baseApiURL + 'PointValueRange/GetPointHeadName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Point Head Information....");
        });
    }

    _obj.GetPointValueRangeMInfo = function (cb) {
        $http.get(baseApiURL + 'PointValueRange/GetPointValueRangeMInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Point Value Range Information....");
        });
    }

    _obj.PointValueRange_SaveUpdate = function (Model, cb) {
        $http.post(baseApiURL + 'PointValueRange/PointValueRange_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.Delete = function (PointValueNo, UserId, cb) {
        $http.post(baseApiURL + 'PointValueRange/DeletePointVal?PointValueNo=' + PointValueNo + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }
    return _obj;
}]);