using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement;
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
using static Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement.BatchPrepare;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.PlanManagement
{
    public class BatchPrepareController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();


        [HttpGet]
        public async Task<IHttpActionResult> GetBatchPrepareData(int UnitId, string FromDate, string ToDate)
        {
            try
            {

                var queryData = await new BatchPrepare().GetBatchPrepareData(UnitId, FromDate, ToDate);

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
        public IHttpActionResult GetBatchDataById(int Id,int reviceno)
        {
            try
            {
                var queryData = new BatchPrepare().GetBatchDataById(Id, reviceno);

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
        public IHttpActionResult BatchPrepare_SaveUpdate(BatchPrepareWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchPrepare().BatchPrepare_SaveUpdate(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Data not updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;                   

                    _res.Msg = "Data saved successfully...";
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
        public IHttpActionResult BatchPrepare_SaveUpdateNew(BatchCardNew _obj)
        {
            
            _res = new CommonModel.Response();
            try
            {
                var queryData = new BatchPrepare().BatchPrepare_SaveUpdateNew(_obj);

                if (queryData == null)
                {
                    _res.Msg = "Batch Plan not updated....";
                    return Ok(_res);
                }
                else
                {
                    _res.response = true;
                    _res.Data = queryData;

                    if (queryData.Tag == "Updated")
                        _res.Msg = "Batch Data Updated Successfully....";
                    else if (queryData.Tag == "Duplicated")
                        _res.Msg = "Batch No Can Not Be Duplicated";
                    else if (queryData.Tag == "Saved" || queryData.Tag == "Revised")
                    {
                        if (queryData.Tag == "Saved")
                            _res.Msg = "Batch Data Saved Successfully....";
                        else if (queryData.Tag == "Revised")
                            _res.Msg = "Batch Data Revised Successfully....";

                        string path = HttpContext.Current.Server.MapPath("~/images/BatchQRCode/");
                        //string path = @"D:\Newfolder\";
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
        //[HttpPost]
        //public IHttpActionResult BatchPrepare_SaveUpdate(BatchPrepareWrapper _obj)
        //{
        //    _res = new CommonModel.Response();
        //    try
        //    {
        //        var queryData = new BatchPrepare().BatchPrepare_SaveUpdate(_obj);

        //        if (queryData == null)
        //        {
        //            _res.Msg = "Machine data not updated....";
        //            return Ok(_res);
        //        }
        //        else
        //        {
        //            _res.response = true;
        //            //_res.Data = queryData.BatchNo;

        //            _res.Msg = "Data saved successfully...";
        //            return Ok(_res);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _res.ErrorMsg = ex.Message;
        //        return Ok(_res);
        //    }
        //}
    }
}
