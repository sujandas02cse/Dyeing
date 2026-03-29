using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.DyeingFollowUpModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class DyeingFollowUpController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllBuyerInfoForDyeingFollowUp()
        {
            try
            {
                var queryData = new DyeingFollowUpModel().AllBuyerInfoForDyeingFollowUp();

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
        public IHttpActionResult GetJobInfoForDyeingFollowUp(int BuyerId)
        {
            try
            {
                var queryData = new DyeingFollowUpModel().JobInfoForDyeingFollowUp(BuyerId);

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
        public IHttpActionResult GetStyleInfoForDyeingFollowUp(int BuyerId, int JobId)
        {
            try
            {
                var queryData = new DyeingFollowUpModel().StyleInfoForDyeingFollowUp(BuyerId,JobId);

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
        public IHttpActionResult GetOrderInfoForDyeingFollowUp(int BuyerId, int JobId, int StyleId)
        {
            try
            {
                var queryData = new DyeingFollowUpModel().OrderInfoForDyeingFollowUp(BuyerId, JobId, StyleId);

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
        public IHttpActionResult GetDetailsInfoForDyeingFollowUp(int BuyerId, int JobId, int StyleId,int OrderId)
        {
            try
            {
                var queryData = new DyeingFollowUpModel().DetailsInfoForDyeingFollowUp(BuyerId, JobId, StyleId, OrderId);

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
        public IHttpActionResult SaveUpdateDyeingFollowUp(List<DetailDataDyeingFollowUp> detailDataDyeingFollowUp,string UserId )
        {
            try
            {
                var queryData = new DyeingFollowUpModel().SaveUpdateDetailData(detailDataDyeingFollowUp,UserId);

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
