app.factory("UnitWiseFinMc", ['$http', function ($http) {
    var _obj = {};

    _obj.SaveUpdate = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'UnitWiseFinMc/SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }    

    _obj.LoadAllData = function (batchId, cb) {
        $http.get(baseApiURL + 'UnitWiseFinMc/LoadAllData').then(function successCallback(response) {
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
    _obj.GetMachineInfo = function (MId, Category, cb) {
        $http.get(baseApiURL + 'MachineInfo/MachineInfo_Get?MId=' + MId + '&&Category=' + Category).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Machine Information....");
        });
    }


    return _obj;
}]);