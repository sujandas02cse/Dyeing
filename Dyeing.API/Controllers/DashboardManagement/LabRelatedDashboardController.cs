using Dyeing.API.Models.DashboardManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp;

namespace Dyeing.API.Controllers.DashboardManagement
{
    public class LabRelatedDashboardController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> GetLabDipReceipeMasterData(int LabBookReceiveId)
        {
            try
            {
                var queryData = await new LabRelatedDashboardModel().GetLabDipReceipeMasterData(LabBookReceiveId);

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
