using Dapper;
using Dyeing.API.DBInfo;
using Dyeing.API.Models.Common;
using Dyeing.API.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models
{
    public class CommonModel:Base
    {
        public class Response
        {
            public bool response { get; set; } = false;
            public string ErrorMsg { get; set; }
            public string Msg { get; set; }
            public object Data { get; set; }
            public object ProofValue { get; set; } = null;
        }
        public class SelectData
        {
            public string ID { get; set; }
            public string ID1 { get; set; }
            public string ID2 { get; set; }
            public string Name { get; set; }
            public string Name1 { get; set; }
            public string Name2 { get; set; }
            public string EMP_CODE { get; set; }
            public string pW { get; set; }
        }
        public class BarcodeModel
        {
            public string Barcode { get; set; }
        }
        public class PlanCommonModel
        {
            public int MppmId { get; set; }
            public string PlanNo { get; set; }
        }
        public class BatchBarcodeData
        {           
            public List<PlanCommonModel> PlanData { get; set; }
            public List<BarcodeModel> BarcodeData { get; set; }
        }


        

        public Task<IEnumerable<object>> GetUnitInfo(string UnitNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.String, direction: ParameterDirection.Input);            
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_com_Get_UnitInfo]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<object> GetBodyPartAll(int LoadingType, int BuyerId,int JobNo, int StyleId,int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
           
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadBodyPartAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabricNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadFabricNameAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetGSMAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadGSMAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabricGSMAll()
        {           

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_GSMAll]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetYarnHead()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_yarnhead]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetComposition(int IHID)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@IHID", value: IHID, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_composition]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetJobByBuyer(int BuyerId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_JobInfoByBuyer]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetBatchAll()
        {            
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchAll]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetBatchByBuyer(int BuyerId, int JobId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchByBuyer]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetFinMcByType(string Type)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@McType", value: Type, dbType: DbType.String, direction: ParameterDirection.Input);            
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_FinMachine]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetOrderByBuyer(int BuyerId, int JobId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_OrderByBuyer]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetStyleByBuyer(int BuyerId, int JobId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_StyleByBuyer]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetYarnCompositionAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadYarnCompositionAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabricByJobOrder(int BuyerId, int JobId, int OrderId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderId", value: OrderId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_FabricByBuyerJobOrder]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetColorNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadColorNameAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetColorCodeNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadColorCodeNameAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetPantoneNoNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[LoadPantoneNoNameAll]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> DiaInfoByJobFabric(int BuyerId, int JobId, int FabNameId)
        {
            var parameter = new DynamicParameters();            
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@FabNameId", value: FabNameId, dbType: DbType.Int32, direction: ParameterDirection.Input);            

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_DiaInfoByJobFabric]", parameters: parameter, dbName: DyeingDB);
        }

        public IEnumerable<object> GetFabricName()
        {
        return DatabaseHubRpt.Query<object>(
                storedProcedureName: @"[dbo].[GetFabricName]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetBorrowingParty()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_BorrowingParty]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetUnitAll()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_unitInfo]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetDyeingUnitAll()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_dyeing_unitInfo]", dbName: DyeingDB);
        }

        public IEnumerable<object> GetPointSystemNameAll()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetPointSystemName]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetMachineProductionPlanNo()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetMachineProductionPlanNo]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetTrollyNo(int unitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId" , value: unitId,dbType:DbType.Int32,direction:ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(storedProcedureName: @"[dbo].[GetTrollyInformation]",parameters:parameter,dbName:DyeingDB);
        }
        public IEnumerable<object> GetBarcodeData(BatchBarcodeData model)
        {
            var data = new
            {
                Tvp_Plan= model.PlanData.AsTableValuedParameter("dbo.tvp_Plan",
                             new[] { "MppmId", "PlanNo" }),
                Tvp_Barcode = model.BarcodeData.AsTableValuedParameter("dbo.Tvp_Barcode",
                             new[] { "Barcode"})               
            };
            return DatabaseHubRpt.Query<object, object>(storedProcedureName: @"[dbo].[usp_get_BarcodeWiseData]", model: data, dbName: DyeingDB).ToList();
            //return DatabaseHubRpt.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPreparation]", model: data, dbName: DyeingDB);
        }
        public IEnumerable<string> GetUserPassword(string empCode)
        {            
            var parameters = new DynamicParameters();
            parameters.Add(name: "@EmpCode", value: empCode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@MainModuleId", value: 18, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<string>(
                    storedProcedureName: @"[dbo].[sp_GetUserPasswordByModuleId]", parameters: parameters, dbName: ControlPanel);

        }
        public object SendForgotPassword(string empCode, string pW)
        {
            pW = EncryptDecrypt.DecryptText(pW);
            var parameters = new DynamicParameters();
            parameters.Add(name: "@EMP_CODE", value: empCode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pW", value: pW, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@MainModuleId", value: 18, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Send_ForgotPassword]", parameters: parameters, dbName: ControlPanel);

        }
        public Task<IEnumerable<object>> GetUnitByUser(string UserId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitByUser]", parameters: parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetTrackingNo()
        {            
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_TrackingNo]", dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetCompTimeByBatch(string BatchNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_CompTimeByBatch]", parameters: parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetCompTimeById(int BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_CompTimeById]", parameters: parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetMachineAll()
        {            
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_Machine]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRollDatabyBatch(string BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollDataByBatch]", parameters: parameter, dbName: DyeingDB);
        }


        public async Task<IEnumerable<object>> GetInspectionDataByUnit(int UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_GetInspectionBatchData]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetOrderByJobId(int buyerId,int jobId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: jobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_OrderByBuyerandJob]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetBuyerByUnitId(int UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitWiseBuyer]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetAllBuyer(int UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_AllBuyerInfo]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetCompTimeByBatchNew(string BatchNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_CompTimeByBatchNew]", parameters: parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetCompTimeByIdNew(int BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_CompTimeByIdNew]", parameters: parameter, dbName: DyeingDB);
        }

       

        public Task<IEnumerable<object>> GetDyeingUnitByUserFabricManagement(string UserId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitByUser_FabricManagement]", parameters: parameter, dbName: DyeingDB);
        }

        public IEnumerable<object> GetBatchByBuyerTypeWise(int BuyerId, int JobId,string batchType,string UserId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Status", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchByBuyer_TypeWise]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetUnitNameByBatchNew(int BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitNameByBatchNew]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetTrackingNo(string UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_TrackingNoByUnit]", parameters: parameter, dbName: DyeingDB);
        }
    }
}