using Dapper;
using Dyeing.API.DBInfo;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration
{
    public class FaultHeadConfigModel:Base
    {
        public class FaultHeadConfig
        {
            public int HeadID { get; set; }
            public int PriorityNo { get; set; }
            public string HeadName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> GetFaultHeadConfig()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_FaultHeadConfig]", dbName: DyeingDB);
        }
        public Task<long> SaveUpdate(FaultHeadConfig obj)
        {
            obj.HostIP = getclientIP();
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FaultHeadConfig]", model: obj, dbName: DyeingDB);
        }
        public Task<long> Delete(string HeadID, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@HeadID", HeadID);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_FaultHeadConfig]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<FaultHeadConfig> checkExisting(string name, string criteria)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Name", value: name, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Criteria", value: criteria, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Query<FaultHeadConfig>(
                    storedProcedureName: @"[dbo].[sp_checkExisting_basicData]", parameters: parameters, dbName: DyeingDB);
        }
    }
}