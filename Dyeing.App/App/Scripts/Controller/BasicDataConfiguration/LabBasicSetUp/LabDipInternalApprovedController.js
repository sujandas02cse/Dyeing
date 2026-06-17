app.controller("LabDipInternalApprovedController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'LabDipInternalApproved', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, LabDipInternalApproved) {


    $scope.ReceiveDate = new Date();
    let dateCount = 0;
    $scope.allCheck = false;

    $scope.ApprovalStatusList = [
        "Internal Approved", "Previous Approved"
    ]

    $scope.ApprovedOptionList = 'abcdefghijklmnopqrstuvwxyz'.split('').map(x => (x));


    LabDipInternalApproved.GetUnitAll($rootScope.UserId, function (data) {

        $scope.UnitList = data;
        if ($scope.UnitList.length == 1)
            $scope.Unit = $scope.UnitList[0];
    });


    $scope.LoadProcessData = function () {

        if (!$scope.Unit || !$scope.FromDate || !$scope.ToDate || $scope.FromDate > $scope.ToDate) return;

        $rootScope.ShowLoader('Loading Info Data');

        LabDipInternalApproved.GetLabDipInternalApproved($scope.Unit.UnitId, formatDateForSQL($scope.FromDate), formatDateForSQL($scope.ToDate), function (data) {
            $scope.labBookingReceiveList = data.m_Item1;
            $scope.BookingNoList = data.m_Item2;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();

    }

    $scope.checkAll = function () {
        angular.forEach($scope.labBookingReceiveList, function (item) {
            item.isSelected = $scope.allCheck;
        });
    };


    $scope.updateSelectAll = function () {

        var allSelected = true;

        angular.forEach($scope.labBookingReceiveList, function (item) {
            if (!item.isSelected) {
                allSelected = false;
            }
        });

        $scope.allCheck = allSelected;

    };

    function CheckValidation() {
        $scope.selectList = [];
        dateCount = 0;
        angular.forEach($scope.labBookingReceiveList, function (item) {

            if (!item.isSelected) return; // skip unselected rows

            if (item.ApprovalDate === null || item.ApprovalDate === undefined) {
                dateCount++;
                return;
            }

            var a = {
                DeclareUnitId: $scope.Unit.Id,
                LabReceivedId: item.LabReceiveId,
                ApprovalStatus: item.ApprovalStatus,
                ApprovedOption: item.ApprovedOption,
                ApprovalDate: formatDateForSQL(item.ApprovalDate),
                LabDipBookingNo: item.LabDipBookingNo,
                UserId: $rootScope.UserId,
                UserIp: $rootScope.UserIp
            };

            $scope.selectList.push(a);

        });

        if (!$scope.selectList || $scope.selectList.length == 0)
            return false;
        else
            return true;
    }


    $scope.actionIssueDialog = function (action, dataModel) {
        debugger
        CheckValidation();
        if (!$scope.selectList || $scope.selectList.length == 0) {
            $rootScope.alert("No Data Selected");
            return;
        }
        else if (dateCount > 0) {
            $rootScope.alert("Please Selec Date");
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

        //if (obj.length === 0)
        //    $rootScope.alert("");
        console.log('a', $scope.selectList);
        debugger
        LabDipInternalApproved.SaveUpdateLabDipInternalApproved($scope.selectList, function (data) {
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

        //$scope.Unit === undefined;
        $scope.Job === undefined;
        $scope.Style === undefined;
        $scope.Order === undefined;
        $scope.allCheck = false;
        $scope.BuyerList = [];
        $scope.StyleList = [];
        $scope.OrderList = [];
        $scope.selectList = [];
        $scope.labBookingReceiveList = [];
        $scope.Revise = '';
        $scope.FromDate = '';
        $scope.ToDate = '';
        LabBookingReceive.GetUnitAll($rootScope.UserId, function (data) {
            //$scope.OFabOpList = data;
            $scope.UnitList = data;

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