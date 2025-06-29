using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration
{
    public class PointSystemValueRangeModel : Base
    {
        public class PointSystemValueRange
        {
            public string PointValueRangeNo { get; set; }
            public string PointSystemNo { get; set; }
            public string PointSystemName { get; set; }
            public string FromPoint { get; set; }
            public string ToPoint { get; set; }
            public string PointRange { get; set; }
            public string GradeNo { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetPointSystemName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointSysteName]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetPointSystemValueInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointSystemValueRangeInfo]", dbName: DyeingDB);
        }
        public Task<long> PointSystemValueRange_SaveUpdate(PointSystemValueRange obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_PointSystemValueRange]", model: obj, dbName: DyeingDB);
        }
        public Task<long> Delete(string PointValueRangeNo, string UserId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@PointValueRangeNo", PointValueRangeNo);
            parameters.Add("@UserId", UserId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_PointSystemValueRange]", parameters: parameters, dbName: DyeingDB);
        }
    }
}