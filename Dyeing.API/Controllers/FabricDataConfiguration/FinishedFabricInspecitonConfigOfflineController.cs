using Dyeing.API.Models;
using Dyeing.API.Models.FabricDataConfiguration;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using static Dyeing.API.Models.FabricDataConfiguration.FinishFabricInspectionOnlineModel;


namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinishedFabricInspecitonConfigOfflineController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [System.Web.Http.HttpGet]
        public IHttpActionResult GetBatchNoListForOfflineQC(string status, int unit)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().GetBatchNoListForOfflineQC(status, unit);

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpGet]
        public IHttpActionResult LoadDetailsByBatch(string batchType, string BatchNo)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().LoadDetailsByBatch(batchType, BatchNo);

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
            catch (Exception)
            {

                throw;
            }

        }



        [System.Web.Http.HttpGet]
        public IHttpActionResult LoadBodyPartsByBatch(string batchType, string BatchNo)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().LoadBodyPartsByBatch(batchType, BatchNo);

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
            catch (Exception)
            {

                throw;
            }

        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult LoadFabricTypeComposition(string batchType, string BatchNo, string BodyPartId)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().LoadFabricTypeComposition(batchType, BatchNo, BodyPartId);

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpGet]
        public IHttpActionResult LoadDiaGSM(string batchType, string BatchNo, string SelectedNumberOfRoll, string BodyPartId)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().LoadDiaGSM(batchType, BatchNo, SelectedNumberOfRoll, BodyPartId);

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpGet]
        public IHttpActionResult GetDiaPartList()
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().GetDiaPartList();

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpPost]
        public async Task<IHttpActionResult> FinishFabricInspectionConfigOffline_Save(InspectionMasterSaveOfflineList Obj)
        {
            try
            {
                try
                {
                     object queryData = null;

                    if (Obj.BatchType == "New")
                    {
                        queryData = await Task.Run(()=> new FinishFabricInspectionOnlineModel().FinishFabricInspectionConfigOffline_Save(Obj)) ;

                        queryData =await Task.Run(()=> ProcessStickerGenerationAndUpdate(queryData, Obj.BatchNo)) ;

                    }
                    else if (Obj.BatchType == "Old" || Obj.BatchType == "Bulk")
                    {
                        queryData =await Task.Run(()=> new FinishFabricInspectionOnlineModel().FinishFabricInspectionConfigOffline_SaveBulk(Obj)) ;

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
            catch (Exception)
            {

                throw;
            }

        }

        private async Task<object> ProcessStickerGenerationAndUpdate(object queryData, string BatchNo)
        {
            var rollList = (queryData as IEnumerable<dynamic>)?.ToList();
            if (rollList == null || !rollList.Any())
                return queryData;

            //string path = HttpContext.Current.Server.MapPath("~/images/RollSticker/");

            string path = System.Web.Hosting.HostingEnvironment.MapPath("~/images/RollSticker/");

            if (string.IsNullOrEmpty(path))
            {
                throw new InvalidOperationException("Failed to resolve path for ~/images/RollSticker/.");
            }

            //string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
            //string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];

            // for local testing 
            //string protocol = "http://";
            //string baseUrl = "localhost:34605";

            // for local live server

            string protocol = "";
            string baseUrl = "https://mis-dyeing.mascoknit.com/";



            if (HttpContext.Current != null)
            {
                protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
            }


            string basePath = (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.60")) ?
                $"{protocol}{baseUrl}/dyeingApi/images/RollSticker/" :
                $"{protocol}{baseUrl}/images/RollSticker/";

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            var inspectionModel = new FinishFabricInspectionOnlineModel();


            FinishFabricInspectionOnlineModel FinishFabricInspectionOnlineModelObj = new FinishFabricInspectionOnlineModel();

            foreach (var item in rollList)
            {
                int rollNo = Convert.ToInt32(item.NumberOfRoll);
                int bpmId = Convert.ToInt32(item.BpmId);

                string rollNoFull = $"{BatchNo}({rollNo})";
                string fileName = rollNoFull.Replace("+", "-") + ".png";
                string file = Path.Combine(path, fileName);
                string stickerPath = basePath + fileName;

                if (!System.IO.File.Exists(file))
                {
                    QRCodeGenerator qrGenerator = new QRCodeGenerator();
                    QRCodeData qrCodeData = qrGenerator.CreateQrCode(rollNoFull, QRCodeGenerator.ECCLevel.Q);
                    QRCode qrCode = new QRCode(qrCodeData);
                    Bitmap qrCodeImage = qrCode.GetGraphic(20);
                    qrCodeImage.Save(file, ImageFormat.Png);
                }

              await inspectionModel.SaveStickerPath(stickerPath, rollNo, bpmId);
            }

            return queryData;
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult test(string UserId)
        {

            try
            {
                try
                {
                    var queryData = "success";

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
            catch (Exception)
            {

                throw;
            }

        }


        [System.Web.Http.HttpGet]
        public IHttpActionResult IsSecondCompactingON(string batchType, string BatchNo)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().IsSecondCompactingON(batchType, BatchNo);

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
            catch (Exception)
            {

                throw;
            }

        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult LoadSavedDiaGSM(string batchType, string BatchNo, string BodyPartId)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().LoadSavedDiaGSM(batchType, BatchNo, BodyPartId);

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
            catch (Exception)
            {

                throw;
            }

        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult GetMaximumCompactingTime(string BatchNo)
        {
            try
            {
                try
                {
                    var queryData = new FinishFabricInspectionOnlineModel().GetMaximumCompactingTime(BatchNo);

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
            catch (Exception)
            {

                throw;
            }

        }
    }
}