app.factory("MasterDataEntryFactory", ['$http', function ($http) {
    var _obj = {};
   
    _obj.GetUnitAll = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }
    _obj.GetMasterData = function (Unit, FromDate, ToDate,cb) {
        debugger
        $http.get(baseApiURL + 'DataRelatedDashboard/GetMasterData?UnitId=' +Unit + '&&Fromdate=' + FromDate + '&&Todate=' +ToDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
   
    return _obj;
}]);