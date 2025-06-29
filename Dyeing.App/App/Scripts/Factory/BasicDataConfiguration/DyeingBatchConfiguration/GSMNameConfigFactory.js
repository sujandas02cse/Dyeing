app.factory("GSMNameConfig", ['$http', function ($http) {
    var _obj = {};
    
    _obj.GetGSMNameInfo = function (cb) {
        $http.get(baseApiURL + 'GSMName/GetGSMNameInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during GSM Name Information....");
        });
    }

    _obj.GSMName_SaveUpdate = function (Model, cb) {
        //debugger
        //alert(Model)
        $http.post(baseApiURL + 'GSMName/GSMName_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    return _obj;
}]);