app.factory("FinishedFabricHandoverToStore", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetTrackingNo = function(UnitId, cb) {
      debugger;
      /* $http.get(baseApiURL + "CommonApi/GetTrackingNo").then(*/

      $http.get(baseApiURL + "CommonApi/GetTrackingNo?UnitId=" + UnitId).then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Batch No....");
        }
      );
    };

    _obj.GetDataByTracking = function(Id, RollType,UserId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "FinishedFabricHandoverToStore/GetDataByTracking?Id=" +
            Id +
            "&RollType=" +
            RollType +
            "&UserId=" +
            UserId
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

    _obj.SaveUpdate = function(Obj, cb) {
      debugger;
      $http
        .post(baseApiURL + "FinishedFabricHandoverToStore/SaveUpdate", Obj)
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

    _obj.GetDataBySingleRoll = function(SingleRollStickerNo, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "FinishedFabricHandoverToStore/GetDataBySingleRoll?SingleRollStickerNo=" +
            SingleRollStickerNo
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

      _obj.GetDataByMultiRoll = function (payload, cb) {
      debugger;
      $http
        .post(
          baseApiURL + "FinishedFabricHandoverToStore/GetDataByMultiRoll",
            payload
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

    return _obj;
  }
]);
