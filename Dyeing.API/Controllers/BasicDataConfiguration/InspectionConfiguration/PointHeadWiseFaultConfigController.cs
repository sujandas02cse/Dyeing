using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.PointHeadWiseFaultConfigModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class PointHeadWiseFaultConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetPointHead()
        {
            try
            {
                var queryData = await new PointHeadWiseFaultConfigModel().GetPointHead();

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
        public async Task<IHttpActionResult> GetFaultName(int PheadId)
        {
            try
            {
                var queryData = await new PointHeadWiseFaultConfigModel().GetPointHead(PheadId);

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
        public async Task<IHttpActionResult> SaveUpdate(PointHeadWiseFaultConfig _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new PointHeadWiseFaultConfigModel().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.HFaultNo == 0) _res.Msg = "Point Head wise Fault Config Not Saved....";
                    else _res.Msg = "Point Head wise Fault Config Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.HFaultNo == 0) _res.Msg = "Point Head wise Fault Config Saved Successfully....";
                else _res.Msg = "Point Head wise Fault Config Updated Successfully....";
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
