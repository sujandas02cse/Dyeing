app.factory("BarcodeConfigFactory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetUnitAll = function (cb) {
        $http.get(baseApiURL + 'BarcodeConfig/LoadUnitNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.LoadReasonDDL = function (cb) {
        $http.get(baseApiURL + 'BarcodeConfig/LoadReasonDDL').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Unit Information....");
        });
    }

    _obj.GetIssueList = function (UnitId, FromDate, ToDate, cb) {
        $http.get(baseApiURL + 'BarcodeConfig/LoadIssueList?UnitId=' + UnitId + '&&FromDate=' + FromDate +
            '&&ToDate=' + ToDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    // Heat Set Issue List
    _obj.GetHeatSetIssueList = function (UnitId, FromDate, ToDate, IssueNo, cb) {
        $http.get(baseApiURL + 'BarcodeConfig/LoadHeatSetIssueList?UnitId=' + UnitId + '&&FromDate=' + FromDate +
            '&&ToDate=' + ToDate + '&&IssueNo=' + IssueNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBarcodeInfo = function (BarcodeNo) {
        return $http.get(baseApiURL + 'BarcodeConfig/GetBarcodeInfo?BarcodeNumber=' + BarcodeNo);
    }
    //_obj.LoadReasonDDL = function () {
    //    return $http.get(baseApiURL + 'BarcodeConfig/LoadReasonDDL');
    //}
    _obj.Save = function (barcode) {
        return $http.post(baseApiURL + '/BarcodeConfig/Save', barcode);
    };
    // Issue Save
    _obj.IssueSave = function (barcode) {
        return $http.post(baseApiURL + '/BarcodeConfig/IssueSave', barcode);
    };

    _obj.checkExisting = function (BarcodeNo) {
        return $http.get(baseApiURL + 'BarcodeConfig/checkExisting?id=' + BarcodeNo);
    }
    _obj.generateBarcode = function (BarcodeNo) {
        return $http.post(baseApiURL + 'GenerateBarcode/BarcodeGenerate?BarcodeNo=' + BarcodeNo);
    }
    _obj.getPartialWeight = function (BarcodeNo) {
        return $http.get(baseApiURL + 'BarcodeConfig/getPartialWeight?id=' + BarcodeNo);
    }

    return _obj;
}]);