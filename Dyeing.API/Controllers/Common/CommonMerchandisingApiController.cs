using Dyeing.API.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;

namespace Dyeing.API.Controllers.Common
{
    public class CommonMerchandisingApiController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllBuyers() 
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllBuyers();

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
        public IHttpActionResult GetAllBuyersMasterData()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllBuyersMasterData();


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
        public IHttpActionResult GetAllOrderByBuyerMasterData(int buyerId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllBuyersMasterData();


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
        public IHttpActionResult GetAllJobsByBuyer(int buyerId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllJobsByBuyer(buyerId);


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
        public IHttpActionResult GetAllStylesByBuyerAndJob(int buyerId, int jobNo)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllStylesByBuyerAndJob(buyerId, jobNo);


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
        public IHttpActionResult GetAllOrdersByBuyerJobAndStyle(int buyerId, int jobNo, int styleId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAllOrdersByBuyerJobAndStyle( buyerId, jobNo, styleId);


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
        public IHttpActionResult GetFabricsInfo(int loadingType, int buyerId, int jobNo, int styleId,int orderNo)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetFabricsInfo(loadingType, buyerId, jobNo, styleId, orderNo);


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
        public IHttpActionResult GetOFabricOperationData()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetOFabricOperationData();


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
        public IHttpActionResult GetBodyPartSetUp_All()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetBodyPartSetUp_All();

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
        public IHttpActionResult GetDressPart()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetDressPart();

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
        public IHttpActionResult GetFabricNameByPlanId(int MppmId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetFabricNameByPlanId(MppmId);

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
        public IHttpActionResult GetDiaInfoByFabric(int MppmId, int FabNameId, int DressPartId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetDiaInfoByFabric(MppmId, FabNameId, DressPartId);

                //if (queryData == null)
                //{
                //    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                //}
                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }
        }
        [HttpGet]
        public IHttpActionResult GetColorType()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetColorType();

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
        public IHttpActionResult GetColorShade()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetColorShade();

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
        public IHttpActionResult GetAOPBackground()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetAOPBackground();

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
        public IHttpActionResult GetFabric()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetFabric();

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
        public IHttpActionResult GetFabricByBuyer(int BuyerId, int OrderId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetFabricByBuyer(BuyerId, OrderId);

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
        public IHttpActionResult GetColorTypeSpec()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetColorTypeSpec();

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
        public IHttpActionResult GetPantonType()
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().GetPantonType();


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
        public IHttpActionResult SampleNotifications(int ModuleId)
        {
            try
            {
                var queryData = new CommonMerchandisingApiModel().SampleNotifications(ModuleId);


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
