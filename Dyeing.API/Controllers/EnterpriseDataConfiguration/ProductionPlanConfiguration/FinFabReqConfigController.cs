using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration.FinFabReqConfigModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.ProductionPlanConfiguration
{
    public class FinFabReqConfigController : ApiController
    {
        CommonModel.Response _res;

        [HttpPost]
        public IHttpActionResult FinFabReqConfig_SaveUpdate(FinFabReqConfigMaster _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new FinFabReqConfigModel().FinFabReqConfig_SaveUpdate(_obj);
                if (queryData == 0)
                {
                    if (_obj.FfrmId == 0) _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;
                _res.ProofValue = queryData;
                if (_obj.FfrmId == 0) _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.FfrmId == 0) _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult GetFinFabReqConfigData(int LoadingType, int BuyerId, int JobId, int StyleId, int OrderId, string ShipmentDate)
        {
            try
            {
                var queryData =  new FinFabReqConfigModel().GetFinFabReqConfig( LoadingType,  BuyerId,  JobId,  StyleId,  OrderId,  ShipmentDate);

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
