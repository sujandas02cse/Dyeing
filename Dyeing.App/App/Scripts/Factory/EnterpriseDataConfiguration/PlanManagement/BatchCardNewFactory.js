app.factory("BatchCardNew", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetMachineData = function (UnitNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetMachineData?UnitNo=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDataById = function (Id, reviceno, cb) {
        $http.get(baseApiURL + 'BatchPrepare/GetBatchDataById?Id=' + Id + '&reviceno=' + reviceno ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    
    _obj.GetTrollyNo = function (unitId, cb) {
        $http.get(baseApiURL + 'CommonAPI/GetTrollyNo?unitId=' + unitId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetFinMcByType = function (mcType, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFinMcByType?Type=' + mcType).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }
    
    _obj.BatchData_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPreparation/BatchData_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.BatchData_SaveUpdateNew = function (data, cb) {
        debugger;
        $http.post(baseApiURL + 'BatchPrepare/BatchPrepare_SaveUpdateNew', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    return _obj;
}]);