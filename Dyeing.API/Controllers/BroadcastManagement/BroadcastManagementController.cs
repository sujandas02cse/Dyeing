using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;

namespace Dyeing.API.Controllers
{
    public class BroadcastManagementController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetReportInfo(string PageName, string UserId,string Flag)
        {
            try
            {
                var queryData = await new BroadcastMgtModel().GetReportInfo(PageName, UserId,Flag);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }
        [HttpGet]
        public async Task<IHttpActionResult> GetRptParam(string ReportingId)
        {
            try
            {
                var queryData = await new BroadcastMgtModel().GetRptParam(ReportingId);

                // Validate if ReportingId is a valid integer

                //if (!int.TryParse(ReportingId, out int validReportingId))
                //{
                //    return BadRequest("Invalid ReportingId. It must be a valid integer.");
                //}

                //var queryData = await new BroadcastMgtModel().GetRptParam(validReportingId.ToString());


                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }
                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetReportingData(string SQL, string rptParm)
        {
            try
            {
                var queryData = await new BroadcastMgtModel().GetReportingData(SQL, rptParm);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }

        [HttpGet]
        public async Task<IHttpActionResult> GetOrderByBuyerStyle(int buyerId, int jobId, int styleId)
        {
            try
            {
                var queryData = await new BroadcastMgtModel().GetOrderByStyleBuyer(buyerId, jobId, styleId);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetStyleByOrderBuyer(int buyerId, int jobId, int orderId)
        {
            try
            {
                var queryData = await new BroadcastMgtModel().GetStyleByOrderBuyer(buyerId, jobId, orderId);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }
        }
    }
}
