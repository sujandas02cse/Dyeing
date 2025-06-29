app.factory("MasterDataConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetBatchNoAndPlanNo = function (cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetBatchNoAndPlanNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
        });
    }
    _obj.ProdPlanReviseReasonInfo_Get = function (cb) {
        $http.get(baseApiURL + 'MasterDataConfig/ProdPlanReviseReasonInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Plan Revise Reason Information....");
        });
    }
    _obj.GetMachineNo = function (userid, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetToMcNo?userid=' + userid).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.GetMatchingWithFieldInfo = function (cb) {
        $http.get(baseApiURL + 'MasterDataConfig/MatchingWithFieldInfoActive_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Matching With Field Information....");
        });
    }
    _obj.GetPantonType = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetPantonType').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
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
    _obj.GetFabricByBuyerJob = function (buyerId, jobId,orderId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFabricByJobOrder?BuyerId=' + buyerId + '&&JobId=' + jobId + '&&OrderId=' + orderId).then(function successCallback(response) {
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
    _obj.MasterData_SaveUpdate = function (_obj, cb) {
        debugger;
        $http.post(baseApiURL + 'MasterDataConfig/MasterData_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        },function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.GenNewFabric = function (_obj, cb) {
        $http.post(baseApiURL + 'MasterDataConfig/GenNewFabric', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.GetDyeingMasterData = function (BuyerId, JobId, StyleId, OrderId, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterData?BuyerId=' + BuyerId + '&&JobId=' + JobId + '&&StyleId=' + StyleId + '&&OrderId=' + OrderId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Master Data....");
        });
    }
    _obj.GetBorrowingParty = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetBorrowingParty').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }
    _obj.GetDropDataByBuyerId = function (buyerId, id, info, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDropDataByBuyerId?buyerId=' + buyerId + '&&id=' + id + '&&info=' + info).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetBuyerJobOrderForMasterData = function (BuyerId, Id, Info, Flag, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetBuyerJobOrderForMasterData?BuyerId=' + BuyerId + '&&Id=' + Id + '&&Info=' + Info + '&&Flag=' + Flag).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetFabricType = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetFabricName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetGSMData = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetFabricGSMAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Master Data....");
        });
    }
    _obj.GetYarnHead = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetYarnHead').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Master Data....");
        });
    }
    _obj.GetComposition = function (IHID, cb) {
        $http.get(baseApiURL + 'CommonApi/GetComposition?IHID=' + IHID).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Master Data....");
        });
    }
    _obj.GetDiaInfoByFabric = function (BuyerId,JobId, FabNameId, cb) {
        $http.get(baseApiURL + 'CommonApi/DiaInfoByJobFabric?BuyerId=' + BuyerId + '&&JobId=' + JobId+'&&FabNameId=' + FabNameId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    return _obj;
}]);