using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipApprovalModel : Base
    {
        public class LabDipApprovalData
        {
            public int LabReceiveId { get; set; }
            public int OpTime { get; set; }
            public string ApprovalStatus { get; set; }
            public string ApprovedOption { get; set; }
            public string RejectReason { get; set; }
            public string ApproveDate { get; set; }
        }
        public class LabDipSubmissionDataWrapper
        {
            public List<LabDipApprovalData> labDipApprovalDatas { get; set; }
            public string UserId { get; set; }
        }

        public IEnumerable<object> GetBuyerAllApproved(string UserId)
        {
            //var parameters = new DynamicParameters();

            //parameters.Add("@UserId", UserId, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_AllBuyerLabDipApproval]",
                dbName: DyeingDB);
        }

        public IEnumerable<object> GetLabDipApprovalDatabyBuyer(int BuyerId)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@BuyerId", BuyerId, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipApprovalDataByBuyer]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> GetLabDipApprovalData(int BuyerId, string JobInfo, string Style, string Color, string LabDipBooking)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@BuyerId", BuyerId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@JobInfo", JobInfo, DbType.String, ParameterDirection.Input);
            parameters.Add("@Style", Style, DbType.String, ParameterDirection.Input);
            parameters.Add("@Color", Color, DbType.String, ParameterDirection.Input);
            parameters.Add("@LabDipBookingNo", LabDipBooking, DbType.String, ParameterDirection.Input);
            //parameters.Add("@OpTime", OpTime, DbType.Int32, ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipApprovalData]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> SaveUpdateLabDipApprovalData(LabDipSubmissionDataWrapper model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", model.UserId , DbType.Int32, ParameterDirection.Input);
            parameters.Add("@tvp_LabDipApproval", model.labDipApprovalDatas.AsTableValuedParameter("dbo.tvp_LabDipApproval", new[]
                {"LabReceiveId","ApprovalStatus","ApprovedOption","RejectReason","OpTime","ApproveDate"
                }));

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabDipApproval]", parameters: parameters,dbName: DyeingDB);
        }
    }
}