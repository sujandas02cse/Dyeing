app.factory("CompactingMcOperationFactory", ['$http', function ($http) {
    var _obj = {};



    _obj.SaveUpdate = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'CompactingMcOperation/SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetDataByBatchIdDetail = function (batchId, cb) {
        $http.get(baseApiURL + 'CompactingMcOperation/GetCompactingMcOpData?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchNoList = function (batchId, cb) {
        $http.get(baseApiURL + 'CompactingMcOperation/GetBatchNoList?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.LoadAllData = function (batchId, cb) {
        $http.get(baseApiURL + 'CompactingMcOperation/LoadAllData').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }



    return _obj;
}]);