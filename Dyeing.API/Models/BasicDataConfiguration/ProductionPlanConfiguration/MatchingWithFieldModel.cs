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
    public class MatchingWithFieldModel : Base
    {
        public class MatchingWithField
        {
            public string MfcId { get; set; }
            public string NameOfMatching { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> MatchingWithFieldInfo_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_MatchingFieldConfig]", dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> MatchingWithFieldInfoActive_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_MatchingFieldConfigActive]", dbName: DyeingDB);
        }
        public Task<long> MatchingWithField_SaveUpdate(MatchingWithField obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MatchingFieldConfig]", model: obj, dbName: DyeingDB);
        }
        public Task<long> MatchingWithField_Delete(string MfcId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@MfcId", MfcId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_MatchingFieldConfig]", parameters: parameters, dbName: DyeingDB);
        }
    }
}