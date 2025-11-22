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
    public class MachinePlanModel:Base
    {
        public class MachinePlan
        {
            public string BatchNo { get; set; }
            public int InitInfoId { get; set; }
            public int CombinationId { get; set; }
            public int GroupNo { get; set; }
            public int SeqNo { get; set; }
            public string UniqueGuid { get; set; }
            public int ParentBpmId { get; set; }
            public int BpmId { get; set; }
            public int MDId { get; set; }           
            public int BodyPartId { get; set; }
            public string PlanFromDate { get; set; }
            public string PlanToDate { get; set; }
            public int PlanQty { get; set; }
            public string Enzyme { get; set; }
            public string SpecialFinish { get; set; }
            public string Process { get; set; }
        }
        public class MachinePlanWrapper
        {
            public int UnitId { get; set; }
            public string UserId { get; set; }
            public List<MachinePlan> plan { get; set; }
        }
        public Task<IEnumerable<object>> GetMachinePlanData(int UnitId,int BuyerId,int JobId)
        {
            var job = JobId != 0 ? JobId : (int?)null;
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);            
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: job, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_MachinePlanData]", parameters: parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchPlanByGuid(int  UniqueGuid ,int ComId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UniqueId", value: UniqueGuid, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@ComId", value: ComId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_GetBatchPlanByGuid]", parameters: parameter, dbName: DyeingDB);
        }
        public object SaveUpdate(MachinePlanWrapper _obj)
        {
            
            
            var data = new
            {
                HostIP = getclientIP(),
                UnitId = _obj.UnitId,
                UserId = _obj.UserId,
                tvp_Machine = _obj.plan.AsTableValuedParameter("dbo.tvp_MachinePlan",
                            new[] { "BatchNo", "CombinationId", "InitInfoId", "GroupNo", "SeqNo", "UniqueGuid", "ParentBpmId", "BpmId", "MDId", "BodyPartId", "PlanFromDate", "PlanToDate", "PlanQty", "Enzyme", "SpecialFinish","Process"})
            };
            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_MachinePlan]", model: data, dbName: DyeingDB).ToList();            
        }
    }
}