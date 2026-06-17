using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipDeclareModel : Base
    {
        public class LabBookingReceiveDto
        {
            public int LabReceivedId { get; set; }
            public int DeclareUnitId { get; set; }
            public string LabStartDate { get; set; }
            public string LabDipBookingNo { get; set; }
            public string LDNo { get; set; }
            public string UserId { get; set; }
            public string UserIp { get; set; }
        }

        public Tuple<IEnumerable<object>,IEnumerable<object>> GetLabDipDeclare(int UnitId,string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@UnitId", UnitId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@FromDate", FromDate, DbType.String, ParameterDirection.Input);
            parameters.Add("@ToDate", ToDate, DbType.String, ParameterDirection.Input);

            return DatabaseHub.MultiQuery<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_AllLabDipDeclare]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public  IEnumerable<object> CheckLabDip(string LabDipNo)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LDNo", LabDipNo, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_CheckLabDipNo]",
                parameters: parameters,
                dbName: DyeingDB);
        }



        public IEnumerable<object> SaveLabDipDeclare(List<LabBookingReceiveDto> model)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LabDipDeclare", model.AsTableValuedParameter("dbo.Tvp_LabDipDeclare", new[]
                    {"LabReceivedId","DeclareUnitId","LabStartDate","LabDipBookingNo","LDNo","UserId","UserIp"}));

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabDipDeclare]", parameters: parameters,dbName: DyeingDB);
        }
    }
}