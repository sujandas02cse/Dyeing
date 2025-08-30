using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.CommonModel;
using static Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration.MasterDataDisplayModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration
{
    public class MasterDataConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        
        [HttpPost]
        public IHttpActionResult MasterData_SaveUpdate(List<MasterDataModel> _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new MasterDataDisplayModel().MasterData_SaveUpdate(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Master Data Process Failed....";
                    return Ok(_res);
                }
                else
                {
                    string Msg = "";
                    string Mode = _obj[0].Mode;
                    if (Mode == "N")
                        _res.Msg = "Master Data Saved Successfully...";
                    else if (Mode == "R")
                        _res.Msg = "Master Data Modified Successfully....";                   

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
        public async Task<IHttpActionResult> GenNewFabric(NewFabric _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MasterDataDisplayModel().GenNewFabric(_obj);  
                return Ok(_res);                
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetDyeingMasterUnitData(string userCode)
        {

            try
            {
                var queryData = await new MasterDataDisplayModel().GetDyeingMasterUnitData(userCode);

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
        public async Task<IHttpActionResult> GetDyeingMasterData(int BuyerId, string JobId, string StyleId, string OrderId)
        {
            try
            {
                var queryData = await new MasterDataDisplayModel().GetDyeingMasterData(BuyerId, JobId, StyleId, OrderId);

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
        public IHttpActionResult GetDropDataByBuyerId(int buyerId, int id, string info)
        {
            try
            {
                var queryData = new MachineProdPlanConfigModel().GetDropDataByBuyerId(buyerId, id, info);

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
        public IHttpActionResult GetBuyerJobOrderForMasterData(int BuyerId, int Id, string Info, string Flag)
        {
            try
            {
                var queryData = new MasterDataDisplayModel().GetBuyerJobOrderForMasterData(BuyerId, Id, Info, Flag);

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
        public async Task<IHttpActionResult> GetUnitWithoutUser()
        {

            try
            {
               

                var queryData = await new MasterDataDisplayModel().GetUnitWithoutUser();

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

    }
}
