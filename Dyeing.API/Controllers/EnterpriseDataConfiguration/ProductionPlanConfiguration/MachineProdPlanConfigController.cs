using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineProdPlanConfigModel;

namespace Dyeing.API.Controllers.ProductionPlanConfig
{
    public class MachineProdPlanConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchNoAndPlanNo()
        {
            try
            {
                var queryData = await new MachineProdPlanConfigModel().GetBatchNoAndPlanNo();

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
        public IHttpActionResult MachineProdPlan_SaveUpdate(List<MachineProductionPlanForSave> _obj)
        {
            Response  _res = new Response();
            try
            {                
                var queryData = new MachineProdPlanConfigModel().MachineProdPlan_SaveUpdate(_obj);

                if (queryData == null)
                {                   
                    _res.Msg = "Production Plan Data Process Failed....";
                    return Ok(_res);
                }
                else
                {
                    string Msg = "";
                    string Mode = _obj[0].Mode;
                    if (Mode=="N")
                        _res.Msg = "The Generated New Plan No's are Following: "+ queryData.PlanNo;
                    else if(Mode=="R")
                        _res.Msg = "Plan Revised Successfully. The new Plan No# "+ queryData.PlanNo + ".";
                    else if (Mode == "H")
                        _res.Msg = "The Plan No# " + queryData.PlanNo + " Halt Successfully....";
                    else if (Mode == "U")
                        _res.Msg = "The Plan No# " + queryData.PlanNo + " Unhalt Successfully....";

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
        public async Task<IHttpActionResult> GetMachineProdPlanInfo(string MppmId)
        {
            try
            {
                var queryData = await new MachineProdPlanConfigModel().GetMachineProdPlanInfo(MppmId);

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
        public IHttpActionResult GetDropDataByBuyerId(int buyerId,int id, string info)
        {
            try
            {
                var queryData = new MachineProdPlanConfigModel().GetDropDataByBuyerId(buyerId, id, info);

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
        public async Task<IHttpActionResult> GetMasterDataPlan(int buyerId, int jobId,int styleId, int orderId)
        {
            try
            {
                var queryData = await new MachineProdPlanConfigModel().GetMasterDataPlan(buyerId, jobId, styleId, orderId);

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
        public async Task<IHttpActionResult> GetMachineNo(string unitId)
        {
            try
            {
                var queryData = await new MachineProdPlanConfigModel().GetMachineNo(unitId);

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
