app.factory("PlanManagement", ['$http', function ($http) {
    var _obj = {};


    _obj.GetUnitAll = function (userCode, cb) {
        $http.get(baseApiURL + 'MasterDataConfig/GetDyeingMasterUnitData?userCode=' + userCode).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }
    
    //Initial Info
    _obj.GetBuyerByUnit = function (UnitNo, cb) {
        $http.get(baseApiURL + 'CommonApi/GetBuyerByUnit?UnitNo=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetJobByBuyer = function (BuyerId, cb) {
        $http.get(baseApiURL + 'CommonApi/GetAllJobByBuyer?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetInitialInformation = function (UnitNo, BuyerId, JobId ,cb) {
        $http.get(baseApiURL + 'PlanManagement/InitialInformation?UnitNo=' + UnitNo + '&&BuyerId=' + BuyerId + '&&JobId=' + JobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBodyPart = function (cb) {
        $http.get(baseApiURL + 'BatchPlan/GetBodyPart').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.InititalInfo_Save = function (obj, cb) {
        $http.post(baseApiURL + 'PlanManagement/SaveInitialData', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }

    //Initial Plan
    _obj.GetInitialPlan = function (UnitNo,BuyerId, cb) {
        $http.get(baseApiURL + 'PlanManagement/InitialPlan?UnitNo=' + UnitNo + '&&BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.InititalPlan_Save = function (obj, cb) {
        $http.post(baseApiURL + 'PlanManagement/SaveInitialPlan', obj).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }
       
    //Batch Plan
    _obj.GetBatchPlanData = function (UnitId, BuyerId, JobId, cb) {
        $http.get(baseApiURL + 'BatchPlan/GetBatchPlanData?UnitId=' + UnitId + '&BuyerId=' + BuyerId + '&JobId=' + JobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GenBatchNoByJob = function (UnitId, JobId, NoOfBatch, PrevTBatch, Change, cb) {
        $http.get(baseApiURL + 'BatchPlan/GenBatchNoByJob?UnitId=' + UnitId + '&&JobId=' + JobId + '&&NoOfBatch=' + NoOfBatch + '&&PrevTBatch=' + PrevTBatch + '&&Change=' + Change).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDataByInitId = function (data, Comb, JobId, cb) {
        $http.post(baseApiURL + 'BatchPlan/GetBatchPlanDataByInitInfo?Comb=' + Comb + '&&JobId=' + JobId, data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetOFabricOperationData = function (cb) {
        $http.get(baseApiURL + 'CommonMerchandisingApi/GetOFabricOperationData').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.BatchPlan_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPlan/SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    //Machine Plan
    _obj.GetMachinePlanData = function (UnitId, BuyerId, JobId, cb) {
        $http.get(baseApiURL + 'MachinePlan/GetMachinePlanData?UnitId=' + UnitId + '&&BuyerId=' + BuyerId + '&&JobId=' + JobId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetFinMcByType = function (mcType, cb) {
        $http.get(baseApiURL + 'CommonApi/GetFinMcByType?Type=' + mcType).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    _obj.GetBatchPlanByGuid = function (UniqueId, ComId, cb) {
        $http.get(baseApiURL + 'MachinePlan/GetBatchPlanByGuid?UniqueId=' + UniqueId + '&&ComId=' + ComId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.MachinePlan_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'MachinePlan/SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    //Batch Prepare
    _obj.GetBatchPrepareData = function (UnitId, FromDate, ToDate, cb) {
        $http.get(baseApiURL + 'BatchPrepare/GetBatchPrepareData?UnitId=' + UnitId + '&&FromDate=' + FromDate + '&&ToDate=' + ToDate).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.BatchPrepare_SaveUpdate = function (data, cb) {
        $http.post(baseApiURL + 'BatchPrepare/BatchPrepare_SaveUpdate', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    //Dyeing Comment Enlistment
    _obj.GetFabBookingBuyerByUnit = function (UnitNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetFabBookingBuyer?UnitNo=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetFabBookingJobByBuyer = function (BuyerId, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetFabBookingJob?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetFabBookingStyleByJob = function (JobNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetFabBookingStyle?JobNo=' + JobNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetFabBookingColorByStyle = function (StyleId, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetFabBookingColor?StyleId=' + StyleId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetCommentEnlishmentsData = function (BuyerId, JobNo, StyleId, ColorId, OpTime, cb) {            
        $http.get(baseApiURL + 'PlanManagement/GetDyeingCommentEnlishment?BuyerId=' + BuyerId + '&JobNo=' + JobNo + '&StyleId=' + StyleId + '&ColorId=' + ColorId + '&OpTime=' + OpTime).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.SaveCommentEnlishment = function (data, cb) {

        $http.post(baseApiURL + 'PlanManagement/SaveDyeingCommentEnlishment', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    //Lab Dip Enlistment
    _obj.GetLabDipEnlishmentsData = function (BuyerId, JobNo, StyleId, ColorId, OpTime, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetLabDipEnlishment?BuyerId=' + BuyerId + '&JobNo=' + JobNo + '&StyleId=' + StyleId + '&ColorId=' + ColorId + '&OpTime=' + OpTime).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.SaveLabDipEnlishment = function (data, cb) {
        $http.post(baseApiURL + 'PlanManagement/SaveLabDipEnlishment', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    //Priority Set Data
    _obj.GetMachineData = function (UnitNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetMachineData?UnitNo=' + UnitNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.GetPriorityData = function (UnitNo, Machine, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetPriorityData?UnitNo=' + UnitNo + '&MachineId=' + Machine).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SavePrioritySet = function (data, cb) {
        $http.post(baseApiURL + 'PlanManagement/SavePrioritySetData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    //Dyeing Unit Change
    _obj.GetDyeingUnitOrderByStyle = function (StyleId, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetDyeingUnitOrderByStyle?StyleId=' + StyleId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }


    _obj.GetDyeingChangeData = function (UnitNo, BuyerId, JobNo, StyleId, OrderNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetDyeingChangeData?UnitNo=' + UnitNo + '&BuyerId=' + BuyerId + '&JobNo=' + JobNo + '&StyleId=' + StyleId + '&OrderNo=' + OrderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveDyeingUnitChange = function (data, cb) {
        $http.post(baseApiURL + 'PlanManagement/SaveDyeingChangeData', data).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }


    //Machine TO Machine Transfer
    _obj.GetBatchAndMachineData = function (UnitNo, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetBatchAndMachineData?UnitNo=' + UnitNo ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.GetBatchDetailData = function (BpmId, OpTime, cb) {
        $http.get(baseApiURL + 'PlanManagement/GetBatchDetailData?BpmId=' + BpmId + '&OpTime=' + OpTime).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Data....");
        });
    }

    _obj.SaveMachineChangeData = function (data, cb) {
        $http.post(baseApiURL + 'PlanManagement/SaveMachineChangeData', data).then(function successCallback(response) {
            debugger
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Information....");
        });
    }

    return _obj;
}]);