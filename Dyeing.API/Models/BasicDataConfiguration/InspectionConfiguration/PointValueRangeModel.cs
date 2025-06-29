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
    public class PointValueRangeModel : Base
    {
        public class PointValueRangeM
        {
            public string PointValueNo { get; set; }
            public string PHeadNo { get; set; }
            public string PointHeadName { get; set; }
            public string FromValue { get; set; }
            public string ToValue { get; set; }
            public string FromTo { get; set; }
            public string Point { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }

            
        }
        public Task<long> Delete(string PointValueNo, string UserId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@PointValueNo", PointValueNo);
            parameters.Add("@UserId", UserId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_PointValueInfo]", parameters: parameters, dbName: DyeingDB);
        }
        
        public Task<IEnumerable<object>> GetPointHeadName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointHead]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetPointValueRangeMInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointValueRangeInfo]", dbName: DyeingDB);
        }
        public Task<long> PointValueRange_SaveUpdate(PointValueRangeM obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_PointValueRange]", model: obj, dbName: DyeingDB);
        }
        
    }
}