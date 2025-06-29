app.factory("DiaPartConfig", ['$http', function ($http) {
    var _obj = {};


    _obj.GetDiaPartName = function (cb) {
        $http.get(baseApiURL + 'DiaPartWiseDyeingProcessConfig/GetDiaPartName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dyeing Process Flow Information....");
        });
    }

    _obj.DyeingProcessFlowInfo_Get = function (cb) {
        $http.get(baseApiURL + 'DiaPartWiseDyeingProcessConfig/DyeingProcessFlow_Get').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dyeing Process Flow Information....");
        });
    }

    _obj.sp_Get_ProcessByDiaPart = function (DiaPartName,cb) {
        $http.get(baseApiURL + 'DiaPartWiseDyeingProcessConfig/sp_Get_ProcessByDiaPart?DiaPartName=' + DiaPartName).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Dyeing Process Flow Information....");
        });
    }


    _obj.DiaPartConfig_SaveUpdate = function (Head, cb) {
        $http.post(baseApiURL + 'DiaPartWiseDyeingProcessConfig/DiaPartConfig_SaveUpdate', Head).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    
    _obj.MatchingWithField_Delete = function (MfcId, UserId, cb) {
        //debugger;
        $http.get(baseApiURL + 'MatchingWithField/MatchingWithField_Delete?MfcId=' + MfcId + '&&UsetId=' + UserId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Matching With Field Information....");
        });
    }



    return _obj;
}]);


