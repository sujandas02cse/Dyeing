app.factory("MachineConfig", ['$http', function ($http) {
    var _obj = {};
    _obj.MachineInfo_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'MachineInfo/MachineInfo_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }    

    _obj.GetMachineInfo = function (MId, Category, cb) {        
        $http.get(baseApiURL + 'MachineInfo/MachineInfo_Get?MId=' + MId + '&&Category=' + Category).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }
    
    _obj.MachineInfo_Delete = function (MId, Category, UserId, cb) {  
        //debugger;
        $http.get(baseApiURL + 'MachineInfo/MachineInfo_Delete?MId=' + MId + '&&Category=' + Category + '&&UsetId=' + UserId).then(function successCallback(response) {        
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }   
    
       
    return _obj;
}]);