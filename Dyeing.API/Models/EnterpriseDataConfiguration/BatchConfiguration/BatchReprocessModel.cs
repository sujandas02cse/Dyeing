using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchPreparationModel;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchReprocessModel : Base
    {
        public class BatchReprocessData: BatchData
        {
            public int BpmId { get; set; }
            public int ReprocessNo { get; set; }
        }
        public class BatchReprocessWrapper
        {
            public string UserId { get; set; }
            public BatchReprocessData batch { get; set; }
            public List<BatchSpec> batchSpec { get; set; }
            public List<NozzleTrolley> nozzleTr { get; set; }

        }
        public object GetBatchReprocessDataById(int BpmId, int ReprocessNo)
        {
            var data = new
            {
                BpmId = BpmId,
                ReprocessNo = ReprocessNo
            };
            return DatabaseHub.MultiQuery<object, object, object, object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchReprocessDataById]", model: data, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetReprocessBatchData(int UnitId, DateTime FromDate, DateTime ToDate)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_BatchReprocessData]", parameters: parameter, dbName: DyeingDB);
        }

        public BatchResponse BatchReprocessData_SaveUpdate(BatchReprocessWrapper _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                BatchProcessingId = _obj.batch.BatchProcessingId,
                ReviseNo = _obj.batch.ReviseNo,
                ReprocessNo = _obj.batch.ReprocessNo,                
                BpmId = _obj.batch.BpmId,
                BatchNo = _obj.batch.BatchNo,
                LoadingDate = _obj.batch.LoadingDate,
                LoadingTime = _obj.batch.LoadingTime,
                UnloadingTime = _obj.batch.UnloadingTime,
                YarnType = _obj.batch.YarnType,
                BatchDate = _obj.batch.BatchDate,
                McId = _obj.batch.McId,
                Turing = _obj.batch.Turing,
                StitchLen = _obj.batch.StitchLen,
                Heatset = _obj.batch.Heatset,
                Dyeing = _obj.batch.Dyeing,
                Squeezer = _obj.batch.Squeezer,
                Dryer = _obj.batch.Dryer,
                Compactor = _obj.batch.Compactor,
                Singeing = _obj.batch.Singeing,
                Slitting = _obj.batch.Slitting,
                Stenter = _obj.batch.Stenter,
                Shade = _obj.batch.Shade,
                Quality = _obj.batch.Quality,
                NoteDyeing = _obj.batch.NoteDyeing,
                NoteFinishing = _obj.batch.NoteFinishing,
                IsPPSample = _obj.batch.IsPPSample,
                EditOnly = _obj.batch.EditOnly,

                BatchSpec = _obj.batchSpec.AsTableValuedParameter("dbo.tvp_BatchSpecification",
                            new[] { "Id", "BodyPart", "PlanQty", "ActualQty", "McDia", "Rolls", "Identification", "FDia", "GDia", "FGSM", "GGSM" }),
                NozzleTrolley = _obj.nozzleTr.AsTableValuedParameter("dbo.tvp_BatchNozzleTrolley",
                            new[] { "Id", "Nozzle", "TrolleyId" })
            };
            return DatabaseHub.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchCardReprocess]", model: data, dbName: DyeingDB).FirstOrDefault();
        }

    }
}