using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipApprovalModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipApprovalController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetBuyerAllApproved(string UserId)
        {
            try
            {
                var queryData = new LabDipApprovalModel().GetBuyerAllApproved(UserId);

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
        public IHttpActionResult GetLabDipApprovalDatabyBuyer(int BuyerId)
        {
            try
            {
                var queryData = new LabDipApprovalModel().GetLabDipApprovalDatabyBuyer(BuyerId);

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
        public IHttpActionResult GetLabDipApprovalData(int BuyerId,string JobInfo,string Style,string Color,string LabDipBooking)
        {
            try
            {
                var queryData = new LabDipApprovalModel().GetLabDipApprovalData(BuyerId,JobInfo,Style,Color,LabDipBooking);

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
        public IHttpActionResult SaveUpdateLabDipApprovalData(LabDipSubmissionDataWrapper model)
        {
            try
            {
                var result = new LabDipApprovalModel().SaveUpdateLabDipApprovalData(model);
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
