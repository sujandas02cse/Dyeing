using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchReprocessConfigModel:Base
    {
        public class BatchReprocessConfig
        {
            public int Id { get; set; }
            public int BpmId { get; set; }
            public int RollNo { get; set; }
            public string RStatus { get; set; }
            public string CreatedBy { get; set; }
            public DateTime CreatedWhen { get; set; }
            public string UpdatedBy { get; set; }
            public DateTime UpdatedWhen { get; set; }
            public string HostIP { get; set; } = getclientIP();
        }
        public class BatchRprocessWrapper
        {
            public string UserId { get; set; }
            public List<BatchReprocessConfig> Details { get; set; }
        }

        public Task<IEnumerable<object>> GetBatchDatabyUnit(string UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitNo", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_getBatchDataByUnit]", parameters: parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRollDatabyBatch(string BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollDataByBatch]", parameters: parameter, dbName: DyeingDB);
        }

        public long InsertBulkData(BatchRprocessWrapper batchRprocessWrapper)
        {
            var dynamicParameters = new DynamicParameters();

            dynamicParameters.Add("@UserId", batchRprocessWrapper.UserId);
            dynamicParameters.Add("@Details", batchRprocessWrapper.Details.AsTableValuedParameter("dbo.BatchReprocessConfig",
                new[] { "BpmId", "RollNo", "RStatus", "HostIP" }));
            //var data = new
            //{
            //    UserId = batchRprocessWrapper.UserId,
            //    Details = batchRprocessWrapper.Details.AsTableValuedParameter("dbo.tbl_BatchReprocessConfig",
            //                new[] { "BpmId", "RollNo", "RStatus", "HostIP" })
            //};
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveBatchReprocessData]", model: dynamicParameters, dbName: DyeingDB);
        }



    }
}