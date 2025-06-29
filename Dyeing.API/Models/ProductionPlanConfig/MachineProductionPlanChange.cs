using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.ProductionPlanConfig
{
    public class MachineProductionPlanChange:Base
    {
        public class MachineProductionPlanChangeModel
        {
            public int MppchId { get; set; }
            public int MppmId { get; set; }
            public int FMId { get; set; }
            public int TMId { get; set; }
            public decimal PlanQtyOld { get; set; }
            public decimal PlanQty { get; set; }
            public string ToMcDate { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }
        public Task<IEnumerable<object>> GetPlanNo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetBatchNoAndPlanNo]", dbName: DyeingDB);

        }
        public Task<IEnumerable<object>> GetBatchNo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetBatchNoAndPlanNo]", dbName: DyeingDB);

        }

        public Task<IEnumerable<object>> GetPlanInfo(int mppmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: mppmId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_MachineProdPlanInfo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetToMcNo(string userid)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@userid", value: userid, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_UnitWiseMcNo]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<long> SaveUpdate(MachineProductionPlanChangeModel _obj)
        {
            _obj.HostIP = getclientIP();
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MachineProductionPlanChange]", model: _obj, dbName: DyeingDB);
        }
        
    }
}