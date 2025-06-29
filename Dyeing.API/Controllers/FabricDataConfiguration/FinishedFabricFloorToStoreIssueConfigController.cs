using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration;
using Dyeing.API.Models.FabricDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.FinishedFabricFloorToStoreIssueModel;

namespace Dyeing.API.Controllers
{
    public class FinishedFabricFloorToStoreIssueConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetUnitName()
        {
            try
            {
                var queryData = await new ProductionShiftModel().GetUnitName();

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
        public async Task<IHttpActionResult> getBarcodeQty(int barcode)
        {
            try
            {
                var queryData = await new FinishedFabricFloorToStoreIssueModel().getBarcodeQty(barcode);

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

        //[HttpPost]
        //public IHttpActionResult getAllFinishedData(List<BarcodeData> _obj)
        //{
        //    _res = new CommonModel.Response();
        //    try
        //    {
        //        var queryData = new FinishedFabricFloorToStoreIssueModel().getAllFinishedData(_obj);

        //        if (queryData == null)
        //        {
        //            return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
        //        }

        //        return Ok(queryData);
        //    }
        //    catch (Exception exception)
        //    {
        //        return InternalServerError(exception: exception);
        //    }

        //}


        [HttpPost]
        public IHttpActionResult getAllFinishedData(List<Barcode> _obj)
        {
            try
            {
                var queryData = new FinishedFabricFloorToStoreIssueModel().getAllFinishedData(_obj);

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
        public IHttpActionResult getAllFinishedDataOth(List<BarcodeOth> _obj)
        {
            try
            {
                var queryData = new FinishedFabricFloorToStoreIssueModel().getAllFinishedDataOth(_obj);

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
        public IHttpActionResult FinFabFlrToStoreIssue_SaveUpdate(FinishedFabricFloorToStoreIssueMaster _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new FinishedFabricFloorToStoreIssueModel().FinFabFlrToStoreIssue_SaveUpdate(_obj);


                if (queryData == 0)
                {

                    _res.Msg = "Finished Fabric Floor To Store Issue Configuration Data Not Saved....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Msg = "Finished Fabric Floor To Store Issue Configuration Data Processed Successfully....";
                    return Ok(_res);
                }


            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


    }
}