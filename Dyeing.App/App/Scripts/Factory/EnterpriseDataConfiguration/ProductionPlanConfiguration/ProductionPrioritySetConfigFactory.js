app.factory("ProductionPrioritySetConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetMachineName = function (UserId, cb) {
        debugger
        $http.get(baseApiURL + 'ProductionPrioritySet/GetMachineName?UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }

    _obj.GetProdPrioritySetDetails = function (MDId, cb) {
        //debugger;
        $http.get(baseApiURL + 'ProductionPrioritySet/GetProdPrioritySetDetails?MDId=' + MDId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Priority Set Information....");
        });
    }

    _obj.ProductionPriority_SaveUpdate = function (detail, cb) {
        //debugger        
        $http.post(baseApiURL + 'ProductionPrioritySet/ProductionPriority_SaveUpdate', detail).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }   

    return _obj;
}]);