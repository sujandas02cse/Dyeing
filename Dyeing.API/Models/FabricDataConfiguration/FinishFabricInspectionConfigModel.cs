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
    public class FinishFabricInspectionConfigModel : Base
    {

        public class Wrapper
        {
            public IEnumerable<InspectionMaster> master { get; set; }
            public IEnumerable<Machine> Machines { get; set; } 
            public IEnumerable<InspectionGrade> grade { get; set; }
            public IEnumerable<FaultEntityDetail> fault { get; set; }

            public IEnumerable<InspectionFault> faultList { get; set; }
        }

        public class FaultViewClass
        {
            public FaultViewClass()
            {
                Faults = new List<InspectionFault>();
            }
            public string FaultName { get; set; }
            public int FaultIndex { get; set; } 
            public List< InspectionFault> Faults { get; set; }

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
            public string FaultName { get; set; }
            public string PointID { get; set; }
            public string PointData { get; set; }
            public string PointStr { get; set; }
            public string TotalPoint { get; set; }
            public string PointCalculation { get; set; }
            public int sl { get; set; }
            public IEnumerable<FaultPoint> lPoints { get; set; }
        }
        public class InspectionMaster
        {
            public string Barcode { get; set; }
            public int DyedInspectionEntryID { get; set; }
            public int MachineID { get; set; }
            public int FBarcodeGenerationID { get; set; }
            public int BuyerId { get; set; }
            public string BuyerName { get; set; }
            public string JobInfo { get; set; }
            public string OrderNo { get; set; }
            public decimal RollWidth { get; set; }
            public decimal RollLength { get; set; }
            public string GradeName { get; set; }
            public string Remarks { get; set; }
            public string Decision { get; set; }
            public string RollNo { get; set; }
            public string FabColor { get; set; }
            public string ItemDescription { get; set; }
            public int CommercialApproved { get; set; }
            public string FinishedDia { get; set; }
            public decimal RollWeight { get; set; }
            public decimal Weight { get; set; }
            public decimal ModifiedWeight { get; set; } 
            public string GSM { get; set; }
            public int QcMcNo { get; set; }
            public string InspMNo { get; set; }
            public string BatchNo { get; set; }
            public int FabBatchMId { get; set; }
            public int BatchId { get; set; }
            public decimal Width { get; set; }
            public decimal Length { get; set; } 
            public bool IsWithoutBarcode { get; set; }

        }
        public class FaultEntityDetailSave
        {
            public int DyedInspectionDetailID { get; set; }
            public string FaultID { get; set; }
            public string PointID { get; set; }
            public string PointData { get; set; }
            public string TotalPoint { get; set; }
            public string RollNo { get; set; }
        }
        public class InspectionMasterSave
        {

            public InspectionMasterSave()
            {
                FaultList = new List<Fault>();
            }
            public int Barcode { get; set; }
            public int DyedInspectionEntryID { get; set; }
            public int MachineID { get; set; }
            public int FBarcodeGenerationID { get; set; }
            public decimal RollWidth { get; set; }
            public decimal RollLength { get; set; }
            public string GradeName { get; set; }
            public string Remarks { get; set; }
            public string Decision { get; set; }
            public string RollNo { get; set; }
            public int CommercialApproved { get; set; }
            public string FinishedDia { get; set; }
            public decimal RollWeight { get; set; }
            public decimal ModifiedRollWight { get; set; }
            public string GSM { get; set; }
            public int QcMcNo { get; set; }
            public string UserId { get; set; }
            public string GradeNo { get; set; }
            public int FabBatchMId { get; set; }
            public IEnumerable<FaultEntityDetailSave> list { get; set; }
            public List<Fault> FaultList { get; set; }

            public string PointText { get; set; }
            public string PointTextIds { get; set; } 
            public string TotalPoint { get; set; }
            public int BatchNo { get; set; } 
            public int BatchId { get; set; }
            public int RollId { get; set; } 
            public decimal ModifiedWeight { get; set; }
        }

        public class Fault
        {
            public string PointData { get; set; }
            public int DyedInspectionDetailID { get; set; } 
            public int TotalPoint { get; set; }
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
            public int GradeId { get; set; } 


        }
        public class FaultPointTemp
        {
            public string FaultName { get; set; }
            public int NameID { get; set; }
            public int PointID { get; set; }  
            public decimal PHeadNo { get; set; }
            public string FromTo { get; set; }
            public string Point { get; set; }
        }
        public class FaultPoint
        {
            public string PointID { get; set; }
            public string PointName { get; set; }
            public string PointValue { get; set; }
        }
        public Task<IEnumerable<object>> GetQcMcNo(string userid)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@userid", value: userid, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_UnitWiseMachine]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<InspectionMaster> GetInspectionInfo(string type, string FilterText)
        {
            //
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionMaster>(
                    storedProcedureName: @"[dbo].[sp_SelectDyedFabricInspectionHead]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<InspectionGrade> GetInspectionGrade(string type, string FilterText)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@FilterText", value: FilterText, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionGrade>(
                    storedProcedureName: @"[dbo].[usp_SelectGradeForInspection]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<long> SaveUpdate(InspectionMasterSave _obj)
        {
            var data = new
            {
                DyedInspectionEntryID = _obj.DyedInspectionEntryID,
                MachineID = _obj.MachineID,
                QcMcNo = _obj.QcMcNo,
                RollWidth = _obj.RollWidth,
                RollLength = _obj.RollLength,
                RollWeight = _obj.RollWeight,
                ModifiedRollWight = _obj.ModifiedRollWight,
                FBarcodeGenerationID = _obj.FBarcodeGenerationID,
                CommercialApproved = _obj.CommercialApproved,
                FabBatchMId = _obj.FabBatchMId,
                Remarks = _obj.Remarks,
                Decision = _obj.GradeNo,
                UserId = _obj.UserId,
                HostIP = getclientIP(),
                DyedInspectionDetail = _obj.list.AsTableValuedParameter("dbo.DyedInspectionDetail",
                            new[] { "DyedInspectionDetailID", "FaultID", "TotalPoint", "PointID", "PointData", "RollNo" })
            };
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_DyedInspection]", model: data, dbName: DyeingDB);
        }

        public Task<long> UpdateForQc2(InspectionMasterSave _obj) 
        {
            var data = new
            {
               
                MachineID = _obj.MachineID,
                FBarcodeGenerationID = _obj.FBarcodeGenerationID,
           
                BpmId = _obj.BatchId,
                RollId = _obj.RollId,
                RollWidth = _obj.RollWidth,
                RollLength = _obj.RollLength,
                RollWeight = _obj.RollWeight,
                ModifiedRollWight = _obj.ModifiedWeight,
                Decision = _obj.GradeNo,
                QcMcNo = _obj.QcMcNo,
                CommerciallyApproved = _obj.CommercialApproved, 
                Remarks = _obj.Remarks,
                TableInsMasterId = _obj.DyedInspectionEntryID,
                DyedInspectionEntryId = _obj.DyedInspectionEntryID, 
               
                HostIP = getclientIP(),
               

                TotalPoint =Convert.ToInt32( _obj.TotalPoint),
                PointData = _obj.PointText,
                CreateBy = _obj.UserId,
              
                DyedInspectionDetail = _obj.FaultList.AsTableValuedParameter("dbo.DyeingBatchConfigFabricDetailsQc2",
                            new[] { "DyedInspectionDetailID", "PointData", "TotalPoint" })

            };
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_UpdDyedFabricInspectionDetailQc2]", model: data, dbName: DyeingDB);
        }

        public IEnumerable<FaultPointTemp> GetInspectionPoints()
        {
            return DatabaseHub.Query<FaultPointTemp>(
                    storedProcedureName: @"[dbo].[usp_SelectPointsForInspection]", dbName: DyeingDB);
        }
        public IEnumerable<FaultEntityDetail> GetFaultEntityDetail(int DyedInspectionEntryID)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@GreigeHeadID", value: DyedInspectionEntryID, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<FaultEntityDetail>(
                    storedProcedureName: @"[dbo].[usp_SelectDyedFabricInspectionDetail]", parameters: parameters, dbName: DyeingDB);
        }

        public object GetRollList(string bCodeOrBatchId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BCodeOrBatchId", value: bCodeOrBatchId, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[GetRollList]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public IEnumerable<InspectionFault> GetInspectionInfo(long Barcode, string BatchNo)
        {
       
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Barcode", value: Barcode, dbType: DbType.Int64, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchNo", value: BatchNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionFault>(
                    storedProcedureName: @"[dbo].[GetFaultList]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<InspectionMaster> GetBarcodeInfo(string bCodeOrBatchId,int rollId,int isBarcode) 
        {
            
            var parameters = new DynamicParameters();

            parameters.Add(name: "@BCodeOrBatchId", value: bCodeOrBatchId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollId", value: rollId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Isbarcode", value: isBarcode, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<InspectionMaster>(
                    storedProcedureName: @"[dbo].[GetBarcodeInfo]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<Machine> GetMachineByBarcode(long bCodeOrBatchId) 
        {

            var parameters = new DynamicParameters();

            parameters.Add(name: "@BCodeOrBatchId", value: bCodeOrBatchId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            return DatabaseHub.Query<Machine>(
                    storedProcedureName: @"[dbo].[GetMachineByBarcode]", parameters: parameters, dbName: DyeingDB);
        }
    }
}