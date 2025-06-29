app.factory("PointSystemNameConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetPointSystemNameInfo = function (cb) {
        $http.get(baseApiURL + 'PointSystemNameConfig/GetPointSystemNameInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Point System Name Information....");
        });
    }
    _obj.PointSystemName_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'PointSystemNameConfig/PointSystemName_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Point System Name Data Processing....");
        });
    }
    _obj.Delete = function (dataModel) {
        return $http.post(baseApiURL + 'PointSystemNameConfig/Delete', dataModel);
    }
    return _obj;
}]);