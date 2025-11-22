app.controller("CommentsOnFourPointReportController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$q', '$parse', 'fileReader', '$window', 'CommentsOnFourPointReport', function ($scope, $rootScope, $mdDialog, $mdToast, $q, $parse, fileReader, $window, CommentsOnFourPointReport) {

    // initialize model
    $scope.Model = {
        BodyPart: null
    };

    $scope.Mode = 'New';


    //Change Mode
    $scope.changeMode = function () {
        $scope.Refresh();
    }

    
    //All Unit Load when load the page
    CommentsOnFourPointReport.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        }
    });


    //All BAtch Data Load by Unit when select Unit
    $scope.LoadBatchData = function (Unit) {
        if (!$scope.Model.Unit.Id || $scope.Model.Unit === null || Unit === null) return;
        $rootScope.ShowLoader("Loading Batch Data");
        CommentsOnFourPointReport.GetBatchByUnit(Unit.Id, $scope.Mode, function (data) {
            $scope.BatchList = data;
            $rootScope.HideLoader();
        });
        $rootScope.HideLoader();
    }


    //Load Batch Details data when Select The Batch
    $scope.LoadBatchDetailData = function (Batch) {
        if (!Batch.BpmId) return;

        $rootScope.ShowLoader('Loading Batch Detail Data');
        CommentsOnFourPointReport.GetBatchDetailByBatch(Batch.BpmId, $scope.Mode, function (data) {

            $scope.Model = data.m_Item1[0];
            $scope.Model.Unit = $scope.UnitList.find(x => x.Id === data.m_Item1[0].UnitId);
            $scope.Model.Batch = $scope.BatchList.find(x => x.BpmId === data.m_Item1[0].BpmId);
            $scope.AllData = data.m_Item2;
            $rootScope.HideLoader();
        });
    }


    // only one can be selected, or none
    $scope.selectOnlyOne = function (part) {
        if ($scope.Model.BodyPart === part) {
            $scope.Model.BodyPart = '';
        } else {
            $scope.Model.BodyPart = part;
        }
        if (!$scope.$$phase) $scope.$apply(); // ensure UI updates
    };


    //Save Update Modal Control
    $scope.actionDialog = function (action, dataModel) {
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
                    if ($scope.Model.BodyPart === '' || $scope.Model.BodyPart === undefined || $scope.Model.Batch === undefined)
                        return;
                    SaveUpdate();
                } else if (mode === 'Delete') {
                    if (!dataModel || !dataModel.Id) return;
                    DeleteData(dataModel);
                }
            });
    };


    //Save Update Modal Message
    function objData(action) {
        var obj = [];
        if (action == 'Save') {
            obj = { 'Mode': 'Save', 'btnText': 'Yes', 'Header': 'Save Confirmation', 'message': 'Do you want to save Batch data?' };
        } else if (action == 'Update') {
            obj = { 'Mode': 'Update', 'btnText': 'Yes', 'Header': 'Update Confirmation', 'message': 'Do you want to update Batch data?' };
        } else if (action == 'Delete') {
            obj = { 'Mode': 'Delete', 'btnText': 'Yes', 'Header': 'Delete Confirmation', 'message': 'Do you want to delete Batch data?' };
        }
        return obj;
    }


    //Save Update Function to Save Data
    function SaveUpdate() {
        var Obj = {
            BpmId         : $scope.Model.Batch.BpmId,
            BodyPart      : $scope.Model.BodyPart,
            BatchType     : $scope.Model.Batch.BatchType,
            FabricLocation: $scope.Model.FabricLocation,
            AOPUnit       : $scope.Model.AopUnit,
            Remarks       : $scope.Model.Remarks,
            UserId        : $rootScope.UserId
        }

        CommentsOnFourPointReport.SaveUpDateData(Obj, function (data) {
            $scope.Refresh();
            if (data[0].msg != '')
                $rootScope.alert("Data Saved Successfully");
            else
                $rootScope.alert("Error Occured To Save Data");

        });
    }


    //Edit Function for Edit Data
    $scope.EditData = function (obj) {
        $scope.Model.Batch = $scope.BatchList.find(x => x.BpmId == obj.BpmId);
        $scope.Model.Buyer = obj.BuyerName;
        $scope.Model.Job = obj.JobInfo;
        $scope.Model.Style = obj.StyleNo;
        $scope.Model.OrderNo = obj.OrderNo;
        $scope.Model.Color = obj.Color;
        $scope.Model.BodyPart = obj.BodyPart ? obj.BodyPart.trim() : '';
        $scope.Model.FabricLocation = obj.FabricLocation;
        $scope.Model.AopUnit = obj.AOPUnit;
        $scope.Model.Remarks = obj.Remarks;

        $scope.btnSave = 'Update';
    }


    //Delete Function
    function DeleteData (obj) {
        

        CommentsOnFourPointReport.DeleteCommentData(obj.Id, $rootScope.UserId, function (result) {

            if (result.length > 0) {
                $scope.Refresh();
                $rootScope.alert(result[0].msg || "Deleted successfully", "success");
            } else {
                $rootScope.alert(result.message || "Failed to delete", "error");
            }
        });
    }


    //Global Refresh Function
    $scope.Refresh = function () {
        $scope.AllData = [];
        $scope.Model.Unit = [];
        $scope.Model.Batch = undefined;
        $scope.Model.AopUnit = undefined;
        $scope.Model.FabricLocation = undefined;
        $scope.Model.BodyPart = undefined;
        $scope.Model.Remarks = undefined;
        $scope.Model.Buyer = undefined;
        $scope.Model.Job = undefined;
        $scope.Model.Style = undefined;
        $scope.Model.OrderNo = undefined;
        $scope.Model.Color = undefined;
    }


    //Helper function to Format Date
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



    //===============================
    // Pagination
    //===============================

    //Pagination
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    // Go to specific page
    $scope.setPage = function (page) {
        if (page >= 1 && page <= $scope.pageCount()) {
            $scope.currentPage = page;
        }
    };

    // Next / Prev
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };
    $scope.prevPage = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    };

    // Total number of pages
    $scope.pageCount = function () {
        if (!$scope.filtered) return 1;
        return Math.ceil($scope.filtered.length / $scope.pageSize);
    };

    // Generate page numbers for pagination
    $scope.getPageNumbers = function () {
        var numbers = [];
        for (var i = 1; i <= $scope.pageCount(); i++) {
            numbers.push(i);
        }
        return numbers;
    };

}]);