using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models
{
    public class FinishedFabricFloorToStoreIssueModel : Base
    {        

        public class Barcode
        {
            public int BarcodeID { get; set; }
        }

        public class BarcodeOth
        {
            public int BarcodeID { get; set; }
        }
        
        public class FinishedFabricFloorToStoreIssueMaster
        {            
            public string FfsMId { get; set; }
            public string UnitId { get; set; }
            public string IssueDate { get; set; }
            public string InputMethod { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
            public List<FinishedFabricFloorToStoreIssueDetail> Details { get; set; }

        }

        public class FinishedFabricFloorToStoreIssueDetail
        {
            public string FfsDId { get; set; }
            public string BarcodeId { get; set; }           
            
            public string FBarcodeGernationId { get; set; }
            public string BuyerId { get; set; }
            public string BuyerName { get; set; }
            public string OrderId { get; set; }
            public string OrderNo { get; set; }
            public string JobNo { get; set; }
            public string JobInfo { get; set; }
            public string StyleId { get; set; }
            public string StyleInfo { get; set; }
            public string ItemName { get; set; }
            public string ITEMID { get; set; }
            public string Specification { get; set; }
            public string FinishedDia { get; set; }
            public string ItemSizeName { get; set; }
            public string ItemColorName { get; set; }
            public string Qty { get; set; }
            public string RollCount { get; set; }
            public string ManualRollCount { get; set; }
            public string TotalRoll { get; set; }

            public string HostIP { get; set; }
            public string UserId { get; set; }
        }
        

        public Task<IEnumerable<object>> getBarcodeQty(int barcode)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Barcode", value: barcode, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BarcodeWiseWeightInfo]", parameters: parameters, dbName: DyeingDB);
        }
       
        public IEnumerable<object> getAllFinishedData(List<Barcode> _obj)
        {
            var data = new
            {
                FinishedFabricDataByBarcode = _obj.AsTableValuedParameter("dbo.FinishedFabricDataByBarcode",
                           new[] { "BarcodeID" })
            };
            return  DatabaseHub.Query<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_FinishedFabricFloorToStoreIssueInfo]", model: data, dbName: DyeingDB);
        }
        public IEnumerable<object> getAllFinishedDataOth(List<BarcodeOth> _obj)
        {
            var data = new
            {
                FinishedFabricDataByBarcode = _obj.AsTableValuedParameter("dbo.FinishedFabricDataByBarcode",
                           new[] { "BarcodeID" })
            };
            return DatabaseHub.Query<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_FinishedFabricFloorToStoreIssueInfo]", model: data, dbName: DyeingDB);
        }

        public long FinFabFlrToStoreIssue_SaveUpdate(FinishedFabricFloorToStoreIssueMaster _obj)
        {
            var data = new
            {
                UnitId = _obj.UnitId,
                IssueDate = _obj.IssueDate,
                InputMethod = _obj.InputMethod,
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                FinFabFloorToStoreIssueDetails = _obj.Details.AsTableValuedParameter("dbo.FinFabFloorToStoreIssueDetails",
                            new[] { "BarcodeId", "Qty", "RollCount", "ManualRollCount", "UserId" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveUpdate_FinFabFloorToStoreIssue]", model: data, dbName: DyeingDB);
        }
    }
}