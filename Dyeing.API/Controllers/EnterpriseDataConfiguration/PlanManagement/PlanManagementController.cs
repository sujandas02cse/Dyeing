using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.PlanManagementModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class PlanManagementController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();


        [HttpGet]
        public async Task<IHttpActionResult> InitialInformation(int UnitNo,int BuyerId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetInitialInfoData(UnitNo,BuyerId);

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
        public async Task<IHttpActionResult> InitialPlan(int UnitNo,int BuyerId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetInitialPlanData(UnitNo,BuyerId);
                var a = queryData;


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
        public async Task<IHttpActionResult> SaveInitialData(SaveInitialDataWrapper saveInitialDatas)
        {
            try
            {
                var queryData = await new PlanManagementModel().CreateInitialData(saveInitialDatas);
                //var queryData = 'a';
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
        public async Task<IHttpActionResult> SaveInitialPlan(InitialPlanSaveWrapper initialPlanSaveWrapper)
        {
            try
            {
                var queryData = await new PlanManagementModel().CreateInitialPlan(initialPlanSaveWrapper);
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
        public async Task<IHttpActionResult> GetFabBookingBuyer(int UnitNo)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetFabBuyer(UnitNo);

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
        public async Task<IHttpActionResult> GetFabBookingJob(int BuyerId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetFabJobNo(BuyerId);

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
        public async Task<IHttpActionResult> GetFabBookingStyle(int JobNo)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetFabStyle(JobNo);

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
        public async Task<IHttpActionResult> GetFabBookingColor(int StyleId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetFabColor(StyleId);

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
        public async Task<IHttpActionResult> GetDyeingUnitOrderByStyle(int StyleId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetDyeingUnitByStyle(StyleId);

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
        public async Task<IHttpActionResult> GetDyeingCommentEnlishment(int BuyerId,int JobNo,int StyleId,int ColorId,int OpTime)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetCommentEnlishments(BuyerId,JobNo,StyleId,ColorId,OpTime);

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
        public async Task<IHttpActionResult> SaveDyeingCommentEnlishment(DyeingEnlishmentDataWrapper obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SaveDyeingCommentEnlishment(obj);
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
        public async Task<IHttpActionResult> GetLabDipEnlishment(int BuyerId, int JobNo, int StyleId, int ColorId, int OpTime)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetLabDipEnlishments(BuyerId, JobNo, StyleId, ColorId, OpTime);

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
        public async Task<IHttpActionResult> SaveLabDipEnlishment(LabDipEnlishmentWrapper obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SaveLabDipEnlishment(obj);
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
        public async Task<IHttpActionResult> GetMachineData(int UnitNo)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetMechineDatabyUnit(UnitNo);

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
        public async Task<IHttpActionResult> GetPriorityData(int UnitNo,int MachineId)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetPrioritySetData(UnitNo,MachineId);

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
        public async Task<IHttpActionResult> SavePrioritySetData(PrioritySetData obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SavePrioritySetData(obj);
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


        #region Dyeing Unit Change Data

        [HttpGet]
        public async Task<IHttpActionResult> GetDyeingChangeData(int UnitNo,int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetDyeingChangeData(UnitNo,BuyerId, JobNo, StyleId, OrderNo);

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
        public async Task<IHttpActionResult> SaveDyeingChangeData(DyeingUnitChange obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SaveDyeingUnitChange(obj);
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

        #endregion


        #region Machine To Machine Change
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchAndMachineData(int UnitNo)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetBatchAndMachineData(UnitNo);

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
        public async Task<IHttpActionResult> GetBatchDetailData(int BpmId,int OpTime)
        {
            try
            {

                var queryData = await new PlanManagementModel().GetBatchDetailData(BpmId,OpTime);

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
        public async Task<IHttpActionResult> SaveMachineChangeData(MachineToMachineChange obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SaveMachineChangeData(obj);
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

        #endregion


        #region SCM synchronization

        [HttpGet]
        public async Task<IHttpActionResult> GetSCMIssuedBatchNo()
        {
            try
            {
                var queryData = await new PlanManagementModel().GetSCMIssuedBatchNo();

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
        public async Task<IHttpActionResult> SCMSynchronization_Save(SCMSynchronization obj)
        {
            try
            {
                var queryData = await new PlanManagementModel().SCMSynchronization_Save(obj);
                if (queryData == 0)
                {
                    _res.Msg = "SCM Synchronization is not successful....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Msg = "SCM Synchronizatized Successfully....";
                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        #endregion


    }
}
