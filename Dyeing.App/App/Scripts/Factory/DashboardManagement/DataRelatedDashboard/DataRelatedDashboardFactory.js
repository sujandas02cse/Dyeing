app.factory("DataRelatedDashboardFactory", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetBatchNo = function(cb) {
      $http.get(baseApiURL + "DataRelatedDashboard/GetBatchNo").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading....");
        }
      );
    };

    _obj.GetBatchCardData = function(unitId, cb) {
      $http
        .get(
          baseApiURL + "DataRelatedDashboard/GetBatchCardData?unitId=" + unitId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Data....");
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

    _obj.GetBuyerByUnit = function(unitId, cb) {
      $http
        .get(
          baseApiURL + "DataRelatedDashboard/GetBuyerByUnit?unitId=" + unitId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Data....");
          }
        );
    };
    _obj.GetJobByBuyer = function(buyerId, cb) {
      $http
        .get(
          baseApiURL + "DataRelatedDashboard/GetJobByBuyer?buyerId=" + buyerId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Data....");
          }
        );
    };
    _obj.GetStyleOrderData = function(
      unitId,
      buyerId,
      jobId,
      fromDate,
      toDate,
      cb
    ) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetStyleOrderData?unitId=" +
            unitId +
            "&&buyerId=" +
            buyerId +
            "&&jobId=" +
            jobId +
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
            alert("Error Occured during Loading Data....");
          }
        );
    };
    _obj.GetBatchOperationData = function(
      unitId,
      buyerId,
      jobId,
      fromDate,
      toDate,
      bpmId,
      cb
    ) {
      $http
        .get(
          baseApiURL +
            "DataRelatedDashboard/GetBatchOperationData?unitId=" +
            unitId +
            "&&buyerId=" +
            buyerId +
            "&&jobId=" +
            jobId +
            "&&fromDate=" +
            fromDate +
            "&&toDate=" +
            toDate +
            "&&bpmId=" +
            bpmId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Data....");
          }
        );
    };

    return _obj;
  }
]);
