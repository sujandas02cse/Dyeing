app.factory("FaultHeadConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetFaultHead = function (cb) {
        $http.get(baseApiURL + 'FaultHeadConfig/GetFaultHead').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'FaultHeadConfig/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.Delete = function (HeadID, UserId, cb) {
        $http.post(baseApiURL + 'FaultHeadConfig/Delete?HeadID=' + HeadID + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }
    _obj.checkExisting = function (Name, criteria) {
        return $http.get(baseApiURL + 'FaultHeadConfig/checkExisting?name=' + Name + '&&criteria=' + criteria);
    }
    return _obj;
}]);