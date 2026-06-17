app.factory("LabDipApproval", ['$http', function ($http) {

    var _obj = {};

    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    //================ GET ALL LABBOOKING RECEIVE DATA =================//
    _obj.GetBuyerAllApproved = function (userCode, cb) {
        $http.get(baseApiURL + 'LabDipApproval/GetBuyerAllApproved?UserId=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetLabDipApprovalDatabyBuyer = function (BuyerId, cb) {
        $http.get(baseApiURL + 'LabDipApproval/GetLabDipApprovalDatabyBuyer?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetLabDipApprovalData = function (BuyerId, JobInfo, Style, Color, LabDipBooking, cb) {
        $http.get(baseApiURL + 'LabDipApproval/GetLabDipApprovalData?BuyerId=' + BuyerId + "&&JobInfo=" + JobInfo + "&&Style=" + Style + "&&Color=" + Color + "&&LabDipBooking=" + LabDipBooking).then(function successCallback(response) {
            cb(response.data);
        },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            });
    };

    //================ SAVE / UPDATE =================//

    _obj.SaveUpdateLabDipApprovalData = function (data, cb) {
        debugger
        $http.post(baseApiURL + 'LabDipApproval/SaveUpdateLabDipApprovalData', data).then(function successCallback(response) {
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