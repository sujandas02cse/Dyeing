using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration.OperationSectionModel;

namespace Dyeing.API.Controllers
{
    public class OperationSectionController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetSectionInfo_Get()
        {
            try
            {
                var queryData = await new OperationSectionModel().GetSectionInfo_Get();

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
        public async Task<IHttpActionResult> OperationSection_SaveUpdate(OperationSection _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new OperationSectionModel().OperationSection_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.OscId == "0") _res.Msg = "Operation Section Configuration Data Not Saved....";
                    else _res.Msg = "Operation Section Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.OscId == "0")
                    {
                        _res.Msg = "Operation Section Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Operation Section Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> OperationSection_Delete(string OscId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new OperationSectionModel().OperationSection_Delete(OscId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Operation Section Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Operation Section Data Deleted Successfully....";
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
