app.factory("TolleyNoConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitName = function (cb) {
        //debugger;
        $http.get(baseApiURL + 'TrolleyNo/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Information....");
        });
    }    

    _obj.GetTrolleyNoInfo = function (cb) {
        $http.get(baseApiURL + 'TrolleyNo/GetTrolleyNoInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Trolley No Information....");
        });
    }

    _obj.TrolleyNo_SaveUpdate = function (Model, cb) {
        //debugger
        //alert(Model)
        $http.post(baseApiURL + 'TrolleyNo/TrolleyNoInfo_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    _obj.TrolleyNo_Delete = function (TncId, UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'TrolleyNo/TrolleyNo_Delete?TncId=' + TncId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during delete Information....");
        });
    }

    return _obj;
}]);