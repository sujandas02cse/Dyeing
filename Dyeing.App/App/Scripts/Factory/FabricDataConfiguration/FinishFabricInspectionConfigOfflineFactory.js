app.factory("FinishFabricInspectionConfigOffline", [
    "$http",
    function ($http) {
        var _obj = {};

        _obj.GetBatchNo = function (cb) {
            debugger;
            $http.get(baseApiURL + "PlanManagement/GetSCMIssuedBatchNo").then(
                function successCallback(response) {
                    cb(response.data);
                },
                function errorCallback(response) {
                    alert("Error Occured during Loading Batch No....");
                }
            );
        };

        _obj.FinishFabricInspectionConfigOffline_Save = function (Obj, cb) {
            debugger;
            $http
                .post(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/FinishFabricInspectionConfigOffline_Save",
                    Obj
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

        _obj.GetUnitAll = function (userCode, cb) {
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

        _obj.GetBatchNoListForOfflineQC = function (batchType, Unit, cb) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/GetBatchNoListForOfflineQC?status=" +
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

        _obj.LoadDetailsByBatch = function (batchType, BatchNo, cb) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/LoadDetailsByBatch?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo
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

        _obj.LoadBodyPartsByBatch = function (batchType, BatchNo, cb) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/LoadBodyPartsByBatch?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo
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

        _obj.LoadFabricTypeComposition = function (
            batchType,
            BatchNo,
            BodyPartId,
            cb
        ) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/LoadFabricTypeComposition?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo +
                    "&&BodyPartId=" +
                    BodyPartId
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

        _obj.LoadDiaGSM = function (
            batchType,
            BatchNo,
            SelectedNumberOfRoll,
            BodyPartId,
            cb
        ) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/LoadDiaGSM?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo +
                    "&&SelectedNumberOfRoll=" +
                    SelectedNumberOfRoll +
                    "&&BodyPartId=" +
                    BodyPartId
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

        _obj.GetDiaPartList = function (cb) {
            debugger;
            $http
                .get(
                    baseApiURL + "FinishedFabricInspecitonConfigOffline/GetDiaPartList"
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

        _obj.IsSecondCompactingON = function (batchType, BatchNo, cb) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/IsSecondCompactingON?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo
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


        _obj.LoadSavedDiaGSM = function (
            batchType,
            BatchNo,
            BodyPartId,
            cb
        ) {
            debugger;
            $http
                .get(
                    baseApiURL +
                    "FinishedFabricInspecitonConfigOffline/LoadSavedDiaGSM?batchType=" +
                    batchType +
                    "&&BatchNo=" +
                    BatchNo +
                    "&&BodyPartId=" +
                    BodyPartId
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
