app.factory("FinFabReqConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetAllBuyers = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllBuyers').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetAllJobsByBuyer = function (buyerId, cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllJobsByBuyer?buyerId=' + buyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetAllStylesByBuyerAndJob = function (buyerId, jobNo, cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllStylesByBuyerAndJob?buyerId=' + buyerId + '&&jobNo=' + jobNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetAllOrdersByBuyerJobAndStyle = function (buyerId, jobNo, styleId, cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllOrdersByBuyerJobAndStyle?buyerId=' + buyerId + '&&jobNo=' + jobNo + '&&styleId=' + styleId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetAllOrdersByBuyerJobAndStyle = function (buyerId, jobNo, styleId, cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllOrdersByBuyerJobAndStyle?buyerId=' + buyerId + '&&jobNo=' + jobNo + '&&styleId=' + styleId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    //Load
    _obj.GetBodyPartAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetBodyPartAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetFabricNameAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetFabricNameAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetGSMAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetGSMAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetYarnCompositionAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetYarnCompositionAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetColorNameAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetColorNameAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetColorCodeNameAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetColorCodeNameAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.GetPantoneNoNameAll = function (loadingType, buyerId, jobNo, styleId, orderNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetPantoneNoNameAll?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobNo=' + jobNo + '&&StyleId=' + styleId + '&&OrderNo=' + orderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    _obj.FinFabReqConfig_SaveUpdate = function (Head, cb) {
        $http.post(baseApiURL + 'FinFabReqConfig/FinFabReqConfig_SaveUpdate', Head).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
   
    _obj.GetFinFabReqConfig = function (loadingType, buyerId, jobNo, styleId, orderNo, shipmentDate, cb) {
        $http.get(baseApiURL + 'FinFabReqConfig/GetFinFabReqConfigData?LoadingType=' + loadingType + '&&BuyerId=' + buyerId + '&&JobId=' + jobNo + '&&StyleId=' + styleId + '&&OrderId=' + orderNo + '&&shipmentDate=' + shipmentDate).then(function successCallback(response) {
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