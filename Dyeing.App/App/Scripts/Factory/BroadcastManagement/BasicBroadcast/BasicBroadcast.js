app.factory("BasicBroadcast", ['$http', function ($http) {
    var _obj = {};
    _obj.GetReportInfo = function (PageName, UserId, cb) {
        debugger
        $http.get(baseApiURL + 'BroadcastManagement/GetReportInfo?PageName=' + PageName + '&&UserId=' + UserId).then(function successCallback(response) {
            debugger
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
    _obj.GetMachineInfo = function (MId, Category, cb) {
        $http.get(baseApiURL + 'MachineInfo/MachineInfo_Get?MId=' + MId + '&&Category=' + Category).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }

    _obj.GetDyeingUnit = function (cb) {
        $http.get(baseApiURL + 'ProductionShift/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Info....");
        });
    }

    _obj.GetDiaPartName = function (cb) {
        $http.get(baseApiURL + 'DiaPartWiseDyeingProcessConfig/GetDiaPartName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dia Part Name Information....");
        });
    }

    _obj.GetFaultHead = function (cb) {
        $http.get(baseApiURL + 'FaultHeadConfig/GetFaultHead').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Information....");
        });
    }
   

    return _obj;
}]);






