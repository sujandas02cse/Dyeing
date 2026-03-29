app.factory("ActualQuantityUpdateFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchAll = function (UserId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetAllBatchWithoutHandover?UnitId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetail = function (BpmId, cb) {
        $http.get(baseApiURL + 'ActualQuantityUpdate/GetBatchDataWithoutHandover?BPmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.GetAllDia = function ( UserId,cb) {
        $http.get(baseApiURL + 'CommonAPI/GetAllDia').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    _obj.SaveActualQuantity = function (obj, cb) {
        $http.post(baseApiURL + 'ActualQuantityUpdate/SaveUpdate',obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading....");
        });
    }

    
    return _obj;
}]);