//using Bogus;
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
    public class PlanManagementModel : Base
    {
        public class DyeingInitialPlan
        {
            public string Buyer { get; set; } 
            public string JobNo { get; set; } 
            public string Style { get; set; } 
            public string Order { get; set; }
            public DateTime BookingDate { get; set; } 
            public DateTime ShipmentDate { get; set; } 
            public string Color { get; set; }
            public string ColorType { get; set; }
            public string FabricTye { get; set; }
            public string Composition { get; set; }
            public string GSM { get; set; } 
            public string Dia { get; set; }
            public string OrderQty { get; set; }
            public string RequiredGreidgeQty { get; set; }
            public string KnittingCommitmentDate { get; set; }
            public string KnittingComponents { get; set; } 
            public string RequiredDyedQty { get; set; }
            public string OrderType { get; set; }
            public string BookingMonth { get; set; } 
            public string BookingYear { get; set; } 
            public string ShipmentMonth { get; set; } 
            public string ShipmentYear { get; set; } 
            public string DyeingUnit { get; set; }
            public string GarmentsUnit { get; set; } 
        }

        public class SaveInitialData
        {
            public int BuyerId { get; set; }
            public int JobId { get; set; }
            public int StyleId { get; set; }
            public int OrderId { get; set; }
            public DateTime BookingDate { get; set; }
            public DateTime ShipmentDate { get; set; }
            public int ColorId { get; set; }
            public int ColorTypeId { get; set; }
            public int FabricTypeId { get; set; }
            public int ItemId { get; set; }
            public string Composition { get; set; }
            public string Gsm { get; set; }
            public string Dia { get; set; }
            public double OrderQty { get; set; }
            public double ReqGQty { get; set; }
            public string KCommitmentFDate { get; set; }
            public string KCommitmentTDate { get; set; }
            public string KComments { get; set; }
            public double RDyedQty { get; set; }
            public string OrderType { get; set; }
            public int DyeingUnitId { get; set; }
            public int GmtUnitId { get; set; }
            public string SpecialFinish { get; set; }
            public int OrderIdAuto { get; set; }
            public string YarnType { get; set; }
            public string YarnBrand { get; set; }
            public string YarnCount { get; set; }
            public string YarnLot { get; set; }
            public int PantoonId { get; set; }
        }

        public class SaveInitialDataWrapper
        {
            public List<SaveInitialData> Obj { get; set; }
            public string  UserId { get; set; }
        }

        public class InitialPlan
        {
            public string Buyer { get; set; }
            public string Job { get; set; }
            public string Style { get; set; }
            public string Order { get; set; }
            public string BookingDate { get; set; }
            public string ShipmentDate { get; set; }
            public string Color { get; set; }
            public string ColorType { get; set; }
            public string FabricType { get; set; }
            public string Composition { get; set; }
            public string GSM { get; set; }
            public string Dia { get; set; }
            public string OrderQty { get; set; }
            public string KnittingComponents { get; set; }
            public string KnittingCommitmentDate { get; set; }
            public string YarnCount { get; set; }
            public string YarnType { get; set; }
            public string RequiredGrigeQty { get; set; }
            public string KnittingProductionQty { get; set; }
            public string GreyInHouseQty { get; set; }
            public string ActualGrigeInhouseBalance { get; set; }
            public string GrigeRequiredDate { get; set; }
            public string ActualInHouseDate { get; set; }
            public string RequiredDyedQty { get; set; }
            public string DyeingCommitmentDate { get; set; }
            public string DyeingRemarks { get; set; }
            public string LabDipNo { get; set; }
            public string LabDipStatus { get; set; }
            public string OrderType { get; set; }
            public string BookingMonthandYear { get; set; }
            public string ShipmentMonthandYear { get; set; }
            public string DyeingCompletionMonth { get; set; }
            public string DyeingCompletionYear { get; set; }
            public string DyeingCompletionWork { get; set; }
            public string DyeingUnit { get; set; }
            public string GarmentsUnit { get; set; }
        }

        public class InitialPlanSave
        {
            public int InitInfoId { get; set; }
            public int ColTypeId { get; set; }

            //test

        }

        public class InitialPlanSaveWrapper
        {
            public string User { get; set; }
            public List<InitialPlanSave> Ids { get; set; }
        }

        public class DyeingCommentEnlishment
        {
            public int InitInfoId { get; set; }
            public string CStartDate { get; set; }
            public string CEndDate { get; set; }
            public string Comments { get; set; }
            public int OpTime { get; set; }
        }

        public class DyeingEnlishmentDataWrapper
        {
            public List<DyeingCommentEnlishment> DyeingCommentEnlishmentList { get; set; }
            public string userId { get; set; }
            public int OpTime { get; set; }
        }


        public class LabDipEnlishment {
            public int InitInfoId { get; set; }
            public string LabDipNo { get; set; }
            public string LabDipStatus { get; set; }
            public string PreTreatmentType { get; set; }
            public string Remarks { get; set; }
            public int OpTime { get; set; }
        }


        public class LabDipEnlishmentWrapper
        {
            public List<LabDipEnlishment> labDipEnlishment { get; set; }
            public string User { get; set; }
            public int OpTime { get; set; }
        }



        #region start Initial Info
        public Task<IEnumerable<Object>> GetInitialInfoData(int UnitNo,int BuyerId,int JobId)
        {
            var job = JobId != 0 ? JobId : (int?)null;
            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: job, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsyncNew<object>(
                storedProcedureName: @"[dbo].[usp_get_InitialInfoNew1]", parameter, dbName: DyeingDB);
        }

        public async Task<IEnumerable<object>> CreateInitialData(SaveInitialDataWrapper obj)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add(name: "@UserId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            dynamicParameters.Add("@InitialInfoDataSave", obj.Obj.AsTableValuedParameter("dbo.InitialInfoDetailsTVP2",
                new[] { "BuyerId",  "JobId",    "StyleId",  "OrderId",  "BookingDate",  "ShipmentDate", "ColorId",  "ColorTypeId",  "FabricTypeId", "ItemId",   "Composition",  "Gsm",  "Dia",  "OrderQty", "ReqGQty",  "KCommitmentFDate", "KCommitmentTDate", "KComments",    "RDyedQty", "OrderType",    "DyeingUnitId", "GmtUnitId",    "SpecialFinish",    "OrderIdAuto","YarnType","YarnBrand","YarnCount","YarnLot","PantoonId"
            }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveInitialInfoDataUpdated]", parameters: dynamicParameters, dbName: DyeingDB);
        }

        #endregion end Initial Info


        #region start Initial Plan
        public async Task<IEnumerable<Object>> GetInitialPlanData(int UnitId,int BuyerId)
        {

            var parameter = new DynamicParameters();
            parameter.Add(name: "@unitNo", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[Usp_get_InitialPlanNew1]", parameter, dbName: DyeingDB);
        }

        public async Task<IEnumerable<Object>> CreateInitialPlan(InitialPlanSaveWrapper obj)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add(name: "@User", value: obj.User, dbType: DbType.String, direction: ParameterDirection.Input);
            dynamicParameters.Add("@Ids", obj.Ids.AsTableValuedParameter("InitPlanIds",
                new[] { "InitInfoId", "ColTypeId" }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdateInitialPlan]", parameters: dynamicParameters, dbName: DyeingDB);
        }

        #endregion end Initial Plan

        public class PrioritySetData
        {
            public string UserId { get; set; }
            public List<PrioritySetDataWrapper> DataList { get; set; }
        }

        public class PrioritySetDataWrapper
        {
            public int BpmId { get; set; }
            public int PriorityNo { get; set; }
        }

        public class DyeingUnitChange
        {
            public string UserId { get; set; }
            public List<DyeingUnitChangeWrapper> ListData { get; set; }
        }

        public class DyeingUnitChangeWrapper
        {
            public int InitInfoId { get; set; }
            public int PreUnitNo { get; set; }
            public int FinalUnitNo { get; set; }
        }

        public class MachineToMachineChange
        {
            public int BpmId { get; set; }
            public int FromMDId { get; set; }
            public int ToMDId { get; set; }
            public int Qty { get; set; }
            public int OpTime { get; set; }
            public string User { get; set; }            
        }

        public class SCMSynchronization
        {
            public int BpmId { get; set; }
            public string UserId { get; set; }
        }




        public Task<IEnumerable<Object>> GetFabBuyer(int UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_FabBookingBuyer]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetFabJobNo(int BuyerId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_FabBookingJobNo]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetFabStyle(int JobNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_FabBookingStyleNo]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetFabColor(int StyleId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_FabBookingColorId]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetDyeingUnitByStyle(int StyleId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_get_DyeingUnitOrderByStyle]", parameter, dbName: DyeingDB);
        }

        public async Task<object> GetCommentEnlishments(int BuyerId,int JobNo,int StyleId,int ColorId,int OpTime)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Style", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@ColorId", value: ColorId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@AppoveTime", value: OpTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object,object,object>(
                storedProcedureName: @"[dbo].[usp_Get_DyeingEnlishmentsData]", parameter, dbName: DyeingDB);
        }


        public async Task<IEnumerable<Object>> SaveDyeingCommentEnlishment(DyeingEnlishmentDataWrapper obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@userId", value: obj.userId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@OpTime", value: obj.OpTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("@dyeingCommentEnlishment", obj.DyeingCommentEnlishmentList.AsTableValuedParameter("dbo.DyeingCommentEnlishment1",
                new[] { "InitInfoId", "CStartDate", "CEndDate", "Comments", "OpTime" }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_Save_DyeingCommentEnlishmentData]", parameters: parameter, dbName: DyeingDB);
        }


        public async Task<object> GetLabDipEnlishments(int BuyerId, int JobNo, int StyleId, int ColorId, int OpTime)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Style", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@ColorId", value: ColorId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@AppoveTime", value: OpTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object, object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipEnlishmentsData]", parameter, dbName: DyeingDB);
        }

      

        public async Task<IEnumerable<Object>> SaveLabDipEnlishment(LabDipEnlishmentWrapper obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@userId", value: obj.User, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add(name: "@OpTime", value: obj.OpTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add("@labDipEnlishment", obj.labDipEnlishment.AsTableValuedParameter("dbo.LabDipEnlishment",
                new[] { "InitInfoId", "LabDipNo", "LabDipStatus", "PreTreatmentType", "Remarks", "OpTime" }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_Save_LapDipEnlishmentData]", parameters: parameter, dbName: DyeingDB);
        }


        public Task<IEnumerable<Object>> GetMechineDatabyUnit(int UnitId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            //return DatabaseHubRpt.QueryAsync<object>(
            //    storedProcedureName: @"[dbo].[usp_Get_MachineDatabyUnit]", parameter, dbName: DyeingDB);
            return DatabaseHub.QueryAsync<object>(
            storedProcedureName: @"[dbo].[usp_Get_MachineDatabyUnit]", parameter, dbName: DyeingDB);
        }

        public Task<IEnumerable<Object>> GetPrioritySetData(int unit,int MechineNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitId", value: unit, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@MachineId", value: MechineNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_PriorityDatabyMachine]", parameter, dbName: DyeingDB);
        }



        public async Task<IEnumerable<Object>> SavePrioritySetData(PrioritySetData obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@userId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("@priorityData", obj.DataList.AsTableValuedParameter("dbo.PriorityData",
                new[] { "BpmId", "PriorityNo"}));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_PrioritySet]", parameters: parameter, dbName: DyeingDB);
        }

        #region Dyeing Unit Change Data

        public async Task<object> GetDyeingChangeData(int UnitNo,int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            var parameter = new DynamicParameters();
                parameter.Add(name: "@UnitId", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BuyerNo", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: JobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderNo", value: OrderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_DyeingUnitChangeData]", parameter, dbName: DyeingDB);
        }


        public async Task<IEnumerable<Object>> SaveDyeingUnitChange(DyeingUnitChange obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UserId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameter.Add("@data", obj.ListData.AsTableValuedParameter("dbo.DyeingUnitChange",
                new[] { "InitInfoId", "PreUnitNo", "FinalUnitNo" }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[Usp_SaveUpdate_DyeingUnitChange]", parameters: parameter, dbName: DyeingDB);
        }

        #endregion

        #region Machine to Machine Transfer

        public async Task<object> GetBatchAndMachineData(int UnitNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_BatchandMachineForMachineTransfer]", parameter, dbName: DyeingDB);
        }

        public async Task<object> GetBatchDetailData(int BpmId,int OpTime)
        {
            int Ops = OpTime != null ? OpTime : 0;
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OpTime", value: Ops, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_BatchDetailsDataForMachineChange]", parameter, dbName: DyeingDB);
        }


        public async Task<IEnumerable<Object>> SaveMachineChangeData(MachineToMachineChange obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: obj.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@FromMDId", value: obj.FromMDId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@ToMDId", value: obj.ToMDId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BaseQty", value: obj.ToMDId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Qty", value: obj.Qty, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OpTime", value: obj.OpTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@User", value: obj.User, dbType: DbType.String, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[Usp_Save_MachineChangeData]", parameters: parameter, dbName: DyeingDB);
        }
        #endregion




        #region SCMSynchronization
        public Task<IEnumerable<object>> GetSCMIssuedBatchNo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchNo_SCMIssue]", dbName: DyeingDB);
        }

     
      
          public Task<long> SCMSynchronization_Save(SCMSynchronization obj)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: obj.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.ExecuteAsync(
              storedProcedureName: @"[dbo].[usp_Get_ScmToDyeing]", parameters: parameter, dbName: DyeingDB);
        }

        #endregion
    }
}   