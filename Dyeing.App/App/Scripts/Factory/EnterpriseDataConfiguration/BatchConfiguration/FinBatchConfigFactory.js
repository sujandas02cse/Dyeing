app.factory("FinBatchConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetBatchNoAndPlanNo = function (cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetBatchNoAndPlanNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }  
    _obj.GetProductionPlanData = function (MppmId, cb) {
        $http.get(baseApiURL + 'FinBatchConfig/GetMachineProductionPlanData?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDDLFinishingBatch = function (Info, cb) {
        $http.get(baseApiURL + 'FinBatchConfig/GetDDLFinishingBatch?Info=' + Info).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDPSpecification = function (DiaPartName, cb) {
        $http.get(baseApiURL + 'FinBatchConfig/GetDPSpecification?DiaPartName=' + DiaPartName).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.FinishingBatch_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'FinBatchConfig/FinishingBatch_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }   
    _obj.GetFinBatchData = function (MppmId, cb) {
        $http.get(baseApiURL + 'FinBatchConfig/GetFinBatchData?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    return _obj;
}]);