using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.BatchPlanModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class BatchPlanController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchPlanData(int UnitId,int BuyerId)
        {
            try
            {
                var queryData = await new BatchPlanModel().GetBatchPlanData(UnitId,BuyerId);

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
        public async Task<IHttpActionResult> GetBodyPart()
        {
            try
            {
                var queryData = await new BatchPlanModel().GetBodyPart();

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
        public async Task<IHttpActionResult> GenBatchNoByJob(int UnitId, int JobId, int NoOfBatch, int PrevTBatch,int Change)
        {
            try
            {
                var queryData = await new BatchPlanModel().GenBatchNoByJob(UnitId, JobId, NoOfBatch, PrevTBatch,Change);

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
        public async Task<IHttpActionResult> GetBatchPlanDataByInitInfo(List<BatchPlanInitInfoId> obj,string Comb,int JobId)
        {
            try
            {
                var queryData = await new BatchPlanModel().GetBatchPlanDataByInitInfoId(obj,Comb,JobId);

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
        public IHttpActionResult SaveUpdate(BatchPlanWrapper _obj)
        {
            _obj.plan = _obj.plan.Where(x => x.GroupNo != 0).ToList();
            _obj.plan = _obj.plan.Where(x => x.MPUniqueId != 1).ToList();
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchPlanModel().SaveUpdate(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Batch Plan not updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;                    

                    _res.Msg = "Data saved successfully...";
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
