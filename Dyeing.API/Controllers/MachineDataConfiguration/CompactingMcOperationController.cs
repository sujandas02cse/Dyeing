using Dyeing.API.Models;
using Dyeing.API.Models.MachineDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;

namespace Dyeing.API.Controllers.MachineDataConfiguration
{
    public class CompactingMcOperationController : ApiController
    {
        CommonModel.Response _res;

        [HttpPost]
        public async Task<IHttpActionResult> SaveUpdate(CompactingMcOpModel _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new McOperationConfigModel().CompactingMcOperation_SaveUpdate(_obj);
                _res.response = true;
                _res.ProofValue = queryData;

                if (_obj.Id>0)
                {
                    _res.Msg = "Data Updated Successfully....";
                }

                else
                {
                    _res.Msg = "Data Saved Successfully....";
                }

                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Msg = " Data Not Saved....";
                //_res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult GetCompactingMcOpData(int batchId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetCompactingMcOpData(batchId);

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
        public IHttpActionResult GetBatchNoList(int batchId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetBatchNoList(batchId);

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
        public IHttpActionResult LoadAllData()
        {
            try
            {
                var queryData = new McOperationConfigModel().LoadAllData();

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
