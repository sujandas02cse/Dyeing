using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using System.Runtime.Remoting;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchToBatchRollTransferController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

   
        [HttpPost]
        public async Task<IHttpActionResult> Transfer([FromBody] List<BatchToBatchRollTransferModel.BatchRollTransferObj> BatchRollTransferObjList)
        {
            _res = new CommonModel.Response();
            try
            {
               
                var queryData = await new BatchToBatchRollTransferModel().Transfer(BatchRollTransferObjList);
                if (queryData == 0)
                {
                    _res.Msg = "Pls Try again.";
                    return Ok(_res);
                }

                else
                {
                    _res.response = true;
                    _res.Msg = "Roll Transfered Successfully....";
                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        [System.Web.Http.HttpGet]
        public async Task<IHttpActionResult> DestinationMaxCompactingTime(string DestinationBpmId)
        {
            try
            {
                var queryData = await new BatchToBatchRollTransferModel().DestinationMaxCompactingTime(Convert.ToInt32(DestinationBpmId));

             
                return Ok(queryData);
            }
            catch (Exception exception)
            {

                return InternalServerError(exception: exception);
            }
        }







    }
}