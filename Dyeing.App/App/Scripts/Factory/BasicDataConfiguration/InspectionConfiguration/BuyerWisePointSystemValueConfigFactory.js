app.factory("BuyerWisePointSystemValueConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetAllBuyers = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllBuyers').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetPointSystemNames = function (cb) {
        $http.get(baseApiURL + 'CommonAPI/GetPointSystemNameAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetFabricName = function ( cb) {
        $http.get(baseApiURL + 'CommonAPI/GetFabricName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.BuyerWisePointSystemValue_SaveUpdate = function (model, cb) {
        $http.post(baseApiURL + 'BuyerWisePointSystemValueConfig/BuyerWisePointSystemValue_SaveUpdate', model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.GetBuyerWisePointSystemValue = function (buyerId, pointSystemNo, cb) {
        $http.get(baseApiURL + 'BuyerWisePointSystemValueConfig/GetBuyerWisePointSystemValueData?buyerId=' + buyerId + "&&pointSystemNo=" + pointSystemNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    return _obj;
}]);