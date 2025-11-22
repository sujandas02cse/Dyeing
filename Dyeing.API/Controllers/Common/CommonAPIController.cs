using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dyeing.API.Model;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using Dyeing.API.Models.UserManagement;
using Dyeing.API.Models;
using static Dyeing.API.Models.CommonModel;

namespace Dyeing.API.Controllers
{    
    
    public class CommonAPIController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetUserLogin([FromUri] Login.UserLogin _obj)
        {
            try
            {
                var queryData = await new Login().GetUserLogin(_obj);
                

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }
                queryData.IsPermitted = true;
                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }

        [Authorize]
        [HttpGet]
        public async Task<IHttpActionResult> GetParentMenu(string userId)
        {
            try
            {
                var queryData = await new MenuOperation().GetParentMenu(userId);


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
        public async Task<IHttpActionResult> GetParentMenuNew(string userId)
        {
            try
            {
                var queryData = await new MenuOperation().GetParentMenu(userId); 


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
        public async Task<IHttpActionResult> GetUnitInfo(string UnitNo)
        {
            try
            {
                var queryData = await new CommonModel().GetUnitInfo(UnitNo);


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
        public IHttpActionResult GetDyeingUnitAll()
        {
            try
            {
                var queryData = new CommonModel().GetDyeingUnitAll();


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
        public IHttpActionResult GetUnitAll()
        {
            try
            {
                var queryData = new CommonModel().GetUnitAll();


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
        public IHttpActionResult GetBarcodeData(BatchBarcodeData model)
        {
            try
            {
                var queryData = new CommonModel().GetBarcodeData(model);

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
        public IHttpActionResult SendPassword(string empCode)
        {
            try
            {               
                if (!string.IsNullOrEmpty(empCode))
                {
                    string passWord = new CommonModel().GetUserPassword(empCode).FirstOrDefault();
                    var ack = new CommonModel().SendForgotPassword(empCode, passWord);

                    if (ack == null)
                    {
                        _res.Msg = "Mail Sending Failed.....";
                    }                       
                    else{
                        //string message = "<script> Password Sent Successfully in your official Email......</script>";
                        //MessageBox.Show(message);
                        _res.Msg = "Password Sent Successfully in your official Email......";
                        //"<script> Password Sent Successfully in your official Email......</script>"
                       // return message;
                    }
                                     
                }
                else
                    _res.Msg = "Please Provide Your User ID";
            }
            catch (Exception)
            {
                _res.Msg = "No User Found!!";
            }

            return Ok(_res);
        }

        [HttpGet]
        public IHttpActionResult GetBodyPartAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetBodyPartAll( LoadingType, BuyerId, JobNo, StyleId, OrderNo);


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
        public IHttpActionResult GetFabricNameAll(int LoadingType=1, int BuyerId=0, int JobNo=0, int StyleId=0, int OrderNo=0)
        {
            try
            {
                var queryData = new CommonModel().GetFabricNameAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);


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
        public IHttpActionResult GetGSMAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetGSMAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);


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
        public IHttpActionResult GetYarnCompositionAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetYarnCompositionAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);

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
        public IHttpActionResult GetColorNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetColorNameAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);

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
        public IHttpActionResult GetColorCodeNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetColorCodeNameAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);


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
        public IHttpActionResult GetPantoneNoNameAll(int LoadingType, int BuyerId, int JobNo, int StyleId, int OrderNo)
        {
            try
            {
                var queryData = new CommonModel().GetPantoneNoNameAll(LoadingType, BuyerId, JobNo, StyleId, OrderNo);


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
        public IHttpActionResult DiaInfoByJobFabric(int BuyerId, int JobId, int FabNameId)
        {
            try
            {
                var queryData = new CommonModel().DiaInfoByJobFabric(BuyerId, JobId, FabNameId);


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
        public IHttpActionResult GetPointSystemNameAll()
        {
            try
            {
                var queryData = new CommonModel().GetPointSystemNameAll();


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
        public IHttpActionResult GetFabricName()
        {
            try
            {
                var queryData = new CommonModel().GetFabricName();


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
        public IHttpActionResult GetBorrowingParty()
        {
            try
            {
                var queryData = new CommonModel().GetBorrowingParty();

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
        public IHttpActionResult GetMachineProductionPlanNo()
        {
            try
            {
                var queryData = new CommonModel().GetMachineProductionPlanNo();


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
        public IHttpActionResult GetTrollyNo(int unitId=0)
        {
            try
            {
                var queryData = new CommonModel().GetTrollyNo(unitId);


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
        public IHttpActionResult GetFabricGSMAll()
        {
            try
            {
                var queryData = new CommonModel().GetFabricGSMAll();

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
        public IHttpActionResult GetYarnHead()
        {
            try
            {
                var queryData = new CommonModel().GetYarnHead();

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
        public IHttpActionResult GetComposition(int IHID)
        {
            try
            {
                var queryData = new CommonModel().GetComposition(IHID);

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
        public IHttpActionResult GetJobByBuyer(int BuyerId)
        {
            try
            {
                var queryData = new CommonModel().GetJobByBuyer(BuyerId);

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
        public IHttpActionResult GetFabricByJobOrder(int BuyerId, int JobId, int OrderId)
        {
            try
            {
                var queryData = new CommonModel().GetFabricByJobOrder(BuyerId, JobId, OrderId);

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
        public IHttpActionResult GetStyleByBuyer(int BuyerId, int JobId)
        {
            try
            {
                var queryData = new CommonModel().GetStyleByBuyer(BuyerId, JobId);

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
        public IHttpActionResult GetOrderByBuyer(int BuyerId, int JobId)
        {
            try
            {
                var queryData = new CommonModel().GetOrderByBuyer(BuyerId, JobId);

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
        public IHttpActionResult GetBatchByBuyer(int BuyerId, int JobId)
        {
            try
            {
                var queryData = new CommonModel().GetBatchByBuyer(BuyerId, JobId);

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
        public IHttpActionResult GetFinMcByType(string Type)
        {
            try
            {
                var queryData = new CommonModel().GetFinMcByType(Type);

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
        public IHttpActionResult GetBatchAll()
        {
            try
            {
                var queryData = new CommonModel().GetBatchAll();

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
        public async Task<IHttpActionResult> GetDyeingUnitByUser(string UserId)
        {
            try
            {
                var queryData = await new CommonModel().GetUnitByUser(UserId);

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
        public async Task<IHttpActionResult> GetTrackingNo()
        {
            try
            {
                var queryData = await new CommonModel().GetTrackingNo();

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
        public async Task<IHttpActionResult> GetCompTimeByBatch(string BatchNo)
        {
            try
            {
                var queryData = await new CommonModel().GetCompTimeByBatch(BatchNo);

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
        public async Task<IHttpActionResult> GetCompTimeById(int BpmId)
        {
            try
            {
                var queryData = await new CommonModel().GetCompTimeById(BpmId);

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
        public async Task<IHttpActionResult> GetMachineAll()
        {
            try
            {
                var queryData = await new CommonModel().GetMachineAll();

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
        public async Task<IHttpActionResult> GetInspectionBatch(int UnitId)
        {
            try
            {
                var queryData = await new CommonModel().GetInspectionDataByUnit(UnitId);
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
        public async Task<IHttpActionResult> GetOrderByJob(int BuyerId,int JobId)
        {
            try
            {
                var queryData = await new CommonModel().GetOrderByJobId(BuyerId,JobId);
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
        public async Task<IHttpActionResult> GetBuyerByUnit(int UnitNo)
        {
            try
            {
                //var queryData = await new CommonModel().GetBuyerByUnitId(UnitNo);
                var queryData = await new CommonModel().GetAllBuyer(UnitNo);
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


        //updated by Sujan Das on 07-Jan-2025
        // to distinguish the compacting time of old and new system

        [HttpGet]
        public async Task<IHttpActionResult> GetCompTimeByBatchNew(string BatchNo)
        {
            try
            {
                 var queryData = await new CommonModel().GetCompTimeByBatchNew(BatchNo);
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
        public async Task<IHttpActionResult> GetCompTimeByIdNew(int BpmId)
        {
            try
            {
                var queryData = await new CommonModel().GetCompTimeByIdNew(BpmId);

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

        public async Task<IHttpActionResult> GetDyeingUnitByUserFabricManagement(string UserId)
        {
            try
            {
                var queryData = await new CommonModel().GetDyeingUnitByUserFabricManagement(UserId);

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
        public IHttpActionResult GetBatchByBuyerTypeWise(int BuyerId, int JobId,string batchType,string UserId)
        {
            try
            {


                var queryData = new CommonModel().GetBatchByBuyerTypeWise(BuyerId, JobId, batchType,UserId);

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
        public async Task<IHttpActionResult> GetUnitNameByBatchNew(int BpmId)
        {
            try
            {
                var queryData = await new CommonModel().GetUnitNameByBatchNew(BpmId);

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
        public async Task<IHttpActionResult> GetTrackingNo(string UnitId)
        {
            try
            {
                var queryData = await new CommonModel().GetTrackingNo(UnitId);

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


        //New Controller for Job by BuyerId (Universal)
        [HttpGet]
        public IHttpActionResult GetAllJobByBuyer(int BuyerId)
        {
            try
            {
                var queryData = new CommonModel().GetAllJobByBuyer(BuyerId);

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
