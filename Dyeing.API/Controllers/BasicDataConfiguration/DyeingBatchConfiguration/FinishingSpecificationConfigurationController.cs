using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.FinishingSpecificationConfigurationModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class FinishingSpecificationConfigurationController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> Get_SpecificationConfig()
        {
            try
            {
                var queryData = await new FinishingSpecificationConfigurationModel().Get_SpecificationConfig();

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
        public async Task<IHttpActionResult> SpecificationConfig_SaveUpdate(SpecificationConfig _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new FinishingSpecificationConfigurationModel().SpecificationConfig_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.FbscId == "0") _res.Msg = "Finishing Specification Configuration Data Not Saved....";
                    else _res.Msg = "Finishing Specification Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.FbscId == "0")
                    {
                        _res.Msg = "Finishing Specification Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Finishing Specification Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> SpecificationConfig_Delete(string FbscId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new FinishingSpecificationConfigurationModel().SpecificationConfig_Delete(FbscId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Finishing Specification Configuration Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Finishing Specification Configuration Data Deleted Successfully....";
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
