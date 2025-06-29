app.factory("FinishFabricInspectionSampleConfig", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetInspectionInfo = function(type, FilterText, rollNo, compTime, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/GetInspectionInfo?FilterText=" +
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

   
    _obj.GetInspectionInfoMultiple = function(type, FilterText, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/GetInspectionInfoMultiple?FilterText=" +
            FilterText +
            "&&type=" +
            type
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


      _obj.LoadQABodyPartMultiple = function (FilterText, rollNo, compTime, cb) {
          $http
              .get(
                  baseApiURL +
                  "FinishFabricInspectionSampleConfig/LoadQABodyPartMultiple?FilterText=" +
                  FilterText +
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

      

      _obj.LoadBodyWeightGivenByProcessBy = function (FilterText, rollNo, compTime, cb) {
          $http
              .get(
                  baseApiURL +
                  "FinishFabricInspectionSampleConfig/LoadBodyWeightGivenByProcessBy?FilterText=" +
                  FilterText +
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

    _obj.LoadCounting = function(BatchNo, cb) {
      let bn = BatchNo.toString();
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/LoadCounting?BatchNo=" +
            bn
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

    _obj.LoadProcessBy = function(cb) {
      $http
        .get(baseApiURL + "FinishFabricInspectionSampleConfig/LoadProcessBy")
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Process By Information....");
          }
        );
    };
    _obj.LoadGivenBy = function(cb) {
      $http
        .get(baseApiURL + "FinishFabricInspectionSampleConfig/LoadGivenBy")
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Given By Information....");
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

    _obj.LoadBodyPartDetails = function(BatchNo, Counting, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/LoadBodyPartDetails?BatchNo=" +
            BatchNo +
            "&&Counting=" +
            Counting
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

    _obj.LoadBodyPart = function(BatchNo, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/LoadBodyPart?BatchNo=" +
            BatchNo
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

    _obj.LoadBodyPartDetailsIndividual = function(BatchNo, BSpecId, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/LoadBodyPartDetailsIndividual?BatchNo=" +
            BatchNo +
            "&&BSpecId=" +
            BSpecId
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

    _obj.LoadFaultInspectionDetails = function(BatchNo, Counting, cb) {
      $http
        .get(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/LoadFaultInspectionDetails?BatchNo=" +
            BatchNo +
            "&&Counting=" +
            Counting
        )
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert(
              "Error Occured during Load Fault Inspection No Information......"
            );
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

    //_obj.GetRollNo = function (user, cb) {
    //    alert(BatchNo)
    //    $http.get(baseApiURL + 'FinishFabricInspectionConfig/GetRollNo?userid=' + BatchNo).then(function successCallback(response) {
    //        cb(response.data);
    //    }, function errorCallback(response) {
    //        alert("Error Occured during Load Roll No Information....");
    //    });
    //}

    _obj.SaveUpdateSample = function(_obj, cb) {
      $http
        .post(
          baseApiURL + "FinishFabricInspectionSampleConfig/SaveUpdateSample",
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

    _obj.SaveUpdateSampleMultiple = function(_obj, cb) {
      $http
        .post(
          baseApiURL +
            "FinishFabricInspectionSampleConfig/SaveUpdateSampleMultiple",
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

    return _obj;
  }
]);
