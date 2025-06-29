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
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.FaultNameConfigModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class FaultNameConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetFaultName(int HeadId)
        {
            try
            {
                var queryData = await new FaultNameConfigModel().GetFaultName(HeadId);

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
        public async Task<IHttpActionResult> SaveUpdate(FaultNameConfig _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new FaultNameConfigModel().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.NameID == 0) _res.Msg = "Fault Name Data Not Saved....";
                    else _res.Msg = "Fault Name Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.NameID == 0) _res.Msg = "Fault Name Data Saved Successfully....";
                else _res.Msg = "Fault Name Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpPost]
        public async Task<IHttpActionResult> Delete(string NameID, string UserId)
        {
            try
            {
                var queryData = await new FaultNameConfigModel().Delete(NameID, UserId);
                if (queryData == 0)
                {
                    _res.Msg = "Fault Name Configuration Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Fault Name Configuration Deleted Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Msg = "Fault Head Configuration Not Deleted....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpGet]
        public IHttpActionResult checkExisting(string name, string criteria)
        {
            try
            {
                var queryData = new FaultNameConfigModel().checkExisting(name, criteria);

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
