using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Runtime.Remoting;
using static Dyeing.API.Models.ProductionPrioritySetModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.ProductionPlanConfiguration
{
    public class ProductionPrioritySetController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();


        [HttpGet]
        public async Task<IHttpActionResult> GetMachineName(string UserId)
        {
            try
            {
                var queryData = await new ProductionPrioritySetModel().GetMachineName(UserId);

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
        public async Task<IHttpActionResult> GetProdPrioritySetDetails(string MDId)
        {
            try
            {
                var queryData = await new ProductionPrioritySetModel().GetProdPrioritySetDetails(MDId);

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
        public async Task<IHttpActionResult> ProductionPriority_SaveUpdate(List<ProductionPrioritySet> obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new ProductionPrioritySetModel().ProductionPriority_SaveUpdate(obj);

                if (queryData == 0)
                {
                    //if (obj[0].PpscId == "0") _res.Msg = "Production Priority Configuration Data Not Saved....";
                    //else _res.Msg = "Production Priority Configuration Data Not Updated....";
                    //return Ok(_res);

                    _res.Msg = "Production Priority Configuration Data Not Saved....";                    
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    //if (obj[0].PpscId == "0")
                    //{
                    //    _res.Msg = "Production Priority Configuration Data Saved Successfully....";
                    //}
                    //else
                    //{
                    //    _res.Msg = "Production Priority Configuration Data Updated Successfully....";
                    //}
                    _res.Msg = "Production Priority Configuration Data Saved Successfully....";
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