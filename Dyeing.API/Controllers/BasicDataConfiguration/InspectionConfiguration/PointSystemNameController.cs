using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.PointSystemNameModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class PointSystemNameConfigController: ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetPointSystemNameInfo()
        {
            try
            {
                var queryData = await new PointSystemNameModel().GetPointSystemNameInfo();

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
        public async Task<IHttpActionResult> PointSystemName_SaveUpdate(PointSystemNameM _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new PointSystemNameModel().PointSystemName_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.PointSystemNo == "0") _res.Msg = "Point System Name Configuration Data Not Saved....";
                    else _res.Msg = "Point System Name Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.PointSystemNo == "0")
                    {
                        _res.Msg = "Point System Name Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Point System Name Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> Delete(PointSystemNameM model)
        {           
            try
            {
                var queryData = await new PointSystemNameModel().Delete(model);

                if (queryData == 0)
                {
                    _res.ErrorMsg = "No Point System Name Deleted...";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Point System Name Deleted Successfully....";
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