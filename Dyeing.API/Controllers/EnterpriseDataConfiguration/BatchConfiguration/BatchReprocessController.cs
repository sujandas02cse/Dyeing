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
using static Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration.BatchReprocessModel;

namespace Dyeing.API.Controllers.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchReprocessController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetBatchReprocessData(int UnitId, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var queryData = await new BatchReprocessModel().GetReprocessBatchData(UnitId, FromDate, ToDate);

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
        public IHttpActionResult GetBatchReprocessDataById(int BpmId, int ReprocessNo)
        {
            ReprocessNo = ReprocessNo == null ? 0 : ReprocessNo;
            try
            {
                var queryData = new BatchReprocessModel().GetBatchReprocessDataById(BpmId, ReprocessNo);

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
        public IHttpActionResult BatchReprocessData_SaveUpdate(BatchReprocessWrapper _obj)
        {
            _res = new CommonModel.Response();
            try
            {

                var queryData = new BatchReprocessModel().BatchReprocessData_SaveUpdate(_obj);

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
                    if (queryData.Tag == "saved" || queryData.Tag == "revised")
                    {
                        if (queryData.Tag == "saved")
                            _res.Msg = "Batch Reprocess Data Saved Successfully....";
                        else if (queryData.Tag == "revised")
                            _res.Msg = "Batch Reprocess Data Revised Successfully....";

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
    }
}
