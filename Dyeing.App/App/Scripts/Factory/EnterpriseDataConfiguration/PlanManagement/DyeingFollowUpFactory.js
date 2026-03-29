app.factory("DyeingFollowUp", ['$http', function ($http) {
    var _obj = {};


    _obj.GetAllBuyer = function ( cb) {
        $http.get(baseApiURL + 'DyeingFollowUp/GetAllBuyerInfoForDyeingFollowUp').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.GetJobByBuyer = function (BuyerId, cb) {
        $http.get(baseApiURL + 'DyeingFollowUp/GetJobInfoForDyeingFollowUp?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetStyleByJob = function (BuyerId, JobId, cb) {
        $http.get(baseApiURL + 'DyeingFollowUp/GetStyleInfoForDyeingFollowUp?BuyerId=' + BuyerId + '&&JobId=' + JobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetOrderByStyle = function (BuyerId, JobId, StyleId, cb) {
        $http.get(baseApiURL + 'DyeingFollowUp/GetOrderInfoForDyeingFollowUp?BuyerId=' + BuyerId + '&&JobId=' + JobId + '&&StyleId=' + StyleId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetDataByStyle = function (BuyerId, JobId, StyleId, OrderId, cb) {
        $http.get(baseApiURL + 'DyeingFollowUp/GetDetailsInfoForDyeingFollowUp?BuyerId=' + BuyerId + '&&JobId=' + JobId + '&&StyleId=' + StyleId + '&&OrderId=' + OrderId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.DyeingFollowDataSave = function (obj, UserId, cb) {
        $http.post(baseApiURL + 'DyeingFollowUp/SaveUpdateDyeingFollowUp?UserId=' + UserId, obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    return _obj;
}]);