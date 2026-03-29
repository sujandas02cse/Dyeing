using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
using Dyeing.API.Models.FabricDataConfiguration;
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
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.CopyQrCodeModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class CopyQrCodeController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetBatchDetailForCopyQr(int BpmId)
        {
            try
            {
                var queryData = new CopyQrCodeModel().GetBatchDetailForCopyQr(BpmId);

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
        public IHttpActionResult GetBatchDetailByQrCode(int MasterId)
        {
            try
            {
                var queryData = new CopyQrCodeModel().GetBatchDetailByQrCode(MasterId);

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
        public async Task<IHttpActionResult> SaveUpdateCopyQrCodeAsync( CopyQr copyQr)
        {
            try
            {
                string path = "";

                var queryData = new CopyQrCodeModel().SaveUpdateCopyQrCode(copyQr);
                dynamic result = queryData.FirstOrDefault();

                int NewMasterId = Convert.ToInt32(result.NewMasterId);
                int NewRollNo = Convert.ToInt32(result.NewRollNo);
                path = await ProcessStickerGenerationAndUpdate(NewMasterId, NewRollNo, copyQr.BpmId, copyQr.BatchNo,copyQr.UserId);

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


        private async Task<string> ProcessStickerGenerationAndUpdate(dynamic newMasterId, int rollNo, int BpmId,string BatchNo,string userId)
        {

            //string path = HttpContext.Current.Server.MapPath("~/images/RollSticker/");

            string path = System.Web.Hosting.HostingEnvironment.MapPath("~/images/RollSticker/");

            if (string.IsNullOrEmpty(path))
            {
                throw new InvalidOperationException("Failed to resolve path for ~/images/RollSticker/.");
            }

            //string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
            //string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];

            // for local 
            string protocol = "http://";
            string baseUrl = "localhost:34605";

            // for  live server
            //string protocol = "";
            //string baseUrl = "https://mis-dyeing.mascoknit.com/";

            // for  live server (ssl security issue)
            //string protocol = "";
            //string baseUrl = "http://mis-dyeing.mascoknit.com/";


            // for  old test server
            //string protocol = "";
            //string baseUrl = "http://192.168.50.61:91/";


            // for  new test server
            //string protocol = "";
            //string baseUrl = "http://192.168.50.60:93/";


            if (HttpContext.Current != null)
            {
                protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
            }


            string basePath = (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.61") || baseUrl.Contains("192.168.50.60")) ?
                $"{protocol}{baseUrl}/dyeingApi/images/RollSticker/" :
                $"{protocol}{baseUrl}/images/RollSticker/";

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);



            int qrCodeId = Convert.ToInt32(newMasterId);
            string qrCodeIdFull = $"{qrCodeId}";

            string rollNoFull = $"{BatchNo}({rollNo})";
            string fileName = rollNoFull.Replace("+", "-") + ".png";
            string file = Path.Combine(path, fileName);
            string stickerPath = basePath + fileName;

            if (!System.IO.File.Exists(file))
            {
                QRCodeGenerator qrGenerator = new QRCodeGenerator();
                //QRCodeData qrCodeData = qrGenerator.CreateQrCode(rollNoFull, QRCodeGenerator.ECCLevel.Q);
                QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrCodeIdFull, QRCodeGenerator.ECCLevel.Q);

                QRCode qrCode = new QRCode(qrCodeData);
                Bitmap qrCodeImage = qrCode.GetGraphic(20);
                qrCodeImage.Save(file, ImageFormat.Png);
            }

            _ = new CopyQrCodeModel().SaveStickerPath(stickerPath, rollNo, Convert.ToInt32(BpmId), qrCodeId, userId);

            return stickerPath;
        }
    }
}
