app.factory("FaultNameConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetFaultName = function (headId, cb) {
        $http.get(baseApiURL + 'FaultNameConfig/GetFaultName?HeadId=' + headId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured Loading Info....");
        });
    }
    _obj.GetFaultHead = function (cb) {
        $http.get(baseApiURL + 'FaultHeadConfig/GetFaultHead').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'FaultNameConfig/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.Delete = function (NameID, UserId, cb) {
        $http.post(baseApiURL + 'FaultNameConfig/Delete?NameID=' + NameID + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }
    _obj.checkExisting = function (Name, criteria) {
        return $http.get(baseApiURL + 'FaultNameConfig/checkExisting?name=' + Name + '&&criteria=' + criteria);
    }
    return _obj;
}]);