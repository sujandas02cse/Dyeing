using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Dyeing.API.Models.DashboardManagement;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;

namespace Dyeing.API.Controllers.DashboardManagement
{
    public class DashboardController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> GetPackingListData(int unitId, string fromDate, string toDate,int flag)
        {
            try
            {
                var queryData = await new DashboardModel().GetPackingListData(unitId, fromDate, toDate,flag);

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


        #region DashBoard Floor Status
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDataForFloorStatus(int UnitId,DateTime FromDate,DateTime Todate)
        {
            var FirstDate = FromDate.Date;
            var LastDate = Todate.AddDays(1).Date.AddMilliseconds(-1);
            try
            {
                var queryData = await new DashboardModel().GetBatchDataFloorStatus(UnitId,FirstDate,LastDate);
                //var data = queryData["Item1"];
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
        #endregion


        #region DashBoard Floor Status Sample
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDataForFloorStatusSample(int UnitId, DateTime FromDate, DateTime Todate)
        {
            var FirstDate = FromDate.Date;
            var LastDate = Todate.AddDays(1).Date.AddMilliseconds(-1);
            try
            {
                var queryData = await new DashboardModel().GetBatchDataFloorStatusSample(UnitId, FirstDate, LastDate);
                //var data = queryData["Item1"];
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
        #endregion


        #region Priority Set
        [HttpGet]
        public async Task<IHttpActionResult> GetDataForPrioritySet(int UnitId, int MachineNo)
        {
            try
            {
                var queryData = await new DashboardModel().GetPrioritySet(UnitId,MachineNo);
                //var data = queryData["Item1"];

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
        #endregion

        [HttpGet]
        public async Task<IHttpActionResult> GetPackingListDataNew(int unitId, string fromDate, string toDate, int flag)
        {
            try
            {
                var queryData = await new DashboardModel().GetPackingListDataNew(unitId, fromDate, toDate, flag);

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

        #region DashBoard Floor Status New
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDataForFloorStatusNew(int UnitId, DateTime FromDate, DateTime Todate)
        {
            var FirstDate = FromDate.Date;
            var LastDate = Todate.AddDays(1).Date.AddMilliseconds(-1);
            try
            {
                var queryData = await new DashboardModel().GetBatchDataFloorStatusNew(UnitId, FirstDate, LastDate);
                //var data = queryData["Item1"];
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
        #endregion


    }
}
