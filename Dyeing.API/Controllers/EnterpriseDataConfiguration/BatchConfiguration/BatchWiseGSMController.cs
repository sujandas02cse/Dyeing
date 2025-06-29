using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchWiseGSMModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchWiseGSMController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchNo()
        {
            try
            {
                var queryData = await new BatchWiseGSMModel().GetBatchNo();

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
        public async Task<IHttpActionResult> GetAGSM()
        {
            try
            {
                var queryData = await new BatchWiseGSMModel().GetAGSM();

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
        public IHttpActionResult GetBatchWiseGSMInfo(int BpmId, int CompTime)
        {
            try
            {
                var queryData =  new BatchWiseGSMModel().GetBatchWiseGSMInfo(BpmId, CompTime);

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
        public async Task<IHttpActionResult> GetBatchWiseGSMDetailsInfo(int BpmId, int CompTime)
        {
            try
            {
                var queryData = await new BatchWiseGSMModel().GetBatchWiseGSMDetailsInfo(BpmId, CompTime);

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
        public IHttpActionResult GetStepNo(int BarcodeId, int BpmId, int RollNo)
        {
            try
            {
                var queryData =  new BatchWiseGSMModel().GetStepNo(BarcodeId, BpmId, RollNo);

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
        public IHttpActionResult getUpdateValue(int BgcId)
        {
            try
            {
                var queryData = new BatchWiseGSMModel().getUpdateValue(BgcId);

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
        public async Task<IHttpActionResult> BatchWiseGSM_SaveUpdate(BatchGSMWrapper batchGSM)
        {
            _res = new CommonModel.Response();
            try
            {
                var a = Json(batchGSM);
                var queryData = await new BatchWiseGSMModel().BatchWiseGSM_SaveUpdate(batchGSM);
                if (queryData == 0)
                { 
                    _res.Msg = "Batch Wise GSM Configuration Data Not Saved....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Msg = "Batch Wise GSM Configuration Data Processed Successfully....";
                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        // Updated by Sujan Das on 13-Jan-2025
        // to distinguish between old and new Batch Information

        [HttpGet]
        public IHttpActionResult GetBatchWiseGSMInfoNew(int BpmId, int CompTime)
        {
            try
            {
                var queryData = new BatchWiseGSMModel().GetBatchWiseGSMInfoNew(BpmId, CompTime);

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
        public async Task<IHttpActionResult> GetBatchWiseGSMDetailsInfoNew(int BpmId, int CompTime)
        {
            try
            {
                var queryData = await new BatchWiseGSMModel().GetBatchWiseGSMDetailsInfoNew(BpmId, CompTime);

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
        public async Task<IHttpActionResult> BatchWiseGSM_SaveUpdateNew(BatchGSMWrapper batchGSM)
        {
            _res = new CommonModel.Response();
            try
            {
                var a = Json(batchGSM);
                var queryData = await new BatchWiseGSMModel().BatchWiseGSM_SaveUpdateNew(batchGSM);
                if (queryData == 0)
                {
                    _res.Msg = "Batch Wise GSM Configuration Data Not Saved....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Msg = "Batch Wise GSM Configuration Data Processed Successfully....";
                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

    }
}