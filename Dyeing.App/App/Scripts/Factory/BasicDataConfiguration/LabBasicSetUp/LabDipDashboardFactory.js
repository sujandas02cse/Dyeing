app.factory("LabDipDashboard", ['$http', function ($http) {

    var _obj = {};

    _obj.GetUnitByUser = function (userCode, cb) {
        $http.get(baseApiURL +"MasterDataConfig/GetDyeingMasterUnitData?userCode=" +userCode).then(
            function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            }
        );
    };

    _obj.GetUnitWithoutUser = function (cb) {
        $http.get(baseApiURL + "MasterDataConfig/GetUnitWithoutUser").then(
            function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            }
        );
    };

    _obj.GetDyeingUnitAll = function (cb) {
        $http.get(baseApiURL + "CommonApi/GetDyeingUnitAll").then(
            function successCallback(response) {
                cb(response.data);
            },
            function errorCallback(response) {
                alert("Error Occured during Load Data....");
            }
        );
    };

    //================ GET ALL LABBOOKING RECEIVE DATA =================//
    _obj.GetLabDipDashboardReceipe = function (UnitId, FromDate, ToDate, cb) {
        $http.get(baseApiURL + 'LabDipDashboard/GetLabDipDashboardReceipe?UnitId=' + UnitId + "&&FromDate=" + FromDate + "&&ToDate=" + ToDate).then(function successCallback(response) {
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