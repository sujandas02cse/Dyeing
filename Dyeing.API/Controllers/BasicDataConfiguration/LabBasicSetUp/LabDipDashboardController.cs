using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipDashboardModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipDashboardController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetLabDipDashboardReceipe(int UnitId,string FromDate, string ToDate)
        {
            try
            {
                var queryData = new LabDipDashboardModel().GetLabDipDashboardReceipe(UnitId,FromDate, ToDate);

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
