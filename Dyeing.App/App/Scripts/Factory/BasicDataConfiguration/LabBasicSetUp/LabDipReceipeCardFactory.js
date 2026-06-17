app.factory("LabDipReceipe", ['$http', function ($http) {

    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    //================ GET ALL LABBOOKING RECEIVE DATA =================//
    _obj.GetAllLabDipBookingData = function (cb) {
        $http.get(baseApiURL + 'LabDipReceipe/GetAllLabDipBookingData').then(function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };

    _obj.GetAllLabDipReceipeData = function (LabReceiveId, cb) {
        $http.get(baseApiURL + 'LabDipReceipe/GetAllLabDipReceipeData?LabReceiveId=' + LabReceiveId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    //================ SAVE / UPDATE =================//

    _obj.SaveUpdateLabDipReceipe = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'LabDipReceipe/SaveUpdateLabDipReceipe', data).then(function successCallback(response) {
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