app.controller("BatchCardDashboardController", [
  "$scope",
  "$window",
  "$rootScope",
  "filterFilter",
  "$mdDialog",
  "BatchCardDashboardFactory",
  function(
    $scope,
    $window,
    $rootScope,
    filterFilter,
    $mdDialog,
    BatchCardDashboardFactory
  ) {
    //BatchCardDashboardFactory.GetBatchNo(function (data) { $scope.BatchList = data; });

    $scope.showPrevious = true;
    $scope.showBeforeAfter = false;
    $scope.batchType = "Bulk";
      $scope.RMode = "PB";

      $scope.FromDate = new Date();
      $scope.ToDate = new Date();

    $scope.checkSample = function() {
      $scope.batchType = "Sample";

      // updated by Sujan das on 30-Jan-2025
      $scope.RMode = "PB"; // Select "Previous" by default
      $scope.showPrevious = true;
      $scope.showBeforeAfter = false;

      $scope.ChangeMode();
    };

    $scope.checkBulk = function() {
      $scope.batchType = "Bulk";

      // updated by Sujan das on 30-Jan-2025
      $scope.RMode = "PB"; // Select "Previous" by default
      $scope.showPrevious = true;
      $scope.showBeforeAfter = false;

      $scope.ChangeMode();
    };

    $scope.checkNewBulk = function() {
      $scope.batchType = "NewBulk";

      $scope.RMode = "AI"; // Select "After Issue" by default
      $scope.showPrevious = false;
      $scope.showBeforeAfter = true;

      $scope.ChangeMode();
    };

    $scope.GetDashboardData = function(BpmId, flag) {
      //var BpmId = $scope.BpmId;
      debugger;
      let RUnitId = 0;
      if ($scope.RUnit) RUnitId = $scope.RUnit.Id;
        else RUnitId = $scope.Unit.Id;

        if ($scope.batchType == "Bulk")

        {
        if (flag == "S")
          $window.open(
            "../DashboardManagement/SwatchCard?BpmId=" +
              BpmId +
              "&&RUnitId=" +
              RUnitId +
              "&&Format=PDF#view=FitH"
          );
        else if ($scope.RMode == "PB")
          $window.open(
            "../DashboardManagement/BatchCardReportN?BpmId=" +
              BpmId +
              "&&Format=PDF#view=FitH"
          );
        else
          $window.open(
            "../DashboardManagement/BatchCardReportV2?BpmId=" +
              BpmId +
              "&&Format=PDF#view=FitH"
          );
        }

        else if ($scope.batchType == "Sample") {
            if (flag == "S")
                $window.open(
                    "../DashboardManagement/SwatchCardSample?BpmId=" +
                    BpmId +
                    "&&RUnitId=" +
                    RUnitId +
                    "&&Format=PDF#view=FitH"
                );
            else if ($scope.RMode == "PB") {
                let reportType = "N";
                const url = `../DashboardManagement/SampleBatchCardReport?BpmId=${BpmId}&Format=PDF&ReportType=${reportType}#view=FitH`;

                $window.open(url);
            }
        }

        else if ($scope.batchType == "NewBulk") {
            debugger;
            if (flag == "S") {
            debugger;
            $window.open(
                "../DashboardManagement/SwatchCardNewBulk?BpmId=" +
                BpmId +
                "&&RUnitId=" +
                RUnitId +
                "&&Format=PDF#view=FitH"
            );
        }
          else if (flag == "B") {
            //$window.open(
            //  "../DashboardManagement/NewBatchCardReport?BpmId=" +
            //    BpmId +
            //    "&&Format=PDF#view=FitH&&rType=o&&UnitNo=59"
                //    );
                debugger;
                $window.open('../DashboardManagement/NewBatchCardReport?BpmId=' + BpmId + '&&Format=PDF&&rType=o' + '&&UnitNo=' + RUnitId + '#view=FitH');
          }
      }
    };

    //BatchCardDashboardFactory.GetUnitByUser($rootScope.UserId, function(data) {
    //  debugger;
    //  $scope.UnitList = data;
    //  if ($scope.UnitList.length == 1) {
    //    $scope.Unit = $scope.UnitList[0];
    //  }
    //});

      BatchCardDashboardFactory.GetUnitWithoutUser( function (data) {
          debugger;
          $scope.UnitList = data;
         
      });


    BatchCardDashboardFactory.GetDyeingUnitAll(function(data) {
      $scope.ReportingUnit = data;
    });

    $scope.ChangeMode = function() {
      $scope.BatchCardData = [];
      $scope.totalItems = 0;
      $scope.FromDate = null;
      $scope.ToDate = null;
    };

    $scope.LoadingData = function() {
      let fromDate = null,
        toDate = null;

      let batchType = $scope.batchType;

      debugger;

      if (
        $scope.FromDate != undefined &&
        $scope.ToDate != undefined &&
        $scope.Unit.Id != undefined
      ) {
        fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
        toDate = moment($scope.ToDate).format("DD-MMM-YYYY");

        if (batchType == "Bulk") {
          if ($scope.RMode == "PB") {
            BatchCardDashboardFactory.GetBatchCardDataV1(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
          } else
            BatchCardDashboardFactory.GetBatchCardDataV2(
              $scope.Unit.Id,
              $scope.RMode,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
        } else if (batchType == "Sample") {
          if ($scope.RMode == "PB") {
            BatchCardDashboardFactory.GetBatchCardDataV1Sample(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
          } else
            BatchCardDashboardFactory.GetBatchCardDataV2Sample(
              $scope.Unit.Id,
              $scope.RMode,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
        } else if (batchType == "NewBulk") {
          //if ($scope.RMode == 'PB') {

          //    BatchCardDashboardFactory.GetBatchCardDataV1NewBulk($scope.Unit.Id, fromDate, toDate, function (data) { $scope.BatchCardData = data; $scope.totalItems = data.length; });
          //}

          if ($scope.RMode == "BI") {
            BatchCardDashboardFactory.GetBatchCardDataBeforeIssue(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
          } else if ($scope.RMode == "AI")
            BatchCardDashboardFactory.GetBatchCardDataAfterIssue(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $scope.BatchCardData = data;
                $scope.totalItems = data.length;
              }
            );
        }
      }
    };

    $scope.Refresh = function() {
      Refresh();
      $scope.search = "";
    };
    function Refresh() {
      $scope.Model = {};
      $scope.btnSave = "Save";
      $scope.Model.IsActive = true;
    }

    $scope.sort = function(keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    };

    // Start Pagination
    $scope.viewby = 20;

    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function(pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first page
    };
  }
]);
