app.controller("InitialInformation", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {
    var NewObj = [];
    var currentGroupKey;
    var previousGroupKey;
    var colorClass = "";
    var SfList = [];
    var alldata = [];
    
    $scope.allCheck = false;

    PlanManagement.GetOFabricOperationData(function (data) {
        //$scope.OFabOpList = data;
        SfList = data;
    });

    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;

        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBuyerData();
            $scope.allInitialData = '';
            $scope.allCheck = false;
        }
    });

    $scope.LoadBuyerData = function () {
        $rootScope.ShowLoader("Loading Buyer Data");

        PlanManagement.GetBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;
            $scope.allInitialData = '';
            $scope.allCheck = false;
            $rootScope.HideLoader();
        });
    }

    $scope.LoadJobData = function () {
        $rootScope.ShowLoader("Loading Job Data");

        PlanManagement.GetJobByBuyer($scope.Buyer.BuyerId, function (data) {
            $scope.JobList = data;
            $scope.allInitialData = '';
            $scope.allCheck = false;
            $rootScope.HideLoader();
        });
    }

        
    $scope.LoadProcessData = function () {
        debugger
        if (!$scope.Unit.Id || !$scope.Buyer.BuyerId) return;

        if ($scope.Job === undefined || $scope.Job === null)
            var job = 0;
        else
            var job = $scope.Job.JobId;

        $rootScope.ShowLoader('Loading Info Data');
        debugger
        PlanManagement.GetInitialInformation($scope.Unit.Id, $scope.Buyer.BuyerId, job, function (data) {
            $scope.allInitialData = data;
            alldata = data;
            let initId = 0;
            angular.forEach($scope.allInitialData, function (item) {
                item.initId = initId + 1;
                initId++;
            });
            $scope.isLoading = false;

            angular.forEach($scope.allInitialData, function (item) {
                SpecialFinish(item);
            });
            $rootScope.HideLoader();
        });
        
    }

    function SpecialFinish(model) {

        let numberA = [];
        let SfListString = JSON.stringify(SfList); // Convert object to JSON string
        let newList = JSON.parse(SfListString);
        let matchedLabels = [];
        let matchedLabelsString = '';
        if (model.SpecialFinish != null) {
            numberA = model.SpecialFinish.split(',').map(Number);
            
            // Iterate over the array of objects
            newList.forEach(obj => {
                // Check if the current object's ID is in the idArray
                if (numberA.includes(obj.id)) {
                    // Add the new attribute to the object
                    matchedLabels.push(obj.label);  
                }
            });

            matchedLabelsString = matchedLabels.join(', ');

            model.SpecialFinishList = matchedLabelsString;
        }
        else {
            model.SpecialFinishList = null; 
        }
        model.SpecialFinishList = matchedLabelsString;
    }

    $scope.searchFilter = function () {
        if (!$scope.search) {
            // Reset 'Select All' if search is cleared
            $scope.allCheck = false;
        }
    };

    $scope.allChecking = function () {
        $scope.allCheck = !$scope.allCheck; // Toggle the 'Select All' checkbox state
        ChangeState();
    };

    function ChangeState() {

        if ($scope.allCheck) {

            if ($scope.search) {
                // Filter data based on search term
                const filterData = $scope.allInitialData.filter(item => item.JobNo.includes($scope.search));
                // Set Active = true for filtered items
                filterData.forEach(item => item.Active = true);
            } else {
                // Set Active = true for all items
                $scope.allInitialData.forEach(item => item.Active = true);
            }
        } else {
            // Set Active = false for all items
            $scope.allInitialData.forEach(item => item.Active = false);
        }
    }

    $scope.checking = function (id) {

        const item = $scope.allInitialData.find(x => x.initId === id);
        if (item) {
            // Toggle the Active state
            item.Active = !item.Active;
            SingleCheck();
        }
    };

    function SingleCheck() {
        // Check if all items are active
        const allChecked = $scope.allInitialData.every(item => item.Active);
        $scope.allCheck = allChecked; // Update the 'Select All' checkbox state
    }

    



    $scope.getRowClass = function ($index) {
       
        currentGroupKey = '';
        previousGroupKey = '';
        if ($index == 0) {
          
            // Initialize the first row
            currentGroupKey = $scope.allInitialData[0].Buyer + $scope.allInitialData[0].JobNo +
                $scope.allInitialData[0].Style + $scope.allInitialData[0].OrderNo +
                $scope.allInitialData[0].ColorName;
            colorClass = 'table-white';
            return colorClass;
        }
        else {
           
            // Generate the current group key
            currentGroupKey = $scope.allInitialData[$index].Buyer + $scope.allInitialData[$index].JobNo +
                $scope.allInitialData[$index].Style + $scope.allInitialData[$index].OrderNo +
                $scope.allInitialData[$index].ColorName;

            // Generate the previous group key
            previousGroupKey = $scope.allInitialData[$index - 1].Buyer + $scope.allInitialData[$index - 1].JobNo +
                $scope.allInitialData[$index - 1].Style + $scope.allInitialData[$index - 1].OrderNo +
                $scope.allInitialData[$index - 1].ColorName;

            // Check if the group has changed
            if (currentGroupKey != previousGroupKey) {
                // Switch color when the group changes
                colorClass = (colorClass == 'table-white') ? 'table-success' : 'table-white';
        }

        return colorClass;
    }
};

    $scope.actionDialog = function (action, dataModel) {
        var count = $scope.allInitialData.filter(x => x.Active == true).length;
        var allCount = $scope.allInitialData === undefined ? 0 : 1;
        if (count == 0 || allCount == 0) return;

        //let appTime = $scope.ApproveTime[$scope.ApproveTime.length - 1].id;
        //if (appTime != $scope.Batch.ApproveTime) return;

        //if ($scope.CA == false && ($scope.CAReason == '' || $scope.CAReason == null)) return;

        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Save') {
                    SaveData();
                }

            });
    }
    
    $scope.sendData = function () {
        var count = $scope.allInitialData.filter(x => x.Active == true).length;
        var allCount = $scope.allInitialData === undefined ? 0 : 1;
        if (count == 0 || allCount == 0) return;

        //$window.localStorage.setItem("Unit", JSON.stringify($scope.Unit));
        var Create = [];
        Create = $scope.allInitialData.filter(x => x.Active == true);
        let List = [];
        NewObj = [];

        List = angular.forEach(Create, function (item) {

            var a = {
                BuyerId: item.BuyerId,
                JobId: item.JobId,
                StyleId: item.StyleId,
                OrderId: item.OrderId,
                OrderIdAuto: 0,
                BookingDate: item.BookingDate != undefined ? formatDateForSQL(item.BookingDate) : null,
                ShipmentDate: item.ShipmentDate != undefined ? formatDateForSQL(item.ShipmentDate) : null,
                ColorId: item.dyedColorId,
                ColorTypeId: item.greyColorId,
                FabricTypeId: item.FabItemID,
                ItemId: item.FabItemID,
                Composition: item.Composition === null || item.Composition === undefined ? '' : item.Composition,
                Gsm: item.GSM === null || item.GSM === undefined ? '' : item.GSM,
                Dia: item.Dia === null || item.Dia === undefined ? '' : item.Dia,
                OrderQty: /*item.OrderQty != undefined ? item.OrderQty :*/ 0,
                ReqGQty: item.RequiredGridgeQty != undefined ? item.RequiredGridgeQty : 0,
                //KCommitmentFDate: item.KCommitmentFDate != undefined ? item.KCommitmentFDate : '',
                //KCommitmentTDate: item.KCommitmentTDate != undefined ? item.KCommitmentTDate : '',
                //KComments: item.KComments != undefined ? item.KComments : 0,
                RDyedQty: item.RequiredDyedQty != undefined ? item.RequiredDyedQty : 0,
                OrderType: item.OrderType,
                DyeingUnitId: $scope.Unit.Id == null ? 0 : $scope.Unit.Id,/*item.UnitNo != undefined ? item.UnitNo :*/
                GmtUnitId:  0,
                SpecialFinish: '',
                YarnType: '',
                YarnBrand: '',
                YarnCount: '',
                YarnLot: '',
                PantoonId: item.PantoonId
            };

            NewObj.push(a);
        });
        console.log("NewObj", NewObj);

        var Obj = { 
            Obj: NewObj,    
            UserId: $rootScope.UserId
        }
        console.log('planning data',Obj);
        PlanManagement.InititalInfo_Save(Obj, function (data) {
            List = [];
            if (data.ErrorMsg == null) {
                if ($scope.Job === undefined || $scope.Job === null)
                    var job = 0;
                else
                    var job = $scope.Job.JobId;
                PlanManagement.GetInitialInformation($scope.Unit.Id, $scope.Buyer.BuyerId,job, function (data) {
                    $scope.allCheck = false;
                    $scope.search = '';
                    $scope.allInitialData = data;
                    alldata = data;
                    let initId = 0;
                    angular.forEach($scope.allInitialData, function (item) {
                        item.initId = initId + 1;
                        initId++;
                    });
                    $scope.isLoading = false;

                    angular.forEach($scope.allInitialData, function (item) {
                        SpecialFinish(item);
                    });
                    console.log('a', $scope.allInitialData);
                });

                $rootScope.alert("Data Saved Successfully");
                
                // $rootScope.Toast(data.Msg);    
                
            }
            else { 
                $rootScope.alert(data.ErrorMsg);
                Refresh();
            }

        });

        //$window.localStorage.setItem("Data", JSON.stringify($scope.allInitialData.filter(x => x.check == true)));

        // Start Pagination
        //$scope.viewby = 10;

        //$scope.currentPage = 1;
        //$scope.itemsPerPage = $scope.viewby;
        //$scope.maxSize = 5; //Number of pager buttons to show

        //$scope.setPage = function (pageNo) {
        //    $scope.currentPage = pageNo;
        //};

        //$scope.setItemsPerPage = function (num) {
        //    $scope.itemsPerPage = num;
        //    $scope.currentPage = 1; //reset to first paghe
        //}
        // End Pagination
    }

    $scope.Refresh = function () {

        $scope.BuyerList = [];
        NewObj = [];
        $scope.allInitialData = [];
        currentGroupKey = '';
        previousGroupKey = '';
        var SfList = [];
        var alldata = [];

    }


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

}]);