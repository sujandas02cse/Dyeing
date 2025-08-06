using Dyeing.API.Models;
using Dyeing.API.Models.FabricDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using static Dyeing.API.Models.FabricDataConfiguration.FinishedFabricHandoverToStoreModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinishedFabricHandoverToStoreController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [System.Web.Http.HttpGet]
        public async Task<IHttpActionResult> GetDataByTracking(string Id,string RollType,string UserId)
        {
            try
            {
                try
                {
                    var queryData = await new FinishedFabricHandoverToStoreModel().GetDataByTracking(Id,RollType,UserId);

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
            catch (Exception)
            {

                throw;
            }

        }

        [System.Web.Http.HttpPost]
        public async Task<IHttpActionResult> SaveUpdate(FinishedFabricHandoverToStoreList Obj)
        {
            try
            {
               
                    object queryData = null;


                    queryData = await Task.Run(() => new FinishedFabricHandoverToStoreModel().SaveUpdate(Obj));

                    if (queryData == null)
                    {
                        return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                    }

                    return Ok(queryData);
               
            }
            catch (Exception exp)
            {

                throw;
            }

        }

        [System.Web.Http.HttpGet]
        public async Task<IHttpActionResult> GetDataBySingleRoll(String SingleRollStickerNo)
        {
            try
            {
                try
                {
       
                    var queryData = await new FinishedFabricHandoverToStoreModel().GetDataBySingleRoll(SingleRollStickerNo);

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpPost]
       public async Task<IHttpActionResult> GetDataByMultiRoll(MultiStickerNoList payload)
    
        {
            try
            {
                try
                {
                    var queryData = await new FinishedFabricHandoverToStoreModel().GetDataByMultiRoll(payload);
             
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
            catch (Exception)
            {
                throw;
            }
        }
    }
}