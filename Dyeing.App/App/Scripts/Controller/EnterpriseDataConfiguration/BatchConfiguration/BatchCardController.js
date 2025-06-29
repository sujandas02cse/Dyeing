app.controller("BatchCardController", ['$scope', '$rootScope', '$location', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'BatchCard', function ($scope, $rootScope, $location, $mdDialog, $mdToast, $q, $parse, fileReader, $window, BatchCard) {

    BatchCard.GetFinMcByType('Dyeing', function (data) {
        $scope.MachineList = data;
    });

    let reviseNo = $location.search().r;    
    if (reviseNo == undefined) {
        reviseNo = 0;        
    }
    $scope.ReviseNo = reviseNo;

    $scope.batchSpec = [{}, {}, {}, {}, {}];
    $scope.nozzleTrolley = [{}, {}, {}, {}];
    
    BatchCard.GetBatchDataById($location.search().id, reviseNo, function (data) { 
        debugger;  
        $scope.batch.IsCSample = ($scope.batch.IsCSample != 1 || $scope.batch.IsCSample === undefined) ? false : true;
        $scope.batch = data.m_Item1[0];

        $scope.batch.BatchProcessingId = $location.search().id;
        $scope.batch.ReviseNo = reviseNo;        
        if (reviseNo > 0) {
            $scope.batch.IsPPSample = $scope.batch.IsPPSample == 1 ? true : false;
            $scope.btnSave = 'Update';
            for (i = 0; i < data.m_Item2.length; i++) {
                $scope.batchSpec[i].Id = data.m_Item2[i].Id;
                $scope.batchSpec[i].BodyPart = data.m_Item2[i].BodyPart;
                $scope.batchSpec[i].PlanQty = data.m_Item2[i].PlanQty;
                $scope.batchSpec[i].ActualQty = data.m_Item2[i].ActualQty;
                $scope.batchSpec[i].McDia = data.m_Item2[i].McDia;
                $scope.batchSpec[i].Rolls = data.m_Item2[i].Rolls;
                $scope.batchSpec[i].Identification = data.m_Item2[i].Identification;
                $scope.batchSpec[i].FDia = data.m_Item2[i].FDia;
                $scope.batchSpec[i].GDia = data.m_Item2[i].GDia;
                $scope.batchSpec[i].FGSM = data.m_Item2[i].FGSM;
                $scope.batchSpec[i].GGSM = data.m_Item2[i].GGSM;
            }
            $scope.changePlanQty();
            $scope.changeAPlanQty();

            for (i = 0; i < data.m_Item3.length; i++) {
                $scope.nozzleTrolley[i].Id = data.m_Item3[i].Id;
                $scope.nozzleTrolley[i].Nozzle = data.m_Item3[i].Nozzle;
                $scope.nozzleTrolley[i].Trolley = { id: data.m_Item3[i].TrolleyId, name: data.m_Item3[i].TrolleyNo };
            }

        } else {
            $scope.btnSave = 'Save';           

            $scope.batchSpec[0].BodyPart = 'Body';
            $scope.batchSpec[0].PlanQty = $scope.batch.Body;

            $scope.batchSpec[1].BodyPart = 'Body2';
            $scope.batchSpec[2].BodyPart = 'Body3';

            $scope.batchSpec[3].BodyPart = 'Neck';
            $scope.batchSpec[3].PlanQty = $scope.batch.Rib;

            $scope.batchSpec[4].BodyPart = 'BNT';
            $scope.batchSpec[4].PlanQty = $scope.batch.BNT;

            $scope.changePlanQty();
        }
        
    });

    
    $scope.PPorC = function(type) {
        if (type === 'IsPPSample') {
            if ($scope.batch.IsPPSample) {
                $scope.batch.IsCSample = false;
            } else {
                // Uncheck the other if currently checked
                if ($scope.batch.IsCSample) {
                    $scope.batch.IsCSample = false;
                }
            }
        } 
        else if (type === 'IsCSample') {
            if ($scope.batch.IsCSample) {
                $scope.batch.IsPPSample = false;
            } else {
                // Uncheck the other if currently checked
                if ($scope.batch.IsPPSample) {
                    $scope.batch.IsPPSample = false;
                }
            }
        }
    };
    

    BatchCard.GetTrollyNo(12, function (data) {
        $scope.TrollyInfo = data;        
    });

    $scope.actionDialog = function (action, dataModel) {
        debugger
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {                 
                     SaveUpdate();                    
                } 
            });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch Data?' };
        } 
        return obj;
    }

    $scope.shadeChange = function (f) {
        if (f == 0) {
            $scope.batch.ShadeOk = false;
            $scope.batch.ShadeNOk = true;
        } else if(f==1){
            $scope.batch.ShadeOk = true;
            $scope.batch.ShadeNOk = false;
        }            
    }

    $scope.qualityChange = function (f) {
        if (f == 0) {
            $scope.batch.QualityOk = false;
            $scope.batch.QualityNOk = true;
        } else if (f == 1) {
            $scope.batch.QualityOk = true;
            $scope.batch.QualityNOk = false;
        }
    }

    $scope.changePlanQty = function () {
        
        let total = 0;
        for (i = 0; i < $scope.batchSpec.length; i++) {
            let pQty = parseInt($scope.batchSpec[i].PlanQty);
            if (isNaN(pQty))
                pQty = 0;

            total += pQty;
        }
        $scope.batch.Total = total;
    }

    $scope.changeAPlanQty = function () {
        let total = 0;
        for (i = 0; i < $scope.batchSpec.length; i++) {
            total += isNaN(parseInt($scope.batchSpec[i].ActualQty))? 0 : parseInt($scope.batchSpec[i].ActualQty);
        }
        $scope.batch.ActualTotal = total;
    }

    function SaveUpdate() {
        //console.log("master", $scope.master);
        debugger;
        console.log("batch", $scope.batch);
        console.log("batchSpec", $scope.batchSpec);
        
        $scope.batch.IsCSample = $scope.batch.IsCSample == 1 ? true : false;        
        $scope.batch.IsPPSample = $scope.batch.IsPPSample == 1 ? true : false;        

        if ($scope.batch.ShadeOk)
            $scope.batch.Shade = 'Ok';
        else if ($scope.batch.ShadeNOk)
            $scope.batch.Shade = 'Not Ok';

        if ($scope.batch.QualityOk)
            $scope.batch.Quality = 'Ok';
        else if ($scope.batch.QualityNOk)
            $scope.batch.Quality = 'Not Ok';

        for (t = 0; t < $scope.nozzleTrolley.length; t++) {
            $scope.nozzleTrolley[t].TrolleyId = $scope.nozzleTrolley[t].Trolley.id;
        }
        for (t = 0; t < $scope.batchSpec.length; t++) {
            $scope.batchSpec[t].PlanQty = $scope.batchSpec[t].PlanQty == "" ? null : $scope.batchSpec[t].PlanQty;
            $scope.batchSpec[t].ActualQty = $scope.batchSpec[t].ActualQty == "" ? null : $scope.batchSpec[t].ActualQty;
        }
        if ($scope.batch.McNo.MDId) {
            $scope.batch.McId = $scope.batch.McNo.MDId;
            $scope.batch.McNo = $scope.batch.McNo.MachineNo;
        }        
debugger
        let obj = {
            UserId: $rootScope.UserId,
            batch: $scope.batch,
            batchSpec: $scope.batchSpec,
            nozzleTr: $scope.nozzleTrolley
        }
        debugger
        console.log("data", obj);

        BatchCard.BatchData_SaveUpdate(obj, function (res) {
            debugger
            if (res.ErrorMsg == null) {                
                if (res.Data.Tag != 'duplicate') {
                    debugger
                    if ($scope.batch.IsPPSample == true)                   
                        $window.open('../DashboardManagement/BatchCardReportPP?BpmId=' + res.Data.BpmId + '&&Format=PDF#view=FitH');
                    else if ($scope.batch.IsCSample == true)
                        $window.open('../DashboardManagement/BatchCardReportC?BpmId=' + res.Data.BpmId + '&&Format=PDF#view=FitH');
                    else
                        $window.open('../DashboardManagement/BatchCardReportN?BpmId=' + res.Data.BpmId + '&&Format=PDF#view=FitH');
                    debugger
                }                
                $rootScope.alert(res.Msg);
            }
            else $rootScope.alert(res.ErrorMsg);
        });
    }

  

}
]
);

