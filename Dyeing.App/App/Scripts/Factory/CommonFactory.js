var app = angular.module('MascoDyeing', ['ngRoute', 'ui.bootstrap']);
app.factory("CommonFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.LoginCheck = function (LoginModel, cb) {       
        $http.post(baseAppURL + 'Home/UserLogin', LoginModel).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }   

    _obj.SendPassword = function (empCode, cb) {
        $http.get(baseApiURL + 'CommonAPI/SendPassword?empCode=' + empCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Password Data Information....");
        });
    }


    _obj.GetAccessToken = function (model, cb) {
        //alert(model.UserName)
        $http.post({ url: baseApiURL + 'api/Token', data: $.param({ grant_type: 'password', username: model.UserName, password: model.PassWord }), headers: { 'Content-Type': '' } }).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Get Access Token....");
        });
    }
    return _obj;
}]);