using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.ActualQuantityUpdateModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class ActualQuantityUpdateController : ApiController
    {
        //Get all batch which was not hanovered
        [HttpGet]
        public IHttpActionResult GetBatchDataWithoutHandover(int BpmId)
        {
            try
            {

                var queryData =  new ActualQuantityUpdateModel().GetBatchDataWithoutHandover(BpmId);

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


        [HttpPost]
        public IHttpActionResult SaveUpdate(ActualQuantityRequest actualQuantityRequest)
        {
            try
            {
                var queryData = new ActualQuantityUpdateModel().SaveUpdateActualQuantity(actualQuantityRequest);

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
