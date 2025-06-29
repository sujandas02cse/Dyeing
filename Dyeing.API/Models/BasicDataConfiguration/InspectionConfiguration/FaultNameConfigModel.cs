using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration
{
    public class FaultNameConfigModel:Base
    {
        public class FaultNameConfig
        {
            public int NameID { get; set; }
            public int HeadID { get; set; }
            public int PriorityNo { get; set; }
            public string FaultName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> GetFaultName(int HeadId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@HeadID", HeadId);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_FaultNameConfig]",parameters:parameters, dbName: DyeingDB);
        }
        public Task<long> SaveUpdate(FaultNameConfig obj)
        {
            obj.HostIP = getclientIP();
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FaultNameConfig]", model: obj, dbName: DyeingDB);
        }
        public Task<long> Delete(string NameId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@NameId", NameId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_FaultNameConfig]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<FaultNameConfig> checkExisting(string name, string criteria)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Name", value: name, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Criteria", value: criteria, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Query<FaultNameConfig>(
                    storedProcedureName: @"[dbo].[sp_checkExisting_basicData]", parameters: parameters, dbName: DyeingDB);
        }
    }
}