using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipDeclareModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipDeclareController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetLabDipDeclare(int UnitId,string FromDate, string ToDate)
        {
            try
            {
                var queryData = new LabDipDeclareModel().GetLabDipDeclare(UnitId,FromDate, ToDate);

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
        public IHttpActionResult CheckLabDip(string labDipNo)
        {
            try
            {
                var queryData = new LabDipDeclareModel().CheckLabDip(labDipNo);

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
        public IHttpActionResult SaveUpdateLabDipDeclare(List<LabBookingReceiveDto> model)
        {
            try
            {
                var result = new LabDipDeclareModel().SaveLabDipDeclare(model);
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
