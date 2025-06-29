app.factory("FinishedFabricFloorToStoreIssueConfig", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitName = function (cb) {
        // debugger;
        $http.get(baseApiURL + 'FinishedFabricFloorToStoreIssueConfig/GetUnitName').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Information....");
        });
    }

    _obj.getBarcodeQty = function (barcode, cb) {       
        $http.get(baseApiURL + 'FinishedFabricFloorToStoreIssueConfig/getBarcodeQty?barcode=' + barcode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Barcode Weight Information....");
        });
    }   

    _obj.getAllFinishedData = function (BarCodeList, cb) {
        //alert(angular.toJson(BarCodeList))
      
        $http.post(baseApiURL + 'FinishedFabricFloorToStoreIssueConfig/getAllFinishedData', BarCodeList).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.getAllFinishedDataOth = function (BarCodeList, cb) {
        //alert(angular.toJson(BarCodeList))

        $http.post(baseApiURL + 'FinishedFabricFloorToStoreIssueConfig/getAllFinishedDataOth', BarCodeList).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.FinFabFlrToStoreIssue_SaveUpdate = function (Model, cb) {
        $http.post(baseApiURL + 'FinishedFabricFloorToStoreIssueConfig/FinFabFlrToStoreIssue_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }
    

    return _obj;
}]);