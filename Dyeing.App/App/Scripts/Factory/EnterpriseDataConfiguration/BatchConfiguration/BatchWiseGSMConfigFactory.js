app.factory("BatchWiseGSMConfig", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetBatchNo = function(cb) {
      $http.get(baseApiURL + "BatchWiseGSM/GetBatchNo").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Batch No....");
        }
      );
    };

    _obj.GetAGSM = function(cb) {
      $http.get(baseApiURL + "BatchWiseGSM/GetAGSM").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Actual GSM....");
        }
      );
    };

    _obj.GetBatchWiseGSMInfo = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "BatchWiseGSM/GetBatchWiseGSMInfo?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Batch Information....");
          }
        );
    };

    _obj.GetBatchWiseGSMDetailsInfo = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "BatchWiseGSM/GetBatchWiseGSMDetailsInfo?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };

    _obj.GetStepNo = function(BarcodeId, BpmId, RollNo, cb) {
      $http
        .get(
          baseApiURL +
            "BatchWiseGSM/GetStepNo?BarcodeId=" +
            BarcodeId +
            "&BpmId=" +
            BpmId +
            "&RollNo=" +
            RollNo
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Step Information....");
          }
        );
    };
    _obj.getUpdateValue = function(BgcId, cb) {
      $http.get(baseApiURL + "BatchWiseGSM/getUpdateValue?BgcId=" + BgcId).then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Load Information....");
        }
      );
    };

    _obj.BatchWiseGSM_SaveUpdate = function(obj, cb) {
      $http.post(baseApiURL + "BatchWiseGSM/BatchWiseGSM_SaveUpdate", obj).then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Data Processing....");
        }
      );
    };

    _obj.GetBatchWiseGSMInfoNew = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "BatchWiseGSM/GetBatchWiseGSMInfoNew?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Batch Information....");
          }
        );
    };

    _obj.GetBatchWiseGSMDetailsInfoNew = function(BpmId, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "BatchWiseGSM/GetBatchWiseGSMDetailsInfoNew?BpmId=" +
            BpmId +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };

    _obj.BatchWiseGSM_SaveUpdateNew = function(obj, cb) {
      $http
        .post(baseApiURL + "BatchWiseGSM/BatchWiseGSM_SaveUpdateNew", obj)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Data Processing....");
          }
        );
    };

    _obj.GetUnitAll = function(userCode, cb) {
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

    _obj.GetBatchNoListUnitStatusWise = function(batchType, Unit, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfig/GetBatchNoListUnitStatusWise?status=" +
            batchType +
            "&&unit=" +
            Unit
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };

    return _obj;
  }
]);
