app.controller("DyeingBatchConfigFabricController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'DyeingBatchConfigFabric', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, DyeingBatchConfigFabric) {
    var processMode = 0;
    var isNozzleEmpty = 0;
    //#region necessary variables initialization
    $scope.varcodeObjs = [];
    $scope.BarcodeDataNozzle = [];
    $scope.BarcodesNMJob = [];
    $scope.BarcodesNMOrder = [];
    $scope.NozzleDataBarcodelist = {};

    //#endregion necessary variables initialization
    //#region Get planNo, Batch, trolley and Plan Details information

    DyeingBatchConfigFabric.GetBatchNoAndPlanNo(function (data) {

        $scope.PlanBatchList = data.filter(elem => elem.IsHalt == 0);
        $scope.BatchDate = moment(new Date()).format("YYYY-MMM-DD");
    });
    var unitId = 12;
    DyeingBatchConfigFabric.GetTrollyNo(unitId, function (data) {
        $scope.TrollyList = data;

    });

    $scope.onSelectByPlan = function ($item) {
        $scope.BatchNo = $item;
        GetMachineProductionPlanDetail($item.MppmId);

    };
    $scope.onSelectByBatch = function ($item) {

        $scope.PlanNo = $item;
        GetMachineProductionPlanDetail($item.MppmId);
    };

    function GetMachineProductionPlanDetail(MppmId) {
        $scope.Details = [];
        DyeingBatchConfigFabric.GetMachineProductionPlanDetail(MppmId, function (data) {
            $scope.Head = data;
            $scope.Head.MppmId = MppmId;
            $scope.BatchDate = moment(new Date()).format("YYYY-MMM-DD");
            for (var i = 0; i < data["NoOfNozzle"]; i++) {

                var vd = {
                    NozzleNo: i + 1, varcodeObjs: [], TncId: "", ManualWeight: 0, FabricWeight: 0, NozzleFabWeight: 0
                };
                $scope.Details.push(vd);
            }
            $scope.Head.ProcessMode = 0;
            $scope.btnSave = "Save";
            loadBarcodes(0);
        });

    }
    //#endregion Get planNo, Batch, trolley and Plan Details information

    //Chips  
    //#region Auto Nozzle From Stock, add remove barcodes
    $scope.readonly = true;
    $scope.removable = 0;
    $scope.loadPorcessBarcodes = function (mode) {
      
        RefreshNozzle();
 
        loadBarcodes(mode);

    }
    function loadBarcodes(mode) {

        DyeingBatchConfigFabric.GetDyeingFabricBarcodes($scope.Head.MppmId, $scope.Head.ProcessMode, function (data) {
            if (mode == 1 && data.length == 0)
                $rootScope.alert("No Data found!");
            else if (processMode != $scope.Head.ProcessMode || isNozzleEmpty == 0 || processMode == 0) 
                allBarcodes(mode, data);
        });
    }
    function allBarcodes(mode, data) {

        if (data.length == 0) return;

        $scope.IsLoaderActive = true;
        var listData = [];
        listData = data;

        if ( data[0]["NozzleNo"] > 0 && (mode == 0 || mode == 1 || mode == 2)) {
            $scope.btnSave = "Update";
            isNozzleEmpty = 1;
           processMode = data[0]["ProcessMode"];
            $scope.Head.ProcessMode = data[0]["ProcessMode"];
            $scope.Head.FabBatchMId = data[0]["FabBatchMId"];
            for (var j = 0; j < $scope.Details.length; j++) {
                $scope.Details[j].varcodeObjs = data.filter(elem => elem.NozzleNo == j + 1);
                $scope.Details[j].TncId = data.filter(elem => elem.NozzleNo == j + 1)[0]["TncId"];
                $scope.Details[j].ManualWeight = data.filter(elem => elem.NozzleNo == j + 1)[0]["ManualWeight"].toFixed(2);
                var weightSum = 0;
                for (var k = 0; k < $scope.Details[j].varcodeObjs.length; k++) {
                    weightSum += $scope.Details[j].varcodeObjs[k]["BarCodeQty"];
                }
                $scope.Details[j].FabricWeight = weightSum;
            }
            $scope.IsLoaderActive = false;
        }
        else if (mode == 1) {

            fromStock(listData).then(function (data) {
                
                if (data.length>0) {
                    
                    setMatchFromRestList(data).then(function (dt) {
                       
                        if (dt.length > 0) {

                            swapInBetweenNozzle(dt);
                        }
                    });
                }
                $scope.IsLoaderActive = false;
            });
            $scope.IsLoaderActive = false;
        } else if (mode == 2) {

            fromBarCodeDataNozzle(listData).then(function (data) {

                if (data.length>0) {
                    setMatchFromRestList(data).then(function (dt) {

                        if (dt.length>0) {
                            swapInBetweenNozzle(dt);
                        }
                    });
                }
                $scope.IsLoaderActive = false;
            });
        }
    }

    function swapInBetweenNozzle(listData) {

        var capacityPerNozzle = parseFloat(($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3));
        var extra = 5 / $scope.Head.NoOfNozzle;
        var nonSwapNozzle = [];
        var nonSwapIndex = 0;
        loop1:
        for (var i = 0; i < $scope.Details.length; i++) {

            listData = _.sortBy(listData, 'BarCodeQty').reverse();
            $scope.Details[i].varcodeObjs = _.sortBy($scope.Details[i].varcodeObjs, 'BarCodeQty').reverse();
            loop2:
            for (var j = $scope.Details[i].varcodeObjs.length - 1; j >= 0; j--) {

                var k = 0;
                var indWeightS = 0;
                var Weightdiff = parseFloat((capacityPerNozzle - $scope.Details[i].FabricWeight).toFixed(3));
                var largestWt = $scope.Details[i].varcodeObjs[j]["BarCodeQty"] + extra + Weightdiff;

                if (Math.abs(Weightdiff) <= extra) {
                    break;
                }
                loop3:
                for (var l = i + 1; l < $scope.Details.length; l++) {

                    var Weightdiff = parseFloat((capacityPerNozzle - $scope.Details[l].FabricWeight).toFixed(3));

                    if (Math.abs(Weightdiff) > extra) {

                        $scope.Details[l].varcodeObjs = _.sortBy($scope.Details[l].varcodeObjs, 'BarCodeQty').reverse();
                        nonSwapNozzle = $scope.Details[l].varcodeObjs;
                        nonSwapIndex = l;
                        var WtValue = 0;
                        var wtt = $scope.Details[i].varcodeObjs[j]["BarCodeQty"];

                        while (k < nonSwapNozzle.length) {

                            indWeightS = nonSwapNozzle[k]["BarCodeQty"];
                            if (indWeightS < wtt) break;

                            if (indWeightS <= largestWt && indWeightS > wtt && indWeightS > WtValue) {

                                listData.push($scope.Details[i].varcodeObjs[j]);//smallWtRollNozzle
                                var index = $scope.Details[i].varcodeObjs.indexOf($scope.Details[i].varcodeObjs[j]);
                                $scope.Details[i].varcodeObjs.splice(index, 1);

                                $scope.Details[i].FabricWeight = parseFloat($scope.Details[i].FabricWeight - wtt).toFixed(3);
                                var fabwt = $scope.Details[i].FabricWeight;

                                $scope.Details[i].varcodeObjs.push(nonSwapNozzle[k]);//matchWeightRollSwap
                                $scope.Details[i].FabricWeight = parseFloat(fabwt) + indWeightS;

                                var index = $scope.Details[l].varcodeObjs.indexOf(nonSwapNozzle[k]);
                                $scope.Details[l].varcodeObjs.splice(index, 1);
                                $scope.Details[l].FabricWeight = parseFloat($scope.Details[l].FabricWeight - indWeightS).toFixed(3);

                                WtValue = indWeightS;
                                var Wdiff = parseFloat((capacityPerNozzle - $scope.Details[i].FabricWeight).toFixed(3));
                                if (Math.abs(Wdiff) <= extra) {
                                    break  loop2;
                                }

                            }
                            k++;
                        }
                    }
                    //  alert(angular.toJson(listData));

                }
            }
        }

        setBestMatchFromList(listData, nonSwapIndex)
    }
    function setBestMatchFromList(listData, nonSwapIndex) {

        var capacityPerNozzle = parseFloat(($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3));
        var extra = 5 / $scope.Head.NoOfNozzle;

        listData = _.sortBy(listData, 'BarCodeQty').reverse();
        var smallWtRollNozzle = {};
        var matchWeightRollRest = {};
        var Weightdiff = parseFloat((capacityPerNozzle - $scope.Details[nonSwapIndex].FabricWeight).toFixed(3));
        $scope.Details[nonSwapIndex].varcodeObjs = _.sortBy($scope.Details[nonSwapIndex].varcodeObjs, 'BarCodeQty').reverse();

        var WTvalue = 0;
        loop1:
        for (var j = $scope.Details[nonSwapIndex].varcodeObjs.length - 1; j >= 0; j--) {

            if (Math.abs(Weightdiff) <= extra) {
                break;
            }
            var k = 0;
            var largestWt = $scope.Details[nonSwapIndex].varcodeObjs[j]["BarCodeQty"] + extra + Weightdiff;
            var indWeightS = 0;
            loop2:
            while (k < listData.length) {

                indWeightS = listData[k]["BarCodeQty"];
                if (indWeightS <= Weightdiff) {
                    $scope.Details[nonSwapIndex].varcodeObjs.push(listData[k]);
                    $scope.Details[nonSwapIndex].FabricWeight = parseFloat($scope.Details[nonSwapIndex].FabricWeight) + parseFloat(indWeightS);
                    Weightdiff = parseFloat((capacityPerNozzle - $scope.Details[nonSwapIndex].FabricWeight).toFixed(3));

                    var index = listData.indexOf(listData[k]);
                    listData.splice(index, 1);

                    if (Math.abs(Weightdiff) <= extra) {
                        break loop1;
                    }

                } else if (indWeightS <= largestWt && indWeightS > WTvalue && indWeightS > $scope.Details[nonSwapIndex].varcodeObjs[j]["BarCodeQty"]) {

                    smallWtRollNozzle = $scope.Details[nonSwapIndex].varcodeObjs[j];
                    matchWeightRollRest = listData[k];
                    WTvalue = indWeightS;
                }
                k++;
            }

            if (Object.keys(smallWtRollNozzle).length > 0 && Object.keys(matchWeightRollRest).length > 0) {

                listData.push(smallWtRollNozzle);
                var index = $scope.Details[nonSwapIndex].varcodeObjs.indexOf(smallWtRollNozzle);
                $scope.Details[nonSwapIndex].varcodeObjs.splice(index, 1);
                $scope.Details[nonSwapIndex].FabricWeight = $scope.Details[nonSwapIndex].FabricWeight - smallWtRollNozzle["BarCodeQty"];

                $scope.Details[nonSwapIndex].varcodeObjs.push(matchWeightRollRest);
                var index = listData.indexOf(matchWeightRollRest);
                listData.splice(index, 1);
                $scope.Details[nonSwapIndex].FabricWeight = $scope.Details[nonSwapIndex].FabricWeight + matchWeightRollRest["BarCodeQty"];
                smallWtRollNozzle = {};
                matchWeightRollRest = {};
            }
        }
        //  alert(angular.toJson(listData));
    }
    function setMatchFromRestList(listData) {

        var defer = $q.defer();
        var capacityPerNozzle = parseFloat(($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3));
        var extra = 5 / $scope.Head.NoOfNozzle;
        var NewList = [];
        for (var i = 0; i < $scope.Details.length; i++) {

            listData = _.sortBy(listData, 'BarCodeQty').reverse();
            var smallWtRollNozzle = {};
            var matchWeightRollRest = {};
            var Weightdiff = parseFloat((capacityPerNozzle - $scope.Details[i].FabricWeight).toFixed(3));
            $scope.Details[i].varcodeObjs = _.sortBy($scope.Details[i].varcodeObjs, 'BarCodeQty').reverse();

            var WTvalue = 0;
            for (var j = $scope.Details[i].varcodeObjs.length - 1; j >= 0; j--) {

                if (Math.abs(Weightdiff) <= extra) {
                    break;
                }
                var k = 0;
                var largestWt = $scope.Details[i].varcodeObjs[j]["BarCodeQty"] + extra + Weightdiff;
                var indWeightS = 0;

                while (k < listData.length) {

                    indWeightS = listData[k]["BarCodeQty"];

                    if (indWeightS <= largestWt && indWeightS > WTvalue && indWeightS > $scope.Details[i].varcodeObjs[j]["BarCodeQty"]) {
                        smallWtRollNozzle = $scope.Details[i].varcodeObjs[j];
                        matchWeightRollRest = listData[k];
                        WTvalue = indWeightS;
                    }
                    k++;
                }
            }

            if (Object.keys(smallWtRollNozzle).length > 0 && Object.keys(matchWeightRollRest).length > 0) {

                listData.push(smallWtRollNozzle);
                var index = $scope.Details[i].varcodeObjs.indexOf(smallWtRollNozzle);
                $scope.Details[i].varcodeObjs.splice(index, 1);
                $scope.Details[i].FabricWeight = $scope.Details[i].FabricWeight - smallWtRollNozzle["BarCodeQty"];

                $scope.Details[i].varcodeObjs.push(matchWeightRollRest);
                var index = listData.indexOf(matchWeightRollRest);
                listData.splice(index, 1);
                $scope.Details[i].FabricWeight = $scope.Details[i].FabricWeight + matchWeightRollRest["BarCodeQty"];
                NewList = listData
            }
        }

        defer.resolve(NewList);

        return defer.promise;
    }
    function fromStock(listData) {
        
        listData = _.sortBy(listData, 'BarCodeQty');

        var defer = $q.defer();
        var capacityPerNozzle = parseFloat(($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3));
        var extra = 5 / $scope.Head.NoOfNozzle;
        var weightSum = 0, tWeightSum = 0;
        var j = 0;
        var Mode = "I";
        for (var i = listData.length - 1; i >= 0; i--) {

            weightSum = $scope.Details[j].FabricWeight + listData[i]["BarCodeQty"];

            tWeightSum = $scope.Details[j].FabricWeight + listData[i]["BarCodeQty"];
            var rWeight = capacityPerNozzle - tWeightSum;

            var matchRoll = listData.filter(elem => elem.BarCodeQty <= (rWeight + extra))[0];
            if (matchRoll != null) {

                listData[i]["NozzleNo"] = $scope.Details[j].NozzleNo;
                $scope.Details[j].varcodeObjs.push(matchRoll);
                var index = listData.indexOf(matchRoll);
                listData.splice(index, 1);
                $scope.Details[j].FabricWeight = $scope.Details[j].FabricWeight + matchRoll.BarCodeQty;

            }

            else if (weightSum <= (capacityPerNozzle + extra)) {
                listData[i]["NozzleNo"] = $scope.Details[j].NozzleNo;
                $scope.Details[j].varcodeObjs.push(listData[i]);
                var index = listData.indexOf(listData[i]);
                listData.splice(index, 1);
                $scope.Details[j].FabricWeight = weightSum;

            }

            if (Mode == "I")
                j++;
            if (j == 0 && Mode == "D")
                Mode = "I";

            if (j == ($scope.Head.NoOfNozzle) && Mode == "I")
                Mode = "D";
            if (Mode == "D")
                j--;
            defer.resolve(listData);
        }
       
        return defer.promise;
    }
    function fromBarCodeDataNozzle(listData) {

        var defer = $q.defer();
        var barcodesNMJob = [];
        var barcodesNMOrder = [];
        var capacityPerNozzle = parseFloat(($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3));
        var extra = 5 / $scope.Head.NoOfNozzle;
        var weightSum = 0;
        var j = 0;
        var Mode = "I";

        for (var i = listData.length - 1; i >= 0; i--) {

            if (listData[i]["hasJob"] == 0 && listData[i]["hasOrder"] == 0) {

                barcodesNMJob.push(listData[i]);
                var index = listData.indexOf(listData[i]);
                listData.splice(index, 1);

            } else if (listData[i]["hasJob"] == 1 && listData[i]["hasOrder"] == 0) {

                barcodesNMOrder.push(listData[i]);
                var index = listData.indexOf(listData[i]);
                listData.splice(index, 1);
            } else {

                weightSum = $scope.Details[j].FabricWeight + listData[i]["BarCodeQty"];

                if (weightSum <= (capacityPerNozzle + extra)) {

                    listData[i]["NozzleNo"] = $scope.Details[j].NozzleNo;
                    $scope.Details[j].varcodeObjs.push(listData[i]);
                    var index = listData.indexOf(listData[i]);
                    listData.splice(index, 1);
                    $scope.Details[j].FabricWeight = weightSum;
                }
                defer.resolve(listData);
            }

            if (Mode == "I")
                j++;
            if (j == 0 && Mode == "D")
                Mode = "I";


            if (j == ($scope.Head.NoOfNozzle) && Mode == "I")
                Mode = "D";
            if (Mode == "D")
                j--; 
        }

        $scope.BarcodesNMJob = barcodesNMJob;
        $scope.BarcodesNMOrder = barcodesNMOrder;

        return defer.promise;
    }

    $scope.newBarcode = function (chip, NozzleNo, index) {

        debugger;
        if ($scope.Details[NozzleNo - 1].varcodeObjs.filter(elem => elem.FBarcodeGenId == chip)[0])
            return null;
        var barcodes = [];
        barcodes.push({ FBarcodeGenId: chip })
        $scope.NozzleDataBarcodelist.MppmId = $scope.Head.MppmId;
        $scope.NozzleDataBarcodelist.BarcodeList = barcodes;

        DyeingBatchConfigFabric.GetDyeingFabricBarcodeDetails($scope.NozzleDataBarcodelist, function (data) {
            if (data) {
                if (data[0]["hasJob"] == 0 && data[0]["hasOrder"] == 0) {

                    confirmAlert("Job Not Match,Want to save!", "yes", "No", 1, data, NozzleNo, index)
                } else if (data[0]["hasJob"] == 1 && data[0]["hasOrder"] == 0) {

                    confirmAlert("Would you want to save this wrong order fabric in this Batch!", "yes", "No", 1, data, NozzleNo, index);
                } else {
                    var capacityPerNozzle = ($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3);
                    var fabWeight = $scope.Details[index].FabricWeight + data[0]["BarCodeQty"]

                    if (fabWeight <= capacityPerNozzle) {

                        $scope.Details[index].FabricWeight += data[0]["BarCodeQty"];
                        $scope.Details[index].varcodeObjs.push({ FabBatchDId: 0, FabBatchMId: 0, NozzleNo: NozzleNo, TncId: null, FBarcodeGenId: data[0]["FBarcodeGenId"], BarCodeQty: data[0]["BarCodeQty"] });
                    }
                }
            }
        });

        return null;
    };
    $scope.deleteChip = function (chip, NozzleNo) {
        $scope.Details[NozzleNo - 1].FabricWeight -= chip.BarCodeQty;
    }
    //#endregion Auto Nozzle From Stock, add remove barcodes
    //#region Dyeing Fabric Batch Save Update
    $scope.actionDialog = function (action, dataModel) {

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
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save dyeing batch configuration Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update dyeing batch configuration Data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete dyeing batch configuration Data?' };
        }
        return obj;
    }

    function SaveUpdate() {

        $scope.Head.UserId = $rootScope.UserId;
        $scope.Head.BatchDate = $scope.BatchDate;
        var Batchwt = 0;
        var detail = [];

        for (var i = 0; i < $scope.Details.length; i++) {

            Batchwt += parseFloat($scope.Details[i].FabricWeight + $scope.Details[i].ManualWeight)

            for (var j = 0; j < $scope.Details[i].varcodeObjs.length; j++) {

                $scope.Details[i].varcodeObjs[j].NozzleNo = $scope.Details[i].NozzleNo;
                $scope.Details[i].varcodeObjs[j].TncId = $scope.Details[i].TncId;
                $scope.Details[i].varcodeObjs[j].ManualWeight = $scope.Details[i].ManualWeight;
                detail.push($scope.Details[i].varcodeObjs[j]);
            }
        }
        $scope.Head.BatchWeight = Batchwt.toFixed(3);
        $scope.Head.Details = detail;

        DyeingBatchConfigFabric.DyeingBatchConfigFabric_SaveUpdate($scope.Head, function (data) {
            $rootScope.alert(data.Msg);
            $scope.btnSave = "Save";
            refresh();
        });
    }
    //#endregion Dyeing Fabric Batch Save Update
    //#region Confirmation to save barcodes with out Job and Order.
    function confirmAlert(message, ok, cancel, track, data, NozzleNo, index) {
        var confirm = $mdDialog.confirm()
            .title("Confirmation")
            .textContent(message)
            .ok(ok)
            .cancel(cancel);

        $mdDialog.show(confirm).then(function () {
            if (track == 1) {
                var capacityPerNozzle = ($scope.Head.CapacityName / $scope.Head.NoOfNozzle).toFixed(3);
                var fabWeight = $scope.Details[index].FabricWeight + data[0]["BarCodeQty"]
                if (fabWeight <= capacityPerNozzle) {

                    $scope.Details[index].FabricWeight += data[0]["BarCodeQty"];
                    $scope.Details[index].varcodeObjs.push({ FabBatchDId: 0, FabBatchMId: 0, NozzleNo: NozzleNo, TncId: null, FBarcodeGenId: data[0]["FBarcodeGenId"], BarCodeQty: data[0]["BarCodeQty"] });
                }
            }
            if (track == 2) {

                allBarcodes(1, data)
            }
        }, function () {
            $scope.IsLoaderActive = false;
            //cancel
        });
    }
    //#endregion Confirmation to save barcodes with out Job and Order.
    //#region Load From Barcode Data Nozzle
    $scope.showTabDialog = function () {

        $mdDialog.show({
            controller: DialogController,
            parent: angular.element(document.body),
            template: '<md-dialog aria-label="Save Information">'
                + '<md-toolbar>'
                + '<div class="md-toolbar-tools">'
                + '<h4 style="margin-left:35%;margin-top: 7%;">Load Barcode</h4>'
                + '<span flex></span>'
                + '<md-button class="md-icon-button" ng-click="cancel()">'
                + '<img src="../../Content/img/close_icon.png" height="25" width="25" style="margin-top: 26%;" />'
                + '</md-button>'
                + '</div>'
                + '</md-toolbar >'

                + '<md-dialog-content>'
                + '<div class="md-dialog-content">'
                + '<input type="file" read-text="onFileSelect($files)">'
                + '<p>{{text}}</p>'
                + '</div>'
                + '</md-dialog-content>'

                + '<md-dialog-actions layout="row">'

                + '<div class="col-md-5">'
                + '<md-button class="md-raised md-primary" ng-click="Ok()">Ok</md-button>'
                + '</div>'
                + '<div class="col-md-5">'
                + '<md-button class="md-raised md-warn" ng-click="cancel()">Cancel</md-button>'
                + '</div>'

                + '</md-dialog-actions>'
                + '</md-dialog>',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        })
            .then(function (Ok) {


                if ($scope.BarcodesNMJob.length > 0) {
                    confirmAlert("Job Not Match for barcodes:  " + $scope.BarcodesNMJob.map(function (x) { return x["FBarcodeGenId"]; }) + " , still want to save them!", "yes", "No", 2, $scope.BarcodesNMJob);
                }

                if ($scope.BarcodesNMOrder.length > 0) {

                    confirmAlert("Order Not Match for barcodes:  " + $scope.BarcodesNMOrder.map(function (x) { return x["FBarcodeGenId"]; }) + " , still want to save them!", "yes", "No", 2, $scope.BarcodesNMOrder);
                }


            }, function () {
                $scope.IsLoaderActive = false;
                //cancel
            });
    };
    function DialogController($scope, $mdDialog) {

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.Ok = function () {
            $mdDialog.hide();
        };
        $scope.getTextFile = function () {
            fileReader.readAsText($scope.file, $scope).then(function (result) {
                var barcodes = '';
                var barcodeList = [];
                var barcodeDetails = result.split('\n');
              
                for (var i = 0; i < barcodeDetails.length; i++) {
                  
                    try {
                        var varcode = { FBarcodeGenId: barcodeDetails[i].split(',')[3].trim() };
                        var cn = barcodeList.filter(function (entry) { return entry.FBarcodeGenId === barcodeDetails[i].split(',')[3].trim() });

                        if (cn <= 0) {
                            barcodeList.push(varcode);
                        }
                    }
                    catch (err) {
                        continue;
                    }
                }
                $scope.BarcodeDataNozzle = barcodes.slice(0, -1);
                GetDyeingFabricBarcodeDetails(barcodeList)
            });
        }
    }
    function GetDyeingFabricBarcodeDetails(barcodes) {
        $scope.NozzleDataBarcodelist.MppmId = $scope.Head.MppmId;
        $scope.NozzleDataBarcodelist.BarcodeList = barcodes;
        DyeingBatchConfigFabric.GetDyeingFabricBarcodeDetails($scope.NozzleDataBarcodelist, function (data) {

            uniqueList(data).then(function (dt) {
               // alert(angular.toJson(dt.length));
                if (dt.length > 0) {

                    allBarcodes(2, dt);
                }
            });

            
            

        });
    }

    function uniqueList(data) {
  
        var assignedGroupsIds = {};
        var groupsIds = {};
        var result = [];
        var defer = $q.defer();
       
        data.forEach(function (el, i) {
            groupsIds[el.FBarcodeGenId] = data[i];
        });

        for (var j = 0; j< $scope.Details.length ; j++) {

            $scope.Details[j].varcodeObjs.forEach(function (el, i) {
               
                assignedGroupsIds[el.FBarcodeGenId] = $scope.Details[j].varcodeObjs[i];
            });
        }
       

        for (var i in groupsIds) {
            var tr = assignedGroupsIds.hasOwnProperty(i);
            if (!assignedGroupsIds.hasOwnProperty(i)) {
                
                result.push(groupsIds[i]);
            }
           
            defer.resolve(result);
        }
        return defer.promise;

    }
    //#endregion Load From Barcode Data Nozzle
    $scope.reloadNozzle = function () {

        if (processMode != $scope.Head.ProcessMode) {
            isNozzleEmpty = 0;
            for (var i = 0; i < $scope.Details.length; i++) {
                $scope.Details[i].varcodeObjs = [];
                $scope.Details[i].TncId = "";
                $scope.Details[i].ManualWeight = null;
                $scope.Details[i].FabricWeight = null;
            }
            $scope.IsLoaderActive = false;
        }
        
    }

    function RefreshNozzle() {
        
        if (processMode != $scope.Head.ProcessMode) {
            isNozzleEmpty = 0;
            for (var i = 0; i < $scope.Details.length; i++) {
                $scope.Details[i].varcodeObjs = [];
                $scope.Details[i].TncId = "";
                $scope.Details[i].ManualWeight = null;
                $scope.Details[i].FabricWeight = null;

            }
        }
        
    }

    $scope.Refresh = function () {
       
        refresh();
    }
    function refresh() {
        $scope.Head = {};
        $scope.BatchDate = "";
        $scope.PlanNo = "";
        $scope.BatchNo = "";
        processMode = 0;
        isNozzleEmpty = 0;
        for (var i = 0; i < $scope.Details.length; i++) {
            $scope.Details[i].varcodeObjs = [];
            $scope.Details[i].TncId = "";
            $scope.Details[i].ManualWeight = null;
            $scope.Details[i].FabricWeight = null;

        }
    }

}]);

