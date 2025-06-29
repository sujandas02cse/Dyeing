using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class TrolleyNoModel:Base
    {
        public class TrolleyNoM
        {
            public string TncId { get; set; }            
            public string UnitId { get; set; }
            public string UnitEName { get; set; }
            public string TrolleyNo { get; set; }           
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetUnitName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_ProductionShift_Get_UnitInfo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetTrolleyNoInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_TrolleyNoInfo]", dbName: DyeingDB);
        }
        public Task<long> TrolleyNoInfo_SaveUpdate(TrolleyNoM obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_TrolleyNoInfo]", model: obj, dbName: DyeingDB);
        }

        public Task<long> TrolleyNo_Delete(string TncId, string UsetId)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@TncId", TncId);
            parameters.Add("@UserId", UsetId);

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_Delete_TrolleyNoConfig]", parameters: parameters, dbName: DyeingDB);
        }
    }
}