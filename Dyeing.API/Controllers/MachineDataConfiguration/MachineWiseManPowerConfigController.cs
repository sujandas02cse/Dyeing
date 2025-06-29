using Dyeing.API.Models;
using Dyeing.API.Models.MachineDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineDataConfiguration.MachineWiseManPowerConfigModel;

namespace Dyeing.API.Controllers.MachineDataConfiguration
{
    public class MachineWiseManPowerConfigController:ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetUnitName()
        {
            try
            {
                var queryData = await new MachineWiseManPowerConfigModel().GetUnitName();

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
        public async Task<IHttpActionResult> GetEmp(int UnitNo)
        {
            try
            {
                var queryData = await new MachineWiseManPowerConfigModel().GetEmp(UnitNo);

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
        public async Task<IHttpActionResult> GetShift()
        {
            try
            {
                var queryData = await new MachineWiseManPowerConfigModel().GetShift();

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
        public async Task<IHttpActionResult> GetEmpShift(string fDate, string tDate,Int32 EmpId)
        {
            try
            {
                var queryData = await new MachineWiseManPowerConfigModel().GetEmpShift(fDate,tDate,EmpId);

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
        public async Task<IHttpActionResult> SaveUpdate(MachineWiseManPower _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new MachineWiseManPowerConfigModel().SaveUpdate(_obj);

                if (queryData == 0)
                {
                    if (_obj.MwMPId == 0) _res.Msg = "Machine Wise Manpower Data Not Saved....";
                    else _res.Msg = "Machine Wise Manpower Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                if (_obj.MwMPId == 0) _res.Msg = "Machine Wise Manpower Data Saved Successfully....";
                else _res.Msg = "Machine Wise Manpower Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
        [HttpPost]
        public async Task<IHttpActionResult> SearchMachineWiseManPower(Int32 unitNo, string fromDate, string toDate)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().SearchMachineWiseManPower(unitNo, fromDate, toDate);

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
        public async Task<IHttpActionResult> GetChildData(Int32 mwMPdId)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetChildData(mwMPdId);

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
        public async Task<IHttpActionResult> GetMachineNo(string Catagory)
        {
            try
            {
                var queryData = await new MachineDetailsConfigModel().GetMachineNo(Catagory);

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