app.controller("BatchDataProcessingController", [
  "$scope",
  "$rootScope",
  "$mdDialog",
  "$mdToast",
  "$sce",
  "$compile",
  "$q",
  "$parse",
  "fileReader",
  "$window",
  "BatchDataProcessing",
  "$timeout",
  function(
    $scope,
    $rootScope,
    $mdDialog,
    $mdToast,
    $sce,
    $compile,
    $q,
    $parse,
    fileReader,
    $window,
    BatchDataProcessing,
    $timeout
  ) {
    //app.controller("BatchDataProcessingController", ['$scope', '$rootScope', '$mdDialog', '$mdToast', '$sce', '$compile', '$q', '$parse', 'fileReader', '$window', 'BatchDataProcessing', function ($scope, $rootScope, $mdDialog, $mdToast, $sce, $compile, $q, $parse, fileReader, $window, BatchDataProcessing)
    //{

    $scope.batchResponse = [];
    $scope.MismatchData = [];
    $scope.show = false;
    $scope.disabledShow = true;
    $scope.Processing = false;
    $scope.Mode = "V";
    $scope.RMode = "RG";
    $scope.BatchProcessingAll = [];

    console.log("a", $scope.batchType);
    var errorName = "";

    function getExcelDate(excelDateValue) {
      if (!excelDateValue || isNaN(excelDateValue)) return "";

      const date = new Date(
        Math.round((excelDateValue - 25569) * 86400 * 1000)
      ); // Excel epoch fix
      // Format as "DD-MMM-YYYY" (e.g. 20-Jul-2024)
      const day = ("0" + date.getDate()).slice(-2);
      const month = date.toLocaleString("en-us", { month: "short" });
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    $scope.checkSample = function() {
      $scope.batchType = "Sample";
      $scope.RMode = "RG";
      $scope.Mode = "V";
      totalCount();
    };

    $scope.checkBulk = function() {
      $scope.batchType = "Bulk";
      totalCount();
    };

    $scope.ReadExcelData = function() {
      if ($scope.Unit == null) {
        $rootScope.alert("Please! Select Unit...");
        return;
      }
      $scope.batchData = [];
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
      /*Checks whether the file is a valid excel file*/
      if (
        regex.test(
          $("#ngexcelfile")
            .val()
            .toLowerCase()
        )
      ) {
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
        if (
          $("#ngexcelfile")
            .val()
            .toLowerCase()
            .indexOf(".xlsx") > 0
        ) {
          xlsxflag = true;
        }
        /*Checks whether the browser supports HTML5*/
        if (typeof FileReader != "undefined") {
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;

            /*Converts the excel data in to object*/
            if (xlsxflag) {
              var workbook = XLSX.read(data, { type: "binary" });
            } else {
              var workbook = XLS.read(data, { type: "binary" });
            }
            /*Gets all the sheetnames of excel in to a variable*/
            var sheet_name_list = workbook.SheetNames;
            var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
            //sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
            /*Convert the cell value to Json*/

            // determine sheet based on batch type

            var y = null;

            console.log($scope.batchType);
            console.log(sheet_name_list);
            if ($scope.batchType === "Bulk") {
              y = sheet_name_list[0];
            } else {
              // Find the sheet name "Main program"
              y = sheet_name_list.find(name => name === "Main program");
            }

            if (xlsxflag) {
              var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
            } else {
              var exceljson = XLS.utils.sheet_to_row_object_array(
                workbook.Sheets[y]
              );
            }

            if (exceljson.length > 0) {
              let currMc = "";
              for (var i = 0; i < exceljson.length; i++) {
                if (
                  $("#ngexcelfile")
                    .val()
                    .toLowerCase()
                    .indexOf("notupload_") > 0
                ) {
                  if (
                    exceljson[i].Buyer != undefined &&
                    exceljson[i]["Job"] != undefined
                  ) {
                    let model = null;
                    if ($scope.batchType == "Bulk") {
                      model = {
                        SlNo: i,
                        UnitId: exceljson[i]["UnitId"].trim(),
                        McNo: exceljson[i]["McNo"].trim(),
                        Buyer: exceljson[i].Buyer.trim(),
                        Job: exceljson[i]["Job"].trim(),
                        Style: exceljson[i]["Style"].trim(),
                        Color: exceljson[i]["Color"].trim(),
                        LDNo: exceljson[i]["LDNo"].trim(),
                        RN:
                          exceljson[i]["RN"] == undefined
                            ? ""
                            : exceljson[i]["RN"].trim(),
                        FabType:
                          exceljson[i]["FabType"] == undefined
                            ? ""
                            : exceljson[i]["FabType"].trim(),
                        YarnSource:
                          exceljson[i]["YarnSource"] == undefined
                            ? ""
                            : exceljson[i]["YarnSource"].trim(),
                        YarnLot:
                          exceljson[i]["YarnLot"] == undefined
                            ? ""
                            : exceljson[i]["YarnLot"].trim(),
                        DeliveryDate: exceljson[i]["DeliveryDate"],
                        MatchingWith:
                          exceljson[i]["MatchingWith"] == undefined
                            ? ""
                            : exceljson[i]["MatchingWith"].trim(),
                        Enzyme:
                          exceljson[i]["Enzyme"] == undefined
                            ? ""
                            : exceljson[i]["Enzyme"].trim(),
                        Process:
                          exceljson[i]["Process"] == undefined
                            ? ""
                            : exceljson[i]["Process"].trim(),
                        Body: exceljson[i]["Body"],
                        Rib: exceljson[i]["Rib"],
                        BNT: exceljson[i]["BNT"],
                        FabQty: exceljson[i]["FabQty"],
                        NoOfBatch: exceljson[i]["NoOfBatch"],
                        Remarks:
                          exceljson[i]["Remarks"] == undefined
                            ? ""
                            : exceljson[i]["Remarks"].trim()
                      };
                    } else {
                      model = {
                        SlNo: i,
                        UnitId: $scope.Unit.Id,
                        McNo: mcNo.trim(),
                        Buyer: exceljson[i]["BUYER"].trim(),
                        Job: exceljson[i]["JOB NO"].trim(),
                        Style: exceljson[i]["STYLE/ORDER"].trim(),
                        Color: exceljson[i]["COLOR"].trim(),
                        BatchNo:
                          exceljson[i]["BATCH NO"] == undefined
                            ? ""
                            : exceljson[i]["BATCH NO"].trim(),
                        LDNo:
                          exceljson[i]["LD NO"] == undefined
                            ? ""
                            : exceljson[i]["LD NO"].trim(),
                        RNNo:
                          exceljson[i]["RN No"] == undefined
                            ? ""
                            : exceljson[i]["RN No"].trim(),
                        FabType:
                          exceljson[i]["FAB. TYPE"] == undefined
                            ? ""
                            : exceljson[i]["FAB. TYPE"].trim(),
                        YarnSource:
                          exceljson[i]["YARN SOURCE"] == undefined
                            ? ""
                            : exceljson[i]["YARN SOURCE"].trim(),
                        YarnLot:
                          exceljson[i]["YARN LOT"] == undefined
                            ? ""
                            : exceljson[i]["YARN LOT"].trim(),
                        ShipDate:
                          exceljson[i]["SHIP DATE"] == undefined
                            ? ""
                            : exceljson[i]["SHIP DATE"].trim(),
                        DeliveryDate:
                          exceljson[i]["DELIVERY COM. DATE"] == undefined
                            ? ""
                            : exceljson[i]["DELIVERY COM. DATE"].trim(),
                        MatchingWith:
                          exceljson[i]["MATCHING"] == undefined
                            ? ""
                            : exceljson[i]["MATCHING"].trim(),
                        Enzyme:
                          exceljson[i]["ENZYME"] == undefined
                            ? ""
                            : exceljson[i]["ENZYME"].trim(),
                        Process:
                          exceljson[i]["PROCESS"] == undefined
                            ? ""
                            : exceljson[i]["PROCESS"].trim(),
                        Body:
                          exceljson[i]["BODY"] == undefined
                            ? ""
                            : exceljson[i]["BODY"].trim(),
                        Rib:
                          exceljson[i]["RIB"] == undefined
                            ? ""
                            : exceljson[i]["RIB"].trim(),
                        BNT:
                          exceljson[i]["BNT"] == undefined
                            ? ""
                            : exceljson[i]["BNT"].trim(),
                        FabQty:
                          exceljson[i]["TOTAL FAB. QTY"] == undefined
                            ? ""
                            : exceljson[i]["TOTAL FAB. QTY"].trim(),
                        NoOfBatch:
                          exceljson[i]["NO OF BATCH"] == undefined
                            ? ""
                            : exceljson[i]["NO OF BATCH"].trim(),
                        NextBatch:
                          exceljson[i]["NEXT BATCH"] == undefined
                            ? ""
                            : exceljson[i]["NEXT BATCH"].trim(),
                        SedoProg:
                          exceljson[i]["SEDO PROG"] == undefined
                            ? ""
                            : exceljson[i]["SEDO PROG"].trim(),
                        Remarks:
                          exceljson[i]["REMARKS"] == undefined
                            ? ""
                            : exceljson[i]["REMARKS"].trim(),
                        SampleStage:
                          exceljson[i]["SAMPLE STAGE"] == undefined
                            ? ""
                            : exceljson[i]["SAMPLE STAGE"].trim(),
                        TCX:
                          exceljson[i]["TCX"].trim() == undefined
                            ? ""
                            : exceljson[i]["TCX"].trim(),
                        FabricFor:
                          exceljson[i]["FABRIC FOR"] == undefined
                            ? ""
                            : exceljson[i]["FABRIC FOR"].trim(),
                        RGSM:
                          exceljson[i]["R.GSM"] == undefined
                            ? ""
                            : exceljson[i]["R.GSM"].trim(),
                        RequiredDia:
                          exceljson[i]["REQUIRED DIA"] == undefined
                            ? ""
                            : exceljson[i]["REQUIRED DIA"].trim(),
                        ColourTypes:
                          exceljson[i]["COLOR TYPES"] == undefined
                            ? ""
                            : exceljson[i]["COLOR TYPES"].trim(),
                        Treatment:
                          exceljson[i]["TREATMENT"] == undefined
                            ? ""
                            : exceljson[i]["TREATMENT"].trim(),
                        TestRequirement:
                          exceljson[i]["TEST REQUIREMENT"] == undefined
                            ? ""
                            : exceljson[i]["TEST REQUIREMENT"].trim(),
                        PreTreatment:
                          exceljson[i]["PRE-TREATMENT"] == undefined
                            ? ""
                            : exceljson[i]["PRE-TREATMENT"].trim(),
                        LabRemarks:
                          exceljson[i]["LAB REMARKS"] == undefined
                            ? ""
                            : exceljson[i]["LAB REMARKS"].trim(),
                        YCountAndSpendex:
                          exceljson[i]["Y.COUNT & SPENDEX"] == undefined
                            ? ""
                            : exceljson[i]["Y.COUNT & SPENDEX"].trim(),
                        SL:
                          exceljson[i]["S.L"] == undefined
                            ? ""
                            : exceljson[i]["S.L"].trim(),
                        MCDiaGaug:
                          exceljson[i]["M/C DIA/GAUG"] == undefined
                            ? ""
                            : exceljson[i]["M/C DIA/GAUG"].trim(),

                        BookingQty:
                          exceljson[i]["BOOKING QTY"] == undefined
                            ? ""
                            : exceljson[i]["BOOKING QTY"].trim(),
                        BatchPreparationDate:
                          exceljson[i]["BATCH PREPARATION DATE"] == undefined
                            ? ""
                            : exceljson[i]["BATCH PREPARATION DATE"].trim()
                      };
                    }
                    $scope.batchData.push(model);
                    $scope.$apply();
                  }
                } else if (
                  exceljson[i].BUYER != undefined &&
                  exceljson[i]["JOB NO"] != undefined &&
                  exceljson[i]["STYLE/ORDER"] != undefined &&
                  exceljson[i]["COLOR"] != undefined
                  //&&
                  //exceljson[i]['LD NO'] != undefined
                  //&&
                  //exceljson[i]['FAB. TYPE'] != undefined
                  //&&
                  //exceljson[i]['Total FAB. QTY'] != undefined
                  //&&
                  //exceljson[i]['Fabric for'] != undefined
                  //&&
                  //exceljson[i]['R.GSM'] != undefined
                  //&&
                  //exceljson[i]['Requied Dia'] != undefined
                  //&&
                  //!isNaN(parseInt(exceljson[i]['Requied Dia']))
                  //&&
                  //parseInt(exceljson[i]['Requied Dia']) > 0
                  //&&
                  //parseInt(exceljson[i]['Requied Dia']) === Number(exceljson[i]['Requied Dia'])
                ) {
                  let mcNo = exceljson[i]["M/C-NO"];

                  if (mcNo != undefined) currMc = mcNo;

                  mcNo = currMc;
                  //let process = exceljson[i]['Process'];
                  if ($scope.batchType == "Bulk") {
                    model = {
                      //  #region old code
                      //SlNo: i,
                      //UnitId: $scope.Unit.Id,
                      //McNo: mcNo.trim(),
                      //Buyer: exceljson[i].BUYER.trim(),
                      //Job: String(exceljson[i]["JOB NO"]).trim(),
                      //Style: String(exceljson[i]["STYLE/ORDER"]).trim(),
                      //Color: exceljson[i]["COLOR"].trim(),
                      //LDNo:
                      //  exceljson[i]["LD NO"] == undefined
                      //    ? ""
                      //    : exceljson[i]["LD NO"].trim(),
                      //RN:
                      //  exceljson[i]["RN"] == undefined
                      //    ? ""
                      //    : exceljson[i]["RN"].trim(),
                      //FabType:
                      //  exceljson[i]["FAB. TYPE"] == undefined
                      //    ? ""
                      //    : exceljson[i]["FAB. TYPE"].trim(),
                      //YarnSource:
                      //  exceljson[i]["Yarn Source"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Yarn Source"].trim(),
                      //YarnLot:
                      //  exceljson[i]["Yarn Lot"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Yarn Lot"].trim(),
                      //DeliveryDate: exceljson[i]["Delivery Date"],
                      //MatchingWith:
                      //  exceljson[i]["MATCHING"] == undefined
                      //    ? ""
                      //    : exceljson[i]["MATCHING"].trim(),
                      //Enzyme:
                      //  exceljson[i]["Enzyme"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Enzyme"].trim(),
                      //Process:
                      //  exceljson[i]["Process"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Process"].trim(),
                      //Body: exceljson[i]["Body"],
                      //Rib: exceljson[i]["Rib"],
                      //BNT: exceljson[i]["BNT"],
                      //FabQty: exceljson[i]["Total FAB. QTY"],
                      //NoOfBatch: exceljson[i]["No of Batch"],
                      //Remarks:
                      //  exceljson[i]["Remarks"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Remarks"].trim()

                      // #endregion

                      SlNo: i,
                      UnitId: $scope.Unit.Id,
                      McNo: String(mcNo || "").trim(),
                      Buyer: String(exceljson[i].BUYER || "").trim(),
                      Job: String(exceljson[i]["JOB NO"] || "").trim(),
                      Style: String(exceljson[i]["STYLE/ORDER"] || "").trim(),
                      Color: String(exceljson[i]["COLOR"] || "").trim(),
                      LDNo: String(exceljson[i]["LD NO"] || "").trim(),
                      RN: String(exceljson[i]["RN"] || "").trim(),
                      FabType: String(exceljson[i]["FAB. TYPE"] || "").trim(),
                      YarnSource: String(
                        exceljson[i]["Yarn Source"] || ""
                      ).trim(),
                      YarnLot: String(exceljson[i]["Yarn Lot"] || "").trim(),
                      DeliveryDate: exceljson[i]["Delivery Date"], // assuming it's date or already valid
                      MatchingWith: String(
                        exceljson[i]["MATCHING"] || ""
                      ).trim(),
                      Enzyme: String(exceljson[i]["Enzyme"] || "").trim(),
                      Process: String(exceljson[i]["Process"] || "").trim(),

                      //Body: exceljson[i]["Body"],                   // assuming raw number or value is okay
                      //Rib: exceljson[i]["Rib"],
                      //BNT: exceljson[i]["BNT"],
                      //FabQty: exceljson[i]["Total FAB. QTY"],
                      //NoOfBatch: exceljson[i]["No of Batch"],

                      Body: parseInt(exceljson[i]["Body"]) || 0,
                      Rib: parseInt(exceljson[i]["Rib"]) || 0,
                      BNT: parseInt(exceljson[i]["BNT"]) || 0,
                      FabQty: parseFloat(exceljson[i]["Total FAB. QTY"]) || 0.0,
                      NoOfBatch: String(
                        exceljson[i]["No of Batch"] || ""
                      ).trim(),

                      Remarks: String(exceljson[i]["Remarks"] || "").trim()
                    };
                  } else {
                    model = {
                      // #region Basic Info Mapping
                      //SlNo: i,
                      //UnitId: $scope.Unit.Id,
                      //McNo: mcNo.trim(),
                      //Buyer: exceljson[i]["BUYER"].trim(),
                      //Job: exceljson[i]["JOB NO"].trim(),
                      //Style: exceljson[i]["STYLE/ORDER"].trim(),
                      //Color: exceljson[i]["COLOR"].trim(),
                      //BatchNo:
                      //  exceljson[i]["BATCH NO"] == undefined
                      //    ? ""
                      //    : exceljson[i]["BATCH NO"].trim(),
                      //LDNo:
                      //  exceljson[i]["LD NO"] == undefined
                      //    ? ""
                      //    : exceljson[i]["LD NO"].trim(),
                      //RNNo:
                      //  exceljson[i]["RN No"] == undefined
                      //    ? ""
                      //    : exceljson[i]["RN No"].trim(),
                      //FabType:
                      //  exceljson[i]["FAB. TYPE"] == undefined
                      //    ? ""
                      //    : exceljson[i]["FAB. TYPE"].trim(),
                      //YarnSource:
                      //  exceljson[i]["Yarn Source"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Yarn Source"].trim(),
                      //YarnLot:
                      //  exceljson[i]["Yarn Lot"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Yarn Lot"].trim(),
                      //ShipDate:
                      //  exceljson[i]["SHIP DATE"] == undefined
                      //    ? ""
                      //    : exceljson[i]["SHIP DATE"].trim(),
                      //DeliveryDate:
                      //  exceljson[i]["DELIVERY COM. DATE"] == undefined
                      //    ? ""
                      //    : exceljson[i]["DELIVERY COM. DATE"].trim(),
                      //MatchingWith:
                      //  exceljson[i]["MATCHING"] == undefined
                      //    ? ""
                      //    : exceljson[i]["MATCHING"].trim(),
                      //Enzyme:
                      //  exceljson[i]["Enzyme"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Enzyme"].trim(),
                      //Process:
                      //  exceljson[i]["Process"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Process"].trim(),
                      //Body:
                      //  exceljson[i]["BODY"] == undefined
                      //    ? ""
                      //    : exceljson[i]["BODY"].trim(),
                      //Rib:
                      //  exceljson[i]["RIB"] == undefined
                      //    ? ""
                      //    : exceljson[i]["RIB"].trim(),
                      //BNT:
                      //  exceljson[i]["BNT"] == undefined
                      //    ? ""
                      //    : exceljson[i]["BNT"].trim(),
                      //FabQty:
                      //  exceljson[i]["Total FAB. QTY"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Total FAB. QTY"].trim(),
                      //NoOfBatch:
                      //  exceljson[i]["No of Batch"] == undefined
                      //    ? ""
                      //    : exceljson[i]["No of Batch"].trim(),
                      //NextBatch:
                      //  exceljson[i]["NEXT BATCH"] == undefined
                      //    ? ""
                      //    : exceljson[i]["NEXT BATCH"].trim(),
                      //SedoProg:
                      //  exceljson[i]["Sedo Prog"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Sedo Prog"].trim(),
                      //Remarks:
                      //  exceljson[i]["Remarks"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Remarks"].trim(),
                      //SampleStage:
                      //  exceljson[i]["Sample Stage"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Sample Stage"].trim(),
                      //TCX:
                      //  exceljson[i]["TCX"].trim() == undefined
                      //    ? ""
                      //    : exceljson[i]["TCX"].trim(),
                      //FabricFor:
                      //  exceljson[i]["Fabric for"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Fabric for"].trim(),
                      //RGSM:
                      //  exceljson[i]["R.GSM"] == undefined
                      //    ? ""
                      //    : exceljson[i]["R.GSM"].trim(),
                      //RequiredDia:
                      //  exceljson[i]["Requied Dia"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Requied Dia"].trim(),
                      //ColourTypes:
                      //  exceljson[i]["Colour Types"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Colour Types"].trim(),
                      //Treatment:
                      //  exceljson[i]["Treatment"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Treatment"].trim(),
                      //TestRequirement:
                      //  exceljson[i]["Test Requerment"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Test Requerment"].trim(),
                      //PreTreatment:
                      //  exceljson[i]["Pre-Treatment"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Pre-Treatment"].trim(),
                      //LabRemarks:
                      //  exceljson[i]["Lab Remarks"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Lab Remarks"].trim(),
                      //YCountAndSpendex:
                      //  exceljson[i]["Y.Count & Spendex"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Y.Count & Spendex"].trim(),
                      //SL:
                      //  exceljson[i]["S.L"] == undefined
                      //    ? ""
                      //    : exceljson[i]["S.L"].trim(),
                      //MCDiaGaug:
                      //  exceljson[i]["M/C Dia/Gaug"] == undefined
                      //    ? ""
                      //    : exceljson[i]["M/C Dia/Gaug"].trim(),
                      //BookingQty:
                      //  exceljson[i]["Booking Qty"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Booking Qty"].trim(),
                      //BatchPreparationDate:
                      //  exceljson[i]["Batch preparation Date"] == undefined
                      //    ? ""
                      //    : exceljson[i]["Batch preparation Date"].trim()
                      // #endregion

                      SlNo: i,
                      UnitId: $scope.Unit.Id,
                      McNo: String(mcNo || "").trim(),
                      Buyer: String(exceljson[i]["BUYER"] || "").trim(),
                      Job: String(exceljson[i]["JOB NO"] || "").trim(),
                      Style: String(exceljson[i]["STYLE/ORDER"] || "").trim(),
                      Color: String(exceljson[i]["COLOR"] || "").trim(),
                      BatchNo: String(exceljson[i]["BATCH NO"] || "").trim(),
                      LDNo: String(exceljson[i]["LD NO"] || "").trim(),
                      RNNo: String(exceljson[i]["RN No"] || "").trim(),
                      FabType: String(exceljson[i]["FAB. TYPE"] || "").trim(),
                      YarnSource: String(
                        exceljson[i]["Yarn Source"] || ""
                      ).trim(),
                      YarnLot: String(exceljson[i]["Yarn Lot"] || "").trim(),
                      ShipDate: String(exceljson[i]["SHIP DATE"] || "").trim(),
                      DeliveryDate: String(
                        exceljson[i]["DELIVERY COM. DATE"] || ""
                      ).trim(),
                      MatchingWith: String(
                        exceljson[i]["MATCHING"] || ""
                      ).trim(),
                      Enzyme: String(exceljson[i]["Enzyme"] || "").trim(),
                      Process: String(exceljson[i]["Process"] || "").trim(),

                        Body: parseFloat(exceljson[i]["BODY"]) || 0,
                        Rib: parseFloat(exceljson[i]["RIB"]) || 0,
                        BNT: parseFloat(exceljson[i]["BNT"]) || 0,

                      FabQty: parseFloat(exceljson[i]["Total FAB. QTY"]) || 0,

                        NoOfBatch: parseFloat(exceljson[i]["No of Batch"] || 0),

                        NextBatch: String(
                        exceljson[i]["NEXT BATCH"] || ""
                      ).trim(),
                      SedoProg: String(exceljson[i]["Sedo Prog"] || "").trim(),
                      Remarks: String(exceljson[i]["Remarks"] || "").trim(),
                      SampleStage: String(
                        exceljson[i]["Sample Stage"] || ""
                      ).trim(),
                      TCX: String(exceljson[i]["TCX"] || "").trim(),
                      FabricFor: String(
                        exceljson[i]["Fabric for"] || ""
                      ).trim(),
                      RGSM: String(exceljson[i]["R.GSM"] || "").trim(),
                      RequiredDia: String(
                        exceljson[i]["Requied Dia"] || ""
                      ).trim(),
                      ColourTypes: String(
                        exceljson[i]["Colour Types"] || ""
                      ).trim(),
                      Treatment: String(exceljson[i]["Treatment"] || "").trim(),
                      TestRequirement: String(
                        exceljson[i]["Test Requerment"] || ""
                      ).trim(),
                      PreTreatment: String(
                        exceljson[i]["Pre-Treatment"] || ""
                      ).trim(),
                      LabRemarks: String(
                        exceljson[i]["Lab Remarks"] || ""
                      ).trim(),
                      YCountAndSpendex: String(
                        exceljson[i]["Y.Count & Spendex"] || ""
                      ).trim(),
                      SL: String(exceljson[i]["S.L"] || "").trim(),
                      MCDiaGaug: String(
                        exceljson[i]["M/C Dia/Gaug"] || ""
                        ).trim(),

                      BookingQty: parseFloat(exceljson[i]["Booking Qty"]) || 0,

                      BatchPreparationDate: getExcelDate(
                        exceljson[i]["Batch preparation Date"]
                      )
                    };
                  }
                  console.log(model);
                  $scope.batchData.push(model);

                  $scope.$apply();
                }
              }
            }
            //});

            var obj = {
              batch: $scope.batchData,
              UserId: $rootScope.UserId,
              IsBulk: $scope.batchType === "Bulk" ? true : false
            };
            $scope.batchResponse = [];
            document.body.style.cursor = "wait";

            if ($scope.batchType === "Bulk") {
              console.log(obj);
              BatchDataProcessing.BatchDataProcessing_SaveUpdate(obj, function(
                res
              ) {
                if (res.ErrorMsg == null) {
                  $scope.MismatchData = res.Data;
                  //console.log("res",res.Data); w
                  //$scope.batchResponse = angular.copy(res.Data);

                  let fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
                  let toDate = moment($scope.ToDate).format("DD-MMM-YYYY");
                  $rootScope.alert(res.Msg);
                  BatchDataProcessing.GetBatchProcessingData(
                    $scope.Unit.Id,
                    fromDate,
                    toDate,
                    function(data) {
                      $scope.BatchProcessingData = data;
                      totalCount();
                      $scope.Mode = "V";
                      $scope.show = true;
                      //document.body.style.cursor = 'default';
                      //$scope.showData();
                    }
                  );
                } else $rootScope.alert(res.ErrorMsg);

                document.body.style.cursor = "default";
              });
            } else if ($scope.batchType != "Bulk") {
              // here I have to check the the length of obj

              BatchDataProcessing.BatchDataProcessingSample_SaveUpdate(
                obj,
                function(res) {
                  if (res.ErrorMsg == null) {
                    $scope.MismatchData = res.Data;
                    //console.log("res",res.Data);
                    //$scope.batchResponse = angular.copy(res.Data);

                    let fromDate = moment($scope.FromDate).format(
                      "DD-MMM-YYYY"
                    );
                    let toDate = moment($scope.ToDate).format("DD-MMM-YYYY");
                    $rootScope.alert(res.Msg);
                    BatchDataProcessing.GetBatchProcessingData(
                      $scope.Unit.Id,
                      fromDate,
                      toDate,
                      function(data) {
                        $scope.BatchProcessingData = data;
                        totalCount();
                        $scope.Mode = "V";
                        $scope.show = true;
                        //document.body.style.cursor = 'default';
                        //$scope.showData();
                      }
                    );
                  } else $rootScope.alert(res.ErrorMsg);

                  document.body.style.cursor = "default";
                }
              );
            } else return;
          };
          if (xlsxflag) {
            /*If excel file is .xlsx extension than creates a Array Buffer from excel*/
            reader.readAsArrayBuffer($("#ngexcelfile")[0].files[0]);
          } else {
            reader.readAsBinaryString($("#ngexcelfile")[0].files[0]);
          }
        } else {
          $rootScope.alert("Sorry! Your browser does not support HTML5!");
        }
      } else {
        $rootScope.alert("Please! select a valid Excel file!");
      }
    };

    //BatchDataProcessing.GetBatchProcessingData(0, function (data) { $scope.BatchProcessingData = data; $scope.totalItems = data.length; });

    BatchDataProcessing.GetUnitAll($rootScope.UserId, function(data) {
      $scope.UnitList = data;
      if ($scope.UnitList.length == 1) {
        $scope.Unit = $scope.UnitList[0];
      }
    });

    $scope.LoadProcessData = function() {
      $scope.disabledShow = true;
      $scope.Processing = false;
      if ($scope.Mode == "V") {
        $scope.show = false;

        if (
          $scope.Unit.Id != undefined &&
          $scope.FromDate != undefined &&
          $scope.ToDate != undefined
        ) {
          document.body.style.cursor = "wait";
          $scope.Processing = true;
          let fromDate = moment($scope.FromDate).format("DD-MMM-YYYY");
          let toDate = moment($scope.ToDate).format("DD-MMM-YYYY");

          if ($scope.RMode == "RG") {
            BatchDataProcessing.GetBatchProcessingData(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $timeout(function() {
                  console.log("batch", data);
                  $scope.BatchProcessingData = data;
                  $scope.disabledShow = false;
                  $scope.Processing = false;
                  document.body.style.cursor = "default";
                });
              }
            );
          } else if ($scope.RMode == "RP") {
            BatchDataProcessing.GetBatchReprocessData(
              $scope.Unit.Id,
              fromDate,
              toDate,
              function(data) {
                $timeout(function() {
                  console.log(data);
                  $scope.BatchReProcessingData = data;
                  $scope.totalReprocessItems =
                    $scope.BatchReProcessingData.length;

                  $scope.disabledShow = false;
                  $scope.Processing = false;
                  document.body.style.cursor = "default";
                });
              }
            );
          }
        }
      }
    };

    $scope.BatchBehavior = function(f) {
      if (f == "Y" && $scope.chkYes == true) {
        $scope.chkNo = false;
        $scope.chkAll = false;

        if ($scope.RMode == "RG")
          $scope.BatchProcessingData = $scope.BatchProcessingAll.filter(
            x => x.BatchNo != undefined
          );
        else if ($scope.RMode == "RP")
          $scope.BatchReProcessingData = $scope.BatchReProcessingAll.filter(
            x => x.BatchNo != undefined
          );
      } else if (f == "N" && $scope.chkNo == true) {
        $scope.chkYes = false;
        $scope.chkAll = false;

        if ($scope.RMode == "RG")
          $scope.BatchProcessingData = $scope.BatchProcessingAll.filter(
            x => x.BatchNo == undefined
          );
        else if ($scope.RMode == "RP")
          $scope.BatchReProcessingData = $scope.BatchReProcessingAll.filter(
            x => x.BatchNo == undefined
          );
      } else if (f == "A" && $scope.chkAll == true) {
        $scope.chkYes = false;
        $scope.chkNo = false;

        if ($scope.RMode == "RG")
          $scope.BatchProcessingData = $scope.BatchProcessingAll;
        else if ($scope.RMode == "RP")
          $scope.BatchReProcessingData = $scope.BatchReProcessingAll;
      } else {
        if ($scope.RMode == "RG")
          $scope.BatchProcessingData = $scope.BatchProcessingAll;
        else if ($scope.RMode == "RP")
          $scope.BatchReProcessingData = $scope.BatchReProcessingAll;
      }
      //$scope.totalItems = $scope.BatchProcessingData.length;

      totalCount();

      $scope.totalReprocessItems = $scope.BatchReProcessingData.length;
    };

    function totalCount() {
      if (!$scope.BatchProcessingData) return;
      else {
        $scope.totalItems =
          $scope.batchType === "Bulk"
            ? $scope.BatchProcessingData.filter(x => x.IsSample === "Bulk")
                .length
            : $scope.BatchProcessingData.filter(x => x.IsSample === "Sample")
                .length;
      }
    }

    $scope.showData = function() {
      document.body.style.cursor = "wait";

      if ($scope.BatchProcessingData) {
        $scope.show = true;

        totalCount();

        for (i = 0; i < $scope.BatchProcessingData.length; i++) {
          if ($scope.BatchProcessingData[i].FabricSpec) {
            $scope.BatchProcessingData[i].SystemFab = {
              id: $scope.BatchProcessingData[i].ItemFabId,
              name: $scope.BatchProcessingData[i].FabricSpec
            };
          }
        }
        $scope.BatchProcessingAll = $scope.BatchProcessingData;
        $scope.chkAll = true;
      } else if ($scope.BatchReProcessingData) {
        $scope.show = true;
        $scope.totalReprocessItems = $scope.BatchReProcessingData.length;
        for (i = 0; i < $scope.BatchReProcessingData.length; i++) {
          if ($scope.BatchReProcessingData[i].FabricSpec) {
            $scope.BatchReProcessingData[i].SystemFab = {
              id: $scope.BatchReProcessingData[i].ItemFabId,
              name: $scope.BatchReProcessingData[i].FabricSpec
            };
            $scope.BatchReProcessingData[i].ReprocessNo =
              $scope.BatchReProcessingData[i].ReprocessNo === null
                ? 0
                : $scope.BatchReProcessingData[i].ReprocessNo;
          }
        }
        $scope.BatchReProcessingAll = $scope.BatchReProcessingData;
        $scope.chkAll = true;
      }
    };

    $scope.ChangeFabric = function(d) {
      let model = {
        id: d.Id,
        itemFabId: d.SystemFab.id,
        userId: $rootScope.UserId
      };

      if (d.SystemFab.id) {
        BatchDataProcessing.BatchFabData_Update(model, function(res) {
          if (res.ErrorMsg == null) {
            $rootScope.alert(res.Msg);
            return true;
          } else $rootScope.alert(res.ErrorMsg);
        });
      }
    };

    //$scope.saveAsXlsx = function () {
    //$scope.test = [{ Column_A: 'aa', Column_B: 'bb' }, { Column_A: 'cc', Column_B: 'dd' }, { Column_A: 'ee', Column_B: 'ff' }];
    $scope.ExportMismatchData = function() {
      if ($scope.MismatchData.length > 0) {
        let today = new Date();
        //console.log(today);

        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        today = minutes + "" + hours + "" + dd + "" + mm + "" + yyyy;

        alasql(
          'SELECT * INTO XLSX("NotUpload_' +
            today +
            '.xlsx",{headers:true}) FROM ?',
          [$scope.MismatchData]
        );
      }
    };

    //$scope.FabricList = [{ id: 1, name: 'Fab 1' }, { id: 2, name: 'Fab 2' }]

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

    $scope.batchLinkGen = function(batch) {
      if (batch != undefined) {
        let batchLink = batch.replace(/&lt;/g, "<");
        batchLink = batchLink.replace(/&gt;/g, ">");
        batchLink = batchLink.replace(/&amp;/g, "&");
        batchLink = batchLink.replace(/lt;/g, "<");
        //batchLink=batchLink.slice(5);
        //let str = batchLink.;//'<a href="href="/Home/Index#!/BatchCard?id=71">batch-234</a>';
        //$scope.batch = str;

        console.log(batchLink);

        return batchLink; //'<a href="/Home/Index#!/BatchCard?id=417">13049-01-001</a>,<a href="/Home/Index#!/BatchCard?id=417">13049-01-002</a>';
      } else return "";
    };
  }
]);
