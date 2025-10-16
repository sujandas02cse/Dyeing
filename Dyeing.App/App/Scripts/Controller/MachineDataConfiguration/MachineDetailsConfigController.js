app.controller("MachineDetailsConfigController", ["$scope","$rootScope","$mdDialog","$mdToast","MachineDetailsConfig",function($scope, $rootScope, $mdDialog, $mdToast, MachineDetailsConfig) {
    var objMachineName = [];
    var objMachineType = [];
    var objMachineModel = [];
    var objMachineBrand = [];
    var objMachineCapacity = [];
    var objMachineAsset = [];
    var objUnitName = [];
    var obj = [];

    var self = this;
    var simulateQuery = false;

    /*updated by Sujan Das on 10-Sep-25*/
    var objBuildingName = [];
    var objFloorName = [];

    GetMachineDetail();

    MachineDetailsConfig.GetMachineName("Name", function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["MId"], display: val["MachineEng"] };
        objMachineName.push(vd);
      });
    });
    self.MachineNameList = objMachineName;
    MachineDetailsConfig.GetMachineName("Type", function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["MId"], display: val["MachineEng"] };
        objMachineType.push(vd);
      });
    });
    self.MachineTypeList = objMachineType;
    MachineDetailsConfig.GetMachineName("Model", function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["MId"], display: val["MachineEng"] };
        objMachineModel.push(vd);
      });
    });
    self.MachineModelList = objMachineModel;
    MachineDetailsConfig.GetMachineBrand(function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["IBRID"], display: val["ItemBrandName"] };
        objMachineBrand.push(vd);
      });
    });
    self.MachineBrandList = objMachineBrand;
    MachineDetailsConfig.GetMachinesearchCapacity(function(data) {
      angular.forEach(data, function(val, key) {
        var vd = {
          value: val["MCapacityId"],
          display: val["CapacityName"].toString()
        };
        objMachineCapacity.push(vd);
      });
    });
    self.MachineCapacityList = objMachineCapacity;
    MachineDetailsConfig.GetMachineAsset(function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["Id"], display: val["AssetNo"] };
        objMachineAsset.push(vd);
      });
    });
    self.MachineAssetList = objMachineAsset;
    MachineDetailsConfig.GetUnitName(function(data) {
      angular.forEach(data, function(val, key) {
        var vd = { value: val["UnitNo"], display: val["UnitEName"] };
        objUnitName.push(vd);
      });
    });
    self.UnitNameList = objUnitName;

    var suppressCascade = false;
    var suppressFloorCascade = false;

    $scope.GetBuildingsByUnit = function(unitItem) {
      if (suppressCascade) return;
      PopulateBuildingByUnit(unitItem);
    };

    function PopulateBuildingByUnit(unitItem) {
      objBuildingName.length = 0;
      objFloorName.length = 0;
      $scope.selectedBuildingName = null;
      $scope.selectedFloorName = null;

      // if user cleared the unit, stop here
      if (!unitItem || !unitItem.value) return;

      MachineDetailsConfig.GetBuildingsByUnit(unitItem.value, function(data) {
        angular.forEach(data, function(val) {
          objBuildingName.push({
            value: val.BuildingId,
            display: val.BuildingName
          });
        });
      });
    }

    self.BuildingList = objBuildingName;

    $scope.GetFloorsByBuilding = function(buildingItem) {
      if (suppressFloorCascade) return;
      PopulateFloorByBuilding(buildingItem);
    };

    function PopulateFloorByBuilding(buildingItem) {
      objFloorName.length = 0;
      $scope.selectedFloorName = null;

      // if user cleared the building, stop here

      if (!buildingItem || !buildingItem.value) return;

      MachineDetailsConfig.GetFloorsByBuilding(buildingItem.value, function(
        data
      ) {
        angular.forEach(data, function(val) {
          objFloorName.push({
            value: val.FloorNo,
            display: val.FloorName
          });
        });
      });
    }

    self.FloorList = objFloorName;

    $scope.querySearch = querySearch;

    function querySearch(query, cn) {
      if (cn == "Name") {
        obj = objMachineName;
        self.list = self.MachineNameList;
      }
      if (cn == "Type") {
        obj = objMachineType;
        self.list = self.MachineTypeList;
      }
      if (cn == "Model") {
        obj = objMachineModel;
        self.list = self.MachineModelList;
      }
      if (cn == "Brand") {
        obj = objMachineBrand;
        self.list = self.MachineBrandList;
      }
      if (cn == "Capacity") {
        obj = objMachineCapacity;
        self.list = self.MachineCapacityList;
      }
      if (cn == "Asset") {
        obj = objMachineAsset;
        self.list = self.MachineAssetList;
      }
      if (cn == "Unit") {
        obj = objUnitName;
        self.list = self.UnitNameList;
      }

      if (cn == "Building") {
        obj = objBuildingName;
        self.list = self.BuildingList;
      }

      if (cn == "Floor") {
        obj = objFloorName;
        self.list = self.FloorList;
      }

      var results = query
          ? self.list.filter(createFilter(query, obj))
          : self.list,
        deferred;
      if (simulateQuery) {
        deferred = $q.defer();
        $timeout(
          function() {
            deferred.resolve(results);
          },
          Math.random() * 1000,
          false
        );
        return deferred.promise;
      } else {
        return results;
      }
    }

    function createFilter(query, List) {
      var lowercaseQuery = query;
      return function filterFn(List) {
        return List.display.toLowerCase().indexOf(lowercaseQuery) === 0;
      };
    }

    $scope.actionDialog = function(action, dataModel) {
      $mdDialog
        .show(
          $mdDialog.dialogBox({
            locals: {
              model: objData(action)
            }
          })
        )
        .then(function(mode) {
          if (mode == "Update" || mode == "Save") {
            SaveUpdate();
          } else if (mode == "Delete") {
            Delete(dataModel);
          }
        });
    };

    function SaveUpdate() {
      $scope.Model.UserId = $scope.UserId;
      if ($scope.selectedName != null) {
        $scope.Model.MachineId = $scope.selectedName.value;
      } else {
        $scope.Model.MachineId = 0;
      }
      if ($scope.selectedType != null) {
        $scope.Model.MTypeId = $scope.selectedType.value;
      } else {
        $scope.Model.MTypeId = 0;
      }
      if ($scope.selectedBrand != null) {
        $scope.Model.MBrandId = $scope.selectedBrand.value;
      } else {
        $scope.Model.MBrandId = 0;
      }
      if ($scope.selectedModel != null) {
        $scope.Model.MModelId = $scope.selectedModel.value;
      } else {
        $scope.Model.MBrandId = 0;
      }
      if ($scope.selectedCapacity != null) {
        $scope.Model.MCapacityId = $scope.selectedCapacity.value;
      } else {
        $scope.Model.MCapacityId = 0;
      }
      if ($scope.selectedAsset != null) {
        $scope.Model.AssetId = $scope.selectedAsset.value;
      } else {
        $scope.Model.AssetId = 0;
      }
      if ($scope.selectedUnitName != null) {
        $scope.Model.UnitId = $scope.selectedUnitName.value;
      } else {
        $scope.Model.UnitId = 0;
      }

      if ($scope.selectedBuildingName != null) {
        $scope.Model.BuildingNo = $scope.selectedBuildingName.value;
      } else {
        $scope.Model.BuildngNo = 0;
      }

      if ($scope.selectedFloorName != null) {
        $scope.Model.FloorNo = $scope.selectedFloorName.value;
      } else {
        $scope.Model.FloorNo = 0;
      }

      console.log($scope.Model);


      MachineDetailsConfig.MachineDetails_SaveUpdate($scope.Model, function(
        data
      ) {
        if (data.ErrorMsg == null) {
          $rootScope.alert(data.Msg);
          GetMachineDetail();
          Refresh();
        } else $rootScope.alert(data.ErrorMsg);
      });
    }

    function GetMachineDetail() {
      MachineDetailsConfig.GetMachineDetail(function(data) {
        $scope.MachineDetailsInfo = data;
        $scope.totalItems = data.length;
      });
    }
    $scope.Refresh = function() {
      Refresh();
    };
    function Refresh() {
      $scope.Model = null;
      $scope.selectedName = null;
      $scope.selectedType = null;
      $scope.selectedBrand = null;
      $scope.selectedModel = null;
      $scope.selectedAsset = null;
      $scope.selectedUnitName = null;
      $scope.selectedCapacity = null;

      $scope.selectedBuildingName = null;
      $scope.selectedFloorName = null;

      $scope.btnSave = "Save";
      objBuildingName.length = 0;
      objFloorName.length = 0;
    }
    function objData(action) {
      var obj = [];
      if (action == "Save") {
        obj = {
          Mode: "Save",
          btnText: "Yes",
          Header: "Save Confirmation",
          message: "Do you want to save Machine Name Configuration Data?"
        };
      } else if (action == "Update") {
        obj = {
          Mode: "Update",
          btnText: "Yes",
          Header: "Update Confirmation",
          message: "Do you want to update Machine Name Configuration Data?"
        };
      } else if (action == "Delete") {
        obj = {
          Mode: "Delete",
          btnText: "Yes",
          Header: "Delete Confirmation",
          message: "Do you want to delete Machine Name Configuration Data?"
        };
      }
      return obj;
    }
    function Delete(dataModel) {
      MachineDetailsConfig.DeleteMachineDetail(
        dataModel.MDId,
        $scope.UserId,
        function(data) {
          //$mdToast.show($mdToast.customToast({ locals: { message: data.Msg } }));
          $rootScope.alert(data.Msg);
          GetMachineDetail()("");
          Refresh();
        }
      );
    }

    $scope.GetMachineDetailByID = function(dataModel) {
      $scope.btnSave = "Update";
      $scope.Model = dataModel;

      if (dataModel.MachineName != null) {
        $scope.selectedName = {
          value: dataModel.MachineId,
          display: dataModel.MachineName
        };
      }
      if (dataModel.MachineType != null) {
        $scope.selectedType = {
          value: dataModel.MTypeId,
          display: dataModel.MachineType
        };
      }
      if (dataModel.ItemBrandName != null) {
        $scope.selectedBrand = {
          value: dataModel.MBrandId,
          display: dataModel.ItemBrandName
        };
      }
      if (dataModel.MachineModel != null) {
        $scope.selectedModel = {
          value: dataModel.MModelId,
          display: dataModel.MachineModel
        };
      }
      if (dataModel.CapacityName != null) {
        $scope.selectedCapacity = {
          value: dataModel.MCapacityId,
          display: dataModel.CapacityName.toString()
        };
      }
      if (dataModel.AssetNo != null) {
        $scope.selectedAsset = {
          value: dataModel.AssetId,
          display: dataModel.AssetNo
        };
      }

      objBuildingName.length = 0;
      objFloorName.length = 0;
      $scope.selectedBuildingName = null;
      $scope.selectedFloorName = null;
      suppressCascade = true;

      if (dataModel.UnitEName != null) {
        $scope.selectedUnitName = {
          value: dataModel.UnitId,
          display: dataModel.UnitEName
        };

        MachineDetailsConfig.GetBuildingsByUnit(dataModel.UnitId, function(
          buildings
        ) {
          objBuildingName.length = 0;
          var seenB = Object.create(null);

          angular.forEach(buildings, function(b) {
            if (!seenB[b.BuildingId]) {
              objBuildingName.push({
                value: b.BuildingId,
                display: b.BuildingName || ""
              });
              seenB[b.BuildingId] = true;
            }
          });

            if (dataModel.BuildingNo && dataModel.BuildingName) {
                suppressFloorCascade = true;
            $scope.selectedBuildingName = {
              value: dataModel.BuildingNo,
              display: dataModel.BuildingName
            };
            $scope.Model.BuildingNo = dataModel.BuildingNo;

            MachineDetailsConfig.GetFloorsByBuilding(
              dataModel.BuildingNo,
              function(floors) {
                objFloorName.length = 0;

                var seenF = Object.create(null);

                angular.forEach(floors, function(f) {
                  if (!seenF[f.FloorNo]) {
                    objFloorName.push({
                      value: f.FloorNo,
                      display: f.FloorName || ""
                    });
                    seenF[f.FloorNo] = true;
                  }
                });
                if (dataModel.FloorNo && dataModel.FloorName) {
                  $scope.selectedFloorName = {
                    value: dataModel.FloorNo,
                    display: dataModel.FloorName
                  };
                  $scope.Model.FloorNo = dataModel.FloorNo;
                }
                  suppressCascade = false;
                  suppressFloorCascade = false;
              }
            );
          } else {
                suppressCascade = false;
                suppressFloorCascade = false;
          }
        });
      } else {
          suppressCascade = false;
          suppressFloorCascade = false;
        $scope.selectedUnitName = null;
      }
    };

    $scope.sort = function(keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    };

    // Start Pagination
    $scope.viewby = 1000;

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
//alert(1);
//app.controller("MachineDetailsConfigController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'filterFilter', 'SBGenFactory', function ($scope, $rootScope, $mdDialog, $mdToast, filterFilter, MachineDetailsConfig) {
//    //alert(1);
//}]);
