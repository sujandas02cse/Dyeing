using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.FinBatchConfig;

namespace Dyeing.API.Controllers
{
    public class FinBatchConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public IHttpActionResult GetDDLFinishingBatch(string Info)
        {
            try
            {
                var queryData = new FinBatchConfig().GetDDLFinishingBatch(Info);

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
        public IHttpActionResult GetDPSpecification(string DiaPartName)
        {
            try
            {
                var queryData = new FinBatchConfig().GetDPSpecification(DiaPartName);

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
        public IHttpActionResult GetMachineProductionPlanData(int MppmId)
        {
            try
            {
                var queryData = new FinBatchConfig().GetMachineProductionPlanData(MppmId);

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
        public IHttpActionResult FinishingBatch_SaveUpdate(FinishingBatchData _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new FinBatchConfig().FinishingBatch_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.FinBatchHId == "0") _res.Msg = "Configuration Data Not Saved....";
                    else _res.Msg = "Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.FinBatchHId == "0")
                        _res.Msg = "Finishing Batch Configuration Data Saved Successfully....";
                   else
                        _res.Msg = "Finishing Batch Configuration Data Updated Successfully....";
                    
                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpGet]
        public IHttpActionResult GetFinBatchData(int MppmId)
        {
            try
            {
                var queryData = new FinBatchConfig().GetFinBatchData(MppmId);

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
