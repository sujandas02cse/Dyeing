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
    public class BatchToBatchRollTransferModel : Base
    {

        public class BatchRollTransferObj
        {

            public int Id { get; set; }
            public int SourceInspectionMasterId { get; set; }
            public int SourceBpmId { get; set; }
            public int SourceRollNo { get; set; }
            public int SourceBodyPartId { get; set; }
            public string SourceBodyPartName { get; set; }
            public int SourceFabricTypeId { get; set; }
            public string SourceFabricType { get; set; }
            public string SourceComposition { get; set; }
            public int SourceItemId { get; set; }
            public int SourceOperationTime { get; set; }
            public int DestinationBpmId { get; set; }
            public string UserId { get; set; }
           public int SourcePackingListDetailsId { get; set; }
            public int SourceBatchGsmConfigId { get; set; }
        }


        public class BatchRollTransferObjList {

            public List<BatchRollTransferObj> BatchRollTransferObjeList { get; set; }
        }


        public Task<long> Transfer(List<BatchToBatchRollTransferModel.BatchRollTransferObj> BatchRollTransferObjList)
        {
            var data = new
            {
                RollList = BatchRollTransferObjList.AsTableValuedParameter("dbo.tvp_BatchRollTransferType",
                                      new[] {"Id","SourceInspectionMasterId", "SourceBpmId", "SourceRollNo", 
                                             "SourceBodyPartId" , "SourceBodyPartName","SourceFabricTypeId",
                                             "SourceFabricType","SourceComposition","SourceItemId","SourceOperationTime",
                                          "DestinationBpmId","UserId","SourcePackingListDetailsId","SourceBatchGsmConfigId"}),
            };

            return DatabaseHub.ExecuteAsync(
                   storedProcedureName: @"[dbo].[usp_BatchToBatchRollTransfer]", model: data, dbName: DyeingDB);
        }


      
        //   public Task<IEnumerable<object>> DestinationMaxCompactingTime(string DestinationBpmId)
        //{
        //    var parameter = new DynamicParameters();
        //    parameter.Add(name: "@BpmId", value: DestinationBpmId, dbType: DbType.String, direction: ParameterDirection.Input);
        //    return DatabaseHubRpt.QueryAsync<object>(
        //     storedProcedureName: @"[dbo].[usp_get_MaxOperationTime]", parameters: parameter, dbName: DyeingDB);
        //}

     
        public async Task<int> DestinationMaxCompactingTime(int DestinationBpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BpmId", DestinationBpmId, DbType.Int32, ParameterDirection.Input);

            // Query single value
            var result = await DatabaseHubRpt.QueryAsync<int>(
                storedProcedureName: @"[dbo].[usp_get_MaxOperationTime]",
                parameters: parameter,
                dbName: DyeingDB
            );

            return result.FirstOrDefault(); // will be 0 if nothing found because SP already ISNULL(...,0)
        }
    }
}