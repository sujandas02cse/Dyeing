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
    public class FinishFabricInspectionOnlineModel : Base
    {
        public class Wrapper
        {
            public IEnumerable<InspectionMaster> master { get; set; }
            public IEnumerable<Machine> Machines { get; set; }
            public IEnumerable<InspectionGrade> grade { get; set; }
            public IEnumerable<FaultEntityDetail> fault { get; set; }

            public IEnumerable<InspectionFault> faultList { get; set; }
            public List<BatchSpec> batchSpecs { get; set; }

            public List<BatchSpecWithDiaGSM> batchSpecsWithDiaGSM { get; set; }
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

        public class BatchSpecWithDiaGSM
        {
            public int id { get; set; }
            public string name { get; set; }
            public string FinishedDia { get; set; }
            public string FinishedGSM { get; set; }
            public string McDiaGauge { get; set; }
            public string FabricTypeName { get; set; }
            public string Composition { get; set; }


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
            public string ReqGSM { get; set; }
            public string FabColor { get; set; }
            public string ItemDescription { get; set; }
            public int CommercialApproved { get; set; }

            public string GSM { get; set; }
            public int QcMcNo { get; set; }
            public string InspMNo { get; set; }
            public string UnitEName { get; set; }
            public string ReqDia { get; set; }
            public string FabType { get; set; }
            public int CompTime { get; set; }
            public string BodyPart { get; set; }
            public int TotalRoll { get; set; }
            public int LabSticker { get; set; }
            public int BSpecId { get; set; }
            public decimal TRollWeight { get; set; }
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
            public string FinishedDia { get; set; }
            public string FinishedGSM { get; set; }
            public string  ActualGSM { get; set; }
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


        public class InspectionMasterSaveOffline
        {
            public string ActualDia { get; set; }
            public string ActualGsm { get; set; }
            public string BodyPart { get; set; }
            public string BodyPartId { get; set; }
            public string BpmId { get; set; }
            public string DiaPart { get; set; }
            public string FDia { get; set; }
            public string FGSM { get; set; }
            public string FabricDiaPartId { get; set; }
            public string NumberOfRoll { get; set; }
            public string RollWeight { get; set; }
            public bool PrintLabSticker { get; set; }
        }

        public async Task SaveStickerPath(string stickerPath, int rollNo, int bpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@stickerPath", value: stickerPath, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@rollNo", value: rollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@bpmId", value: bpmId, dbType: DbType.String, direction: ParameterDirection.Input);


           
           await DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_Update_StickerPath]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public class InspectionMasterSaveOfflineList
        {

            public IEnumerable<InspectionMasterSaveOffline> DiaGsmDetails { get; set; }
            public string UserId { get; set; }

            public string BatchType { get; set; }
            public string OperationMode { get; set; }

            public string BatchNo { get; set; }

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

        public Task<IEnumerable<object>> GetRollStatus(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollStatus]", parameters: parameters, dbName: DyeingDB);
        }



        public IEnumerable<InspectionMaster> GetInspectionInfo(string type, string FilterText, int RollNo, int CompTime)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionMaster>(
                    storedProcedureName: @"[dbo].[usp_get_DyedFabricInspHead]", parameters: parameters, dbName: DyeingDB);
        }
        public IEnumerable<BatchSpec> GetBatchSpec(string BatchNo)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<BatchSpec>(
                    storedProcedureName: @"[dbo].[usp_get_BatchBodyPart]", parameters: parameters, dbName: DyeingDB);
        }

        public object GetMaximumCompactingTime(string BatchNo)
        {  
       

            var parameters = new DynamicParameters();
       
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_MaxCompTimeOfflineQC]", parameters: parameters, dbName: DyeingDB);
            return result;


        }

        public IEnumerable<InspectionGrade> GetInspectionGrade(string type, string FilterText)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionGrade>(
                    storedProcedureName: @"[dbo].[usp_SelectGradeForInspection]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetOriginStatus(string batchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: batchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_DetermineSystem]", parameters: parameters, dbName: DyeingDB);
        }

        public InspectionModel SaveUpdate(InspectionMasterSaveOnline _obj)
        {
            var data = new
            {
                MasterId = _obj.MasterId,
                //MachineID = _obj.MachineID,
                //BuyerId = _obj.BuyerId,
                //OrderId = _obj.OrderId,
                //QcMcNo = _obj.QcMcNo,
                Width = _obj.Width,
                //Length = _obj.Length,
                FinishWeight = _obj.FinishWeight,
                //RejectWeight = _obj.RejectWeight,                
                //FBarcodeGenerationID = _obj.FBarcodeGenerationID,
                //CommercialApproved = _obj.CommercialApproved,
                BatchNo = _obj.BatchNo,
                RollNo = _obj.RollNo,
                LabSticker = _obj.LabSticker,
                Remarks = _obj.Remarks,
                CompTime = _obj.CompTime,
                BSpecId = _obj.BodyPart,
                //GradeNo = _obj.GradeNo,
                //TotalPoint = _obj.TotalPoint,
                //Ptsperhundred = _obj.Ptsperhundred,
                UserId = _obj.UserId,
                HostIP = getclientIP(),
                DyedInspectionDetail = _obj.list.AsTableValuedParameter("dbo.DyedInspectionDetail",
                            new[] { "DyedInspectionDetailID", "FaultID", "TotalPoint", "PointID", "PointData", "RollNo" }),
                MajorMinorFault = _obj.mnFaultList.AsTableValuedParameter("dbo.tvp_MajorMinorFault",
                            new[] { "DyedInspectionDetailID", "FaultID", "Flag" })
            };
            return DatabaseHub.Query<object, InspectionModel>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FinishFabInspection]", model: data, dbName: DyeingDB).FirstOrDefault();


        }



        public IEnumerable<BatchSpec> GetBatchSpecNew(string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<BatchSpec>(
                    storedProcedureName: @"[dbo].[usp_get_BatchBodyPartNew]", parameters: parameters, dbName: DyeingDB);
        }

        // updated by Sujan Das on 10-Mar-2025 for integrating Dia and Gsm with Body Part ID and Name

        public IEnumerable<BatchSpecWithDiaGSM> GetBatchSpecNewWithDiaGSM(string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.Query<BatchSpecWithDiaGSM>(
            //        storedProcedureName: @"[dbo].[usp_get_BatchBodyPartNew]", parameters: parameters, dbName: DyeingDB);

            //return DatabaseHub.Query<BatchSpecWithDiaGSM>(
            //            storedProcedureName: @"[dbo].[usp_get_BatchBodyPartNew_1]", parameters: parameters, dbName: DyeingDB);

            return DatabaseHub.Query<BatchSpecWithDiaGSM>(
                        storedProcedureName: @"[dbo].[usp_get_BatchBodyPartNew_2]", parameters: parameters, dbName: DyeingDB);


        }

        public IEnumerable<FaultPointTemp> GetInspectionPoints()
        {
            return DatabaseHub.Query<FaultPointTemp>(
                    storedProcedureName: @"[dbo].[usp_SelectPointsForInspection]", dbName: DyeingDB);
        }
        public IEnumerable<FaultEntityDetail> GetFaultEntityDetail(string FilterText, int RollNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<FaultEntityDetail>(
                    storedProcedureName: @"[dbo].[usp_SelectFabricInspOnlineDetails]", parameters: parameters, dbName: DyeingDB);
        }

        // updated by Sujan Das on 04-Jan-24 
        // to view the batch information of new system
        public IEnumerable<InspectionMaster> GetInspectionInfoNew(string type, string FilterText, int RollNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.Query<InspectionMaster>(
            //        storedProcedureName: @"[dbo].[usp_get_DyedFabricInspHeadNew]", parameters: parameters, dbName: DyeingDB);

            // updated by sujan das on 04-03-202 to see the change in Online QC Page

            return DatabaseHub.Query<InspectionMaster>(
               storedProcedureName: @"[dbo].[usp_get_DyedFabricInspHeadNew_updated]", parameters: parameters, dbName: DyeingDB);
        }

        public InspectionModel SaveUpdateNew(InspectionMasterSaveOnline _obj)
        {
            var data = new
            {
                MasterId = _obj.MasterId,
                Width = _obj.Width,
                FinishWeight = _obj.FinishWeight,
                BatchNo = _obj.BatchNo,
                RollNo = _obj.RollNo,
                LabSticker = _obj.LabSticker,
                Remarks = _obj.Remarks,
                CompTime = _obj.CompTime,
                BSpecId = _obj.BodyPart,
                UserId = _obj.UserId,
                HostIP = getclientIP(),
                FinishedDia = _obj.FinishedDia,
                FinishedGSM = _obj.FinishedGSM,
                ActualGSM=_obj.ActualGSM,


                DyedInspectionDetail = _obj.list.AsTableValuedParameter("dbo.DyedInspectionDetail",
                           new[] { "DyedInspectionDetailID", "FaultID", "TotalPoint", "PointID", "PointData", "RollNo" }),
                MajorMinorFault = _obj.mnFaultList.AsTableValuedParameter("dbo.tvp_MajorMinorFault",
                           new[] { "DyedInspectionDetailID", "FaultID", "Flag" })
            };
            return DatabaseHub.Query<object, InspectionModel>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_FinishFabInspectionNew]", model: data, dbName: DyeingDB).FirstOrDefault();
        }
        public Task<IEnumerable<object>> GetRollStatusNew(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_RollStatusNew]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRollNoListNew(string BatchNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_RollNoNew]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<FaultEntityDetail> GetFaultEntityDetailNew(string FilterText, int RollNo, int CompTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchNo", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollNo", value: RollNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@pCompTime", value: CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<FaultEntityDetail>(
                    storedProcedureName: @"[dbo].[usp_SelectFabricInspOnlineDetailsNew]", parameters: parameters, dbName: DyeingDB);
        }

        // updated by Sujan Das 13-May-2025

        public object GetBatchNoListForOfflineQC(string status, int unit)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Status", value: status, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UnitId", value: unit, dbType: DbType.Int64, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBactchListForManualQC]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadDetailsByBatch(string batchType, string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_DetailsByBatch]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadBodyPartsByBatch(string batchType, string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_BodyPartsByBatch]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadFabricTypeComposition(string batchType, string BatchNo, string BodyPartId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BodyPartId", value: BodyPartId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_FabricTypeComposition]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadDiaGSM(string batchType, string BatchNo, string SelectedNumberOfRoll, string BodyPartId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@SelectedNumberOfRoll", value: SelectedNumberOfRoll, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BodyPartId", value: BodyPartId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_DiaGSMOfflineQC]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetDiaPartList()
        {
            var parameters = new DynamicParameters();
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_FabricDiaPart]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public async  Task<object> FinishFabricInspectionConfigOffline_Save(InspectionMasterSaveOfflineList Obj)
        {
            var data = new

            {
                UserId = Obj.UserId,
                OperationMode = Obj.OperationMode,
                InspectionItems = Obj.DiaGsmDetails.AsTableValuedParameter("dbo.tvp_DyedFabricInspectionOffline",
                            new[] { "ActualDia", "ActualGsm", "BodyPart", "BodyPartId", "BpmId", "DiaPart", "FDia", "FGSM", "FabricDiaPartId", "NumberOfRoll", "RollWeight", "PrintLabSticker" })
            };
            return await DatabaseHub.QueryAsync<object, object>(
                  storedProcedureName: @"[dbo].[usp_SaveUpdate_DyedInspectionOffline]", model: data, dbName: DyeingDB);
        }


        public string FinishFabricInspectionConfigOffline_SaveBulk(InspectionMasterSaveOfflineList Obj)
        {
            var data = new

            {
                UserId = Obj.UserId,
                InspectionItems = Obj.DiaGsmDetails.AsTableValuedParameter("dbo.tvp_DyedFabricInspectionOffline",
                             new[] { "ActualDia", "ActualGsm", "BodyPart", "BodyPartId", "BpmId", "DiaPart", "FDia", "FGSM", "FabricDiaPartId", "NumberOfRoll", "RollWeight", "PrintLabSticker" })
            };
            return DatabaseHub.Query<object, string>(
                  storedProcedureName: @"[dbo].[usp_SaveUpdate_DyedInspectionOfflineBulk]", model: data, dbName: DyeingDB).FirstOrDefault();

        }

        public object IsSecondCompactingON(string batchType, string BatchNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_Get_Compacting]", parameters: parameters, dbName: DyeingDB);
            return result;
        }


        public object LoadSavedDiaGSM(string batchType, string BatchNo, string BodyPartId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchType", value: batchType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BodyPartId", value: BodyPartId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_SavedDiaGSMOfflineQC]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

    }

}