app.controller("BasicBroadcastController", ['$scope', '$rootScope', '$window', 'filterFilter', '$compile', '$parse', 'BasicBroadcast', function ($scope, $rootScope, $window, filterFilter, $compile, $parse, BasicBroadcast) {

    //Load Dropdown Data   
    debugger
    BasicBroadcast.GetReportInfo('BasicBroadcast',$rootScope.UserId, 0,function (data) { $scope.rptInfoList = data; });
    BasicBroadcast.GetUnitInfo('', function (data) { $scope.unitInfo = data; });
    BasicBroadcast.GetMachineInfo('0', 'Type', function (data) { $scope.machineInfo = data; });
    BasicBroadcast.GetDyeingUnit(function (data) { $scope.DyeingUnitInfo = data; });
    BasicBroadcast.GetDiaPartName(function (data) { $scope.DiaPartInfo = data; });
    BasicBroadcast.GetFaultHead(function (data) { $scope.FaultHeadInfo = data; });

    //item as item.UnitEName for item in unitInfo | filter: {UnitEName:$viewValue} | limitTo:8

    function GenerateUI() {
        debugger;        
        var NoOfParms = $scope.rptParamList.length;        
        
        if (document.getElementById("divParm"))
            document.getElementById("divParm").remove();        

        var divhtml = "<ng-form id='form' name='form' style='width:100%;'><div id='divParm' style='padding: 0; margin:0' class='form-group row col-md-12'>";
        for (i = 0; i < NoOfParms; i++) {
            if ($scope.rptParamList[i].Category == "Dropdown") {
                divhtml += "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><input type='text' list='" + $scope.rptParamList[i].ParmName + "' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' placeholder='" + $scope.rptParamList[i].Placeholder + "' class='form-control input-height' ng-required='" + $scope.rptParamList[i].IsRequired + "' /><datalist id='" + $scope.rptParamList[i].ParmName + "'> <option ng-repeat='" + $scope.rptParamList[i].Options + "' value='{{" + $scope.rptParamList[i].Field1 + "}}' id='{{" + $scope.rptParamList[i].Field2 + "}}'>{{ " + $scope.rptParamList[i].Field3 + "}}</option></datalist></div> </div ></div >";
            } else if ($scope.rptParamList[i].Category == "Datepicker") {
                divhtml += "<div class='col-md-6' ng-if='model.Datepicker==1'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><md-datepicker ng-required='" + $scope.rptParamList[i].IsRequired + "' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' md-placeholder='" + $scope.rptParamList[i].Placeholder + "' md-hide-icons='calendar' md-open-on-focus></md-datepicker></div> </div ></div >";
            } else if ($scope.rptParamList[i].Category == "Multiselect") {
                divhtml += "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><multiselect class='input-xlarge multiselect' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' options='{{" + $scope.rptParamList[i].Options + "}}' header = '" + $scope.rptParamList[i].Placeholder + "' selected-header='options selected' multiple = 'true' enable-filter='true' ng-required='" + $scope.rptParamList[i].IsRequired + "' filter-placeholder='{{" + $scope.rptParamList[i].Placeholder+"}}'></multiselect ></div> </div ></div >";
            } else if ($scope.rptParamList[i].Category == "Typeahead") {
                divhtml += "<div class='col-md-6'><div class='form-group row'> <label class='control-label col-md-5'>" + $scope.rptParamList[i].LabelName + "<span ng-if='" + $scope.rptParamList[i].IsRequired + "' class='required'> * </span></label> <div class='col-md-7'><input type='text' typeahead-Open-On-Focus typeahead-min-length='0' uib-typeahead='" + $scope.rptParamList[i].Options + "' ng-model='parmData." + $scope.rptParamList[i].ParmName + "' placeholder='" + $scope.rptParamList[i].Placeholder + "' class='form-control input-height' ng-required='" + $scope.rptParamList[i].IsRequired + "' /></div> </div ></div >";
            }           
        }
        divhtml += "</div></ng-form>";
        divhtml = $compile(divhtml)($scope);
        angular.element(document.getElementById("genUI")).after(divhtml);       
    }
    
    $scope.data = [{
        LabelName: null, ParmName: null, Select: null, Category: null, Date: null, MultiSelect: null, Options: null,
        IsRequired: false, SeqNo: null, Placeholder: null
    }];

    $scope.GetParmInfo = function () {
        $scope.parmData = {};
        $scope.Model = filterFilter($scope.rptInfoList, { ReportingId: $scope.rpt.ReportingId }, true);

        BasicBroadcast.GetRptParam($scope.rpt.ReportingId, function (data) {           
            $scope.rptParamList = data;            
            GenerateUI();
        });        
    };

    $scope.ReportView = function (Format) {
        debugger;
        var rptParm = "[";
        for (var i = 0; i < $scope.rptParamList.length; i++) {
            if ($scope.rptParamList[i].Category == "Dropdown") {  
                var id = "#" + $scope.rptParamList[i].ParmName;
                var scope = "parmData."+$scope.rptParamList[i].ParmName;
                var data = $scope.$eval(scope);
                //alert(data);
                
                var parmValue = $(id).find('option[value="' + data + '"]').attr('id');
                rptParm += (rptParm.length > 1 ? "," : "") + "{" + '"' + $scope.rptParamList[i].ParmName + '"' + ":" + '"' + parmValue + '"' + "}";
            }
            else if ($scope.rptParamList[i].Category == "Datepicker") {
                var Date = "";
                if ($scope.rptParamList[i].Date != null) Date = moment($scope.rptParamList[i].Date).format('DD-MMM-YYYY');
                rptParm += (rptParm.length > 1 ? "," : "") + "{" + '"' + $scope.rptParamList[i].ParmName + '"' + ":" + '"' + Date + '"' + "}";
            }
            else if ($scope.rptParamList[i].Category == "Multiselect") {
                rptParm += (rptParm.length > 1 ? "," : "") + "{" + '"' + $scope.rptParamList[i].ParmName + '"' + ":" + '"' + $scope.rptParamList[i].MultiSelect + '"' + "}";
            }
            else if ($scope.rptParamList[i].Category == "Typeahead") {
                var scope = "parmData." +$scope.rptParamList[i].ParmName + "." + $scope.rptParamList[i].Field1;
                var parmValue = $scope.$eval(scope);
                
                rptParm += (rptParm.length > 1 ? "," : "") + "{" + '"' + $scope.rptParamList[i].ParmName + '"' + ":" + '"' + parmValue + '"' + "}";
            }

        }
        rptParm += "]";

        var rptComInfo = "[";
        if ($scope.Model[0].APIAction.length > 0) rptComInfo += "{" + '"APIAction"' + ":" + '"' + $scope.Model[0].APIAction + '"' + "}";
        if ($scope.Model[0].ReportPath.length > 0) rptComInfo += (rptComInfo.length > 1 ? "," : "") + "{" + '"ReportPath"' + ":" + '"' + $scope.Model[0].ReportPath + '"' + "}";
        if ($scope.Model[0].FileName.length > 0) rptComInfo += (rptComInfo.length > 1 ? "," : "") + "{" + '"FileName"' + ":" + '"' + $scope.Model[0].FileName + '"' + "}";
        if (Format.length > 0) rptComInfo += (rptComInfo.length > 1 ? "," : "") + "{" + '"Format"' + ":" + '"' + Format + '"' + "}";
        rptComInfo += "]";

        var SQL = "[";
        if ($scope.Model[0].SQL.length > 0) SQL += "{" + '"SQL"' + ":" + '"' + $scope.Model[0].SQL + '"' + "}";
        if ($scope.Model[0].SQL1.length > 0) SQL += (SQL.length > 1 ? "," : "") + "{" + '"SQL1"' + ":" + '"' + $scope.Model[0].SQL1 + '"' + "}";
        if ($scope.Model[0].SQL2.length > 0) SQL += (SQL.length > 1 ? "," : "") + "{" + '"SQL2"' + ":" + '"' + $scope.Model[0].SQL2 + '"' + "}";
        SQL += "]";

        var Dataset = "[";
        if ($scope.Model[0].Dataset.length > 0) Dataset += "{'Dataset'" + ":" + '"' + $scope.Model[0].Dataset + '"' + "}";
        if ($scope.Model[0].Dataset1.length > 0) Dataset += (Dataset.length > 1 ? "," : "") + "{" + '"Dataset1"' + ":" + '"' + $scope.Model[0].Dataset1 + '"' + "}";
        if ($scope.Model[0].Dataset2.length > 0) Dataset += (Dataset.length > 1 ? "," : "") + "{" + '"Dataset2"' + ":" + '"' + $scope.Model[0].Dataset2 + '"' + "}";
        Dataset += "]";

        // $window.open('GetAMSReport?APIAction=' + $scope.Model[0].APIAction + '&&ReportPath=' + $scope.Model[0].ReportPath + '&&FileName=' + $scope.Model[0].FileName + '&&Dataset=' + $scope.Model[0].Dataset + '&&SQL=' + $scope.Model[0].SQL + '&&rptParm=' + encodeURIComponent(rptParm) + '&&Format=' + format);
        $window.open('../BroadcastManagement/GetBroadcastData?rptComInfo=' + encodeURIComponent(rptComInfo) + '&&rptParm=' + encodeURIComponent(rptParm) + '&&SQL=' + encodeURIComponent(SQL) + '&&Dataset=' + encodeURIComponent(Dataset));

    }
    function InitilState() {
        $scope.rptParamList = angular.copy($scope.data);
    }
    $scope.Refresh = function () {
        InitilState();
        //$scope.rpt.ReportingId = null;
        $scope.parmData = {};
    }
}])