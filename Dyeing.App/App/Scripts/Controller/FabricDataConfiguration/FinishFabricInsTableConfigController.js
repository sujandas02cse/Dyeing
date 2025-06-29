app.controller("FinishFabricInsTableConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$state', 'FinishFabricInsTableConfig', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $state, FinishFabricInsTableConfig) {
    $scope.pageId = "2";
    $scope.truefalseBatch = true;
    $rootScope.menu = false;
    $scope.truefalseWidth = true;
    $scope.truefalseLength = true;
    $scope.Batch2 = true;
    $scope.btmDisplay = false;
    $scope.truefalseBar = false;

    $scope.ChangeControl = function () {
        debugger;
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
        debugger;
        var isBar = false;
        if ($scope.master.IsWithoutBarcode == undefined || $scope.master.IsWithoutBarcode == false)
            isBar = true;
      

        loadRoll($scope.master.Barcode)
        LoadFaultList($scope.master.Barcode,0, isBar)
    };
    $scope.enterBatchClick = function () {
        debugger;
        var isBar = false;
        if ($scope.master.IsWithoutBarcode == undefined || $scope.master.IsWithoutBarcode == true)
            isBar = false;
        var id = $scope.master.BatchNo;
        loadRoll($scope.master.BatchNo)
        LoadFaultList(String(id),0, isBar)
    };

    $scope.GetInfoByRollId = function (rollId) {
        debugger;
        if (rollId == undefined || rollId == null || rollId == '') {
            return;
        }
        var isBar = false;
        if ($scope.master.IsWithoutBarcode == undefined)
            isBar = false;
        var id = $scope.master.BatchNo;
     
        LoadFaultList(String(id), rollId, isBar)
    }
    $scope.Refresh = function () {
        $scope.master = [];
        $scope.rollList = [];
        $scope.Machine = [];
        $scope.details = [];
        $scope.Ptsperhundred=0
        $scope.TotalPoint=0
    }

    function LoadFaultList(bCodeOrBatchId, rollId,isWithoutBarcode) {
        debugger;
        FinishFabricInsTableConfig.LoadFaultList(encodeURIComponent(bCodeOrBatchId), rollId,isWithoutBarcode, function (data) {
            debugger;
            //console.log(data);
            if (data.master.length != 0) {
          
                $scope.master = data.master[0];
               
                $scope.Machine = { UimId: data.master[0].QcMcNo, InspMNo: data.master[0].InspMNo };

                $scope.master.RollId = parseInt( data.master[0].RollNo);                


                $scope.details = data.fault
                var totalPoint = 0;
                angular.forEach(data.fault, function (val) {
                    totalPoint = totalPoint + parseInt(val["TotalPoint"]);
                });
                $scope.TotalPoint = totalPoint;
                $scope.Ptsperhundred = ((totalPoint * 36 * 100) / (parseFloat($scope.master.RollWidth) * parseFloat($scope.master.RollLength))).toFixed(2);
                if (totalPoint = !0) {
                    $scope.btmDisplay = true;
                }
                $scope.bodyDisplay = true;

                var grad = data.grade;
                $scope.grade = data.grade;
                debugger;
                if (grad.length != 0) {
                    var grade_Filter = $.grep(grad, function (ginfo, i) {
                        if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                            console.log(ginfo)
                            return ginfo;
                        }
                    });
                    debugger;
                    var rrr = 0;
                    if (grade_Filter.length > 0) {
                        debugger;
                        $scope.master.Grade = grade_Filter[0].GradeName;
                        $scope.master.GradeNo = grade_Filter[0].GradeNo;
                        if (grade_Filter[0].GradeName == 'Fail') {
                            var value = "C1D786";
                            $scope.styleAcceptance = function (value) {
                                return { "color": value };
                            }
                        }
                        else {

                        }
                    }
                    else {
                        $scope.master.Grade = "Not Found";
                        $scope.master.GradeNo = '-1';
                    }
                }
                $scope.master.CommercialApproved = Boolean($scope.master.CommercialApproved);
                $scope.btmDisplay = true;
              



            }
            //else {
            //    $scope.msg = "" + bCodeOrBatchId + " No Barcode has not been generated yet";
            //    $rootScope.alert($scope.msg);
            //}

        });
    }

  

    LoadMachine();
    function LoadMachine() {
        FinishFabricInsTableConfig.GetMachineNo($rootScope.UserId, function (data) {
            debugger;
            $scope.MachineInfo = data;
        });
    }



    function LoadByBarCode() {
        debugger;
        var type = "barcode";
        if ($scope.master.Barcode != undefined || $scope.master.Barcode != "") {
            FinishFabricInsTableConfig.GetInspectionInfo(type, $scope.master.Barcode, function (data) {
                var totalPoint = 0;
                var barcode = $scope.master.Barcode;
                $scope.master = null;
                //$scope.details = null;
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
                    $scope.Ptsperhundred = ((totalPoint * 36 * 100) / (parseFloat($scope.master.RollWidth) * parseFloat($scope.master.RollLength))).toFixed(2);
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
                            $scope.master.Grade = grade_Filter[0].GradeName;
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
                            $scope.master.Grade = "Not Found";
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
    //$scope.cngBatchClick = function () {
    //    //LoadByBatch();
    //};
    //$scope.enterBatchClick = function () {
    //    LoadByBatch();
    //    loadRoll($scope.master.BatchNo)
    //};

    FinishFabricInsTableConfig.GetMachineNo($rootScope.UserId, function (data) {
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
        $scope.Ptsperhundred = (($scope.TotalPoint * 36 * 100) / (parseFloat($scope.master.RollWidth) * parseFloat($scope.master.RollLength))).toFixed(2);

        if ($scope.grade.length != 0) {
            var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                    console.log(ginfo)
                    return ginfo;
                }
            });
            if (grade_Filter.length > 0) {
                $scope.master.Grade = grade_Filter[0].GradeName;
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
                $scope.master.Grade = "Not Found";
                $scope.master.GradeNo = '-1';
            }
        }
    }


    $scope.backSpaceClick = function (sl) {
        debugger;
        if ($scope.details[sl].PointData == null || $scope.details[sl].PointData == '') {
            $scope.details[sl].PointData = null;
            return;
        } else {
            var n = $scope.details[sl].PointData.lastIndexOf('+');
            var pVal = $scope.details[sl].PointData.substring(n + 1);;//$scope.details[sl].PointData + "+" + pVal;
            $scope.details[sl].PointData = $scope.details[sl].PointData.substring(0, n);
            $scope.TotalPoint = parseInt($scope.TotalPoint) - parseInt(pVal);
            $scope.Ptsperhundred = (($scope.TotalPoint * 36 * 100) / (parseFloat($scope.master.RollWidth) * parseFloat($scope.master.RollLength))).toFixed(2);
        }
        if ($scope.grade.length != 0) {
            var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                    console.log(ginfo)
                    return ginfo;
                }
            });
            if (grade_Filter.length > 0) {
                $scope.master.Grade = grade_Filter[0].GradeName;
                $scope.master.GradeNo = grade_Filter[0].GradeNo;
                if (grade_Filter[0].GradeName == 'Fail') {
                    var value = "C1D786";
                    $scope.styleAcceptance = function (value) {
                        return { "color": value };
                    }
                }
                else {

                }
            }
            else {
                $scope.master.Grade = "Not Found";
                $scope.master.GradeNo = '-1';
            }
        }
        
    }

    $scope.ConfirmSave = function (ev) {
        if ($scope.master.RollId == '' || $scope.master.RollId == undefined) {
            $rootScope.alert('Please Select Roll..!');
            return;
        }
        debugger
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
        debugger
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
            debugger
          
            $scope.master.UserId = $rootScope.UserId;
            $scope.master.QcMcNo = $scope.Machine.UimId;
            $scope.master.FBarcodeGenerationID = $scope.master.Barcode;
            //$scope.master.RollWidth = $scope.master.Width;
            //$scope.master.RollLength = $scope.master.Length;
            if ($scope.master.RejectWeight == undefined) {
                $scope.master.RejectWeight = 0;
                $scope.master.ModifiedWeight = $scope.master.RollWeight - $scope.master.RejectWeight;
            }
            if ($scope.master.CommercialApproved == false) {
                $scope.master.CommercialApproved = 0;
            } else {
                $scope.master.CommercialApproved = 1;
            }
       
          var FaultList=[]
            for (var i = 0; i < $scope.details.length; i++) {
                debugger;
                var totalPoint = 0;
                var pointData = "";

                if ($scope.details[i].PointData == '' || $scope.details[i].PointData == null || $scope.details[i].PointData == undefined || $scope.details[i].PointData == NaN) {
                    pointData = "";
                }
                else {
                    var txtPoint = $scope.details[i].PointData.split("+")
                    for (var m = 0; m < txtPoint.length; m++) {
                        var tt = parseInt(txtPoint[m]);
                        if (isNaN(tt))
                            continue;
                        totalPoint = totalPoint + parseInt(txtPoint[m]);
                        
                    }

                    pointData = $scope.details[i].PointData;
                }
               
                

                obj = {
                    'DyedInspectionDetailID':$scope.details[i].DyedInspectionDetailID,
                    'PointData': pointData,
                    'TotalPoint': totalPoint
                }
                FaultList.push(obj)
             
            }
            debugger;
            console.log(FaultList)
           
            $scope.master.FaultList = FaultList;
       
            FinishFabricInsTableConfig.SaveUpdate($scope.master, function (data) {
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
    $scope.WidthLengthCng = function () {
        debugger;
        $scope.Ptsperhundred = (($scope.TotalPoint * 36 * 100) / (parseFloat($scope.master.RollWidth) * parseFloat($scope.master.RollLength))).toFixed(2);
        if ($scope.grade.length != 0) {
            var grade_Filter = $.grep($scope.grade, function (ginfo, i) {
                if (parseFloat(ginfo.FromPoint) <= $scope.Ptsperhundred && parseFloat(ginfo.ToPoint) >= $scope.Ptsperhundred) {
                    return ginfo;
                }
            });
            if (grade_Filter.length >= 0) {
                $scope.master.Grade = grade_Filter[0].GradeName;
                $scope.master.GradeNo = grade_Filter[0].GradeNo;
                if (grade_Filter[0].GradeName == 'Fail') {
                    var value = "C1D786";
                    $scope.styleAcceptance = function (value) {
                        return { "color": value };
                    }
                }
            }
        }
        //$scope.master.Length = (($scope.master.Weight * 42913) / ($scope.master.GSM * $scope.master.Width)).toFixed(2);
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



    function loadRoll(bCodeOrBatchId) {


        debugger;
        FinishFabricInsTableConfig.GetRollList(encodeURIComponent(bCodeOrBatchId), function (data) {
            debugger;
            console.log(data);
            if (data != null) {
                $scope.rollList = [];
                $scope.rollList = data;
            }
            else {

            }

        });
    }

}]);
