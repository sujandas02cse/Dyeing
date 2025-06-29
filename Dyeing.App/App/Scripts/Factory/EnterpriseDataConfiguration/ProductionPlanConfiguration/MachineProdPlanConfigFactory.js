app.factory("MProdPlanConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetBatchNoAndPlanNo = function (cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetBatchNoAndPlanNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }    
    _obj.ProdPlanReviseReasonInfo_Get = function (cb) {
        $http.get(baseApiURL + 'ProductionPlanReviseReason/ProdPlanReviseReasonInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Plan Revise Reason Information....");
        });
    }
    _obj.GetMachineNo = function (unitId, cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetMachineNo?unitId=' + unitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.GetPantonType = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetPantonType').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetMatchingWithFieldInfo = function (cb) {
        $http.get(baseApiURL + 'MatchingWithField/MatchingWithFieldInfoActive_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Matching With Field Information....");
        });
    }
    _obj.GetBodyPartSetUp_All = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetBodyPartSetUp_All').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetFabricsInfo = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetFabricsInfo?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load buyer Information....");
        });
    }
    _obj.GetColorType = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetColorType').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetColorShade = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetColorShade').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetAOPBackground = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAOPBackground').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    //_obj.GetFabricByBuyer = function (buyerId, orderId,cb) {
    //    $http.get(baseApiURL + 'CommonMerchandisingApi/GetFabricByBuyer?BuyerId=' + buyerId + '&&OrderId=' + orderId).then(function successCallback(response) {
    //        cb(response.data);
    //    }, function errorCallback(response) {
    //        alert("Error Occured during Load Information....");
    //    });
    //}
    _obj.GetFabricByBuyerJob = function (buyerId, jobId, orderId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFabricByJobOrder?BuyerId=' + buyerId + '&&JobId=' + jobId + '&&OrderId=' + orderId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetMasterDataPlan = function (buyerId, jobId,styleId,orderId, cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetMasterDataPlan?buyerId=' + buyerId + '&&jobId=' + jobId + '&&styleId=' + styleId + '&&orderId=' + orderId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetColorTypeSpec = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetColorTypeSpec').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetDyeingProcessFlowInfo = function (cb) {
        $http.get(baseApiURL + 'DyeingProcessFlow/DyeingProcessFlowInfoActive_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetOFabricOperationData = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetOFabricOperationData').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.MachineProdPlan_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineProdPlanConfig/MachineProdPlan_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }    
    _obj.GetMachineProdPlanInfo = function (MppmId, cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetMachineProdPlanInfo?MppmId=' + MppmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.GetDropDataByBuyerId = function (buyerId, id, info, cb) {
        $http.get(baseApiURL + 'MachineProdPlanConfig/GetDropDataByBuyerId?buyerId=' + buyerId + '&&id='+id+'&&info=' + info).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    return _obj;
}]);