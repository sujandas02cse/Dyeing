using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration.PointValueRangeModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.InspectionConfiguration
{
    public class PointValueRangeController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetPointHeadName()
        {
            try
            {
                var queryData = await new PointValueRangeModel().GetPointHeadName();

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
        public async Task<IHttpActionResult> GetPointValueRangeMInfo()
        {
            try
            {
                var queryData = await new PointValueRangeModel().GetPointValueRangeMInfo();

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
        public async Task<IHttpActionResult> DeletePointVal(string PointValueNo, string UserId)
        {
            try
            {
                var queryData = await new PointValueRangeModel().Delete(PointValueNo, UserId);
                if (queryData == 0)
                {
                    _res.Msg = "Point value range Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Point value range Deleted Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Msg = "Point value range Not Deleted....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        
        [HttpPost]
        public async Task<IHttpActionResult> PointValueRange_SaveUpdate(PointValueRangeM _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new PointValueRangeModel().PointValueRange_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.PointValueNo == "0") _res.Msg = "Point Value Range Configuration Data Not Saved....";
                    else _res.Msg = "Point Value Range Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.PointValueNo == "0")
                    {
                        _res.Msg = "Point Value Range Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Point Value Range Configuration Data Updated Successfully....";
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