app.factory("MatchingWithFieldConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.MatchingWithFieldInfo_Get = function (cb) {
        $http.get(baseApiURL + 'MatchingWithField/MatchingWithFieldInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Matching With Field Information....");
        });
    }
    _obj.MatchingWithField_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MatchingWithField/MatchingWithField_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.MatchingWithField_Delete = function (MfcId, UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'MatchingWithField/MatchingWithField_Delete?MfcId=' + MfcId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Matching With Field Information....");
        });
    }



    return _obj;
}]);