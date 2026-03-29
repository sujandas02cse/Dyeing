using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration
{
    public class DataConfigurationModel : Base
    {
        public class ConfigurationSaveUpdate
        {
            public string Type { get; set; }
            public int CombinationId { get; set; }
            public int BpmId { get; set; }
            public int OrderId { get; set; }
            public int StyleId { get; set; }
        }
        public Task<IEnumerable<Object>> GetBatchDatabyBathcType(int UnitId, string BatchType)
        {

            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BatchType", value: BatchType, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_Get_BatchDatabyType]", parameter, dbName: DyeingDB);
        }

        public Task<Tuple<IEnumerable<Object>,IEnumerable<Object>,IEnumerable<object>>> GetDataConfigurationForBatch(int Bpmid)
        {

            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BpmId", value: Bpmid, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.MultiQueryAsync<object,object,object>(
                storedProcedureName: @"[dbo].[usp_Get_DataConfigurationForBpmId]", parameter, dbName: DyeingDB);
        }
        public Task<IEnumerable<Object>> SaveUpdateDataConfiguration(ConfigurationSaveUpdate configurationSaveUpdate)
        {

            var parameter = new DynamicParameters();
            //parameter.Add(name: "@UnitNo", value: UnitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@BpmId", value: configurationSaveUpdate.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@CombinationId", value: configurationSaveUpdate.CombinationId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: configurationSaveUpdate.StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderId", value: configurationSaveUpdate.OrderId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@Type", value: configurationSaveUpdate.Type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_SaveUpdate_DataConfigurationForBatch]", parameter, dbName: DyeingDB);
        }
    }
}