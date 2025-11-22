app.factory("CommentsOnFourPointReport", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchByUnit = function (UnitNo, BatchType, cb) {
        $http.get(baseApiURL + 'CommentsOnFourPointReport/GetBatchDataByUnit?UnitId=' + UnitNo + '&&BatchType=' + BatchType ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetailByBatch = function (BpmId, BatchType, cb) {
        $http.get(baseApiURL + 'CommentsOnFourPointReport/GetBatchDetailDataByBpm?BpmId=' + BpmId + '&BatchType=' + BatchType).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveUpDateData = function (_obj, cb) {
        $http.post(baseApiURL + 'CommentsOnFourPointReport/CommentDataSaveUpdate', _obj).then(function successCallback(response) {
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