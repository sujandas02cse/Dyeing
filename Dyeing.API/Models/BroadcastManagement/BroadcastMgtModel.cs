using Dapper;
using Dyeing.API.DBInfo;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace Dyeing.API.Models
{
    public class BroadcastMgtModel: Base
    {
        public Task<IEnumerable<object>> GetReportInfo(string PageName, string UserId,string Flag)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@PageName", value: PageName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            parameters.Add(name: "@Flag", value: Flag, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ReportingData]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetRptParam(string ReportingId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@ReportingId", value: ReportingId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_rpt_GetRptParam]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetReportingData(string SQL, string rptParm)
        {
            var parameters = new DynamicParameters();
           
            JavaScriptSerializer j = new JavaScriptSerializer();           
            JArray jsonArray = JArray.Parse(rptParm);

            foreach (var item in jsonArray)
            {
                var ParamName = item.First.ToString().Split(':')[0].Replace('"', ' ').Trim();
                var ParamValue = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                ParamValue = ParamValue == "undefined" ? "" : ParamValue;
                parameters.Add(name: ParamName, value: ParamValue, dbType: DbType.String, direction: ParameterDirection.Input);
            }
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: SQL, parameters: parameters, dbName: DyeingDB);
        }

        // order list by style and buyer id [dbo].[GetOrderByStyleBuyer]
        public Task<IEnumerable<object>> GetOrderByStyleBuyer(int buyerId, int jobId, int styleId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: styleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: jobId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[GetOrderByStyleBuyer]", parameters: parameter, dbName: DyeingDB);
        }

        // style list by style and buyer id
        public Task<IEnumerable<object>> GetStyleByOrderBuyer(int buyerId, int jobId, int orderId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderId", value: orderId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobId", value: jobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[GetStyleByOrderBuyer]", parameters: parameter, dbName: DyeingDB);
        }
    }
}