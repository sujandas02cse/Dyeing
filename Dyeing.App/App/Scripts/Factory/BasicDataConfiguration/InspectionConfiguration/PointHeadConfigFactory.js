app.factory("PointHeadConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetPointHeadInfo = function (cb) {
        $http.get(baseApiURL + 'PointHead/PointHeadInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Point Head Information....");
        });
    }
    _obj.PointHead_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'PointHead/PointHead_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Point Head Data Processing....");
        });
    }
    _obj.checkExisting = function (Name, criteria) {
        return $http.get(baseApiURL + 'PointHead/checkExisting?name=' + Name + '&&criteria=' + criteria);
    }
    _obj.Delete = function (PHeadNo, UserId, cb) {
        debugger;
        $http.post(baseApiURL + 'PointHead/Delete?PHeadNo=' + PHeadNo + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }
    return _obj;
}]);