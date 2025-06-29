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
using static Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration.ProductionShiftModel;

namespace Dyeing.API.Controllers
{
    public class ProductionShiftController : ApiController
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
        public async Task<IHttpActionResult> GetShiftType()
        {
            try
            {
                var queryData = await new ProductionShiftModel().GetShiftType();

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
        public async Task<IHttpActionResult> GetSection()
        {
            try
            {
                var queryData = await new ProductionShiftModel().GetSection();

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
        public async Task<IHttpActionResult> GetShitTime(string ShiftTypeId)
        {
            try
            {
                var queryData = await new ProductionShiftModel().GetShitTime(ShiftTypeId);

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
        public async Task<IHttpActionResult> GetSelectedSection(string ShiftTypeId, string UnitId)
        {
            try
            {
                var queryData = await new ProductionShiftModel().GetSelectedSection(ShiftTypeId, UnitId);

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
        public async Task<IHttpActionResult> getCheckedShift(string UnitId, string ShiftTypeId, string OscId)
        {
            try
            {
                var queryData = await new ProductionShiftModel().getCheckedShift(UnitId, ShiftTypeId, OscId);

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
        public async Task<IHttpActionResult> ProductionShift_SaveUpdate(ProductionShiftMaster master)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new ProductionShiftModel().ProductionShift_SaveUpdate(master);

                if (queryData == 0)
                {
                    if (master.PsmId == "0") _res.Msg = "Production Shift Configuration Data Not Saved....";
                    else _res.Msg = "Production Shift Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (master.PsmId == "0")
                    {
                        _res.Msg = "Production Shift Configuration Data Saved Successfully....";
                    }
                    else
                    {
                        _res.Msg = "Production Shift Configuration Data Processed Successfully....";
                    }
                    return Ok(_res);
                }

            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        //[HttpGet]
        //public async Task<IHttpActionResult> OperationSection_Delete(string OscId, string UsetId)
        //{
        //    _res = new CommonModel.Response();
        //    try
        //    {
        //        var queryData = await new OperationSectionModel().OperationSection_Delete(OscId, UsetId);

        //        if (queryData == 0)
        //        {
        //            _res.Msg = "Operation Section Data Not Deleted....";
        //            return Ok(_res);
        //        }
        //        _res.response = true;
        //        _res.Msg = "Operation Section Data Deleted Successfully....";
        //        return Ok(_res);
        //    }
        //    catch (Exception ex)
        //    {
        //        _res.ErrorMsg = ex.Message;
        //        return Ok(_res);
        //    }
        //}
    }
}
