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
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.FaultHeadConfigModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class FaultHeadConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetFaultHead()
        {
            try
            {
                var queryData = await new FaultHeadConfigModel().GetFaultHeadConfig();

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
        public async Task<IHttpActionResult> SaveUpdate(FaultHeadConfig _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new FaultHeadConfigModel().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.HeadID == 0) _res.Msg = "Fault Head Configuration Data Not Saved....";
                    else _res.Msg = "Fault Head Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.HeadID == 0)
                    {
                        _res.Msg = "Fault Head Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Fault Head Configuration Data Updated Successfully....";
                    }
                    return Ok(_res);
                }

            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpPost]
        public async Task<IHttpActionResult> Delete(string HeadID, string UserId)
        {
            try
            {
                var queryData = await new FaultHeadConfigModel().Delete(HeadID, UserId);
                if (queryData == 0)
                {
                    _res.Msg = "Fault Head Configuration Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Fault Head Configuration Deleted Successfully....";
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
                var queryData = new FaultHeadConfigModel().checkExisting(name, criteria);

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
