app.controller("FloorStatusDashboard", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'Dashboard', function ($scope, $window, $rootScope, filterFilter, $mdDialog, Dashboard) {
    $scope.TotalRecord = 0;
    $scope.totalweight = 0;
    $scope.DataRecord = [];

    $scope.disabledShow = false;
    $scope.Processing = false;

    $scope.checkSample = function () {
        $scope.batchType = 'Sample';
        $scope.LoadingData();
    }

    $scope.checkBulk = function () {
        $scope.batchType = 'Bulk';
        $scope.LoadingData();
    }


    Dashboard.GetDyeingUnit($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });     

    $scope.Statuses = ["Dyeing Running",
        "Dyeing End",
        "Slitting Running",
        "Slitting End",
        "Stenter Running",
        "Stenter End",
        "Dryer Running",
        "Dryer End",
        "Compacting Running",
        "Compacting End",
        "RFD",
        "Check Roll Sent",
        "Check Roll Not Sent"
    ];

    
    $scope.LoadingData = function () {        

        let fromDate = null, toDate = null;
     /*   $scope.disabledShow = true;*/
        $scope.Processing = false;

        if ($scope.FromDate != undefined && $scope.ToDate != undefined && $scope.Unit.Id != undefined) {
            $scope.Processing = true;
            fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
            toDate = moment($scope.ToDate).format('DD-MMM-YYYY');

            let batchType = $scope.batchType;
            debugger;

            if (batchType == "Bulk") {

                Dashboard.GetFloorStatus($scope.Unit.UnitId, fromDate, toDate, function (data) {
                    debugger;
                    console.log(data);
                    $scope.FloorStatusData = data;
                    $scope.DataRecord = $scope.FloorStatusData;
                    CountWeight(data);
                    getData($scope.SelectStatus);
                    $scope.disabledShow = false;
                    $scope.Processing = false;
                });
            }
            else {

                Dashboard.GetFloorStatusSample($scope.Unit.UnitId, fromDate, toDate, function (data) {
                    debugger;
                    console.log(data);
                    $scope.FloorStatusData = data;
                    $scope.DataRecord = $scope.FloorStatusData;
                    CountWeight(data);
                    getData($scope.SelectStatus);
                    $scope.disabledShow = false;
                    $scope.Processing = false;
                });
            }


        }
    }

    $scope.LoadingStatusData = function () {
        getData($scope.SelectStatus);
        $scope.TotalRecord = $scope.DataRecord.length;
        if (!$scope.SelectStatus)
            $scope.SelectStatus = undefined; 
    }

    $scope.changeData = function () {
        $scope.FloorStatusData = [];
/*        $scope.SelectStatus = null;*/
        $scope.TotalRecord = 0;
        $scope.totalweight = 0;
    };

    $scope.ExportData = function (FloorStatusData) {   

        if (FloorStatusData.length > 0) {
            let today = new Date();

            let dd = today.getDate();
            let mm = today.getMonth() + 1;

            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = minutes + '' + hours + '' + dd + '' + mm + '' + yyyy;

            let filename = "FloorStatusData_" + today + ".xlsx";
            let records = $scope.DataRecord.map(record => {
                // Iterate over each property in the record
                Object.keys(record).forEach(key => {
                    // Set any null attribute to 0
                    record[key] = record[key] === null ? '' : record[key];
                });
                return record;
            });
            alasql('SELECT BatchNo,BuyerName,JobInfo,StyleInfo,Color,FabricType,Composition,FGSM,FDia,BodyQty, NeckQty, BNTQty, CksSend, Result, QualityTestApproved, FabricTestApproved,ShadeStatusBody, ShadeStatusNeck, ShadeStatusBNT, RFDApproved, BaseStatus, StartingTime, EndingTime,Status INTO XLSX("' + filename + '", { headers: true }) FROM ? ', [$scope.DataRecord]);
        }

    }   
        //$scope.StyleOrderData;

    $scope.computeSelectStatus = function (cksSend) {
        return cksSend === 'Sent' ? 'Check Roll Sent' : 'Check Roll Not Sent';
    };

    function CountWeight(record) {
        $scope.totalweight = 0;
        angular.forEach(record, function (model) {

            if ($scope.batchType == "Bulk") {
                $scope.totalweight = $scope.totalweight + (model.NeckQty + model.BodyQty + model.BNTQty);

            }
            else if ($scope.batchType=="Sample")
                {
                    $scope.totalweight = $scope.totalweight + (model.Fab1 + model.Fab2 + model.Fab3);
                }
        });
    }

    function getData(Status) {
        switch (Status) {
            case 'Check Roll Sent':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.CksSend == 'Sent');
                break;
            case 'Check Roll Not Sent':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.CksSend == '');
                break;
            case 'Dyeing Running':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus.toLowerCase() === 'dyeing running');
                break;
            case 'Dyeing End':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Dyeing End');
                break;
            case 'Slitting Running':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Slitting Running');
                break;
            case 'Slitting End':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Slitting End');
                break;
            case 'Stenter Running':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Stenter Running');
                break;
            case 'Stenter End':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Stenter End');
                break;
            case 'Dryer Running':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Dryer Running');
                break;
            case 'Dryer End':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Dryer End');
                break;
            case 'Compacting Running':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Compacting Running');
                break;
            case 'Compacting End':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.BaseStatus == 'Compacting End');
                break;
            case 'RFD':
                $scope.DataRecord = $scope.FloorStatusData.filter(x => x.RFDApproved == 'OK' || x.RFDApproved == 'P. OK');
                break;
            default:
                $scope.DataRecord = $scope.FloorStatusData;
        }
        CountWeight($scope.DataRecord);
        $scope.TotalRecord = $scope.DataRecord.length;
    }

    //data filter by status 
    $scope.customFilter = function (dataModel) {
        
        if ($scope.SelectStatus == 'Check Roll Sent') {           
            return dataModel.CksSend;
        }
        else if ($scope.SelectStatus == 'Check Roll Not Sent') {
            return dataModel.CksSend == '';
        }
        else if ($scope.SelectStatus == 'Dyeing Running') {
            return dataModel.BaseStatus == 'Dyeing Running'
        }
        else if ($scope.SelectStatus == 'Dyeing End') {
            return dataModel.BaseStatus == 'Dyeing End'
        }
        else if ($scope.SelectStatus == 'Slitting Running') {
            return dataModel.BaseStatus == 'Slitting Running'
        }
        else if ($scope.SelectStatus == 'Slitting End') {
            return dataModel.BaseStatus == 'Slitting End'
        }
        else if ($scope.SelectStatus == 'Stenter Running') {
            return dataModel.BaseStatus == 'Stenter Running'
        }
        else if ($scope.SelectStatus == 'Stenter End') {
            return dataModel.BaseStatus == 'Stenter End'
        }
        else if ($scope.SelectStatus == 'Dryer Running') {
            return dataModel.BaseStatus == 'Dryer Running'
        }
        else if ($scope.SelectStatus == 'Dryer End') {
            return dataModel.BaseStatus == 'Dryer End'
        }
        else if ($scope.SelectStatus == 'Compacting Running') {
            return dataModel.BaseStatus == 'Compacting Running'
        }
        else if ($scope.SelectStatus == 'Compacting End') {
            return dataModel.BaseStatus == 'Compacting End'
        }
        else if ($scope.SelectStatus == 'RFD') {
            return dataModel.RFDApproved == 'OK' || dataModel.RFDApproved == 'P. OK'
        }
        else {
            return dataModel.BaseStatus;
        }

    };


}]);