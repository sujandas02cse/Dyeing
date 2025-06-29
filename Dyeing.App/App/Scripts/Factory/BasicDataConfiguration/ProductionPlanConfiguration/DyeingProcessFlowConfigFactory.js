app.factory("DyeingProcessFlowConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.DyeingProcessFlowInfo_Get = function (cb) {
        $http.get(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlowInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dyeing Process Flow Information....");
        });
    }
    _obj.DyeingProcessFlow_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlow_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.DyeingProcessFlow_Delete = function (DpfcId, UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlow_Delete?DpfcId=' + DpfcId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dyeing Process Flow Information....");
        });
    }



    return _obj;
}]);