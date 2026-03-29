app.factory("StyleOrderUpdate", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchByUnit = function (UnitNo, BatchType, cb) {
        $http.get(baseApiURL + 'StyleOrderUpdate/GetBatchDataByUnit?UnitId=' + UnitNo + '&&BatchType=' + BatchType ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetailByBatch = function (BpmId, cb) {
        $http.get(baseApiURL + 'StyleOrderUpdate/GetDataConfigurationForBatch?Bpmid=' + BpmId ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveUpdateData = function (_obj, cb) {
        $http.post(baseApiURL + 'StyleOrderUpdate/SaveUpdateDataConfiguration', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }



    return _obj;
}]);