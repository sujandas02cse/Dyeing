using Dyeing.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineDetailsConfigModel;

namespace Dyeing.API.Controllers
{
    public class MachineDetailConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
       
        [HttpGet]
        public async Task<IHttpActionResult> GetMachineName(string Catagory)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachineName(Catagory);

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
        public async Task<IHttpActionResult> GetMachineBrand()
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachineBrand();

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
        public async Task<IHttpActionResult> GetMachinesearchCapacity()
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachinesearchCapacity();

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
        public async Task<IHttpActionResult> GetMachineAsset()
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachineAsset();

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
        public async Task<IHttpActionResult> GetUnitName()
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetUnitName();

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
        public async Task<IHttpActionResult> MachineDetails_SaveUpdate(MachineDetails _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineDetailsConfigModel().MachineDetails_SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MDId == 0) _res.Msg = "Machine Detail Data Not Saved....";
                    else _res.Msg = "Machine Detail Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.MDId == 0) _res.Msg = "Machine Detail Data Saved Successfully....";
                else _res.Msg = "Machine Detail Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetMachineDetail()
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachineDetail();

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
        public async Task<IHttpActionResult> DeleteMachineDetail(string MDID, string UserId)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().DeleteMachineDetail(MDID, UserId);
                if (queryData == 0)
                {
                    _res.Msg = "Machine Details Not Deleted....";
                    return Ok(_res);
                }
                _res.response = true;
                _res.Msg = "Machine Details Deleted Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Msg = "Machine Details Not Deleted....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetBuildingsByUnit(string Unit)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetBuildingsByUnit(Unit);

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
        public async Task<IHttpActionResult> GetFloorsByBuilding(string Building)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetFloorsByBuilding(Building);

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
