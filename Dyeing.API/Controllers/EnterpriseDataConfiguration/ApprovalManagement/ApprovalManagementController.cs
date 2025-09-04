using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.ApprovalManagement;
using System;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.ApprovalManagement.ApprovalManagementModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.ApprovalManagement
{
    public class ApprovalManagementController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetBodyPartbyBatch(int BpmId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBodyPartbyBatchList(BpmId);
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
        public async Task<IHttpActionResult> GetApproveBatchData(int BpmId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchAprovalData(BpmId);
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
        public async Task<IHttpActionResult> GetShadeApproveBatchData(int BpmId,int ApprovalTime,int BSpecId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchShadeApprovalData(BpmId, ApprovalTime, BSpecId);
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
        public async Task<IHttpActionResult> GetRFDApproveBatchData(int BpmId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchRFDAprovalData(BpmId);
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
        public async Task<IHttpActionResult> GetFTSApproveBatchData(int BpmId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchFTSAprovalData(BpmId);
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
        public async Task<IHttpActionResult> GetCRApproveBatchList(int UnitId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchCRAprovaList(UnitId);
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

        public async Task<IHttpActionResult> GetAllApproveBatchData(int BpmId,string ApprovalType,int ApprovalTime)
        {
            try
            {
                var QueryData = await new ApprovalManagementModel().GetAllTypeBatchAprovalData(BpmId,ApprovalType,ApprovalTime);
                if(QueryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily Unavaiable"));
                }
                return Ok(QueryData);
            }
            catch (Exception exc)
            {
                return InternalServerError(exception: exc);
            }
        }


        [HttpPost]
        public async Task<IHttpActionResult> SaveOrUpdateBatchApproveData(ApproveModelMaster approveModelMaster)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().SaveOrUpdateBatchApproveData(approveModelMaster);
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
        public IHttpActionResult SaveUpdateShadeApprovalData(ShadeApproveModel shadeApproveModel)
        {
            try
            {
                var queryData = new ApprovalManagementModel().SaveUpdateShadeApproval(shadeApproveModel);
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
        public async Task<IHttpActionResult> SaveUpdateFTSApprovalData(FtsApproveModel ftsApproveModel)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().SaveOrUpdateFTSBatchApproveData(ftsApproveModel);
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
        public async Task<IHttpActionResult> SaveUpdateRFDApproval(RFDApproval obj)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().SaveUpdateRFDApproval(obj);
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
        public IHttpActionResult SaveUpdateCRApproval(CRApproveModel obj)
        {
            try
            {
                var queryData = new ApprovalManagementModel().SaveUpdateCRApproval(obj);
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
        public IHttpActionResult SaveUpdateCRSend(CRSendModel obj)
        {
            try
            {
                var queryData = new ApprovalManagementModel().SaveUpdateCRSend(obj);
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

        public async Task<IHttpActionResult> GetAllApproveBatchDataNew(int BpmId, string ApprovalType, int ApprovalTime)
        {
            try
            {
                var QueryData = await new ApprovalManagementModel().GetAllTypeBatchAprovalDataNew(BpmId, ApprovalType, ApprovalTime);
                if (QueryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily Unavaiable"));
                }
                return Ok(QueryData);
            }
            catch (Exception exc)
            {
                return InternalServerError(exception: exc);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> SaveOrUpdateBatchApproveDataNew(ApproveModelMaster approveModelMaster)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().SaveOrUpdateBatchApproveDataNew(approveModelMaster);
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
        public async Task<IHttpActionResult> GetBodyPartbyBatchNew(int BpmId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBodyPartbyBatchListNew(BpmId);
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
        public async Task<IHttpActionResult> GetShadeApproveBatchDataNew(int BpmId, int ApprovalTime, int BSpecId)
        {
            try
            {
                var queryData = await new ApprovalManagementModel().GetBatchShadeApprovalDataNew(BpmId, ApprovalTime, BSpecId);
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
        public IHttpActionResult SaveUpdateShadeApprovalDataNew(ShadeApproveModel shadeApproveModel)
        {
            try
            {
                var queryData = new ApprovalManagementModel().SaveUpdateShadeApprovalNew(shadeApproveModel);
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
        public async Task<IHttpActionResult> SaveUpdateRFDApprovalNew(RFDApproval obj)
        {
            try
            {
              
                var queryData = await new ApprovalManagementModel().SaveUpdateRFDApprovalNew(obj);
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
        public IHttpActionResult SaveUpdateCRApprovalNew(CRApproveModel obj)
        {
            try
            {
              //  var queryData = new ApprovalManagementModel().SaveUpdateCRApproval(obj);
                var queryData = new ApprovalManagementModel().SaveUpdateCRApprovalNew(obj);
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
        public IHttpActionResult SaveUpdateCRSendNew(CRSendModel obj)
        {
            try
            {
                
               var queryData = new ApprovalManagementModel().SaveUpdateCRSendNew(obj);
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
