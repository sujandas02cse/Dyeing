using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineCapacityModel;
using static Dyeing.API.Models.MachineInfoModel;

namespace Dyeing.API.Controllers
{
    public class MachineCapacityController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> MachineCapacityInfo_Get()
        {
            try
            {
                var queryData = await new MachineCapacityModel().MachineCapacityInfo_Get();

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
        public async Task<IHttpActionResult> MachineCapacity_SaveUpdate(MachineCapacity _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineCapacityModel().MachineCapacity_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MCapacityId == "0") _res.Msg = "Machine Capacity Configuration Data Not Saved....";
                    else _res.Msg = "Machine Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    if (_obj.MCapacityId == "0")
                    {
                        _res.Msg = "Machine Capacity Configuration Data Saved Successfully....";
                       
                    }
                    else
                    {
                        _res.Msg = "Machine Capacity Configuration Data Updated Successfully....";
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
        public async Task<IHttpActionResult> MachineCapacity_Delete(string MCapacityId,string UsetId)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineCapacityModel().MachineCapacity_Delete(MCapacityId,UsetId);

                if (queryData == 0)
                {
                    _res.Msg = "Machine Type Data Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Machine Type Data Deleted Successfully....";
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
