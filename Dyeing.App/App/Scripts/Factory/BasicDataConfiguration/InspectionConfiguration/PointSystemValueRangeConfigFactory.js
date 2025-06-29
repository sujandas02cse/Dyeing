app.factory("PointSystemValueRangeConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetPointSystemName = function (cb) {
        //debugger;
        $http.get(baseApiURL + 'PointSystemValueRange/GetPointSystemName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load System Name Information....");
        });
    }

    _obj.GetPointSystemValueInfo = function (cb) {
        $http.get(baseApiURL + 'PointSystemValueRange/GetPointSystemValueInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Point System Value Range Information....");
        });
    }

    _obj.PointSystemValueRange_SaveUpdate = function (Model, cb) {
        //debugger
        //alert(Model)
        $http.post(baseApiURL + 'PointSystemValueRange/PointSystemValueRange_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.Delete = function (PointValueRangeNo, UserId, cb) {
        $http.post(baseApiURL + 'PointSystemValueRange/Delete?PointValueRangeNo=' + PointValueRangeNo + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }
    return _obj;
}]);