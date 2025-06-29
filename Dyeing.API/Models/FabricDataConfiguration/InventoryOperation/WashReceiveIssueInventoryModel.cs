using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.FabricDataConfiguration.InventoryOperation
{
    public class WashReceiveIssueInventoryModel : Base
    {
        public class WashReceiveIssueInventory
        {
            public string TrackingNo { get; set; }
            public string CuttingNo { get; set; }
            public string BodyPart { get; set; }
            public string BuyerNo { get; set; }
            public string JobNo { get; set; }
            public string OrderNo { get; set; }
            public string Color { get; set; }           
            public string HostIP { get; set; }
        }

        public class WashReceiveIssueInventoryDetails
        {
        
            public string BuyerNo { get; set; }
            public string BuyerName { get; set; }
            public string OrderNo { get; set; }
            public string OrderId { get; set; }
            public string JobId { get; set; }
            public string JobInfo { get; set; }
            public string TrackingNo { get; set; }
            public string ItemName { get; set; }
            public string ITEMID { get; set; }
            public string ItemColorName { get; set; }
            public string ICLEID { get; set; }
            public string CuttingNo { get; set; }
            public string BodyPart { get; set; }
            public string BodyPartID { get; set; }
            public string UOMNAME { get; set; }
            public string UOMID { get; set; }
            public string ItemSizeName { get; set; }
            public string ISZID { get; set; }
            public string SizeSetId { get; set; }
            public string GatePassTotalRcvQty { get; set; }
            public string DispatchSlipGenerationDetailsSizeId { get; set; }
            public string RcvQty { get; set; }
            public string RcvBundle { get; set; }
            public string totalRecQty { get; set; }
            public string TotalRcvBundle { get; set; }           
            public string TotalBalanceQty { get; set; }
            public string totalIssueQty { get; set; }
            public string TotalIssueBundleQty { get; set; }
            public string CuttingNoInitialOrExits { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }

       
        public class DispatchData
        {    
           
            public string BuyerName { get; set; }
            public string Guid { get; set; }
            public string Orders { get; set; }
            public string JobInfo { get; set; }           
            public string ItemColorName { get; set; }           
            public string ItemName { get; set; }
            public string CuttingNo { get; set; }

            public string TrackingNo { get; set; }
            public string BuyerId { get; set; }
            public string JobId { get; set; }
            public string OrderId { get; set; }
            public string ItemId { get; set; }
            public string ColorId { get; set; }
            public string SizeId { get; set; }
            public string SizeSetId { get; set; }


            public string ItemSizeName { get; set; }
            public string IssueQty { get; set; }
            public string IssueBundleQty { get; set; }
            public string DridId { get; set; }
            public string DrimId { get; set; }
            public string ReceiveQty { get; set; }
            public string ReceiveBundleQty { get; set; }
            public string IsDispatchRow { get; set; }
            public string UserId { get; set; }           

        }

        public class DyeingReceiveIssueMaster
        {
            public string DrimId { get; set; }
            public string UnitId { get; set; }
            public string CuttingNo { get; set; }
            public string BodyPartNo { get; set; }
            public string BuyerId { get; set; }
            public string OrderId { get; set; }
            public string ColorId { get; set; }
            public string JobId { get; set; }
            public string BuyerID { get; set; }
            public string JobID { get; set; }
            public string OrderID { get; set; }
            public string ColorID { get; set; }
            public string Status { get; set; }
            public string InfoSource { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

            public List<DyeingReceiveIssueDetails> _details { get; set; }

        }
        public class DyeingReceiveIssueDetails
        {
            public string DridId { get; set; }
            public string BuyerNo { get; set; }
            public string BuyerName { get; set; }
            public string OrderNo { get; set; }
            public string OrderId { get; set; }
            public string JobId { get; set; }
            public string JobInfo { get; set; }
            public string TrackingNo { get; set; }
            public string ItemName { get; set; }
            public string ITEMID { get; set; }
            public string ItemColorName { get; set; }
            public string ICLEID { get; set; }
            public string CuttingNo { get; set; }
            public string BodyPart { get; set; }
            public string BodyPartID { get; set; }
            public string UOMNAME { get; set; }
            public string UOMID { get; set; }
            public string ItemSizeName { get; set; }
            public string ISZID { get; set; }
            public string SizeSetId { get; set; }
            public string GatePassTotalRcvQty { get; set; }
            public string DispatchSlipGenerationDetailsSizeId { get; set; }
            public string RcvQty { get; set; }
            public string RcvBundle { get; set; }
            public string totalRecQty { get; set; }
            public string TotalRcvBundle { get; set; }           
            public string TotalBalanceQty { get; set; }
            public string totalIssueQty { get; set; }
            public string TotalIssueBundleQty { get; set; }
            public string CuttingNoInitialOrExits { get; set; }            
        }

        public Task<IEnumerable<object>> GetTrackingNo()
        {          
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetTrackingNo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBuyer()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsBuyerName]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetJob(string BuyerId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsJob]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetOrder(string BuyerId,string JobNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobNo", value: JobNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsOrderNo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetColor(string BuyerId, string JobNo,string OrderNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobNo", value: JobNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsColor]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetDataInfo(string TrackingNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@AutoCompleteText", value: TrackingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsCuttingNo", value: IsCuttingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsBodyPartNo", value: IsBodyPartNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetails_TrackingNo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetDataInfoOth(string BuyerId, string JobId, string OrderId, string ColorId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobNo", value: JobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderNo", value: OrderId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ColorNo", value: ColorId, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsCuttingNo", value: IsCuttingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsBodyPartNo", value: IsBodyPartNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetPrintDetails_Buyer_Job_Order_Color]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetUnitId(string TrackingNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@AutoCompleteText", value: TrackingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsCuttingNo", value: IsCuttingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsBodyPartNo", value: IsBodyPartNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsUnitIdBy_TrackingNo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetUnitIdOth(string BuyerId, string JobId, string OrderId, string ColorId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderId", value: OrderId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ColorId", value: ColorId, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsCuttingNo", value: IsCuttingNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@IsBodyPartNo", value: IsBodyPartNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetAllPrintDetailsUnitIdBy_Buyer_Job_Order_color]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetDispatchList()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetDispatchDataList]", dbName: DyeingDB);

        }

        public Task<long> WashReceiveIssueInventory_SaveUpdate(DyeingReceiveIssueMaster _master)
        {
            //var data = new
            //{
            //    DrimId = _master.DrimId,
            //    UnitId= _master.UnitId,
            //    IsCuttingNo = _master.CuttingNo,
            //    IsBodyPart = _master.BodyPartNo,
            //    BuyerId = _master.BuyerId,
            //    JobId = _master.JobId,
            //    OrderId = _master.OrderId,
            //    ColorId = _master.ColorId,
            //    HostIP = getclientIP(),
            //    UserId = _master.UserId,
            //    DyeingReceiveIssue = _master._details.AsTableValuedParameter("dbo.DyeingReceiveIssue",
            //                new[] { "DridId", "TrackingNo", "BuyerNo", "JobId", "OrderId", "ICLEID", "ITEMID", "CuttingNo", "BodyPartID", "UOMNAME", "ISZID", "SizeSetId", "totalRecQty", "TotalRcvBundle", "RcvQty", "RcvBundle", "totalIssueQty", "TotalIssueBundleQty" })
            //};

            var data = new
            {
                DrimId = _master.DrimId,
                UnitId = _master.UnitId,               
                HostIP = getclientIP(),
                UserId = _master.UserId,
                DyeingReceiveIssue = _master._details.AsTableValuedParameter("dbo.DyeingReceiveIssue",
                            new[] { "DridId", "TrackingNo", "BuyerNo", "JobId", "OrderId", "ICLEID", "ITEMID", "CuttingNo", "BodyPartID", "UOMNAME", "ISZID", "SizeSetId", "totalRecQty", "TotalRcvBundle", "RcvQty", "RcvBundle", "totalIssueQty", "TotalIssueBundleQty", "DispatchSlipGenerationDetailsSizeId" })
            };

            return DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_SaveUpdate_DyeingReceiveIssueInventory]", model: data, dbName: DyeingDB);          

    }

        public Task<long> Dispatch_SaveUpdate(List<DispatchData> _master)
        {          
            return DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_UpdatePrintDetails]", model: _master, dbName: DyeingDB);
        }

    }
}