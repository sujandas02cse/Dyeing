app.factory("UnitWiseInspectionMCConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitName = function (cb) {
        //debugger;
        $http.get(baseApiURL + 'UnitWiseInspectionMC/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Information....");
        });
    }

    _obj.GetUnitWiseInspectionMCInfo = function (cb) {
        $http.get(baseApiURL + 'UnitWiseInspectionMC/GetUnitWiseInspectionMCInfo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Wise Inspection M/C Information....");
        });
    }

    _obj.UnitWiseInspectionMCInfo_SaveUpdate = function (Model, cb) {
        //debugger
        //alert(Model)
        $http.post(baseApiURL + 'UnitWiseInspectionMC/UnitWiseInspectionMCInfo_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.Delete = function (dataModel) {
        return $http.post(baseApiURL + 'UnitWiseInspectionMC/Delete', dataModel);
    }

    return _obj;
}]);