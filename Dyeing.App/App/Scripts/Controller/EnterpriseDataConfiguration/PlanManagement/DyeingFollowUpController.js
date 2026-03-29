app.controller("DyeingFollowUpController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'DyeingFollowUp', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, DyeingFollowUp) {
    var NewObj = [];
    var currentGroupKey;
    var previousGroupKey;
    var colorClass = "";
    var SfList = [];
    var alldata = [];

    

    $scope.allCheck = false;

    DyeingFollowUp.GetAllBuyer(function (data) {
        //$scope.OFabOpList = data;
        $scope.BuyerList = data;

    });


    $scope.LoadJobData = function (buyer) {
        if (!buyer) {
            console.log('job', "No buyer");
            return;
        }
        DyeingFollowUp.GetJobByBuyer(buyer.BuyerId, function (data) {
            $scope.JobList = data;
        })

        $scope.Job === undefined;
        $scope.Style === undefined;
        $scope.Order === undefined;
        $scope.StyleList = [];
        $scope.OrderList = [];
    }

    $scope.LoadStyleData = function (buyer, job) {
        if (!buyer || !job) {
            console.log('order', "no data");
            return;
        }
        DyeingFollowUp.GetStyleByJob(buyer.BuyerId, job.JobId, function (data) {
            $scope.StyleList = data;
        })
        $scope.Style === undefined;
        $scope.Order === undefined;

    }

    $scope.LoadOrderData = function (buyer, job, style) {
        if (!buyer || !job || !!style) {
            console.log('style', "no data");
        }
        DyeingFollowUp.GetOrderByStyle(buyer.BuyerId, job.JobId, style.StyleId, function (data) {
            $scope.OrderList = data;
        })
        $scope.Order === undefined;
    }

    $scope.checkMin = function (obj, field, minValue) {
        if (
            obj[field] < minValue ||
            obj[field] === null ||
            obj[field] === undefined
        ) {
            obj[field] = minValue;
        }
    };

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

    $scope.LoadProcessData = function () {
        if (!$scope.Buyer || !$scope.Job || !$scope.Style || !$scope.Order) return;

        $rootScope.ShowLoader('Loading Info Data');

        DyeingFollowUp.GetDataByStyle($scope.Buyer.BuyerId, $scope.Job.JobId, $scope.Style.StyleId, $scope.Order.OrderId,function (data) {
            $scope.dyeingFollowUpData = data.m_Item1;
            $scope.Revise = data.m_Item2[0].ReviseNo;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();

    }

    $scope.actionIssueDialog = function (action, dataModel) {

        var count = 0;
        angular.forEach($scope.dyeingFollowUpData, function (item) {
            if (item.KnittingStatus != '' || item.DyeingDeliveryStartDate != '' || item.DyeingDeliveryFinishedDate != '' ||
                (item.PerDeliveryQty != '' || item.PerDeliveryQty != 0) && item.DyeingComments != '')
                count++;
        })

        if (count === 0) {
            $rootScope.alert("Data is empty");
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
                }
            });
    };

    function objData(action) {
        var obj = [];
        if (action == "Save") {
            obj = {Mode: "Save",btnText: "Yes",Header: "Save Confirmation",message: "Do you want to save Batch Data?"};
        }
        else if (action == "Update") {
            obj = {Mode: "Update",btnText: "Yes",Header: "Update Confirmation",message: "Do you want to update Batch Data?"};
        }
        return obj;
    }

    function SaveUpdate() {
        var obj = [];
        angular.forEach($scope.dyeingFollowUpData, function (item) {

            var a = {
                KnittingFollowUpId: item.KnttingFollowUpID,
                KnittingStatus: item.KnittingStatus,
                DyeingDeliveryStartDate: formatDateForSQL(item.DyeingDeliveryStartDate),
                DyeingDeliveryFinishedDate: formatDateForSQL(item.DyeingDeliveryFinishedDate),
                PerDeliveryQty: item.PerDeliveryQty,
                DyeingComments: item.DyeingComments,
                ReviseNo: ($scope.Revise === undefined) ? 0 : $scope.Revise.ReviseNo
            }
            obj.push(a);
            
        })

        if (obj.length === 0)
            $rootScope.alert("")

        DyeingFollowUp.DyeingFollowDataSave(obj, $rootScope.UserId, function (data) {
            if (data[0].Msg && data[0].Msg !== '') {
                
                $rootScope.alert("Data Saved Successfully");
            } else {
                $rootScope.alert("Error occurred while saving data");
            }
            $scope.Refresh();
        });
    }

    $scope.Refresh = function () {
        
        $scope.Buyer === undefined;
        $scope.Job === undefined;
        $scope.Style === undefined;
        $scope.Order === undefined;
        $scope.JobList = [];
        $scope.BuyerList = [];
        $scope.StyleList = [];
        $scope.OrderList = [];
        $scope.dyeingFollowUpData = [];
        $scope.Revise = '';
        DyeingFollowUp.GetAllBuyer(function (data) {
            //$scope.OFabOpList = data;
            $scope.BuyerList = data;

        });

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