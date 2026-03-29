using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LightSourceEnlishmentModel;
using static Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp.LightSourceEnlishmentModel.LightSourceModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.LabBasicSetUp
{
    public class LightSourceController : ApiController
    {

        // ================= GET ALL =================
        [HttpGet]
        public IHttpActionResult GetAllLightSource()
        {
            try
            {
                var queryData = new LightSourceModel().GetAllLightSource();

                if (queryData == null)
                {
                    return InternalServerError(new ServerException("Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }


        // ================= SAVE / UPDATE =================
        [HttpPost]
        public IHttpActionResult SaveUpdateLightSource(LightSource obj)
        {
            try
            {
                var queryData = new LightSourceModel().SaveUpdateLightSource(obj);

                if (queryData == null)
                {
                    return InternalServerError(
                        new ServerException("Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }


        // ================= DELETE =================
        [HttpPost]
        public IHttpActionResult DeleteLightSource(int Id, string UserId)
        {
            try
            {
                var queryData = new LightSourceModel().DeleteLightSource(Id, UserId);

                if (queryData == null)
                {
                    return InternalServerError( new ServerException("Database server temporarily unavailable."));
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
