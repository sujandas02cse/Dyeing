app.controller("FinishFabricInspectionNewConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$state', 'FinishFabricInspectionNewConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $state, FinishFabricInspectionNewConfig) {
    $rootScope.menu = false;
    $scope.pageId = 2;
    $scope.truefalseBatch = true;
    $rootScope.menu = false;
    $scope.truefalseWidth = true;
    $scope.truefalseLength = true;
    $scope.Batch2 = true;
    $scope.btmDisplay = false;
    $scope.truefalseBar = false;
    $scope.ChangeControl = function () {
        $scope.details = null;
        $scope.master.Width = "";
        $scope.master.Length = 0;
        $scope.master.OrderNo = "";
        $scope.master.BuyerName = "";
        $scope.master.Barcode = "";
        $scope.master.Batch = "";
        $scope.master.Machine = "";
        $scope.btmDisplay = false;
        if ($scope.master.IsWithoutBarcode) {
            $scope.truefalseBar = true;
            $scope.truefalseBatch = false;
            $scope.truefalseWidth = false;
            $scope.truefalseLength = false;
            $scope.Batch2 = false;
            $scope.Batch1 = true;
            $scope.truefalseBarcode = true;
            $scope.master.IsWithoutBarcode = true;
        } else {
            $scope.truefalseBar = false;
            $scope.truefalseBatch = true;
            $scope.truefalseWidth = true;
            $scope.truefalseLength = true;
            $scope.Batch1 = false;
            $scope.Batch2 = true;
            $scope.truefalseBarcode = false;
            $scope.master.IsWithoutBarcode = false;
        }
    }
    $scope.cngBarClick = function () {
        //LoadByBarCode();
    };
    $scope.enterBarClick = function () {
        LoadByBarCode();
    };
    function LoadByBarCode() {
        var type = "barcode";
        if ($scope.master.Barcode != undefined || $scope.master.Barcode != "") {
            FinishFabricInspectionNewConfig.GetInspectionInfo(type, $scope.master.Barcode, function (data) {
                var totalPoint = 0;
                var barcode = $scope.master.Barcode;
                $scope.master = null;
                $scope.details = null;
                $scope.grade = null;
                $scope.btmDisplay = false;
                $scope.bodyDisplay = false;
                if (data.master.length == 0) {
                    $scope.msg = "" + barcode + " No Barcode has not been generated yet";
                    $rootScope.alert($scope.msg);

                }
                else {
                    $scope.TotalPoint = 0;
                    $scope.Ptsperhundred = 0;
                    $scope.master = data.master[0];
                    //$scope.MachineInfo.UimId = $scope.master.QcMcNo;
                    $scope.Machine = { UimId: $scope.master.QcMcNo, InspMNo: $scope.master.InspMNo };
                    if (!isNaN($scope.master.FinishedDia) && angular.isNumber(+$scope.master.FinishedDia)) {
                        $scope.master.Width = $scope.master.FinishedDia;
                        $scope.master.Length = (($scope.master.Weight * 42913) / ($scope.master.GSM * $scope.master.FinishedDia)).toFixed(2);
                    } else {
                        $scope.master.Width = $scope.master.RollWidth;
                        $scope.master.Length = $scope.master.RollLength;
                    }
                    if (data.fault.length == 0) {
                        $scope.msg = "No Fault Found";
                        $rootScope.alert($scope.msg);
                    } else {
                        $scope.details = data.fault;
                    }
                    $scope.grade = data.grade;
                    angular.forEach(data.fault, function (val) {
                        totalPoint = totalPoint + parseInt(val["TotalPoint"]);
                    });
                    $scope.TotalPoint = totalPoint;
                    $scope.Ptsperhundred = ((totalPoint * 36 * 100) / (parseFloat($scope.master.Width) * parseFloat($scope.master.Length))).toFixed(2);
                    //debugger;
                    //var v;
                    if ($scope.grade.length != 0) {
                        var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                            if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                                console.log(ginfo)
                                return ginfo;
                            }
                        });
                        if (grade_Filter.length > 0) {
                            $scope.master.Decision = grade_Filter[0].GradeName;
                            $scope.master.GradeNo = grade_Filter[0].GradeNo;
                            if (grade_Filter[0].GradeName == 'Fail') {
                                //$scope.styleAcceptance = "background-color": value;
                                //$scope.styleAcceptance = ['#C1D786', '#BF3978', '#15A0C6', '#9A2BC3'];
                                var value = "C1D786";
                                $scope.styleAcceptance = function (value) {
                                    return { "color": value };
                                }
                            }
                            else {

                            }
                        }
                        else {
                            $scope.master.Decision = "Not Found";
                            $scope.master.GradeNo = '-1';
                        }
                    }
                    $scope.master.CommercialApproved = Boolean($scope.master.CommercialApproved);
                    $scope.btmDisplay = true;
                    $scope.bodyDisplay = true;
                }
            });
        }
    }
    $scope.cngBatchClick = function () {
        //LoadByBatch();
    };
    $scope.enterBatchClick = function () {
        LoadByBatch();
    };
    function LoadByBatch() {
        var type = "batch";
        if ($scope.master.BatchNo != undefined || $scope.master.BatchNo != "" || $scope.master.BatchNo != 'undefined') {
            FinishFabricInspectionNewConfig.GetInspectionInfo(type, $scope.master.BatchNo, function (data) {
                debugger;
                var totalPoint = 0;
                var barcode = $scope.master.Barcode;
                $scope.master = null;
                $scope.details = null;
                $scope.grade = null;
                $scope.btmDisplay = false;
                $scope.bodyDisplay = false;
                if (data.master.length == 0) {
                    $scope.msg = "" + barcode + " No Barcode has not been generated yet";
                    $rootScope.alert($scope.msg);

                }
                else {
                    $scope.TotalPoint = 0;
                    $scope.Ptsperhundred = 0;
                    $scope.master = data.master[0];
                    $scope.master.IsWithoutBarcode = true;
                    //$scope.MachineInfo.UimId = $scope.master.QcMcNo;
                    $scope.Machine = { UimId: $scope.master.QcMcNo, InspMNo: $scope.master.InspMNo };
                    //if (!isNaN($scope.master.FinishedDia) && angular.isNumber(+$scope.master.FinishedDia)) {
                    //    $scope.master.Width = $scope.master.FinishedDia;
                    //    $scope.master.Length = (($scope.master.Weight * 42913) / ($scope.master.GSM * $scope.master.FinishedDia)).toFixed(2);
                    //} else {
                    //    $scope.master.Width = $scope.master.RollWidth;
                    //    $scope.master.Length = $scope.master.RollLength;
                    //}
                    if ($scope.master.DyedInspectionEntryID != -1) {
                        $scope.master.Width = $scope.master.RollWidth;
                        $scope.master.Length = $scope.master.RollLength;
                    }
                    if (data.fault.length == 0) {
                        $scope.msg = "No Fault Found";
                        $rootScope.alert($scope.msg);
                    } else {
                        $scope.details = data.fault;
                    }
                    $scope.grade = data.grade;
                    angular.forEach(data.fault, function (val) {
                        totalPoint = totalPoint + parseInt(val["TotalPoint"]);
                    });
                    $scope.TotalPoint = totalPoint;
                    $scope.Ptsperhundred = ((totalPoint * 36 * 100) / (parseFloat($scope.master.Width) * parseFloat($scope.master.Length))).toFixed(2);
                    //debugger;
                    //var v;
                    if ($scope.grade.length != 0) {
                        var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                            if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                                console.log(ginfo)
                                return ginfo;
                            }
                        });
                        if (grade_Filter.length > 0) {
                            $scope.master.Decision = grade_Filter[0].GradeName;
                            $scope.master.GradeNo = grade_Filter[0].GradeNo;
                            if (grade_Filter[0].GradeName == 'Fail') {
                                //$scope.styleAcceptance = "background-color": value;
                                //$scope.styleAcceptance = ['#C1D786', '#BF3978', '#15A0C6', '#9A2BC3'];
                                var value = "C1D786";
                                $scope.styleAcceptance = function (value) {
                                    return { "color": value };
                                }
                            }
                            else {

                            }
                        }
                        else {
                            $scope.master.Decision = "Not Found";
                            $scope.master.GradeNo = '-1';
                        }
                    }
                    $scope.master.CommercialApproved = Boolean($scope.master.CommercialApproved);
                    $scope.btmDisplay = true;
                    $scope.bodyDisplay = true;
                }
            });
        }
    }
    FinishFabricInspectionNewConfig.GetMachineNo($rootScope.UserId, function (data) {
        $scope.MachineInfo = data;
    });
    $scope.pointClick = function (pVal, sl) {
        if ($scope.details[sl].PointData == null) {
            $scope.details[sl].PointData = pVal;
        }
        else if ($scope.details[sl].PointData == '') {
            $scope.details[sl].PointData = pVal;
        }
        else {
            $scope.details[sl].PointData = $scope.details[sl].PointData + "+" + pVal;
        }
        $scope.TotalPoint = parseInt($scope.TotalPoint) + parseInt(pVal);
        $scope.Ptsperhundred = (($scope.TotalPoint * 36 * 100) / (parseFloat($scope.master.Width) * parseFloat($scope.master.Length))).toFixed(2);
        if ($scope.grade.length != 0) {
            var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                    console.log(ginfo)
                    return ginfo;
                }
            });
            if (grade_Filter.length > 0) {
                $scope.master.Decision = grade_Filter[0].GradeName;
                $scope.master.GradeNo = grade_Filter[0].GradeNo;
                if (grade_Filter[0].GradeName == 'Fail') {
                    //$scope.styleAcceptance = "background-color": value;
                    //$scope.styleAcceptance = ['#C1D786', '#BF3978', '#15A0C6', '#9A2BC3'];
                    var value = "C1D786";
                    $scope.styleAcceptance = function (value) {
                        return { "color": value };
                    }
                }
                else {

                }
            }
            else {
                $scope.master.Decision = "Not Found";
                $scope.master.GradeNo = '-1';
            }
        }
    }
    $scope.backSpaceClick = function (sl) {
        if ($scope.details[sl].PointData == null) {
            $scope.details[sl].PointData = null;
        } else {
            var n = $scope.details[sl].PointData.lastIndexOf('+');
            var pVal = $scope.details[sl].PointData.substring(n + 1);;//$scope.details[sl].PointData + "+" + pVal;
            $scope.details[sl].PointData = $scope.details[sl].PointData.substring(0, n);
            $scope.TotalPoint = parseInt($scope.TotalPoint) - parseInt(pVal);
            $scope.Ptsperhundred = (($scope.TotalPoint * 36 * 100) / (parseFloat($scope.master.Width) * parseFloat($scope.master.Length))).toFixed(2);
        }
        if ($scope.grade.length != 0) {
            var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                    console.log(ginfo)
                    return ginfo;
                }
            });
            if (grade_Filter.length > 0) {
                $scope.master.Decision = grade_Filter[0].GradeName;
                $scope.master.GradeNo = grade_Filter[0].GradeNo;
                if (grade_Filter[0].GradeName == 'Fail') {
                    //$scope.styleAcceptance = "background-color": value;
                    //$scope.styleAcceptance = ['#C1D786', '#BF3978', '#15A0C6', '#9A2BC3'];
                    var value = "C1D786";
                    $scope.styleAcceptance = function (value) {
                        return { "color": value };
                    }
                }
                else {

                }
            }
            else {
                $scope.master.Decision = "Not Found";
                $scope.master.GradeNo = '-1';
            }
        }
    }
    $scope.ConfirmSave = function (ev) {
        if (valid()) {
            $mdDialog.show({
                async: false,
                controller: DialogController,
                templateUrl: '/App/template/Popup/FabricInspectionDialog.html',
                targetEvent: ev,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
        }
    }
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.RejectWeightCng = function () {
            $scope.master.ModifiedWeight = $scope.master.RollWeight - $scope.master.RejectWeight;
        };
        $scope.ModifiedWeightCng = function () {
            $scope.master.RejectWeight = $scope.master.RollWeight - $scope.master.ModifiedWeight;
        };

        $scope.Save = function () {
            $scope.master.UserId = $rootScope.UserId;
            $scope.master.QcMcNo = $scope.Machine.UimId;
            $scope.master.FBarcodeGenerationID = $scope.master.Barcode;
            $scope.master.RollWidth = $scope.master.Width;
            $scope.master.RollLength = $scope.master.Length;
            if ($scope.master.RejectWeight == undefined) {
                $scope.master.RejectWeight = 0;
                $scope.master.ModifiedWeight = $scope.master.RollWeight - $scope.master.RejectWeight;
            }
            if ($scope.master.CommercialApproved == false) {
                $scope.master.CommercialApproved = 0;
            } else {
                $scope.master.CommercialApproved = 1;
            }
            $scope.master.list = [{

            }];
            // FaultID: 0, DetailID: 0, PointID: 0, PointData: "", TotalPoint: 0

            for (var i = 0; i < $scope.details.length; i++) {
                if ($scope.details[i].PointData != null) {
                    var totalpointArray = $scope.details[i].PointData.split('+');
                    var totalpoint = 0;
                    $.each(totalpointArray, function () {
                        var val = this.trim();
                        if ($.isNumeric(val)) {
                            totalpoint += parseInt(val);
                        }
                        $scope.details[i].TotalPoint = totalpoint;
                    })
                }
                if ($.isNumeric($scope.details[i].DetailID) == false) {
                    $scope.details[i].DetaiID = -1;
                }
                if ($.isNumeric(totalpoint) == false) {
                    $scope.details[i].TotalPoint = 0;
                }
                if ($scope.master.FabBatchMId == 0) {
                    var vd = { FaultID: $scope.details[i].NameID, DyedInspectionDetailID: $scope.details[i].DyedInspectionDetailID, PointID: $scope.details[i].PointID, PointData: $scope.details[i].PointData, TotalPoint: $scope.details[i].TotalPoint, RollNo: $scope.master.RollNo };
                    $scope.master.list.push(vd);
                } else {
                    var rollNo = "R-" + (i + 1).toString();
                    var vd = { FaultID: $scope.details[i].NameID, DyedInspectionDetailID: $scope.details[i].DyedInspectionDetailID, PointID: $scope.details[i].PointID, PointData: $scope.details[i].PointData, TotalPoint: $scope.details[i].TotalPoint, RollNo: rollNo };
                    $scope.master.list.push(vd);
                }


            }
            $scope.master.list.splice(0, 1);
            FinishFabricInspectionNewConfig.SaveUpdate($scope.master, function (data) {
                if (data.ErrorMsg == null) {
                    $rootScope.alert(data.Msg);
                    Refresh();
                }
                else $rootScope.alert(data.ErrorMsg);

            });
            $mdDialog.cancel();
        };

    }
    function valid() {
        if ($scope.Machine == null) {
            $scope.msg = "Select Machine.";
            $rootScope.alert($scope.msg);
            return false;
        }
        return true;
    }
    $scope.Remarks = function (ev) {
        $mdDialog.show({
            async: false,
            controller: DialogRemarks,
            templateUrl: '/App/template/Popup/FabricInspectionRemarksDialog.html',
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
    }
    $scope.WidhtCng = function () {
        $scope.master.Length = (($scope.master.Weight * 42913) / ($scope.master.GSM * $scope.master.Width)).toFixed(2);
    }
    function DialogRemarks($scope, $mdDialog) {
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.Ok = function () {
            $mdDialog.cancel();
        }
    }
    $scope.NewInspection = function () {
        NewInspection();
    }
    function NewInspection() {
        var url = '/Home/Index#!/NewInspection';
        var win = window.open(url, '_blank');
        win.focus();
    }
    $scope.back = function () {
        window.name = '/Home/Index#!/FinishFabricInspectionConfig'
        window.name.blink();
        //return false;
    }
}]);
