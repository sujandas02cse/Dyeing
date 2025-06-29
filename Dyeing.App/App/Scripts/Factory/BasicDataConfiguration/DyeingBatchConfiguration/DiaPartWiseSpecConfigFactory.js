app.factory("DiaPartWiseSpecConfig", ['$http', function ($http) {
    var _obj = {};


    _obj.DiaPartForSpecification = function (cb) {
        $http.get(baseApiURL + 'DiaPartWiseSpecConfiguration/DiaPartForSpecification').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    //_obj.GetDiaPartName = function (cb) {
    //    $http.get(baseApiURL + 'DiaPartWiseDyeingProcessConfig/GetDiaPartName').then(function successCallback(response) {
    //        cb(response.data);
    //    }, function errorCallback(response) {
    //        alert("Error Occured during Load Data....");
    //    });
    //}
   
    _obj.GetProcessNamebyDiaPart = function (DiaPartName, cb) {
        $http.get(baseApiURL + 'DiaPartWiseSpecConfiguration/GetProcessNamebyDiaPart?DiaPartName=' + DiaPartName).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetSpecificByDiaProcess = function (DiaPartName, DpfcId, cb) {
        $http.get(baseApiURL + 'DiaPartWiseSpecConfiguration/GetSpecificByDiaProcess?DiaPartName=' + DiaPartName + '&&DpfcId=' + DpfcId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.NameofSpecification = function (cb) {
        $http.get(baseApiURL + 'DiaPartWiseSpecConfiguration/NameofSpecification').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.DiaPartSpecificationConfig_SaveUpdate = function (Head, cb) {
        $http.post(baseApiURL + 'DiaPartWiseSpecConfiguration/DiaPartSpecificationConfig_SaveUpdate', Head).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

  
    return _obj;
}]);