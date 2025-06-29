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
using static Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration.DyeingProcessFlowModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.ProductionPlanConfiguration
{
    public class DyeingProcessFlowController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> DyeingProcessFlowInfo_Get()
        {
            try
            {
                var queryData = await new DyeingProcessFlowModel().DyeingProcessFlowInfo_Get();

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
        public async Task<IHttpActionResult> DyeingProcessFlowInfoActive_Get()
        {
            try
            {
                var queryData = await new DyeingProcessFlowModel().DyeingProcessFlowInfoActive_Get();

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
        public async Task<IHttpActionResult> DyeingProcessFlow_SaveUpdate(DyeingProcessFlow _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new DyeingProcessFlowModel().DyeingProcessFlow_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.DpfcId == "0") _res.Msg = "Dyeing Process Flow Configuration Data Not Saved....";
                    else _res.Msg = "Dyeing Process Flow Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.DpfcId == "0")
                    {
                        _res.Msg = "Dyeing Process Flow Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Dyeing Process Flow Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> DyeingProcessFlow_Delete(string DpfcId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new DyeingProcessFlowModel().DyeingProcessFlow_Delete(DpfcId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Dyeing Process Flow Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Dyeing Process Flow Data Deleted Successfully....";
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