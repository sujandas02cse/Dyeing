using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration.ProductionPlanReviseReasonModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.ProductionPlanConfiguration
{
    public class ProductionPlanReviseReasonController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> ProdPlanReviseReasonInfo_Get()
        {
            try
            {
                var queryData = await new ProductionPlanReviseReasonModel().ProdPlanReviseReasonInfo_Get();

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
        public async Task<IHttpActionResult> ProdPlanReviseReason_SaveUpdate(ProductionPlanReviseReason _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new ProductionPlanReviseReasonModel().ProdPlanReviseReason_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.PprrId == "0") _res.Msg = "Production Plan Revise Reason Data Not Saved....";
                    else _res.Msg = "Production Plan Revise Reason Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.PprrId == "0")
                    {
                        _res.Msg = "Production Plan Revise Reason Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Production Plan Revise Reason Data Updated Successfully....";
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
        public async Task<IHttpActionResult> ProdPlanReviseReason_Delete(string PprrId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new ProductionPlanReviseReasonModel().ProdPlanReviseReason_Delete(PprrId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Production Plan Revise Reason Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Production Plan Revise Reason Data Deleted Successfully....";
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