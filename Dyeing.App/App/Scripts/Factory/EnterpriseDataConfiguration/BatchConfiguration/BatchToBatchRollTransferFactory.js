app.factory("BatchToBatchRollTransfer", [
  "$http",
  function($http) {
    var _obj = {};

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

    _obj.GetBatchNo = function(UnitId, cb) {
      debugger;

      $http.get(baseApiURL + "CommonApi/GetBatchNo?UnitId=" + UnitId).then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Batch No....");
        }
      );
    };

    _obj.GetRollList = function(BatchNo, cb) {
      debugger;
      $http.get(baseApiURL + "CommonApi/GetRollList?BatchNo=" + BatchNo).then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Batch No....");
        }
      );
    };

    _obj.GetRollListByQRCode = function(QRCode, cb) {
      debugger;
      $http
        .get(baseApiURL + "CommonApi/GetRollListByQRCode?QRCode=" + QRCode)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
          }
        );
    };

    _obj.GetDestinationBatchList = function(BatchNo, cb) {
      debugger;
      $http
        .get(
          baseApiURL + "CommonApi/GetDestinationBatchList?BatchNo=" + BatchNo
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
          }
        );
    };

    _obj.GetDestinationRollList = function(DestinationBatchNo, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "CommonApi/GetDestinationRollList?DestinationBatchNo=" +
            DestinationBatchNo
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
          }
        );
    };

    _obj.Transfer = function(BatchRollTransferObjList, cb) {
      debugger;
      $http
        .post(
          baseApiURL + "BatchToBatchRollTransfer/Transfer",
          BatchRollTransferObjList
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Data Processing....");
          }
        );
    };

    _obj.DestinationMaxCompactingTime = function(DestinationBpmId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "BatchToBatchRollTransfer/DestinationMaxCompactingTime?DestinationBpmId=" +
            DestinationBpmId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Batch No....");
          }
        );
    };


   


      return _obj;
  }
]);
