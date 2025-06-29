using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration.TrolleyNoModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class TrolleyNoController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetUnitName()
        {
            try
            {
                var queryData = await new TrolleyNoModel().GetUnitName();

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
        public async Task<IHttpActionResult> GetTrolleyNoInfo()
        {
            try
            {
                var queryData = await new TrolleyNoModel().GetTrolleyNoInfo();

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
        public async Task<IHttpActionResult> TrolleyNoInfo_SaveUpdate(TrolleyNoM _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new TrolleyNoModel().TrolleyNoInfo_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.TncId == "0") _res.Msg = "Trolley No Configuration Data Not Saved....";
                    else _res.Msg = "Trolley No Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.TncId == "0")
                    {
                        _res.Msg = "Trolley No Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Trolley No Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> TrolleyNo_Delete(string TncId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new TrolleyNoModel().TrolleyNo_Delete(TncId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Trolley No Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Trolley No Data Deleted Successfully....";
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
