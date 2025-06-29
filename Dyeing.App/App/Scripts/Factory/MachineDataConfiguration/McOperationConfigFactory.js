app.factory("McOperationConfigFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.SaveMcConfigurationData = function (obj, cb) {
        debugger;
        $http.post(baseApiURL + 'McOperationConfig/SaveUpdate', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    _obj.SaveMcConfigurationDataNew = function (obj, status,cb) {
        debugger;

        //$http.post(baseApiURL + 'McOperationConfig/SaveUpdateNew', obj).then(function successCallback(response) {

        $http.post(baseApiURL + 'McOperationConfig/SaveUpdateNew?status=' + status, obj).then(function successCallback(response) {

            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    _obj.GetDataByBatchIdDetail = function (batchId, compTime, operation, cb) {

        $http.get(baseApiURL + 'McOperationConfig/GetBatchRelatedData?batchId=' + batchId + '&&compTime=' + compTime + '&&operation=' + operation).then(function successCallback(response) {


            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetDataByBatchIdDetailNew = function (batchId, compTime, operation, status, cb) {

        $http.get(baseApiURL + 'McOperationConfig/GetBatchRelatedDataNew?batchId=' + batchId + '&&compTime=' + compTime + '&&operation=' + operation + '&&status=' + status).then(function successCallback(response) {


            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchNoList = function (batchId, cb) {
        $http.get(baseApiURL + 'McOperationConfig/GetBatchNoList?batchId=' + batchId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.LoadAllData = function (batchId,cb) {
        $http.get(baseApiURL + 'McOperationConfig/LoadAllData').then(function successCallback(response) {
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

    _obj.GetUnitAll = function (userCode, cb) {
        debugger;
        $http.get(baseApiURL + 'CommonApi/GetDyeingUnitByUser?UserId=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    /*Updated by Sujan Das on 23-March-2025*/

    _obj.GetBatchNoListUnitStatusWise = function (batchType, Unit, cb) {
        debugger;
        $http.get(baseApiURL + 'McOperationConfig/GetBatchNoListUnitStatusWise?status=' + batchType + '&&unit=' + Unit).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    _obj.GetFinMcByTypeUnitWise = function (mcType, Unit, cb) {
        $http.get(baseApiURL + 'McOperationConfig/GetFinMcByTypeUnitWise?Type=' + mcType + '&&unit=' + Unit).then(function successCallback(response) {

            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });



    }

    return _obj;
}]);