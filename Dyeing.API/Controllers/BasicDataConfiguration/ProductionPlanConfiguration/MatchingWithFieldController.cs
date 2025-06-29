using Dyeing.API.Models;
using Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.BasicDataConfiguration.ProductionPlanConfiguration.MatchingWithFieldModel;
using static Dyeing.API.Models.MachineInfoModel;

namespace Dyeing.API.Controllers
{
    public class MatchingWithFieldController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> MatchingWithFieldInfo_Get()
        {
            try
            {
                var queryData = await new MatchingWithFieldModel().MatchingWithFieldInfo_Get();

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
        public async Task<IHttpActionResult> MatchingWithFieldInfoActive_Get()
        {
            try
            {
                var queryData = await new MatchingWithFieldModel().MatchingWithFieldInfoActive_Get();

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
        public async Task<IHttpActionResult> MatchingWithField_SaveUpdate(MatchingWithField _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MatchingWithFieldModel().MatchingWithField_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MfcId == "0") _res.Msg = "Matching With Field Configuration Data Not Saved....";
                    else _res.Msg = "Matching With Field Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.MfcId == "0")
                    {
                        _res.Msg = "Matching With Field Configuration Data Saved Successfully....";

                    }
                    else
                    {
                        _res.Msg = "Matching With Field Configuration Data Updated Successfully....";
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
        [HttpGet]
        public async Task<IHttpActionResult> MatchingWithField_Delete(string MfcId, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MatchingWithFieldModel().MatchingWithField_Delete(MfcId, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Matching With Field Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Matching With Field Data Deleted Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
    }
}