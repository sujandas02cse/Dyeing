using Dyeing.API.Models;
using Dyeing.API.Models.MachineDataConfiguration;
using System;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.MachineDataConfiguration.McOperationConfigNewModel;

namespace Dyeing.API.Controllers.MachineDataConfiguration
{
    
    public class McOperationConfigNewController : ApiController
    {
        CommonModel.Response _res;

        [HttpGet]
        public IHttpActionResult McOperationConfigGetDataNew(string status, int BpmId, int compTime, string batchType)
        {
            try
            {
                object queryData = null;

                if (batchType == "old" || batchType == "Bulk")
                {
                    //queryData = new McOperationConfigModel..GetBatchNoListUnitStatusWise(status, unit);
                }
                else
                {
                    queryData = new McOperationConfigNewModel().NewMachineConfigOperationGetData(status, BpmId, compTime, batchType);
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

        [HttpPost]
        public IHttpActionResult McOperationConfigSaveUpdateNew(McOperationConfigNewDataModel _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new McOperationConfigNewModel().NewMachineConfigOperation_SaveUpdate(_obj);
                _res.response = true;
                _res.ProofValue = queryData;

                return Ok(_res);
            }
            catch (Exception e)
            {
                _res.Msg = " Data Not Saved....";
                //_res.Msg = " Data Not Updated....";
                _res.ErrorMsg = e.Message;
                return InternalServerError(exception: e);
            }
        }

        [HttpGet]
        public IHttpActionResult GetBatchBasicInfo(string BpmId, string UnitId)
        {
            try
            {
               

                var queryData = new McOperationConfigModel().GetBatchBasicInfo(BpmId, UnitId);

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
        public IHttpActionResult GetBodyPartDetails(string BpmId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetBodyPartDetails(BpmId);

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
        public IHttpActionResult GetOperationTime(string BpmId,string machineTypeId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetOperationTime(BpmId, machineTypeId);

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
        public IHttpActionResult GetBatchStartEndTime(string BpmId,int OperationTime)
        {
            try
            {


                var queryData = new McOperationConfigModel().GetBatchStartEndTime(BpmId, OperationTime);

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
        //public async Task<IHttpActionResult> SaveMachineOperationConfig(MachineOperationConfigModel Obj)
        //{
        //    _res = new CommonModel.Response();
        //    try
        //    {
        //        var queryData = await new McOperationConfigModel().SaveMachineOperationConfig(Obj);
        //        _res.response = true;
        //        _res.ProofValue = queryData;

        //        if (Obj.Id > 0)
        //        {
        //            _res.Msg = "Data Updated Successfully....";
        //        }

        //        else
        //        {
        //            _res.Msg = "Data Saved Successfully....";
        //        }

        //        return Ok(_res);
        //    }
        //    catch (Exception ex)
        //    {
        //        _res.Msg = " Data Not Saved....";
        //        //_res.Msg = " Data Not Updated....";
        //        _res.ErrorMsg = ex.Message;
        //        return Ok(_res);
        //    }
        //}

        [HttpPost]
        public async Task<IHttpActionResult> SaveMachineOperationConfig(MachineOperationConfigModel Obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = (await new McOperationConfigModel()
                    .SaveMachineOperationConfig(Obj)).ToList();

                _res.response = true;
                _res.ProofValue = queryData;

                if (queryData.Count > 0)
                {
                    dynamic firstRow = queryData[0];
                    _res.Msg = firstRow.Message;
                }
                else
                {
                    _res.Msg = "Saved Successfully";
                }

                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.response = false;
                _res.Msg = "Data Not Saved....";
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        [HttpGet]
        public IHttpActionResult LoadCurrentStatus(string BpmId,string MachineTypeId)
        {
            try
            {
                var queryData = new McOperationConfigModel().LoadCurrentStatus(BpmId, MachineTypeId);

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
        public IHttpActionResult GetBodyPartDetailsForEndMode(string bpmId, int mcOperationMasterId)
        {
            try
            {


                var queryData = new McOperationConfigModel().GetBodyPartDetailsForEndMode(bpmId, mcOperationMasterId);

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
        public IHttpActionResult GetOperationHistoryByTime(string BpmId,int OperationTime, string machineTypeId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetOperationHistoryByTime(BpmId, OperationTime, machineTypeId);

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
        public IHttpActionResult GetBatchBodyPartStatus(string bpmId, int? mdId, int? mcOperationMasterId,string machineTypeId)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetBatchBodyPartStatus(bpmId, mdId, mcOperationMasterId, machineTypeId);

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
        public IHttpActionResult GetMachineTypeId(string machineType)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetMachineTypeId(machineType);

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
        public IHttpActionResult GetBatchNoListUnitWise(int unit)
        {
            try
            {
                var queryData = new McOperationConfigModel().GetBatchNoListUnitWise(unit);

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
        public IHttpActionResult LoadBuyerJobStyle(int BpmId)
        {
            try
            {
                
                var queryData = new McOperationConfigModel().LoadBuyerJobStyle(BpmId);

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
        public IHttpActionResult LoadMachineStages(int BpmId)
        {
            try
            {

                var queryData = new McOperationConfigModel().LoadMachineStages(BpmId);

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
        public IHttpActionResult GetMachineWiseBodyParts(int mcOperationMasterId)
        {
            try
            {

                var queryData = new McOperationConfigModel().GetMachineWiseBodyParts(mcOperationMasterId);

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
        public IHttpActionResult LoadTotalRollQuantity(int BpmId)
        {
            try
            {

                var queryData = new McOperationConfigModel().LoadTotalRollQuantity(BpmId);

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
        public IHttpActionResult LoadInspectionPoint()
        {
            try
            {

                var queryData = new McOperationConfigModel().LoadInspectionPoint();

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
        public IHttpActionResult LoadFaultsForInspection()
        {
            try
            {

                var queryData = new McOperationConfigModel().LoadFaultsForInspection();

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