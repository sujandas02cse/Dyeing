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
    public class DyeingProcessFlowModel:Base
    {
        public class DyeingProcessFlow
        {
            public string DpfcId { get; set; }
            public string NameOfProcess { get; set; }
            public string Priority { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> DyeingProcessFlowInfo_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ProcessFlowConfig]", dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> DyeingProcessFlowInfoActive_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ProcessFlowConfigActive]", dbName: DyeingDB);
        }
        public Task<long> DyeingProcessFlow_SaveUpdate(DyeingProcessFlow obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_ProcessFlowConfig]", model: obj, dbName: DyeingDB);
        }
        public Task<long> DyeingProcessFlow_Delete(string DpfcId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@DpfcId", DpfcId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_ProcessFlowConfig]", parameters: parameters, dbName: DyeingDB);
        }
    }
}