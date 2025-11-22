using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration
{
    public class CommentsOnFourPointReportModel : Base
    {
        public class SaveUpdateCommentData
        {
            public int BpmId { get; set; }
            public string BatchType { get; set; }
            public string BodyPart { get; set; }
            public string FabricLocation { get; set; }
            public string AOPUnit { get; set; }
            public string Remarks { get; set; }
            public string UserId { get; set; }
        }
        public Task<IEnumerable<Object>> GetBatchDatabyBuyer(int UnitId,string BatchType)
        {

            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BatchType", value: BatchType, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_BatchDatabyBatchType]", parameter, dbName: DyeingDB);
        }

        public Task<Tuple<IEnumerable<object>, IEnumerable<object>>> GetBatchDetailDatabyBpm(int BpmId,string BatchType)
        {
            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BatchType", value: BatchType, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.MultiQueryAsync<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_BatchDataForFourPointReport]", parameter, dbName: DyeingDB);
        }


        public Task<IEnumerable<Object>> CommentData_SaveUpdate(SaveUpdateCommentData saveUpdateCommentData)
        {
            
            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BpmId", value: saveUpdateCommentData.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BodyPart", value: saveUpdateCommentData.BodyPart, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@BatchType", value: saveUpdateCommentData.BatchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@FabricLocation", value: saveUpdateCommentData.FabricLocation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@AOPUnit", value: saveUpdateCommentData.AOPUnit, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@Remarks", value: saveUpdateCommentData.Remarks, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@User", value: saveUpdateCommentData.UserId, dbType: DbType.Int32, direction: ParameterDirection.Input);
           
            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_SaveUpdate_FourPointReportComment]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> CommentData_Delete(int Id, string UserId)
        {

            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Id", value: Id, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Delete_FourPointReportComment]", parameter, dbName: DyeingDB);
        }


    }
}