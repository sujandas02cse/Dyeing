app.factory("FinFabStoreIssue", [
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
    _obj.GetTrackingNo = function(cb) {
      $http.get(baseApiURL + "CommonApi/GetTrackingNo").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading....");
        }
      );
    };
    _obj.GetDataByBatch = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinFabStoreIssue/GetDataByBatch?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading....");
          }
        );
      };

    _obj.GetDataByTracking = function(Id, cb) {
      $http
        .get(baseApiURL + "FinFabStoreIssue/GetDataByTracking?Id=" + Id)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading....");
          }
        );
    };

    _obj.PackingList_SaveUpdate = function(Model, cb) {
      $http
        .post(baseApiURL + "FinFabStoreIssue/PackingList_SaveUpdate", Model)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetDataByBatchNew = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinFabStoreIssue/GetDataByBatchNew?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading....");
          }
        );
    };

    _obj.PackingList_SaveUpdateNew = function(Model, cb) {
      $http
        .post(baseApiURL + "FinFabStoreIssue/PackingList_SaveUpdateNew", Model)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
    };

    _obj.GetDataByTrackingNew = function(Id, cb) {
      $http
        .get(baseApiURL + "FinFabStoreIssue/GetDataByTrackingNew?Id=" + Id)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading....");
          }
        );
    };

    _obj.GetAllUnit = function(userCode, cb) {
      debugger;
      $http
        .get(baseApiURL + "CommonApi/GetDyeingUnitByUser?UserId=" + userCode)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Data....");
          }
        );
      };

      _obj.GetBatchNoListUnitStatusWise = function (batchType, Unit, cb) {
          debugger;
          $http.get(baseApiURL + 'McOperationConfig/GetBatchNoListUnitStatusWise?status=' + batchType + '&&unit=' + Unit).then(function successCallback(response) {
              cb(response.data);
          }, function errorCallback(response) {
              alert("Error Occured during Load Information....");
          });
      }


    return _obj;
  }
]);
