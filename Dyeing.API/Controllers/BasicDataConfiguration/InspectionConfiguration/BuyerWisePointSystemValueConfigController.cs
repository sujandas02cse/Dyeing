using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.BuyerWisePointSystemValueConfigModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class BuyerWisePointSystemValueConfigController : ApiController
    {
        CommonModel.Response _res;
        [HttpPost]
        public IHttpActionResult BuyerWisePointSystemValue_SaveUpdate(BuyerWisePointSystemValueConfig _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BuyerWisePointSystemValueConfigModel().BuyerWisePointSystemValue_SaveUpdate(_obj);
                if (queryData == 0)
                {
                    if (_obj.BuyerWPointNo == 0) _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;
                _res.ProofValue = queryData;
                if (_obj.BuyerWPointNo == 0) _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.BuyerWPointNo == 0) _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult GetBuyerWisePointSystemValueData(int buyerId, int pointSystemNo)
        {
            try
            {
                var queryData = new BuyerWisePointSystemValueConfigModel().GetBuyerWisePointSystemValue(buyerId, pointSystemNo);

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
