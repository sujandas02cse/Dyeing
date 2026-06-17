app.controller("LabDipReceipeCardController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'LabDipReceipe', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, LabDipReceipe) {


    $scope.ReceiveDate = new Date();

    $scope.allCheck = false;

    LabDipReceipe.GetAllLabDipBookingData(function (data) {
        $scope.LabDipBookingList = data;
    });


    $scope.LoadProcessData = function (Booking) {
        if (!Booking || !Booking.LabReceiveId) return;

        $rootScope.ShowLoader('Loading Info Data');

        LabDipReceipe.GetAllLabDipReceipeData(Booking.LabReceiveId, function (data) {
            $scope.LabDipReceipe = data && data.length ? data[0] : {};
            $scope.LabDipReceipe.LabReceivedId = $scope.LabDipBooking.LabReceiveId;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();

    }


    //function CheckValidation() {
    //    $scope.selectList = [];
    //    angular.forEach($scope.labBookingReceiveList, function (item) {
    //        debugger
    //        if (!item.isSelected) return; // skip unselected rows

    //        if (item.LabStartDate === null) return;

    //        var a = {
    //            DeclareUnitId: $scope.Unit.Id,
    //            LabReceivedId: item.LabReceiveId,
    //            LabStartDate: formatDateForSQL(item.LabStartDate),
    //            LabDipBookingNo: item.LabDipBookingNo,
    //            UserId: $rootScope.UserId,
    //            UserIp: $rootScope.UserIp
    //        };

    //        $scope.selectList.push(a);

    //    });

    //    if (!$scope.selectList || $scope.selectList.length == 0)
    //        return false;
    //    else
    //        return true;
    //}


    $scope.actionIssueDialog = function (action, dataModel) {

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
        LabDipReceipe.SaveUpdateLabDipReceipe($scope.LabDipReceipe, function (data) {

            if (data[0].Msg && data[0].Msg !== '') {

                $rootScope.alert("Data Saved Successfully");
                $window.open(
                    "../LabManagement/LabDipReceipeCardReport?LabBookReceiveId=" +
                    $scope.LabDipBooking.LabReceiveId +
                    "&&Format=PDF"
                );
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

        $scope.LabDipReceipe = {};
        LabDipReceipe.GetAllLabDipBookingData(function (data) {
            $scope.LabDipBookingList = data;
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