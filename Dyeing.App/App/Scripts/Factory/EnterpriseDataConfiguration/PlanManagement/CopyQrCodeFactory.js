app.factory("CopyQrCodeFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (UserId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetDyeingUnitByUser?UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchByUnit = function (UnitNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetAllNewBatchByUnitAsync?UnitId=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetailById = function (BpmId, cb) {
        $http.get(baseApiURL + 'CopyQrCode/GetBatchDetailForCopyQr?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetailByQr = function (masterId, cb) {
        $http.get(baseApiURL + 'CopyQrCode/GetBatchDetailByQrCode?MasterId=' + masterId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    

    _obj.SaveUpQrCodeData = function (obj, cb) {
        debugger
        $http.post(baseApiURL + 'CopyQrCode/SaveUpdateCopyQrCodeAsync', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.DeleteCommentData = function (Id, UserId, cb) {
        debugger
        $http.get(baseApiURL + 'CommentsOnFourPointReport/CommentDataDelete?Id=' + Id + '&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Section Information....");
        });
    }



    return _obj;
}]);