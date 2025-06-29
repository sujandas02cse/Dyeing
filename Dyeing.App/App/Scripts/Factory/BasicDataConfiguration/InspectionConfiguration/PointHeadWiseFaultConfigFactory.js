app.factory("PointHeadWiseFaultConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetPointHead = function (cb) {
        $http.get(baseApiURL + 'PointHeadWiseFaultConfig/GetPointHead').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    }
    _obj.GetFaultName = function (PheadId, cb) {
        $http.get(baseApiURL + 'PointHeadWiseFaultConfig/GetFaultName?PheadId=' + PheadId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured Loading Info....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        debugger;
        $http.post(baseApiURL + 'PointHeadWiseFaultConfig/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Saving....");
        });
    }
    return _obj;
}]);