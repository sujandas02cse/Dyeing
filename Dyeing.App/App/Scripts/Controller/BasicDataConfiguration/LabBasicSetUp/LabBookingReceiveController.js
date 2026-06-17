app.controller("LabBookingReceiveController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'LabBookingReceive', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, LabBookingReceive) {


    $scope.ReceiveDate = new Date();

    $scope.allCheck = false;

    LabBookingReceive.GetUnitAll($rootScope.UserId, function (data) {

        $scope.UnitList = data;
        if ($scope.UnitList.length == 1)
            $scope.Unit = $scope.UnitList[0];
    });


    $scope.LoadProcessData = function () {

        if (!$scope.Unit || !$scope.FromDate || !$scope.ToDate || $scope.FromDate > $scope.ToDate) return;


        $rootScope.ShowLoader('Loading Info Data');

        LabBookingReceive.GetLabBookingReceive($scope.Unit.UnitId, formatDateForSQL($scope.FromDate), formatDateForSQL($scope.ToDate), function (data) {
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
        angular.forEach($scope.labBookingReceiveList, function (item) {
            debugger
            if (!item.isSelected) return; // skip unselected rows

            var a = {
                ReceiveUnitId: $scope.Unit.Id,
                ReceiveDate: formatDateForSQL($scope.ReceiveDate),
                LabDipRequestMasterId: item.LabDipRequestMasterId,
                LabDipRequestDetailsId: item.LabDipRequestDetailsId,
                LabDipBookingNo: item.LabDipBookingNo,
                BookingDate: formatDateForSQL(item.BookingDate),
                RequiredSubmissionDate: formatDateForSQL(item.RequiredSubmissionDate),
                Remarks: item.Comments,
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
        CheckValidation();
        debugger
        if (!$scope.selectList || $scope.selectList.length == 0) {
            $rootScope.alert("No Data Selected");
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
        //if (obj.length === 0)
        //    $rootScope.alert("");

        LabBookingReceive.SaveLabBookingReceive($scope.selectList, function (data) {
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

        $scope.BuyerList = [];
        $scope.StyleList = [];
        $scope.OrderList = [];
        $scope.selectList = [];
        $scope.labBookingReceiveList = [];
        $scope.Revise = '';
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