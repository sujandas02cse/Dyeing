using Dyeing.API.Models;
using Dyeing.API.Models.MachineDataConfiguration;
using System;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineDataConfiguration.McOperationConfigNewModel;

namespace Dyeing.API.Controllers.MachineDataConfiguration
{
    
    public class McOperationConfigNewController : ApiController
    {
        CommonModel.Response _res;

        [HttpGet]
        public IHttpActionResult McOperationConfigGetDataNew(string status, int BpmId, int compTime, string batchType)
        {
            try
            {
                object queryData = null;

                if (batchType == "old" || batchType == "Bulk")
                {
                    //queryData = new McOperationConfigModel..GetBatchNoListUnitStatusWise(status, unit);
                }
                else
                {
                    queryData = new McOperationConfigNewModel().NewMachineConfigOperationGetData(status, BpmId, compTime, batchType);
                }
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
        public IHttpActionResult McOperationConfigSaveUpdateNew(McOperationConfigNewDataModel _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new McOperationConfigNewModel().NewMachineConfigOperation_SaveUpdate(_obj);
                _res.response = true;
                _res.ProofValue = queryData;

                return Ok(_res);
            }
            catch (Exception e)
            {
                _res.Msg = " Data Not Saved....";
                //_res.Msg = " Data Not Updated....";
                _res.ErrorMsg = e.Message;
                return InternalServerError(exception: e);
            }
        }
    }
}