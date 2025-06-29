app.factory("BatchDataProcessing", ['$http', function ($http) {
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
        $http.get(baseApiURL + 'BatchPreparation/GetDataByBatch?BpmId=' + BpmId).then(function successCallback(response) {
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
    _obj.BatchDataProcessing_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/BatchDataProcessing_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    // created by Sujan Das on 28-July-2024 for saving sample excel record
    _obj.BatchDataProcessingSample_SaveUpdate = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'BatchPreparation/BatchDataProcessingSample_SaveUpdate', data).then(function successCallback(response) {
            debugger
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.BatchFabData_Update = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/BatchFabData_Update', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchProcessingData = function (unitId, fromDate, toDate, cb) {
        $http.get(baseApiURL + 'DataRelatedDashboard/GetBatchProcessingData?unitId=' + unitId + '&&fromDate=' + fromDate + '&&toDate=' + toDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch Processing Data....");
        });
    }

    _obj.GetBatchReprocessData = function (unitId, fromDate, toDate, cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetBatchReprocessData?unitId=' + unitId + '&&fromDate=' + fromDate + '&&toDate=' + toDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch Processing Data....");
        });
    }

    _obj.GetDyeingProcessFlowInfo = function (cb) {
        $http.get(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlowInfoActive_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    return _obj;
}]);