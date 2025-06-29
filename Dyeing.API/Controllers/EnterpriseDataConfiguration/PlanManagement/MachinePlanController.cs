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
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.MachinePlanModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class MachinePlanController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetMachinePlanData(int UnitId,int BuyerId)
        {
            try
            {

                var queryData = await new MachinePlanModel().GetMachinePlanData(UnitId,BuyerId);

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
        public async Task<IHttpActionResult> GetBatchPlanByGuid(int UniqueId,int ComId)
        {
            try
            {

                var queryData = await new MachinePlanModel().GetBatchPlanByGuid(UniqueId,ComId);

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
        public IHttpActionResult SaveUpdate(MachinePlanWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new MachinePlanModel().SaveUpdate(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Machine data not updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    //_res.Data = queryData.BatchNo;

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
