app.factory("BatchCardDashboardFactory", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetBatchNo = function(cb) {
      $http.get(baseApiURL + "DataRelatedDashboard/GetBatchNo").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Plan No....");
        }
      );
    };

    _obj.GetBatchCardDataV1 = function(unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardData?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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
    _obj.GetBatchCardDataV1Sample = function(unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataSample?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetBatchCardDataV2 = function(unitId, mode, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataV2?unitId=" +
            unitId +
            "&&mode=" +
            mode +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetBatchCardDataV2Sample = function(
      unitId,
      mode,
      fromDate,
      toDate,
      cb
    ) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataV2Sample?unitId=" +
            unitId +
            "&&mode=" +
            mode +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetUnitByUser = function(userCode, cb) {
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
    _obj.GetDyeingUnitAll = function(cb) {
      $http.get(baseApiURL + "CommonApi/GetDyeingUnitAll").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Load Data....");
        }
      );
    };

    _obj.GetBatchCardDataV1NewBulk = function(unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataNewBulk?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetBatchCardDataV2NewBulk = function(
      unitId,
      mode,
      fromDate,
      toDate,
      cb
    ) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataV2NewBulk?unitId=" +
            unitId +
            "&&mode=" +
            mode +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetBatchCardDataBeforeIssue = function(unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataBeforeIssue?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetBatchCardDataAfterIssue = function(unitId, fromDate, toDate, cb) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchCardDataAfterIssue?unitId=" +
            unitId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate
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

    _obj.GetUnitWithoutUser = function(cb) {
      $http.get(baseApiURL + "MasterDataConfig/GetUnitWithoutUser").then(
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
