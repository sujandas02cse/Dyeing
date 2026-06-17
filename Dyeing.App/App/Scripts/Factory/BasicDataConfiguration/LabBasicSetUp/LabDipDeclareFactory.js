app.factory("LabDipDeclare", ['$http', function ($http) {

    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    //================ GET ALL LABBOOKING RECEIVE DATA =================//
    _obj.GetLabDipDeclare = function (UnitId, FromDate, ToDate, cb) {
        $http.get(baseApiURL + 'LabDipDeclare/GetLabDipDeclare?UnitId=' + UnitId + "&&FromDate=" + FromDate + "&&ToDate=" + ToDate).then(function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };

    _obj.CheckLabDip = function (labDipNo, cb) {
        $http.get(baseApiURL + 'LabDipDeclare/CheckLabDip?labDipNo=' + labDipNo).then(function successCallback(response) {
            cb(response.data);
        },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };


    //================ SAVE / UPDATE =================//

    _obj.SaveUpdateLabDipDeclare = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'LabDipDeclare/SaveUpdateLabDipDeclare', data).then(function successCallback(response) {
            debugger
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    //================ DELETE =================//
    _obj.LightSource_Delete = function (Id, UserId, cb) {

        $http.post(baseApiURL + 'LightSource/DeleteLightSource?Id=' + Id + '&&UserId=' + UserId)
        .then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Delete Processing....");
        });
    };

    return _obj;

}]);