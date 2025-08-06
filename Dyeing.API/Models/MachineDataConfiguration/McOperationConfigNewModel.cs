using Dapper;
using Dyeing.API.DBInfo;
using System.Data;

namespace Dyeing.API.Models.MachineDataConfiguration
{
    public class McOperationConfigNewModel : Base
    {
        public class McOperationConfigNewDataModel
        {
            public string Operation { get; set; }
            public int OpTime { get; set; }
            public int BpmId { get; set; }
            public string BatchStart { get; set; }
            public string BatchEnd { get; set; }
            public int MachineId { get; set; }
            public string IpAddress { get; set; } = getclientIP();
            public int Status { get; set; }
            public string UserId { get; set; }
        }

        public object NewMachineConfigOperation_SaveUpdate(McOperationConfigNewDataModel _obj)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Operation", value: _obj.Operation, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OpTime", value: _obj.OpTime, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BpmId", value: _obj.BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchStart", value: _obj.BatchStart, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BatchEnd", value: _obj.BatchEnd, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineId", value: _obj.MachineId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: _obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Status", value: _obj.Status, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@HostIP", value: getclientIP(), dbType: DbType.String, direction: ParameterDirection.Input);

            var result = DatabaseHub.Query<object>(
                        storedProcedureName: @"[dbo].[usp_SaveUpdate_MCConfigOperationNew]", parameters: parameters, dbName: DyeingDB);
            return result;
        }

        public object NewMachineConfigOperationGetData(string status,int bpmid,int optime,string batchType)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Status", value: status, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OpTime", value: optime, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BpmId", value: bpmid, dbType: DbType.String, direction: ParameterDirection.Input);
            var result = DatabaseHub.MultiQuery<object, object>(
                  storedProcedureName: @"[dbo].[usp_Get_MCConfigOperationNew]", parameters: parameters, dbName: DyeingDB);
            return result;
        }
    }
}