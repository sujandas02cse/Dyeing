using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration
{
    public class OperationSectionModel : Base
    {
        public class OperationSection
        {
            public string OscId { get; set; }
            public string SectionName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetSectionInfo_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_OperationSection]", dbName: DyeingDB);
        }
        public Task<long> OperationSection_SaveUpdate(OperationSection obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_OperationSection]", model: obj, dbName: DyeingDB);
        }
        public Task<long> OperationSection_Delete(string OscId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@OscId", OscId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_OperationSection]", parameters: parameters, dbName: DyeingDB);
        }
    }
}