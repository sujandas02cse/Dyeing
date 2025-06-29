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
    public class PointHeadModel : Base
    {

        public class PointHead
        {
            public string PHeadNo { get; set; }
            public string PointHeadName { get; set; }           
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> PointHeadInfo_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointHeadInfo]", dbName: DyeingDB);
        }
        public Task<long> PointHead_SaveUpdate(PointHead obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_PointHeadInfo]", model: obj, dbName: DyeingDB);
        }
        public IEnumerable<PointHead> checkExisting(string name, string criteria)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Name", value: name, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Criteria", value: criteria, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.Query<PointHead>(
                    storedProcedureName: @"[dbo].[sp_checkExisting_basicData]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<long> Delete(string PHeadNo, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@PHeadNo", PHeadNo);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_PointHeadConfig]", parameters: parameters, dbName: DyeingDB);
        }
    }
      
}