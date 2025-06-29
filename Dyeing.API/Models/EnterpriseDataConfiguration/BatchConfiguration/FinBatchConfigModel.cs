using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models
{
    public class FinBatchConfig:Base
    {
        public class FinishingBatchHead
        {
            public string FinBatchHId { get; set; }
            public string FDate { get; set; }
            public string MppmId { get; set; }
            public string DiaPartName { get; set; }
            public string FinalWidth { get; set; }
            public string FinalGSM { get; set; }
            public string GWeight { get; set; }
            public string FWeight { get; set; }
            public string NoOfRoll { get; set; }
            public string Shrinkage { get; set; }
            public string Spirality { get; set; }
            public string ProcessLossKg { get; set; }
            public string ProcessLossPer { get; set; }
            public string SQCStatus { get; set; }            
            public string MfcId { get; set; }
            public string DpfcId { get; set; }
            public string FabricsOperationNo { get; set; }
            public string ShadeName { get; set; }
            public string RecipeNo { get; set; }
            public string Tuning { get; set; }
            public string LoadingTime { get; set; }
            public string UnloadingTime { get; set; }
            public string TotalTime { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }        
        public class FinishingBatchChild
        {
            public string FinBatchCId { get; set; }
            public string FinBatchHId { get; set; }
            public string DpsdId { get; set; }
            public string Value { get; set; }
        }
        public class FinishingRecipe
        {
            public string FrId { get; set; }
            public string RecipeDesc { get; set; }            
        }
        public class FinishingBatchData : FinishingBatchHead
        {
            public List<FinishingBatchChild> child { get; set; }
            public List<FinishingRecipe> recipe { get; set; }
        }
        public IEnumerable<object> GetDDLFinishingBatch(string Info)
        {
            var parameter = new DynamicParameters();            
            parameter.Add(name: "@Info", value: Info, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_DDLFinishingBatch]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetDPSpecification(string DiaPartName)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@DiaPartName", value: DiaPartName, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_DPSpecification]", parameters: parameter, dbName: DyeingDB);
        }
        public object GetMachineProductionPlanData(int MppmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_MachineProductionPlanData]", parameters: parameters, dbName: DyeingDB);
        }
        public long FinishingBatch_SaveUpdate(FinishingBatchData _obj)
        {
            var data = new
            {
                //_obj,
                FinBatchHId = _obj.FinBatchHId,
                FDate = _obj.FDate,
                MppmId = _obj.MppmId,
                DiaPartName = _obj.DiaPartName,
                FinalWidth = _obj.FinalWidth,
                FinalGSM = _obj.FinalGSM,
                GWeight = _obj.GWeight,
                FWeight = _obj.FWeight,
                NoOfRoll = _obj.NoOfRoll,
                Shrinkage = _obj.Shrinkage,
                Spirality = _obj.Spirality,
                ProcessLossKg = _obj.ProcessLossKg,
                ProcessLossPer = _obj.ProcessLossPer,
                SQCStatus = _obj.SQCStatus,                
                MfcId = _obj.MfcId,
                DpfcId = _obj.DpfcId,
                FabricsOperationNo = _obj.FabricsOperationNo,
                ShadeName = _obj.ShadeName,
                RecipeNo = _obj.RecipeNo,
                Tuning = _obj.Tuning,
                LoadingTime = _obj.LoadingTime,
                UnloadingTime = _obj.UnloadingTime,
                TotalTime = _obj.TotalTime,
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                FinishingBatchChild = _obj.child.AsTableValuedParameter("dbo.FinishingBatchChild",
                            new[] { "FinBatchCId", "FinBatchHId", "DpsdId", "Value"}),
                FinishingRecipe = _obj.recipe.AsTableValuedParameter("dbo.FinishingRecipe",
                            new[] { "FrId", "RecipeDesc" })
            };

            return DatabaseHub.Execute(storedProcedureName: "[dbo].[usp_SaveUpdate_FinishingBatch]", model: data, dbName: DyeingDB);
        }
        public Tuple<IEnumerable<object>, IEnumerable<object>> GetFinBatchData(int MppmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_FinBatchData]", parameters: parameters, dbName: DyeingDB);
        }
    }
}