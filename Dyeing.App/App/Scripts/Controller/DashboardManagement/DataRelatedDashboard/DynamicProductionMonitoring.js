app.controller("DynamicProductionMonitoring", ['$scope', '$window', '$rootScope', 'filterFilter', '$mdDialog', 'DynamicProductionMonitorFactory', function ($scope, $window, $rootScope, filterFilter, $mdDialog, DynamicProductionMonitorFactory) {
    $scope.disabledShow = false;
    $scope.currentDate = FormatDate(new Date);

    DynamicProductionMonitorFactory.GetUnitAll($rootScope.UserId, function (data) {
        $scope.UnitList = data;
        if ($scope.UnitList.length == 1) {
            $scope.Unit = $scope.UnitList[0];
        } 
    });

    //interval time
    var refreshInterval = 5 * 60 * 1000;

    // Function to load data   
    $scope.LoadingData = function () {
        if (!$scope.Unit || !$scope.Date) return;
        $scope.Processing = true;
        $scope.disabledShow = true;
        DynamicProductionMonitorFactory.GetDyeingProductionMonitorData($scope.Unit.UnitId,FormatDate($scope.Date),$scope.Issue, function (data) {
            $scope.ProductionData = data;
            $scope.Processing = false;
            $scope.disabledShow = false;
            }
        );

    };

    

    $scope.rowSpan = function (item) {
        let a = $scope.ProductionData.filter(x => x.MDId === item.MDId).length;
        return a;
    }

    $scope.showData = function (item) {
        if (item.SeqNo == 1)
            return true;
        else
            return false;
    }

    $scope.showColor = function (obj) {
        if (obj.RowColor === 'Green')
            return 'background: #6DCD1E !important;';
    }

    // Auto-refresh setup
    var intervalId = setInterval(function () {
        $scope.$apply(function () {
            $scope.LoadingData();
        });
    }, refreshInterval);

    // Optional: Cleanup interval when scope is destroyed (e.g., navigating away)
    $scope.$on('$destroy', function () {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });

    $scope.exportToExcel = function (ProductionData) {
        // Wait for XLSX to be available
        function tryExport() {
            var table = document.getElementById('dynamicProductionReport');
            if (!$scope.ProductionData) return;

            let today = new Date();

            let dd = today.getDate();
            let mm = today.getMonth() + 1;

            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = minutes + '' + hours + '' + dd + '' + mm + '' + yyyy;

            // Convert table to workbook
            var workbook = XLSX.utils.table_to_book(table, { sheet: "Production Report", raw: true });

            // Force all cells to type 's' (string)
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            for (const cell in sheet) {
                if (!cell.startsWith('!') && sheet[cell].v !== undefined) {
                    sheet[cell].t = 's'; // force type to string
                }
            }
            // Export to file
            XLSX.writeFile(workbook, "Dynamic_Production_Report" + today + ".xlsx");
        }

        tryExport();
    };

    //$scope.exportToExcel = function (reportData) {
    //    debugger
    //    if (reportData.length > 0) {
 

    //        let filename = "DynamicProductionReport_" + today + ".xlsx";
    //        let records = $scope.ProductionData.map(record => {
    //            // Iterate over each property in the record
    //            Object.keys(record).forEach(key => {
    //                // Set any null attribute to 0 
    //                record[key] = record[key] === null ? '' : record[key];
    //            });
    //            return record;
    //        });

    //        alasql('SELECT MachineNo AS [M/C], PriorityNo AS [Priority], BuyerName AS [Buyer],  StyleInfo AS [Style],  OrderInfo AS [Order], \
    //                JobInfo AS[Job], BatchNo AS[Batch No], BatchDate AS [Batch Create Date], FabricIssueDate AS [Fabric Issue Date], ShipmentDate AS [Ship Date],  \
    //                Color AS [Color], FabricType AS [Fab Type], GSM AS [GSM], FDia AS [Dia], LabDipNo AS [Lab Dip No.], PlanQty AS [Plan Qty], \
    //                ActualQty AS [Actual Qty], YarnLot AS [Yarn Lot], Specialinstruction AS[Special Instruction], Remarks AS [Remarks] \
    //                INTO XLSX("' + filename + '", { headers: true }) FROM ?', [$scope.ProductionData]);
    //    }

    //}

    
    function FormatDate(dateString) {
        var m = moment(dateString, 'YYYY/MM/DD', true);
        //return m.isValid() ? m.toDate() : new Date(NaN);
        return dateString ? moment(dateString).format('YYYY/MM/DD') : '';
    };

    

}]);