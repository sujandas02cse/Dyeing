app.factory("DyeingBatchConfigFabric", ['$http', function ($http) {
    var _obj = {};

    _obj.GetMachineProductionPlanNo = function (cb) {
        $http.get(baseApiURL + 'CommonAPI/GetMachineProductionPlanNo').then(function successCallback(response) {
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
    _obj.GetBatchNoAndPlanNo = function (cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetBatchNoAndPlanNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }
    _obj.GetMachineProductionPlanDetail = function (MppmId, cb) {
        $http.get(baseApiURL + 'DyeingBatchConfigFabric/GetMachineProductionPlanDetail?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDyeingFabricBarcodes = function (MppmId,ProcessMode, cb) {
        $http.get(baseApiURL + 'DyeingBatchConfigFabric/GetDyeingFabricBarcodes?MppmId=' + MppmId +'&&ProcessMode=' + ProcessMode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDyeingFabricBarcodeDetails = function (BarCodeList, cb) {

        $http.post(baseApiURL + 'DyeingBatchConfigFabric/GetDyeingFabricBarcodeDetails', BarCodeList).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetDyeingBatchConfigFabricData = function (MppmId, cb) {
        $http.get(baseApiURL + 'DyeingBatchConfigFabric/GetDyeingBatchConfigFabricData?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.DyeingBatchConfigFabric_SaveUpdate = function (Head, cb) {
        $http.post(baseApiURL + 'DyeingBatchConfigFabric/DyeingBatchConfigFabric_SaveUpdate', Head).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    return _obj;
}]);