using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Dyeing.API.Models.CommonModel;

namespace Dyeing.API.Models.FabricDataConfiguration
{
    public class FinishFabricInspectionOnlineSampleModel:Base
    {
        public class WrapperSample
        {
            public IEnumerable<InspectionMaster> master { get; set; }
            public IEnumerable<Machine> Machines { get; set; }
            public IEnumerable<InspectionGrade> grade { get; set; }
            public IEnumerable<FaultEntityDetail> fault { get; set; }

            public IEnumerable<InspectionFault> faultList { get; set; }
            public List<BatchSpec> batchSpecs { get; set; }

            public List<BatchSpecSample> batchSpecSample { get; set; }

            public IEnumerable<DyeingGivenBy> dyeingGivenBy { get; set; }
            public IEnumerable<ProcessBy> processBy { get; set; }

        }

        public class FaultViewClass
        {
            public FaultViewClass()
            {
                Faults = new List<InspectionFault>();
            }
            public string FaultName { get; set; }
            public int FaultIndex { get; set; }
            public List<InspectionFault> Faults { get; set; }

        }

        public class Machine
        {
            public string MachineName { get; set; }
            public int MachineID { get; set; }
        }
        public class InspectionFault
        {

            public int Point { get; set; }
            public int PointIndex { get; set; }
            public string FaultName { get; set; }
            public string FromTo { get; set; }
            public string PointID { get; set; }
            public string FaultID { get; set; }
            public int sl { get; set; }
            public string TotalPoint { get; set; }

        }
        public class FaultEntityDetail
        {
            public int DyedInspectionDetailID { get; set; }
            public int NameID { get; set; }
            public string FaultID { get; set; }
            public string PHeadNo { get; set; }
            public string FaultName { get; set; }
            public string PointID { get; set; }
            public string PointData { get; set; }
            public string PointStr { get; set; }
            public string TotalPoint { get; set; }
            public string Flag { get; set; }
            public string PointCalculation { get; set; }
            public int sl { get; set; }
            public IEnumerable<FaultPoint> lPoints { get; set; }            
        }
        public class BatchSpec
        {
            public int id { get; set; }
            public string name { get; set; }
        }
        public class BatchSpecSample
        {
            public int Id { get; set; }
            public Double Weight { get; set; }
            public string BodyPart { get; set; }
            public double ActualDia { get; set; }
            public double ActualGSM { get; set; }
            public double ActualWeight { get; set; }
        }

        public class InspectionMaster
        {
            public int Barcode { get; set; }
            public int DyedInspectionEntryID { get; set; }
            public int MachineID { get; set; }
            public int FBarcodeGenerationID { get; set; }
            public int BuyerId { get; set; }
            public string BuyerName { get; set; }
            public int OrderId { get; set; }
            public string OrderNo { get; set; }
            public string JobInfo { get; set; }
            public string MachineNo { get; set; }
            public decimal Length { get; set; }
            public decimal Width { get; set; }
            public string Grade { get; set; }
            public decimal FinishWeight { get; set; }
            public decimal BatchWeight { get; set; }
            public decimal RejectWeight { get; set; }
            public string Remarks { get; set; }
            public int GradeNo { get; set; }
            public int TotalPoint { get; set; }
            public int Ptsperhundred { get; set; }
            public string RollNo { get; set; }

            public string ReqDia { get; set; }
            public string ReqGSM { get; set; }
            public string FabColor { get; set; }
            public string ItemDescription { get; set; }
            public int CommercialApproved { get; set; }
            
            public string GSM { get; set; }
            public int QcMcNo { get; set; }
            public string InspMNo { get; set; }           
            public string UnitEName { get; set; }           
             
            public string FabType { get; set; }           
            public int CompTime { get; set; }           
            public string BodyPart { get; set; }
            public int TotalRoll { get; set; }           
            public int LabSticker { get; set; }           
            public int BSpecId { get; set; }           
            public decimal TRollWeight { get; set; }
            public string TestRequirement { get; set; }
            public int MaxCompTime { get; set; }
        }

        public Task<IEnumerable<object>> LoadBodyPartDetailsIndividual(string BatchNo, int BSpecId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BSpecId", value: BSpecId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchBodyPartSampleMultiple]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadFaultInspectionDetails(string BatchNo, int Counting)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Count", value: Counting, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_DyedFabricFaultInspectionSample]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadBodyPartDetails(string BatchNo, int Counting)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Count", value: Counting, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_DyedFabricInspectionBodyPartsSample]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<ProcessBy> GetProcessBy()
        {
            return DatabaseHub.Query<ProcessBy>(
                    storedProcedureName: @"[dbo].[usp_get_DyeingProcessBy]", dbName: DyeingDB);
        }

        public IEnumerable<DyeingGivenBy> GetDyeingGivenBy()
        {
            return DatabaseHub.Query<DyeingGivenBy>(
                    storedProcedureName: @"[dbo].[usp_get_DyeingGivenBy]", dbName: DyeingDB);
        }

        public class FaultEntityDetailSaveOnline
        {
            public int DyedInspectionDetailID { get; set; }
            public string FaultID { get; set; }
            public string PointID { get; set; }
            public string PointData { get; set; }
            public string TotalPoint { get; set; }
            public string RollNo { get; set; }
            public string Flag { get; set; }
        }
       
        public class InspectionMasterSaveOnline
        {
            public int Barcode { get; set; }
            public int MasterId { get; set; }
            public int BuyerId { get; set; }
            public int OrderId { get; set; }
            public int MachineID { get; set; }
            public int FBarcodeGenerationID { get; set; }
            public decimal Width { get; set; }
            public decimal Length { get; set; }
            public decimal FinishWeight { get; set; }
            public decimal RejectWeight { get; set; }
            public int TotalPoint { get; set; }
            public decimal Ptsperhundred { get; set; }
            public string GradeName { get; set; }
            public string Remarks { get; set; }            
            public int RollNo { get; set; }
            public bool LabSticker { get; set; }
            public int CommercialApproved { get; set; }            
            public string GSM { get; set; }
            public int QcMcNo { get; set; }           
            public string GradeNo { get; set; }
            public int BpmId { get; set; }
            public string BatchNo { get; set; }
            public int CompTime { get; set; }
            public int BodyPart { get; set; }
            public IEnumerable<FaultEntityDetailSaveOnline> list { get; set; }
            public IEnumerable<FaultEntityDetailSaveOnline> mnFaultList { get; set; }
            public string UserId { get; set; }
        }


        public class InspectionMasterSaveOnlineSample
        {
            public int Barcode { get; set; }
            public int MasterId { get; set; }
            public int BuyerId { get; set; }
            public int OrderId { get; set; }
            public int MachineID { get; set; }
            public int FBarcodeGenerationID { get; set; }
            public decimal Width { get; set; }
            public decimal Length { get; set; }
            public decimal FinishWeight { get; set; }
            public decimal RejectWeight { get; set; }
            public int TotalPoint { get; set; }
            public decimal Ptsperhundred { get; set; }
            public string GradeName { get; set; }
            public string Remarks { get; set; }
            public int RollNo { get; set; }
            public bool LabSticker { get; set; }
            public int CommercialApproved { get; set; }
            public string GSM { get; set; }
            public int QcMcNo { get; set; }
            public string GradeNo { get; set; }
            public int BpmId { get; set; }
            public string BatchNo { get; set; }
            public int CompTime { get; set; }
            public int BodyPart { get; set; }
            public IEnumerable<FaultEntityDetailSaveOnline> list { get; set; }
            public IEnumerable<FaultEntityDetailSaveOnline> mnFaultList { get; set; }
            public IEnumerable<BatchSpecSample> BatchSpecSampleList { get; set; }
            public string UserId { get; set; }

            public int ProcessBySelected { get; set; }
            public int GivenBySelected { get; set; }
        }

        public Task<IEnumerable<object>> LoadGivenBy()
        {
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_get_DyeingGivenBy]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadProcessBy()
        {
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_get_DyeingProcessBy]", dbName: DyeingDB);
        }

        public class InspectionGrade
        {
            public int DyedInspectionDetailID { get; set; }
            public int IFID { get; set; }
            public int BuyerId { get; set; }
            public decimal FromPoint { get; set; }
            public decimal ToPoint { get; set; }
            public string GradeName { get; set; }
            public int GradeNo { get; set; }
        }
        public class FaultPointTemp
        {
            public string FaultName { get; set; }
            public int NameID { get; set; }
            public decimal PHeadNo { get; set; }
            public string FromTo { get; set; }
            public string Point { get; set; }
        }
        public class FaultPoint
        {
            public string PHeadNo { get; set; }
            public string PointID { get; set; }
            public string PointName { get; set; }
            public string PointValue { get; set; }
        }
        public class InspectionModel
        {
            public bool response { get; set; } = false;
            public string ErrorMsg { get; set; }
            public string Msg { get; set; }
            public object Data { get; set; }
            public string FDia { get; set; }
            public string FGSM { get; set; }
            public string TotalRoll { get; set; }
            public string TRollWeight { get; set; }
            public string BatchWeight { get; set; }
            public string FabType { get; set; }
            public string BodyPart { get; set; }
        }
        public class ProcessBy
        {
            public int Id { get; set; }
            public string DyeingProcessName { get; set; }
        }
        public class DyeingGivenBy
        {
            public int Id { get; set; }
            public string GivenName { get; set; }
        }
        public class QACount { 
        public int Counting { get; set; }

        }
        public class InspectionSaveRequest
        {
            public InspectionMasterSaveOnlineSample InspectionMaster { get; set; }
            public List<BatchSpecSample> BodyParts { get; set; }

        }

        public Task<IEnumerable<object>> GetQcMcNo(string userid)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@userid", value: userid, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_UnitWiseMachine]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRollNoList(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
           
            
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_RollNo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadCounting(string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);


            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_LoadCountForSampleBatchQA]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRollStatus(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollStatus]", parameters: parameters, dbName: DyeingDB);
        }

        //public IEnumerable<InspectionMaster> GetInspectionInfoSample(string type, string FilterText, int RollNo, int CompTime)
        public IEnumerable<InspectionMaster> GetInspectionInfoSample(string FilterText)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionMaster>(
                    storedProcedureName: @"[dbo].[usp_get_DyedFabricInspHeadSampleNew]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<BatchSpecSample> GetBatchSpecSample(string BatchNo)
        {
          
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<BatchSpecSample>(
                    storedProcedureName: @"[dbo].[usp_get_BatchBodyPartSample]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<InspectionGrade> GetInspectionGrade(string type, string FilterText)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionGrade>(
                    storedProcedureName: @"[dbo].[usp_SelectGradeForInspection]", parameters: parameters, dbName: DyeingDB);
        }

        public InspectionModel SaveUpdateSample(InspectionMasterSaveOnlineSample _obj)
        {
            var data = new
            {
                MasterId = _obj.MasterId,
                BatchNo = _obj.BatchNo,
                RollNo = _obj.RollNo,
                LabSticker = _obj.LabSticker,
                Width = _obj.Width,
                FinishWeight = _obj.FinishWeight,
                Remarks = _obj.Remarks,
                CompTime = _obj.CompTime,
                BSpecId = _obj.BodyPart,
                UserId = _obj.UserId,
                HostIP = getclientIP(),
                GivenBySelected= _obj.GivenBySelected,
                ProcessBySelected = _obj.ProcessBySelected,

                DyedInspectionDetail = _obj.list.AsTableValuedParameter("dbo.DyedInspectionDetail",
                            new[] { "DyedInspectionDetailID", "FaultID", "TotalPoint", "PointID", "PointData", "RollNo" }),

                MajorMinorFault = _obj.mnFaultList.AsTableValuedParameter("dbo.tvp_MajorMinorFault",
                            new[] { "DyedInspectionDetailID", "FaultID", "Flag" }),

                DyedFabricInspectionMasterSample = _obj.BatchSpecSampleList.AsTableValuedParameter("tvp_DyedFabricInspectionMasterSample",
                                        new[] { "ActualDia", "ActualGSM","BodyPart","Id","Weight" })

            };
            return DatabaseHub.Query<object, InspectionModel>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FinishFabInspectionSample]", model: data, dbName: DyeingDB).FirstOrDefault();
        }
        public InspectionModel SaveUpdateSampleMultiple(InspectionMasterSaveOnlineSample _obj)
        {
            var data = new
            {
                MasterId = _obj.MasterId,
                BatchNo = _obj.BatchNo,
                RollNo = _obj.RollNo,
                LabSticker = _obj.LabSticker,
                Width = _obj.Width,
                FinishWeight = _obj.FinishWeight,
                Remarks = _obj.Remarks,
                CompTime = _obj.CompTime,
                BSpecId = _obj.BodyPart,
                UserId = _obj.UserId,
                HostIP = getclientIP(),
                GivenBySelected = _obj.GivenBySelected,
                ProcessBySelected = _obj.ProcessBySelected,

                DyedInspectionDetail = _obj.list.AsTableValuedParameter("dbo.DyedInspectionDetail",
                            new[] { "DyedInspectionDetailID", "FaultID", "TotalPoint", "PointID", "PointData", "RollNo" }),

                MajorMinorFault = _obj.mnFaultList.AsTableValuedParameter("dbo.tvp_MajorMinorFault",
                            new[] { "DyedInspectionDetailID", "FaultID", "Flag" }),

            };
            return DatabaseHub.Query<object, InspectionModel>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FinishFabInspectionSampleMultiple]", model: data, dbName: DyeingDB).FirstOrDefault();
        }
        public IEnumerable<FaultPointTemp> GetInspectionPointsSample()
        {
            return DatabaseHub.Query<FaultPointTemp>(
                    storedProcedureName: @"[dbo].[usp_SelectPointsForInspection]", dbName: DyeingDB);
        }
        public IEnumerable<FaultEntityDetail> GetFaultEntityDetailSample()
        {
            return DatabaseHub.Query<FaultEntityDetail>(storedProcedureName: @"[dbo].[usp_SelectFabricInspOnlineDetailsInsert]",dbName: DyeingDB);
        }
        public IEnumerable<FaultEntityDetail> GetFaultEntityDetailSampleUpdate(string BatchNo, int Counting)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: Counting, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<FaultEntityDetail>(
                    storedProcedureName: @"[dbo].[usp_SelectFabricInspOnlineDetailsSample]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadBodyPart(string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchBodyPartSample]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetRollList(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollList]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadQABodyPartMultiple(string BatchNo, string RollNo, string CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_SpecificBodyPartSample]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> LoadBodyWeightGivenByProcessBy(string BatchNo, string RollNo, string CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_DyedFabricInspectionBodyPartsSampleByRoll]", parameters: parameters, dbName: DyeingDB);
        }
    }
    
}