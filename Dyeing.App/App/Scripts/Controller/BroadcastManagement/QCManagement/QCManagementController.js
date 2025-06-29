app.controller("QCManagementController", [
  "$scope",
  "$rootScope",
  "$window",
  "filterFilter",
  "$compile",
  "$parse",
  "QCManagement",
  function(
    $scope,
    $rootScope,
    $window,
    filterFilter,
    $compile,
    $parse,
    QCManagement
  ) {
    debugger;
    $scope.flag = 0;
    $scope.batchType = "Bulk";

    $scope.checkSample = function() {
      $scope.batchType = "Sample";
      $scope.flag = 1;
      QCManagement.GetReportInfo(
        "QCManagement",
        $rootScope.UserId,
        $scope.flag,
        function(data) {
          debugger;
          $scope.rptInfoList = data;
        }
      );

      loadBatchList();
    };

    $scope.checkBulk = function() {
      $scope.batchType = "Bulk";
      $scope.flag = 0;
      QCManagement.GetReportInfo(
        "QCManagement",
        $rootScope.UserId,
        $scope.flag,
        function(data) {
          debugger;

          $scope.rptInfoList = data;
        }
      );

      loadBatchList();
    };

    $scope.checkNew = function() {
      $scope.batchType = "New";
      $scope.flag = 2;
      QCManagement.GetReportInfo(
        "QCManagement",
        $rootScope.UserId,
        $scope.flag,
        function(data) {
          debugger;

          $scope.rptInfoList = data;
        }
      );
      loadBatchList();
    };

    QCManagement.GetDyeingUnit($rootScope.UserId, function(data) {
      debugger;
      $scope.DyeingUnitInfo = data;

      // Updated by Sujan Das on 2025-May-03 to show the unit name if user
      //has onle one permisson
      debugger;
      if ($scope.DyeingUnitInfo.length === 1) {
        $scope.parmData.Unit = $scope.DyeingUnitInfo[0];
      }
    });
    //Load Dropdown Data

    QCManagement.GetReportInfo(
      "QCManagement",
      $rootScope.UserId,
      $scope.flag,
      function(data) {
        debugger;

        $scope.rptInfoList = data;
      }
    );

    //QCManagement.GetUnitInfo('', function (data) { $scope.unitInfo = data; });
    QCManagement.GetBuyerInfo(function(data) {
      $scope.BuyerList = data;
    });

    $scope.CompactingTime = [
      { CompTime: 1, Label: "1st Time" },
      { CompTime: 2, Label: "2nd Time" }
    ];
    //QCManagement.GetBatchData($scope.BuyerId, $scope.JobId, function (data) { $scope.BatchList = data; });

    function GenerateUI() {
      debugger;

      var NoOfParms = $scope.rptParamList.length;
      if (document.getElementById("divParm"))
        document.getElementById("divParm").remove();
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
          //divhtml += "<div class='col-md-6' ng-if='model.Datepicker==1'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><md-datepicker ng-required='" + $scope.rptParamList[i].IsRequired + "' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' md-placeholder='" + $scope.rptParamList[i].Placeholder + "' md-hide-icons='calendar' md-open-on-focus></md-datepicker></div> </div ></div >";
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
            "' class='form-control input-height' typeahead-editable='false' ng-required='" +
            $scope.rptParamList[i].IsRequired +
            "'  " +
            $scope.rptParamList[i].NestedEvent +
            " /></div> </div ></div >";
        }
      }
      divhtml += "</div></ng-form>";
      divhtml = $compile(divhtml)($scope);
      angular.element(document.getElementById("genUI")).after(divhtml);

      if ($scope.DyeingUnitInfo.length == 1) {
        $scope.parmData.Unit = $scope.DyeingUnitInfo[0];
      }
    }

    $scope.genCompTime = function(compTime) {
      if (compTime > 1) {
        for (i = 2; i <= compTime; i++) {
          let model = {
            id: i,
            name: i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
          };
          let isExist = $scope.CompactingTime.filter(x => x.id == i);
          if (isExist.length == 0) $scope.CompactingTime.push(model);
        }
      }
    };

    $scope.GetCompTimeByBatch = function() {
      debugger;

      //Updated by Sujan Das on 15-01-2025 to fetch the Report Info of New System

      //if ($scope.parmData.Batch.STATUS == "New") {
      //  $scope.flag = 2;
      //  QCManagement.GetReportInfo(
      //    "QCManagement",
      //    $rootScope.UserId,
      //    $scope.flag,
      //    function(data) {
      //      debugger;
      //      $scope.rptInfoList = data;
      //    }
      //  );
      //}

      // Updated by Sujan Das on 12-01-2025 to fetch the compactingTime from Old and New Batch

      if ($scope.parmData.Batch.STATUS == "Old") {
        QCManagement.GetCompTimeById($scope.parmData.Batch.BpmId, function(
          data
        ) {
          //$scope.RollNoInfo = data;
          if (data.length > 0) {
            let compTime = data[data.length - 1].CompTime;

            if (compTime > 1) {
              for (i = 2; i <= compTime; i++) {
                let model = {
                  CompTime: i,
                  Label:
                    i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                };
                let isExist = $scope.CompactingTime.filter(
                  x => x.CompTime == i
                );
                if (isExist.length == 0) $scope.CompactingTime.push(model);
              }
            }
            $scope.parmData.CompTime = $scope.CompactingTime.filter(
              x => x.CompTime == compTime
            )[0];

            // updated by Sujan Das on 03-May-25 to show Unit

           // $scope.parmData.Unit = data[0];
          }
        });
      } else {
        QCManagement.GetCompTimeByIdNew($scope.parmData.Batch.BpmId, function(
          data
        ) {
          if (data.length > 0) {
            let compTime = data[data.length - 1].CompTime;

            if (compTime > 1) {
              for (i = 2; i <= compTime; i++) {
                let model = {
                  CompTime: i,
                  Label:
                    i == 2 ? "2nd Time" : i == 3 ? "3rd Time" : i + "th Time"
                };
                let isExist = $scope.CompactingTime.filter(
                  x => x.CompTime == i
                );
                if (isExist.length == 0) $scope.CompactingTime.push(model);
              }
            }
            $scope.parmData.CompTime = $scope.CompactingTime.filter(
              x => x.CompTime == compTime
            )[0];
            debugger;

            /*$scope.parmData.Unit = data[0];*/
          }
        });
        debugger;
        //QCManagement.GetUnitNameByBatchNew(
        //  $scope.parmData.Batch.BpmId,
        //  function(data) {
        //    debugger;
        //    if (data.length > 0) {
        //      $scope.parmData.Unit = data[0];
        //    }
        //  }
        //);
      }
    };

    $scope.GetDataByBuyer = function(obj) {
      debugger;

      QCManagement.GetJobInfo(obj.BuyerId, function(data) {
        $scope.JobList = data;
      });

      // QCManagement.GetBatchByBuyer($scope.parmData.Buyer.BuyerId, 0, function (data)
      QCManagement.GetBatchByBuyerTypeWise(
        $scope.parmData.Buyer.BuyerId,
        0,
        $scope.batchType,
        $rootScope.UserId,
        function(data) {
          debugger;
          $scope.BatchList = data;

          if ($scope.BatchList.length === 1) {
            $scope.parmData.Batch = $scope.BatchList[0];
          }
        }
      );
    };

    // Updated by Sujan Das on 29-April-2025

    //QCManagement.GetBatchByBuyer(0, 0, function (data)
    QCManagement.GetBatchByBuyerTypeWise(
      0,
      0,
      $scope.batchType,
      $rootScope.UserId,
      function(data) {
        debugger;
        $scope.BatchList = data;

        if ($scope.BatchList.length === 1) {
          $scope.parmData.Batch = $scope.BatchList[0];
        }
      }
    );

    $scope.GetDataByBuyerJob = function(obj) {
      debugger;

      QCManagement.GetOrderByJobId(
        $scope.parmData.BuyerId.BuyerId,
        $scope.parmData.JobId.JobId,
        function(data) {
          debugger;
          $scope.StyleList = data;

          if ($scope.StyleList.length === 1) {
            $scope.parmData.StyleList = $scope.StyleList[0];
          }
        }
      );
    };

    // Get Style and order data by job
    $scope.GetDataByJob = function() {
      debugger;

      $scope.parmData.Style = "";
      $scope.parmData.Order = "";
      $scope.parmData.Batch = "";

      QCManagement.GetStyleByBuyer(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        function(data) {
          debugger;
          $scope.StyleList = data;
          if ($scope.StyleList.length === 1) {
            $scope.parmData.Style = $scope.StyleList[0];
          }
        }
      );
      //QCManagement.GetOrderByBuyer($scope.parmData.Buyer.BuyerId, $scope.parmData.Job.JobId, function (data) {
      //    $scope.OrderList = data;
      //});

      //QCManagement.GetBatchByBuyer($scope.parmData.Buyer.BuyerId, $scope.parmData.Job.JobId, function (data)
      QCManagement.GetBatchByBuyerTypeWise(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        $scope.batchType,
        $rootScope.UserId,
        function(data) {
          debugger;

          $scope.BatchList = data;

          if ($scope.BatchList.length === 1) {
            $scope.parmData.Batch = $scope.BatchList[0];
          }
        }
      );
    };
    // Get Order Data By Buyer and Style Id
    $scope.GetOrderDataByBuyerStyle = function() {
      debugger;

      QCManagement.GetOrderList(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        $scope.parmData.Style.StyleId,
        function(data) {
          debugger;

          $scope.OrderList = data;
          //console.log('Order List: ', data);
          if ($scope.OrderList.length === 1) {
            $scope.parmData.Order = $scope.OrderList[0];
          } else if ($scope.OrderList.length < 1) {
            //alert("No Data Found");
            $scope.parmData.Order = "";
          }
        }
      );
    };

    $scope.GetStyleDataByBuyerOrder = function() {
      QCManagement.GetStyleList(
        $scope.parmData.Buyer.BuyerId,
        $scope.parmData.Job.JobId,
        $scope.parmData.Order.OrderId,
        function(data) {
          debugger;

          $scope.StyleList = data;
          //console.log('Style List: ',data);
          if ($scope.StyleList.length === 1) {
            $scope.parmData.Style = $scope.StyleList[0];
          } else if ($scope.StyleList.length < 1) {
            //alert("No Data Found");
            $scope.parmData.Style = "";
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

      console.log("a", $scope.DyeingUnitInfo);
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
        QCManagement.GetRptParam($scope.rpt.ReportingId, function(data) {
          debugger;
          $scope.rptParamList = data;

          console.log("Rpt Param List:", $scope.rptParamList);
          GenerateUI();
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

    function loadBatchList() {
      debugger;

      QCManagement.GetBatchByBuyerTypeWise(
        0,
        0,
        $scope.batchType,
        $rootScope.UserId,
        function(data) {
          $scope.BatchList = data;
          if ($scope.BatchList.length === 1) {
            $scope.parmData.Batch = $scope.BatchList[0];
          }
        }
      );
    }
  }
]);
