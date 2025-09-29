using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.DashboardManagement
{
    public class DashboardModel:Base
    {
        
        public Task<IEnumerable<object>> GetPackingListData(int unitId, string fromDate, string toDate,int flag)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Flag", value: flag, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
            storedProcedureName: @"[dbo].[usp_get_PackingListDashboard]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetBatchDataFloorStatus(int UnitId, DateTime FromDate, DateTime ToDate)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchDataForFloorStatus]",parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchDataFloorStatusSample(int UnitId, DateTime FromDate, DateTime ToDate)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchDataForFloorStatusSample]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetPrioritySet(int UnitId, int MachineNo)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add(name: "@UnitNo", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@MachineNo", value: MachineNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PrioritySetDashboardData]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetPackingListDataNew(int unitId, string fromDate, string toDate, int flag)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Flag", value: flag, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
            storedProcedureName: @"[dbo].[usp_get_PackingListDashboardNew]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetBatchDataFloorStatusNew(int UnitId, DateTime FromDate, DateTime ToDate)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
           
            //return DatabaseHubRpt.QueryAsyncNew<object>(
            //        storedProcedureName: @"[dbo].[usp_rpt_BatchDataForFloorStatusNew]", 
            //        parameters: parameters, 
            //        dbName: DyeingDB);


            return DatabaseHubRpt.QueryAsyncNewV1<object>(
                  storedProcedureName: @"[dbo].[usp_rpt_BatchDataForFloorStatusNew]",
                  parameters: parameters,
                  dbName: DyeingDB);


            
        }

    }
}