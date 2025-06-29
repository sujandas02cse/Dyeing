app.factory("BatchCard", ['$http', function ($http) {
    var _obj = {};
   
    _obj.GetBatchDataById = function (Id, ReviseNo, cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetBatchDataById?Id=' + Id + '&&ReviseNo=' + ReviseNo).then(function successCallback(response) {
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

    _obj.GetFinMcByType = function (mcType, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFinMcByType?Type=' + mcType).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    
    _obj.BatchData_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/BatchData_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.SampleBatchData_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/SampleBatchData_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information...");
        });
    }

    _obj.GetSampleBatchDataById = function (Id, ReviseNo, cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetSampleBatchDataById?Id=' + Id + '&&ReviseNo=' + ReviseNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        } );
    }

    

    _obj.GetStylesByBuyerAndJob = function (buyerId, jobId, cb) {
        $http.get(baseApiURL + 'BatchPreparation/GetStylesByBuyerAndJob?buyerId=' + buyerId + '&&jobId=' + jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    return _obj;
}]);