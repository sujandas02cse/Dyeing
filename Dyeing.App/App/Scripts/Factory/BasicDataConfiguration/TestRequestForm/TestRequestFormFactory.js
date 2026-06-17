app.factory("TestRequestFormFactory", ['$http', function ($http) {

    var _obj = {};

    _obj.GetTestRequestFormData = function (userCode, cb) {
        $http.get(baseApiURL + 'TestRequestForm/GetTestRequestForm?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetRnDBookingDetails = function (cb) {
        $http.get(baseApiURL + 'TestRequestForm/GetRnDBookingDetails').then(function successCallback(response) {
            cb(response.data);
        },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };

    

    //================ SAVE / UPDATE =================//

    _obj.SaveUpdateTestRequestForm = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'TestRequestForm/SaveUpdateTestRequestForm', data).then(function successCallback(response) {
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