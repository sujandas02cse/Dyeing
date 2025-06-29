using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration
{
    public class ProductionPlanReviseReasonModel:Base
    {
        public class ProductionPlanReviseReason
        {
            public string PprrId { get; set; }
            public string PlanReasonName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> ProdPlanReviseReasonInfo_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ProdPlanReviseReason]", dbName: DyeingDB);
        }
        public Task<long> ProdPlanReviseReason_SaveUpdate(ProductionPlanReviseReason obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_ProdPlanReviseReason]", model: obj, dbName: DyeingDB);
        }
        public Task<long> ProdPlanReviseReason_Delete(string PprrId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@PprrId", PprrId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_ProdPlanReviseReason]", parameters: parameters, dbName: DyeingDB);
        }
    }
}