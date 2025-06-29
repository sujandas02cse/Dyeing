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
    public class MachineInfoModel:Base
    {
        public class MachineInfo
        {
            public string MId { get; set; }
            public string MachineEng { get; set; }
            public string MachineBn { get; set; }
            public string Category { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public IEnumerable<object> MachineInfo_Get(string MId, string Category)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MId", value: MId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Category", value: Category, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[sp_Get_MachineInfo]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<long> MachineInfo_SaveUpdate(MachineInfo obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[sp_SaveUpdate_MachineInfo]", model: obj, dbName: DyeingDB);
        }

        public Task<long> MachineInfo_Delete(string MId, string Category, string UsetId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@MId", MId);
            parameters.Add("@Category", Category);
            parameters.Add("@UserId", UsetId);
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[sp_Delete_MachineInfo]", parameters:parameters, dbName: DyeingDB);
        }

        
    }
}