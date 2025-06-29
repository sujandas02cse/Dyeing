app.factory("BatchFinishingFactory", ['$http', function ($http) {
    var _obj = {};



    _obj.SaveBatchConfigurationFinishing = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'BatchFinishing/BatchFinish_SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchConfigurationFinishingDetail = function (batchId, cb) {
        $http.get(baseApiURL + 'BatchFinishing/GetBatchConfigurationFinis?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchNoList = function (batchId, cb) {
        $http.get(baseApiURL + 'BatchFinishing/GetBatchNoList?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }




    return _obj;


}]);