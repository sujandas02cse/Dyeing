using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipSubmissionModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipSubmissionController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetBuyerAll(string UserId)
        {
            try
            {
                var queryData = new LabDipSubmissionModel().GetBuyerAll(UserId);

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
        public IHttpActionResult GetLabDipSubmissionDatabyBuyer(int BuyerId)
        {
            try
            {
                var queryData = new LabDipSubmissionModel().GetLabDipSubmissionDatabyBuyer(BuyerId);

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
        public IHttpActionResult GetLabDipSubmissionData(int BuyerId,string JobInfo,string Style,string Color,string LabDipBooking,int OpTime)
        {
            try
            {
                var queryData = new LabDipSubmissionModel().GetLabDipSubmissionData(BuyerId,JobInfo,Style,Color,LabDipBooking,OpTime);

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
        public IHttpActionResult SaveUpdateLabDipSubmissionData(LabDipSubmissionDataWrapper model)
        {
            try
            {
                var result = new LabDipSubmissionModel().SaveUpdateLabDipSubmissionData(model);
                if (result == null)
                {
                    return InternalServerError(
                        new Exception("Database server temporarily unavailable."));
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
