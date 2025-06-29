using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class DyeingBatchConfigFabricModel : Base
    {
        public class DyeingBatchConfigFabricMaster
        {
            public int FabBatchMId { get; set; }
            public string BatchDate { get; set; }
            public int MppmId { get; set; }
            public int ProcessMode { get; set; }
            public decimal BatchWeight { get; set; }
            public string UserId { get; set; }
            public List<DyeingBatchConfigFabricDetails> Details { get; set; }

        }
        public class DyeingBatchConfigFabricDetails
        {
            public int FabBatchDId { get; set; }
            public int FabBatchMId { get; set; }
            public int NozzleNo { get; set; }
            public int FBarcodeGenId { get; set; }
            public float ManualWeight { get; set; }
            public int TncId { get; set; }
           
        }
        public class MachineProductionPlanDetail
        {
            public int MppmId { get; set; }
		    public string BatchNo { get; set; }
            public string LDNo { get; set; }
            public string MachineNo { get; set; }
            public int NoOfNozzle { get; set; }
            public string CapacityName { get; set; }
            public string BuyerName { get; set; }
            public string JobNo { get; set; }
            public string StyleNo { get; set; }
            public string OrderNo { get; set; }
        }
        public class BarcodeDataNozzle
        {
            public int MppmId { get; set; }
            public List<Barcodes> BarcodeList { get; set; }
        }
        public class Barcodes
        {
            public int FBarcodeGenId { get; set; }
        }

        public long DyeingBatchConfigFabric_SaveUpdate(DyeingBatchConfigFabricMaster _obj)
        {

            var data = new
            {
                FabBatchMId = _obj.FabBatchMId,
                BatchDate = _obj.BatchDate,
                MppmId = _obj.MppmId,
                ProcessMode = _obj.ProcessMode,
                BatchWeight = _obj.BatchWeight,
                HostIP = getclientIP(),
                CreatedBy = _obj.UserId,
                DyeingBatchConfigFabricDetails = _obj.Details.AsTableValuedParameter("dbo.DyeingBatchConfigFabricDetails",
                            new[] { "FabBatchDId", "FabBatchMId", "NozzleNo", "FBarcodeGenId", "ManualWeight", "TncId" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[SaveUpdate_DyeingBatchConfigFabric]", model: data, dbName: DyeingDB);
        }

        public IEnumerable<DyeingBatchConfigFabricDetails> GetDyeingBatchConfigFabricData(int MppmId, string BatchDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchDate", value: BatchDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<DyeingBatchConfigFabricDetails>(
                    storedProcedureName: @"[dbo].[Get_DyeingBatchConfigFabricData]", parameters: parameters, dbName: DyeingDB);
        }
        public MachineProductionPlanDetail GetMachineProductionPlanDetail(int MppmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<MachineProductionPlanDetail>(
                    storedProcedureName: @"[dbo].[Get_MachineProductionPlanDetail]", parameters: parameters, dbName: DyeingDB).FirstOrDefault();
        }
        public IEnumerable<object> GetDyeingFabricBarcodes(int MppmId, int ProcessMode)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@ProcessMode", value: ProcessMode, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[GetDyeingFabricBarcode]", parameters: parameters, dbName: DyeingDB); //[dbo].[GetDyeingFabricBarcodes]
        }
        
        public IEnumerable<object> GetDyeingFabricBarcodeDetails(BarcodeDataNozzle _obj)
        {
            var data = new
            {
                MppmId = _obj.MppmId,
                FabricBarcodeList = _obj.BarcodeList.AsTableValuedParameter("dbo.FabricBarcodeList",
                           new[] {"FBarcodeGenId" })
            };
            return DatabaseHub.Query<object, object>(
                    storedProcedureName: @"[dbo].[GetDyeingFabricBarcodeDetails]", model: data, dbName: DyeingDB); 
        }
        
    }
}