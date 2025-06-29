app.controller("FabricMgtController", [
  "$scope",
  "$rootScope",
  "$window",
  "filterFilter",
  "$compile",
  "$parse",
  "FabricMgt",
  function(
    $scope,
    $rootScope,
    $window,
    filterFilter,
    $compile,
    $parse,
    FabricMgt
  ) {
    debugger;
    $scope.flag = 0;

    $scope.checkOld = function() {
      debugger;
      $scope.batchType = "Old";
      $scope.flag = 0;

      FabricMgt.GetReportInfo(
        "FabricManagement",
        $rootScope.UserId,
        $scope.flag,
        function(data) {
          debugger;
          $scope.rptInfoList = data;
        }
      );
    };

    $scope.checkNew = function() {
      debugger;
      $scope.batchType = "New";
      $scope.flag = 2;

      FabricMgt.GetReportInfo(
        "FabricManagement",
        $rootScope.UserId,
        $scope.flag,
        function(data) {
          debugger;
          $scope.rptInfoList = data;
        }
      );
    };

    //Load Dropdown Data
    FabricMgt.GetReportInfo(
      "FabricManagement",
      $rootScope.UserId,
      $scope.flag,
      function(data) {
        $scope.rptInfoList = data;
      }
    );

    //FabricMgt.GetUnitInfo('', function (data) { $scope.unitInfo = data; });
    FabricMgt.GetBuyerInfo(function(data) {
      $scope.BuyerList = data;
    });

    // Updated By Sujan Das on 09-April-2025 to load Unit DropDown User Id Wise

    /* FabricMgt.GetDyeingUnit(function (data) { $scope.DyeingUnitInfo = data; });*/

    FabricMgt.GetDyeingUnit($rootScope.UserId, function(data) {
      $scope.DyeingUnitInfo = data;
    });

    FabricMgt.GetMachineAll(function(data) {
      $scope.MachineInfo = data;
      console.log("machine", data);
    });
    //FabricMgt.GetBatchData($scope.BuyerId, $scope.JobId, function (data) { $scope.BatchList = data; });

    $scope.MCategoryList = [
      { MCategory: "Dyeing", Desc: "Dyeing Machine" },
      { MCategory: "Slitting", Desc: "Slitting Machine" },
      { MCategory: "Stenter", Desc: "Stenter Machine" },
      { MCategory: "Dryer", Desc: "Dryer Machine" },
      { MCategory: "Compacting", Desc: "Compacting Machine" }
    ];

    function GenerateUI() {
      debugger;
      var NoOfParms = $scope.rptParamList.length;

      if (document.getElementById("divParm"))
        document.getElementById("divParm").remove();

      debugger;

      var divhtml =
        "<ng-form id='form' name='form' style='width:100%;'><div id='divParm' style='padding: 0; margin:0' class='form-group row col-md-12'>";
      for (i = 0; i < NoOfParms; i++) {
        if ($scope.rptParamList[i].Category == "Dropdown") {
          divhtml +=
            "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" +
            $scope.rptParamList[i].LabelName +
            "<span ng-if='" +
            $scope.rptParamList[i].IsRequired +
            "' class='required'> * </span></label> <div class='col-md-7'><input type='text' list='" +
            $scope.rptParamList[i].ParmName +
            "' ng-model='parmData." +
            $scope.rptParamList[i].ParmName +
            "' placeholder='" +
            $scope.rptParamList[i].Placeholder +
            "' class='form-control input-height' ng-required='" +
            $scope.rptParamList[i].IsRequired +
            "' /><datalist id='" +
            $scope.rptParamList[i].ParmName +
            "'> <option ng-repeat='" +
            $scope.rptParamList[i].Options +
            "' value='{{" +
            $scope.rptParamList[i].Field1 +
            "}}' id='{{" +
            $scope.rptParamList[i].Field2 +
            "}}'>{{ " +
            $scope.rptParamList[i].Field3 +
            "}}</option></datalist></div> </div ></div >";
        } else if ($scope.rptParamList[i].Category == "Datepicker") {
          divhtml +=
            "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" +
            $scope.rptParamList[i].LabelName +
            "<span ng-if='" +
            $scope.rptParamList[i].IsRequired +
            "' class='required'> * </span></label><div class='col-md-7'><md-datepicker ng-required='" +
            $scope.rptParamList[i].IsRequired +
            "' ng-model='parmData." +
            $scope.rptParamList[i].ParmName +
            "' md-placeholder='" +
            $scope.rptParamList[i].Placeholder +
            "' md-hide-icons='calendar' md-open-on-focus></md-datepicker></div></div></div>";
          //divhtml += "<div class='col-md-6' ng-if='model.Datepicker==1'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><md-datepicker ng-required='" + $scope.rptParamList[i].IsRequired + "' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' md-placeholder='" + $scope.rptParamList[i].Placeholder + "' md-hide-icons='calendar' md-open-on-focus></md-datepicker></div> </div></div>";
        } else if ($scope.rptParamList[i].Category == "Multiselect") {
          divhtml +=
            "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" +
            $scope.rptParamList[i].LabelName +
            "<span ng-if='" +
            $scope.rptParamList[i].IsRequired +
            "' class='required'> * </span></label> <div class='col-md-7'><multiselect class='input-xlarge multiselect' ng-model='parmData." +
            $scope.rptParamList[i].ParmName +
            "' options='{{" +
            $scope.rptParamList[i].Options +
            "}}' header = '" +
            $scope.rptParamList[i].Placeholder +
            "' selected-header='options selected' multiple = 'true' enable-filter='true' ng-required='" +
            $scope.rptParamList[i].IsRequired +
            "' filter-placeholder='{{" +
            $scope.rptParamList[i].Placeholder +
            "}}'></multiselect ></div> </div ></div >";
        } else if ($scope.rptParamList[i].Category == "Typeahead") {
          divhtml +=
            "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" +
            $scope.rptParamList[i].LabelName +
            "<span ng-if='" +
            $scope.rptParamList[i].IsRequired +
            "' class='required'> * </span></label> <div class='col-md-7'><input type='text' typeahead-min-length='1' uib-typeahead='" +
            $scope.rptParamList[i].Options +
            "' ng-model='parmData." +
            $scope.rptParamList[i].ParmName +
            "' placeholder='" +
            $scope.rptParamList[i].Placeholder +
            "' class='form-control input-height' ng-required='" +
            $scope.rptParamList[i].IsRequired +
            "'  " +
            $scope.rptParamList[i].NestedEvent +
            " /></div> </div></div>";
        }
      }
      divhtml += "</div></ng-form>";
      divhtml = $compile(divhtml)($scope);
      angular.element(document.getElementById("genUI")).after(divhtml);
    }

    $scope.GetDataByBuyer = function(obj) {
      debugger;
      FabricMgt.GetJobInfo(obj.BuyerId, function(data) {
        $scope.JobList = data;
      });
      //alert(buyer.BuyerId);
    };

    $scope.GetMachineByCategory = function() {
      debugger;
      console.log("yes", 1);
      let paramVal = $scope.parmData.MCategory.MCategory;
      $scope.MachineList = $scope.MachineInfo.filter(x =>
        x.MCategory.includes(paramVal)
      );
    };

    $scope.GetDataByBuyerJob = function() {
      $scope.parmData.Order = "";
      $scope.parmData.Batch = "";
      $scope.parmData.Fabric = "";

      FabricMgt.GetStyleByBuyer(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        function(data) {
          $scope.StyleList = data;
          if ($scope.StyleList.length === 1) {
            $scope.parmData.Style = $scope.StyleList[0];
          }
        }
      );
      FabricMgt.GetOrderByBuyer(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        function(data) {
          $scope.OrderList = data;
          if ($scope.OrderList.length === 1) {
            $scope.parmData.Order = $scope.OrderList[0];
          }
        }
      );
      FabricMgt.GetBatchByBuyer(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        function(data) {
          $scope.BatchList = data;
          if ($scope.BatchList.length === 1) {
            $scope.parmData.Batch = $scope.BatchList[0];
          }
        }
      );

      FabricMgt.GetFabricList(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        function(data) {
          $scope.FabricList = data;
          if ($scope.FabricList.length === 1) {
            $scope.parmData.Fabric = $scope.FabricList[0];
            console.log($scope.parmData.Fabric);
          }
        }
      );
    };

    $scope.data = [
      {
        LabelName: null,
        ParmName: null,
        Select: null,
        Category: null,
        Date: null,
        MultiSelect: null,
        Options: null,
        IsRequired: false,
        SeqNo: null,
        Placeholder: null
      }
    ];

    $scope.GetParmInfo = function() {
      debugger;
      $scope.parmData = {};
      $scope.Model = filterFilter(
        $scope.rptInfoList,
        { ReportingId: $scope.rpt.ReportingId },
        true
      );

      if (
        $scope.rpt.ReportingId != null ||
        $scope.rpt.ReportingId != undefined
      ) {
        FabricMgt.GetRptParam($scope.rpt.ReportingId, function(data) {
          $scope.rptParamList = data;
          GenerateUI();

            // Updated By Sujan Das on 09-April-2025 to load Unit DropDown User Id Wise
            debugger;
          let unitParm = $scope.rptParamList.find(
            p => p.LabelName === "Unit Name"
          );
          if ($scope.DyeingUnitInfo.length === 1) {
            $scope.parmData[unitParm.ParmName] = $scope.DyeingUnitInfo[0];
            }

        });
      }
    };

    $scope.ReportView = function(Format) {
      debugger;
      var rptParm = "[";
      for (var i = 0; i < $scope.rptParamList.length; i++) {
        if ($scope.rptParamList[i].Category == "Dropdown") {
          var id = "#" + $scope.rptParamList[i].ParmName;
          var scope = "parmData." + $scope.rptParamList[i].ParmName;
          var data = $scope.$eval(scope);
          //alert(data);

          var parmValue = $(id)
            .find('option[value="' + data + '"]')
            .attr("id");
          rptParm +=
            (rptParm.length > 1 ? "," : "") +
            "{" +
            '"' +
            $scope.rptParamList[i].ParmName +
            '"' +
            ":" +
            '"' +
            parmValue +
            '"' +
            "}";
        } else if ($scope.rptParamList[i].Category == "Datepicker") {
          //var Date = "";
          var scope = "parmData." + $scope.rptParamList[i].ParmName; // + "." + $scope.rptParamList[i].Field1;
          var parmValue = $scope.$eval(scope);
          parmValue = moment(parmValue).format("DD-MMM-YYYY");

          //if ($scope.rptParamList[i].ParmName != null) Date = moment($scope.rptParamList[i].ParmName).format('DD-MMM-YYYY');
          rptParm +=
            (rptParm.length > 1 ? "," : "") +
            "{" +
            '"' +
            $scope.rptParamList[i].ParmName +
            '"' +
            ":" +
            '"' +
            parmValue +
            '"' +
            "}";
        } else if ($scope.rptParamList[i].Category == "Multiselect") {
          rptParm +=
            (rptParm.length > 1 ? "," : "") +
            "{" +
            '"' +
            $scope.rptParamList[i].ParmName +
            '"' +
            ":" +
            '"' +
            $scope.rptParamList[i].MultiSelect +
            '"' +
            "}";
        } else if ($scope.rptParamList[i].Category == "Typeahead") {
          var scope =
            "parmData." +
            $scope.rptParamList[i].ParmName +
            "." +
            $scope.rptParamList[i].Field1;
          var parmValue = $scope.$eval(scope);

          rptParm +=
            (rptParm.length > 1 ? "," : "") +
            "{" +
            '"' +
            $scope.rptParamList[i].Field1 +
            '"' +
            ":" +
            '"' +
            parmValue +
            '"' +
            "}";
        }
      }
      rptParm += "]";

      var rptComInfo = "[";
      if ($scope.Model[0].APIAction.length > 0)
        rptComInfo +=
          "{" +
          '"APIAction"' +
          ":" +
          '"' +
          $scope.Model[0].APIAction +
          '"' +
          "}";
      if ($scope.Model[0].ReportPath.length > 0)
        rptComInfo +=
          (rptComInfo.length > 1 ? "," : "") +
          "{" +
          '"ReportPath"' +
          ":" +
          '"' +
          $scope.Model[0].ReportPath +
          '"' +
          "}";
      if ($scope.Model[0].FileName.length > 0)
        rptComInfo +=
          (rptComInfo.length > 1 ? "," : "") +
          "{" +
          '"FileName"' +
          ":" +
          '"' +
          $scope.Model[0].FileName +
          '"' +
          "}";
      if (Format.length > 0)
        rptComInfo +=
          (rptComInfo.length > 1 ? "," : "") +
          "{" +
          '"Format"' +
          ":" +
          '"' +
          Format +
          '"' +
          "}";
      rptComInfo += "]";

      var SQL = "[";
      if ($scope.Model[0].SQL.length > 0)
        SQL += "{" + '"SQL"' + ":" + '"' + $scope.Model[0].SQL + '"' + "}";
      if ($scope.Model[0].SQL1.length > 0)
        SQL +=
          (SQL.length > 1 ? "," : "") +
          "{" +
          '"SQL1"' +
          ":" +
          '"' +
          $scope.Model[0].SQL1 +
          '"' +
          "}";
      if ($scope.Model[0].SQL2.length > 0)
        SQL +=
          (SQL.length > 1 ? "," : "") +
          "{" +
          '"SQL2"' +
          ":" +
          '"' +
          $scope.Model[0].SQL2 +
          '"' +
          "}";
      SQL += "]";

      var Dataset = "[";
      if ($scope.Model[0].Dataset.length > 0)
        Dataset +=
          "{'Dataset'" + ":" + '"' + $scope.Model[0].Dataset + '"' + "}";
      if ($scope.Model[0].Dataset1.length > 0)
        Dataset +=
          (Dataset.length > 1 ? "," : "") +
          "{" +
          '"Dataset1"' +
          ":" +
          '"' +
          $scope.Model[0].Dataset1 +
          '"' +
          "}";
      if ($scope.Model[0].Dataset2.length > 0)
        Dataset +=
          (Dataset.length > 1 ? "," : "") +
          "{" +
          '"Dataset2"' +
          ":" +
          '"' +
          $scope.Model[0].Dataset2 +
          '"' +
          "}";
      Dataset += "]";

      // $window.open('GetAMSReport?APIAction=' + $scope.Model[0].APIAction + '&&ReportPath=' + $scope.Model[0].ReportPath + '&&FileName=' + $scope.Model[0].FileName + '&&Dataset=' + $scope.Model[0].Dataset + '&&SQL=' + $scope.Model[0].SQL + '&&rptParm=' + encodeURIComponent(rptParm) + '&&Format=' + format);
      $window.open(
        "../BroadcastManagement/GetBroadcastData?rptComInfo=" +
          encodeURIComponent(rptComInfo) +
          "&&rptParm=" +
          encodeURIComponent(rptParm) +
          "&&SQL=" +
          encodeURIComponent(SQL) +
          "&&Dataset=" +
          encodeURIComponent(Dataset)
      );
    };

    function InitilState() {
      $scope.rptParamList = angular.copy($scope.data);
    }

    $scope.Refresh = function() {
      InitilState();
      //$scope.rpt.ReportingId = null;
      $scope.parmData = {};
    };
  }
]);
