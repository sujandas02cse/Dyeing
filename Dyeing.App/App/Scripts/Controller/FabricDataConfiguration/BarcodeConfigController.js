app.controller("BarcodeConfigController", ['$scope', '$rootScope', 'filterFilter', '$mdDialog', 'BarcodeConfigFactory', function ($scope, $rootScope, filterFilter, $mdDialog, BarcodeConfigFactory) {

    BarcodeConfigFactory.GetUnitAll(function (data) {
        $scope.UnitList = data;
    });
    $scope.BarcodeNo = "";
    $scope.Mode = "M";
    $scope.disableCopyNumber = true;
    $scope.disableCopyWeight = true;
    $scope.disableModifiedWeight = false;
    $scope.disableWeightLoss = false;
    $scope.disableReason = false;
    $scope.copyCount = 0;
    $scope.modify = true;
    $scope.weightloss = true;
    //$scope.Model = { Id: 0 };
    //$scope.btnSave = "Generate & Save";
    $scope.CopyNumber = '';
    $scope.SumWeight = '';
    $scope.show = true;

    document.getElementById("barcodeNo").focus();


    $scope.BarcodeData = {
        BuyerName: "",
        Job: "",
        Mode: "M",
        OrderNo: "",
        Weight: "",
        ModifiedWeight: "",
        WeightLoss: "",
        ReasonId: "",
        CopyNumber: "",
        CopyWeight: "",
        BarcodeNo: ""
    };

    $scope.IssueData = {
        Id: [0],
        UnitId: "",
        FromDate: "",
        ToDate: "",
        Mode: "I",
        IssueNo: "",
        IssueQty: "",
        AfterHeatSetQty: [0],
        ProcessLossQty: [0.00],
        Consumption: [0.00]
    };

    $scope.ddlSelectedItem = {
        Reason: { 'Id': '', 'ReasonName': '' }
    };
    $scope.ddlSelectedItem.Reason = {}

    $scope.changeMode = function (mode) {
        if (mode == 'M' && $scope.BarcodeNo != '' && $scope.BarcodeNo != undefined) {

            $scope.WeightModification();
        }
        if (mode == 'C' && $scope.BarcodeNo != '' && $scope.BarcodeNo != undefined) {

            $scope.CopyBarcode();
        }
        if (mode == 'G' && $scope.BarcodeNo != '' && $scope.BarcodeNo != undefined) {

            $scope.GenerateBarcode();
        }


        if (mode == 'I') {
            $scope.show = false;
        } else {
            $scope.show = true;
        }

    }

    $scope.weightChange = function () {
        $scope.BarcodeData.WeightLoss = $scope.BarcodeData.Weight - $scope.BarcodeData.ModifiedWeight;
        $scope.checkWeight();
    }

    LoadReasonDDL();
    function LoadReasonDDL() {
        BarcodeConfigFactory.LoadReasonDDL(function (data) {
            //alert(angular.toJson(data))
            $scope.ddlData = data;

        });
    }

    $scope.dateChange = function () {
        let toDate = formatDate($scope.IssueData.ToDate);
        let fromDate = formatDate($scope.IssueData.FromDate);
        if (toDate.length == 10 && fromDate.length) {
            BarcodeConfigFactory.GetIssueList($scope.IssueData.UnitList.Id, fromDate,toDate, function (data) {
                $scope.IssueList = data;
            });
        }
        
    }

    $scope.changeSelectedItem = function () {
        $scope.BarcodeData.ReasonId = $scope.ddlSelectedItem.Reason.Id;
    }

    $scope.Save = function () {

        $scope.BarcodeData = {
            BuyerName: $scope.BarcodeData.BuyerName,
            Job: $scope.BarcodeData.Job,
            Mode: $scope.BarcodeData.Mode,
            OrderNo: $scope.BarcodeData.OrderNo,
            Weight: $scope.BarcodeData.Weight,
            ModifiedWeight: $scope.BarcodeData.ModifiedWeight,
            WeightLoss: $scope.BarcodeData.WeightLoss,
            ReasonId: $scope.BarcodeData.ReasonId,
            CopyNumber: $scope.BarcodeData.CopyNumber,
            CopyWeight: $scope.BarcodeData.CopyWeight,
            BarcodeNumber: $scope.BarcodeNo
        };
        if ($scope.BarcodeData.Weight >= $scope.SumWeight) {
            BarcodeConfigFactory.Save($scope.BarcodeData)
                .then(function (data) {
                    if ($scope.BarcodeData.Mode != "C") {
                        $rootScope.alert('Data Saved Successfully !');
                        $scope.Refresh();
                    }
                    else {
                        $rootScope.alert('Data Saved Successfully !');
                        $scope.checkExisting();
                    }
                })
        }
        else
            $rootScope.alert('Modified Weight Must Be Less Than Original Weight !');
    }

    // save issue

    $scope.IssueSave = function () {

        let obj =  [];

        let data = {
            Action: "",
            Id: "",
            GreigeFabMasterId: "",
            GreigeFabDetailId: "",
            IssueQty: "",
            AfterHeatSetQty: "",
            ProcessLoss: "",
            Consumption: ""
        };

        for (let i = 0; i < $scope.HeatSetIssueList.length; i++) {

            data = {
                Action: $scope.HeatSetIssueList[i].Id == 0 ? "Save" : "Update",
                Id: $scope.HeatSetIssueList[i].Id,
                GreigeFabMasterId: $scope.HeatSetIssueList[i].GreigeFabMasterId,
                GreigeFabDetailId: $scope.HeatSetIssueList[i].GreigeFabDetailId,
                IssueQty: $scope.HeatSetIssueList[i].IssueQty,
                AfterHeatSetQty: $scope.IssueData.AfterHeatSetQty[i],
                ProcessLoss: $scope.IssueData.ProcessLossQty[i],
                Consumption: $scope.IssueData.Consumption[i]
            };
            debugger;
            obj.push(data);
        }

        BarcodeConfigFactory.IssueSave(obj)
            .then(function (data) {
                if (data.data[0] === 1) {
                    $rootScope.alert('Data Saved Successfully!');
                }
                else {
                    $rootScope.alert('Data Saved failed!');
                }
            });
    }

    $scope.Refresh = function () {
        $scope.BarcodeData.BuyerName = "";
        $scope.BarcodeData.Job = "";
        $scope.BarcodeData.OrderNo = "";
        $scope.BarcodeData.Weight = "";
        $scope.BarcodeData.ModifiedWeight = "";
        $scope.BarcodeData.WeightLoss = "";
        $scope.BarcodeData.ReasonId = "";
        $scope.BarcodeNo = "";
        $scope.BarcodeData.CopyNumber = "";
        $scope.BarcodeData.CopyWeight = "";
        //$scope.BarcodeData = null;
        $scope.BarcodeNo = "";
        $scope.ddlSelectedItem.Reason = {};
        $scope.CopyNumber = '';
    }

    $scope.actionDialog = function (action, dataModel) {
        alert(dataModel);
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Save') {
                    $scope.Save();
                }
            });
    }

    function objData(action) {
        var obj = [];
        if (action == 'Generate & Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to Save Barcode Data?' };
        }

        return obj;
    }

    $scope.actionIssueDialog = function (action, dataModel) {
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objIssueData(action)
                }
            })).then(function (mode) {
                if (mode == 'Save') {
                    $scope.IssueSave();
                }
            });
    }

    function objIssueData(action) {
        var obj = [];
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to Save Issue Data?' };


        return obj;
    }
    
    $scope.checkExisting = function () {
        BarcodeConfigFactory.checkExisting($scope.BarcodeNo)
            .then(function (response) {
                if (Object.keys(response.data).length >= 1) {
                    $scope.copyCount = Object.keys(response.data).length;
                    $scope.CopyNumber = $scope.BarcodeNo + ' ' + '(' + $scope.copyCount + ')';
                    $scope.BarcodeData.CopyNumber = $scope.copyCount;
                }
                else {
                    $scope.CopyNumber = '';
                }
            })
    }
    $scope.keyPressHandler = function (e) {
        if (e.keyCode === 13) {

            if ($scope.BarcodeData.Mode == 'M' && $scope.BarcodeNo != undefined) {

                $scope.WeightModification();
            }
            if ($scope.BarcodeData.Mode == 'C' && $scope.BarcodeNo != undefined) {

                $scope.CopyBarcode();
            }
            if ($scope.BarcodeData.Mode == 'G' && $scope.BarcodeNo != undefined) {

                $scope.GenerateBarcode();
            }

        }
    }
    $scope.WeightModification = function () {
        BarcodeConfigFactory.GetBarcodeInfo($scope.BarcodeNo)
            .then(function (data) {

                $scope.Data = data.data;

                $scope.BarcodeData.BuyerName = $scope.Data[0].BuyerName;
                //$scope.BarcodeData = $scope.Data[0];
                $scope.BarcodeData.Job = $scope.Data[0].Job;
                $scope.BarcodeData.Mode = "M";
                $scope.BarcodeData.OrderNo = $scope.Data[0].OrderNo;
                $scope.BarcodeData.Weight = $scope.Data[0].Weight;
                $scope.BarcodeData.ReasonId = $scope.Data[0].ReasonId;
                $scope.disableCopyNumber = true;
                $scope.disableCopyWeight = true;
                $scope.disableReason = false;
                $scope.disableModifiedWeight = false;
                $scope.disableWeightLoss = true;
                document.getElementById("barcodeNo").focus();
                $scope.BarcodeData.BarcodeNo = $scope.Data[0].BarcodeNumber;
                $scope.modify = true;
                $scope.weightloss = true;
                $scope.btnSave = "Generate & Save";
                //document.getElementById("btnSave").style.width = "156px";
                angular.element('#btnSave').css('width', '160px');
                $scope.CopyNumber = '';
            })
    }
    $scope.CopyBarcode = function () {
        document.getElementById("barcodeNo").focus();
        BarcodeConfigFactory.GetBarcodeInfo($scope.BarcodeNo)
            .then(function (data) {

                $scope.Data = data.data;

                //$scope.BarcodeData = $scope.Data[0];
                $scope.BarcodeData.BuyerName = $scope.Data[0].BuyerName;
                $scope.BarcodeData.Job = $scope.Data[0].Job;
                $scope.BarcodeData.Mode = "C";
                $scope.BarcodeData.OrderNo = $scope.Data[0].OrderNo;
                $scope.BarcodeData.Weight = $scope.Data[0].Weight;
                $scope.BarcodeData.CopyWeight = $scope.BarcodeData.Weight;
                $scope.disableCopyNumber = true;
                $scope.disableCopyWeight = true;
                $scope.disableReason = true;
                $scope.disableModifiedWeight = false;
                $scope.disableWeightLoss = true;
                $scope.BarcodeData.BarcodeNo = $scope.BarcodeNo;

                $scope.checkExisting();
                $scope.modify = true;
                $scope.weightloss = true;
                $scope.btnSave = "Generate & Save";
                //document.getElementById("btnSave").style.width = "156px";
                angular.element('#btnSave').css('width', '160px');
            })
    }
    $scope.GenerateBarcode = function () {
        document.getElementById("barcodeNo").focus();
        BarcodeConfigFactory.GetBarcodeInfo($scope.BarcodeNo)
            .then(function (data) {

                $scope.Data = data.data;

                //$scope.BarcodeData = $scope.Data[0];
                $scope.BarcodeData.BuyerName = $scope.Data[0].BuyerName;
                $scope.BarcodeData.Job = $scope.Data[0].Job;
                $scope.BarcodeData.Mode = "G";
                $scope.BarcodeData.OrderNo = $scope.Data[0].OrderNo;
                $scope.BarcodeData.Weight = $scope.Data[0].Weight;
                $scope.disableCopyNumber = true;
                $scope.disableCopyWeight = true;
                $scope.disableModifiedWeight = true;
                $scope.disableWeightLoss = true;
                $scope.disableReason = true;
                $scope.BarcodeData.BarcodeNo = $scope.Data[0].BarcodeNumber;
                $scope.modify = false;
                $scope.weightloss = false;
                $scope.CopyNumber = '';
                $scope.BarcodeData.ModifiedWeight = '';
                $scope.BarcodeData.WeightLoss = '';
                $scope.btnSave = "Generate & Save";
                //document.getElementById("btnSave").style.width = "156px";
                angular.element('#btnSave').css('width', '160px');
            })
    }

    $scope.Preview = function () {
        document.getElementById("barcodeNo").focus();
        if ($scope.BarcodeNo != '' && $scope.BarcodeNo != null && $scope.BarcodeData.Mode == "G") {
            BarcodeConfigFactory.generateBarcode($scope.BarcodeNo)
                .then(function (data) {
                    $scope.image = data.data;
                    $("#aModal").modal('show');

                })
        }
        else {
            if ($scope.BarcodeData.Mode != "G")
                $rootScope.alert('Please select Generate Barcode');
            else
                $rootScope.alert('Please enter Barcode Number');
        }

    }
    $('#btnPrint').click(function () {
        //var printContents = document.getElementById('popup').innerHTML;
        //var originalContents = document.body.innerHTML;
        //document.body.innerHTML = printContents;
        //window.print();
        //document.body.innerHTML = originalContents;
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        //mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById('popup').innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    });

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    $('#btnSearch').click(function () {
        $scope.IssueData.UnitId = $scope.IssueData.UnitList.Id
        let FromDate = formatDate($scope.IssueData.FromDate);
        let ToDate = formatDate($scope.IssueData.ToDate);
        $scope.IssueData.IssueNo = $scope.IssueData.IssueList.Name;

        BarcodeConfigFactory.GetHeatSetIssueList($scope.IssueData.UnitId, FromDate,
            ToDate, $scope.IssueData.IssueNo, function (data) {
                $scope.HeatSetIssueList = data;
                $scope.totalItems = data.length;
                data.forEach((item, i) => {
                    $scope.IssueData.AfterHeatSetQty[i] = item.AfterHeatSetQty == 0 ? '' : item.AfterHeatSetQty,
                        $scope.IssueData.ProcessLossQty[i] = item.ProcessLoss == 0 ? '' : item.ProcessLoss,
                        $scope.IssueData.Consumption[i] = item.Consumption == 0 ? '' : item.Consumption
                });
                
        });
    })

    $scope.changeHeatQty = function (data, i) {
        $scope.IssueData.ProcessLossQty[i] = $scope.IssueData.AfterHeatSetQty[i] == "" ? 0 : (data.IssueQty - $scope.IssueData.AfterHeatSetQty[i]).toFixed(2);
        $scope.IssueData.Consumption[i] = (($scope.IssueData.ProcessLossQty[i] / data.IssueQty ) * 100).toFixed(2);
    }

    $scope.checkWeight = function () {
        BarcodeConfigFactory.getPartialWeight($scope.BarcodeNo)
            .then(function (response) {
                if (Object.keys(response.data).length > 0) {
                    if (response.data[0].SumWeight > $scope.BarcodeData.Weight) {
                        $scope.SumWeight = response.data[0].SumWeight;
                    }
                }
            })
    }

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }

    // Start Pagination
    $scope.viewby = 10;

    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first paghe
    }

}]);