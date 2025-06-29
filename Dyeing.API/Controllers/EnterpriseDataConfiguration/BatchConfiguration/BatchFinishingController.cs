using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchConfigurationFinishModel;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.DyeingBatchConfigFabricModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchFinishingController : ApiController
    {
        CommonModel.Response _res;

        [HttpPost]
        public IHttpActionResult BatchFinish_SaveUpdate(ObjectList _obj)  
        {
            _res = new CommonModel.Response();
            try
            {
               var queryData = new BatchConfigurationFinishModel().DyeingBatchConfigFinish_SaveUpdate(_obj);
                if (queryData == 0)
                {
                   _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;
                _res.ProofValue = queryData;
                //if (_obj.FabBatchMId == 0) _res.Msg = " Data Saved Successfully....";
                 _res.Msg = "Data Saved Successfully....";

                return Ok(_res);
            }
            catch (Exception ex)
            {
                 _res.Msg = " Data Not Saved....";
                 //_res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet] 
        public IHttpActionResult GetBatchConfigurationFinis(int batchId)
        {
            try
            {
                var queryData = new BatchConfigurationFinishModel().GetBatchConfigurationFinis(batchId);

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
        public IHttpActionResult GetBatchNoList(int batchId)
        {
            try
            {
                var queryData = new BatchConfigurationFinishModel().GetBatchNoList(batchId);

                if (queryData == null )
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
