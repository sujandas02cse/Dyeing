app.controller("InitialPlan", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'PlanManagement', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, PlanManagement) {

    var NewObj = [];
    var currentJob;
    var previousJob;
    var colorClass = "";

    $scope.allCheck = false;
    PlanManagement.GetUnitAll($rootScope.UserId, function (data) {
        var a = data;

        //if ($window.localStorage.getItem("Unit") != null) {
        //    $scope.UnitList = a;
        //    var l = JSON.parse($window.localStorage.getItem("Unit"));
        //    $scope.Unit = $scope.UnitList.filter(x => x.UnitId == l.UnitId);
        //}
        if (a.length == 1) {
            $scope.UnitList = data;
            $scope.Unit = $scope.UnitList[0];
            $scope.LoadBuyerData();
        }
        else {
            $scope.UnitList = data;
        }
        $scope.allInitialData = '';
        $scope.allCheck = false;
    });

    $scope.LoadBuyerData = function () {

        $scope.isLoading = false;
        $scope.isLoading = true;
        PlanManagement.GetBuyerByUnit($scope.Unit.Id, function (data) {
            $scope.BuyerList = data;
            
            $scope.isLoading = false;
        });
        $scope.allInitialData = '';
        $scope.allCheck = false;
    }

    $scope.LoadProcessData = function () {

        //var l = JSON.parse($window.localStorage.getItem("Unit"));

        //if (l != null)
        //    $scope.Unit = $scope.UnitList.filter(x => x.UnitId == l.UnitId)[0];
        //else
        //    $scope.Unit;

        $scope.isLoading = false;
        $scope.isLoading = true;
        PlanManagement.GetInitialPlan($scope.Unit.UnitId, $scope.Buyer.BuyerId, function (data) {
            debugger
            $scope.allInitialData = data;
            $scope.isLoading = false;

            //angular.forEach($scope.allInitialData, function (item) {
            //    debugger
                
            //    item.YarnType = extractItemNames(item.Composition, 'C');
            //    item.YarnCount = extractItemNames(item.Composition, '0');
            //    debugger
            //});
        });
        $scope.allCheck = false;
        
    }

    $scope.allChecking = function () {
        if ($scope.allCheck == false || $scope.allCheck == undefined)
            $scope.allCheck = true;
        else
            $scope.allCheck = false;
        ChangeState();
    };


    function ChangeState() {
        if ($scope.allCheck == true) {
            angular.forEach($scope.allInitialData, function (obj) {
                obj.Active = true;
            });
            $scope.Active = true;
        }
        else {
            angular.forEach($scope.allInitialData, function (obj) {
                obj.Active = false;
            });
            $scope.Active = false;
        }
    }


    function SingleCheck() {
        var all = $scope.allInitialData.filter(x => x.Active == true);
        if ($scope.allInitialData.length == all.length)
            $scope.allCheck = true;
        else
            $scope.allCheck = false;

    }


    $scope.checking = function ($index) {
        if ($scope.allInitialData[$index].Active = undefined || $scope.allInitialData[$index].Active == false || $scope.allInitialData[$index].Active == null)
            $scope.allInitialData[$index].Active = true;
        else
            $scope.allInitialData[$index].Active = false;

        SingleCheck();
    }

    $scope.getRowClass = function ($index) {
        if ($index == 0) {
            currentJob = $scope.allInitialData[0].JobInfo;
            colorClass = 'table-white';
            return 'table-white';
        }
        else {
            currentJob = $scope.allInitialData[$index].JobInfo;
            previousJob = $scope.allInitialData[$index - 1].JobInfo;

            if (currentJob != previousJob) {
                if (colorClass == 'table-white')
                    colorClass = 'table-success';
                else
                    colorClass = 'table-white';
            }
            else {

            }
            console.log("color", colorClass);
            return colorClass;
        }


    };

    $scope.actionDialog = function (action, dataModel) {
        var count = $scope.allInitialData.filter(x => x.Active == true).length;
        if (count <= 0) return;

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
        
        var Create = $scope.allInitialData.filter(x => x.Active == true);
        let List = angular.forEach(Create, function (item) {
            var a = {
                InitInfoId: item.Id,
                ColTypeId: item.ColTypeId
            };
            NewObj.push(a);
        });
        console.log("NewObj", NewObj);
        var Obj = {
            Ids: NewObj,
            User: $rootScope.UserId
        }

        PlanManagement.InititalPlan_Save(Obj, function (data) {
            if (data.ErrorMsg == null) {
                $rootScope.alert("Data Saved Successfully");
                // $rootScope.Toast(data.Msg);
                $scope.allCheck = false;
                $scope.search = '';
                PlanManagement.GetInitialPlan($scope.Unit.UnitId, $scope.Buyer.BuyerId, function (data) {
                    $scope.allInitialData = data;
                    $scope.isLoading = false;

                    angular.forEach($scope.allInitialData, function (item) {
                        debugger
                        item.YarnType = extractItemNames(item.Composition, 'C');
                        item.YarnCount = extractItemNames(item.Composition, '0');
                        debugger
                    });
                });
                Refresh();
            }
            else $rootScope.alert(data.ErrorMsg);

        });

        //$window.localStorage.setItem("Data", JSON.stringify($scope.allInitialData.filter(x => x.check == true)));
    }

    //Get YarnType
    function extractItemNames(dataString,type){
        // Split the input string by '+'
        let items = dataString.split('+');
        let itemNames = [];
        let itemName = '';
        // Loop through each item and extract the ItemName
        items.forEach(function (item) {
            // Split each item by '-' and take the first part as ItemName
            let parts = item.split('-');
            if (type == 'C')
                itemName = parts[0].trim(); // Get the ItemName and trim any whitespace
            else
                itemName = parts[parts.length - 1].trim();

            itemName = itemName.replace(/\(.*?\)/g, '').trim(); 

            if (itemName) {
                itemNames.push(itemName); // Add to the array if it's not empty
            }
        });

        // Join the ItemNames into a comma-separated string
        return itemNames.join(', ');
    };

}]);