app.factory("FinishingSpecConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.Get_SpecificationConfig = function (cb) {
        $http.get(baseApiURL + 'FinishingSpecificationConfiguration/Get_SpecificationConfig').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.SpecificationConfig_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'FinishingSpecificationConfiguration/SpecificationConfig_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.SpecificationConfig_Delete = function (FbscId, UserId, cb) {

        $http.get(baseApiURL + 'FinishingSpecificationConfiguration/SpecificationConfig_Delete?FbscId=' + FbscId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }



    return _obj;
}]);