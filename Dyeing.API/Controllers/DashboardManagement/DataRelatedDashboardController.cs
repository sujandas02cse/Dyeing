using Dyeing.API.Models.DashboardManagement;

using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.DashboardManagement.DataRelatedDashboardModel;

namespace Dyeing.API.Controllers.DashboardManagement
{
    public class DataRelatedDashboardController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchNo()
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchNo();

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
        public IHttpActionResult GetBatchProcessingData(int unitId, string fromDate, string toDate)
        {
            try
            {
                List<BatchProcessing> batchProcessing = new DataRelatedDashboardModel().GetBatchProcessingData(unitId, fromDate, toDate);
                //for(int i=0; i< batchProcessing.Count(); i++)
                //{
                //    batchProcessing[i].fabric = new List<ItemFabric>();
                //    List<ItemFabric> itemFabrics = new List<ItemFabric>();
                //    itemFabrics= new DataRelatedDashboardModel().GetFabricData(batchProcessing[i].BuyerId, batchProcessing[i].JobId, batchProcessing[i].StyleId, batchProcessing[i].BuyerReferenceId);
                //    //ItemFabric fabric = new ItemFabric()
                //    //{
                //    //    ItemFabId = 1,
                //    //    FabricSpec = "Test Fab"
                //    //};

                //    batchProcessing[i].fabric=itemFabrics;
                //}

                //List<BatchProcessing> batchProcessing = (List<BatchProcessing>)queryData;

                if (batchProcessing == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(batchProcessing);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardData(int unitId, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardData(unitId, fromDate, toDate);

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
        public async Task<IHttpActionResult> GetBatchCardDataSample(int unitId,string fromDate,string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataSample(unitId,fromDate,toDate);

                if (queryData == null)
                {
                    return InternalServerError(exception:new ServerException(message: "Database server temporarily unavailable."));
                }
                return Ok(queryData);
            }
            catch (Exception exception)
            {

                return InternalServerError(exception: exception);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetStyleOrderData(int unitId, int buyerId, int jobId, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetStyleOrderData(unitId, buyerId, jobId, fromDate, toDate);

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
        public async Task<IHttpActionResult> GetBatchCardMaster(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardMaster(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardDetail(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDetail(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardFinishing(int BpmId)
        {
            try
            {
                var queryData = await new  DataRelatedDashboardModel().GetBatchCardFinishing(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetDyeingProcess(int BpmId)
        {
            try
            {
                var queryData = await new  DataRelatedDashboardModel().GetDyeingProcess(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetNozzleData(int BpmId)
        {
            try
            {
                var queryData = await new  DataRelatedDashboardModel().GetNozzleData(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetFinishingReceipe(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetFinishingReceipe(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetKnittingSpec(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetKnittingSpec(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetPlanData(string UnitId, string FromDate, string ToDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetProductionPlanDashboard(UnitId, FromDate, ToDate);

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
        public async Task<IHttpActionResult> GetMasterData(int UnitId, DateTime Fromdate, DateTime Todate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetDyeingMasterDataForDisplay(UnitId, Fromdate, Todate);

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

        //Batch Card New
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchPrepMaster(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchPrepMaster(BpmId);
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

        //Batch Card New
        [HttpGet]
        public async Task<IHttpActionResult> GetSampleBatchPrepMaster(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSampleBatchPrepMaster(BpmId);
             
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
        public async Task<IHttpActionResult> GetBatchSpecData(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchSpecData(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetTrolleyNozzle(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetTrolleyNozzle(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetBuyerByUnit(int UnitId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBuyerByUnit(UnitId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetJobByBuyer(int BuyerId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetJobByBuyer(BuyerId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchOperationData(int unitId, int buyerId, int jobId, string fromDate, string toDate, int bpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchOperationData(unitId, buyerId, jobId, fromDate, toDate, bpmId);

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
        public async Task<IHttpActionResult> GetPackingListData(int Id)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetPackingListData(Id);
               
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
        public async Task<IHttpActionResult> GetPackingListDataSample(int Id)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetPackingListDataSample(Id);

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
        public async Task<IHttpActionResult> GetSwatchCardData(int BpmId, int RUnitId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSwatchCardData(BpmId, RUnitId);

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


        #region Reprocess Start

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchReprocessSpecData(int BpmId, int ReprocessNo)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchReprocessSpecData(BpmId, ReprocessNo);
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

        public async Task<IHttpActionResult> GetBatchReprocessPrepMaster(int BpmId, int ReprocessNo)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchReprocessPrepMaster(BpmId, ReprocessNo);
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


        # region batch card v2 start
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchPrepareMaster(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchPrepareMaster(BpmId);
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
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchPrepareDetail(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchPrepareDetail(BpmId);
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

        #region batch card v2 dashboard
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardDataV2(int unitId, string mode, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataV2(unitId, mode, fromDate, toDate);

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


        #region batch card v2 new 13.6.2024

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardMasterNewV2(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardMasterNew(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardDataNewV2(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataNew(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardSpecificationNewV2(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardSpecificationNew(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetTrolleyNozzleNew(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetTrolleyNozzleNew(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchCardProcessFlowNewV2(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetProcessFlowData(BpmId);

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
        public async Task<IHttpActionResult> GetBatchCardOthersFlowNewV2(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetOthersFlowData(BpmId);

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


        #region SampleBatchCardReport

        [HttpGet]
        public async Task<IHttpActionResult> GetSampleBatchPrepMasterReport(int BpmId)
        {

            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSampleBatchPrepMasterReport(BpmId);

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
        public async Task<IHttpActionResult> GetSampleBatchPrepMasterDetailsReport(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSampleBatchPrepMasterDetailsReport(BpmId);
                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }
                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception:exception);
            }

        }

        [HttpGet]
        public async Task<IHttpActionResult> GetSampleBatchCardSpecification(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSampleBatchCardSpecification(BpmId);

                if (queryData == null)
                {
                    return InternalServerError(exception:new ServerException(message: "Database server temporarily unavailable."));
                }
                return Ok(queryData);
            }
            catch (Exception exception)
            {

                return InternalServerError(exception:exception);
            }
        }

        public async Task<IHttpActionResult> GetSampleSwatchCardData(int BpmId, int RUnitId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetSampleSwatchCardData(BpmId, RUnitId);

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
        public async Task<IHttpActionResult> GetBatchCardDataV2Sample(int unitId, string mode, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataV2Sample(unitId, mode, fromDate, toDate);

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

        #region Batch Card New Process
        [HttpGet]
        public async Task<IHttpActionResult> GetNewProcessBatchCardMaster(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardMasterNewProcess(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetNewProcessBatchCardData(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataNewProcess(BpmId);
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

        [HttpGet]
        public async Task<IHttpActionResult> GetNewProcessBatchCardSpecification(int BpmId)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardSpecificationNewProcess(BpmId);
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
        public async Task<IHttpActionResult> GetPackingListDataAuto(int Id)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetPackingListDataAuto(Id);

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
        public async Task<IHttpActionResult> GetBatchCardDataNewBulk(int unitId, string fromDate, string toDate)
        {
            try
            {
               var queryData = await new DataRelatedDashboardModel().GetBatchCardDataNewBulk(unitId, fromDate, toDate);
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
        public async Task<IHttpActionResult> GetBatchCardDataV2NewBulk(int unitId, string mode, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataV2NewBulk(unitId, mode, fromDate, toDate);

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
        public async Task<IHttpActionResult> GetBatchCardDataBeforeIssue(int unitId, string fromDate, string toDate)
        {
            try
            {
                 var queryData = await new DataRelatedDashboardModel().GetBatchCardDataBeforeIssue(unitId, fromDate, toDate);
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
        public async Task<IHttpActionResult> GetBatchCardDataAfterIssue(int unitId, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new DataRelatedDashboardModel().GetBatchCardDataAfterIssue(unitId, fromDate, toDate);
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
        public async Task<IHttpActionResult> GetSwatchCardDataNewBulk(int BpmId, int RUnitId)
        {
            try
            {
               // var queryData = await new DataRelatedDashboardModel().GetSwatchCardData(BpmId, RUnitId);

                var queryData = await new DataRelatedDashboardModel().GetSwatchCardDataNewBulk(BpmId, RUnitId);

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


        #region Dynamic Production Monitoring
        public async Task<IHttpActionResult> GetDynamicProductionMonitor(int UnitId,int BuildingId,string Date,string FabricIssue)
        {
            try
            {
                // var queryData = await new DataRelatedDashboardModel().GetSwatchCardData(BpmId, RUnitId);

                var queryData = await new DataRelatedDashboardModel().GetDynamicMonitoring(UnitId, BuildingId, Date,FabricIssue);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }
                // Notify clients to refresh
                //var hubContext = GlobalHost.ConnectionManager.GetHubContext<ProductionHub>();
                //hubContext.Clients.All.refreshProductionData(UnitId, Date, FabricIssue);

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
