app.factory("OperationSectionConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetSectionInfo = function (cb) {
        $http.get(baseApiURL + 'OperationSection/GetSectionInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Section Information....");
        });
    }
    _obj.OperationSection_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'OperationSection/OperationSection_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.OperationSection_Delete = function (OscId, UserId, cb) {
        debugger;
        $http.get(baseApiURL + 'OperationSection/OperationSection_Delete?OscId=' + OscId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Section Information....");
        });
    }



    return _obj;
}]);