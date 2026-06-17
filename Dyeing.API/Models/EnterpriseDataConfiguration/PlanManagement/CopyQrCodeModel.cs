using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement
{
    public class CopyQrCodeModel : Base
    {
        public class CopyQr
        {
            public int BpmId { get; set; }
            public int SourceRollNo { get; set; }
            public float RollWeight { get; set; }
            public float CopyWeight { get; set; }
            public string Method { get; set; }
            public string UserId { get; set; }
            public string BatchNo { get; set; }
        }

        public IEnumerable<object> GetBatchDetailForCopyQr(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchDetailForCopyQrCode]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> GetBatchDetailByQrCode(int MasterId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MasterId", value: MasterId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BatchDetailByQrCode]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> SaveUpdateCopyQrCode(CopyQr copyQr)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: copyQr.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@SourceRollNo", value: copyQr.SourceRollNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollWeight", value: copyQr.RollWeight, dbType: DbType.Double, direction: ParameterDirection.Input);
            parameters.Add(name: "@CopyWeight", value: copyQr.CopyWeight, dbType: DbType.Double, direction: ParameterDirection.Input);
            parameters.Add(name: "@Method", value: copyQr.Method, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@User", value: copyQr.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
        
            //return DatabaseHub.Query<object>(
            //        storedProcedureName: @"[dbo].[usp_SaveUpdate_CopyQrCode]", parameters: parameters, dbName: DyeingDB);
            

                 return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_CopyQrCode_backup]", parameters: parameters, dbName: DyeingDB);
        }

        public async Task SaveStickerPath(string stickerPath, int rollNo, int bpmId, int qrCodeId,string userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@stickerPath", value: stickerPath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@rollNo", value: rollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@bpmId", value: bpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@qrCodeId", value: qrCodeId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@userId", value: userId, dbType: DbType.String, direction: ParameterDirection.Input);

            await DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_SaveUpdate_StickerPath]",
                parameters: parameters,
                dbName: DyeingDB);
        }

    }
}