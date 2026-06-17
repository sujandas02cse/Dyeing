using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.DashboardManagement
{
    public class LabRelatedDashboardModel : Base
    {
        public Task<IEnumerable<object>> GetLabDipReceipeMasterData(int LabBookReceiveId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@LabBookReceiveId", value: LabBookReceiveId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_LabReceipeCardData]", parameters: parameters, dbName: DyeingDB);
        }
    }
}