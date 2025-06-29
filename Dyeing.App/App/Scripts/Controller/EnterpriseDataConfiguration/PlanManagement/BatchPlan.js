app.controller("BatchPlan", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {
    var currentJob;
    var previousJob;
    var colorClass = "";
    var SfList =[];
    $scope.chkPlan = [];
    $scope.allCheck = false;
    $scope.totalPlanQty = 0;
    $scope.BatchData = [];
   // $scope.BatchData = [];
   
    let MaximumBatch = 0;
    let checkfixedcopy = [];

    let MaxCountBatch = [];

    

    let MaxUniqueId = 0;
    let resultString = '';

    //variable for save data
    let labdipData = [];
    let BatchplanData = [];
    let NewColor = [];



    $scope.Enzyme = [{ "Value": "Yes" }, { "Value": "No" }]
    
    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBuyerData();
        }
    });

    PlanManagement.GetOFabricOperationData(function (data) {
      $scope.OFabOpList = data;
      SfList = data;
    });

    PlanManagement.GetBodyPart(function (data) {
        $scope.BodyPartList = data;
    });

    PlanManagement.GetFinMcByType('Dyeing', function (data) {
        $scope.MachineList = data;
    });

    $scope.LoadBuyerData = function () {

        $scope.isLoading = false;
        $scope.isLoading = true;
        PlanManagement.GetBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;

            $scope.isLoading = false;
        });
    }

    $scope.LoadProcessData = function () {
        $scope.isLoading = false;
        $scope.isLoading = true;
        PlanManagement.GetBatchPlanData($scope.Unit.Id, $scope.Buyer.BuyerId, function (data) {
            $scope.PlanData = data;   
            $scope.isLoading = false;
            //angular.forEach($scope.PlanData, function (item) {
            //    item.YarnType = extractItemNames(item.Composition, 'C');
            //    item.YarnCount = extractItemNames(item.Composition, '0');
            //});
            //$scope.bchkPlan = [];
            $scope.chkPlan = [];


            


        });  
    }

    $scope.getRowClass = function ($index) {
        if ($index == 0) {
            currentJob = $scope.PlanData[0].JobNo;
            colorClass = 'table-white';
            return 'table-white';
        }
        else {
            currentJob = $scope.PlanData[$index].JobNo;
            previousJob = $scope.PlanData[$index - 1].JobNo;

            if (currentJob != previousJob) {
                if (colorClass == 'table-white')
                    colorClass = 'table-success';
                else
                    colorClass = 'table-white';
            }
            else {

            }
            return colorClass;
        }
    };
    
    $scope.checkJob = function (dataModel) {
        if (!dataModel.chkJob) {
            let isExist = $scope.chkPlan.filter(x => x.JobNo == dataModel.JobNo);
            if ($scope.chkPlan.length == 0 || isExist.length > 0) {
                dataModel.GroupNo = 1;
                dataModel.SeqNo = $scope.chkPlan.length + 1;

                dataModel.chkJob = true;
                $scope.chkPlan.push(dataModel);
            } else {
                $rootScope.alert('Please! Select same job row before start Batch Planning....');
                //dataModel.chkJob = false;
            }
        } else {
            let curIndex = $scope.chkPlan.indexOf(x => x.JobNo == dataModel.JobNo);
            $scope.chkPlan.splice(curIndex, 1);
        }

        checkfixedcopy = JSON.parse(JSON.stringify($scope.chkPlan));
        checkfixed = JSON.parse(JSON.stringify($scope.chkPlan));

    }

    $scope.duplicate = function (model, indx) {
        let data = angular.copy(model);
        // Step 1: First, shift SeqNo +1 for all items AFTER (or equal to) the one you clicked
        for (let i = 0; i < $scope.chkPlan.length; i++) {
            let currData = $scope.chkPlan[i];
            if ((currData.GroupNo == model.GroupNo) && (currData.SeqNo > model.SeqNo)) {
                $scope.chkPlan[i].SeqNo += 1;
            }
        }
        // Step 2: Now, insert the new data with correct SeqNo
        data.SeqNo = model.SeqNo + 1;
        $scope.chkPlan.splice(indx + 1, 0, data);

        // Step 3: Optional - re-sort the array if needed
        $scope.chkPlan.sort((a, b) => a.SeqNo - b.SeqNo);
    };

    //$scope.duplicate = function (model, indx) {
    //    debugger
    //    let data = angular.copy(model);
    //    for (i = 0; i < $scope.chkPlan.length; i++) {
    //        let currData = $scope.chkPlan[i];
    //        if ((currData.GroupNo == model.GroupNo) && (currData.SeqNo >= model.SeqNo)) {
    //            $scope.chkPlan[i].SeqNo += 1;
    //        }
    //    }
    //    data.SeqNo = data.SeqNo === 1 ? 1 : (model.SeqNo + 1);

    //    $scope.chkPlan.splice(indx, 0, data);
    //}


    ////Duplicate a row

    //$scope.duplicateb = function (model, indx) {
    //    let data = angular.copy(model);
    //    for (i = 0; i < $scope.bchkPlan.length; i++) {
    //        let currData = $scope.bchkPlan[i];
    //        if ((currData.GroupNo == model.GroupNo) && (currData.SeqNo >= data.SeqNo)) {
    //            $scope.bchkPlan[i].SeqNo += 1;
    //        }
    //    }
    //    data.SeqNo = data.SeqNo === 1 ? 1 : (model.SeqNo + 1);

    //    $scope.bchkPlan.splice(indx , 0, data);
    //}
    $scope.remove = function (r) {
        let remModel = $scope.chkPlan[r];

        // Step 1: Remove the item
        $scope.chkPlan.splice(r, 1);

        // Step 2: Adjust SeqNo for items in the same group after the removed item
        for (let i = 0; i < $scope.chkPlan.length; i++) {
            let currData = $scope.chkPlan[i];
            if (currData.GroupNo == remModel.GroupNo && currData.SeqNo > remModel.SeqNo) {
                currData.SeqNo -= 1;
            }
        }

        // Step 3: Check if the group has no more items
        let groupExists = $scope.chkPlan.some(item => item.GroupNo == remModel.GroupNo);
        $scope.chkPlan.sort((a, b) => a.GroupNo - b.GroupNo || a.SeqNo - b.SeqNo);
    };


    //$scope.remove = function (r) {
    //    debugger
    //    let remModel = $scope.chkPlan[r];
    //    $scope.chkPlan.splice(r, 1);
    //    for (i = 0; i < $scope.chkPlan.length; i++) {
    //        let currData = $scope.chkPlan[i];
    //        if (currData.GroupNo == remModel.GroupNo && currData.SeqNo >+ remModel.SeqNo) {
    //            $scope.chkPlan[i].SeqNo -= 1;
    //        }
    //    }
        
    //}

    //delete a row

    //$scope.removeb = function (r) {
    //    let remModel = $scope.bchkPlan[r];
    //    $scope.bchkPlan.splice(r, 1);
    //    for (i = 0; i < $scope.bchkPlan.length; i++) {
    //        let currData = $scope.bchkPlan[i];
    //        if (currData.GroupNo == remModel.GroupNo && currData.SeqNo >= remModel.SeqNo) {
    //            $scope.bchkPlan[i].SeqNo -= 1;
    //        }
    //    }

    //    //calcTPlanQty($scope.bchkPlan);
    //    angular.forEach($scope.bchkPlan, function (item) {
    //        SpecialFinish(item);
    //    });
    //}

    $scope.copy = function (model) {
        let planData = $scope.chkPlan.filter(x => x.GroupNo == model.GroupNo);
        let targetGroupNo = $scope.chkPlan.findIndex(x => x.GroupNo === model.GroupNo);

        //max GroupNo
        const maxGroupNo = Math.max(...$scope.chkPlan.map(m => m.GroupNo));
        const newGroupNo = maxGroupNo + 1;

        const newGroup = planData.map((m, index) => {
            return {
                ...angular.copy(m),
                GroupNo: newGroupNo,
                SeqNo: index + 1,
                NoOfBatch: '',
                MaxCountBatch: '',
                BatchNos: ''
            };
        });

        // Find insertion index
        const indexAfterTarget = targetGroupNo + 1;

        // Insert new group at that index
        $scope.chkPlan.splice(indexAfterTarget, 0, ...newGroup);

        // Optional: sort the list by GroupNo and SeqNo
        $scope.chkPlan.sort((a, b) => a.GroupNo - b.GroupNo || a.SeqNo - b.SeqNo);

    }
    

    $scope.delete = function (model) {
        let Find = $scope.chkPlan.filter(x => x.GroupNo == model.GroupNo);
        let FindIndex = $scope.chkPlan.findIndex(x => x.GroupNo === model.GroupNo);
        
        $scope.chkPlan.splice(FindIndex, Find.length);
    }

    $scope.showbtn = function (model) {
        const maxGroupNo = Math.max(...$scope.chkPlan.map(m => m.GroupNo));
        if (maxGroupNo == model.GroupNo)
            return true;
        else
            return false;
    }

    $scope.checkForEdit = function (model) {
        const maxGroupNo = Math.max(...$scope.chkPlan.map(m => m.GroupNo));
        if (maxGroupNo == model.GroupNo)
            return 'pointer-auto';
        else
            return 'pointer-none';
    }

    $scope.rowSpan = function (data) {
        return $scope.chkPlan.filter(x => x.GroupNo === data.GroupNo).length;
    }

    $scope.rowSpanB = function (data) {
        return $scope.bchkPlan.filter(x => x.GroupNo === data.GroupNo).length;
    }
    
    $scope.showEl = function (data) {
        if (data.SeqNo == 1)
            return true;
        else

            return false;
    }

    $scope.showB = function (data) {
        return 'pointer-events: none;'
    }


    function NoOfBatchChangeF(Model, UniqueId, noofBatch, MinB, MaxB, MaxBatchCount) {
        MaxUniqueId = MaxBatchCount;
        let PrevTBatch = 0;
        if (Model.NoOfBatch == 0) {
            Model.BatchNos = '';
            return;
        }  
        else if (Model.NoOfBatch < MinB) {
            PrevTBatch = MinB-1;
        }
        else if (Model.NoOfBatch > MaxB) {
            PrevTBatch = MaximumBatch;
        }
        else {
            PrevTBatch = MinB-1;
        }
        PlanManagement.GenBatchNoByJob($scope.Unit.Id, Model.JobNo, noofBatch, PrevTBatch, function (data) {
            $scope.BatchData = [];
            totalBatchData = [];
            // Find the maximum BatchNo
            const maxBatchNo = data
                .map(item => item.BatchNo)
                .sort((a, b) => b.localeCompare(a))[0];
            const lastPart = maxBatchNo.split('-').pop();
            let batchno = data;
            angular.forEach(batchno, function (item) {

                let obj = {
                    InitInfoId: Model.InitInfoId,
                    GroupNo: Model.GroupNo,
                    SeqNo: Model.SeqNo,
                    BatchNo: item.BatchNo,
                    MaxBatchCount: lastPart
                }
                $scope.BatchData.push(obj); 
            });
            Model.BatchNos = $scope.BatchData.map(item => item.BatchNo).join("\n");
            
        });
    }

    $scope.NoOfBatchChange = function (model, modelGroupNo, modelNoOfBatch, modelMinBatch, modelMaxBatch, bit) {

        const lastPart = "";
        if (model.GroupNo === $scope.chkPlan[0].GroupNo) {
            PlanManagement.GenBatchNoByJob($scope.Unit.Id, model.JobId, model.NoOfBatch, 9, 0, function (data) {
                totalBatchData = [];
                // Find the maximum BatchNo
                const maxBatchNo = data
                    .map(item => item.BatchNo)
                    .sort((a, b) => b.localeCompare(a))[0];
                const lastPart = maxBatchNo.split('-').pop();
                let batchno = data;

                angular.forEach(data, function (item) {
                    let obj = {
                        InitInfoId: model.InitInfoId,
                        GroupNo: model.GroupNo,
                        SeqNo: model.SeqNo,
                        BatchNo: item.BatchNo,
                        MaxBatchCount: lastPart
                    }
                    totalBatchData.push(obj);
                    $scope.BatchData.push(obj);
                });
                model.MaxBatchCount = lastPart;
                model.BatchNos = totalBatchData.map(item => item.BatchNo).join("\n");
                let filterModel = $scope.chkPlan.filter(x => x.GroupNo === model.GroupNo);
                angular.forEach($scope.chkPlan, function (item) {
                    if (item.GroupNo === model.GroupNo) {
                        item.NoOfBatch = filterModel[0].NoOfBatch;
                        item.MaxBatchCount = filterModel[0].MaxBatchCount;
                    }

                });
            });
        }
       // else if (model.GroupNo === $scope.chkPlan[0].GroupNo) return;
        else {
            let FindIndex = $scope.chkPlan.findIndex(x => x.GroupNo === model.GroupNo);
            const fixModel = $scope.chkPlan[FindIndex - 1];
            PlanManagement.GenBatchNoByJob($scope.Unit.Id, model.JobId, model.NoOfBatch, fixModel.MaxBatchCount,1, function (data) {
                
                totalBatchData = [];
                // Find the maximum BatchNo
                const maxBatchNo = data
                    .map(item => item.BatchNo)
                    .sort((a, b) => b.localeCompare(a))[0];
                const lastPart = maxBatchNo.split('-').pop();
                let batchno = data;
                angular.forEach(batchno, function (item) {

                    let obj = {
                        InitInfoId: model.InitInfoId,
                        GroupNo: model.GroupNo,
                        SeqNo: model.SeqNo,
                        BatchNo: item.BatchNo,
                        MaxBatchCount: lastPart
                    }
                    totalBatchData.push(obj);
                    $scope.BatchData.push(obj);
                });
                model.BatchNos = totalBatchData.map(item => item.BatchNo).join("\n");
                model.MaxBatchCount = lastPart;
                let filterModel = $scope.chkPlan.filter(x => x.GroupNo === model.GroupNo);
                angular.forEach($scope.chkPlan, function (item) {
                    if (item.GroupNo === model.GroupNo) {
                        item.NoOfBatch = filterModel[0].NoOfBatch;
                        item.MaxBatchCount = filterModel[0].MaxBatchCount;
                    }

                });
            });
        }


        
    }

    $scope.TotalPlanQuatity = function () {
        let a = 0;
        angular.forEach($scope.bchkPlan, function (item) {
            a = a + item.TotalQty;
            
        });
        return a;
    }

    $scope.calcTotalPQty = function (model) {
        calcTPlanQty(model);
    }

    function calcTPlanQty(model) {

        let planQty = 0;
        for (i = 0; i < $scope.chkPlan.length; i++) {
            let group = $scope.chkPlan[i].GroupNo;
            let pQty = $scope.chkPlan[i].PlanQty;
            if (group == model.GroupNo) {
                if (i > 0) {
                    $scope.chkPlan[i].NoOfBatch = model.NoOfBatch;//$scope.chkPlan[i - 1].NoOfBatch;
                }
                let noOfBatch = $scope.chkPlan[i].NoOfBatch;
                if (noOfBatch == null)
                    noOfBatch = 0;
                if (pQty == null)
                    pQty = 0;

                $scope.chkPlan[i].TotalQty = pQty * noOfBatch;
            }
            planQty += parseInt($scope.chkPlan[i].TotalQty);
        }
        $scope.totalPlanQty = planQty;

    }

    $scope.calcTotalPQtyB = function (model) {
        calcTPlanQtyB(model);
    }

    function calcTPlanQtyB(model) {
        let planQty = 0;
        for (i = 0; i < $scope.bchkPlan.length; i++) {
            let group = $scope.bchkPlan[i].GroupNo;
            let pQty = $scope.bchkPlan[i].PlanQty;
            if (group === model.GroupNo) {
                if (i > 0) {
                    $scope.chkPlan[i].NoOfBatch = model.NoOfBatch;//$scope.chkPlan[i - 1].NoOfBatch;
                }
                let noOfBatch = $scope.bchkPlan[i].NoOfBatch;
                if (noOfBatch == null)
                    noOfBatch = 0;
                if (pQty == null)
                    pQty = 0;  
                $scope.bchkPlan[i].TotalQty = pQty * noOfBatch;
            }
            planQty += parseInt($scope.bchkPlan[i].TotalQty);
        }
    }

    $scope.actionDialog = function (action, dataModel) {
        for (let i = 0; i < $scope.chkPlan.length; i++) {
            const Model = $scope.chkPlan[i];
            for (let j = 0; j < $scope.chkPlan.length; j++) {
                if (Model.GroupNo === $scope.chkPlan[j].GroupNo) {
                    $scope.chkPlan[j].PlanFromDate = toSqlServerDatetimeLocal(Model.PlanFromDate);
                    $scope.chkPlan[j].PlanToDate = toSqlServerDatetimeLocal(Model.PlanToDate);
                    $scope.chkPlan[j].Remarks = Model.Remarks;
                }
            }
        }

        angular.forEach($scope.PlanData.filter(x => x.chkJob == true), function (item) {

            labdipData.push({
                InitInfoId: item.InitInfoId,
                LabDipNo: item.LabDipNo
            });
        });
        angular.forEach($scope.PlanData.filter(x => x.chkJob == true), function (item) {
            /*Dyed color Object Create*/
            let color = {
                InitInfoId: item.InitInfoId,
                DyedColor: item.DyedColor,
                YarnBrand: item.YarnBrand,
                YarnLot: item.YarnLot,
                YarnType: item.YarnType,
                YarnCount: item.YarnCount
            };
            NewColor.push(color);
        });

        let a = $scope.chkPlan;

        angular.forEach($scope.chkPlan, function (item) {
            let obj = {
                InitInfoId: item.InitInfoId,
                GroupNo: item.GroupNo,
                SeqNo: item.SeqNo,
                BodyPartId: item.BodyPartId,
                FromDate: item.PlanFromDate,
                ToDate: item.PlanToDate,
                PlanQty: item.PlanQty,
                NoOfBatch: item.NoOfBatch,
                Remarks: item.Remarks === undefined ? '' : item.Remarks,
                Enzyme: item.Enzyme === undefined ? '' : item.Enzyme,
                SpecialFinish: '',
                Process: item.Process === undefined ? '' : item.Process,
                MPUniqueId: 0
            }
            BatchplanData.push(obj);
        });

        //for validation check

        let count = 0;

        angular.forEach($scope.chkPlan, function (item) {
            if (!item.PlanFromDate || !item.PlanToDate || !item.PlanQty || !item.NoOfBatch || !item.BodyPartId) {
                count++;
            }
        });

        if (count > 0)
            return;
        
        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {

                    SaveUpdate();
                }
                if (mode == 'cancel') {

                }
                
            });
    }



    function objData(action) {

        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch Data?' };
        }
        return obj;
    }

    function SaveUpdate() {
        debugger
        let obj = {
            Comb: resultString,
            UnitId: $scope.Unit.Id,
            UserId: $rootScope.UserId,
            batch: $scope.BatchData,
            Plan: BatchplanData,
            dyedColor: NewColor,
            LabDipDatas:  labdipData
        }
        PlanManagement.BatchPlan_SaveUpdate(obj, function (res) {
            debugger
            if (res.ErrorMsg == null) {
                labdipData = [];
                resultString = "";
                $scope.BatchData = [];
                BatchplanData = [];
                NewColor = [];
                $scope.LoadProcessData();
                $scope.bchkPlan = [];
                $scope.chkPlan = [];
                $scope.BatchData = [];
                planData = [];
                $scope.PlanData = [];
                
                $rootScope.alert(res.Msg);

            }
            else $rootScope.alert(res.ErrorMsg);
        });
    }

    $scope.cancel = function () {
        $mdDialog.cancel();
        MaximumBatch = 0;
        resetData();
        $scope.chkPlan = [];
        $scope.BatchData = [];
        //angular.forEach($scope.chkJob, function (item) {
        //    item.LabDipNo = '';
        //});
    };

    

    var ts = Math.floor(Date.now() / 1000);

    $scope.MPlanPopup = function (ev) {

        let InitInfoModel = [];
        $scope.BatchData = [];
        $scope.chkPlan = angular.copy(checkfixedcopy);
        batchList = "";
        angular.forEach($scope.chkPlan, function (x) {
            let a = {
                InitInfoId: x.InitInfoId
            };
            InitInfoModel.push(a);
        });
        const uniqueIds = [...new Set(InitInfoModel.map(item => item.InitInfoId))];
         resultString = uniqueIds.join(',');
        $scope.bchkPlan = [];
        if (!$scope.bchkPlan || $scope.bchkPlan.length === 0) {
            PlanManagement.GetBatchDataByInitId(InitInfoModel, resultString, $scope.chkPlan[0].JobId, function (data) {
                MaxCountBatch = data.m_Item2;
                MaxC = 0;
                
                MaximumBatch = parseInt(MaxCountBatch[0].MaxBatchCount) === NaN ? 0 : parseInt(MaxCountBatch[0].MaxBatchCount);
                if (data.m_Item1[0].msg === 'NoData') {
                    $scope.bchkPlan = [];
                    angular.forEach($scope.chkPlan, function (item) {
                        //item.Remarks = '';  
                        //item.Enzyme = '';
                        //item.Process = '';
                        //item.PlanQty = '';
                        //item.PlanFromDate = '';
                        //item.PlanToDate = '';
                        //item.NoOfBatch = '';
                        //item.TotalQty = '';
                        //item.BatchNos = '';
                        //item.isExist = '';
                    });

                }
                else if (data.m_Item1.length != 0) {
                    $scope.bchkPlan = data.m_Item1;
                    let Counter = 0;
                    angular.forEach($scope.bchkPlan, function (item) {
                        let SelectItem = data.m_Item2;
                        item.noofBatch = item.noofBatch;
                        MaximumBatch = parseInt(SelectItem[0].MaxBatchCount) === NaN ? 0 : parseInt(MaxCountBatch[0].MaxBatchCount);
                        MaxUniqueId = SelectItem[0].MaxUniqueId;
                        item.TotalQty = item.NoOfBatch * item.PlanQty;
                        item.SpecialFinishList = item.SpecialFinishList === undefined ? SfList : item.SpecialFinishList;
                        item.SpecialFinish = item.SpecialFinish;
                        //item.isExist = 1;
                        if (item.BatchNos === undefined || item.BatchNos == null)
                            NoOfBatchChangeF(item, item.GroupNo, item.NoOfBatch, item.MinBatch, item.MaxBatch, MaximumBatch);
                        else
                            item.BatchNos = item.BatchNos.split(",").join("\n");
                    });
   
                    angular.forEach($scope.chkPlan, function (item) {
                        item.GroupNo = MaxUniqueId + 1;
                        item.Remarks = '';
                        item.Enzyme = '';
                        item.Process = '';
                        item.PlanQty = '';
                        item.PlanFromDate = '';
                        item.PlanToDate = '';
                        item.NoOfBatch = 0;
                        item.TotalQty = '';
                        item.BatchNos = '';
                        item.isExist = '';
                        item.noofBatch = item.noofBatch;
                    });
                };

            });
            $mdDialog.show({
                async: false,
                controller: BPlanController,
                templateUrl: '/App/template/Popup/BPlanPopup.html?ts=' + ts,
                targetEvent: ev,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    models: $scope.bchkPlan
                }
            });
            
        }
        else {
            alert('Error');
        }

        

        
 
    }


    //Custom Popup
    //$scope.SpFinishPopup = function (ev,id) {
    //    $mdDialog.show({
    //        async: false,
    //        controller: DialogController,
    //        templateUrl: '/App/template/Popup/SpecialFinishDialog.html?ts=' + ts,
    //        targetEvent: ev,
    //        scope: $scope,
    //        preserveScope: true,
    //        clickOutsideToClose: true,
    //        fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
    //        locals: {
    //            InitInfoId: id
    //        }
    //    })  
    //};

    //$scope.SpFinishPopupBatch = function (ev,id) {
    //    $mdDialog.show({
    //        async: false,
    //        controller: SpFinishControllerBatch,
    //        templateUrl: '/App/template/Popup/SpecialFinishDialogBatch.html?ts=' + ts,
    //        targetEvent: ev,
    //        scope: $scope,
    //        preserveScope: true,
    //        clickOutsideToClose: false,
    //        fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
    //        locals: {
    //            Index: id
    //        }
    //    })
    //};

    function resetData() {
        if ($scope.PlanData.length > 0) {
            angular.forEach($scope.PlanData, function (item) {
                item.chkJob = false;
            });
            checkfixedcopy = [];
        }

    }

    function DialogController($scope, $mdDialog, InitInfoId) {
        
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();

        };

        $scope.sf = $scope.bchkPlan.filter(x => x.InitInfoId == InitInfoId);
    }

    //function SpFinishControllerBatch($scope, $mdDialog, Index){

    //    $scope.MPlanPopup(ev);

    //    //angular.forEach($scope.bchkPlan, function (item) {
    //    //    SpecialFinish(item);
    //    //});
    //    //$scope.sf1 = [];
    //    //$scope.sf1 = $scope.bchkPlan[0].SpecialFinishList;
    //}

    function BPlanController($scope,$mdDialog){
        
        $scope.hide = function () {
            $mdDialog.hide();
            MaximumBatch = 0;
            resetData();
            $scope.chkPlan = [];
            $scope.BatchData = [];
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
            MaximumBatch = 0;
            resetData();
            $scope.chkPlan = [];
            $scope.BatchData = [];
        };
        $scope.bchkPlan = [];

        
    }

    //Special  Finish list to comma separated string ('4,5,8')
    //function Special(models) {
    //    let AllSf = [];
    //    let allSpecialFinishes = [];
    //    models.forEach(obj => {

    //        if (obj.SpecialFinishList != "") {
    //            let a = obj.SpecialFinishList.filter(x => x.FabOp == true);
    //            allSpecialFinishes = allSpecialFinishes.concat(a.map(item => item.id));
    //            var arrList = allSpecialFinishes.map(a => {
    //                return a;
    //            }).join(',');
    //            obj.SpecialFinish = arrList;
    //        }
    //        else if (obj.SpecialFinish != "") {
    //            allSpecialFinishes = allSpecialFinishes.concat(obj.SpecialFinish.split(',').map(Number));
    //        }
    //        else {
    //            return;
    //        } 

    //        //const exists = allSpecialFinishes.some(finish => finish === value);

    //        //if (!exists) {
                 
    //        //}
            
    //    });
        
    //    //angular.forEach(models, function (item) {
    //    //    SpecialFinish(item);
    //    //});
    //}

    //Comma separated string to Special Finish list

    //function SpecialFinish(model) {
    //    let numberA = [];
    //    let SfListString = JSON.stringify(SfList); // Convert object to JSON string
    //    let newList = JSON.parse(SfListString);

    //    if (model.SpecialFinish) {
    //        numberA = model.SpecialFinish.split(',').map(Number);

    //        // Iterate over the array of objects
    //        newList.forEach(obj => {

    //            // Check if the current object's ID is in the idArray
    //            if (numberA.includes(obj.id)) {
    //                // Add the new attribute to the object
    //                obj.FabOp = true;
    //            }
    //        });
    //        model.SpecialFinishList = newList;
    //    }
    //    else {
    //        //model.SpecialFinishList = model.SpecialFinishList == "" ? newList : $scope.chkPlan[0].SpecialFinishList;
    //        model.SpecialFinishList = (model.SpecialFinishList == "" || model.SpecialFinishList == null) ? newList : SfList;
    //    }
    //    newList = SfList;

    //}


    //Get YarnType,YarnCount
    //function extractItemNames(dataString, type) {
    //    // Split the input string by '+'
    //    let items = dataString.split('+');
    //    let itemNames = [];
    //    let itemName = '';
    //    // Loop through each item and extract the ItemName
    //    items.forEach(function (item) {
    //        // Split each item by '-' and take the first part as ItemName
    //        let parts = item.split('-');
    //        if (type == 'C')
    //            itemName = parts[0].trim(); // Get the ItemName and trim any whitespace
    //        else
    //            itemName = parts[parts.length - 1].trim();
    //        itemName = itemName.replace(/\(.*?\)/g, '').trim(); 
    //        if (itemName) {
    //            itemNames.push(itemName); // Add to the array if it's not empty
    //        }
    //    });

    //    // Join the ItemNames into a comma-separated string
    //    return itemNames.join(', ');
    //};
    
    function filterUniqueBatchNo(data) {
        const uniqueBatchNos = new Set(); // To track unique BatchNo values
        return data.filter(item => {
            if (uniqueBatchNos.has(item.BatchNo)) {
                return false; // Skip if BatchNo is already in the set
            }
            uniqueBatchNos.add(item.BatchNo); // Add new BatchNo to the set
            return true; // Include this item in the filtered list
        });
    };

    function toSqlServerDatetimeLocal(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


}]);