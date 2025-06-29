app.controller("MachineWiseManPowerConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$filter', 'filterFilter', 'MachineWiseManPowerConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $filter, filterFilter, MachineWiseManPowerConfig) {
    $scope.UserId = window.localStorage.getItem('UserId');
    var objUnitName = [];
    var objMcName = [];
    var objMcNo = [];
    var objMcType = [];
    var objEmp = [];
    var objShift = [];
    var self = this;
    $scope.dChild = [];
    var simulateQuery = false;
    $scope.details = [];
    //$scope.MachineWiseManPower = [];
    MachineWiseManPowerConfig.GetUnitName(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["UnitNo"], display: val["UnitEName"] };
            objUnitName.push(vd);
        });
    });
    self.UnitNameList = objUnitName;
    $scope.selectedUNameChange = selectedUNameChange;
    function selectedUNameChange(item) {
        if (item) {
            $scope.UnitId = item.value;
            MachineWiseManPowerConfig.GetEmp($scope.UnitId, function (data) {
                angular.forEach(data, function (val, key) {
                    var vd = { value: val["EMP_CODE"], display: val["EMP_CODE"], Name: val["EMP_ENAME"], ShiftName: val["ShiftName"], ShiftNo: val["ShiftNo"]};
                    objEmp.push(vd);
                });
            });
            self.EmpList = objEmp;
        }
    }

    MachineWiseManPowerConfig.GetMachineNo("No", function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MDId"], display: val["MachineNo"] };
            objMcNo.push(vd);
        });
    });
    self.MachineNoList = objMcNo;

    MachineWiseManPowerConfig.GetMachineName("Type", function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["MId"], display: val["MachineEng"] };
            objMcType.push(vd);
        });
    });
    self.MachineTypeList = objMcType;

    MachineWiseManPowerConfig.GetShift(function (data) {
        angular.forEach(data, function (val, key) {
            var vd = { value: val["ShiftNo"], display: val["ShiftName"] };
            objShift.push(vd);
        });
    });
    self.ShiftList = objShift;

    $scope.selectedEmpItemChange = selectedEmpItemChange;
    function selectedEmpItemChange(index, item) {
        if (item) {
            $scope.details[index].EmpName = item.Name;
        }
    }

    $scope.selectedMcNameChange = selectedMcNameChange;
    function selectedMcNameChange(index, item) {
        if (item) {
            self.McNo = item.display;
        }
    }

    $scope.querySearch = querySearch;
    function querySearch(query, cn) {
        if (cn == 'Unit') {
            obj = objUnitName;
            self.list = self.UnitNameList;
        }
        if (cn == 'McType') {
            obj = objMcType;
            self.list = self.MachineTypeList;
        }
        if (cn == 'McNo') {
            obj = objMcNo;
            self.list = self.MachineNoList;
        }
        if (cn == 'EmpId') {
            obj = objEmp;
            self.list = self.EmpList;
        }
        if (cn == 'FromShift' || cn == 'ToShift') {
            obj = objShift;
            self.list = self.ShiftList;
        }
        var results = query ? self.list.filter(createFilter(query, obj)) : self.list,
            deferred;
        if (simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    $scope.querySearchD = querySearchD;
    function querySearchD(query, cn) {
        if (cn == 'EmpId') {
            obj = objEmp;
            self.list = self.EmpList;
        }
        if (cn == 'shift') {
            obj = objShift;
            self.list = self.ShiftList;
        }
        if (cn == 'mcNo') {
            obj = objMcNo;
            self.list = self.MachineNoList;
        }
        var results = query ? self.list.filter(createFilter(query, obj)) : self.list,
            deferred;
        if (simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    $scope.Refresh = function () {
        Refresh();
    }
    function Refresh() {
        $scope.Model = null;
        $scope.btnSave = "Save";
    };

    $scope.Details = function (index, ev) {
        debugger;
        //
        $scope.Sl = index;
        if (validDetails()) {
            $mdDialog.show({
                async: false,
                controller: DialogController,
                templateUrl: '/App/template/Popup/MwMconfigAlert.html',
                targetEvent: ev,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
        }
    };
    function validDetails() {
        if ($scope.details[$scope.Sl - 1].selectedMcType == null) {
            $scope.msg = "Select m/c type.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.details[$scope.Sl - 1].selectedMcName == null) {
            $scope.msg = "Select m/c name.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.details[$scope.Sl - 1].selectedEmp == null) {
            $scope.msg = "Select Emp.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.details[$scope.Sl - 1].selectedFromShift == null) {
            $scope.msg = "Select From Shift.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.details[$scope.Sl - 1].selectedToShift == null) {
            $scope.msg = "Select To Shift.";
            $rootScope.alert($scope.msg);
            return false;
        }
        return true;
    }
    function DialogController($scope, $mdDialog) {
        //if (validDetails()) {
        var fDate = moment($scope.master.FromDate).format('DD-MMM-YYYY');
        var tDate = moment($scope.master.ToDate).format('DD-MMM-YYYY');
        var loop = moment(fDate).format('DD-MMM-YYYY');
        $scope.dChildV = [];
        // var i = 0;
        //$scope.dChildTemp = [];

        if ($scope.btnSave == "Save") {
            if ($scope.dChild.length > 0) {
                $scope.dChildV = filterFilter($scope.dChild, { Sl: $scope.Sl }, true);
                if ($scope.dChildV.length == 0) {
                    //while (loop <= tDate) {
                    while (new Date(loop) <= new Date(tDate)) {
                        var selectedDShift = { value: $scope.details[$scope.Sl - 1].selectedEmp.ShiftNo, display: $scope.details[$scope.Sl - 1].selectedEmp.ShiftName };
                        var vd = { Sl: $scope.Sl, MwMPdId: 0, MwMPcId: 0, DDate: moment(loop).format('DD-MMM-YYYY'), selectedDEmp: $scope.details[$scope.Sl - 1].selectedEmp, selectedDShift: selectedDShift, selectedDMcNo: $scope.details[$scope.Sl - 1].selectedMcName };
                        $scope.dChildV.push(vd);
                        loop = moment(loop).add(1, 'days');
                        loop = moment(loop).format('DD-MMM-YYYY');
                        //i++;
                    }
                }
            } else {
                while (new Date(loop) <= new Date(tDate)) {
                    //var vd = { value: val["EMP_CODE"], display: val["EMP_CODE"], Name: val["EMP_ENAME"], ShiftName: val["ShiftName"], ShiftNo: val["ShiftNo"] };
                    var selectedDShift = { value: $scope.details[$scope.Sl - 1].selectedEmp.ShiftNo, display: $scope.details[$scope.Sl - 1].selectedEmp.ShiftName };
                    var vd = { Sl: $scope.Sl, MwMPdId: 0, MwMPcId: 0, DDate: moment(loop).format('DD-MMM-YYYY'), selectedDEmp: $scope.details[$scope.Sl - 1].selectedEmp, selectedDShift: selectedDShift, selectedDMcNo: $scope.details[$scope.Sl - 1].selectedMcName };
                    $scope.dChildV.push(vd);
                    loop = moment(loop).add(1, 'days');
                    loop = moment(loop).format('DD-MMM-YYYY');
                    //i++;
                }
            }
        } else {
            if ($scope.dChild.length > 0) {
                $scope.dChildV = filterFilter($scope.dChild, { Sl: $scope.Sl }, true);
                if ($scope.dChildV.length == 0) {
                    while (new Date(loop) <= new Date(tDate)) {
                        var selectedDShift = { value: $scope.details[$scope.Sl - 1].selectedEmp.ShiftNo, display: $scope.details[$scope.Sl - 1].selectedEmp.ShiftName };
                        var vd = { Sl: $scope.Sl, MwMPdId: 0, MwMPcId: 0, DDate: moment(loop).format('DD-MMM-YYYY'), selectedDEmp: $scope.details[$scope.Sl - 1].selectedEmp, selectedDShift: selectedDShift, selectedDMcNo: $scope.details[$scope.Sl - 1].selectedMcName };
                        $scope.dChildV.push(vd);
                        loop = moment(loop).add(1, 'days');
                        loop = moment(loop).format('DD-MMM-YYYY');
                    }
                } else {
                    MachineWiseManPowerConfig.GetChildData($scope.MwMPdId, function (data) {
                        //$scope.dChild = data;
                        $scope.dChildV = data;
                        for (var i = 0; i < $scope.dChildV.length; i++) {
                            var selectedDShift = { value: $scope.dChildV[i].ShiftNo, display: $scope.dChildV[i].ShiftName };
                            $scope.dChildV[i].DDate = moment($scope.dChildV[i].DDate).format('DD-MMM-YYYY');
                            $scope.dChildV[i].selectedDEmp = $scope.details[$scope.Sl - 1].selectedEmp;
                            $scope.dChildV[i].selectedDShift = selectedDShift;
                            $scope.dChildV[i].selectedDMcNo = { value: $scope.dChildV[i].McId, display: $scope.dChildV[i].MachineEng };
                        }
                    });
                }
            } else {
                $scope.MwMPdId = $scope.details[$scope.Sl - 1].MwMPdId;
                if ($scope.MwMPdId == 0) {
                    while (new Date(loop) <= new Date(tDate)) {
                        var selectedDShift = { value: $scope.details[$scope.Sl - 1].selectedEmp.ShiftNo, display: $scope.details[$scope.Sl - 1].selectedEmp.ShiftName };
                        var vd = { Sl: $scope.Sl, MwMPdId: 0, MwMPcId: 0, DDate: moment(loop).format('DD-MMM-YYYY'), selectedDEmp: $scope.details[$scope.Sl - 1].selectedEmp, selectedDShift: selectedDShift, selectedDMcNo: $scope.details[$scope.Sl - 1].selectedMcName };
                        $scope.dChildV.push(vd);
                        loop = moment(loop).add(1, 'days');
                        loop = moment(loop).format('DD-MMM-YYYY');
                        //i++;
                    }
                }
                else {
                    MachineWiseManPowerConfig.GetChildData($scope.MwMPdId, function (data) {
                        //$scope.dChild = data;
                        $scope.dChildV = data;
                        for (var i = 0; i < $scope.dChildV.length; i++) {
                            var selectedDShift = { value: $scope.dChildV[i].ShiftNo, display: $scope.dChildV[i].ShiftName };
                            $scope.dChildV[i].DDate = moment($scope.dChildV[i].DDate).format('DD-MMM-YYYY');
                            $scope.dChildV[i].selectedDEmp = $scope.details[$scope.Sl - 1].selectedEmp;
                            $scope.dChildV[i].selectedDShift = selectedDShift;
                            $scope.dChildV[i].selectedDMcNo = { value: $scope.dChildV[i].McId, display: $scope.dChildV[i].MachineEng };
                        }
                    });
                }
            }
        }

        $scope.OK = function () {
            debugger;
            var len = $scope.dChild.length;
            if (len > 0) {
                for (var i = len - 1; i >= 0; i--) {
                    if ($scope.dChild[i].Sl === $scope.Sl)
                        $scope.dChild.splice($scope.dChild.indexOf(i), 1);
                }
            }

            for (var i = 0; i < $scope.dChildV.length; i++) {
                var vd = {
                    Sl: $scope.Sl,
                    MwMPdId: $scope.dChildV[i].MwMPdId,
                    MwMPcId: $scope.dChildV[i].MwMPcId,
                    DDate: $scope.dChildV[i].DDate,
                    selectedDEmp: $scope.dChildV[i].selectedDEmp,
                    selectedDShift: $scope.dChildV[i].selectedDShift,
                    EmpId: $scope.dChildV[i].selectedDEmp.value,
                    selectedDMcNo: $scope.dChildV[i].selectedDMcNo,
                    ShiftId: $scope.dChildV[i].selectedDShift.value,
                    McId: $scope.dChildV[i].selectedDMcNo.value
                };
                $scope.dChild.push(vd);
            }
            $mdDialog.cancel();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    //}
    }
    $scope.Add = function () {
        $scope.details = [];
        $scope.dChild = [];
        if (valid()) {
            MachineWiseManPowerConfig.SearchMachineWiseManPower($scope.master.selectedUName.value, moment($scope.master.FromDate).format("YYYY-MM-DD"), moment($scope.master.ToDate).format("YYYY-MM-DD"), function (data) {
                $scope.details = data; $scope.totalItems = data.length;
                if ($scope.details.length > 0) {}
                for (var i = 0; i < $scope.details.length; i++) {
                    $scope.master.MwMPId = $scope.details[0].MwMPId;
                    $scope.details[i].FromDate = moment($scope.details[i].FromDate).format('DD-MMM-YYYY');
                    $scope.details[i].ToDate = moment($scope.details[i].ToDate).format('DD-MMM-YYYY');
                    $scope.details[i].selectedMcType = { value: $scope.details[i].McTypeId, display: $scope.details[i].McType };
                    $scope.details[i].selectedMcName = { value: $scope.details[i].McId, display: $scope.details[i].MachineNo };
                    $scope.details[i].selectedEmp = { value: $scope.details[i].EMP_CODE, display: $scope.details[i].EMP_CODE, Name: $scope.details[i].EMP_ENAME, ShiftName: $scope.details[i].ShiftName, ShiftNo: $scope.details[i].ShiftNo };
                    $scope.details[i].selectedFromShift = { value: $scope.details[i].FromShift, display: $scope.details[i].FShiftName };
                    $scope.details[i].selectedToShift = { value: $scope.details[i].ToShift, display: $scope.details[i].TShiftName };
                }
                if ($scope.details.length > 0) {
                    $scope.btnSave = "Update";
                }
                else {
                    Add();
                }
            });

        }
       
    }
    function Add() {
        if (valid()) {
            $scope.details = [{
                sl: 0, MwMPdId: 0, McTypeId: "", MachineNo: "", EmpId: "",EmpName: "", FromDate: moment($scope.master.FromDate).format("YYYY-MM-DD"), ToDate: moment($scope.master.ToDate).format("YYYY-MM-DD"), FromShift: "", ToShift: "", ShiftName: ""
            }];
            $scope.btnSave = "Save";
        }
    };
    $scope.Search = function () {
        Search();
    }
    function Search() {
        $scope.details = [];
        $scope.dChild = [];
        if (valid()) {
            MachineWiseManPowerConfig.SearchMachineWiseManPower($scope.master.selectedUName.value, moment($scope.master.FromDate).format("YYYY-MM-DD"), moment($scope.master.ToDate).format("YYYY-MM-DD"), function (data) {
                $scope.details = data; $scope.totalItems = data.length;
               
                for (var i = 0; i < $scope.details.length; i++) {
                    $scope.master.MwMPId = $scope.details[0].MwMPId;
                    $scope.details[i].FromDate = moment($scope.details[i].FromDate).format('DD-MMM-YYYY');
                    $scope.details[i].ToDate = moment($scope.details[i].ToDate).format('DD-MMM-YYYY');
                    $scope.details[i].selectedMcType = { value: $scope.details[i].McTypeId, display: $scope.details[i].McType };
                    $scope.details[i].selectedMcName = { value: $scope.details[i].McId, display: $scope.details[i].MachineNo };
                    $scope.details[i].selectedEmp = { value: $scope.details[i].EMP_CODE, display: $scope.details[i].EMP_CODE, Name: $scope.details[i].EMP_ENAME, ShiftName: $scope.details[i].ShiftName, ShiftNo: $scope.details[i].ShiftNo};
                    $scope.details[i].selectedFromShift = { value: $scope.details[i].FromShift, display: $scope.details[i].FShiftName };
                    $scope.details[i].selectedToShift = { value: $scope.details[i].ToShift, display: $scope.details[i].TShiftName };
                }
                if ($scope.details.length > 0) {
                    $scope.btnSave = "Update";
                }
                else {
                    $rootScope.alert("No data found");
                }
            });
            
        }
    }
    function valid() {
        if ($scope.master.selectedUName == null) {
            $scope.msg = "Select Unit.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.master.FromDate == undefined) {
            $scope.msg = "Give From Date.";
            $rootScope.alert($scope.msg);
            return false;
        }
        if ($scope.master.ToDate == undefined) {
            $scope.msg = "Give To Date.";
            $rootScope.alert($scope.msg);
            return false;
        }
        return true;
    }
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Machine Name Configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Name Configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Machine Name Configuration Data?' };
        }
        return obj;
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
                    debugger;
                    if (mode == 'Update' || mode == 'Save') {
                        if (valid()) {
                            if ($scope.details.length>0) {

                                if ($scope.dChild.length > 0) {
                                    SaveUpdate();
                                }
                                else {
                                    $rootScope.alert("Missing detail Info");
                                }
                            }
                            else {
                                $rootScope.alert("Missing m/c Info");
                            }
                        } 
                    } else if (mode == 'Delete') {
                        Delete(dataModel);
                    }
                });
        }
       
    }
    function SaveUpdate() {
        debugger;
        $scope.master.UserId = $scope.UserId;
        $scope.master.FromDate = moment($scope.master.FromDate).format('DD-MMM-YYYY');
        $scope.master.ToDate = moment($scope.master.ToDate).format('DD-MMM-YYYY');
        //$scope.master.MwMPId = 0;
        $scope.master.UnitId = $scope.master.selectedUName.value;  
        for (var i = 0; i < $scope.details.length; i++) {
            $scope.details[i].FromDate = moment($scope.details[i].FromDate).format('DD-MMM-YYYY');
            $scope.details[i].ToDate = moment($scope.details[i].ToDate).format('DD-MMM-YYYY');
            $scope.details[i].EmpId = $scope.details[i].selectedEmp.value;
            $scope.details[i].McTypeId = $scope.details[i].selectedMcType.value;
            $scope.details[i].McId = $scope.details[i].selectedMcName.value;
            $scope.details[i].FromShift = $scope.details[i].selectedFromShift.value;
            $scope.details[i].ToShift = $scope.details[i].selectedToShift.value;
        }
        $scope.master.lDetails = $scope.details;
        $scope.master.lChild = $scope.dChild;
       
        MachineWiseManPowerConfig.SaveUpdate($scope.master, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert(data.Msg);
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });
    }
    function createFilter(query, List) {
        var lowercaseQuery = query;
        return function filterFn(List) {
            return (List.display.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
    }
    function addRow() {
        var vd = {
            MwMPdId: 0, McTypeId: "", McId: "", EmpId: "", EmpName: "", FromDate: moment($scope.master.FromDate).format("YYYY-MM-DD"), ToDate: moment($scope.master.ToDate).format("YYYY-MM-DD"), FromShift: "", ToShift: ""
        };
        $scope.details.push(vd);
    }
    function deleteRow(index) {
        if ($scope.details.length >= 2) $scope.details.splice(index, 1);
    }
}]);