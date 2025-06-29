app.controller("ShadeApproval", ['$scope', '$window', '$rootScope', '$mdDialog', 'ApprovalManagement', function ($scope, $window, $rootScope, $mdDialog, ApprovalManagement) {

    ///get all Unit Data
    ApprovalManagement.GetDyeingUnit($rootScope.UserId, function (data) {
        $scope.AllUnitData = data;

        if ($scope.AllUnitData.length == 1) {
            $scope.Unit = $scope.AllUnitData[0];
            $scope.GetDyeingUnit();
        }
    });
     

    ///get all batch data function calling from Unit
    $scope.GetDyeingUnit = function () {
        
        $scope.allBatch = ApprovalManagement.GetBatchNoByUnit($scope.Unit.UnitId, function (data) {
            $scope.allBatch = data;
        });
    }


    $scope.GetBodyPart = function () {
        $scope.BodyPartlist = ApprovalManagement.GetBodypart($scope.Batch.BpmId, function (data) {
            $scope.BodyPartlist = data;
        });
    }

    function removeNullProperties(obj) {
        debugger
        for (var prop in obj) {
            if (obj[prop] == null) {
                delete obj[prop];
            }
        }
    }

    function defaultState() {
        debugger
        $scope.allRollData.IHApproved = (angular.isDefined($scope.allRollData.IHApproved)) ? $scope.allRollData.IHApproved : null;
        $scope.allRollData.GarmentsApproved = (angular.isDefined($scope.allRollData.GarmentsApproved)) ? $scope.allRollData.GarmentsApproved : null;
        $scope.allRollData.MerchantApproved = (angular.isDefined($scope.allRollData.MerchantApproved)) ? $scope.allRollData.MerchantApproved : null;
        $scope.allRollData.BuyerApproved = (angular.isDefined($scope.allRollData.BuyerApproved)) ? $scope.allRollData.BuyerApproved : null;
        $scope.allRollData.ComApproved = (angular.isDefined($scope.allRollData.ComApproved)) ? $scope.allRollData.ComApproved : null;
        $scope.InHouseOk = null;
        $scope.InHouseNotOk = null;
        $scope.GAOk = null;
        $scope.GANotOk = null;
        $scope.MAOk = null;
        $scope.MANotOk = null;
        $scope.BAOk = null;
        $scope.BANotOk = null;
        $scope.IHAText = "";
        $scope.GAText = "";
        $scope.MAText = "";
        $scope.BAText = "";
    }

    function changeState() {
        debugger
        defaultState();
        switch ($scope.allRollData.IHApproved) {
            case (undefined || null):
                $scope.InHouseOk === undefined;
                $scope.InHouseNotOk === undefined;
                break;
            case 1:
                $scope.InHouseOk = true;
                $scope.InHouseNotOk = false;
                break;
            case 0:
                $scope.InHouseOk = false;
                $scope.InHouseNotOk = true;
                $scope.IHAText = $scope.allRollData.ReasonNOk
                break;
        }
        debugger
        switch ($scope.allRollData.GarmentsApproved) {
            case undefined:
                $scope.GAOk === undefined;
                $scope.GANotOk === undefined;
                break;
            case 1:
                $scope.GAOk = true;
                $scope.GANotOk = false;
                break;
            case 0:
                $scope.GAOk = false;
                $scope.GANotOk = true;
                $scope.GAText = $scope.allRollData.ReasonNOk;
                break;
        }
        debugger
        switch ($scope.allRollData.MerchantApproved) {
            case undefined:
                $scope.MAOk === undefined;
                $scope.MANotOk === undefined;
                break;
            case 1:
                $scope.MAOk = true;
                $scope.MANotOk = false;
                break;
            case 0:
                $scope.MAOk = false;
                $scope.MANotOk = true;
                $scope.MAText = $scope.allRollData.ReasonNOk;
                break;
        }
        debugger
        switch ($scope.allRollData.BuyerApproved) {
            case undefined:
                $scope.BAOk === undefined;
                $scope.BANotOk === undefined;
                break;
            case 1:
                $scope.BAOk = true;
                $scope.BANotOk = false;
                break;
            case 0:
                $scope.BAOk = false;
                $scope.BANotOk = true;
                $scope.BAText = $scope.allRollData.ReasonNOk;
                break;
        }
        debugger
        switch ($scope.allRollData.ComApproved) {
            case undefined:
                $scope.CA === undefined;
                break;
            case 1:
                $scope.CA = true;
                $scope.CAText = $scope.allRollData.ReasonCA;
                break;
            case 0:
                $scope.CA = false;

                break;
        }
    }

    defaultUser();
    function defaultUser() {
        $scope.Emp = {
            Id: $rootScope.UserId,
            Name: $rootScope.EmpName,
            Designation: $rootScope.Designation
        };
    }

    let atDefaultOption = [{ 'id': 1, 'name': '1st Time' }]
    $scope.ApproveTime = atDefaultOption;
    $scope.CurrApproveTime = 1;

    ///Get all Roll Data Function Calling from Batch
    $scope.getDataByBatchId = function () {
        if ($scope.Batch.BpmId > 0) {

            let appTime = $scope.Batch.ApproveTime;
            let pAppTime = 0;
            if (appTime == "") appTime = 1;
            if (appTime < $scope.CurrApproveTime)
                pAppTime = appTime;

            if ($scope.BodyPart == undefined) {
                $rootScope.alert('Please! Select Body Part...');
                return;
            }
           
            $scope.BatchData = ApprovalManagement.GetShadeApprovalBatchData($scope.Batch.BpmId, pAppTime, $scope.BodyPart.Id, function (data) {
                atDefaultOption = [{ 'id': 1, 'name': '1st Time' }];
                $scope.BatchData = data.m_Item1[0];
                
                $scope.allRollData = data.m_Item2[0];
                let appTime = parseInt(data.m_Item1[0].ApproveTime);
                $scope.CurrApproveTime = appTime;
                $scope.ApproveTime = atDefaultOption;

                if (appTime > 1) {
                    for (i = 2; i <= appTime; i++) {
                        let model = {
                            id: i,
                            name: i == 2 ? '2nd Time' : (i == 3 ? '3rd Time' : i + 'th Time')
                        }
                        let isExist = $scope.ApproveTime.filter(x => x.id == i);
                        if (isExist.length == 0)
                            $scope.ApproveTime.push(model);
                    }
                }
                if (pAppTime > 0)
                    $scope.Batch.ApproveTime = pAppTime;
                else
                    $scope.Batch.ApproveTime = appTime;

                $scope.Emp = data.m_Item3[0];                
                
                //$scope.BatchData.ApprovedWeight = $scope.allRollData.filter(x => x.Ok === true).reduce((accumulator, x) => accumulator + x.RollWeight, 0).toFixed(1);
                
                if (angular.isDefined($scope.allRollData)) {
                    changeState();
                }
                else {
                    $scope.InHouseOk = false;
                    $scope.InHouseNotOk = false;
                    $scope.GAOk = false;
                    $scope.GANotOk = false;
                    $scope.MAOk = false;
                    $scope.MANotOk = false;
                    $scope.BAOk = false;
                    $scope.BANotOk = false;
                    $scope.CA = false;
                    $scope.IHAText = "";
                    $scope.GAText = "";
                    $scope.MAText = "";
                    $scope.BAText = "";
                    $scope.CAText = "";
                }
                let LastAppTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
                if (LastAppTime != $scope.Batch.ApproveTime) {
                    $scope.Emp = data.m_Item3[0];
                } else {
                    defaultUser();
                }
                
            });
        }
    }


    $scope.CheckState = function (data) {
        if (data == "InHouseOk") {
            $scope.InHouseOk = $scope.InHouseOk == false ? true : false;
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.IHAText = "";
            $scope.GAText = "";
            $scope.MAText = "";
            $scope.BAText = "";
        }
        else if (data == "InHouseNotOk") {

            $scope.InHouseNotOk = $scope.InHouseNotOk == false ? true : false;
            $scope.InHouseOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.IHAText = $scope.InHouseNotOk == true ? $scope.IHAText : "";
            $scope.GAText = "";
            $scope.MAText = "";
            $scope.BAText = "";
        }
        if (data == "GAOk") {
            
            $scope.InHouseOk = false;
            $scope.InHouseNotOk = false;
            $scope.GAOk = $scope.GAOk == false ? true : false;
            $scope.GANotOk = false;
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.IHAText = "";
            $scope.GAText = "";
            $scope.MAText = "";
            $scope.BAText = "";

        }
        if (data == "GANotOk") {
            
            $scope.InHouseOk = false;
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = $scope.GANotOk == false ? true : false;
            $scope.GAText = $scope.GANotOk == true ? $scope.GAText : "";
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.IHAText = "";
            $scope.MAText = "";
            $scope.BAText = "";

        }
        else if (data == "MAOk") {
            
            $scope.InHouseOk = false;
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.GAText = "";
            $scope.MAOk = $scope.MAOk == false ? true : false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.IHAText = "";
            $scope.MAText = "";
            $scope.BAText = "";
            
        }
        else if (data == "MANotOk") {
            
            $scope.InHouseOk = false;
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.MAOk = false;
            $scope.MANotOk = $scope.MANotOk == false ? true : false;
            $scope.BAOk = false;
            $scope.BANotOk = false;
            $scope.MAText = $scope.MANotOk == true ? $scope.MAText : "";
            $scope.IHAText = "";
            $scope.GAText = "";
            $scope.BAText = "";
        }
        else if (data == "BAOk") {
            
            $scope.InHouseOk = false
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.GAText = "";
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = $scope.BAOk == false ? true : false;
            $scope.BANotOk = false;
            $scope.IHAText = "";
            $scope.MAText = "";
            $scope.BAText = "";

        }
        else if (data == "BANotOk") {
            
            $scope.InHouseOk = false
            $scope.InHouseNotOk = false;
            $scope.GAOk = false;
            $scope.GANotOk = false;
            $scope.GAText = "";
            $scope.MAOk = false;
            $scope.MANotOk = false;
            $scope.BAOk = false;
            $scope.BANotOk = $scope.BANotOk == false ? true : false;
            $scope.MAText = $scope.BANotOk == true ? $scope.BAText : "";
            $scope.IHAText = "";
            $scope.MAText = "";
        }
        else if (data == "CA") {
            
            $scope.CAText = $scope.CA == true ? $scope.CAText : "";
            $scope.CA = $scope.CA == false ? true : false;

        }
    };

    $scope.actionDialog = function (action, dataModel) {
        debugger
        let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
        if (appTime != $scope.Batch.ApproveTime) return;
        if ($scope.InHouseOk != true
            && $scope.InHouseNotOk != true
            && $scope.BANotOk != true
            && $scope.BAOk != true
            && $scope.MAOk != true
            && $scope.MANotOk != true
            && $scope.GAOk != true
            && $scope.GANotOk != true
            && $scope.CA != true) {
            $rootScope.alert("Please! Select at least One....");
            return;
        };
        if ($scope.InHouseNotOk == true && $scope.IHAText == '') return;
        if ($scope.BANotOk == true && $scope.BAText == '') return;
        if ($scope.MANotOk == true && $scope.MAText == '') return;
        if ($scope.GANotOk == true && $scope.GAText == '') return;
        if ($scope.CA == true && $scope.CAText == '') return;


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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update data?' };
        }
        return obj;
    }

    function SaveUpdate() {

        //if ($scope.InHouseOk != true
        //    && $scope.InHouseNotOk != true
        //    && $scope.BANotOk != true
        //    && $scope.BAOk != true
        //    && $scope.MAOk != true
        //    && $scope.MANotOk != true
        //    && $scope.CA != true)
        //    $rootScope.alert("Please Select At Least One ");

        //else {
        //    console.log("a", $scope.BodyPart);


            debugger
            let SendObj = {
                BpmId: $scope.Batch.BpmId,
                
                UserId: $rootScope.UserId,
                ApprovedTime: $scope.Batch.ApproveTime,
                IHApproved: ($scope.InHouseOk && angular.isDefined($scope.InHouseOk)) ? true :
                    ($scope.InHouseNotOk && angular.isDefined($scope.InHouseNotOk)) ? false : null,

                GarmentsApproved: ($scope.GAOk && angular.isDefined($scope.GAOk)) ? true :
                    ($scope.GANotOk && angular.isDefined($scope.GANotOk)) ? false : null,

                MerchantApproved: ($scope.MAOk && angular.isDefined($scope.MAOk)) ? true :
                   ($scope.MANotOk && angular.isDefined($scope.MANotOk)) ? false : null,

                BuyerApproved: ($scope.BAOk && angular.isDefined($scope.BAOk)) ? true :
                    ($scope.BANotOk && angular.isDefined($scope.BANotOk)) ? false : null,

                ComApproved: ($scope.CA && angular.isDefined($scope.InHouseOk)) ? true :
                    ($scope.CA == false && angular.isDefined($scope.InHouseNotOk)) ? false : null,

                ReasonNOk: $scope.IHAText || $scope.GAText || $scope.MAText || $scope.BAText || null,
                ReasonCA: $scope.CAText,
                BSpecId: $scope.BodyPart.Id
            }
            debugger

            removeNullProperties(SendObj);
            console.log(SendObj);
            ApprovalManagement.SaveUpdateShadeApprovalData(SendObj, function (res) {
                debugger
                if (res.ErrorMsg == null) {
                    debugger
                    $rootScope.alert("Saved Successfully");
                    debugger
                    Refresh();
                    if (res.Data.Tag != null) {

                    }
                }
                else $rootScope.alert(res.ErrorMsg);
            });
        //}
    }

    $scope.Refresh = function () {
        Refresh();

    }
    function Refresh() {
        ApprovalManagement.GetDyeingUnit($rootScope.UserId);
        if ($scope.AllUnitData.length == 1) {
            $scope.Unit = $scope.AllUnitData[0];
            $scope.GetDyeingUnit();
        }
        $scope.Batch = "";
        $scope.allBatch = [];
        $scope.BatchData = [];
        $scope.allRollData = [];
        $scope.InHouseOk = false;
        $scope.InHouseNotOk = false;
        $scope.GAOk = false;
        $scope.GANotOk = false;
        $scope.MAOk = false;
        $scope.MANotOk = false;
        $scope.BAOk = false;
        $scope.BANotOk = false;
        $scope.CA = false;
        $scope.IHAText = "";
        $scope.GAText = "";
        $scope.BAText = "";
        $scope.MAText = "";
        $scope.CAText = "";
        $scope.BodyPart = "";
        $scope.BodyPartlist = "";
        $scope.ApprovedTime = [{ 'id': 1, 'name': '1st Time' }]
        //tableInitialState();
        //hiddenDiv.style.display = 'none';
    };
}]);