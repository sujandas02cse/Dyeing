using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.TestRequestFormModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class TestRequestFormController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetRnDBookingDetails()
        {
            try
            {
                var queryData = new TestRequestFormModel().GetRnDBookingDetails();

                if (queryData == null)
                {
                    return InternalServerError(
                        new Exception("Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
        [HttpGet]
        public IHttpActionResult GetTestRequestForm(string userCode)
        {
            try
            {
                var queryData = new TestRequestFormModel().GetTestRequestFormData();

                if (queryData == null)
                {
                    return InternalServerError(
                        new Exception("Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPost]
        public IHttpActionResult SaveUpdateTestRequestForm(SaveTestSummaryRequest saveTestSummaryRequest)
        {
            try
            {
                var queryData = new TestRequestFormModel().SaveUpdateRnDBookingDetails(saveTestSummaryRequest);

                if (queryData == null)
                {
                    return InternalServerError(
                        new Exception("Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }
    }
}
