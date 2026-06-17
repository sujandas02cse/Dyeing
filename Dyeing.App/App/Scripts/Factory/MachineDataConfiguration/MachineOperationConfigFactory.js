app.factory("MachineOperationConfigFactory", [
  "$http",
  function($http) {
    var _obj = {};
    debugger;
    _obj.GetUnitAll = function(userCode, cb) {
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

    _obj.GetFinMcByTypeUnitWise = function(Type, UnitId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfig/GetFinMcByTypeUnitWise?Type=" +
            Type +
            "&&unit=" +
            UnitId
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

    _obj.GetBatchBasicInfo = function(BpmId, UnitId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfigNew/GetBatchBasicInfo?BpmId=" +
            BpmId +
            "&&UnitId=" +
            UnitId
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

    _obj.GetBodyPartDetails = function(BpmId, cb) {
      debugger;
      $http
        .get(
          baseApiURL + "McOperationConfigNew/GetBodyPartDetails?BpmId=" + BpmId
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

    _obj.GetOperationTime = function(BpmId,machineTypeId, cb) {
      debugger;
      $http
        .get(
            baseApiURL + "McOperationConfigNew/GetOperationTime?BpmId=" + BpmId + "&&machineTypeId=" +
            machineTypeId
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

    _obj.GetBatchStartEndTime = function(BpmId, OperationTime, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfigNew/GetBatchStartEndTime?BpmId=" +
            BpmId +
            "&&OperationTime=" +
            OperationTime
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

      _obj.SaveMachineOperationConfig = function(Obj, cb) {
      debugger;
      $http
          .post(baseApiURL + "McOperationConfigNew/SaveMachineOperationConfig", Obj)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };


      _obj.LoadCurrentStatus = function (BpmId, MachineTypeId, cb) {
          debugger;
          $http
              .get(
                  baseApiURL + "McOperationConfigNew/LoadCurrentStatus?BpmId=" + BpmId +
                  "&&MachineTypeId=" +
                  MachineTypeId
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

      

      _obj.GetBodyPartDetailsForEndMode = function (BpmId, mcOperationMasterId, cb) {
          debugger;
          $http
              .get(
                  baseApiURL +
                  "McOperationConfigNew/GetBodyPartDetailsForEndMode?bpmId=" +
                  BpmId +
                  "&&mcOperationMasterId=" +
                  mcOperationMasterId
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



      _obj.GetOperationHistoryByTime = function (BpmId, OperationTime,machineTypeId, cb) {
          debugger;
          $http
              .get(
                  baseApiURL +
                  "McOperationConfigNew/GetOperationHistoryByTime?BpmId=" +
                  BpmId +
                  "&&OperationTime=" +
                  OperationTime +
                  "&&machineTypeId=" +
                  machineTypeId
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


      _obj.GetBatchBodyPartStatus = function (BpmId, mdId, mcOperationMasterId,machineTypeId, cb) {
          debugger;
          $http
              .get(
                  baseApiURL +
                  "McOperationConfigNew/GetBatchBodyPartStatus?bpmId=" +
                  BpmId +
                  "&&mdId=" +
                  mdId +
                  "&&mcOperationMasterId=" +
                  mcOperationMasterId +
                  "&&machineTypeId=" +
                  machineTypeId
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


      _obj.GetMachineTypeId = function (machineType, cb) {
          debugger;
          $http
              .get(
                  baseApiURL + "McOperationConfigNew/GetMachineTypeId?machineType=" + machineType
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
