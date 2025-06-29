app.factory("Home", ['$http', function ($http) {
    var _obj = {};

    _obj.GetMenuData = function (userId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetParentMenuNew?userId=' + userId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
   
    return _obj;
}]);