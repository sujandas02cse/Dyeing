using Dapper;
using Dyeing.API.DBInfo;
using Dyeing.API.Models.FabricDataConfiguration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.FabricDataConfiguration.BarcodeConfigModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class BarcodeConfigController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetBarcodeInfo(Int64 BarcodeNumber)
        {
            try
            {
                var queryData = new BarcodeConfigModel().GetBarcodeInfo(BarcodeNumber);

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
        public async Task<IHttpActionResult> LoadUnitNo()
        {
            try
            {
                var queryData = await new BarcodeConfigModel().LoadUnitNo();

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
        public async Task<IHttpActionResult> LoadReasonDDL()
        {
            try
            {
                var queryData = await new BarcodeConfigModel().LoadReasonDDL();

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

        // Issue List
        [HttpGet]
        public async Task<IHttpActionResult> LoadIssueList(int UnitId, string FromDate, string ToDate)
        {
            try
            {
                var queryData = await new BarcodeConfigModel().LoadIssue(UnitId, FromDate, ToDate);

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

        // Heat Set Issue data List
        [HttpGet]
        public async Task<IHttpActionResult> LoadHeatSetIssueList(int UnitId, string FromDate, string ToDate, string IssueNo)
        {
            try
            {
                var queryData = await new BarcodeConfigModel().LoadHeatSetIssue(UnitId, FromDate, ToDate, IssueNo);

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
        public IHttpActionResult Save(BarcodeConfigModel model)
        {
            try
            {
                var queryData = new BarcodeConfigModel().SaveBarcode(model);

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
        // Issue Save
        [HttpPost]
        public IHttpActionResult IssueSave(List<AfterHeatSetWeightModify> model)
        {
            try
            {
                var queryData = new BarcodeConfigModel().IssueSave(model);

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
        public IHttpActionResult checkExisting(long id)
        {
            try
            {
                var queryData = new BarcodeConfigModel().checkExisting(id);

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
        public IHttpActionResult getPartialWeight(long id)
        {
            try
            {
                var queryData = new BarcodeConfigModel().getPartialWeight(id);

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
