app.controller("BatchCardReprocessController", ['$scope', '$rootScope', '$location', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'BatchReprocess', function ($scope, $rootScope, $location, $mdDialog, $mdToast, $q, $parse, fileReader, $window, BatchReprocess) {

    $scope.batchSpec = [{}, {}, {}, {}, {}];
    $scope.nozzleTrolley = [{}, {}, {}, {}];

    //$scope.ShowEdit = false;
    let r = $location.search().r;
    if (r == undefined)
        r = 0;
    BatchReprocess.GetBatchReprocessDataById($location.search().id, r, function (data) {

        $scope.batch = data.m_Item1[0];
        
        $scope.batch.BpmId = $location.search().id;
        if ($location.search().r) {
            $scope.batch.EditOnly = true;
            $scope.ShowEdit = true;
            //$scope.batch.ReprocessNo = $location.search().r;
        } else {
            $scope.ShowEdit = false;
            $scope.batch.EditOnly = false;
        }      

        //if ($scope.batch.EditOnly == true) {
            //$scope.batch.reprocessNo = $scope.batch.reprocessNo == 1 ? true : false;
            //$scope.btnSave = 'Update';
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

        $scope.batch.Total = $scope.changePlanQty();
        $scope.batch.ActualTotal = $scope.changeAPlanQty();

        for (i = 0; i < data.m_Item3.length; i++) {
            $scope.nozzleTrolley[i].Id = data.m_Item3[i].Id;
            $scope.nozzleTrolley[i].Nozzle = data.m_Item3[i].Nozzle;
            $scope.nozzleTrolley[i].Trolley = { id: data.m_Item3[i].TrolleyId, name: data.m_Item3[i].TrolleyNo };
        }

        //}
        //else {
        //    $scope.btnSave = 'Save';

        //    $scope.batchSpec[0].BodyPart = 'Body';
        //    $scope.batchSpec[0].PlanQty = $scope.batch.Body;

        $scope.batchSpec[1].BodyPart = 'Body2';
        $scope.batchSpec[2].BodyPart = 'Body3';
        //$scope.batch.EditOnly = true;

        //    $scope.batchSpec[3].BodyPart = 'Neck';
        //    $scope.batchSpec[3].PlanQty = $scope.batch.Rib;

        //    $scope.batchSpec[4].BodyPart = 'BNT';
        //    $scope.batchSpec[4].PlanQty = $scope.batch.BNT;
        //    $scope.batch.McNo = "";
        //    $scope.changePlanQty();

        //}

    });


    BatchReprocess.GetFinMcByType('Dyeing', function (data) {
        $scope.MachineList = data;
    });




    BatchReprocess.GetTrollyNo(12, function (data) {
        $scope.TrollyInfo = data;
    });

    $scope.actionDialog = function (action, dataModel) {
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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch Reprocess Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch Reprocess Data?' };
        }
        return obj;
    }

    $scope.shadeChange = function (f) {
        if (f == 0) {
            $scope.batch.ShadeOk = false;
            $scope.batch.ShadeNOk = true;
        } else if (f == 1) {
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
        let total = 0.0;
        for (i = 0; i < $scope.batchSpec.length; i++) {
            let pQty = parseFloat($scope.batchSpec[i].PlanQty);
            if (isNaN(pQty))
                pQty = 0.0;

            total += pQty;
        }

        return parseFloat(total).toFixed(2);
    }

    $scope.changeAPlanQty = function () {
        let total = 0.0;
        for (i = 0; i < $scope.batchSpec.length; i++) {
            total += isNaN(parseFloat($scope.batchSpec[i].ActualQty)) ? 0.0 : parseFloat($scope.batchSpec[i].ActualQty);
        }

        return parseFloat(total).toFixed(2);
        //$scope.batch.ActualTotal = total;
    }
    

    function SaveUpdate() {      
       
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

        let obj = {
            UserId: $rootScope.UserId,
            batch: $scope.batch,
            batchSpec: $scope.batchSpec,
            nozzleTr: $scope.nozzleTrolley
        }

        BatchReprocess.BatchReprocessData_SaveUpdate(obj, function (res) {
            if (res.ErrorMsg == null) {
                if (res.Data.Tag != 'duplicate') {
                    $window.open('../DashboardManagement/BatchCardReport?BpmId=' + res.Data.BpmId + '&&Format=PDF#view=FitH');
                }
                $rootScope.alert(res.Msg);
            }
            else $rootScope.alert(res.ErrorMsg);
        });        
    }
}]);

