app.factory("ProductionShiftConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitName = function (cb) {
       // debugger;
        $http.get(baseApiURL + 'ProductionShift/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Information....");
        });
    }    

    _obj.GetShiftType = function (cb) {
        //debugger;
        $http.get(baseApiURL + 'ProductionShift/GetShiftType').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Shift Type Information....");
        });
    }

    _obj.GetSection = function (cb) {
       // debugger;
        $http.get(baseApiURL + 'ProductionShift/GetSection').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Section Information....");
        });
    }

    _obj.GetShitTime = function (ShiftTypeId, cb) {
        //debugger;
        $http.get(baseApiURL + 'ProductionShift/GetShitTime?ShiftTypeId=' + ShiftTypeId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Shift Time Information....");
        });
    }

    _obj.getCheckedShift = function (UnitId, ShiftTypeId, OscId, cb) {
        //debugger;
        $http.get(baseApiURL + 'ProductionShift/getCheckedShift?UnitId=' + UnitId + '&&ShiftTypeId=' + ShiftTypeId + '&&OscId=' + OscId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetSelectedSection = function (ShiftTypeId, UnitId, cb) {      
        //debugger;
        $http.get(baseApiURL + 'ProductionShift/GetSelectedSection?ShiftTypeId=' + ShiftTypeId + '&&UnitId=' + UnitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetProductionShiftInfo = function (cb) {
        //debugger
        $http.get(baseApiURL + 'ProductionShift/GetProductionShiftInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Shift Information....");
        });
    }

    _obj.ProductionShift_SaveUpdate = function (master, cb) {
        //debugger
        //alert(master)
        $http.post(baseApiURL + 'ProductionShift/ProductionShift_SaveUpdate', master ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }   

    return _obj;
}]);