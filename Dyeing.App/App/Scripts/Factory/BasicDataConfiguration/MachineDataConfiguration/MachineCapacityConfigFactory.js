app.factory("MachineCapacityConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.GetMachineCapacityInfo = function (cb) {       
        $http.get(baseApiURL + 'MachineCapacity/MachineCapacityInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    _obj.MachineCapacity_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineCapacity/MachineCapacity_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }    
    _obj.MachineCapacity_Delete = function (MCapacityId,UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'MachineCapacity/MachineCapacity_Delete?MCapacityId=' + MCapacityId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }

   

    return _obj;
}]);