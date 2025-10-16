app.controller("MachinePlan", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {
    var currentJob;
    var previousJob;
    var colorClass = "";
    var SfList = [];
    $scope.chkPlan = [];
    $scope.allCheck = false;
    $scope.totalPlanQty = 0;
    let CurrUniqueGuid = 0;
    let CurrUniqueId = 0;
    let CurrComId = 0;
    let noOfNewBatch = 0;

  
    let machineNo = 0;

    $scope.Enzyme = [{ "Value": "Yes" }, { "Value": "No" }]

    PlanManagement.GetOFabricOperationData(function (data) {
        $scope.OFabOpList = data;
        SfList = data;
    });

    PlanManagement.GetBodyPart(function (data) {
        $scope.BodyPartList = data;
    });

    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {

        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBuyerData();
            PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
                $scope.MachineList = data;
            });
        }
        
    });

    

    $scope.LoadBuyerData = function () {

        $scope.isLoading = false;
        $scope.isLoading = true;
        PlanManagement.GetBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;
            PlanManagement.GetMachineData($scope.Unit.Id, function (data) {
                $scope.MachineList = data;
            });
            $scope.isLoading = false;
        });
    }

    $scope.LoadProcessData = function () {        
        PlanManagement.GetMachinePlanData($scope.Unit.Id, $scope.Buyer.BuyerId, function (data) {
            $scope.PlanData = data;
        });
    }   

    $scope.getRowClass = function ($index) {
        if ($index == 0) {
            currentUniqueGuid = $scope.PlanData[0].UniqueGuid;
            colorClass = 'table-white';
            return 'table-white';
        }
        else {
            currentUniqueGuid = $scope.PlanData[$index].UniqueGuid;
            previousUniqueGuid = $scope.PlanData[$index - 1].UniqueGuid;

            if (currentUniqueGuid != previousUniqueGuid) {
                if (colorClass == 'table-white')
                    colorClass = 'table-success';
                else
                    colorClass = 'table-white';
            }
                      
            return colorClass;
        }
    };

    $scope.checkJob = function (dataModel) {
        CurrUniqueGuid = dataModel.UniqueGuid;
        CurrUniqueId = dataModel.UniqueId;
        CurrComId = dataModel.CombinationId;

        //console.log("CurrUniqueGuid", CurrUniqueGuid);
    }

    $scope.duplicate = function (model, indx) {
        let data = angular.copy(model);
        for (i = 0; i < $scope.chkPlan.length; i++) {
            let currData = $scope.chkPlan[i];
            if (currData.GroupNo == model.GroupNo && currData.SeqNo > model.SeqNo) {
                $scope.chkPlan[i].SeqNo += 1;
            }
        }
        data.SeqNo = model.SeqNo + 1;
        
        $scope.chkPlan.splice(indx + 1, 0, data);
        //$scope.chkPlan.push(data);
    }

    $scope.remove = function (r) {
        let remModel = $scope.chkPlan[r];
        $scope.chkPlan.splice(r, 1);
        for (i = 0; i < $scope.chkPlan.length; i++) {
            let currData = $scope.chkPlan[i];
            if (currData.GroupNo == remModel.GroupNo && currData.SeqNo > remModel.SeqNo) {
                $scope.chkPlan[i].SeqNo -= 1;
            }
        }
        CalTotalQty(remModel);
    }

    $scope.copy = function (model, indx) {
        CalTotalQty(model);
        for (let i = 0; i < $scope.chkPlan.length; i++) {
            let groupNo = parseInt($scope.chkPlan[i].GroupNo);
            if (groupNo > model.GroupNo) {
                $scope.chkPlan[i].GroupNo = $scope.chkPlan[i].GroupNo + 1;
            }
        }
        let planData = $scope.chkPlan.filter(x => x.GroupNo == model.GroupNo);
        if (planData.length > 0) {
            for (i = 0; i < planData.length; i++) {              
                let data = angular.copy(planData[i]);
               
                data.GroupNo += 1;
                data.SeqNo = i+1;

                data.Machine = null;
                data.MCapacity = "";

                //Generate New Batch
                let NextBatchNo = data.MaxBatchNo + noOfNewBatch + 1;
                let lastPart = '00' + NextBatchNo;
                let pBatchNo = data.BatchNo;

                data.ParentBpmId = data.ParentBpmId == null ? data.BpmId : data.ParentBpmId;
                data.BatchNo = pBatchNo.substring(0, pBatchNo.length - 3) + lastPart.substring(lastPart.length - 3);

                $scope.chkPlan.splice(indx + planData.length+i, 0, data);
            }
            noOfNewBatch++;
        }
    }
        
    function CalTotalQty(model) {
        $scope.chkPlan
            .filter(x => x.GroupNo === model.GroupNo)
            .forEach((item, _, filteredItems) => {
                // Calculate the total PlanQty for the filtered items
                const totalPlanQty = filteredItems.reduce((sum, item) => sum + item.PlanQty, 0);
                // Set the TotalQty attribute for each filtered item
                item.TotalQty = totalPlanQty;
            });
    }

    
    $scope.rowSpan = function (data) {
        return $scope.PlanData.filter(x => x.UniqueId == data.UniqueId && x.UniqueGuid == data.UniqueGuid).length;
    }

    $scope.rowSpanM = function (data) {
        return $scope.chkPlan.filter(x => x.GroupNo == data.GroupNo).length;
    }

    $scope.showEl = function (data) {
        if (data.SeqNo == 1)
            return true;
        else
            return false;
    }

    $scope.GetBatchPlanByGuid = function () {
        PlanManagement.GetBatchPlanByGuid(CurrUniqueGuid, function (data) {
            $scope.PlanData = data;
        });
    }

    $scope.MachineChange = function (obj) {
        for (i = 0; i < $scope.chkPlan.length; i++) {
            if (obj.GroupNo == $scope.chkPlan[i].GroupNo) {
                machineNo = obj.Machine;
                $scope.chkPlan[i].Machine = obj.Machine;
                $scope.chkPlan[i].MCapacity = obj.Machine.MCapacity;
            }            
        }
    }

    $scope.calcTotalPQty = function (model) {
        $scope.totalPlanQty = 0;
        for (i = 0; i < $scope.chkPlan.length; i++) {
            let groupNo = $scope.chkPlan[i].GroupNo;           
            if (groupNo == model.GroupNo) {                
                let total = 0;
                $scope.chkPlan.filter(x => x.GroupNo == model.GroupNo).map(function (item) {
                    total += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
                });
                $scope.chkPlan[i].TotalQty = total;               
            }            
        }
        
        let total = 0;
        $scope.chkPlan.map(function (item) {
            total += parseFloat(item.PlanQty == "" ? 0 : item.PlanQty);
        });
        $scope.totalPlanQty = total;
    }

    $scope.actionDialog = function (action) {
        if (machineNo.MachineId == null) return;

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
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Machine Plan Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Machine Plan Data?' };
        }
        return obj;
    }

    function SaveUpdate() {
        const distinctBpmIds = [...new Set($scope.chkPlan.map(obj => obj.BpmId))];

        distinctBpmIds.forEach(function (item) {

            let sf = $scope.chkPlan.filter(x => x.BpmId == item);
            angular.forEach(sf, function (child) {
                child.SpecialFinishList = sf[0].SpecialFinishList;
            });
        });

        angular.forEach($scope.chkPlan, function (item) {
            let splist = [];
            let sp = item.SpecialFinishList.filter(x => x.FabOp == true);

            if (sp.length > 0 && sp.length != undefined) {
                splist = sp.map(obj => obj.id).join(',');
            }
            else {
                splist = '';
            }

            item.SpecialFinish = splist;
        });
        let planData = [];
        for (let i = 0; i < $scope.chkPlan.length; i++) {
            let model = angular.copy($scope.chkPlan[i]);
            model.MDId = model.Machine.MachineId;
            model.FromDate = moment(model.PlanFromDate).format('DD-MMM-YYYY');
            model.ToDate = moment(model.PlanToDate).format('DD-MMM-YYYY');
            planData.push(model);
        }

        let obj = {
            UnitId: $scope.Unit.Id,
            UserId: $rootScope.UserId,
            Plan: planData
            //Batch: $scope.BatchData
        }

        PlanManagement.MachinePlan_SaveUpdate(obj, function (res) {
            if (res.ErrorMsg == null) {
                $scope.LoadProcessData();
                $scope.chkPlan = [];
                $rootScope.alert(res.Msg);

            }
            else $rootScope.alert(res.ErrorMsg);
        });
    }

    var ts = Math.floor(Date.now() / 1000);


    //Custom Popup
    $scope.MPlanPopup = function (ev) {
        
        PlanManagement.GetBatchPlanByGuid(CurrUniqueId, CurrComId, function (data) {
            $scope.chkPlan = data;

            let lastGroupNo = "", gTotalPQty = 0;
            for (i = 0; i < $scope.chkPlan.length; i++) {
                let pQty = parseInt($scope.chkPlan[i].PlanQty);
                let GroupNo = $scope.chkPlan[i].GroupNo;


                angular.forEach($scope.chkPlan, function (item) {
                    SpecialFinish(item);
                });

                let a = $scope.PlanData;

                let total = 0;
                $scope.chkPlan.filter(x => x.GroupNo == GroupNo).map(function (item) {
                    total += item.PlanQty;
                });

                $scope.chkPlan[i].TotalQty = total;

                $scope.totalPlanQty = parseInt($scope.totalPlanQty) + pQty;
            }


            $mdDialog.show({
                async: false,
                controller: MPlanController,
                templateUrl: '/App/template/Popup/MPlanPopup.html?ts=' + ts,
                targetEvent: ev,
                scope: $scope,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                
            })
        });
    }

    $scope.SpFinishPopup = function (ev, group) {
        $mdDialog.show({
            async: false,
            controller: SpFinishController,
            templateUrl: '/App/template/Popup/SpecialFinishDialog1.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            locals: {
                group: group
            }
        })
    };

    $scope.SpPopUp = function (ev) {
        $mdDialog.show({
            async: false,
            controller: MPlanController,
            templateUrl: '/App/template/Popup/MPlanPopup.html?ts=' + ts,
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
    }

    function SpFinishController($scope, $mdDialog,group) {
        //$scope.hide = function () {
        //    $mdDialog.hide();
        //};

        //$scope.cancel = function () {
        //    $mdDialog.cancel();
        //};

        $scope.openMPlanPopup = function (ev) {
            $scope.SpPopUp(ev);
        };
        //$scope.sf1 = $scope.chkPlan.filter( x => x.InitInfoId == InitInfoId);
        $scope.sf1 = [];
        $scope.sf1 = $scope.chkPlan.filter(x => x.GroupNo == group)[0].SpecialFinishList;
        //$scope.sf1 = sd.SpecialFinishList != undefined ? $scope.chkPlan.SpecialFinishList : SfList;
        //angular.forEach($scope.chkPlan, function (item) {
        //    debugger
        //    item.SpecialFinishList = $scope.sf1;
        //});
    }

    function MPlanController($scope, $mdDialog) {
        
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        let a = $scope.chkPlan;
        /*$scope.sf = $scope.chkPlan.filter(x => x.InitInfoId == InitInfoId);*/
        //Special($scope.chkPlan);
    }

    function DialogController($scope, $mdDialog, InitInfoId) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.sf = $scope.chkPlan.filter(x => x.InitInfoId == InitInfoId);
        Special($scope.chkPlan);
    }

    //Special  Finish Part
    //function Special(models) {
    //    debugger
    //    console.log('asdf', $scope.chkPlan);
    //    let AllSf = [];
    //    let allSpecialFinishes = [];
    //    models.forEach(obj => {
    //        debugger
    //        if (obj.SpecialFinish) {
                
    //            debugger
    //            allSpecialFinishes = allSpecialFinishes.concat(obj.SpecialFinish.split(',').map(Number));
    //        }
    //        else {
    //            return;
    //        }

    //        console.log("a", allSpecialFinishes);
    //    });
    //    debugger
    //    let uniqueSpecialFinishes = new Set(allSpecialFinishes);
    //    debugger
    //    angular.forEach(models, function (item) {
    //        debugger
    //        SpecialFinish(item);
    //    });
    //    console.log("final", $scope.chkPlan);
    //}

    function SpecialFinish(model,id) {

        let numberA = [];
        let SfListString = JSON.stringify(SfList); // Convert object to JSON string
        let newList = JSON.parse(SfListString);

        if (model.SpecialFinish) {
            numberA = model.SpecialFinish.split(',').map(Number);

            // Iterate over the array of objects
            newList.forEach(obj => {

                // Check if the current object's ID is in the idArray
                if (numberA.includes(obj.id)) {
                    // Add the new attribute to the object
                    obj.FabOp = true;
                }
            });
            model.SpecialFinishList = newList;
        }
        else {
            model.SpecialFinishList = newList;
                //model.SpecialFinishList == "" ? newList : $scope.chkPlan[0].SpecialFinishList;
        }
        newList = SfList;
    }


}]);    