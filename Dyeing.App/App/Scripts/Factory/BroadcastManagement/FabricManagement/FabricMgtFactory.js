app.factory("FabricMgt", ['$http', function ($http) {
    var _obj = {};
    _obj.GetReportInfo = function (PageName, UserId, Flag, cb) {
        $http.get(baseApiURL + 'BroadcastManagement/GetReportInfo?PageName=' + PageName + '&&UserId=' + UserId + '&&flag=' + Flag).then(function successCallback(response) {
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
    _obj.GetStyleByBuyer = function (buyerId,jobId, cb) {
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
        $http.get(baseApiURL + 'CommonApi/GetBatchByBuyer?buyerId=' + buyerId + '&&jobId=' + jobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }

        // Updated By Sujan Das on 09-April-2025 to load Unit DropDown User Id Wise

    //_obj.GetDyeingUnit = function (cb) {
    //    $http.get(baseApiURL + 'ProductionShift/GetUnitName').then(function successCallback(response)
    //    {
    //        cb(response.data);
    //    }, function errorCallback(response) {
    //        alert("Error Occured during Load Unit Info....");
    //    });
    //}

    _obj.GetDyeingUnit = function (UserId,cb) {
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUserFabricManagement?UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });

    }

    _obj.GetMachineAll = function (cb) {
        $http.get(baseApiURL + 'CommonApi/GetMachineAll').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Info....");
        });
    }

    _obj.GetFabricList = function (BuyerId, JobId, cb) {
        debugger;
        $http.get(baseApiURL + "CommonApi/GetFabricByJobOrder?BuyerId=" + BuyerId + "&&JobId=" + JobId + "&&OrderId=" + 0).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error occured during Load Fabric data......");
        });
    }

    return _obj;
}]);






