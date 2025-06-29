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
    public class BatchPrepare:Base
    {
        public class BatchData
        {
            public int InitInfoId { get; set; }
            public int GroupNo { get; set; }
            public int SeqNo { get; set; }
            public string UniqueGuid { get; set; }
            public int BpmId { get; set; }
            public int MDId { get; set; }
            public int BodyPartId { get; set; }              
            public string McDiaGauge { get; set; }              
            public string StitchLen { get; set; }              
            public float StockQty { get; set; }
            public float ReqQty { get; set; }
        }
        public class BatchPrepareWrapper
        {
            public int UnitId { get; set; }
            public int SourceUnitId { get; set; }
            public bool PPSample { get; set; }
            public bool China { get; set; }
            public bool PPSampleOrChina { get; set; }
            public int Revised { get; set; }
            public string UserId { get; set; }
            public int ReviseNo { get; set; }
            public List<BatchData> batch { get; set; }
        }

        public class BatchSpecNew
        {
            public int BpmId { get; set; }
            public int BodyPartId { get; set; }
            public float PlanQty { get; set; }
            public float ActualQty { get; set; }
            public string McDiaGauge { get; set; }
            public string Rolls { get; set; }
            public string Identification { get; set; }
            public string FDia { get; set; }
            public string GDia { get; set; }
            public string FGsm { get; set; }
            public string GGsm { get; set; }
            public string Remarks { get; set; }
        }

        public class BatchCardDataNew
        {
            public int BpmId { get; set; }
            public int BodyPartId { get; set; }
            public string FabricType { get; set; }
            public string Composition { get; set; }
            public string YarnType { get; set; }
            public string YarnBrand { get; set; }
            public string YarnLot { get; set; }
            public string StitchLength { get; set; }
        }

        public class BatchCardNew
        {
            public int BpmId { get; set; }
            public string HostIp { get; set; }
            public DateTime? LoadingDate { get; set; }
            public DateTime? LoadingTime { get; set; }
            public DateTime? UnloadingTime { get; set; }
            public string ShadeName { get; set; }
            public int? LabdipNo { get; set; }
            public string Turing { get; set; }
            public string Enzyme { get; set; }
            public string IssueMethod { get; set; }
            public string Barcode { get; set; }
            public string Roll { get; set; }
            public string Shade { get; set; }
            public string Quality { get; set; }
            public string NoteDyeing { get; set; }
            public string NoteFinishing { get; set; }
            public string Process { get; set; }
            public string EditOnly { get; set; }
            public int? ReviseNo { get; set; }
            public int? Reprocess { get; set; }
            public byte? PPSample { get; set; }
            public byte? China { get; set; }
            public byte? PPSampleWithChina { get; set; }
            public int? UnitId { get; set; }
            public int? SourceUnitId { get; set; }
            public string UserId { get; set; }
            public string Remarks { get; set; }
            public int McNo { get; set; }
            public List<BatchSpecNew> NewBatchSpec { get; set; }
            public List<BatchCardDataNew> NewBatchCardData { get; set; }
        }

        public class BatchResponseNew
        {
            public string BatchNo { get; set; }
            public string Tag { get; set; }
        }

        public async Task<IEnumerable<object>> GetBatchPrepareData(int UnitId, string FromDate, string ToDate)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);

            return await DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_BatchPrepareData]", parameters: parameter, dbName: DyeingDB);
        }
        public object GetBatchDataById(int Id,int reviceno)
        {
            var data = new
            {
                BpmId = Id,
                ReviceNo = reviceno
                //ReviseNo = ReviseNo
            };
            return DatabaseHub.MultiQuery<object, object, object,object, object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardDataById1]", model: data, dbName: DyeingDB);
        }
        public object BatchPrepare_SaveUpdate(BatchPrepareWrapper _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                UnitId = _obj.UnitId,
                SourceUnitId=_obj.SourceUnitId,
                PPSample= _obj.PPSample,
                China = _obj.China,
                PPC = _obj.PPSampleOrChina,
                ReviseNo = _obj.ReviseNo,
                Revised = _obj.Revised,
                UserId = _obj.UserId,
                tvp_StockCheck = _obj.batch.AsTableValuedParameter("dbo.tvp_StockCheck",
                            new[] { "InitInfoId", "GroupNo", "SeqNo", "UniqueGuid", "BpmId", "MDId", "BodyPartId", "McDiaGauge", "StitchLen", "StockQty", "ReqQty" })
            };
            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPrepareStock]", model: data, dbName: DyeingDB).ToList();
        }

        public BatchResponseNew BatchPrepare_SaveUpdateNew(BatchCardNew _obj)
        {
            var data = new
            {
                BpmId = _obj.BpmId,
                HostIp = getclientIP(),
                LoadingDate = _obj.LoadingDate,
                LoadingTime = _obj.LoadingTime,
                UnloadingTime = _obj.UnloadingTime,
                ShadeName = _obj.ShadeName,
                LabdipNo = _obj.LabdipNo,
                Turing = _obj.Turing,
                Enzyme = _obj.Enzyme,
                IssueMethod = _obj.IssueMethod,
                Barcode = _obj.Barcode,
                Roll = _obj.Roll,
                Shade = _obj.Shade,
                Quality = _obj.Quality,
                NoteDyeing = _obj.NoteDyeing,
                NoteFinishing = _obj.NoteFinishing,
                EditOnly = _obj.EditOnly,
                Process = _obj.Process,
                ReviseNo = _obj.ReviseNo,
                //Reprocess = null,
                PPSample = _obj.PPSample,
                China = _obj.China,
                PPsamplewithChina = _obj.PPSampleWithChina,
                SourceUnitId = _obj.SourceUnitId,
                UserId = _obj.UserId,
                Remarks = _obj.Remarks,
                McNo = _obj.McNo,
                NewBatchSpec = _obj.NewBatchSpec.AsTableValuedParameter("dbo.tvp_BatchSpecNew1",
                            new[] { "BpmId", "BodyPartId", "PlanQty", "ActualQty", "McDiaGauge", "Rolls", "Identification", "FDia", "GDia", "FGsm", "GGsm","Remarks" }),
                NewBatchCardData = _obj.NewBatchCardData.AsTableValuedParameter("dbo.tvp_NewBatchCardData",
                             new[] { "BpmId", "BodyPartId", "FabricType", "Composition", "YarnType", "YarnBrand", "YarnLot", "StitchLength"})
            };
            
            return DatabaseHub.Query<object, BatchResponseNew>(storedProcedureName: "[dbo].[Usp_SaveUpdate_BatchPrepareNew1]", model: data, dbName: DyeingDB).FirstOrDefault();
        }
        //public object BatchPrepare_SaveUpdate(BatchPrepareWrapper _obj)
        //{
        //    var data = new
        //    {
        //        HostIP = getclientIP(),
        //        UnitId = _obj.UnitId,
        //        UserId = _obj.UserId,
        //        tvp_Machine = _obj.batch.AsTableValuedParameter("dbo.tvp_MachinePlan",
        //                    new[] { "InitInfoId", "GroupNo", "SeqNo", "UniqueGuid", "BpmId", "MDId", "BodyPartId", "PlanFromDate", "PlanToDate", "PlanQty", "Enzyme", "SpecialFinish", "Process" })
        //    };
        //    return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_MachinePlan]", model: data, dbName: DyeingDB).ToList();
        //}
    }
}