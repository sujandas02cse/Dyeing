using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchWiseGSMModel:Base
    {        

        public class BatchWiseGSM
        {            
            public int MppmId { get; set; }
            public string BuyerId { get; set; }
            public string OrderId { get; set; }
            public string JobId { get; set; }
            public string ColorId { get; set; }
            public string BatchNo { get; set; }
            public string BuyerName { get; set; }
            public string JobInfo { get; set; }
            public string OrderNo { get; set; }
            public string ItemColorName { get; set; }
            public string BatchWeight { get; set; }
            public string HostIP { get; set; }
           
        }

        public class BatchWiseGSMDetails
        {
            public int MppmId { get; set; }
            public int BgcId { get; set; }
            public string GsmId { get; set; }
            public string BpmId { get; set; }
            public string BarcodeId { get; set; }
            public int AGsmId { get; set; }
            public string AGSM { get; set; }
            public float ActualGSM { get; set; }
            public string BarcodeNo { get; set; }
            public string RollNo { get; set; }
            public string Variation { get; set; }
            public string GSMName { get; set; }
            public string StepNo { get; set; }
            public string StepID { get; set; }//BgcId
            public string CurStep { get; set; }
            public string sl { get; set; }
            //public List<Object> StepNo { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }

        public class BatchGSMWrapper
        {
            public int CompTime { get; set; }
            public string UserId { get; set; }
            public List<BatchWiseGSMDetails> Details { get; set; }
            public List<BatchWiseGsmFinalComments> FinalComments { get; set; }
        }

        public class BatchWiseGsmFinalComments
        {
            public int BpmId { get; set; }
            public int CompTime { get; set; }
            public string FinalComment { get; set; }
            public int UserId { get; set; }
        }

        public Task<IEnumerable<object>> GetBatchNo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchNo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetAGSM()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ActualGSMInfo]", dbName: DyeingDB);

        }

        public object GetBatchWiseGSMInfo(int BpmId, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);
            
            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_Get_BatchWiseGSMInfo]", parameters: parameters, dbName: DyeingDB).FirstOrDefault();
        }

        public async Task<object> GetBatchWiseGSMDetailsInfo(int BpmId,int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchWiseGSMDetailsInfo_v1]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> GetStepNo(int BarcodeId,int BpmId, int RollNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BarcodeId", value: BarcodeId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchStepNo]", parameters: parameters, dbName: DyeingDB);
        }

        public object getUpdateValue(int BgcId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BgcId", value: BgcId, dbType: DbType.String, direction: ParameterDirection.Input);
            
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchWiseGSMEditInfo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<long> BatchWiseGSM_SaveUpdate(BatchGSMWrapper _obj)
        {  

            var data = new
            {
                HostIP = getclientIP(),
                CompTime= _obj.CompTime,
                UserId= _obj.UserId,
                BatchWiseGSM = _obj.Details.AsTableValuedParameter("dbo.tvp_BatchWiseGSMData",
                                    new[] { "BgcId", "BpmId", "RollNo", "ActualGSM",  "Variation" }),

                GsmFinalComments = _obj.FinalComments.AsTableValuedParameter("",
                                    new[] { "BpmId", "CompTime", "FinalComment", "UserId"})
            };            
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_BatchGSMConfig1]", model: data, dbName: DyeingDB);
        }

        public object GetBatchWiseGSMInfoNew(int BpmId, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_Get_BatchWiseGSMInfoNew]", parameters: parameters, dbName: DyeingDB).FirstOrDefault();
        }

        public async Task<object> GetBatchWiseGSMDetailsInfoNew(int BpmId, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchWiseGSMDetailsInfo_v1_new]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<long> BatchWiseGSM_SaveUpdateNew(BatchGSMWrapper _obj)
        {

            var data = new
            {
                HostIP = getclientIP(),
                CompTime = _obj.CompTime,
                UserId = _obj.UserId,
                BatchWiseGSM = _obj.Details.AsTableValuedParameter("dbo.tvp_BatchWiseGSMData",
                                    new[] { "BgcId", "BpmId", "RollNo", "ActualGSM", "Variation" }),

                GsmFinalComments = _obj.FinalComments.AsTableValuedParameter("",
                                    new[] { "BpmId", "CompTime", "FinalComment", "UserId" })
            };
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_BatchGSMConfig1New]", model: data, dbName: DyeingDB);
        }
    }
}