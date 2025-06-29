using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchPreparationModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchPreparationController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetPlanList()
        {
            try
            {
                var queryData = await new BatchPreparationModel().GetPlanList();

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
        public IHttpActionResult GetDataByBatch(int BpmId)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetDataByBatch(BpmId);

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
        public IHttpActionResult GetBatchDataById(int Id, int ReviseNo=0)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetBatchDataById(Id, ReviseNo);

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
        public IHttpActionResult GetMachineDataByPlan(List<PlanModel> data)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetMachineDataByPlan(data);

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
        public IHttpActionResult GetFabricNameByPlan(List<PlanModel> data)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetFabricNameByPlan(data);

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
        public IHttpActionResult GetDiaInfoByFabric(DiaModel data)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetDiaInfoByFabric(data);

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
        public IHttpActionResult DyeingBatchPreparation_SaveUpdate(BatchPreparationWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {




                var queryData = new BatchPreparationModel().DyeingBatchPreparation_SaveUpdate(_obj);

                if (queryData == null)
                {
                   _res.Msg = "Configuration Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Data = queryData.BatchNo;

                    if (queryData.Tag == "updated")
                        _res.Msg = "Batch Preparation Data Updated Successfully....";
                    if (queryData.Tag == "saved")
                    {
                        _res.Msg = "Batch Preparation Data Saved Successfully....";

                        string path = HttpContext.Current.Server.MapPath("~/images/BatchQRCode/");
                        string fileName = queryData.BatchNo + ".png";
                        string file = path + fileName;
                        DirectoryInfo d = new DirectoryInfo(path);
                        if (!d.Exists)
                        {
                            System.IO.Directory.CreateDirectory(path);
                        }
                        if (!System.IO.File.Exists(file))
                        {
                            QRCodeGenerator qrGenerator = new QRCodeGenerator();
                            QRCodeData qrCodeData = qrGenerator.CreateQrCode(queryData.BatchNo, QRCodeGenerator.ECCLevel.Q);
                            QRCode qrCode = new QRCode(qrCodeData);
                            Bitmap qrCodeImage = qrCode.GetGraphic(20);
                            qrCodeImage.Save(file, ImageFormat.Png);
                        }
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
        [HttpPost]
        public IHttpActionResult BatchDataProcessing_SaveUpdate(BatchDataWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new object();
               
                queryData = new BatchPreparationModel().BatchDataProcessing_SaveUpdate(_obj);
               
                if (queryData == null)
                {
                    _res.Msg = "Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Data = queryData;

                   // if (queryData.Tag == "updated")
                    _res.Msg = "Data Processed Successfully....";              

                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        public IHttpActionResult BatchDataProcessingSample_SaveUpdate(SampleBatchDataWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new object();
               
                queryData = new BatchPreparationModel().BatchDataProcessingSample_SaveUpdate(_obj);
              
                if (queryData == null)
                {
                    _res.Msg = "Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                     _res.response = true;
                     _res.Data = queryData;

                     // if (queryData.Tag == "updated")
                     _res.Msg = "Data Processed Successfully....";

                     return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }


        [HttpPost]
        public IHttpActionResult BatchFabData_Update(BatchFabData _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchPreparationModel().BatchFabData_Update(_obj);
                //List<BatchData> data = (List<BatchData>)queryData;
                if (queryData == null)
                {
                    _res.Msg = "Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    //_res.Data = queryData;

                    // if (queryData.Tag == "updated")
                    _res.Msg = "Fabric Set Successfully....";

                    return Ok(_res);
                }
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }
       
        [HttpPost]
        public IHttpActionResult BatchData_SaveUpdate(BatchCardWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchPreparationModel().BatchData_SaveUpdate(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Batch Data Not Updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Data = queryData;

                    if (queryData.Tag == "duplicate")
                        _res.Msg = "Batch No Cannot Be Duplicate...";
                    if (queryData.Tag == "saved" || queryData.Tag== "revised")
                    {
                        if(queryData.Tag == "saved")
                            _res.Msg = "Batch Data Saved Successfully....";
                        else if(queryData.Tag == "revised")
                            _res.Msg = "Batch Data Revised Successfully....";

                        string path = HttpContext.Current.Server.MapPath("~/images/BatchQRCode/");
                        string fileName = queryData.BatchNo + ".png";
                        string file = path + fileName;
                        DirectoryInfo d = new DirectoryInfo(path);
                        if (!d.Exists)
                        {
                            System.IO.Directory.CreateDirectory(path);
                        }
                        if (!System.IO.File.Exists(file))
                        {
                            QRCodeGenerator qrGenerator = new QRCodeGenerator();
                            QRCodeData qrCodeData = qrGenerator.CreateQrCode(queryData.BatchNo, QRCodeGenerator.ECCLevel.Q);
                            QRCode qrCode = new QRCode(qrCodeData);
                            Bitmap qrCodeImage = qrCode.GetGraphic(20);
                            qrCodeImage.Save(file, ImageFormat.Png);
                        }
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
        public async Task<IHttpActionResult> GetBatchReprocessData(int  UnitId,DateTime FromDate,DateTime ToDate)
        {
            try
            {
                var queryData =await new BatchPreparationModel().GetReprocessBatchData(UnitId,FromDate,ToDate);

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
        public IHttpActionResult GetSampleBatchDataById(int Id, int ReviseNo=0) {
            try
            {
                var queryData = new BatchPreparationModel().GetSampleBatchDataById(Id, ReviseNo);

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
        public IHttpActionResult SampleBatchData_SaveUpdate(SampleBatchCardWrapper _obj)
        {

            _res = new CommonModel.Response();
            try
            {
               

                var queryData = new BatchPreparationModel().BatchDataForSample_SaveUpdate(_obj);
                if (queryData == null)
                {
                    _res.Msg = "Batch Data Not Updated.....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Data = queryData;

                    if (queryData.Tag == "duplicate")
                        _res.Msg = "Batch No Cannot Be Duplicate...";
                    if (queryData.Tag == "saved" || queryData.Tag == "revised")
                    {
                        if (queryData.Tag == "saved")
                            _res.Msg = "Batch Data Saved Successfully....";
                        else if (queryData.Tag == "revised")
                            _res.Msg = "Batch Data Revised Successfully....";

                        string path = HttpContext.Current.Server.MapPath("~/images/BatchQRCode/");
                        string fileName = queryData.BatchNo + ".png";
                        string file = path + fileName;
                        DirectoryInfo d = new DirectoryInfo(path);

                        if (!d.Exists)
                        {
                            System.IO.Directory.CreateDirectory(path);
                        }
                        if (!System.IO.File.Exists(file))
                        {
                            QRCodeGenerator qrGenerator = new QRCodeGenerator();
                            QRCodeData qrCodeData = qrGenerator.CreateQrCode(queryData.BatchNo, QRCodeGenerator.ECCLevel.Q);
                            QRCode qrCode = new QRCode(qrCodeData);
                            Bitmap qrCodeImage = qrCode.GetGraphic(20);
                            qrCodeImage.Save(file, ImageFormat.Png);

                        }
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
        public IHttpActionResult GetStylesByBuyerAndJob(int buyerId, int jobId)
        {
            try
            {
                var queryData = new BatchPreparationModel().GetStylesByBuyerAndJob(buyerId,jobId);

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
