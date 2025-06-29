using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.FabricDataConfiguration
{
    public class AfterHeatSetWeightModify
    {
        public int Id { get; set; }
        public int GreigeFabMasterId { get; set; }
        public int GreigeFabDetailId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal AfterHeatSetQty { get; set; }
        public decimal ProcessLoss { get; set; }
        public decimal Consumption { get; set; }
        public string Action { get; set; }
    }
    public class BarcodeConfigModel: Base
    {
        public BarcodeConfigModel() { }
        public int BarcodeNumber { get; set; }
        public string BuyerName { get; set; }
        public string Job { get; set; }
        public string Mode { get; set; }
        public string OrderNo { get; set; }
        public int Weight { get; set; }
        public int ModifiedWeight { get; set; }
        public int WeightLoss { get; set; }
        public int ReasonId { get; set; }
        public int CopyNumber { get; set; }
        public int CopyWeight { get; set; }
        public int Count { get; set; }
        public int SumWeight { get; set; }

        public class ReasonModel
        {
            public int Id { get; set; }
            public string ReasonName { get; set; }
        }

        

        public IEnumerable<BarcodeConfigModel> GetBarcodeInfo(Int64 Barcode)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Barcode", value: Barcode, dbType: DbType.Int64, direction: ParameterDirection.Input);

            return DatabaseHub.Query<BarcodeConfigModel>(
                    storedProcedureName: @"[dbo].[sp_GetBarcodeInfo]", parameters: parameters, dbName: DyeingDB);
        }
        //public IEnumerable<ReasonModel> LoadReasonDDL()
        //{
        //    return DatabaseHub.Query<ReasonModel>(
        //            storedProcedureName: @"[dbo].[sp_GetBarcodeReason]", dbName: DyeingDB);
        //}

        // load unit
        public Task<IEnumerable<object>> LoadUnitNo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Select_tblUnitInfo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadReasonDDL()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_GetBarcodeReason]", dbName: DyeingDB);
        }

        // Issue List
        public Task<IEnumerable<object>> LoadIssue(int UnitId, string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Select_tbl_GreigeIssue]",parameters: parameters, dbName: DyeingDB);
        }

        // Heat Set Issue List
        public Task<IEnumerable<object>> LoadHeatSetIssue(int UnitId, string FromDate, string ToDate, string IssueNo)
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@IssueNo", value: IssueNo, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    // storedProcedureName: @"[dbo].[sp_SelectHeatSetIssue]", parameters: parameters, dbName: DyeingDB);
                    storedProcedureName: @"[dbo].[sp_SelectHeatSetIssue]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<BarcodeConfigModel> SaveBarcode(BarcodeConfigModel model)
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@BarcodeNo", value: model.BarcodeNumber, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@ModifiedWeight", value: model.ModifiedWeight, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@ReasonId", value: model.ReasonId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@CopyNumber", value: model.CopyNumber, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@CopyWeight", value: model.CopyWeight, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@Mode", value: model.Mode, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Query<BarcodeConfigModel>(
                    storedProcedureName: @"[dbo].[sp_Insert_Barcode]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<int> IssueSave(List<AfterHeatSetWeightModify> _obj)
        {
            var data = new
            {
                UserId="admin",
                Action= _obj[0].Action,
                tvp_AfterHeatSetWeightModify = _obj.AsTableValuedParameter("dbo.tvp_AfterHeatSet",
                           new[] { "Id","GreigeFabMasterId", "GreigeFabDetailId", "IssueQty", "AfterHeatSetQty", "ProcessLoss", "Consumption" })
            };
            return DatabaseHub.Query<object, int>(
                        storedProcedureName: @"[dbo].[tbl_InsertAfterHeatSetWeightModify]", model: data, dbName: DyeingDB);

        }
        public IEnumerable<BarcodeConfigModel> checkExisting(Int64 Barcode)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Barcode", value: Barcode, dbType: DbType.Int64, direction: ParameterDirection.Input);

            return DatabaseHub.Query<BarcodeConfigModel>(
                    storedProcedureName: @"[dbo].[sp_checkExistingBarcode]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<BarcodeConfigModel> getPartialWeight(Int64 Barcode)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Barcode", value: Barcode, dbType: DbType.Int64, direction: ParameterDirection.Input);

            return DatabaseHub.Query<BarcodeConfigModel>(
                    storedProcedureName: @"[dbo].[sp_GetBarcodePartialWeight]", parameters: parameters, dbName: DyeingDB);
        }
    }
}