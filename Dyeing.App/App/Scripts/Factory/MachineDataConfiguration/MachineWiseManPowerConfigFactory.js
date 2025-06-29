app.factory("MachineWiseManPowerConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetUnitName = function (cb) {
        $http.get(baseApiURL + 'MachineWiseManPowerConfig/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Name....");
        });
    }
    _obj.GetMachineName = function (type, cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachineName?Catagory=' + type).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.GetEmp = function (unitNo, cb) {
        $http.get(baseApiURL + 'MachineWiseManPowerConfig/GetEmp?UnitNo='+unitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Name....");
        });
    }
    _obj.GetShift = function (cb) {
        $http.get(baseApiURL + 'MachineWiseManPowerConfig/GetShift').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Shift Name....");
        });
    }
    _obj.GetEmpShift = function (cb) {
        $http.get(baseApiURL + 'MachineWiseManPowerConfig/GetEmpShift').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Shift Name....");
        });
    }
    _obj.SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineWiseManPowerConfig/SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.SearchMachineWiseManPower = function (unitNo, fromDate, toDate, cb) {
        $http.post(baseApiURL + 'MachineWiseManPowerConfig/SearchMachineWiseManPower?unitNo=' + unitNo + '&&fromDate=' + fromDate + '&&toDate=' + toDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during loading Data....");
        });
    }
    _obj.GetChildData = function (MwMPdId, cb) {
        $http.post(baseApiURL + 'MachineWiseManPowerConfig/GetChildData?mwMPdId=' + MwMPdId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during loading Data....");
        });
    }
    _obj.GetMachineNo = function (type, cb) {
        $http.get(baseApiURL + 'MachineWiseManPowerConfig/GetMachineNo?Catagory=' + type).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    return _obj;
}]);