using Dyeing.API.Models;
using Dyeing.API.Models.FabricDataConfiguration.InventoryOperation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting;
using System.Web;
using System.Web.Http;
using System.Threading.Tasks;
using static Dyeing.API.Models.FabricDataConfiguration.InventoryOperation.WashReceiveIssueInventoryModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration.InventoryOperation
{
    public class WashReceiveIssueInventoryController: ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();


        [HttpGet]
        public async Task<IHttpActionResult> GetTrackingNo()
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetTrackingNo();

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
        public async Task<IHttpActionResult> GetBuyer()
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetBuyer();

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
        public async Task<IHttpActionResult> GetJob(string BuyerId)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetJob(BuyerId);

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
        public async Task<IHttpActionResult> GetOrder(string BuyerId, string JobNo)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetOrder(BuyerId, JobNo);

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
        public async Task<IHttpActionResult> GetColor(string BuyerId, string JobNo,string OrderNo)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetColor(BuyerId, JobNo, OrderNo);

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
        public async Task<IHttpActionResult> GetDataInfo(string TrackingNo)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetDataInfo(TrackingNo);

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
        public async Task<IHttpActionResult> GetDataInfoOth(string BuyerId, string JobId, string OrderId, string ColorId)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetDataInfoOth(BuyerId, JobId, OrderId, ColorId);

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
        public async Task<IHttpActionResult> GetUnitId(string TrackingNo)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetUnitId(TrackingNo);

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
        public async Task<IHttpActionResult> GetUnitIdOth(string BuyerId, string JobId, string OrderId, string ColorId)
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetUnitIdOth(BuyerId, JobId, OrderId, ColorId);

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
        public async Task<IHttpActionResult> GetDispatchList()
        {
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().GetDispatchList();

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
        public async Task<IHttpActionResult> Dispatch_SaveUpdate(List<DispatchData> master)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().Dispatch_SaveUpdate(master);

                if (queryData == 0)
                {
                    _res.Msg = "Wash Receive & Issue Inventory Dispatch Data Not Saved....";                    
                    return Ok(_res);
                }
                else
                {                    
                    _res.Msg = "Wash Receive & Issue Inventory Dispatch Data Processed Successfully....";                   
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
        public async Task<IHttpActionResult> WashReceiveIssueInventory_SaveUpdate(DyeingReceiveIssueMaster master)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new WashReceiveIssueInventoryModel().WashReceiveIssueInventory_SaveUpdate(master);

                if (queryData == 0)
                {
                    _res.Msg = "Wash Receive & Issue Inventory Data Not Saved....";
                    return Ok(_res);
                }
                else
                {
                    _res.Msg = "Wash Receive & Issue Inventory Data Processed Successfully....";
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