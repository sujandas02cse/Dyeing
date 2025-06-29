app.controller("PackingListDashboard", [
  "$scope",
  "$window",
  "$rootScope",
  "Dashboard",
  function($scope, $window, $rootScope, Dashboard) {
    debugger;
    $scope.flag = 0;

    console.log($scope.batchType);

    $scope.checkSample = function() {
      $scope.batchType = "Sample";
      $scope.flag = 1;

      if (
        $scope.FromDate != undefined &&
        $scope.ToDate != undefined &&
        $scope.Unit.Id != undefined
      ) {
        fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
        toDate = moment($scope.ToDate).format("DD-MMM-YYYY");
        Dashboard.GetPackingListData(
          $scope.flag,
          $scope.Unit.Id,
          fromDate,
          toDate,
          function(data) {
            $scope.DashboardData = data;
            $scope.totalItems = data.length;
          }
        );
      }
    };

    $scope.checkBulk = function() {
      $scope.batchType = "Bulk";
      $scope.flag = 0;
      if (
        $scope.FromDate != undefined &&
        $scope.ToDate != undefined &&
        $scope.Unit.Id != undefined
      ) {
        fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
        toDate = moment($scope.ToDate).format("DD-MMM-YYYY");
        Dashboard.GetPackingListData(
          $scope.flag,
          $scope.Unit.Id,
          fromDate,
          toDate,
          function(data) {
            $scope.DashboardData = data;
            $scope.totalItems = data.length;
          }
        );
      }
    };

    $scope.checkNewBulk = function() {
      debugger;
      $scope.batchType = "NewBulk";
      $scope.flag = 2;
      if (
        $scope.FromDate != undefined &&
        $scope.ToDate != undefined &&
        $scope.Unit.Id != undefined
      ) {
        fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
        toDate = moment($scope.ToDate).format("DD-MMM-YYYY");
        Dashboard.GetPackingListDataNew(
          $scope.flag,
          $scope.Unit.Id,
          fromDate,
          toDate,
          function(data) {
            $scope.DashboardData = data;
            $scope.totalItems = data.length;
          }
        );
      }
    };

    $scope.GetDashboardData = function(Id) {
      console.log($scope.batchType);
      const batchTypeEncoded = encodeURIComponent($scope.batchType);
      const url = `../DashboardManagement/GetPackingListReport?PackingId=${Id}&Format=PDF&BatchType=${batchTypeEncoded}#view=FitH`;
      $window.open(url);
    };

    Dashboard.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    $scope.LoadingData = function() {
      debugger;

      let fromDate = null,
        toDate = null;

      if (
        $scope.FromDate != undefined &&
        $scope.ToDate != undefined &&
        $scope.Unit.Id != undefined
      ) {
        fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
        toDate = moment($scope.ToDate).format("DD-MMM-YYYY");

        if ($scope.batchType == "Bulk" || $scope.batchType == "Sample") {
          Dashboard.GetPackingListData(
            $scope.flag,
            $scope.Unit.Id,
            fromDate,
            toDate,
            function(data) {
              $scope.DashboardData = data;
              $scope.totalItems = data.length;
            }
          );
        } else if ($scope.batchType == "NewBulk") {
          Dashboard.GetPackingListDataNew(
            $scope.flag,
            $scope.Unit.Id,
            fromDate,
            toDate,
            function(data) {
              $scope.DashboardData = data;
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
      $scope.currentPage = 1; //reset to first paghe
    };
  }
]);
