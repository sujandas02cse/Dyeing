app.controller("CheckRollEnd", ['$scope', '$window', '$rootScope', '$mdDialog', '$mdToast', 'ApprovalManagement', function ($scope, $window, $rootScope, $mdDialog, $mdToast, ApprovalManagement) {

    var changeabledata;

    $scope.CheckState = function () {
        $scope.RollSend = $scope.RollSend = undefined ? false : true;
    }

    ///get all Unit Data
    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function (data) {
        $scope.AllUnitData = data;

        if ($scope.AllUnitData.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });

    let BatchDataN;
    ///get all batch data function calling from Unit
    $scope.GetDyeingUnit = function () {
        $scope.allBatch = ApprovalManagement.GetCRApprovalBatchList($scope.Unit.UnitId, function (data) {
            $scope.allBatch = data;
        });
    }



    ///Get all Roll Data Function Calling from Batch
    $scope.GetBatchNo = function () {
        BatchDataN = ApprovalManagement.GetFTSApprovalBatchData($scope.Batch.BpmId, function (data) {
            console.log("data", data);
            $scope.BatchData = data.m_Item1[0];
            if (data.m_Item2.length === 0) {
                debugger
                $scope.FTApproved = null;
                $scope.ShadeApproved = null;
                $scope.ComApproved = null;
            }
            else {
                debugger
                $scope.FTA = data.m_Item2[0].FTApproved = undefined ? null : data.m_Item2[0].FTApproved;
                $scope.SA = data.m_Item2[0].ShadeApproved = undefined ? null : data.m_Item2[0].ShadeApproved;;
                $scope.CA = data.m_Item2[0].ComApproved = undefined ? null : data.m_Item2[0].ComApproved;;
                $scope.FTA = ($scope.FTA === null || $scope.FTA === 0) ?
                    ($scope.FTAN = true, $scope.FTA = false) : ($scope.FTAN = false, $scope.FTA = true);
                $scope.SA = ($scope.SA === null || $scope.SA === 0) ?
                    ($scope.SAN = true, $scope.SA = false) : ($scope.SAN = false, $scope.SA = true);
                $scope.CA = ($scope.CA === null || $scope.CA === 0) ?
                    ($scope.CAN = true, $scope.CA = false) : ($scope.CAN = false, $scope.CA = true);


                $scope.ReasonText();
            }
        });
    }


    //$scope.CheckState = function (data) {
    //    switch (data) {
    //        case "FTAOk":
    //            $scope.FTA = $scope.FTA == true ? false : true;
    //            $scope.FTAN = false;
    //            $scope.ReasonText();
    //            break;
    //        case "FTANotOk":
    //            $scope.FTA = false;
    //            $scope.FTAN = $scope.FTAN == true ? false : true;
    //            $scope.ReasonText();
    //            break;
    //        case "SAOk":
    //            $scope.SA = $scope.SA == true ? false : true;
    //            $scope.SAN = false;
    //            $scope.ReasonText();
    //            break;
    //        case "SANotOk":
    //            $scope.SA = false;
    //            $scope.SAN = $scope.SAN == true ? false : true;
    //            $scope.ReasonText();
    //            break;
    //        case "CAOk":
    //            $scope.CA = $scope.CA == true ? false : true;
    //            $scope.CAN = false;
    //            $scope.ReasonText();
    //            break;
    //        case "CANotOk":
    //            $scope.CA = false;
    //            $scope.CAN = $scope.CAN == true ? false : true;
    //            $scope.ReasonText();
    //            break;
    //    }
    //};



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

    function SaveUpdate() {
        if ($scope.FTA != true
            || $scope.SAOk != true
            || $scope.CAOk != true)
            $rootScope.alert("Please Select At Least One");
        else {
            let SendObj = {
                UserId: $rootScope.UserId,
                BpmId: $scope.Batch.BpmId,
                FTApproved: $scope.FTApproved === true ? 1 : 0,
                ShadeApproved: $scope.ShadeApproved === true ? 1 : 0,
                ComApproved: $scope.ComApproved === true ? 1 : 0,
            }




            ApprovalManagement.SaveUpdateFTSApprovalData(SendObj, function (res) {

                if (res.ErrorMsg == null) {
                    $scope.GetBatchNo();
                    $rootScope.alert("Data saved Successfully")
                    if (res.Data.Tag != null) {

                    }
                }
                else $rootScope.alert(res.ErrorMsg);
            });
        }

    }

    $scope.Refresh = function () {
        Refresh();

    }
    function Refresh() {
        ApprovalManagement.GetDyeingUnit($rootScope.UserId);
        $scope.Unit = "";
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.allRollData = [];
        $scope.RollEnd = undefined;
        //tableInitialState();
        //hiddenDiv.style.display = 'none';
    };



}]);