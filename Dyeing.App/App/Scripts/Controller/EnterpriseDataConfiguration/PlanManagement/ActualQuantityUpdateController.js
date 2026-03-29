app.controller("ActualQuantityUpdateController", ["$scope", "$timeout", "$window", "$rootScope", "filterFilter", "$mdDialog", "ActualQuantityUpdateFactory",
    function ($scope, $timeout, $window, $rootScope, filterFilter, $mdDialog, ActualQuantityUpdateFactory) {

        ActualQuantityUpdateFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data
            if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
                        
            }
        });
        //Load All Batch
        $scope.LoadBatchData = function () {
            debugger
            ActualQuantityUpdateFactory.GetBatchAll($scope.Unit.UnitId, function (data) {
                $scope.BatchList = data;
                if ($scope.BatchList.length == 1) {
                    $scope.Batch = $scope.BatchList[0];
                }
            });
        }


        //Load All Dia
        ActualQuantityUpdateFactory.GetAllDia($rootScope.UserId, function (data) {
            $scope.DiaList = data;
        });

        //Function to load data
        $scope.GetBatchData = function (Batch) {
            if (!Batch || $scope.Batch === undefined) {
                $rootScope.alert("Please Select Unit");
                return;
            }
            $rootScope.ShowLoader("Loading Data");
            ActualQuantityUpdateFactory.GetBatchDetail(Batch.BpmId, function (data) {
                $scope.ProductionData = data.m_Item1;
                $scope.FabricList = data.m_Item2;
                //if (ProductionData.length = 0)
                //    $rootScope.alert('There is No Data');
                //else
                $rootScope.HideLoader();
            });
            $rootScope.HideLoader();
        };


        $scope.getFabricByAlias = function (alias) {
            if (!alias) return [];

            alias = alias.trim().toUpperCase();

            return $scope.FabricList.filter(function (item) {
                return item.ProductionAlias === alias;
            });
        };

        // Restrict input to numbers (integer or float)
        $scope.onlyNumber = function (event, allowDecimal) {
            var keyCode = event.which || event.keyCode;

            // Allow digits 0-9
            if (keyCode >= 48 && keyCode <= 57) return true;

            // Allow dot only for float fields
            if (
                allowDecimal &&
                keyCode === 46 &&
                event.target.value.indexOf(".") === -1
            )
                return true;

            // Allow backspace, tab, enter, delete
            if ([8, 9, 13, 46].indexOf(keyCode) !== -1) return true;

            // Block everything else
            event.preventDefault();
        };

        // Enforce minimum value on blur
        $scope.checkMin = function (obj, field, minValue) {
            if (
                obj[field] < minValue ||
                obj[field] === null ||
                obj[field] === undefined
            ) {
                obj[field] = minValue;
            }
        };

        //actual quantity 0  will be reset data of the row
        //$scope.$watch("ProductionData", function (newVal, oldVal) {
        //    if (!newVal) return;

        //    newVal.forEach(function (obj) {
        //        // If ActualQty becomes 0 → reset dependent fields
        //        if (obj.ActualQty === 0 || obj.ActualQty === "0") {
        //            //obj.ITEMID = 0;
        //            obj.FabricType = "Select Fabric";
        //            obj.ItemId = 0;
        //            obj.Rolls = "";
        //            obj.FDia = "";
        //            obj.Remarks = "";
        //        }
        //    });
        //},
        //    true
        //); // deep watch

        //Save Update Modal Control
        $scope.actionDialog = function (action, dataModel) {

            debugger
            console.log('a', $scope.ProductionData);
            let fabricCount = 0;
            let qtyCount = 0;
            let rollCount = 0;
            let diaCount = 0;
            angular.forEach($scope.ProductionData, function (item) {
                if ((item.ItemId === 0 || item.ItemId === null) && (item.ActualQty > 0 || item.PlanQty > 0))
                    fabricCount++;
                else if (item.ItemId > 0 && (item.ActualQty === 0 && item.PlanQty === 0))
                    qtyCount++;
                else if ((item.Rolls === '' || item.Rolls === 0) && item.ItemId > 0 && (item.ActualQty > 0 || item.PlanQty > 0))
                    rollCount++;
                else if (item.FDia === null && item.ItemId > 0 && (item.ActualQty > 0 || item.PlanQty > 0))
                    diaCount++;
            });

            if (fabricCount > 0 || qtyCount > 0 || rollCount > 0 || diaCount > 0) {
                if (fabricCount > 0) 
                    $rootScope.alert('Fabric Type not selected');
                else if (qtyCount > 0)
                    $rootScope.alert('Quantity not selected.');
                else if (rollCount > 0)
                    $rootScope.alert('Rolls not inserted');
                else if (diaCount > 0)
                    $rootScope.alert('Dia not selected');

                return;
            }



            $mdDialog
                .show(
                    $mdDialog.dialogBox({
                        locals: {
                            model: objData(action)
                        }
                    })
                )
                .then(function (mode) {
                    if (mode == "Update" || mode == "Save") {
                        SaveUpdate();
                    } else if (mode === "Delete") {
                        if (!dataModel || !dataModel.Id) return;
                        DeleteData(dataModel);
                    }
                });
        };

        //Save Update Modal Message
        function objData(action) {

            var obj = [];
            if (action == "Save") {
                obj = { Mode: "Save", btnText: "Yes", Header: "Save Confirmation", message: "Do you want to save Batch data?" };
            } else if (action == "Update") {
                obj = { Mode: "Update", btnText: "Yes", Header: "Update Confirmation", message: "Do you want to update Batch data?" };
            } else if (action == "Delete") {
                obj = { Mode: "Delete", btnText: "Yes", Header: "Delete Confirmation", message: "Do you want to delete Batch data?" };
            }
            return obj;
        }

        function cleanProductionData(list) {
            return list.map(function (item) {
                var cleanItem = {};
                angular.forEach(item, function (value, key) {
                    // If null or undefined → determine type based on key
                    if (value === null || value === undefined || value === "") {
                        // numeric fields
                        if (
                            [
                                "Id",
                                "PlanQty",
                                "ActualQty_DB",
                                "ActualQty",
                                "Rolls",
                                "UnitValueInTk"
                            ].includes(key)
                        ) {
                            cleanItem[key] = 0;
                        }
                        // string fields
                        else {
                            cleanItem[key] = "";
                        }
                    } else {
                        cleanItem[key] = value;
                    }
                });
                return cleanItem;
            });
        }

        function SaveUpdate() {
            debugger

            var Productions = cleanProductionData($scope.ProductionData);

            //angular.forEach(Productions, function (item) {
            //    debugger
            //    var Id = (item.ITEMID == 0 || item.ITEMID === undefined) ? (item.ItemId != null ? item.ItemId : 0) : item.ITEMID;
            //    if (Id == 0) {
            //        item.FabricType = "";
            //        item.ItemId = 0;
            //    } else {
            //        item.FabricType = $scope.FabricList.find(x => x.ItemId == Id).FabricType;
            //        item.ItemId = Id;
            //    }
            //});

            let request = {
                BpmId: $scope.Batch.BpmId,
                UserId: $rootScope.UserId,
                ProductionList: Productions
            };

            $rootScope.ShowLoader("Saving...");
            ActualQuantityUpdateFactory.SaveActualQuantity(request, function (response) {
                $rootScope.HideLoader();

                if (response[0].Msg) {
                    ActualQuantityUpdateFactory.GetBatchDetail($scope.Batch.BpmId, function (data) {
                        $scope.ProductionData = data.m_Item1;
                        $scope.FabricList = data.m_Item2;
                    }
                    );
                    $rootScope.alert("Data saved successfully");
                } else {
                    $rootScope.alert("Failed to save");
                }
            });
            $rootScope.HideLoader();
        }

        function FormatDate(dateString) {
            var m = moment(dateString, "YYYY/MM/DD", true);
            //return m.isValid() ? m.toDate() : new Date(NaN);
            return dateString ? moment(dateString).format("YYYY/MM/DD") : "";
        }

        $scope.Refresh = function () {
            Refresh();
        };
        function Refresh() {
            $scope.ProductionData = [];
            $scope.Batch = undefined;
            $rootScope.HideLoader();
            //$scope.Model.SectionName = null;
            //$scope.Model.IsActive = true;
            //$scope.btnSave = "Save";
        }
    }
]);