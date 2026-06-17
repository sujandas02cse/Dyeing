using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchPreparationModel;

namespace Dyeing.API.Models.MachineDataConfiguration
{
    public class McOperationConfigModel : Base
    {
        public object McOpConfiguration_SaveUpdate(McOperationConfigDataModel _obj)  ///Task<IEnumerable<object>>
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Operation", value: _obj.Operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchId", value: _obj.BatchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Status", value: _obj.Status, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@BatchStart", value: _obj.StartTime, dbType: DbType.String, direction: ParameterDirection.Input);

            parameters.Add(name: "@HostIP", value: getclientIP(), dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CreatedBy", value: _obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@MDId", value: _obj.MDId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: _obj.CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            //parameters.Add(name: "@BatchEnd", value: _obj.EndTime, dbType: DbType.String, direction: ParameterDirection.Input);


            var result = DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[sp_MCConfigOperation]", parameters: parameters, dbName: DyeingDB);
            //if(result.Item1.Count>= result.Item1.Count)
            return result;

        }

        public object McOpConfiguration_SaveUpdateNew(McOperationConfigDataModel _obj)  ///Task<IEnumerable<object>>
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Operation", value: _obj.Operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchId", value: _obj.BatchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Status", value: _obj.Status, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@HostIP", value: getclientIP(), dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CreatedBy", value: _obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@MDId", value: _obj.MDId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: _obj.CompTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            var result = DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[sp_MCConfigOperationNew]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchRelatedData(int batchId, int compTime, string Operation)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchId", value: batchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Operation", value: Operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: compTime, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[sp_MCConfigOperation]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchRelatedDataNew(int batchId, int compTime, string Operation)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchId", value: batchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Operation", value: Operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@CompTime", value: compTime, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[sp_MCConfigOperationNew]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchNoList(int batchId)
        {
            var data = new
            {
                BatchId = batchId,

            };

           // var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBactchList]", dbName: DyeingDB);
           var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBactchListNew]", dbName: DyeingDB);
            return result;
        }

        // Machine Operation
        public Task<IEnumerable<object>> SaveMachineOperationConfig(MachineOperationConfigModel Obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                BpmId = Obj.BpmId,
                MDId = Obj.MDId,
                CreatedBy = Obj.CreatedBy,
                MachineTypeId=Obj.MachineTypeId,
                Details =Obj.Details.AsTableValuedParameter("dbo.tvp_McOperationDetailType",
                                             new[] {
                                             "BodyPartId",
                                             "Quantity"})
            };

            //return DatabaseHub.QueryAsync<object,object>(
            //       storedProcedureName: @"[dbo].[sp_SaveMcOperation]", model: data, dbName: DyeingDB);

            //return DatabaseHub.QueryAsync<object, object>(
            //    storedProcedureName: @"[dbo].[sp_SaveMcOperation_New]", model: data, dbName: DyeingDB);




           // new implementation
            return DatabaseHub.QueryAsync<object, object>(
                storedProcedureName: @"[dbo].[sp_SaveMcOperation_NewFormat]", model: data, dbName: DyeingDB);



        }


        public object LoadAllData()
        {
            var parameters = new DynamicParameters();

            parameters.Add(name: "@Operation", value: "GetAllData", dbType: DbType.String, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[sp_MCConfigOperation]", parameters: parameters, dbName: DyeingDB);
            return result;
        }


        //-------------Slitting MC Configuration Operation----------------------

        public SlittingMcOperationConfigDataModel McSlittingConfiguration_SaveUpdate(SlittingMcOperationConfigDataModel _obj)  ///Task<IEnumerable<object>>
        {


            var data = new
            {
                HostIP = getclientIP(),
                BatchId = _obj.BatchId,
                FabricId = _obj.FabricId,
                McSpeed = _obj.McSpeed,
                CreatedBy = _obj.UserId,
                Operation = _obj.Operation,
                OverFeed = _obj.OverFeed,
                PadPresure = _obj.PadPresure,
                DustSpeed = _obj.DustSpeed,
                Remarks = _obj.Remarks

            };


            var result = DatabaseHub.Query<object, SlittingMcOperationConfigDataModel>(
                   storedProcedureName: @"[dbo].[sp_SlitMcConfigOperation]", model: data, dbName: DyeingDB).FirstOrDefault();


            return result;

        }

        public object LoadCurrentStatus(string BpmId,string MachineTypeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineTypeId", value: MachineTypeId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            //var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_LoadCurrentStatus]", parameters: parameters, dbName: DyeingDB);


            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_LoadCurrentStatus_New]", parameters: parameters, dbName: DyeingDB);

            return result;
        }

        public object GetBodyPartDetailsForEndMode(string bpmId, int mcOperationMasterId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: bpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@McOperationMasterId", value: mcOperationMasterId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetBodyPartDetailsForEndMode]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetOperationHistoryByTime(string BpmId, int OperationTime,string machineTypeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@OperationTime", value: OperationTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineTypeId", value: machineTypeId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            //var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetOperationHistoryByTime]", parameters: parameters, dbName: DyeingDB);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetOperationHistoryByTime_New]", parameters: parameters, dbName: DyeingDB);

            return result;
        }

        public object GetBatchBodyPartStatus(string bpmId, int? mdId, int? mcOperationMasterId,string machineTypeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: bpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MDId", value: mdId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@McOperationMasterId", value: mcOperationMasterId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineTypeId", value: machineTypeId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetBatchBodyPartStatus]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchNoListUnitWise(int unit)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unit, dbType: DbType.Int64, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBactchListUnitWIse]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadBuyerJobStyle(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBuyerJobStyle]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetMachineTypeId(string machineType)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@McType", value: machineType, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetMachineTypeId]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadMachineStages(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetMachineStages]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetMachineWiseBodyParts(int mcOperationMasterId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@McOperationMasterId", value: mcOperationMasterId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetMachineWiseBodyParts]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public IEnumerable<object> GetFinMcByTypeUnitWise(string McType, string UnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@McType", value: McType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_get_FinMachine_New]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadTotalRollQuantity(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int64, direction: ParameterDirection.Input);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetTotalRollQuantity]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadInspectionPoint()
        {
            var parameters = new DynamicParameters();
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SelectPointsForInspection_New]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetSlittingBatchRelatedData(int batchId)
        {

            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchId", value: batchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Operation", value: "GetDataByBatchId", dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[sp_SlitMcConfigOperation]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object LoadFaultsForInspection()
        {
            var parameters = new DynamicParameters();
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SelectFaultsForInspection]", parameters: parameters, dbName: DyeingDB);
            return result;
        }


        //-------------Stenter MC Configuration Operation----------------------

        public StenterMcOperationConfigDataModel McStenterConfiguration_SaveUpdate(StenterMcOperationConfigDataModel _obj)  ///Task<IEnumerable<object>>
        {


            var data = new
            {
                HostIP = getclientIP(),
                BatchId = _obj.BatchId,
                FabricId = _obj.FabricId,
                McSpeed = _obj.McSpeed,
                UnderFeed = _obj.UnderFeed,
                Pinning = _obj.Pinning,
                BlowerRpm = _obj.BlowerRpm,
                RollerTension = _obj.RollerTension,
                Softner = _obj.Softner,
                CreatedBy = _obj.UserId,
                Operation = _obj.Operation,
                OverFeed = _obj.OverFeed,
                PadPresure = _obj.PadPresure,
                DustSpeed = _obj.DustSpeed,
                Remarks = _obj.Remarks

            };


            var result = DatabaseHub.Query<object, StenterMcOperationConfigDataModel>(
                   storedProcedureName: @"[dbo].[sp_StenMcConfigOperation]", model: data, dbName: DyeingDB).FirstOrDefault();


            return result;

        }

        public object GetStenterBatchRelatedData(int batchId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BatchId", value: batchId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Operation", value: "GetDataByBatchId", dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.MultiQuery<StenterMcOperationConfigDataModel, object>(
                   storedProcedureName: @"[dbo].[sp_StenMcConfigOperation]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        //Compacting Machine
        public Task<IEnumerable<object>> CompactingMcOperation_SaveUpdate(CompactingMcOpModel _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                BpmId = _obj.BpmId,
                FabricId = _obj.FabricId,
                McSpeed = _obj.McSpeed,                
                FinDia = _obj.FinDia,
                OverFeed = _obj.OverFeed,
                Length = _obj.Length,
                Width = _obj.Width,
                Temperature = _obj.Temperature,
                Remarks = _obj.Remarks,
                UserId = _obj.UserId
            };

            return DatabaseHub.QueryAsync<object,object>(
                   storedProcedureName: @"[dbo].[usp_SaveUpdate_CompactingMcOpData]", model: data, dbName: DyeingDB);            

        }

        public object GetCompactingMcOpData(int bpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: bpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);            

            return DatabaseHub.MultiQuery<object, object>(
                   storedProcedureName: @"[dbo].[usp_get_CompactingMcOperation]", parameters: parameters, dbName: DyeingDB);
            
        }
        //End-Compacting Machine

        // Created by Sujan Das on 23-March-2025
        public object GetBatchNoListUnitStatusWise(string status, int unit)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Status", value: status, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UnitId", value: unit, dbType: DbType.Int64, direction: ParameterDirection.Input);
          
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBactchListNew_1]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchBasicInfo(string BpmId, string unitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetBatchBasicInfo]", parameters: parameters, dbName: DyeingDB);
            return result;
        }


        public object GetBodyPartDetails(string BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_GetBodyPartDetails]", parameters: parameters, dbName: DyeingDB);
            return result;
        }


        public object GetOperationTime(string BpmId,string machineTypeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineTypeId", value: machineTypeId, dbType: DbType.Int32, direction: ParameterDirection.Input);

           // var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_GetOperationTime]", parameters: parameters, dbName: DyeingDB);
            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_GetOperationTime_New]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object GetBatchStartEndTime(string BpmId,int OperationTime)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@OperationTime", value: OperationTime, dbType: DbType.Int32, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_GetBatchStartEndTime]", parameters: parameters, dbName: DyeingDB);
            return result;
        }
    }
    public class McOperationConfigObject
    {
        public McOperationConfigObject()
        {
            McOperationConfigObj = new McOperationConfigDataModel();

            McOperationConfigList = new List<McOperationConfigDataModel>();
        }
        public McOperationConfigDataModel McOperationConfigObj { get; set; }
        public List<McOperationConfigDataModel> McOperationConfigList { get; set; }
    }

    public class McOperationConfigDataModel
    {
        public string Operation { get; set; }
        public string Status { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int BatchId { get; set; } 
        public int FabricId { get; set; }
        public int MDId { get; set; }
        public int CompTime { get; set; }
        public string UserId { get; set; }

    }
    public class SlittingMcOperationConfigDataModel 
    {
        public string Operation { get; set; }
        public string Remarks { get; set; }
        public int BatchId { get; set; }
        public int FabricId { get; set; }
        public string UserId { get; set; }
        public int McSpeed { get; set; }
        public decimal OverFeed { get; set; }
        public int BatchQty { get; set; }
        public decimal PadPresure { get; set; }
        public decimal DustSpeed { get; set; }

        public int SlitId { get; set; }
        public int BpmId { get; set; }

    }
    public class CompactingMcOpModel
    {
        public int Id { get; set; }
        public int BpmId { get; set; }
        public int FabricId { get; set; }
        public string FinDia { get; set; }
        public string OverFeed { get; set; }
        public int McSpeed { get; set; }
        public float Length { get; set; }
        public float Width { get; set; }
        public float Temperature { get; set; }
        public string Remarks { get; set; }       
        public string UserId { get; set; }        
    }

    public class StenterMcOperationConfigDataModel 
    {
        public string Operation { get; set; }
        public string Remarks { get; set; }
        public int Softner { get; set; }
        public int BatchId { get; set; }
        public int FabricId { get; set; }
        public string UserId { get; set; }
        public decimal McSpeed { get; set; }
        public decimal OverFeed { get; set; }
        public decimal UnderFeed { get; set; }
        public decimal Pinning { get; set; }
        public decimal BlowerRpm { get; set; }
        public decimal RollerTension { get; set; }
        public int BatchQty { get; set; }
        public decimal PadPresure { get; set; }
        public decimal DustSpeed { get; set; }
        public int StenId { get; set; } 
        public int BpmId { get; set; }
        public int IsSoftnerUse { get; set; }
        public string BuyerName { get; set; }

        public string MachineNo { get; set; }
        public string JobName { get; set; }
        public string OrderName { get; set; }
        public string StyleName { get; set; }
        public string ColorName { get; set; }
    }


    public class MachineOperationConfigModel
    {
        public long BpmId { get; set; }
        public int MDId { get; set; }
        public string CreatedBy { get; set; }
        public string HostIP { get; set; }
        public List<MachineOperationDetailsModel> Details { get; set; }

        public int MachineTypeId { get; set; }
    }

    public class MachineOperationDetailsModel
    {
        public int BodyPartId { get; set; }
        public decimal Quantity { get; set; }
    }

}