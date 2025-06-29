app.factory("QCManagement", ['$http', function ($http) {
    var _obj = {};

    _obj.GetReportInfo = function (PageName, UserId, flag, cb) {
        $http.get(baseApiURL + 'BroadcastManagement/GetReportInfo?PageName=' + PageName + '&&UserId=' + UserId + '&&flag=' + flag).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Reporting Data....");
        });
    }

    _obj.GetRptParam = function (ReportingId, cb) {
        $http.get(baseApiURL + 'BroadcastManagement/GetRptParam?ReportingId=' + ReportingId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Parameter Info....");
        });
    }

    _obj.GetUnitInfo = function (UnitNo, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetUnitInfo?UnitNo=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Info....");
        });
    }
    _obj.GetBuyerInfo = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetAllBuyers').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }
    _obj.GetJobInfo = function (buyerId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetJobByBuyer?buyerId=' + buyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Job Information....");
        });
    }
    _obj.GetStyleByBuyer = function (buyerId, jobId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetStyleByBuyer?buyerId=' + buyerId+'&&jobId='+jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Job Information....");
        });
    }
    _obj.GetOrderByBuyer = function (buyerId, jobId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetOrderByBuyer?buyerId=' + buyerId + '&&jobId=' + jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Job Information....");
        });
    }
    
    _obj.GetBatchByBuyer = function (buyerId, jobId, cb) {
        debugger;
        $http.get(baseApiURL + 'CommonApi/GetBatchByBuyer?buyerId=' + buyerId + '&&jobId=' + jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }

    _obj.GetDyeingUnit = function (userId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUser?UserId=' + userId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetCompTimeById = function (BpmId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetCompTimeById?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
        });
    }

    // Get order list by style and buyer id 

    _obj.GetOrderList = function (buyerId, jobId, styleId, cb) {
        $http.get(baseApiURL + 'BroadcastManagement/GetOrderByBuyerStyle?buyerId=' + buyerId + '&&jobId=' + jobId + '&&styleId=' + styleId).then(function successCallback(response) {
            // console.log('Order List: ', response.data);
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load style Information....");
        });
    }

    _obj.GetStyleList = function (buyerId, jobId, orderId, cb) {
        $http.get(baseApiURL + 'BroadcastManagement/GetStyleByOrderBuyer?buyerId=' + buyerId +'&&jobId='+jobId+ '&&orderId=' + orderId).then(function successCallback(response) {
            // console.log('Style List: ', response.data);
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load order Information....");
        });
    }

    _obj.GetOrderByJobId = function (buyerId, jobId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetOrderByJob?BuyerId=' + buyerId + '&JobId=' + jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }

    _obj.GetCompTimeByIdNew = function (BpmId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetCompTimeByIdNew?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
        });
    }

    //Updated by Sujan Das 29-April-2025

    _obj.GetBatchByBuyerTypeWise = function (buyerId, jobId, batchType, UserId,cb) {
        debugger;
        $http.get(baseApiURL + 'CommonApi/GetBatchByBuyerTypeWise?buyerId=' + buyerId + '&&jobId=' + jobId + '&&batchType=' + batchType + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }

    _obj.GetUnitNameByBatchNew = function (BpmId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetUnitNameByBatchNew?BpmId=' + BpmId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
        });
    }

    return _obj;
}]);






