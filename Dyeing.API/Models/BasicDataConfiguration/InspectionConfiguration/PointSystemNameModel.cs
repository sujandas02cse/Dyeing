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
    public class PointSystemNameModel:Base
    {
        public class PointSystemNameM
        {
            public string PointSystemNo { get; set; }
            public string PointSystemName { get; set; }
            public string Description { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetPointSystemNameInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointSystemInfo]", dbName: DyeingDB);
        }
        public Task<long> PointSystemName_SaveUpdate(PointSystemNameM obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_PointSystemInfo]", model: obj, dbName: DyeingDB);
        }
        public Task<long> Delete(PointSystemNameM model)
        {
            model.HostIP = getclientIP();
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Id", value: model.PointSystemNo, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: model.UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_PointSystemName]", parameters: parameters, dbName: DyeingDB);
        }
    }
}