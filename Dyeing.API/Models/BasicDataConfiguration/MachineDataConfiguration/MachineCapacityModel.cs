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
    public class MachineCapacityModel : Base
    {
        public class MachineCapacity
        {
            public string MCapacityId { get; set; }
            public string CapacityName { get; set; }           
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }
        public Task<IEnumerable<object>> MachineCapacityInfo_Get()
        {           
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_MachineCapacity]", dbName: DyeingDB);
        }
        public Task<long> MachineCapacity_SaveUpdate(MachineCapacity obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MachineCapacity]", model: obj, dbName: DyeingDB);
        }
        public Task<long> MachineCapacity_Delete(string MCapacityId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@MCapacityId", MCapacityId);           
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_MachineCapacity]", parameters: parameters, dbName: DyeingDB);
        }
    }
}