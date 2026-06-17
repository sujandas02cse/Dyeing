app.controller("LabDipSubmissionController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'LabDipSubmission', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, LabDipSubmission) {


    $scope.Date = new Date();

    $scope.allCheck = false;

    $scope.CountList = [
        { Count: 1, Value: "1st Time" }
    ]
    LabDipSubmission.GetBuyerAll($rootScope.UserId, function (data) {
        $scope.BuyerList = data;
        if ($scope.BuyerList.length == 1)
            $scope.Buyer = $scope.BuyerList[0];
    });

    $scope.LoadOtherData = function (buyerId) {
        if (!buyerId || buyerId === undefined || buyerId === 0) return;
        LabDipSubmission.GetLabDipSubmissionDatabyBuyer(buyerId, function (data) {
            $scope.OtherListData = data;
        });
    }


    $scope.LoadProcessData = function () {
        debugger
        if ($scope.Count === undefined || $scope.Count === null) $scope.Count = 0;
        //if (!$scope.Buyer, encodeURIComponent(!$scope.JobInfo), encodeURIComponent(!$scope.Style),
        //    encodeURIComponent(!$scope.ColorNameId), encodeURIComponent(!$scope.LabDipBookingNo), !$scope.Count)
        //    return;

        $rootScope.ShowLoader('Loading Info Data');

        LabDipSubmission.GetLabDipSubmissionData($scope.Buyer, encodeURIComponent($scope.JobInfo), encodeURIComponent($scope.Style),
            encodeURIComponent($scope.ColorNameId), encodeURIComponent($scope.LabDipBookingNo), $scope.Count, function (data) {
                debugger
                $scope.labDipSubmissionList = data.m_Item1;

                var currentCount = data.m_Item2[0].OpTime || 0;
                if ($scope.Count === undefined || $scope.Count === null)
                    $scope.Count = currentCount + 1;
                else
                    $scope.Count;

                setCountList(currentCount + 1);
                $scope.MaxCount = currentCount + 1;

                $rootScope.HideLoader();
            });
        $rootScope.HideLoader();

    }


    function setCountList(maxCount) {

        $scope.CountList = [];

        for (var i = 1; i <= maxCount; i++) {

            var label = "";

            if (i === 1) label = "1st Time";
            else if (i === 2) label = "2nd Time";
            else if (i === 3) label = "3rd Time";
            else label = i + "th Time";
            
            $scope.CountList.push({
                Count: i,
                Value: label
            });
        }
        
        
    }

    function CheckValidation() {
        $scope.selectList = [];

        angular.forEach($scope.labDipSubmissionList, function (item) {


            // ❌ RequiredSubmissionDate must NOT be empty
            if ($scope.FromDate === undefined || $scope.FromDate === null) {
                return;
            }

            var obj = {
                LabReceiveId: item.LabReceiveId,
                LabDipBookingNo: item.LabDipBookingNo,
                RequiredSubmissionDate: formatDateForSQL($scope.FromDate),
                PreviousSubmissionDate: item.PreviousSubmissionDate,
                OpTime: $scope.Count
            };

            $scope.selectList.push(obj);
        });

    }


    $scope.actionIssueDialog = function (action, dataModel) {
        CheckValidation();
        debugger
        if ($scope.FromDate === undefined || $scope.FromDate === null) {
            $rootScope.alert("Required Submission Date Required");
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
            obj = { Mode: "Save", btnText: "Yes", Header: "Save Confirmation", message: "Do you want to save Batch Data?" };
        }
        else if (action == "Update") {
            obj = { Mode: "Update", btnText: "Yes", Header: "Update Confirmation", message: "Do you want to update Batch Data?" };
        }
        return obj;
    }

    function SaveUpdate() {
        debugger

        var Obj = {
            labDipSubmissionDatas: $scope.selectList,
            UserId: $rootScope.UserId
        }

        debugger
        LabDipSubmission.SaveUpdateLabDipSubmissionData(Obj, function (data) {
            debugger
            if (data[0].Msg && data[0].Msg !== '') {

                $rootScope.alert("Data Saved Successfully");
            } else {
                $rootScope.alert("Error occurred while saving data");
            }
            $scope.Refresh();
        });
    }

    $scope.Refresh = function () {
        debugger
        //$scope.Unit === undefined;
        $scope.Job === undefined;
        $scope.Style === undefined;
        $scope.Order === undefined;
        $scope.Buyer.BuyerId === undefined;
        $scope.Buyer = [];
        
        $scope.CountList = [
            { Count: 1, Value: "1st Time" }
        ];
        $scope.OtherListData = [];
        $scope.selectList = [];
        $scope.labDipSubmissionList = [];
        LabDipSubmission.GetBuyerAll($rootScope.UserId, function (data) {
            $scope.BuyerList = data;
            if ($scope.BuyerList.length == 1)
                $scope.Buyer = $scope.BuyerList[0];
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