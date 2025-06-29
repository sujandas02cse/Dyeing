app.factory("ApprovalManagement", ['$http', function ($http) {
    var _obj = {};

    _obj.GetDyeingUnit = function (userId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUser?UserId=' + userId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBodypart = function (BpmId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetBodyPartbyBatch?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.GetBatchNoByUnit = function (unitNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetInspectionBatch?UnitId=' + unitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.GetCRApprovalBatchList = function (UnitId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetCRApproveBatchList?UnitId=' + UnitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.GetApprovalBatchData = function (BpmId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetApproveBatchData?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }


    _obj.GetShadeApprovalBatchData = function (BpmId, ApprovalTime, BSpecId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetShadeApproveBatchData?BpmId=' + BpmId + '&ApprovalTime=' + ApprovalTime + '&BSpecId=' + BSpecId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.GetRFDApprovalBatchData = function (BpmId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetRFDApproveBatchData?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.GetFTSApprovalBatchData = function (BpmId, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetFTSApproveBatchData?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.GetAllTypeApprovalBatchData = function (BpmId, ApprovalType, ApprovalTime, cb) {
        $http.get(baseApiURL + 'ApprovalManagement/GetAllApproveBatchData?BpmId=' + BpmId + '&ApprovalType=' + ApprovalType + '&ApprovalTime=' + ApprovalTime).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
        });
    }

    _obj.SaveUpdateApprovalData = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveOrUpdateBatchApproveData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.SaveUpdateFTSApprovalData = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveUpdateFTSApprovalData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.SaveUpdateRFDApproval = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveUpdateRFDApproval', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Saving data....");
        });
    }

    _obj.SaveUpdateShadeApprovalData = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveUpdateShadeApprovalData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.SaveUpdateCRApproval = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveUpdateCRApproval', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.SaveUpdateCRSend = function (data, cb) {
        $http.post(baseApiURL + 'ApprovalManagement/SaveUpdateCRSend', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    return _obj;
}]);