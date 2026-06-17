app.controller("TestRequestFormController", ["$scope", "$rootScope", "$mdDialog", "$mdToast", "$q", "$parse", "fileReader", "$window", "TestRequestFormFactory", function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, TestRequestFormFactory) {



    TestRequestFormFactory.GetRnDBookingDetails(function (data) {
        $scope.RefList = data;
        
    });

    // Test Summary Data - Exactly as shown in the picture
    TestRequestFormFactory.GetTestRequestFormData($rootScope.UserId, function (data) {
        $scope.First = data.m_Item1;
        $scope.Second = data.m_Item2[0];
        $scope.Third = data.m_Item3;
    });



    $scope.CheckState = function (type, item) {
        if (!item) return;

        if (type === 'P') {
            // Toggle Pass: if it's currently true, make it false. Otherwise, make it true.
            item.Pass = (item.Pass === true) ? false : true;
            // Force Fail to reset to undefined
            item.Fail = undefined;
        }
        else if (type === 'F') {
            // Toggle Fail: if it's currently true, make it false. Otherwise, make it true.
            item.Fail = (item.Fail === true) ? false : true;
            // Force Pass to reset to undefined
            item.Pass = undefined;
        }
    };

    function validation() {
        var count = 0;
        if ($scope.RnD === undefined || $scope.RnD === null)
            count++;
        angular.forEach($scope.First, function (item) {
            if (item.Pass === undefined && item.Fail === undefined)
                count++;
        });
        
        if ($scope.Second.Pass === undefined && $scope.Second.Fail === undefined)
            count++;
        angular.forEach($scope.Third, function (item) {
            if (item.Pass === undefined && item.Fail === undefined)
                count++;
        });
        return count;
    }

    // ⚡ Show Save/Update confirmation dialog
    $scope.actionIssueDialog = function (action, dataModel) {
        if (validation() > 0) {
            $rootScope.alert('Please Select all the Data');
            return;
        }
            

        $mdDialog.show(
            $mdDialog.dialogBox({
                locals: {
                    model: objData(action)
                }
            })).then(function (mode) {
                if (mode == 'Update' || mode == 'Save') {

                    SaveUpdate();
                }
                if (mode == 'cancel') {

                }

            });
    }


    // 📄 Prepare confirmation dialog object
    function objData(action) {

        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch Data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch Data?' };
        }
        return obj;
    }

    function SaveUpdate() {
        debugger
        var details = [];

        angular.forEach($scope.First, function (item) {

            details.push({
                ConfigurationId: item.Id,
                Result: item.Pass === true ? 'P' : 'F',
                TestResult: item.test_result
            });

        });
        debugger
        if ($scope.Second.test_Color_Change !== undefined || $scope.Second.test_Color_Change !== null) {
            details.push({
                ConfigurationId: 15,
                Result: $scope.Second.Pass === true ? 'P' : 'F',
                TestResult: $scope.Second.test_Color_Change
            });
        }
        if ($scope.Second.test_Color_Stain !== undefined || $scope.Second.test_Color_Stain !== null) {
            details.push({
                ConfigurationId: 16,
                Result: $scope.Second.Pass === true ? 'P' : 'F',
                TestResult: $scope.Second.test_Color_Stain
            });
        }
        if ($scope.Second.test_Cross_Stain !== undefined || $scope.Second.test_Color_Stain !== null) {
            details.push({
                ConfigurationId: 17,
                Result: $scope.Second.Pass === true ? 'P' : 'F',
                TestResult: $scope.Second.test_Cross_Stain
            });
        }
        

        angular.forEach($scope.Third, function (item) {

            details.push({
                ConfigurationId: item.Id,
                Result: item.Pass === true ? 'P' : 'F',
                TestResult: item.test_result
            });

        });

        var model = {
            RnDBookingId: $scope.RnD.RnDBookingId,
            LotNo: $scope.RnD.LotNo,
            InputDate: formatDateForSQL($scope.RnD.InputDate),
            UserId: $rootScope.UserId,
            Details: details
        };

        TestRequestFormFactory.SaveUpdateTestRequestForm(model, function (data) {
            model
            if (data[0].Status === 1) {
                $rootScope.alert(data[0].Message);
            }
            else $rootScope.alert(data.ErrorMsg);
            $scope.Refresh();
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

    $scope.Refresh = function() {
        debugger
        TestRequestFormFactory.GetTestRequestFormData($rootScope.UserId, function (data) {
            $scope.First = data.m_Item1;
            $scope.Second = data.m_Item2[0];
            $scope.Third = data.m_Item3;
        });
        // Clear selected R&D
        $scope.RnD = null;
        $scope.Rnd.BookingNo = undefined;
    }
    

}]);
