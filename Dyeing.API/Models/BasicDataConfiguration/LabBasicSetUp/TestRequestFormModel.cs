using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{

    public class TestRequestFormModel : Base
    {
        public class TestSummaryTestRequestFormMaster
        {
            public long Id { get; set; }
            public long RnDBookingId { get; set; }
            public string CreatedBy { get; set; }
        }
        public class TestSummaryTestRequestFormDetails
        {
            public long ConfigurationId { get; set; }
            public string Result { get; set; } // P or F
            public string TestResult { get; set; }
        }
        public class SaveTestSummaryRequest
        {
            public long RnDBookingId { get; set; }
            public string LotNo { get; set; }
            public string InputDate { get; set; }
            public string UserId { get; set; }

            public List<TestSummaryTestRequestFormDetails> Details { get; set; }
        }
        public IEnumerable<object> GetRnDBookingDetails()
        {
            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_RnDBookingDetails]",
                dbName: DyeingDB);
        }
        public Tuple<IEnumerable<object>, IEnumerable<object>,IEnumerable<object>> GetTestRequestFormData()
        {
            return DatabaseHub.MultiQuery<object,object,object>(
                storedProcedureName: @"[dbo].[usp_Get_TestRequestFormData]",
                dbName: DyeingDB);
        }
        public object SaveUpdateRnDBookingDetails(SaveTestSummaryRequest obj)
        {
            var data = new
            {
                RnDBookingId = obj.RnDBookingId,
                LotNo = obj.LotNo,
                InputDate = obj.InputDate,
                CreatedBy = obj.UserId,
                Details = obj.Details.AsTableValuedParameter("dbo.tvp_TestSummaryTestRequestFormDetailsType", new[] { "ConfigurationId", "Result","TestResult" })
            };

            return DatabaseHub.Query<object, object>(
                storedProcedureName: "[dbo].[usp_SaveUpdate_TestSummaryTestRequestForm]",
                model: data,
                dbName: DyeingDB
            ).ToList();
        }
    }
}