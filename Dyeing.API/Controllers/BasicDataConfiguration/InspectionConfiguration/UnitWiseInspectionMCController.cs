using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.UnitWiseInspectionMCModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class UnitWiseInspectionMCController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetUnitName()
        {
            try
            {
                var queryData = await new UnitWiseInspectionMCModel().GetUnitName();

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
        public async Task<IHttpActionResult> GetUnitWiseInspectionMCInfo()
        {
            try
            {
                var queryData = await new UnitWiseInspectionMCModel().GetUnitWiseInspectionMCInfo();

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
        public async Task<IHttpActionResult> UnitWiseInspectionMCInfo_SaveUpdate(UnitWiseInspectionMCM _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new UnitWiseInspectionMCModel().UnitWiseInspectionMCInfo_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.UimId == "0") _res.Msg = "Unit Wise Inspection M/C Configuration Data Not Saved....";
                    else _res.Msg = "Unit Wise Inspection M/C Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.UimId == "0")
                    {
                        _res.Msg = "Unit Wise Inspection M/C Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Unit Wise Inspection M/C Configuration Data Updated Successfully....";
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
        public IHttpActionResult Delete(UnitWiseInspectionMCM model)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new UnitWiseInspectionMCModel().Delete(model);

                if (queryData == 0)
                {
                    _res.ErrorMsg = "No Inspection Machine Deleted...";
                    return Ok(_res);
                }
                _res.Msg = "Unit Inspection Machine Deleted Successfully....";
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