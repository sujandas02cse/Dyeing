app.controller("LabDipApprovalController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'LabDipApproval', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, LabDipApproval) {


    $scope.ReceiveDate = new Date();


    $scope.Date = new Date();

    $scope.StatusList = [
        "Approved", "Not Approved"
    ];

    LabDipApproval.GetBuyerAllApproved($rootScope.UserId, function (data) {
        $scope.BuyerList = data;
        if ($scope.BuyerList.length == 1)
            $scope.Buyer = $scope.BuyerList[0];
    });

    $scope.LoadOtherData = function (buyerId) {
        if (!buyerId) return;
        LabDipApproval.GetLabDipApprovalDatabyBuyer(buyerId, function (data) {
            $scope.OtherListData = data;
        });
    }


    $scope.LoadProcessData = function () {

        $rootScope.ShowLoader('Loading Info Data');

        LabDipApproval.GetLabDipApprovalData($scope.Buyer, encodeURIComponent($scope.JobInfo), encodeURIComponent($scope.Style),
            encodeURIComponent($scope.ColorNameId), encodeURIComponent($scope.LabDipBookingNo), function (data) {
                $scope.labDipApproveList = data;
                angular.forEach($scope.labDipApproveList, function (item) {
                    item.isSelected = item.isSelected == 1;
                    if (!item.ApprovalStatus) {
                        item.ApprovalStatus = null;
                    }
                });
                $rootScope.HideLoader();
            });
        $rootScope.HideLoader();

    }

    $scope.checkAll = function () {
        angular.forEach($scope.labDipApproveList, function (item) {
            item.isSelected = $scope.allCheck;
        });
    };


    $scope.updateSelectAll = function () {

        var allSelected = true;

        angular.forEach($scope.labDipApproveList, function (item) {
            if (!item.isSelected) {
                allSelected = false;
            }
        });

        $scope.allCheck = allSelected;

    };

    function CheckValidation() {

        $scope.selectList = [];

        for (var i = 0; i < $scope.labDipApproveList.length; i++) {

            var item = $scope.labDipApproveList[i];

            if (!item.isSelected)
                continue;

            if (!item.ApprovalStatus) {
                $rootScope.alert('Please Select Approval Status');
                return false;
            }

            if (item.ApprovalStatus === 'Not Approved' && !item.RejectReason) {
                $rootScope.alert('Please Give Reason');
                return false;
            }

            if (!item.ApproveDate) {
                $rootScope.alert('Please Select Date');
                return false;
            }

            $scope.selectList.push({
                LabReceiveId: item.LabReceiveId,
                ApprovalStatus: item.ApprovalStatus,
                ApprovedOption: item.ApprovedOption || '',
                RejectReason: item.RejectReason || '',
                OpTime: item.SubmissionCount || 0,
                ApproveDate: formatDateForSQL(item.ApproveDate)
            });
        }

        return $scope.selectList.length > 0;
    }


    $scope.actionIssueDialog = function (action, dataModel) {
        CheckValidation();

        if (!$scope.selectList || $scope.selectList.length == 0) {

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
        var Obj = {
            labDipApprovalDatas: $scope.selectList,
            UserId: $rootScope.UserId
        }
        LabDipApproval.SaveUpdateLabDipApprovalData(Obj, function (data) {
            if (data[0].Msg && data[0].Msg !== '') {

                $rootScope.alert("Data Saved Successfully");
            } else {
                $rootScope.alert("Error occurred while saving data");
            }
            $scope.Refresh();
        });
    }

    $scope.Refresh = function () {

        //$scope.Unit === undefined;
        $scope.Buyer = undefined;
        $scope.JobInfo = undefined;
        $scope.Style = undefined;
        $scope.ColorNameId = undefined;
        $scope.LabDipBookingNo = undefined;


        $scope.selectList = [];
        $scope.labDipApproveList = [];
        LabDipApproval.GetBuyerAll($rootScope.UserId, function (data) {
            $scope.BuyerList = data;
            if ($scope.BuyerList.length == 1)
                $scope.Buyer = $scope.BuyerList[0];

            $scope.LoadOtherData($scope.Buyer.BuyerId);
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