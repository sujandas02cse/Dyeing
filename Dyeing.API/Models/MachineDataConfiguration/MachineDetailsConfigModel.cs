using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models
{
    public class MachineDetailsConfigModel: Base
    {
        public class MachineDetails
        {
            public Int32  MDId { get; set; }
            public string MachineNo { get; set; }
            public Int32 MachineId { get; set; }
            public Int32 MTypeId { get; set; }
            public Int32 MBrandId { get; set; }
            public Int32 MModelId { get; set; }
            public string CountryOfOrigin { get; set; }
            public string SerialNo { get; set; }
            public Int32 MCapacityId { get; set; }
            public string CycleTime { get; set; }
            public Int32 NoOfCycle { get; set; }
            public string MainPumpSpeed { get; set; }
            public string WinchSpeed { get; set; }
            public Int32 NoOfNozzle { get; set; }
            public Int32 NoOfMotor { get; set; }
            public string Power { get; set; }
            public string SupplyPressure { get; set; }
            public string CAirPressure { get; set; }
            public string DesignTemperature { get; set; }
            public string SteamPressure { get; set; }
            public Int32 AssetId { get; set; }
            public Int32 UnitId { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }

            //
        }
        public class MachineDetailsInfo: MachineDetails
        {
            public string ItemBrandName { get; set; }
            public string MachineName { get; set; }
            public string MachineType { get; set; }
            public string MachineModel { get; set; }
            public string CapacityName { get; set; }
            public string AssetNo { get; set; }
            public string UnitEName { get; set; }
        }
        public Task<IEnumerable<object>> GetMachineName(string Catagory)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Catagory", value: Catagory, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@Category", value: Category, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_MachineInfo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetMachineBrand()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Select_Brand]",  dbName: SCM);
        }
        public Task<IEnumerable<object>> GetMachinesearchCapacity()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Select_MachineCapacity]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetMachineAsset()
        {
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_Select_DyeingMachineAssetNo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetUnitName()
        {
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[sp_Unit_Select]", dbName: HRM);
        }
        public Task<long> MachineDetails_SaveUpdate(MachineDetails obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MachineDetail]", model: obj, dbName: DyeingDB);
        }
        
        public Task<IEnumerable<object>> GetMachineDetail()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_MachineDetail]", dbName: DyeingDB);
        }

        public Task<long>  DeleteMachineDetail(string mDID, string userId)
        {
            var parameters = new DynamicParameters();
            string hostIP = getclientIP();
            parameters.Add(name: "@MDID", value: mDID, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: userId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@HostIP", value: hostIP, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.ExecuteAsync(
                       storedProcedureName: @"[dbo].[usp_Delete_MachineDetail]", parameters: parameters, dbName: DyeingDB);
          
        }

        public Task<IEnumerable<object>> SearchMachineWiseManPower(int unitNo, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            string type = "details";
            parameters.Add(name: "@UnitNo", value: unitNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_MachineWiseManPower]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetChildData(int mwMPdId)
        {
            var parameters = new DynamicParameters();
            string type = "child";
            parameters.Add(name: "@MwMPdId", value: mwMPdId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Type", value: type, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_select_MachineWiseManPower]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetMachineNo(string catagory)
        {
            //var parameters = new DynamicParameters();
            //parameters.Add(name: "@Type", value: catagory, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetMachineNo]", dbName: DyeingDB);
        }
    }
}