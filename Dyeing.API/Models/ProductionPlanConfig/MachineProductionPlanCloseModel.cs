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
    public class MachineProductionPlanCloseModel : Base
    {
        public class MachineProductionPlanClose
        {
            public int MppcloseId { get; set; }
            public int MppmId { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
            public int PlanStatus { get; set; }
        }
        public Task<IEnumerable<object>> GetPlanNo(int isActive)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@IsActive", value: isActive, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetBatchNoAndPlanNo]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchNo(int isActive)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@IsActive", value: isActive, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetBatchNoAndPlanNo]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<long> SaveUpdate(MachineProductionPlanClose _obj)
        {
            _obj.HostIP = getclientIP();
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MachineProductionPlanClose]", model: _obj, dbName: DyeingDB);
        }
    }
}