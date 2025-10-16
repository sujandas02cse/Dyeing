app.factory("MachineDetailsConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetMachineName = function (type,cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachineName?Catagory=' + type).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
            });
    }
    _obj.GetMachineBrand = function (cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachineBrand').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Brand....");
        });
    }
    _obj.GetMachinesearchCapacity  = function (cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachinesearchCapacity').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Capacity....");
        });
    }
    _obj.GetMachineAsset = function (cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachineAsset').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Asset No....");
        });
    }
    _obj.GetUnitName = function (cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Name....");
        });
    }
    _obj.MachineDetails_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineDetailConfig/MachineDetails_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.GetMachineDetail = function (cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetMachineDetail').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Detail Information....");
        });
    }
    _obj.DeleteMachineDetail = function (MDId, UserId, cb) {
        $http.post(baseApiURL + 'MachineDetailConfig/DeleteMachineDetail?MDId=' + MDId + '&&UserId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Data....");
        });
    }

    _obj.GetBuildingsByUnit = function (Unit, cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetBuildingsByUnit?Unit=' + Unit).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Building Information....");
        });
    }

    _obj.GetFloorsByBuilding = function (Building, cb) {
        $http.get(baseApiURL + 'MachineDetailConfig/GetFloorsByBuilding?Building=' + Building).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Building Information....");
        });
    }


    return _obj;
}]);


