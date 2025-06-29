app.factory("StenterOperationConfigFactory", ['$http', function ($http) {
    var _obj = {};



    _obj.SaveSlittingMcConfiguration = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'StenterOperationConfig/SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetDataByBatchIdDetail = function (batchId, cb) {
        $http.get(baseApiURL + 'StenterOperationConfig/GetBatchRelatedData?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchNoList = function (batchId, cb) {
        $http.get(baseApiURL + 'StenterOperationConfig/GetBatchNoList?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.LoadAllData = function (batchId, cb) {
        $http.get(baseApiURL + 'StenterOperationConfig/LoadAllData').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }



    return _obj;


}]);