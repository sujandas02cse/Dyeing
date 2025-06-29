using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.PointHeadModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class PointHeadController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> PointHeadInfo_Get()
        {
            try
            {
                var queryData = await new PointHeadModel().PointHeadInfo_Get();

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
        public async Task<IHttpActionResult> PointHead_SaveUpdate(PointHead _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new PointHeadModel().PointHead_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.PHeadNo == "0") _res.Msg = "Point Head Configuration Data Not Saved....";
                    else _res.Msg = "Point Head Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.PHeadNo == "0")
                    {
                        _res.Msg = "Point Head Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Point Head Configuration Data Updated Successfully....";
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
        [HttpGet]
        public IHttpActionResult checkExisting(string name, string criteria)
        {
            try
            {
                var queryData = new PointHeadModel().checkExisting(name, criteria);

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
        public async Task<IHttpActionResult> Delete(string PHeadNo, string UserId)
        {
            try
            {
                var queryData = await new PointHeadModel().Delete(PHeadNo, UserId);
                if (queryData == 0)
                {
                    _res.Msg = "Point Head Configuration Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Point Head Configuration Deleted Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Msg = "Point Head Configuration Not Deleted....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
    }
}