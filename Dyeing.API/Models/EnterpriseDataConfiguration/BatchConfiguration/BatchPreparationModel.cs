using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Dyeing.API.Models.CommonModel;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchPreparationModel:Base
    {
        public class BatchPreparation
        {
            public int MppmId { get; set; }
            public string MDId { get; set; }
            public string MachineNo { get; set; }
            public string NoOfNozzle { get; set; }
            public string MCapacityId { get; set; }
            public string CapacityName { get; set; }
        }
        public class BatchPreparationMaster
        {
            public int BpmId { get; set; }
            public int MppmId { get; set; }
            public string BatchNo { get; set; }
            public double BatchWeight { get; set; }
            public string LoadingTime { get; set; }
            public string UnLoadingTime { get; set; }
            public string RecipeNo { get; set; }
            public string Turing { get; set; }
            public string Enzyme { get; set; }
            public string DpfcId { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
        }
        public class BatchPreparationDetails
        {
            public int BpdId { get; set; }
            public int BpmId { get; set; }            
            public int SlNo { get; set; }
            public int DressPartId { get; set; }
            public int FabricNameId { get; set; }
            public string FinDia { get; set; }
            public string McDia { get; set; }
            public string Identification { get; set; }
            public int NoOfRoll { get; set; }
            public double FabricWeight { get; set; }
            public List<BatchPreparationChild> Nozzle { get; set; }

        }
        public class BatchPreparationChild
        {
            public int BpcId { get; set; }
            public int BpdId { get; set; }
            public int BpmId { get; set; }         
            public int SlNo { get; set; }
            public int NozzleNo { get; set; }
            public double Qty { get; set; }
            public string TrolleyId { get; set; }            
        }
        public class BarcodeData
        {
            public int BpdId { get; set; }
            public int BpcId { get; set; }
            public int SlNo { get; set; }
            public int NozzleNo { get; set; }            
            public string Barcode { get; set; }
            public double Qty { get; set; }
        }
        public class BatchResponse
        {
            public int BpmId { get; set; }
            public int MppmId { get; set; }
            public string BatchNo { get; set; }
            public string Tag { get; set; }
        }
        public class PlanModel
        {           
            public int MppmId { get; set; }
            public string PlanNo { get; set; }            
        }
        public class DiaModel
        {
            public List<PlanModel> Plan { get; set; }
            public int FabNameId { get; set; }
            public int DressPartId { get; set; }             
        }
        public class BatchPreparationWrapper
        {
            public BatchPreparationMaster master { get; set; }
            public List<BatchPreparationDetails> details { get; set; }
            public List<BatchPreparationChild> child { get; set; }
            public List<BarcodeData> barcode { get; set; }
            public List<PlanModel> plan { get; set; }
        }
        public class BatchData
        {
            public int BatchProcessingId { get; set; }
            public int UnitId { get; set; }
            public string McNo { get; set; }
            public string BatchNo { get; set; }
            public string Buyer { get; set; }
            public string Job { get; set; }
            public string Style { get; set; }
            public string Color { get; set; }
            public string LDNo { get; set; }
            public string RN { get; set; }
            public string FabType { get; set; }
            public string SystemFab { get; set; }
            public string YarnSource { get; set; }
            public string YarnLot { get; set; }
            public string LoadingDate { get; set; }
            public string LoadingTime { get; set; }
            public string UnloadingTime { get; set; }            
            public string YarnType { get; set; }            
            public string BatchDate { get; set; }            
            public int McId { get; set; }            
            public string DeliveryDate { get; set; }
            public string MatchingWith { get; set; }
            public string Enzyme { get; set; }
            public string Turing { get; set; }
            public string Process { get; set; }
            public string Body { get; set; }
            public string Rib { get; set; }
            public string BNT { get; set; }
            public decimal FabQty { get; set; }
            public string NoOfBatch { get; set; }
            public string StitchLen { get; set; }
            public string Shade { get; set; }
            public string Quality { get; set; }
            public string NoteDyeing { get; set; }
            public string NoteFinishing { get; set; }
            public bool Heatset { get; set; }
            public bool Dyeing { get; set; }
            public bool Squeezer { get; set; }
            public bool Dryer { get; set; }
            public bool Compactor { get; set; }
            public bool Singeing { get; set; }
            public bool Slitting { get; set; }
            public bool Stenter { get; set; }
            public string Remarks { get; set; }
            public int SlNo { get; set; }
            public int ReviseNo { get; set; }
            public bool IsPPSample { get; set; }
            public bool IsCSample { get; set; }
            public bool EditOnly { get; set; }
        }
        public class NozzleTrolley
        {
            public int Id { get; set; }
            public int Nozzle { get; set; }
            public int TrolleyId { get; set; }
        }
        public class BatchFabData
        {
            public int id { get; set; }
            public int itemFabId { get; set; }           
            public string userId { get; set; }           
        }
        public class BatchSpec
        {
            public int Id { get; set; }
            public string BodyPart { get; set; }
            public string PlanQty { get; set; }
            public string ActualQty { get; set; }
            public string McDia { get; set; }
            public string Rolls { get; set; }
            public string Identification { get; set; }
            public string FDia { get; set; }
            public string GDia { get; set; }
            public string FGSM { get; set; }
            public string GGSM { get; set; }           
        }

        public class BodyWiseFabric
        { 
        public int FabricId { get; set; }
        public string FabricFor { get; set; }
        public string FabricType { get; set; }
        }

        public class BatchCardWrapper
        {
            public string UserId { get; set; }
            public BatchData batch { get; set; }
            public List<BatchSpec> batchSpec { get; set; }
            public List<NozzleTrolley> nozzleTr { get; set; }
            
        }
        public class BatchDataWrapper
        {
            public string UserId { get; set; }
            public List<BatchData> batch { get; set; }
            public bool IsBulk { get; set; }
        }
        public class BatchDataResponse
        {
            public string UserId { get; set; }
            public List<BatchData> batch { get; set; }
        }

        public class SampleBatchData {

            public int SlNo { get; set; }
            public int BatchProcessingId { get; set; }

            public int UnitId { get; set; }
            public string ReviseNo { get; set; }
            public int McId { get;  set; }
            public bool IsPPSample { get; set; }
            public bool IsCSample { get; set; }
            public bool EditOnly { get; set; }

            public string McNo { get; set; }
            public string Buyer { get; set; }
            public string Job { get; set; }
            public string Style { get; set; }
            public string Color { get; set; }
            public string BatchNo { get; set; }
            public string LDNo { get; set; }
            public string RNNo { get; set; }
            public string FabType { get; set; }
            public string YarnSource { get; set; }
            public string YarnLot { get; set; }
            public string ShipDate { get; set; }
            public string DeliveryDate { get; set; }
            public string MatchingWith { get; set; }
            public string Enzyme { get; set; }
            public string Process { get; set; }
            public int Body { get; set; }
            public int Rib { get; set; }
            public int BNT { get; set; }
            public decimal? FabQty { get; set; }
            public string NoOfBatch { get; set; }
            public string NextBatch { get; set; }
            public string SedoProg { get; set; }
            public string Remarks { get; set; }
            public string SampleStage { get; set; }
            public string TCX { get; set; }
            public string FabricFor { get; set; }
          
            public string RGSM { get; set; }
             public string RequiredGsm { get; set; }
            public string RequiredDia { get; set; }
            public string ColourTypes { get; set; }
            public string Treatment { get; set; }
            public string TestRequirement { get; set; }
            public string PreTreatment { get; set; }
            public string LabRemarks { get; set; }
            public string YCountAndSpendex { get; set; }
            public string SL { get; set; }
            public string MCDiaGaug { get; set; }
            public string BookingQty { get; set; }
            public string BatchPreparationDate { get; set; }

            // created on 10-august-2024

            public string StitchLength { get; set; }
            public string LoadingTime { get; set; }
            public string  UnloadingTime { get; set; }

            public bool IsTestSample { get; set; }
            public bool IsDVSample { get; set; }
            public bool IsSMSSample { get; set; }

          
        }

        public class SampleBatchDataWrapper {
            public string UserId { get; set; }
            public List<SampleBatchData> batch { get; set; }
            public bool IsBulk { get; set; }

        }

        public class SampleBatchCardWrapper { 
        public string UserId { get; set; }
        public SampleBatchData sampleBatch { get; set; }
        public List<BatchSpec> batchSpec { get; set; }
        public List<BodyWiseFabric> bodyWiseFabrics { get; set; }

        }

        public Task<IEnumerable<object>> GetPlanList()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PlanList]", dbName: DyeingDB);
        }
        public object GetDataByBatch(int BpmId)
        {           
            var data = new
            {
                BpmId=BpmId
            };

            var result = DatabaseHub.MultiQuery<object, object, object, object, object, object>(
                   storedProcedureName: @"[dbo].[usp_get_DataByBatch]", model: data, dbName: DyeingDB);

            return result;            
        }
        public object GetBatchDataById(int Id, int ReviseNo)
        {
            var data = new
            {
                Id=Id,
                ReviseNo= ReviseNo
            };
            return DatabaseHub.MultiQuery<object, object, object, object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchDataById]", model: data, dbName: DyeingDB);
        }
        public object GetMachineDataByPlan(List<PlanModel> _obj)
        {
            //var parameters = new DynamicParameters();
            //parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var data = new
            {
                tvp_Plan = _obj.AsTableValuedParameter("dbo.tvp_Plan",
                            new[] { "MppmId", "PlanNo" }),
            };

            var result = DatabaseHub.MultiQuery<object, object, object, object, object>(
                   storedProcedureName: @"[dbo].[usp_get_machineDataByPlan]", model: data, dbName: DyeingDB);

            return result;
            //return DatabaseHub.Query<object>(
            //        storedProcedureName: @"[dbo].[usp_get_machineDataByPlan]", parameters: parameters, dbName: DyeingDB).FirstOrDefault();
        }
        public object GetFabricNameByPlan(List<PlanModel> _obj)
        {
            var data = new
            {
                tvp_Plan = _obj.AsTableValuedParameter("dbo.tvp_Plan",
                            new[] { "MppmId", "PlanNo" }),
            };
            var result = DatabaseHub.Query<object, object>(
                   storedProcedureName: @"[dbo].[usp_get_FabricByPlan]", model: data, dbName: DyeingDB);

            return result;
        }
        public object GetDiaInfoByFabric(DiaModel model)
        {
            var data = new
            {
                FabNameId=model.FabNameId,
                DressPartId=model.DressPartId,
                tvp_Plan = model.Plan.AsTableValuedParameter("dbo.tvp_Plan",
                             new[] { "MppmId", "PlanNo" }),
            };
            return DatabaseHub.Query<object, object>(
                    storedProcedureName: @"[dbo].[usp_get_DiaInfoByFabricPlan]", model: data, dbName: DyeingDB).FirstOrDefault();
        }

        public object GetSampleBatchDataById(int id, int ReviseNo)
        {
            var data = new
            {
                Id = id,
                ReviseNo = ReviseNo
            };
            return DatabaseHub.MultiQuery<object, object, object>(
                storedProcedureName: @"[dbo].[usp_get_SampleBatchDataById]",model:data,dbName:DyeingDB);
        }

        public BatchResponse BatchDataForSample_SaveUpdate(SampleBatchCardWrapper _obj)
        {
            var data = new
            {
                UserID = _obj.UserId,
                HostIP = getclientIP(),

                BatchProcessingId = _obj.sampleBatch.BatchProcessingId,
                ReviseNo = _obj.sampleBatch.ReviseNo,
                BatchNo = _obj.sampleBatch.BatchNo,

                BatchDate = _obj.sampleBatch.BatchPreparationDate,

                McId = _obj.sampleBatch.McId,
                EditOnly = _obj.sampleBatch.EditOnly,
                ShipDate = _obj.sampleBatch.ShipDate,
                NextBatch = _obj.sampleBatch.NextBatch,
                SedoProg = _obj.sampleBatch.SedoProg,
                SampleStage = _obj.sampleBatch.SampleStage,
                TCX = _obj.sampleBatch.TCX,
                FabricFor = _obj.sampleBatch.FabricFor,
                // RGSM = _obj.sampleBatch.RGSM,
                RequiredGsm = _obj.sampleBatch.RequiredGsm,
                RequiredDia = _obj.sampleBatch.RequiredDia,
                ColourTypes = _obj.sampleBatch.ColourTypes,
                Treatment = _obj.sampleBatch.Treatment,
                TestRequirement = _obj.sampleBatch.TestRequirement,
                PreTreatment = _obj.sampleBatch.PreTreatment,
                LabRemarks = _obj.sampleBatch.LabRemarks,
                YCountAndSpendex = _obj.sampleBatch.YCountAndSpendex,
                SL = _obj.sampleBatch.SL,
                MCDiaGaug = _obj.sampleBatch.MCDiaGaug,
                BookingQty = _obj.sampleBatch.BookingQty,
                IsPPSample = _obj.sampleBatch.IsPPSample,
                IsCSample = _obj.sampleBatch.IsCSample,

                Enzyme = _obj.sampleBatch.Enzyme,
                StitchLength = _obj.sampleBatch.StitchLength,

                LoadingTime = _obj.sampleBatch.LoadingTime,
                UnloadingTime = _obj.sampleBatch.UnloadingTime,
                IsTestSample = _obj.sampleBatch.IsTestSample,
                IsDVSample = _obj.sampleBatch.IsDVSample,
                IsSMSSample = _obj.sampleBatch.IsSMSSample,

                YarnSource = _obj.sampleBatch.YarnSource,
                YarnLot = _obj.sampleBatch.YarnLot,

                LDNo=_obj.sampleBatch.LDNo,
                DeliveryDate=_obj.sampleBatch.DeliveryDate,
                Remarks=_obj.sampleBatch.Remarks,
                Color=_obj.sampleBatch.Color,
                Style=_obj.sampleBatch.Style,


                BatchSpec = _obj.batchSpec.AsTableValuedParameter("dbo.tvp_BatchSpecification",
                            new[] { "Id", "BodyPart", "PlanQty", "ActualQty", "McDia", "Rolls", "Identification", "FDia", "GDia", "FGSM", "GGSM" }),

                SampleFabricType=_obj.bodyWiseFabrics.AsTableValuedParameter("tvp_SampleFabricType",
                            new[] { "FabricId", "FabricFor", "FabricType" })

            };

            //return DatabaseHub.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchCardSample]", model: data, dbName: DyeingDB).FirstOrDefault();

            return DatabaseHub.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchCardSample_Updated]", model: data, dbName: DyeingDB).FirstOrDefault();

        }

      

        public BatchResponse DyeingBatchPreparation_SaveUpdate(BatchPreparationWrapper _obj)
        {            
            var data = new
            {
                BpmId = _obj.master.BpmId,                
                BatchNo = _obj.master.BatchNo,
                BatchWeight = _obj.master.BatchWeight,
                LoadingTime = _obj.master.LoadingTime,
                UnloadingTime = _obj.master.UnLoadingTime,
                RecipeNo = _obj.master.RecipeNo,
                Turing = _obj.master.Turing,
                Enzyme = _obj.master.Enzyme,
                DpfcId = _obj.master.DpfcId,
                HostIP = getclientIP(),
                UserId = _obj.master.UserId,
                tvp_Plan = _obj.plan.AsTableValuedParameter("dbo.tvp_Plan",
                             new[] { "MppmId", "PlanNo" }),
                tvp_Details = _obj.details.AsTableValuedParameter("dbo.BatchPreparationDetails",
                            new[] { "BpdId", "BpmId", "SlNo","DressPartId", "FabricNameId","FinDia", "McDia", "Identification", "NoOfRoll", "FabricWeight" }),
                tvp_Child = _obj.child.AsTableValuedParameter("dbo.BatchPreparationChild",
                            new[] { "BpcId", "BpdId", "BpmId",  "SlNo", "NozzleNo", "Qty", "TrolleyId" }),
                tvp_Barcode = _obj.barcode.AsTableValuedParameter("dbo.BatchBarcodeHistory",
                            new[] { "BpdId", "BpcId","SlNo", "NozzleNo", "Barcode", "Qty" })
            };
            return DatabaseHub.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPreparation]", model: data, dbName: DyeingDB).FirstOrDefault();
            //return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPreparation]", model: data, dbName: DyeingDB);
        }
        public object BatchDataProcessing_SaveUpdate(BatchDataWrapper _obj)
        {
            
            var data = new
            {              
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                tvp_Batch = _obj.batch.AsTableValuedParameter("dbo.tvp_BatchDataProcessing",
                            new[] { "UnitId","McNo","Buyer", "Job", "Style", "Color",
                                "LDNo", "RN", "FabType", "YarnSource", "YarnLot",
                                "DeliveryDate", "MatchingWith", "Enzyme","Process",
                                "Body","Rib","BNT", "FabQty","NoOfBatch", "Remarks",
                                "SlNo" })
            };
            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchDataProcessing]", model: data, dbName: DyeingDB).ToList();
            //return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPreparation]", model: data, dbName: DyeingDB);
        }

        public object BatchDataProcessingSample_SaveUpdate(SampleBatchDataWrapper batchDataWrapper)
        {
            var para = new DynamicParameters();

            // Ensure that nullable types are converted to non-nullable types or handled appropriately
            var batchData = batchDataWrapper.batch.Select(obj => new
            {
                obj.SlNo,
                obj.UnitId,
                obj.McNo,
                obj.Buyer,
                obj.Job,
                obj.Style,
                obj.Color,
                obj.BatchNo,
                obj.LDNo,
                obj.RNNo,
                obj.FabType,
                obj.YarnSource,
                obj.YarnLot,
                obj.ShipDate,
                obj.DeliveryDate,
                obj.MatchingWith,
                obj.Enzyme,
                obj.Process,
                obj.Body,
                obj.Rib,
                obj.BNT,
                FabQty = obj.FabQty ?? 0, // Convert nullable to non-nullable
                obj.NoOfBatch,
                obj.NextBatch,
                obj.SedoProg,
                obj.Remarks,
                obj.SampleStage,
                obj.TCX,
                obj.FabricFor,
                RGSM = obj.RGSM, // Assuming RGSM is not nullable
               // obj.RequiredGsm,
                obj.RequiredDia,
                obj.ColourTypes,
                obj.Treatment,
                obj.TestRequirement,
                obj.PreTreatment,
                obj.LabRemarks,
                YCountAndSpendex = obj.YCountAndSpendex, // Assuming YCountAndSpendex is not nullable
                obj.SL,
                MCDiaGaug = obj.MCDiaGaug, // Assuming MCDiaGaug is not nullable
                obj.BookingQty,
                obj.BatchPreparationDate
            }).ToList();


           var data = new
            {
                HostIP = getclientIP(),
                UserId = batchDataWrapper.UserId,
                tvp_Batch = batchData.AsTableValuedParameter("dbo.tvp_BatchDataProcessingSample",
                    new[] { "SlNo", "UnitId", "McNo", "Buyer", "Job", "Style",
                        "Color", "BatchNo", "LDNo", "RNNo", "FabType",
                        "YarnSource",
                    "YarnLot", "ShipDate", "DeliveryDate", "MatchingWith", 
                        "Enzyme", "Process", "Body", "Rib", "BNT", "FabQty",
                    "NoOfBatch", "NextBatch", "SedoProg", "Remarks",
                        "SampleStage", "TCX", "FabricFor", "RGSM", "RequiredDia",
                    "ColourTypes", "Treatment", "TestRequirement", "PreTreatment",
                        "LabRemarks", "YCountAndSpendex", "SL", "MCDiaGaug",
                    "BookingQty", "BatchPreparationDate" })
            };

            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchDataProcessing_Sample]", model: data, dbName: DyeingDB).ToList();

        }
        
        public object BatchFabData_Update(BatchFabData _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                UserId = _obj.userId,
                Id=_obj.id,
                ItemFabId=_obj.itemFabId
            };
            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_BatchFabData_Update]", model: data, dbName: DyeingDB).ToList();            
        }
        public BatchResponse BatchData_SaveUpdate(BatchCardWrapper _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                BatchProcessingId=_obj.batch.BatchProcessingId,
                ReviseNo=_obj.batch.ReviseNo,
                //UnitId=_obj.batch.UnitId,
                BatchNo=_obj.batch.BatchNo,
                LoadingDate=_obj.batch.LoadingDate,
                LoadingTime =_obj.batch.LoadingTime,
                UnloadingTime =_obj.batch.UnloadingTime,
                YarnType = _obj.batch.YarnType,
                BatchDate = _obj.batch.BatchDate,
                McId =_obj.batch.McId,
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
                IsCSample = _obj.batch.IsCSample,
                EditOnly = _obj.batch.EditOnly,

                BatchSpec = _obj.batchSpec.AsTableValuedParameter("dbo.tvp_BatchSpecification",
                            new[] { "Id","BodyPart", "PlanQty", "ActualQty", "McDia", "Rolls", "Identification", "FDia", "GDia", "FGSM", "GGSM" }),
              
                NozzleTrolley = _obj.nozzleTr.AsTableValuedParameter("dbo.tvp_BatchNozzleTrolley",
                            new[] { "Id","Nozzle", "TrolleyId" })
            };
            return DatabaseHub.Query<object, BatchResponse>(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchCardNew]", model: data, dbName: DyeingDB).FirstOrDefault();
            //return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveUpdate_BatchPreparation]", model: data, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetReprocessBatchData(int UnitId,DateTime FromDate, DateTime ToDate)
        {
            var parameter =new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_BatchReprocessData]",parameters:parameter,dbName:DyeingDB) ;
        }

        public object GetStylesByBuyerAndJob(int buyerId, int jobId)
        {
            var data = new
            {
                BuyerId = buyerId,
                JobId = jobId
             
            };
            return DatabaseHub.Query<object, object>(storedProcedureName: "[dbo].[usp_Get_BuyerJobWiseStyle]", model: data, dbName: DyeingDB).ToList();
        }

    }
}