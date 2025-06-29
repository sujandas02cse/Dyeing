app.factory("FinishFabricInsTableConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetInspectionInfo = function (type, FilterText, cb) {
        debugger;
        $http.get(baseApiURL + 'FinishFabricInsTableConfig/GetInspectionInfo?FilterText=' + FilterText + '&&type=' + type).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    }

    _obj.GetMachineNo = function (userid, cb) {
        $http.get(baseApiURL + 'FinishFabricInsTableConfig/GetQcMcNo?userid=' + userid).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Q/C Machine Information....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        debugger;
        $http.post(baseApiURL + 'FinishFabricInsTableConfig/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    _obj.GetRollList = function (bCodeOrBatchId,cb) {
        debugger;
        $http.get(baseApiURL + 'FinishFabricInsTableConfig/GetRollList?bCodeOrBatchId=' + bCodeOrBatchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.LoadFaultList = function (bCodeOrBatchId, rollId,isWithoutBarcode, cb) {
        debugger;
        $http.get(baseApiURL + 'FinishFabricInsTableConfig/GetInspectionInfo?bCodeOrBatchId=' + bCodeOrBatchId + '&&rollId=' + rollId + '&&IsWithBarcode=' + isWithoutBarcode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    } 
    return _obj;
}]);