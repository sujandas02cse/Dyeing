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
    public class UnitWiseInspectionMCModel : Base
    {
        public class UnitWiseInspectionMCM
        {
            public string UimId { get; set; }
            public string UnitId { get; set; }
            public string UnitEName { get; set; }
            public string InspMNo { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetUnitName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_ProductionShift_Get_UnitInfo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetUnitWiseInspectionMCInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_UnitWiseInspectionMCInfo]", dbName: DyeingDB);
        }
        public Task<long> UnitWiseInspectionMCInfo_SaveUpdate(UnitWiseInspectionMCM obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_UnitWiseInspectionMC]", model: obj, dbName: DyeingDB);
        }
        public long Delete(UnitWiseInspectionMCM model)
        {
            model.HostIP = getclientIP();
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Id", value: model.UimId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: model.UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Execute(
                    storedProcedureName: @"[dbo].[usp_Delete_UnitWiseInspectionMC]", parameters: parameters, dbName: DyeingDB);
        }
    }
}