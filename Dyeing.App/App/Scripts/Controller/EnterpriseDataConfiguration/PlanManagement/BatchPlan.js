
app.controller("BatchPlan", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    // 🔧 --- Variable declarations and setup ---
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

    let machineNo = 0;

    let MaxUniqueId = 0;
    let resultString = '';

    // Temporary storage for saving
    let labdipData = [];
    let BatchplanData = [];
    let NewColor = [];

     // ⚙️ Machine change event
    $scope.MachineChange = function (obj,Machine) {
        var m = Machine;
        for (i = 0; i < $scope.chkPlan.length; i++) {
            if (obj.GroupNo == $scope.chkPlan[i].GroupNo) {
                machineNo = obj.Machine;
                $scope.chkPlan[i].Machine = obj.Machine;
                $scope.chkPlan[i].MCapacity = obj.Machine.MCapacity;
                $scope.chkPlan[i].MDId = obj.Machine.MDId;
                //machineNo = obj.Machine;
                //$scope.chkPlan[i].Machine = obj.Machine;
               
            }
        }
    }

    // 🔹 Enzyme dropdown options
    $scope.Enzyme = [{ "Value": "Yes" }, { "Value": "No" }]

    // 🔹 Load all units
    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBuyerData();
            
        }
    });

    // 🔹 Load fabric operations for planning
    PlanManagement.GetOFabricOperationData(function (data) {
      $scope.OFabOpList = data;
      SfList = data;
    });

    // 🔹 Load body parts data
    PlanManagement.GetBodyPart(function (data) {
        $scope.BodyPartList = data;
    });

    // 🔹 Load machines by type
    PlanManagement.GetFinMcByType('Dyeing', function (data) {
        $scope.MachineList = data;
    });

     // 🔹 Load buyer dropdown data
    $scope.LoadBuyerData = function () {
        $rootScope.ShowLoader("Loading Buyer Data...");
        PlanManagement.GetBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;
            PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
                $scope.MachineList = data;
                $rootScope.HideLoader();
            });
        });
    }

    // 🔹 Load Job dropdown data
    $scope.LoadJobData = function () {
        $rootScope.ShowLoader("Loading Job Data");

        PlanManagement.GetJobByBuyer($scope.Buyer.BuyerId, function (data) {
            $scope.JobList = data;
            $scope.allInitialData = '';
            $scope.allCheck = false;
            $rootScope.HideLoader();
        });
    }

    // 🔹 Load plan data (main table)
    $scope.LoadProcessData = function () {
        $rootScope.ShowLoader('Loading Plan Data');
        if (!$scope.Unit || !$scope.Buyer) {
            $rootScope.HideLoader();
            return;
        }

        if ($scope.Job === undefined || $scope.Job === null)
            var job = 0;
        else
            var job = $scope.Job.JobId;

        PlanManagement.GetBatchPlanData($scope.Unit.Id, $scope.Buyer.BuyerId, job, function (data) {
            $scope.PlanData = data;
            //angular.forEach($scope.PlanData, function (item) {
            //    item.YarnType = extractItemNames(item.Composition, 'C');
            //    item.YarnCount = extractItemNames(item.Composition, '0');
            //});
            //$scope.bchkPlan = [];
            $scope.chkPlan = [];
            $rootScope.HideLoader();
        });  
    }

    // 🔹 Multiple bodypart can not insert in a same batch
    $scope.changeDataModel = function (model) {
        var count = $scope.chkPlan.filter(x => x.GroupNo === model.GroupNo && x.BodyPartId === model.BodyPartId);
        if (count.length > 1) {
            model.BodyPartId = undefined;
            return;
        }
    }

    // 🎨 Alternate row color grouping by JobNo
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

    // ✅ Handle row checkbox selection for job
    $scope.checkJob = function (dataModel, index, event) {

        if (!dataModel.chkJob) {

            let isExist = $scope.chkPlan.filter(x => x.JobNo === dataModel.JobNo);

            let isSameColor = $scope.chkPlan.every(x => x.Color === dataModel.Color);

            if ($scope.chkPlan.length == 0 || (isExist.length > 0 && isSameColor )) {
                dataModel.GroupNo = 1;
                dataModel.SeqNo = $scope.chkPlan.length + 1;

                dataModel.chkJob = true;
                event.target.checked = true;
                $scope.chkPlan.push(dataModel);
            }
            else {
                $rootScope.alert('Please! Select same job row before start Batch Planning....');
                dataModel.chkJob = false;
                event.target.checked = false;
                //if (index === 1) $scope.PlanData[index].chkJob = false;
            }
        } else {
            let curIndex = $scope.chkPlan.indexOf(x => x.JobNo === dataModel.JobNo);
            $scope.chkPlan.splice(curIndex, 1);
            dataModel.chkJob = false;
            event.target.checked = false;
        }

        checkfixedcopy = JSON.parse(JSON.stringify($scope.chkPlan));
        checkfixed = JSON.parse(JSON.stringify($scope.chkPlan));
    }

    // 🔁 Duplicate a row (same group)
    $scope.duplicate = function (model, indx) {
        debugger
        let data = angular.copy(model);
        data.BodyPartId = undefined;
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

    // 🗑️ Remove a selected row
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

    // 📄 Copy entire group of rows
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
                BatchNos: '',

                Enzyme: undefined
            };
        });
        // Find insertion index
        const indexAfterTarget = targetGroupNo + 1;

        // Insert new group at that index
        $scope.chkPlan.splice(indexAfterTarget, 0, ...newGroup);

        // Optional: sort the list by GroupNo and SeqNo
        $scope.chkPlan.sort((a, b) => a.GroupNo - b.GroupNo || a.SeqNo - b.SeqNo);

    }

    // ❌ Delete an entire group
    $scope.delete = function (model) {

        let Find = $scope.chkPlan.filter(x => x.GroupNo == model.GroupNo);
        let FindIndex = $scope.chkPlan.findIndex(x => x.GroupNo === model.GroupNo);
        
        $scope.chkPlan.splice(FindIndex, Find.length);

        $scope.BatchData = $scope.BatchData.filter(function (item) {
            return item.GroupNo !== model.GroupNo;
        });
    }

    // 👁️ Show button only for last group
    $scope.showbtn = function (model) {
        const maxGroupNo = Math.max(...$scope.chkPlan.map(m => m.GroupNo));
        if (maxGroupNo == model.GroupNo)
            return true;
        else
            return false;
    }

    // 👀 Control pointer events based on group
    $scope.checkForEdit = function (model) {
        const maxGroupNo = Math.max(...$scope.chkPlan.map(m => m.GroupNo));
        if (maxGroupNo == model.GroupNo)
            return 'pointer-auto';
        else
            return 'pointer-none';
    }

    // 📏 Calculate row span for table
    $scope.rowSpan = function (data) {
        return $scope.chkPlan.filter(x => x.GroupNo === data.GroupNo).length;
    }
    $scope.rowSpanB = function (data) {
        return $scope.bchkPlan.filter(x => x.GroupNo === data.GroupNo).length;
    }

    // 👀 Helpers for visibility and pointer control
    $scope.showEl = function (data) {
        if (data.SeqNo == 1)
            return true;
        else

            return false;
    }
    $scope.showB = function (data) {
        return 'pointer-events: none;'
    }

    // 🔢 Internal function for batch number generation
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

    // 🔹 Triggered when NoOfBatch input changes
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
                    
                });

                model.MaxBatchCount = lastPart;
                model.BatchNos = totalBatchData.map(item => item.BatchNo).join("\n");
                let filterModel = $scope.chkPlan.filter(x => x.GroupNo === model.GroupNo);
                angular.forEach($scope.chkPlan, function (item) {
                    if (item.GroupNo === model.GroupNo) {
                        item.NoOfBatch = filterModel[0].NoOfBatch;
                        item.MaxBatchCount = filterModel[0].MaxBatchCount;
                        item.BatchNos = model.BatchNos;
                    }

                });

                $scope.addBatchDataArray(totalBatchData);
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
                    
                });
                model.BatchNos = totalBatchData.map(item => item.BatchNo).join("\n");
                model.MaxBatchCount = lastPart;
                let filterModel = $scope.chkPlan.filter(x => x.GroupNo === model.GroupNo);
                angular.forEach($scope.chkPlan, function (item) {
                    if (item.GroupNo === model.GroupNo) {
                        item.NoOfBatch = filterModel[0].NoOfBatch;
                        item.MaxBatchCount = filterModel[0].MaxBatchCount;
                        item.BatchNos = model.BatchNos;
                    }

                });

                $scope.addBatchDataArray(totalBatchData);
            });
        }

    }

    // 🧩 Merge or update BatchData array
    $scope.addBatchDataArray = function (objArray) {

        if (!objArray || objArray.length === 0) return;

        // Get the group numbers in the new array
        var newGroupNos = objArray.map(function (obj) { return obj.GroupNo; });

        // Remove all existing objects that have a GroupNo present in the new array
        for (var i = $scope.BatchData.length - 1; i >= 0; i--) {

            if (newGroupNos.indexOf($scope.BatchData[i].GroupNo) !== -1) {

                $scope.BatchData.splice(i, 1);
            }
        }

        // Add all new objects
        Array.prototype.push.apply($scope.BatchData, objArray);

    };


    // 🧮 Calculate total plan quantity
    $scope.TotalPlanQuatity = function () {
        let a = 0;
        angular.forEach($scope.bchkPlan, function (item) {
            a = a + item.TotalQty;
            
        });
        return a;
    }

    // 🔹 Calculate total quantity for a group
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

    // 🔹 Calculate total quantity for a group
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

    // ⚡ Show Save/Update confirmation dialog
    $scope.actionDialog = function (action, dataModel) {

        for (let i = 0; i < $scope.chkPlan.length; i++) {
            let Model = $scope.chkPlan[i];
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

        //let a = $scope.chkPlan;
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
                MDId: (item.Machine === undefined || item.Machine.MDId === undefined) ? 0 : item.Machine.MDId

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


    // 📄 Prepare confirmation dialog object
    function objData(action) {

        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch Data?' };
        }
        return obj;
    }

    // 💾 Save or update Batch Plan to server
    function SaveUpdate() {

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

    // ❌ Cancel dialog and reset
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

    // ⏰ Timestamp for template URL
    var ts = Math.floor(Date.now() / 1000);

    // 📦 Open Batch Plan Popup modal
    $scope.MPlanPopup = function (ev) {
        if ($scope.chkPlan.length === 0)
            return;

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

            // 🚀 Show Angular Material loader dialog
            $rootScope.ShowLoader('Loading batch details data...');

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
                        item.PlanFromDate = new Date();
                        item.PlanToDate = new Date();
                        //item.NoOfBatch = '';
                        //item.TotalQty = '';
                        //item.BatchNos = '';
                        //item.isExist = '';
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
                    $rootScope.HideLoader();
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
                        item.GroupNo = parseInt(MaxUniqueId) + 1;
                        item.Remarks = '';
                        item.Enzyme === 'Select';
                        item.Process = '';
                        item.PlanQty = '';
                        item.PlanFromDate = new Date();
                        item.PlanToDate = new Date();
                        item.NoOfBatch = 0;
                        item.TotalQty = '';
                        item.BatchNos = '';
                        item.isExist = '';
                        item.noofBatch = item.noofBatch;
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
                    $rootScope.HideLoader();
                };
                
            });
            
            
        }
        else {
            alert('Error');
        }

        

        
 
    }

    // 🔄 Reset PlanData selection
    function resetData() {
        if ($scope.PlanData.length > 0) {
            angular.forEach($scope.PlanData, function (item) {
                item.chkJob = false;
            });
            checkfixedcopy = [];
        }

    }

    // 🔹 Controller for action dialog popup
    function DialogController($scope, $mdDialog, InitInfoId) {
        
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();

        };

        $scope.sf = $scope.bchkPlan.filter(x => x.InitInfoId == InitInfoId);
    }

    // 🔹 Controller for Batch Plan popup
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
        

        
    }

    // 🧹 Remove duplicate BatchNo in array
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

    // 📅 Convert JSON datetime to SQL Server datetime
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