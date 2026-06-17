using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipInternalApprovedModel : Base
    {
        public class LabDipInternalApproved
        {
            public int LabReceivedId { get; set; }
            public int DeclareUnitId { get; set; }
            public string ApprovalDate { get; set; }
            public string ApprovalStatus { get; set; }
            public string ApprovedOption { get; set; }
            public string UserId { get; set; }
            public string UserIp { get; set; }
        }

        public Tuple<IEnumerable<object>,IEnumerable<object>> GetLabDipInternalApproved(int UnitId,string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@UnitId", UnitId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@FromDate", FromDate, DbType.String, ParameterDirection.Input);
            parameters.Add("@ToDate", ToDate, DbType.String, ParameterDirection.Input);

            return DatabaseHub.MultiQuery<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_AllLabDipInternalApproved]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> SaveUpdateLabDipInternalApproved(List<LabDipInternalApproved> model)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LabDipInternalApproved", model.AsTableValuedParameter("dbo.tvp_LabDipInternalApproved", new[]
                {"LabReceivedId","DeclareUnitId","ApprovalDate","ApprovalStatus","ApprovedOption","UserId"
                }));

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabDipInternalApproved]", parameters: parameters,dbName: DyeingDB);
        }
    }
}