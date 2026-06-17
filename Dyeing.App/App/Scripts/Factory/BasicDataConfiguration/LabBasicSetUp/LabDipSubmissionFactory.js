app.factory("LabDipSubmission", ['$http', function ($http) {

    var _obj = {};

    

    //================ GET ALL LAB DIP SUBMISSION DATA =================//

    _obj.GetBuyerAll = function (userCode, cb) {
        $http.get(baseApiURL + 'LabDipSubmission/GetBuyerAll?UserId=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetLabDipSubmissionDatabyBuyer = function (BuyerId, cb) {
        $http.get(baseApiURL + 'LabDipSubmission/GetLabDipSubmissionDatabyBuyer?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetLabDipSubmissionData = function (BuyerId, JobInfo, Style, Color, LabDipBooking, OpTime, cb) {
        $http.get(baseApiURL + 'LabDipSubmission/GetLabDipSubmissionData?BuyerId=' + BuyerId + "&&JobInfo=" + JobInfo + "&&Style=" + Style + "&&Color=" + Color + "&&LabDipBooking=" + LabDipBooking + "&&OpTime=" + OpTime).then(function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };


    //================ SAVE / UPDATE =================//

    _obj.SaveUpdateLabDipSubmissionData = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'LabDipSubmission/SaveUpdateLabDipSubmissionData', data).then(function successCallback(response) {
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