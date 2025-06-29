app.factory("ProductionPlanReviseReason", ['$http', function ($http) {
    var _obj = {};
    _obj.ProdPlanReviseReasonInfo_Get = function (cb) {
        $http.get(baseApiURL + 'ProductionPlanReviseReason/ProdPlanReviseReasonInfo_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Plan Revise Reason Information....");
        });
    }
    _obj.ProdPlanReviseReason_SaveUpdate = function (_obj, cb) {
        $http.post(baseApiURL + 'ProductionPlanReviseReason/ProdPlanReviseReason_SaveUpdate', _obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
    _obj.ProdPlanReviseReason_Delete = function (PprrId, UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'ProductionPlanReviseReason/ProdPlanReviseReason_Delete?PprrId=' + PprrId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Production Plan Revise Reason Information....");
        });
    }



    return _obj;
}]);