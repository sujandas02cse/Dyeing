app.factory("SlitOperationConfigFactory", ['$http', function ($http) {
    var _obj = {};



    _obj.SaveSlittingMcConfiguration = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'SlittingOperationConfig/SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetDataByBatchIdDetail = function (batchId, cb) {
        $http.get(baseApiURL + 'SlittingOperationConfig/GetBatchRelatedData?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchNoList = function (batchId, cb) {
        $http.get(baseApiURL + 'SlittingOperationConfig/GetBatchNoList?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.LoadAllData = function (batchId, cb) {
        $http.get(baseApiURL + 'SlittingOperationConfig/LoadAllData').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }



    return _obj;


}]);