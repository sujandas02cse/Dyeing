using Dyeing.API.Models;
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
using static Dyeing.API.Models.FabricDataConfiguration.FinFabStoreIssueModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinFabStoreIssueController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public IHttpActionResult GetDataByBatch(int BpmId, int CompTime)
        {
            try
            {
                var queryData = new FinFabStoreIssueModel().GetDataByBatch(BpmId, CompTime);

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
        public IHttpActionResult GetDataByTracking(int Id)
        {
            try
            {
                var queryData = new FinFabStoreIssueModel().GetDataByTracking(Id);

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
        public IHttpActionResult PackingList_SaveUpdate(FinFabStoreIssueWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                Response res = new Response();
                res = new FinFabStoreIssueModel().PackingList_SaveUpdate(_obj);

                if (res.Id>0)
                {
                    string path = HttpContext.Current.Server.MapPath("~/images/PackingList/");
                    string TrackingNo = res.TrackingNo;
                    string fileName = TrackingNo + ".png";
                    string file = path + fileName;
                    string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                    string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
                    string imgPath = "";
                    if (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.60"))
                        imgPath = protocol + baseUrl + "/dyeingApi/images/PackingList/" + fileName;
                    else
                        imgPath = protocol + baseUrl + "/images/PackingList/" + fileName;
                    
                    DirectoryInfo d = new DirectoryInfo(path);
                    if (!d.Exists)
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    if (!System.IO.File.Exists(file))
                    {
                        QRCodeGenerator qrGenerator = new QRCodeGenerator();
                        QRCodeData qrCodeData = qrGenerator.CreateQrCode(TrackingNo, QRCodeGenerator.ECCLevel.Q);
                        QRCode qrCode = new QRCode(qrCodeData);
                        Bitmap qrCodeImage = qrCode.GetGraphic(20);
                        qrCodeImage.Save(file, ImageFormat.Png);
                    }

                    var data = new
                    {
                        Id= res.Id,
                        TrackingNo=res.TrackingNo,
                        StickerPath= imgPath
                    };
                    _res.Data = data;
                    _res.response = true;
                    _res.Msg = "Data Saved Successfully....";
                    return Ok(_res);                    
                }
                else
                {
                    _res.Msg = "Data Not Saved....";
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
        public IHttpActionResult GetDataByBatchNew(int BpmId, int CompTime)
        {
            try
            {
                var queryData = new FinFabStoreIssueModel().GetDataByBatchNew(BpmId, CompTime);

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
        public IHttpActionResult PackingList_SaveUpdateNew(FinFabStoreIssueWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                Response res = new Response();
                res = new FinFabStoreIssueModel().PackingList_SaveUpdateNew(_obj);

                if (res.Id > 0)
                {
                    string path = HttpContext.Current.Server.MapPath("~/images/PackingList/");
                    string TrackingNo = res.TrackingNo;
                    string fileName = TrackingNo + ".png";
                    string file = path + fileName;
                    string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                    string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
                    string imgPath = "";
                    if (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.61"))
                        imgPath = protocol + baseUrl + "/dyeingApi/images/PackingList/" + fileName;
                    else
                        imgPath = protocol + baseUrl + "/images/PackingList/" + fileName;

                    DirectoryInfo d = new DirectoryInfo(path);
                    if (!d.Exists)
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    if (!System.IO.File.Exists(file))
                    {
                        QRCodeGenerator qrGenerator = new QRCodeGenerator();
                        QRCodeData qrCodeData = qrGenerator.CreateQrCode(TrackingNo, QRCodeGenerator.ECCLevel.Q);
                        QRCode qrCode = new QRCode(qrCodeData);
                        Bitmap qrCodeImage = qrCode.GetGraphic(20);
                        qrCodeImage.Save(file, ImageFormat.Png);
                    }

                    var data = new
                    {
                        Id = res.Id,
                        TrackingNo = res.TrackingNo,
                        StickerPath = imgPath
                    };
                    _res.Data = data;
                    _res.response = true;
                    _res.Msg = "Data Saved Successfully....";
                    return Ok(_res);
                }
                else
                {
                    _res.Msg = "Data Not Saved....";
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
        public IHttpActionResult GetDataByTrackingNew(int Id)
        {
            try
            {
                var queryData = new FinFabStoreIssueModel().GetDataByTrackingNew(Id);

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



        //private bool disposed = false;
        //protected virtual void Dispose(bool disposing)
        //{
        //    if (!this.disposed)
        //    {
        //        if (disposing)
        //        {
        //            _context.Dispose();
        //        }
        //    }
        //    this.disposed = true;
        //}
        //public void Dispose()
        //{
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}
    }
}
