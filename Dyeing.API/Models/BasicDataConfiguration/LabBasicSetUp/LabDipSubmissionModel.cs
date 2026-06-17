using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipSubmissionModel : Base
    {
        public class LabDipSubmissionData
        {
            public int LabReceiveId { get; set; }
            public string LabDipBookingNo { get; set; }
            public string RequiredSubmissionDate { get; set; }
            public string PreviousSubmissionDate { get; set; }
            public int OpTime { get; set; }
        }
        public class LabDipSubmissionDataWrapper
        {
            public List<LabDipSubmissionData> labDipSubmissionDatas { get; set; }
            public string UserId { get; set; }
        }

        public IEnumerable<object> GetBuyerAll(string UserId)
        {
            //var parameters = new DynamicParameters();

            //parameters.Add("@UserId", UserId, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_AllBuyerLabDipPermission]",
                dbName: DyeingDB);
        }

        public IEnumerable<object> GetLabDipSubmissionDatabyBuyer(int BuyerId)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@BuyerId", BuyerId, DbType.String, ParameterDirection.Input);

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipSubmissionDataByBuyer]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public Tuple<IEnumerable<object>, IEnumerable<object>> GetLabDipSubmissionData(int BuyerId, string JobInfo, string Style, string Color, string LabDipBooking, int OpTime)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@BuyerId", BuyerId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@JobInfo", JobInfo, DbType.String, ParameterDirection.Input);
            parameters.Add("@Style", Style, DbType.String, ParameterDirection.Input);
            parameters.Add("@Color", Color, DbType.String, ParameterDirection.Input);
            parameters.Add("@LabDipBookingNo", LabDipBooking, DbType.String, ParameterDirection.Input);
            parameters.Add("@OpTime", OpTime, DbType.Int32, ParameterDirection.Input);


            return DatabaseHub.MultiQuery<object,object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipPSubmissionData]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> SaveUpdateLabDipSubmissionData(LabDipSubmissionDataWrapper model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", model.UserId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@tvp_LabDipSubmission", model.labDipSubmissionDatas.AsTableValuedParameter("dbo.tvp_LabDipSubmission", new[]
                {"LabReceiveId","LabDipBookingNo","RequiredSubmissionDate","PreviousSubmissionDate","OpTime"
                }));

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabDipSubmission]", parameters: parameters, dbName: DyeingDB);
        }

        //public IEnumerable<object> SaveUpdateLabDipSubmissionData(LabDipSubmissionData model,string UserId)
        //{
        //    var parameters = new DynamicParameters();
        //    parameters.Add("@UserId", UserId, DbType.Int32, ParameterDirection.Input);
        //    parameters.Add("@LabReceiveId", model.LabReceiveId, DbType.Int32, ParameterDirection.Input);
        //    parameters.Add("@LabDipBookingNo", model.LabDipBookingNo, DbType.String, ParameterDirection.Input);
        //    parameters.Add("@RequiredSubmissionDate", model.RequiredSubmissionDate, DbType.String, ParameterDirection.Input);
        //    parameters.Add("@PreviousSubmissionDate", model.PreviousSubmissionDate, DbType.String, ParameterDirection.Input);
        //    parameters.Add("@OpTime", model.OpTime, DbType.Int32, ParameterDirection.Input);

        //    return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_LabDipSubmission]", parameters: parameters, dbName: DyeingDB);
        //}


    }
}