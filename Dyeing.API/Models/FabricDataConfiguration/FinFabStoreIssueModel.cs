using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.FabricDataConfiguration
{
    public class FinFabStoreIssueModel:Base
    {
        public class FinFabStoreIssue
        {
            public int Id { get; set; }
            public int RollNo { get; set; }
            public string Remarks { get; set; }

        }
        public class FinFabStoreIssueWrapper
        {
            public List<FinFabStoreIssue> Details { get; set; }
            public int Id { get; set; }
            public int BpmId { get; set; }
            public int CompTime { get; set; }
            public string UserId { get; set; }

        }
        public class Response
        {
            public int Id { get; set; }
            public string TrackingNo { get; set; }
        }
        public object GetDataByBatch(int BpmId, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int64, direction: ParameterDirection.Input);
            
            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_get_PackingListByBatch]", parameters: parameters, dbName: DyeingDB);
        }
        public object GetDataByTracking(int Id)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Id", value: Id, dbType: DbType.Int64, direction: ParameterDirection.Input);
            
            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_get_PackingDataByTracking]", parameters: parameters, dbName: DyeingDB);
        }
        public Response PackingList_SaveUpdate(FinFabStoreIssueWrapper _obj)
        {
            var data = new
            {
                Id = _obj.Id,               
                BpmId = _obj.BpmId,               
                CompTime = _obj.CompTime,               
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                tvp_details = _obj.Details.AsTableValuedParameter("dbo.tvp_PackingRoll",
                            new[] { "Id", "RollNo", "Remarks" })
            };
            return DatabaseHub.Query<object, Response>(storedProcedureName: "[dbo].[usp_SaveUpdate_PackingList]", model: data, dbName: DyeingDB).FirstOrDefault();
        }

        public object GetDataByBatchNew(int BpmId, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int64, direction: ParameterDirection.Input);

            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_get_PackingListByBatchNew]", parameters: parameters, dbName: DyeingDB);
        }

        public Response PackingList_SaveUpdateNew(FinFabStoreIssueWrapper _obj)
        {
            var data = new
            {
                Id = _obj.Id,
                BpmId = _obj.BpmId,
                CompTime = _obj.CompTime,
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                tvp_details = _obj.Details.AsTableValuedParameter("dbo.tvp_PackingRoll",
                            new[] { "Id", "RollNo", "Remarks" })
            };
            return DatabaseHub.Query<object, Response>(storedProcedureName: "[dbo].[usp_SaveUpdate_PackingListNew]", model: data, dbName: DyeingDB).FirstOrDefault();

        }


        public object GetDataByTrackingNew(int Id)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Id", value: Id, dbType: DbType.Int64, direction: ParameterDirection.Input);

            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_get_PackingDataByTrackingNew]", parameters: parameters, dbName: DyeingDB);
        }


    }
}