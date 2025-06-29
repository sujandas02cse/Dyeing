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
using static Dyeing.API.Models.ProductionPlanConfig.MachineProductionPlanCloseModel;

namespace Dyeing.API.Controllers.ProductionPlanConfig
{
    public class MachineProductionPlanCloseController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetPlanNo(int isActive)
        {
            try
            {
                var queryData = await new MachineProductionPlanCloseModel().GetPlanNo(isActive);

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
        public async Task<IHttpActionResult> GetBatchNo(int isActive)
        {
            try
            {
                var queryData = await new MachineProductionPlanCloseModel().GetBatchNo(isActive);

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
        public async Task<IHttpActionResult> SaveUpdate(MachineProductionPlanClose _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineProductionPlanCloseModel().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MppcloseId == 0) _res.Msg = "Machine Production plan has been closed....";
                    else _res.Msg = "Problem in closing machine production plan....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.MppcloseId == 0) _res.Msg = "Machine Production plan has been closed....";
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
