using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Dyeing.API.Models.ProductionPrioritySetModel;

namespace Dyeing.API.Models
{    
    public class MachineProdPlanConfigModel:Base
    {
        public class MachineProductionPlanForSave
        {
            public string MppmId { get; set; }            
            public string UnitId { get; set; }
            public string PlanDate { get; set; }
            public string PlanNo { get; set; }
            public string BatchNo { get; set; }
            public string PprrId { get; set; }
            public string PlanReasonName { get; set; }
            public string LoadingType { get; set; }
            public string ProdStatus { get; set; }
            public string MDId { get; set; }
            public string BuyerId { get; set; }
            public string JobId { get; set; }            
            public string StyleId { get; set; }
            public string OrderId { get; set; }
            public string ShipDate { get; set; }
            public string ColorId { get; set; }
            public string LDNo { get; set; }
            public string RNNo { get; set; }
            public string FabricQty { get; set; }
            public string OrderType { get; set; }
            public string MfcId { get; set; }
            public string ITEMID { get; set; }
            public string IFID { get; set; }
            public string GSMId { get; set; }
            public string PlanQty { get; set; }
            public string Enzyme { get; set; }
            public string DpfcId { get; set; }  
            public string FabricsOperationNo { get; set; }
            public string BodyPartId { get; set; }
            public string ColorTypeId { get; set; }
            public string ColorShadeId { get; set; }
            public string ColorSpecId { get; set; }
            public string PantoneId { get; set; }
            public string PantoneType { get; set; }
            public string AopBackNo { get; set; }
            public string NoOfBatch { get; set; }
            public string Remarks { get; set; }

            public string Mode { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }
        public class MachineProductionPlan: MachineProductionPlanForSave
        {
            public string BuyerName { get; set; }
        }
        //public class MachinePPlanMaster
        //{
        //    public string Mode { get; set; }
        //    public string UserId { get; set; }
        //    public string HostIP { get; set; }
        //}

        //public class MachineProductionPlanWrapper
        //{
        //    MachinePPlanMaster master { get; set; }
        //    List<MachineProductionPlanForSave> details { get; set; }            
        //}
        public class Response
        {
            public string PlanNo { get; set; }
            public string BatchNo { get; set; }
            public string Msg { get; set; }
            public string ErrorMsg { get; set; }
        }       
        public Task<IEnumerable<object>> GetBatchNoAndPlanNo()
        {       
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PlanAndBatchNo]", dbName: DyeingDB);

        }
        public object GetDropDataByBuyerId(int buyerId, int id, string Info)
        {           
            var data = new
            {
                BuyerId = buyerId,
                Id=id,            
                Info= Info
            };

            var result = DatabaseHub.MultiQuery<object, object, object, object>(
                   storedProcedureName: @"[dbo].[usp_GetDropDataByBuyerId]", model: data, dbName: DyeingDB);
            return result;
        }
        public async Task<object> GetMasterDataPlan(int buyerId, int jobId, int styleId, int orderId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: buyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: jobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: styleId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderId", value: orderId, dbType: DbType.String, direction: ParameterDirection.Input);           

            return await DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_MasterDataForPlan]", parameters: parameters, dbName: DyeingDB);
        }
        public Response MachineProdPlan_SaveUpdate(List<MachineProductionPlanForSave> obj)
        {
            obj[0].HostIP = getclientIP();
            var data = new
            {               
                DyeingProdPlan = obj.AsTableValuedParameter("dbo.DyeingProdPlan",
                           new[] { "MppmId", "UnitId", "PlanDate","PlanNo","BatchNo","PprrId","PlanReasonName","LoadingType","ProdStatus","MDId","BuyerId","JobId","StyleId","OrderId", "ShipDate", "ColorId","LDNo", "RNNo", "FabricQty", "OrderType", "MfcId", "ITEMID","IFID","GSMId","PlanQty","Enzyme","DpfcId","FabricsOperationNo","BodyPartId","ColorTypeId","ColorShadeId", "ColorSpecId","PantoneId","PantoneType","AopBackNo", "NoOfBatch", "Remarks", "Mode","UserId","HostIP"})
            };
            return DatabaseHub.Query<object, Response>(storedProcedureName: "[dbo].[usp_SaveUpdate_MachineProdPlanNew]", model: data, dbName: DyeingDB).FirstOrDefault();
                        
        }
        public Task<IEnumerable<object>> GetMachineProdPlanInfo(string MppmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetMachineProdPlanInfo]",parameters:parameters, dbName: DyeingDB);

        }
        public Task<IEnumerable<object>> GetMachineNo(string unitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@unitId", value: unitId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_UnitWiseMc]", parameters: parameters, dbName: DyeingDB);
        }
    }
}