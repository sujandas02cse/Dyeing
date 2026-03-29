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
using static Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration.DataConfigurationModel;

namespace Dyeing.API.Controllers.BasicDataConfiguration.OperationDataConfiguration
{
    public class DataConfigurationController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetBatchDataByUnit(int UnitId, string BatchType)
        {
            try
            {

                var queryData = await new DataConfigurationModel().GetBatchDatabyBathcType(UnitId, BatchType);

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
        public async Task<IHttpActionResult> GetDataConfigurationForBatch(int Bpmid)
        {
            try
            {

                var queryData = await new DataConfigurationModel().GetDataConfigurationForBatch(Bpmid);

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
        public async Task<IHttpActionResult> SaveUpdateDataConfiguration(ConfigurationSaveUpdate configurationSaveUpdate)
        {
            try
            {

                var queryData = await new DataConfigurationModel().SaveUpdateDataConfiguration(configurationSaveUpdate);

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
