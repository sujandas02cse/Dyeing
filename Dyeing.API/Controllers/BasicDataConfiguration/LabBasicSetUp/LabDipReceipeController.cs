using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LabDipReceipeModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipReceipeController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllLabDipBookingData()
        {
            try
            {
                var queryData = new LabDipReceipeModel().GetAllLabDipBookingData();

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
        public IHttpActionResult GetAllLabDipReceipeData(int LabReceiveId)
        {
            try
            {
                var queryData = new LabDipReceipeModel().GetLabDipReceipeCardData(LabReceiveId);

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
        public IHttpActionResult SaveUpdateLabDipReceipe(LabDipReceipe model)
        {
            try
            {
                var result = new LabDipReceipeModel().SaveLabDipDeclare(model);
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
