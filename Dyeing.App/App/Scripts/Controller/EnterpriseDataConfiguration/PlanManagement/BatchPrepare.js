
app.controller("BatchPrepare", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {
    $scope.show = false;
    $scope.disabledShow = true;
    $scope.Processing = false;
    var reportType = '';

    var ReprocessNo = 0;
    var ReviseNo = 0;

    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
         
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadProcessData();
        }
    });

    PlanManagement.GetBodyPart(function (data) {
        $scope.BodyPartList = data;
    });

    $scope.FromDate = new Date();
    $scope.ToDate = new Date();

    $scope.LoadProcessData = function () {
        $scope.disabledShow = true;
        $scope.Processing = false;        
        $scope.show = false;

        if ($scope.Unit.Id != undefined && $scope.FromDate != undefined && $scope.ToDate != undefined) {
            document.body.style.cursor = 'wait';
            $scope.Processing = true;

            let fromDate = moment($scope.FromDate).format('DD-MMM-YYYY');
            let toDate = moment($scope.ToDate).format('DD-MMM-YYYY');

            if ($scope.RMode == "RG") {
                PlanManagement.GetBatchPrepareData($scope.Unit.Id, fromDate, toDate, function (data) {
                    for (let i = 0; i < data.length; i++) {
                        let total = 0;
                        let groupNo = data[i].GroupNo;
                        let CombinationId = data[i].CombinationId;
                        data.filter(x => x.GroupNo == groupNo && x.UniqueGuid == data[i].UniqueGuid).map(function (item) {
                            total += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
                        });
                        data[i].TotalFabQty = total;
                        
                    }

                    $scope.BatchPrepareData = data;
                    //console.log("batch", $scope.BatchPrepareData);

                    //$scope.BatchPrepareData.ReviseNo = $scope.BatchPrepareData.ReviseNo == 0 ? 0 : 1
                    $scope.disabledShow = false;
                    $scope.Processing = false;
                    document.body.style.cursor = 'default';
                })
            }
            else if ($scope.RMode == "RP") {

                PlanManagement.GetBatchReprocessData($scope.Unit.Id, fromDate, toDate, function (data) {

                    $scope.BatchReProcessingData = data;
                    $scope.totalReprocessItems = $scope.BatchReProcessingData.length;

                    $scope.disabledShow = false;
                    $scope.Processing = false;
                    document.body.style.cursor = 'default';
                })
            }
        }        
    }

    $scope.PPorC = function (type) {
        if (type === 'IsPPSample') {
            $scope.StockData[0].PPSample = $scope.PPSample ? false : true;
            $scope.StockData[0].China = false;
            $scope.StockData[0].PPSamplewithChina = false;
        }
        else if (type === 'IsCSample') {

            $scope.StockData[0].PPSample = false;
            $scope.StockData[0].China = $scope.China ? false : true;
            $scope.StockData[0].PPSamplewithChina = false;
        }
        else if (type === 'IsPPSampleOrChina') {

            $scope.StockData[0].PPSample = false;
            $scope.StockData[0].China = false;
            $scope.StockData[0].PPSamplewithChina = $scope.PPSamplewithChina ? false : true;
        }
    };

    $scope.BatchBehavior = function (f) {
        if (f == 'Y' && $scope.chkYes == true) {
            $scope.chkNo = false;
            $scope.chkAll = false;

            if ($scope.RMode == 'RG')
                $scope.BatchPrepareData = $scope.BatchPrepareDataAll.filter(x => x.BatchNo != undefined);
            else if ($scope.RMode == 'RP')
                $scope.BatchReprocessData = $scope.BatchReprocessDataAll.filter(x => x.BatchNo != undefined);
        }
        else if (f == 'N' && $scope.chkNo == true) {
            $scope.chkYes = false;
            $scope.chkAll = false;

            if ($scope.RMode == 'RG')
                $scope.BatchPrepareData = $scope.BatchPrepareDataAll.filter(x => x.BatchNo == undefined);
            else if ($scope.RMode == 'RP')
                $scope.BatchReprocessData = $scope.BatchReprocessDataAll.filter(x => x.BatchNo == undefined);
        }
        else if (f == 'A' && $scope.chkAll == true) {
            $scope.chkYes = false;
            $scope.chkNo = false;

            if ($scope.RMode == 'RG')
                $scope.BatchPrepareData = $scope.BatchPrepareDataAll;
            else if ($scope.RMode == 'RP')
                $scope.BatchReprocessData = $scope.BatchReprocessDataAll;
        } else {
            if ($scope.RMode == 'RG')
                $scope.BatchPrepareData = $scope.BatchPrepareDataAll;
            else if ($scope.RMode == 'RP')
                $scope.BatchReprocessData = $scope.BatchReprocessDataAll;
        }
        $scope.totalItems = $scope.BatchPrepareData.length;
        $scope.totalReprocessItems = $scope.BatchReprocessData.length;
    }

    $scope.showData = function () {        
        if ($scope.BatchPrepareData) {
            $scope.show = true;
            $scope.totalItems = $scope.BatchPrepareData.length;            
            $scope.BatchPrepareDataAll = $scope.BatchPrepareData;
            $scope.chkAll = true;
        }
        else if ($scope.BatchReprocessData) {
            $scope.show = true;
            $scope.totalReprocessItems = $scope.BatchReprocessData.length;            
            $scope.BatchReprocessDataAll = $scope.BatchReprocessData;
            $scope.chkAll = true;            
        }
    }

    $scope.SaveRevise = function () {

        let obj = {
            UnitId: $scope.Unit.Id === undefined ? 0 : $scope.Unit.Id,
            SourceUnitId: $scope.SourceUnit.Id,
            PPSample: $scope.PPSample == true ? 1 : 0,
            China: $scope.China == true ? 1 : 0,
            PPC: $scope.PPC == true ? 1 : 0,
            ReviseNo : ReviseNo,
            UserId: $rootScope.UserId,
            batch: $scope.StockData,
            Revised: $scope.IsPrepared            
        }
        
        PlanManagement.BatchPrepare_SaveUpdateNew(obj, function (res) {

            reportType = '';

            if ($scope.StockData[0].PPSample === true)
                reportType = 'PPSample';
            else if ($scope.StockData[0].China === true)
                reportType = 'China';
            else if ($scope.StockData[0].PPSamplewithChina === true)
                reportType = 'PPC';
            else
                reportType = '';
 

            if (res.ErrorMsg == null) {
                $rootScope.alert(res.Msg);               
                //window.open().location.href = '/Home/Index#!/BatchCardNew?id=' + BpmId;
                //window.open().location.href = '/Home/Index#!/BatchCardNew?id=' + BpmId + '&' + 'rType=' + reportType;
                let CurrUnit = $scope.Unit != Undefined ? $scope.Unit.Id : 0;
                
                $window.open('../DashboardManagement/BatchCardReportV2?BpmId=' + $scope.StockData[0].BpmId + '&&Format=PDF&&rType=' + reportType + '&&UnitName=' + CurrUnit + '#view=FitH');
                
            }
            else $rootScope.alert(res.ErrorMsg);
        });        
    }

    $scope.rowSpan = function (data) {
        return $scope.BatchPrepareData.filter(x => x.BpmId == data.BpmId).length;
    }

    $scope.showEl = function (data) {
        if (data.SeqNo == 1)
            return true;
        else
            return false;
    }

    $scope.getRowClass = function ($index) {
        if ($index == 0) {
            //let batchNo = $scope.PlanData[0].BatchNo;
            colorClass = 'table-white';
            return 'table-white';
        }
        else {
            let batchNo = $scope.BatchPrepareData[$index].BatchNo;
            let prevBatchNo = $scope.BatchPrepareData[$index - 1].BatchNo;

            if (batchNo != prevBatchNo) {
                if (colorClass == 'table-white')
                    colorClass = 'table-success';
                else
                    colorClass = 'table-white';
            }
            return colorClass;
        }
    };

    $scope.copy = function (model, indx) {

        let data = angular.copy(model);
        for (i = 0; i < $scope.StockData.length; i++) {
            let currData = $scope.StockData[i];
            if (currData.SeqNo > model.SeqNo) {
                $scope.StockData[i].SeqNo += 1;
            }
        }
        data.SeqNo = model.SeqNo + 1;

        $scope.StockData.splice(indx + 1, 0, data);
        //$scope.chkPlan.push(data);
    }

    $scope.remove = function (r) {

        let remModel = $scope.StockData[r];
        $scope.StockData.splice(r, 1);
        for (i = 0; i < $scope.StockData.length; i++) {
            let currData = $scope.StockData[i];
            if (currData.SeqNo > remModel.SeqNo) {
                $scope.StockData[i].SeqNo -= 1;
            }
        }
    }

    var ts = Math.floor(Date.now() / 1000);
    $scope.StockCheckPopup = function (ev, groupNo, IsPrepared) {
        $scope.StockData = $scope.BatchPrepareData.filter(x => x.GroupNo == groupNo);

        let planQty = 0; body = 0; neck = 0; bnt = 0;
        $scope.StockData.map(function (item) {
            planQty += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
        });
        $scope.StockData.filter(x => x.BodyPart.includes('Body')).map(function (item) {
            body += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
        });
        $scope.StockData.filter(x => x.BodyPart.includes('Neck')).map(function (item) {
            neck += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
        });
        $scope.StockData.filter(x => x.BodyPart.includes('BNT')).map(function (item) {
            bnt += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
        });

        ReviseNo = $scope.StockData[0].ReviseNo + 1;     

        $scope.PlanQty = planQty;
        $scope.Body = body;
        $scope.Neck = neck;
        $scope.BNT = bnt;
        $scope.IsPrepared = IsPrepared;

        $mdDialog.show({
            async: false,
            controller: DialogController,
            templateUrl: '/App/template/Popup/StockCheck.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    }

    function DialogController($scope, $mdDialog) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };


        //$scope.PPSamplewithChina = $scope.StockData[0].PPSamplewithChina = 1 ? true : false;
        //$scope.PPSample = $scope.StockData[0].PPSample = 1 ? true : false;
        //$scope.China = $scope.StockData[0].China = 1 ? true : false;
    }

}]);