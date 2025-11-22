using Dyeing.API.Models;
using Dyeing.API.Models.FabricDataConfiguration;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
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
using static Dyeing.API.Models.CommonModel;
using static Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration.FinFabReqConfigModel;
using static Dyeing.API.Models.FabricDataConfiguration.FinishFabricInspectionOnlineModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinishFabricInspectionConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();

        [HttpGet]
        public async Task<IHttpActionResult> GetQcMcNo(string userid)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetQcMcNo(userid);

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
        public async Task<IHttpActionResult> GetRollNo(string BatchNo, int CompTime)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetRollNoList(BatchNo, CompTime);

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
        public async Task<IHttpActionResult> GetRollStatus(string BatchNo, int CompTime)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetRollStatus(BatchNo, CompTime);

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
        public async Task<IHttpActionResult> GetRollList(string BatchNo, int CompTime)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineSampleModel().GetRollList(BatchNo, CompTime);

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
        public IHttpActionResult GetInspectionInfo(string FilterText, int RollNo, string type, int CompTime)
        {
            try
            {
                //DataTable dt = new DataTable();
                FinishFabricInspectionOnlineModel cls = new FinishFabricInspectionOnlineModel();
                Wrapper wrapper = new Wrapper();
                IEnumerable<FaultEntityDetail> lFdetail = new FaultEntityDetail[] { new FaultEntityDetail() };
                IEnumerable<FaultPointTemp> pointTemp; 
                IEnumerable<FaultEntityDetail> faultTemp;
                
                wrapper.master = cls.GetInspectionInfo(type, FilterText, RollNo, CompTime);
                wrapper.batchSpecs = cls.GetBatchSpec(FilterText).ToList();
                //wrapper.grade = cls.GetInspectionGrade(type, FilterText);
                pointTemp = cls.GetInspectionPoints();                
                faultTemp = cls.GetFaultEntityDetail(FilterText, RollNo, CompTime);
                
                List<DataTable> result = ConvertToDataTable(pointTemp).AsEnumerable()
                  .GroupBy(row => row.Field<Int32>("NameID"))
                  .Select(g => g.CopyToDataTable())
                  .ToList();
                if (faultTemp.Count() > 0)
                {
                    int i = 0;
                    foreach (var lFault in faultTemp)
                    {

                        FaultEntityDetail fault = new FaultEntityDetail();
                        fault.DyedInspectionDetailID = lFault.DyedInspectionDetailID;
                        fault.NameID = lFault.NameID;
                        fault.FaultName = lFault.FaultName;
                        fault.TotalPoint = lFault.TotalPoint;
                        fault.PointData = lFault.PointData;
                        fault.Flag = lFault.Flag;
                        fault.sl = i;
                        foreach (DataTable dtb in result)
                        {
                            if (dtb.Rows[0]["NameID"].ToString() == lFault.NameID.ToString())
                            {
                                IEnumerable<FaultPoint> lPoints= new FaultPoint[] { new FaultPoint() };
                                string PointID = "", PHeadNo="";
                                for (var j = 0; j < dtb.Rows.Count; j++)
                                {
                                    FaultPoint pointObj = new FaultPoint();
                                    pointObj.PHeadNo = dtb.Rows[j]["PHeadNo"].ToString();
                                    pointObj.PointID = dtb.Rows[j]["PHeadNo"].ToString();
                                    pointObj.PointName = dtb.Rows[j]["FromTo"].ToString();
                                    pointObj.PointValue = dtb.Rows[j]["Point"].ToString();
                                    PointID = pointObj.PointID;
                                    PHeadNo = pointObj.PHeadNo;
                                    lPoints = lPoints.Concat(new[] { pointObj });
                                }
                                //lPoints.(0);
                                lPoints = lPoints.Where(u => u.PointID != null).ToList();
                                fault.lPoints = lPoints;
                                fault.PointID = PointID;
                                fault.PHeadNo = PHeadNo;
                                i++;
                                break;
                            }
                        }
                        
                        lFdetail = lFdetail.Concat(new[] { fault });
                        
                    }
                }
                lFdetail = lFdetail.Where(u => u.PointID != null).ToList();
                wrapper.fault = lFdetail;
                return Ok(wrapper);
                
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }

        private DataTable ConvertToDataTable(IEnumerable<FaultPointTemp> point)
        {
            var props = typeof(FaultPointTemp).GetProperties();

            var dt = new DataTable();
            dt.Columns.AddRange(
              props.Select(p => new DataColumn(p.Name, p.PropertyType)).ToArray()
            );

            point.ToList().ForEach(
              i => dt.Rows.Add(props.Select(p => p.GetValue(i, null)).ToArray())
            );

            return dt;
        }

        [HttpPost]
        public IHttpActionResult SaveUpdate(InspectionMasterSaveOnline _obj)
        {
            _res = new CommonModel.Response();
            try 
            {
                InspectionModel queryData = new FinishFabricInspectionOnlineModel().SaveUpdate(_obj);

                if (queryData == null)
                {
                    if (_obj.MasterId == -1) _res.Msg = "Inspection Data Not Saved....";
                    else _res.Msg = "Inspection Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                //if (_obj.DyedInspectionEntryID == -1)
                {
                    int rollNo = Convert.ToInt32(queryData.Data);
                    _res.Msg = "Inspection Data Saved Successfully.";
                    //if (rollNo > 0)
                    _res.Msg += " The New Roll No: "+rollNo;
                    //_res.Data = rollNo;

                    string path = HttpContext.Current.Server.MapPath("~/images/RollSticker/");
                    string rollNoFull = _obj.BatchNo + "(" + rollNo + ")";
                    string fileName = rollNoFull.Replace("+", "_") + ".png";
                    string file = path + fileName;

                    string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                    string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
                    string stickerPath = "";
                    if (baseUrl.Contains("mis-dyeing")|| baseUrl.Contains("192.168.50.60"))
                        stickerPath=protocol + baseUrl + "/dyeingApi/images/RollSticker/"+ fileName;
                    else
                        stickerPath = protocol + baseUrl + "/images/RollSticker/" + fileName;

                    _res.Data = new {rollNo= rollNo , stickerPath= stickerPath, TotalRoll=queryData.TotalRoll, 
                        TRollWeight=queryData.TRollWeight, 
                        FDia =queryData.FDia, FGSM=queryData.FGSM, FabType=queryData.FabType, 
                        BatchWeight=queryData.BatchWeight, BodyPart=queryData.BodyPart };

                    DirectoryInfo d = new DirectoryInfo(path);
                    if (!d.Exists)
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    if (!System.IO.File.Exists(file))
                    {
                        QRCodeGenerator qrGenerator = new QRCodeGenerator();
                        QRCodeData qrCodeData = qrGenerator.CreateQrCode(rollNoFull, QRCodeGenerator.ECCLevel.Q);
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
        public async Task<IHttpActionResult> GetOriginStatus(string BatchNo)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetOriginStatus(BatchNo);

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

        // updated by Sujan Das on 04-Jan-24 
        // to view the batch information of new system

        [HttpGet]
        public IHttpActionResult GetInspectionInfoNew(string FilterText, int RollNo, string type, int CompTime)
        {
            try
            {
                //DataTable dt = new DataTable();
                FinishFabricInspectionOnlineModel cls = new FinishFabricInspectionOnlineModel();
                Wrapper wrapper = new Wrapper();
                IEnumerable<FaultEntityDetail> lFdetail = new FaultEntityDetail[] { new FaultEntityDetail() };
                IEnumerable<FaultPointTemp> pointTemp;
                IEnumerable<FaultEntityDetail> faultTemp;

                wrapper.master = cls.GetInspectionInfoNew(type, FilterText, RollNo, CompTime);
                //wrapper.batchSpecs = cls.GetBatchSpecNew(FilterText).ToList();
                // updated by Sujan Das on 10-Mar-2025 for integrating Dia and Gsm with Body Part ID and Name
                wrapper.batchSpecsWithDiaGSM = cls.GetBatchSpecNewWithDiaGSM(FilterText).ToList();



                pointTemp = cls.GetInspectionPoints();
                faultTemp = cls.GetFaultEntityDetailNew(FilterText, RollNo, CompTime);

                List<DataTable> result = ConvertToDataTable(pointTemp).AsEnumerable()
                  .GroupBy(row => row.Field<Int32>("NameID"))
                  .Select(g => g.CopyToDataTable())
                  .ToList();
                if (faultTemp.Count() > 0)
                {
                    int i = 0;
                    foreach (var lFault in faultTemp)
                    {

                        FaultEntityDetail fault = new FaultEntityDetail();
                        fault.DyedInspectionDetailID = lFault.DyedInspectionDetailID;
                        fault.NameID = lFault.NameID;
                        fault.FaultName = lFault.FaultName;
                        fault.TotalPoint = lFault.TotalPoint;
                        fault.PointData = lFault.PointData;
                        fault.Flag = lFault.Flag;
                        fault.sl = i;
                        foreach (DataTable dtb in result)
                        {
                            if (dtb.Rows[0]["NameID"].ToString() == lFault.NameID.ToString())
                            {
                                IEnumerable<FaultPoint> lPoints = new FaultPoint[] { new FaultPoint() };
                                string PointID = "", PHeadNo = "";
                                for (var j = 0; j < dtb.Rows.Count; j++)
                                {
                                    FaultPoint pointObj = new FaultPoint();
                                    pointObj.PHeadNo = dtb.Rows[j]["PHeadNo"].ToString();
                                    pointObj.PointID = dtb.Rows[j]["PHeadNo"].ToString();
                                    pointObj.PointName = dtb.Rows[j]["FromTo"].ToString();
                                    pointObj.PointValue = dtb.Rows[j]["Point"].ToString();
                                    PointID = pointObj.PointID;
                                    PHeadNo = pointObj.PHeadNo;
                                    lPoints = lPoints.Concat(new[] { pointObj });
                                }
                                //lPoints.(0);
                                lPoints = lPoints.Where(u => u.PointID != null).ToList();
                                fault.lPoints = lPoints;
                                fault.PointID = PointID;
                                fault.PHeadNo = PHeadNo;
                                i++;
                                break;
                            }
                        }

                        lFdetail = lFdetail.Concat(new[] { fault });

                    }
                }
                lFdetail = lFdetail.Where(u => u.PointID != null).ToList();
                wrapper.fault = lFdetail;
                return Ok(wrapper);

            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }

        [HttpPost]
        public IHttpActionResult SaveUpdateNew(InspectionMasterSaveOnline _obj,string status)
        {
            _res = new CommonModel.Response();
            InspectionModel queryData = null;
            try
            {
                if (status == "Old")
                {
                     queryData = new FinishFabricInspectionOnlineModel().SaveUpdate(_obj);
                }
                else
                {
                     queryData = new FinishFabricInspectionOnlineModel().SaveUpdateNew(_obj);
                }

                if (queryData == null)
                {
                    if (_obj.MasterId == -1) _res.Msg = "Inspection Data Not Saved....";
                    else _res.Msg = "Inspection Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                //if (_obj.DyedInspectionEntryID == -1)
                {
                    int rollNo = Convert.ToInt32(queryData.Data);
                    _res.Msg = "Inspection Data Saved Successfully.";
                    //if (rollNo > 0)
                    _res.Msg += " The New Roll No: " + rollNo;
                    //_res.Data = rollNo;

                    string path = HttpContext.Current.Server.MapPath("~/images/RollSticker/");
                    string rollNoFull = _obj.BatchNo + "(" + rollNo + ")";
                    string fileName = rollNoFull.Replace("+", "_") + ".png";
                    string file = path + fileName;

                    string protocol = HttpContext.Current.Request.ServerVariables["HTTPS"] == "off" ? "http://" : "https://";
                    string baseUrl = HttpContext.Current.Request.ServerVariables["HTTP_HOST"];
                    string stickerPath = "";
                    if (baseUrl.Contains("mis-dyeing") || baseUrl.Contains("192.168.50.60") || baseUrl.Contains("192.168.50.61"))
                        stickerPath = protocol + baseUrl + "/dyeingApi/images/RollSticker/" + fileName;
                    else
                        stickerPath = protocol + baseUrl + "/images/RollSticker/" + fileName;

                    _res.Data = new
                    {
                        rollNo = rollNo,
                        stickerPath = stickerPath,
                        TotalRoll = queryData.TotalRoll,
                        TRollWeight = queryData.TRollWeight,
                        FDia = queryData.FDia,
                        FGSM = queryData.FGSM,
                        FabType = queryData.FabType,
                        BatchWeight = queryData.BatchWeight,
                        BodyPart = queryData.BodyPart
                    };

                    DirectoryInfo d = new DirectoryInfo(path);
                    if (!d.Exists)
                    {
                        System.IO.Directory.CreateDirectory(path);
                    }
                    if (!System.IO.File.Exists(file))
                    {
                        QRCodeGenerator qrGenerator = new QRCodeGenerator();
                        QRCodeData qrCodeData = qrGenerator.CreateQrCode(rollNoFull, QRCodeGenerator.ECCLevel.Q);
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

        // updated by Sujan Das on 06-Jan-24 
        // to view the  total roll and total weight
        [HttpGet]
        public async Task<IHttpActionResult> GetRollStatusNew(string BatchNo, int CompTime)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetRollStatusNew(BatchNo, CompTime);

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
        public async Task<IHttpActionResult> GetRollNoNew(string BatchNo, int CompTime)
        {
            try
            {
                var queryData = await new FinishFabricInspectionOnlineModel().GetRollNoListNew(BatchNo, CompTime);

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
