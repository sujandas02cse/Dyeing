using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement
{
    public class BatchPlanModel:Base
    {
        public class BatchPlan
        {            
            public int InitInfoId { get; set; }
            public int GroupNo { get; set; }
            public int SeqNo { get; set; }
            public int BodyPartId { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public int PlanQty { get; set; }
            public int NoOfBatch { get; set; }           
            public string Remarks { get; set; }
            public string Enzyme { get; set; }
            public string SpecialFinish { get; set; }
            public string Process { get; set; }
            public int MDId { get; set; }
            //public string OFabOpId { get; set; }
        }
        public class BatchModel
        {
            public int InitInfoId { get; set; }
            public int GroupNo { get; set; }
            public int SeqNo { get; set; }
            public string BatchNo { get; set; }
            public string MaxBatchCount { get; set; }
        }
        public class DyedColorModel {
            public int InitinfoId { get; set; }
            public string DyedColor { get; set; }
            public string YarnBrand { get; set; }
            public string YarnLot { get; set; }
            public string YarnType { get; set; }
            public string YarnCount { get; set; }
        }
        public class LabDipData
        {
            public int InitInfoId { get; set; }
            public string LabDipNo { get; set; }

        }
        public class BatchPlanWrapper
        {
            public string Comb { get; set; }
            public string HostIP { get; set; }
            public int UnitId { get; set; } 
            public string UserId { get; set; }
            public List<BatchModel> batch { get; set; }
            public List<BatchPlan> plan { get; set; }
            public List<DyedColorModel> dyedColor { get; set; }
            public List<LabDipData> LabDipDatas { get; set; }
        }
        public class BatchPlanInitInfoId
        {
            public int InitInfoId { get; set; }
        }
        public async Task<IEnumerable<object>> GetBatchPlanData(int UnitId,int BuyerId,int JobId)
        {
            var job = JobId != 0 ? JobId : (int?)null;
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);           
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: job, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHubRpt.QueryAsyncNew<object>(
                storedProcedureName: @"[dbo].[usp_get_BatchPlanData]", parameters: parameter, dbName: DyeingDB);
        }
        public async Task<IEnumerable<object>> GetBodyPart()
        {           
            return await DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_BodyPart]", dbName: DyeingDB);
        }
        public async Task<object> GenBatchNoByJob(int UnitId, int JobId, int NoOfBatch, int PrevTBatch,int Change)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: JobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@NoOfBatch", value: NoOfBatch, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@PrevTBatch", value: PrevTBatch, dbType: DbType.String, direction: ParameterDirection.Input);

            if(Change == 1)
            {
                return await DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_GenBatchNoByJob1_New]", parameters: parameter, dbName: DyeingDB);
            }
            else
            {
                return await DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_GenBatchNoByJob_New]", parameters: parameter, dbName: DyeingDB);
            }
                
        }

        public async Task<Tuple<IEnumerable<object>, IEnumerable<object>>> GetBatchPlanDataByInitInfoId(List<BatchPlanInitInfoId> _obj,string Comb,int JobId)
        {
            var data = new
            {
                InitInfoList = _obj.AsTableValuedParameter("dbo.tvp_BatchPlanInitInfo",
                            new[] { "InitInfoId"}),
                Comb = Comb,
                JobId = JobId
            };

            return await DatabaseHub.MultiQueryAsync<object,object,object>(storedProcedureName: @"[dbo].[usp_Get_BatchPlanDataByInitInfo1]", model: data,dbName: DyeingDB);
        }

        public object SaveUpdate(BatchPlanWrapper _obj)
        {
            
            var data = new
            {
                Comb = _obj.Comb,
                HostIP = getclientIP(),
                UnitId = _obj.UnitId,
                UserId = _obj.UserId,
                tvp_BatchPlan = _obj.plan.AsTableValuedParameter("dbo.tvp_BatchPlan",
                            new[] { "InitInfoId", "GroupNo", "SeqNo", "BodyPartId", "FromDate", "ToDate", "PlanQty", "NoOfBatch", "Remarks", "Enzyme", "SpecialFinish", "Process","MDId" }),
                tvp_BatchPrepare = _obj.batch.AsTableValuedParameter("dbo.tvp_BatchPreparePlan",
                            new[] { "InitInfoId", "GroupNo", "SeqNo", "BatchNo", "MaxBatchCount" }),
                tvp_BatchDyedColor = _obj.dyedColor.AsTableValuedParameter("dbo.tvp_BatchDyedColorData",
                            new[] { "InitinfoId", "DyedColor", "YarnBrand", "YarnLot", "YarnType", "YarnCount" }),
                tvp_LabDipData = _obj.LabDipDatas.AsTableValuedParameter("dbo.tvp_LabDipData",
                            new[] { "InitInfoId", "LabDipNo" }),
            };

            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPlan_New]", model: data, dbName: DyeingDB).ToList();
        }
    }
}