using Dyeing.API.Models;
using Dyeing.API.Models.ProductionPlanConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.ProductionPlanConfig.MachineProductionPlanChange;

namespace Dyeing.API.Controllers.ProductionPlanConfig
{
    public class MachineProductionPlanChangeController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetPlanNo()
        {
            try
            {
                var queryData = await new MachineProductionPlanChange().GetPlanNo();

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
        public async Task<IHttpActionResult> GetBatchNo()
        {
            try
            {
                var queryData = await new MachineProductionPlanChange().GetBatchNo();

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
        public async Task<IHttpActionResult> GetPlanInfo(int MppmId)
        {
            try
            {
                var queryData = await new MachineProductionPlanChange().GetPlanInfo(MppmId);

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
        public async Task<IHttpActionResult> GetToMcNo(string userid)
        {
            try
            {
                var queryData = await new MachineProductionPlanChange().GetToMcNo(userid);

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
        public async Task<IHttpActionResult> SaveUpdate(MachineProductionPlanChangeModel _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineProductionPlanChange().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MppchId == 0) _res.Msg = "Machine Production plan has been changed....";
                    else _res.Msg = "Problem in changing machine production plan....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.MppchId == 0) _res.Msg = "Machine Production plan has been changed....";
                else _res.Msg = "Problem in changing machine production plan....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }

        }
    }
}
