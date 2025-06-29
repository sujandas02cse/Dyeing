using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration.GSMNameModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class GSMNameController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetGSMNameInfo()
        {
            try
            {
                var queryData = await new GSMNameModel().GetGSMNameInfo();

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
        public async Task<IHttpActionResult> GSMName_SaveUpdate(GSMNameM _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new GSMNameModel().GSMName_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.GsmId == "0") _res.Msg = "GSM Name Configuration Data Not Saved....";
                    else _res.Msg = "GSM Name Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.GsmId == "0")
                    {
                        _res.Msg = "GSM Name Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "GSM Name Configuration Data Updated Successfully....";
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
    }
}