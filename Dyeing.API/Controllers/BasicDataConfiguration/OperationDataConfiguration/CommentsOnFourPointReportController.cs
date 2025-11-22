using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration.CommentsOnFourPointReportModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.OperationDataConfiguration
{
    public class CommentsOnFourPointReportController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDataByUnit(int UnitId, string BatchType)
        {
            try
            {

                var queryData = await new CommentsOnFourPointReportModel().GetBatchDatabyBuyer(UnitId, BatchType);

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
        public async Task<IHttpActionResult> GetBatchDetailDataByBpm(int BpmId,string BatchType)
        {
            try
            {

                var queryData = await new CommentsOnFourPointReportModel().GetBatchDetailDatabyBpm(BpmId,BatchType);

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
        public async Task<IHttpActionResult> CommentDataSaveUpdate(SaveUpdateCommentData saveUpdateCommentData)
        {
            try
            {

                var queryData = await new CommentsOnFourPointReportModel().CommentData_SaveUpdate(saveUpdateCommentData);

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
        public async Task<IHttpActionResult> CommentDataDelete(int Id,string UserId)
        {
            try
            {

                var queryData = await new CommentsOnFourPointReportModel().CommentData_Delete(Id,UserId);

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
