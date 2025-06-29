using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchReprocessConfigModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchReprocessConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDatabyUnit(string UnitNo)
        {
            try
            {
                var queryData = await new BatchReprocessConfigModel().GetBatchDatabyUnit(UnitNo);

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
        public async Task<IHttpActionResult> GetRollDatabyBatch(string BpmId)
        {
            try
            {
                var queryData = await new BatchReprocessConfigModel().GetRollDatabyBatch(BpmId);

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
        public IHttpActionResult BatchReprocessData_SaveUpdate(BatchRprocessWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchReprocessConfigModel().InsertBulkData(_obj);
                if (queryData == 0)
                {
                    if (_obj.UserId == "" || _obj.UserId == null) _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Duplicate Data....";
                    return Ok(_res);
                }

                _res.response = true;

                if (queryData > 0) _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.UserId == "" || _obj.UserId == null) _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
    }
}
