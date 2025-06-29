using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models
{
    public class FinishingSpecificationConfigurationModel : Base
    {
        public class SpecificationConfig
        {
            public string FbscId { get; set; }
            public string SpecificationName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> Get_SpecificationConfig()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Get_SpecificationConfig]", dbName: DyeingDB);
        }
        public Task<long> SpecificationConfig_SaveUpdate(SpecificationConfig obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_SpecificationConfig]", model: obj, dbName: DyeingDB);
        }
        public Task<long> SpecificationConfig_Delete(string FbscId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@FbscId", FbscId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[sp_Delete_SpecificationConfig]", parameters: parameters, dbName: DyeingDB);
        }
    }
}