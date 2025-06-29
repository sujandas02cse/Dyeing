
app.controller("DiaPartWiseSpecConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'DiaPartWiseSpecConfig', function ($scope, $rootScope, $mdDialog, $mdToast, DiaPartWiseSpecConfig) {

    tableInitialState()
    function tableInitialState() {
        $scope.data = [{
            FbscId: [], Priority: []
        }
        ];
        $scope.Details = angular.copy($scope.data);
        $scope.btnSave = "Save";
    }



    $scope.actionDialog = function (action, dataModel) {
        if (action == 'AddNewRow') {
            addRow();
        } else if (action == 'DeleteRow') {
            deleteRow(dataModel);
        } else {
            $mdDialog.show(
                $mdDialog.dialogBox({
                    locals: {
                        model: objData(action)
                    }
                })).then(function (mode) {
                    if (mode == 'Update' || mode == 'Save') {
                        SaveUpdate();
                    } else if (mode == 'Delete') {
                        Delete(dataModel);
                    }
                });
        }

    }


    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Dia part wise specification Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Dia part wise specification Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Dia part wise specification Configuration Data?' };
        }
        return obj;
    }
    function addRow() {
        var vd = {
            FbscId: [], Priority: []
        };
        $scope.Details.push(vd);
    }
    function deleteRow(index) {
        if ($scope.Details.length >= 1) $scope.Details.splice(index, 1);
    }



    DiaPartWiseSpecConfig.DiaPartForSpecification(function (data) { $scope.DiaPart = data; });

    $scope.GetProcessNamebyDiaPart = function () {       
        DiaPartWiseSpecConfig.GetProcessNamebyDiaPart($scope.Head.DiaPartName.DiaPartName, function (data) { $scope.ProcessName = data; });
    }

    DiaPartWiseSpecConfig.NameofSpecification(function (data) { $scope.SpecificationNames = data; });

    $scope.check = function () {
        for (var i = 0; i < $scope.Details.length; i++) {
            if ($scope.Details[i].Priority == 'None') {
                //$rootScope.alert("Please select priority.");
                $scope.Details[i].Priority = false;
                return;
            }
        }
    };


    //$scope.check = function () {
    //    alert('Changed value');
    //};


    $scope.GetSpecificByDiaProcess = function () {
       
        if ($scope.Head.DiaPartName.DiaPartName != null && $scope.Head.DpfcId.DpfcId != null) {
            DiaPartWiseSpecConfig.GetSpecificByDiaProcess($scope.Head.DiaPartName.DiaPartName, $scope.Head.DpfcId.DpfcId, function (data) {
                if (data.length > 0) {
                    $scope.Head.DpsmId = data[0]["DpsmId"];
                   
                 
                    $scope.Details = data;
                    for (var i = 0; i < data.length; i++) {
                        $scope.Details[i].FbscId = $scope.SpecificationNames.filter(elem => elem.FbscId == data[i].FbscId)[0];
                    }
                    
                    $scope.btnSave = "Update";
                

                }
                else {

                    tableInitialState();

                }


            });
        }

        else {

            tableInitialState();

        }


    }


    $scope.Details.Priority = '';
    $scope.PriorityList = ('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 ').split(' ').map(function (Priority) { return { abbrev: Priority }; });


    function SaveUpdate() {
        $scope.Head.UserId = $rootScope.UserId;
        $scope.Head.DiaPartName = $scope.Head.DiaPartName.DiaPartName;

        var d = $scope.Head.DpfcId;

        $scope.Head.DpfcId = $scope.Head.DpfcId.DpfcId;

        f = [];
       
        if ($scope.Details.length > 0) {
            for (var i = 0; i < $scope.Details.length; i++) {
                if ($scope.Details[i].Priority.length == 0) {
                    $rootScope.alert("Please select priority.");
                    $scope.Head.DpfcId = d;
                    //$scope.Details[i].FbscId = f[i];
                    return;
                }

                //f[i] = $scope.Details[i].FbscId;
                $scope.Details[i].FbscId = $scope.Details[i].FbscId.FbscId;

            }
        }

        //$scope.Details[i].FbscId = $scope.Details[i].FbscId1;
        //alert(angular.toJson($scope.Details[i].FbscId))
        $scope.Head.Details = $scope.Details;
        if ($scope.btnSave == "Save") $scope.Head.DpsmId = '';
   
        if ($scope.Head != null) {


            DiaPartWiseSpecConfig.DiaPartSpecificationConfig_SaveUpdate($scope.Head, function (data) {

                if (data.ErrorMsg != '') {

                    $rootScope.alert(data.Msg);
                    Refresh();
                }

                else {
                   $rootScope.alert(data.ErrorMsg);
                }


            });
        }


    }



    $scope.Refresh = function () {
        Refresh();
    }
  

    function Refresh() {
        tableInitialState();
        if ($scope.Head) {
            $scope.Head.DpsmId = null;
        }
        $scope.Head = null;
        $scope.search = null;
        $scope.none = 0;
        $scope.btnSave = "Save";
    }



}]);




