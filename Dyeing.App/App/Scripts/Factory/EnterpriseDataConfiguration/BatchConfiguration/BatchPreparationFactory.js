app.factory("BatchPreparation", ['$http', function ($http) {
    var _obj = {};

    _obj.GetMachineDataByPlan = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/GetMachineDataByPlan', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
        //$http.get(baseApiURL + 'BatchPreparation/GetMachineDataByPlan?MppmId=' + MppmId).then(function successCallback(response) {
        //    cb(response.data);
        //}, function errorCallback(response) {
        //    alert("Error Occured during Load Information....");
        //});
    }
    _obj.GetDataByBatch = function (BpmId, cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetDataByBatch?BpmId='+BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetBatchAll = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetBatchAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDressPart = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetDressPart').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetFabricNameByPlan = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/GetFabricNameByPlan', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDiaInfoByFabric = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/GetDiaInfoByFabric', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetTrollyNo = function (unitId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetTrollyNo?unitId=' + unitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetBarcodeData = function (data, cb) {
        $http.post(baseApiURL + 'CommonAPI/GetBarcodeData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });       
    }
    _obj.GetBatchNoAndPlanNo = function (cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetPlanList').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }
    _obj.DyeingBatchPreparation_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/DyeingBatchPreparation_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    _obj.GetDyeingProcessFlowInfo = function (cb) {
        $http.get(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlowInfoActive_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    return _obj;
}]);