using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.DiaPartWiseSpecConfigurationModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class DiaPartWiseSpecConfigurationController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> DiaPartForSpecification()
        {
            try
            {
                var queryData = await new DiaPartWiseSpecConfigurationModel().DiaPartForSpecification();

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
        public async Task<IHttpActionResult> NameofSpecification()
        {
            try
            {
                var queryData = await new DiaPartWiseSpecConfigurationModel().NameofSpecification();

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
        public async Task<IHttpActionResult> GetProcessNamebyDiaPart(string DiaPartName)
        {
            try
            {
                var queryData = await new DiaPartWiseSpecConfigurationModel().Get_ProcessByDiaPart(DiaPartName);

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
        public async Task<IHttpActionResult> GetSpecificByDiaProcess(string DiaPartName,string DpfcId)
        {
            try
            {
                var queryData = await new DiaPartWiseSpecConfigurationModel().GetSpecificByDiaProcess(DiaPartName, DpfcId);

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
        public IHttpActionResult DiaPartSpecificationConfig_SaveUpdate(DiaPartSpecificationMaster _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new DiaPartWiseSpecConfigurationModel().DiaPartSpecificationConfig_SaveUpdate(_obj);
                if (queryData == 0)
                {
                    if (_obj.DpsmId == "" || _obj.DpsmId == null) _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;

                if (_obj.DpsmId == "" || _obj.DpsmId == null) _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.DpsmId == "" || _obj.DpsmId == null)  _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
    }
}
