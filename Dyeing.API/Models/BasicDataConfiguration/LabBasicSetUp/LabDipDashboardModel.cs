using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipDashboardModel : Base
    {
        public IEnumerable<object> GetLabDipDashboardReceipe(int UnitId, string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@UnitId", UnitId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@FromDate", FromDate, DbType.String, ParameterDirection.Input);
            parameters.Add("@ToDate", ToDate, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_AllLabDipReceipeDashBoardData]",
                parameters: parameters,
                dbName: DyeingDB);
        }


    }
}