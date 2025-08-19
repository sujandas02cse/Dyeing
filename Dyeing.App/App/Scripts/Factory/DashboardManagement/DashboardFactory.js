app.factory("Dashboard", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetPackingListData = function(flag, unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetPackingListData?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate +
            "&&flag=" +
            flag
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
          }
        );
    };

    _obj.GetUnitAll = function(userCode, cb) {
      $http
        .get(
          baseApiURL +
            "MasterDataConfig/GetDyeingMasterUnitData?userCode=" +
            userCode
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetFloorStatus = function(UnitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetBatchDataForFloorStatus?UnitId=" +
            UnitId +
            "&FromDate=" +
            fromDate +
            "&toDate=" +
            toDate
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetFloorStatusSample = function(UnitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetBatchDataForFloorStatusSample?UnitId=" +
            UnitId +
            "&FromDate=" +
            fromDate +
            "&toDate=" +
            toDate
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetDyeingUnit = function(userId, cb) {
      $http
        .get(baseApiURL + "CommonApi/GetDyeingUnitByUser?UserId=" + userId)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetUnitAll = function(userCode, cb) {
      $http
        .get(
          baseApiURL +
            "MasterDataConfig/GetDyeingMasterUnitData?userCode=" +
            userCode
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetMachineData = function(UnitNo, cb) {
      $http
        .get(baseApiURL + "PlanManagement/GetMachineData?UnitNo=" + UnitNo)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetPrioritySetData = function(UnitNo, MachineNo, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetDataForPrioritySet?UnitId=" +
            UnitNo +
            "&MachineNo=" +
            MachineNo
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetPackingListDataNew = function(flag, unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetPackingListDataNew?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate +
            "&&flag=" +
            flag
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Plan No....");
          }
        );
    };

    _obj.GetFloorStatusNew = function(UnitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "Dashboard/GetBatchDataForFloorStatusNew?UnitId=" +
            UnitId +
            "&FromDate=" +
            fromDate +
            "&toDate=" +
            toDate
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    return _obj;
  }
]);
