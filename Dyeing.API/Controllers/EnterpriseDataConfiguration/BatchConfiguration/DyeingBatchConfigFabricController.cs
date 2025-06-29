using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.DyeingBatchConfigFabricModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class DyeingBatchConfigFabricController : ApiController
    {
        CommonModel.Response _res;

        [HttpPost]
        public IHttpActionResult DyeingBatchConfigFabric_SaveUpdate(DyeingBatchConfigFabricMaster _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new DyeingBatchConfigFabricModel().DyeingBatchConfigFabric_SaveUpdate(_obj);
                if (queryData == 0)
                {
                    if (_obj.FabBatchMId == 0) _res.Msg = " Data Not Saved....";
                    else _res.Msg = " Data Not Updated....";
                    return Ok(_res);
                }

                _res.response = true;
                _res.ProofValue = queryData;
                if (_obj.FabBatchMId == 0) _res.Msg = " Data Saved Successfully....";
                else _res.Msg = "Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                if (_obj.FabBatchMId == 0) _res.Msg = " Data Not Saved....";
                else _res.Msg = " Data Not Updated....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult GetDyeingBatchConfigFabricData(int MppmId, string BatchDate)
        {
            try
            {
                var queryData = new DyeingBatchConfigFabricModel().GetDyeingBatchConfigFabricData(MppmId, BatchDate);

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
        public IHttpActionResult GetMachineProductionPlanDetail(int MppmId)
        {
            try
            {
                var queryData = new DyeingBatchConfigFabricModel().GetMachineProductionPlanDetail(MppmId);

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
        public IHttpActionResult GetDyeingFabricBarcodes(int MppmId, int ProcessMode)
        {
            try
            {
                var queryData = new DyeingBatchConfigFabricModel().GetDyeingFabricBarcodes(MppmId, ProcessMode);

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
        public IHttpActionResult GetDyeingFabricBarcodeDetails(BarcodeDataNozzle _obj)
        {
            try
            {
                var queryData = new DyeingBatchConfigFabricModel().GetDyeingFabricBarcodeDetails(_obj);

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
