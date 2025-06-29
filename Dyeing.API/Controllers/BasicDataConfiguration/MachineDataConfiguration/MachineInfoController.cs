using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineInfoModel;

namespace Dyeing.API.Controllers
{
    public class MachineInfoController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public IHttpActionResult MachineInfo_Get(string MId,string Category)
        {
            try
            {
                var queryData = new MachineInfoModel().MachineInfo_Get(MId, Category);

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
        public async Task<IHttpActionResult> MachineInfo_SaveUpdate(MachineInfo _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineInfoModel().MachineInfo_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MId == "0") _res.Msg = "Machine Configuration Data Not Saved....";
                    else _res.Msg = "Machine Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.MId == "0")
                    {
                        _res.Msg = "Machine Configuration Data Saved Successfully....";
                    }
                    else
                    {
                        _res.Msg = "Machine Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> MachineInfo_Delete(string MId, string Category, string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineInfoModel().MachineInfo_Delete(MId, Category, UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Machine Configuration Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Machine Configuration Data Deleted Successfully....";
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
