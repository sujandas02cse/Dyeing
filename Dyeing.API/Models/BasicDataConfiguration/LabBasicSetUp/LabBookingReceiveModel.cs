using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabBookingReceiveModel : Base
    {
        public class LabBookingReceiveDto
        {
            public int ReceiveUnitId { get; set; }
            public string ReceiveDate { get; set; }
            public int LabDipRequestMasterId { get; set; }
            public int LabDipRequestDetailsId { get; set; }
            public string LabDipBookingNo { get; set; }
            public string BookingDate { get; set; }
            public string RequiredSubmissionDate { get; set; }
            public string Remarks { get; set; }
            public string UserId { get; set; }
            public string UserIp { get; set; }
        }

        public Tuple<IEnumerable<object>,IEnumerable<object>> GetLabBookingReceive(int UnitId,string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@UnitId", UnitId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@FromDate", FromDate, DbType.String, ParameterDirection.Input);
            parameters.Add("@ToDate", ToDate, DbType.String, ParameterDirection.Input);

            return DatabaseHub.MultiQuery<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_AllLabBookingReceive]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> SaveLabBookingReceive(List<LabBookingReceiveDto> model)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LabBookingReceive",model.AsTableValuedParameter("dbo.Tvp_LabBookingReceive",new[]
                    {"ReceiveUnitId","ReceiveDate","LabDipRequestMasterId","LabDipRequestDetailsId","LabDipBookingNo","BookingDate","RequiredSubmissionDate","Remarks","UserId","UserIp"}));

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabBookingReceive]",parameters: parameters,dbName: DyeingDB);
        }
    }
}