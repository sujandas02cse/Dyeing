app.controller("CopyQrCodeController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'CopyQrCodeFactory', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, CopyQrCodeFactory) {


    // initialize model
    $scope.Mode = "CopyQrCode";
    function modeChange() {
        if ($scope.Mode === "CopyQrCode")
            $scope.btnSave = 'Save';
        if ($scope.Mode === "ModifyQrCode")
            $scope.btnSave = 'Update';
        if ($scope.Mode === "RegenerateQrCode")
            $scope.btnSave = 'Print';
    }
    

    $scope.SelectedRoll = [];

    //Change Mode
    $scope.changeMode = function () {
        $scope.Refresh();
    }


    //All Unit Load when load the page
    CopyQrCodeFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });


    //All BAtch Data Load by Unit when select Unit
    $scope.LoadBatchData = function (Unit) {
        if (!$scope.Unit) return;
        $rootScope.ShowLoader("Loading Batch Data");
        CopyQrCodeFactory.GetBatchByUnit(Unit.Id,  function (data) {
            $scope.BatchList = data;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();
    }


    //Load Batch Details data when Select The Batch
    $scope.LoadDetailData = function (Batch) {
        if (Batch === undefined || Batch === '' || Batch === null) return;
        var SelectedBatch = $scope.BatchList.find(x => x.BatchNo === Batch);
        $rootScope.ShowLoader('Loading Batch Detail Data');
        CopyQrCodeFactory.GetBatchDetailById(SelectedBatch.BpmId,  function (data) {
            $scope.RollList = data;    
            $rootScope.HideLoader();
        });
        //$rootscope.HideLoader();
    }


    //EXTRA

    let scanTimer;

    $scope.qrScannerAutoDetect = function () {
        if (!$scope.ScannedQrText) return;

        // wait until scanner finishes typing
        clearTimeout(scanTimer);

        scanTimer = setTimeout(function () {
            $scope.$apply(function () {
                $scope.qrScannerKeyPress($scope.ScannedQrText);
            });
        }, 200); // scanner finishes within milliseconds
    };

    $scope.qrScannerKeyPress = function (qrText) {
        debugger
        $scope.ProcessQR($scope.ScannedQrText);

    };

    //Old scan
    //$scope.qrScannerKeyPress = function (masterid) {
    //    debugger
    //    let qrText = $scope.ScannedQrText.trim();
    //    if (!qrText) return;

    //     Parse QR like "9049 - 01 - 001(18)/9049 - 01 - 001(18)-123213 "
    //    let match = qrText.match(/^(.*)\((\d+)\)(?:.*)?$/);

    //    if (!match) {
    //        $rootScope.alert("Invalid QR format");
    //        $(this).val('');
    //        return;
    //    }

    //    let batchNo = match[1].trim();
    //    let rollNo = Number(match[2]);
        
    //    $scope.ProcessQR($scope.ScannedQrText);
    //}

    //function after qr code fire batchdata using roll

    $scope.ProcessQR = function (masterid) {
        debugger
        $scope.SelectedRoll = [];
        CopyQrCodeFactory.GetBatchDetailByQr(masterid, function (data) {
            $scope.SelectedRoll = data[0];
            // Load Roll Weight
            $scope.RollWeight = $scope.SelectedRoll.RollWeight;
            $scope.CopyWeight = $scope.SelectedRoll.CopyWeight;
        });
    };

    //when search by unit,batch
    $scope.ChangeOnRoll = function (Unit, Batch, RollNo) {
        $scope.SelectedRoll = [];
        debugger
        $scope.SelectedRoll = $scope.RollList.find(r => r.RollNo == RollNo.RollNo);
        if ($scope.SelectedRoll.length === 0) return;

        $scope.RollWeight = $scope.SelectedRoll.RollWeight;
        $scope.CopyWeight = $scope.SelectedRoll.CopyWeight;
    };


    //Save Update Modal Control
    $scope.actionDialog = function (action) {
        debugger 

        $mdDialog
            .show(
                $mdDialog.dialogBox({
                    locals: {
                        model: objData(action)
                    }
                })
            )
            .then(function (mode) {
                if (mode == "Update" || mode == "Save" || mode == "Print") {
                    if ($scope.CopyWeight <= 0 && mode == "Save") {
                        $rootScope.alert('Value is not less than or equal 0');
                        return;
                    }
                    if ($scope.RollWeight <= $scope.CopyWeight && mode== "Save") {
                        $rootScope.alert('Split value not more than roll weight');
                        return;
                    }
                    SaveUpdate();
                }
                //else if (mode == "Print") {
                //    printStickerForNewRoll($scope.SelectedRoll.RollNo);
                //}
                
            });
    };


    //Save Update Modal Message
    function objData(action) {
        debugger
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Roll data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Roll data?' };
        } else if (action === "Print") {
            obj = { 'Mode': 'Print', 'btnText': 'Yes', 'Header': 'Print Confirmation', 'message': 'Do you want to Print Roll data?' };
        }
        return obj;
    }

    //Print Sticker
    function printSticker() {
        debugger
        var rptParm = [
            { CompTime: $scope.SelectedRoll.CompTime },
            { BatchNo: $scope.SelectedRoll.BatchNo },
            { BodyPartId: $scope.SelectedRoll.BodyPartId },
            { BatchType: "New" }
        ];

        var reportPath = "~/Reports/QCManagement/LabStickerNew.rdlc";
        var fileName = "LabStickerNew";

        var rptComInfo = [
            { APIAction: "BroadcastManagement/GetReportingData" },
            { ReportPath: reportPath },
            { FileName: fileName },
            { Format: "PDF" }
        ];

        var sqlQuery = "[dbo].[usp_rpt_LabStickerOffline]";
        var SQL = [{ SQL: sqlQuery }];
        var Dataset = [{ Dataset: "LabSticker" }];
        var labStickerFlag = '';
        $window.open(
            "../BroadcastManagement/GetBroadcastDataLabSticker?rptComInfo=" + JSON.stringify(rptComInfo) +
            "&&rptParm=" + JSON.stringify(rptParm) +
            "&&SQL=" + JSON.stringify(SQL) +
            "&&Dataset=" + JSON.stringify(Dataset) +
            "&&PartialParam=" + JSON.stringify(labStickerFlag)
        );
    }

    function printStickerForNewRoll(masterId) {
        debugger
        var rptParm = [
            { MasterId: masterId },
            { BatchNo: $scope.SelectedRoll.BatchNo },
            { BodyPartId: $scope.SelectedRoll.BodyPartId }
        ];

        var reportPath = "~/Reports/QCManagement/LabStickerCopyQrCode.rdlc";
        var fileName = "LabStickerCopyQrCode";

        var rptComInfo = [
            { APIAction: "BroadcastManagement/GetReportingData" },
            { ReportPath: reportPath },
            { FileName: fileName },
            { Format: "PDF" }
        ];

        var sqlQuery = "[dbo].[usp_rpt_LabStickerOfflineForRoll]";
        var SQL = [{ SQL: sqlQuery }];
        var Dataset = [{ Dataset: "LabSticker" }];
        var labStickerFlag = '0';
        $window.open(
            "../BroadcastManagement/GetBroadcastDataLabSticker?rptComInfo=" + JSON.stringify(rptComInfo) +
            "&&rptParm=" + JSON.stringify(rptParm) +
            "&&SQL=" + JSON.stringify(SQL) +
            "&&Dataset=" + JSON.stringify(Dataset) +
            "&&PartialParam=" + JSON.stringify(labStickerFlag)
        );
    }

    //Save Update Function to Save Data
    function SaveUpdate() {
        debugger
        if (!$scope.SelectedRoll) return;

        // For Save or Update
        var Obj = {
            BpmId: $scope.SelectedRoll.BpmId,
            SourceRollNo: $scope.SelectedRoll.RollNo,
            CopyWeight: $scope.CopyWeight,
            Method: $scope.btnSave,
            RollWeight: $scope.RollWeight,
            UserId: $rootScope.UserId,
            BatchNo: $scope.SelectedRoll.BatchNo
        };

        CopyQrCodeFactory.SaveUpQrCodeData(Obj, function (data) {
            if (data[0].msg && data[0].msg !== '') {
                debugger
                if ($scope.Mode === "CopyQrCode" || $scope.Mode === "ModifyQrCode")
                    printStickerForNewRoll(data[0].NewMasterId);
                else 
                    printStickerForNewRoll($scope.SelectedRoll.RollNo);

                $rootScope.alert(data[0].msg);
            } else {
                $rootScope.alert("Error occurred while saving data");
            }
            $scope.Refresh();
        });
    }



    //Global Refresh Function
    $scope.Refresh = function () {
        refresh();
    }

    function refresh() {


        $scope.ScannedQrText = '';
        $scope.AllData = [];
        $scope.Unit = [];
        $scope.Batch = [];
        $scope.BatchList = [];
        $scope.RollList = [];
        $scope.RollWeight = 0;
        $scope.CopyWeight = 0;
        $scope.SelectedRoll = undefined;
        $scope.HideLoader();
        modeChange();
    }



    //Helper function to Format Date
    function formatDateForSQL(dateString) {
        if (!dateString) {
            return null; // Handle null or undefined dates
        }

        var date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null; // Handle invalid date strings
        }

        // Format the date as 'yyyy-MM-dd HH:mm:ss'
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };



    //===============================
    // Pagination
    //===============================

    //Pagination
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    // Go to specific page
    $scope.setPage = function (page) {
        if (page >= 1 && page <= $scope.pageCount()) {
            $scope.currentPage = page;
        }
    };

    // Next / Prev
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    // Total number of pages
    $scope.pageCount = function () {
        if (!$scope.filtered) return 1;
        return Math.ceil($scope.filtered.length / $scope.pageSize);
    };

    // Generate page numbers for pagination
    $scope.getPageNumbers = function () {
        var numbers = [];
        for (var i = 1; i <= $scope.pageCount(); i++) {
            numbers.push(i);
        }
        return numbers;
    };

}]);