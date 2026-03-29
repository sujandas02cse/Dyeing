app.controller("MachineOperationConfigController", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "$location",
  "McOperationConfigFactory",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $q,
    $parse,
    fileReader,
    $window,
    $location,
    McOperationConfigFactory
  ) {
    debugger;
      $scope.selectAll = false;
      $scope.PageTitle =
          $location.search().menuName || "M/C Operation Configuration";

      $scope.ParentTitle =
          $location.search().parentName || "Machine Data Configuration";

      $scope.machineList = [
          { id: 1, name: 'Machine1' },
          { id: 2, name: 'Machine2' },
          { id: 3, name: 'Machine3' }
      ];
      $scope.fabricList = [
          { bodyPart: 'Sleeve', fabricType: 'Cotton', composition: '100% Cotton', gsm: 180, dia: 36, qty: 50 },
          { bodyPart: 'Body', fabricType: 'Polyester', composition: '60% Poly 40% Cotton', gsm: 200, dia: 34, qty: 40 },
          { bodyPart: 'Collar', fabricType: 'Cotton', composition: '100% Cotton', gsm: 220, dia: 30, qty: 20 }
      ];

    
      $scope.toggleAll = function () {
          angular.forEach($scope.fabricList, function (item) {
              item.selected = !$scope.selectAll;
          });

          document.getElementById("selectAll").indeterminate = false;
      };

      $scope.checkIfAllSelected = function () {
          console.log('Test toggle checkIfAllSelected')
          var total = $scope.fabricList.length;
          var checked = 0;

          angular.forEach($scope.fabricList, function (item) {
              if (item.selected) checked++;
          });

          var selectAllCheckbox = document.getElementById("selectAll");

          if (checked === 0) {
              $scope.selectAll = false;
              selectAllCheckbox.indeterminate = false;
          }
          else if (checked === total) {
              $scope.selectAll = true;
              selectAllCheckbox.indeterminate = false;
          }
          else {
              $scope.selectAll = false;
              selectAllCheckbox.indeterminate = true;
          }
      };


      $window.document.title = $scope.PageTitle;
  }
]);
