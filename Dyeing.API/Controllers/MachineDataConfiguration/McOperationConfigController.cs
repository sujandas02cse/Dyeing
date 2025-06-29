using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using Dyeing.API.Models.MachineDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using System.Threading.Tasks;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchConfigurationFinishModel;

namespace Dyeing.API.Controllers.MachineDataConfiguration
{
    public class McOperationConfigController : ApiController
    {
        CommonModel.Response _res;

        [HttpPost]
        public async Task<IHttpActionResult> SaveUpdate(McOperationConfigDataModel _obj) 
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new McOperationConfigModel().McOpConfiguration_SaveUpdate(_obj);
                _res.response = true;
                _res.ProofValue = queryData;
                _res.Msg = "Data Saved Successfully....";

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

        [HttpPost]
        public async Task<IHttpActionResult> SaveUpdateNew(McOperationConfigDataModel _obj, string status)
        {
            _res = new CommonModel.Response();
            object queryData = null;
            try
            {
                if (status == "old" || status=="Bulk")
                {
                    queryData = new McOperationConfigModel().McOpConfiguration_SaveUpdate(_obj);
                }
                else
                {
                    queryData = new McOperationConfigModel().McOpConfiguration_SaveUpdateNew(_obj);
                }

                _res.response = true;
                _res.ProofValue = queryData;
                _res.Msg = "Data Saved Successfully....";

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
        public async Task<IHttpActionResult> GetBatchRelatedData(int batchId, int compTime, string operation)  
        {
            try
            {
                var queryData =  new McOperationConfigModel().GetBatchRelatedData(batchId, compTime, operation);

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
        public async Task<IHttpActionResult> GetBatchRelatedDataNew(int batchId, int compTime, string operation,string status)
        {
            try
            {
                object queryData = null; 

                if (status == "old" || status=="Bulk")
                {
                     queryData = new McOperationConfigModel().GetBatchRelatedData(batchId, compTime, operation);
                }
                else
                {
                    queryData = new McOperationConfigModel().GetBatchRelatedDataNew(batchId, compTime, operation);
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
        
        
        [HttpGet]
        public IHttpActionResult GetBatchNoListUnitStatusWise(string status,int unit)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetBatchNoListUnitStatusWise(status,unit);

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
        public IHttpActionResult GetFinMcByTypeUnitWise(string Type,string unit)
        {
            try
            {
               // var queryData = new CommonModel().GetFinMcByType(Type);

                var queryData = new McOperationConfigModel().GetFinMcByTypeUnitWise(Type, unit);

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
