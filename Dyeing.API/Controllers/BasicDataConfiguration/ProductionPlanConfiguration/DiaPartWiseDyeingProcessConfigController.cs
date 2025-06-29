using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.DiaPartWiseDyeingProcessConfigModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.ProductionPlanConfiguration
{
    public class DiaPartWiseDyeingProcessConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetDiaPartName()
        {
            try
            {
                var queryData = await new DiaPartWiseDyeingProcessConfigModel().GetDiaPartName();

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
        public async Task<IHttpActionResult> DyeingProcessFlow_Get()
        {
            try
            {
                var queryData = await new DiaPartWiseDyeingProcessConfigModel().DyeingProcessFlow_Get();

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
        public async Task<IHttpActionResult> sp_Get_ProcessByDiaPart(string DiaPartName)
        {
            try
            {
                var queryData = await new DiaPartWiseDyeingProcessConfigModel().sp_Get_ProcessByDiaPart(DiaPartName);

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
        public IHttpActionResult DiaPartConfig_SaveUpdate(DiaPartMaster _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new DiaPartWiseDyeingProcessConfigModel().DiaPartConfig_SaveUpdate(_obj);
                if (queryData == 0)
                {
                    if (_obj.Mode == "Save") _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;

                if (_obj.Mode == "Save") _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.Mode == "Save") _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

    }
}
