app.factory("LightSourceConfig", ['$http', function ($http) {

    var _obj = {};

    //================ GET ALL LIGHT SOURCE =================//
    _obj.GetLightSource = function (cb) {
        $http.get(baseApiURL + 'LightSource/GetAllLightSource').then(function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };


    //================ SAVE / UPDATE =================//
    _obj.LightSource_SaveUpdate = function (obj, cb) {
        $http.post(baseApiURL + 'LightSource/SaveUpdateLightSource', obj).then(function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Data Processing....");
            });
    };


    //================ DELETE =================//
    _obj.LightSource_Delete = function (Id, UserId, cb) {

        $http.post(baseApiURL + 'LightSource/DeleteLightSource?Id=' + Id + '&&UserId=' + UserId)
        .then(function successCallback(response) {
            cb(response.data);
        },
        function errorCallback(response) {
            alert("Error Occured during Delete Processing....");
        });
    };

    return _obj;

}]);