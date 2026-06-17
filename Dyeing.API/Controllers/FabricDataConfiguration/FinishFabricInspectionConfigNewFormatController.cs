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
using System.Web;
using System.Web.Http;
using static Dyeing.API.Models.FabricDataConfiguration.FinishFabricInspectionOnlineModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinishFabricInspectionConfigNewFormatController : ApiController
    {

        CommonModel.Response _res = new CommonModel.Response();

        [HttpPost]
       // public IHttpActionResult Save(string status, InspectionMasterSaveOnline _obj)

        public IHttpActionResult Save(string status, InspectionMasterSaveOnlineNewFormat _obj)
            
        {
            _res = new CommonModel.Response();
            InspectionModelNew queryDataNew = null;

            try
            {

                if (status == "N")
                    queryDataNew = new FinishFabricInspectionOnlineModel().SaveNewFormat(_obj);
                else if (status == "R")
                    queryDataNew = new FinishFabricInspectionOnlineModel().UpdateNewFormat(_obj);

                //  queryDataNew = new FinishFabricInspectionOnlineModel().SaveNewFormat(_obj);


                if (queryDataNew == null)
                    {
                        if (_obj.MasterId == -1) _res.Msg = "Inspection Data Not Saved....";
                        else _res.Msg = "Inspection Data Not Updated....";
                        return Ok(_res);
                    }


                _res.response = true;

              
                {
                    int rollNo = 0;
                 
               
                        rollNo = Convert.ToInt32(queryDataNew.Data);

                    _res.Msg = "Inspection Data Saved Successfully.";
                
                    _res.Msg += " The New Roll No: " + rollNo;
              

                    string path = HttpContext.Current.Server.MapPath("~/images/RollSticker/");
                    string rollNoFull = _obj.BatchNo + "(" + rollNo + ")";
                    string fileName = rollNoFull.Replace("+", "_") + ".png";
                    string file = path + fileName;

                    string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                    string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
                    string stickerPath = "";

                    string QRCode = "";
                    string UnitShortName = "";

                  
                    
                        QRCode = queryDataNew.QRCode.ToString();
                        UnitShortName = queryDataNew.UnitShortName.ToString();
                    

                    if (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.60") || baseUrl.Contains("192.168.50.61"))
                        stickerPath = protocol + baseUrl + "/dyeingApi/images/RollSticker/" + fileName;
                    else
                        stickerPath = protocol + baseUrl + "/images/RollSticker/" + fileName;
                   
                        _res.Data = new
                        {
                            rollNo = rollNo,
                            stickerPath = stickerPath,
                            TotalRoll = queryDataNew.TotalRoll,
                            TRollWeight = queryDataNew.TRollWeight,
                            FDia = queryDataNew.FDia,
                            FGSM = queryDataNew.FGSM,
                            FabType = queryDataNew.FabType,
                            BatchWeight = queryDataNew.BatchWeight,
                            BodyPart = queryDataNew.BodyPart,
                            QRCode = queryDataNew.QRCode,
                            UnitShortName = queryDataNew.UnitShortName,
                            FabricType=queryDataNew.FabType,
                            Composition=queryDataNew.Composition
                        };

                   

                    DirectoryInfo d = new DirectoryInfo(path);
                    if (!d.Exists)
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    if (!System.IO.File.Exists(file))
                    {
                     
                       
                            QRCodeGenerator qrGenerator = new QRCodeGenerator();
                            QRCodeData qrCodeData = qrGenerator.CreateQrCode(QRCode, QRCodeGenerator.ECCLevel.Q);
                            QRCode qrCode = new QRCode(qrCodeData);
                            Bitmap qrCodeImage = qrCode.GetGraphic(20);
                            qrCodeImage.Save(file, ImageFormat.Png);
                        
                    }
                }
                //else _res.Msg = "Inspection Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult LoadAllGeneratedRolls(int mcOperationMasterId)
        {
            try
            {

                var queryData = new FinishFabricInspectionOnlineModel().LoadAllGeneratedRolls(mcOperationMasterId);

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
        public IHttpActionResult LoadRollWiseInspectionPoints(int BpmId,int RollNo)
        {
            try
            {

                var queryData = new FinishFabricInspectionOnlineModel().LoadRollWiseInspectionPoints(BpmId, RollNo);

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
        public IHttpActionResult LoadRollWiseFaults(int BpmId, int RollNo)
        {
            try
            {
                var queryData = new FinishFabricInspectionOnlineModel().LoadRollWiseFaults(BpmId, RollNo);

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
        public IHttpActionResult DisplayRollWiseBodyPart(int BpmId, int RollNo)
        {
            try
            {
                var queryData = new FinishFabricInspectionOnlineModel().DisplayRollWiseBodyPart(BpmId, RollNo);

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