app.factory("FinishFabricInspectionConfigNewFormat", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetInspectionInfo = function(type, FilterText, rollNo, compTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetInspectionInfo?FilterText=" +
            FilterText +
            "&&type=" +
            type +
            "&&RollNo=" +
            rollNo +
            "&&CompTime=" +
            compTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Information....");
          }
        );
    };

    _obj.GetAllBuyersMasterData = function(cb) {
      $http
        .get(baseApiURL + "CommonMerchandisingApi/GetAllBuyersMasterData")
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };

    _obj.GetMachineNo = function(userid, cb) {
      $http
        .get(
          baseApiURL + "FinishFabricInspectionConfig/GetQcMcNo?userid=" + userid
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Q/C Machine Information....");
          }
        );
    };

    _obj.GetCompTimeByBatch = function(BatchNo, cb) {
      $http
        .get(baseApiURL + "CommonApi/GetCompTimeByBatch?BatchNo=" + BatchNo)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetRollNo = function(BatchNo, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetRollNo?BatchNo=" +
            BatchNo +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetRollStatus = function(BatchNo, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetRollStatus?BatchNo=" +
            BatchNo +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetRollList = function(BatchNo, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetRollList?BatchNo=" +
            BatchNo +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetBuyerJobOrderForMasterData = function(BuyerId, Id, Info, Flag, cb) {
      $http
        .get(
          baseApiURL +
            "MasterDataConfig/GetBuyerJobOrderForMasterData?BuyerId=" +
            BuyerId +
            "&&Id=" +
            Id +
            "&&Info=" +
            Info +
            "&&Flag=" +
            Flag
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

    _obj.GetOriginStatus = function(BatchNo, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetOriginStatus?BatchNo=" +
            BatchNo
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Origin Status....");
          }
        );
    };

    _obj.GetInspectionInfoNew = function(
      type,
      FilterText,
      rollNo,
      compTime,
      cb
    ) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetInspectionInfoNew?FilterText=" +
            FilterText +
            "&&type=" +
            type +
            "&&RollNo=" +
            rollNo +
            "&&CompTime=" +
            compTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Loading Information....");
          }
        );
    };

    _obj.SaveUpdateNew = function(_obj, status, cb) {
      debugger;
      $http
        .post(
          baseApiURL +
            "FinishFabricInspectionConfig/SaveUpdateNew?status=" +
            status,
            _obj
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

    // updated by Sujan Das on 06-Jan-2024
    _obj.GetRollStatusNew = function(BatchNo, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetRollStatusNew?BatchNo=" +
            BatchNo +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    // updated by Sujan Das on 07-Jan-2024
    _obj.GetCompTimeByBatchNew = function(BatchNo, cb) {
      $http
        .get(baseApiURL + "CommonApi/GetCompTimeByBatchNew?BatchNo=" + BatchNo)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetRollNoNew = function(BatchNo, CompTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfig/GetRollNoNew?BatchNo=" +
            BatchNo +
            "&&CompTime=" +
            CompTime
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    // updated by Sujan Das on 20-April-2025
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

    _obj.GetBatchNoListUnitWise = function(Unit, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfigNew/GetBatchNoListUnitWise?unit=" +
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

    _obj.LoadBuyerJobStyle = function(BpmId, cb) {
      debugger;
      $http
        .get(
          baseApiURL + "McOperationConfigNew/LoadBuyerJobStyle?BpmId=" + BpmId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.LoadMachineStages = function(BpmId, cb) {
      debugger;
      $http
        .get(
          baseApiURL + "McOperationConfigNew/LoadMachineStages?BpmId=" + BpmId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.GetMachineWiseBodyParts = function(mcOperationMasterId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfigNew/GetMachineWiseBodyParts?mcOperationMasterId=" +
            mcOperationMasterId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.LoadTotalRollQuantity = function(BpmId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "McOperationConfigNew/LoadTotalRollQuantity?BpmId=" +
            BpmId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.LoadInspectionPoint = function(cb) {
      debugger;
      $http.get(baseApiURL + "McOperationConfigNew/LoadInspectionPoint").then(
        function successCallback(response) {
          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Load Information....");
        }
      );
    };

    _obj.LoadFaultsForInspection = function(cb) {
      debugger;
      $http
        .get(baseApiURL + "McOperationConfigNew/LoadFaultsForInspection")
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Information....");
          }
        );
    };

      _obj.Save = function (status,_obj,  cb) {
          debugger;
      $http
          .post(baseApiURL + "FinishFabricInspectionConfigNewFormat/Save?status=" + status, _obj)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Data Processing....");
          }
        );
    };

    _obj.LoadAllGeneratedRolls = function(mcOperationMasterId, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfigNewFormat/LoadAllGeneratedRolls?mcOperationMasterId=" +
            mcOperationMasterId
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Load Roll No Information....");
          }
        );
    };

    _obj.LoadRollWiseInspectionPoints = function(BpmId, RollNo, cb) {
      debugger;
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionConfigNewFormat/LoadRollWiseInspectionPoints?BpmId=" +
            BpmId +
            "&&RollNo=" +
            RollNo
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


      _obj.LoadRollWiseFaults = function (BpmId, RollNo, cb) {
          debugger;
          $http
              .get(
                  baseApiURL +
                  "FinishFabricInspectionConfigNewFormat/LoadRollWiseFaults?BpmId=" +
                  BpmId +
                  "&&RollNo=" +
                  RollNo
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


      _obj.DisplayRollWiseBodyPart = function (BpmId, RollNo, cb) {
          debugger;
          $http
              .get(
                  baseApiURL +
                  "FinishFabricInspectionConfigNewFormat/DisplayRollWiseBodyPart?BpmId=" +
                  BpmId +
                  "&&RollNo=" +
                  RollNo
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
