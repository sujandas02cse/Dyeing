using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipInternalApprovedModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipInternalApprovedController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetLabDipInternalApproved(int UnitId,string FromDate, string ToDate)
        {
            try
            {
                var queryData = new LabDipInternalApprovedModel().GetLabDipInternalApproved(UnitId,FromDate, ToDate);

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
        public IHttpActionResult SaveUpdateLabDipInternalApproved(List<LabDipInternalApproved> model)
        {
            try
            {
                var result = new LabDipInternalApprovedModel().SaveUpdateLabDipInternalApproved(model);
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
