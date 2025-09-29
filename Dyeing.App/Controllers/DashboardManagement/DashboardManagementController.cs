using Dyeing.App.Models;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using RDLC;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static Dyeing.App.Models.BroadcastDataModel;

namespace Dyeing.App.Controllers.DashboardManagement
{
    public class DashboardManagementController : Controller
    {
        PrintRDLC prn = new PrintRDLC();
        LocalReport rpt = new LocalReport();       
        public HttpClient client;

        public DashboardManagementController()
        {
            client = new HttpClient { BaseAddress = new Uri(Common.baseURL) };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromMinutes(60);
        }

        #region BasicBroadcast
        public ActionResult BasicBroadcast()
        {
            if (Session["UserId"] == null)
                return RedirectToAction("Login", "Home");
            else
                return View();
        }
        #endregion

        public async Task<ActionResult> GetProductionPlanReport(string UnitId, string FromDate, string ToDate, string Format)
        {
            string APIActionParam = "DataRelatedDashboard/GetPlanData?UnitId=" + UnitId + "&&FromDate=" + FromDate + "&&ToDate=" + ToDate;
            string RptPath = "~/Reports/DataRelatedDashboard/ProductionPlanDashboard.rdlc";
            string DataSet = "PlanData";
            return await GetReportData(APIActionParam, Format, "ProductionPlanData", RptPath, DataSet);
        }
        
        public async Task<ActionResult> GetMasterDataReport(int UnitId, DateTime FromDate, DateTime ToDate, string Format)
        {
            string APIActionParam = "DataRelatedDashboard/GetMasterData?UnitId=" + UnitId + "&&Fromdate=" + FromDate + "&&Todate=" + ToDate;
            string RptPath = "~/Reports/DataRelatedDashboard/MasterDataDashboard.rdlc";
            string DataSet = "MasterData";
            return await GetReportData(APIActionParam, Format, "MasterData", RptPath, DataSet);
        }
        public async Task<ActionResult> SwatchCard(int BpmId, int RUnitId, string Format)
        {            
            string RptPath = "~/Reports/DataRelatedDashboard/ShadeCard.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetSwatchCardData?BpmId=" + BpmId+ "&&RUnitId="+ RUnitId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("ShadeCard", dt);
                rpt.DataSources.Add(rs);                

                rpt.ReportPath = Server.MapPath(RptPath);                

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }
        public async Task<ActionResult> BatchCardReportPP(int BpmId, string Format)
        {            
            string RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewPP.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchPrepMaster?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }                
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchSpecData?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardDetail", dt);
                rpt.DataSources.Add(rs1);             

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzle?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs4 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs4);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";//
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();                

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }
        public async Task<ActionResult> BatchCardReportC(int BpmId, string Format)
        {
            string RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewC.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchPrepMaster?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchSpecData?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardDetail", dt);
                rpt.DataSources.Add(rs1);

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzle?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs4 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs4);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";//
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }
        public async Task<ActionResult> BatchCardReportN(int BpmId, string Format)
        {
            string RptPath = "~/Reports/DataRelatedDashboard/BatchCardNew.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchPrepMaster?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchSpecData?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardDetail", dt);
                rpt.DataSources.Add(rs1);

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzle?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs4 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs4);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";//
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }
       
        public async Task<ActionResult> BatchCardReportV2(int BpmId, string Format,string rType)
        {
            string RptPath = "";
            if (rType == "PPSample")
                RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewV2PP.rdlc";
            else if (rType == "China")
                RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewV2C.rdlc";
            else if (rType == "PPC")
                RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewV2PPC.rdlc";
            else if(rType == "o")
                RptPath = "~/Reports/DataRelatedDashboard/BatchCardNewV2.rdlc";

            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchCardMasterNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject<DataTable>(json);
                }
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardDataNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardData", dt);
                rpt.DataSources.Add(rs1);


                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardSpecificationNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs2 = new ReportDataSource("BatchCardDetail", dt);
                rpt.DataSources.Add(rs2);

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzle?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs4 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs4);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";//
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ActionResult> GetPackingListReport(int PackingId, string Format,string BatchType)
        {
            string RptPath = "";

            if (BatchType=="Bulk")
            RptPath = "~/Reports/FabricManagement/PackingList.rdlc"; 
            else if(BatchType=="Sample")
            RptPath= "~/Reports/FabricManagement/PackingListSample.rdlc";
            else if(BatchType=="NewBulk")
                RptPath = "~/Reports/FabricManagement/PackingListAutoNew.rdlc";


            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = new HttpResponseMessage();

                if (BatchType == "Bulk")
                {
                    response = await client.GetAsync("DataRelatedDashboard/GetPackingListData?Id=" + PackingId);
                }

                else if (BatchType == "Sample")
                {
                    response = await client.GetAsync("DataRelatedDashboard/GetPackingListDataSample?Id=" + PackingId);
                }

                else if (BatchType=="NewBulk")
                {
                    response = await client.GetAsync("DataRelatedDashboard/GetPackingListDataAuto?Id=" + PackingId);
                }


                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("PackingList", dt);
                rpt.DataSources.Add(rs);

                string TrackingNo = dt.Rows[0]["TrackingNo"].ToString();                

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.PackingQrCodePath + TrackingNo + ".png";                
                ReportParameter parameter = new ReportParameter("QRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "PackingList.xls");

                else
                    return File(fileStream, "application/ms-word", "PackingList.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        private async Task<FileResult> GetReportData(string APIActionParam, string Format, string FileName, string RptPath, string DataSet)
        {
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync(APIActionParam);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

                rpt.ReportPath = Server.MapPath(RptPath);

                ReportDataSource rs = new ReportDataSource(DataSet, dt);
                rpt.DataSources.Add(rs);

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", FileName + ".xls");

                else
                    return File(fileStream, "application/ms-word", FileName + ".doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ActionResult> BatchCardReprocessReport(int BpmId, int ReprocessNo,string Format)
        {
            string RptPath = "~/Reports/DataRelatedDashboard/BatchCardNew.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchReprocessPrepMaster?BpmId=" + BpmId + "&ReprocessNo=" + ReprocessNo);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetBatchReprocessSpecData?BpmId=" + BpmId + "&ReprocessNo=" + ReprocessNo);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardDetail", dt);
                rpt.DataSources.Add(rs1);

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzle?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs4 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs4);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";//
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();
                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ActionResult> SampleBatchCardReport(int BpmId, string Format,string ReportType)
        {

            string RptPath = "";
            RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSampleAll.rdlc";


            //if (ReportType == "N")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSample.rdlc";

            //else if (ReportType== "PP")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSamplePP.rdlc";

            //else if (ReportType == "C")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSampleC.rdlc";

            //else if (ReportType=="DV")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSampleDV.rdlc";

            //else if (ReportType == "SMS")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSampleSMS.rdlc";

            //else if (ReportType == "Test")
            //RptPath = "~/Reports/DataRelatedDashboard/BatchCardForSampleTest.rdlc";

            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                DataTable batchSpecification = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
               
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchPrepMasterReport?BpmId=" + BpmId);
                
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("usp_rpt_SampleBatchPrepMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();
             

                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchPrepMasterDetailsReport?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("usp_rpt_SampleBatchPrepMasterDetails", dt);
                rpt.DataSources.Add(rs1);

                batchSpecification = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchCardSpecification?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    batchSpecification = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

                ReportDataSource specificationSource = new ReportDataSource("usp_rpt_SampleBatchSpecification",batchSpecification);
                rpt.DataSources.Add(specificationSource);
              
                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";

                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);

                ReportParameter ParamReportType= new ReportParameter("ReportType", ReportType);
                rpt.SetParameters(ParamReportType);


                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ActionResult> SwatchCardSample(int BpmId, int RUnitId, string Format)
        {
            string RptPath = "~/Reports/DataRelatedDashboard/SampleShadeCard.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetSampleSwatchCardData?BpmId=" + BpmId + "&&RUnitId=" + RUnitId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("usp_rpt_SampleShadeCard", dt);
                rpt.DataSources.Add(rs);

                rpt.ReportPath = Server.MapPath(RptPath);

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ActionResult> SampleBatchCardReportV2(int BpmId, string Format, string rType)
        {
            string RptPath = "";
            if (rType == "PPSample")
                RptPath = "~/Reports/DataRelatedDashboard/SampleBatchCardNewV2PP.rdlc";
            else if (rType == "China")
                RptPath = "~/Reports/DataRelatedDashboard/SampleBatchCardNewV2C.rdlc";
            else if (rType == "PPC")
                RptPath = "~/Reports/DataRelatedDashboard/SampleBatchCardNewV2PPC.rdlc";
            else if (rType == "o")
                RptPath = "~/Reports/DataRelatedDashboard/SampleBatchCardNewV2.rdlc";

            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                DataTable batchSpecification = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);

                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchPrepMasterReport?BpmId=" + BpmId);

                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("usp_rpt_SampleBatchPrepMaster", dt);
                rpt.DataSources.Add(rs);

                string BatchNo = dt.Rows[0]["BatchNo"].ToString();


                dt = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchPrepMasterDetailsReport?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("usp_rpt_SampleBatchPrepMasterDetails", dt);
                rpt.DataSources.Add(rs1);

                batchSpecification = new DataTable();
                response = await client.GetAsync("DataRelatedDashboard/GetSampleBatchCardSpecification?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    batchSpecification = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

                ReportDataSource specificationSource = new ReportDataSource("usp_rpt_SampleBatchSpecification", batchSpecification);
                rpt.DataSources.Add(specificationSource);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";

                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);

                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }


        #region New Process Report
        public async Task<ActionResult> NewBatchCardReport(int BpmId, string Format, string rType,int UnitNo,int DyeingUnit)
        {
            // string RptPath = DyeingUnit == 16 ? "~/Reports/PlanManagement/BatchCardNewV3.rdlc" : "~/Reports/PlanManagement/BatchCardNewV2New.rdlc";
            //string RptPath = DyeingUnit == 16 ? "~/Reports/PlanManagement/BatchCardNewV3.rdlc" : "~/Reports/PlanManagement/BatchCardNewV3.rdlc";

            string RptPath = "~/Reports/PlanManagement/BatchCard.rdlc";


            string RptType = "";
            if (rType == "PPSample")
                RptType = "PP";
            else if (rType == "China")
                RptType = "C";
            else if (rType == "PP Sample & China")
                RptType = "PPC";
            else if (rType == "Organic")
                RptType = "O";
            else if (rType == "PSI")
                RptType = "PSI";
            else if (rType == "First Batch")
                RptType = "FB";
            else if (rType == "Trial Batch")
                RptType = "TB";
            else if (rType == "Spudi")
                RptType = "S";
            else if (rType == "")
                RptType = "Unknown"; 
            else
                RptType = "Unknown";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);

                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetBatchCardMasterNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject<DataTable>(json);
                }
                ReportDataSource rs = new ReportDataSource("BatchCardMaster", dt);
                rpt.DataSources.Add(rs);
                string BatchNo = dt.Rows[0]["BatchNo"].ToString();
                dt = new DataTable();


                //Unit Name
                response = await client.GetAsync("CommonApi/GetUnitInfo?UnitNo=" + UnitNo + "");
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject<DataTable>(json);
                }
                string UnitName = dt.Rows[0]["UnitEName"].ToString();
                //string UnitName = "ABC";


                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardDataNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs1 = new ReportDataSource("BatchCardData", dt);
                rpt.DataSources.Add(rs1);
                dt = new DataTable();

                
                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardSpecificationNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs2 = new ReportDataSource("BatchCardSpec", dt);
                rpt.DataSources.Add(rs2);
                dt = new DataTable();


                response = await client.GetAsync("DataRelatedDashboard/GetTrolleyNozzleNew?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs3 = new ReportDataSource("Nozzle", dt);
                rpt.DataSources.Add(rs3);


                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardProcessFlowNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

               
                ReportDataSource rs4 = new ReportDataSource("ProcessFlow", dt);
                rpt.DataSources.Add(rs4);

                response = await client.GetAsync("DataRelatedDashboard/GetBatchCardOthersFlowNewV2?BpmId=" + BpmId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
               
                ReportDataSource rs5 = new ReportDataSource("Others", dt);
                rpt.DataSources.Add(rs5);


                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.QrCodePath + BatchNo + ".png";
                //string imagePath =  @"D:\Newfolder\" + BatchNo + ".png";
                //string path=new Uri(Server.MapPath("~/images/BatchQRCode/" + BatchNo + ".png")).AbsoluteUri;
                
                ReportParameter parameter = new ReportParameter("BatchQRCode", imagePath);
                rpt.SetParameters(parameter);

                ReportParameter waterMark = new ReportParameter("ImageParameter", RptType.ToString());
                rpt.SetParameters(waterMark);

                ReportParameter ParamReportType = new ReportParameter("UnitName", UnitName.ToString());
                rpt.SetParameters(ParamReportType);


                ReportParameter DyeingUnitType = new ReportParameter("DyeingUnit", DyeingUnit.ToString());
                rpt.SetParameters(DyeingUnitType);


                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw ;
            }
        }

        public async Task<ActionResult> GetPackingListReportAuto(int PackingId,string Format,string BatchType)
        {
            string RptPath = "";

            if(BatchType=="Bulk")
                RptPath = "~/Reports/FabricManagement/PackingListAutoNew.rdlc";
            else
                RptPath = "~/Reports/FabricManagement/PackingListAutoSample.rdlc";

            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization","Bearer"+Common.accessToken);
                HttpResponseMessage response = new HttpResponseMessage();

                if (BatchType == "Bulk")
                {
                    response = await client.GetAsync("DataRelatedDashboard/GetPackingListDataAuto?Id=" + PackingId);
                }
                else
                {
                    response = await client.GetAsync("DataRelatedDashboardController/GetPackingListDataSample?Id"+PackingId);
                }

                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json,(typeof(DataTable)));
                }

                ReportDataSource rs = new ReportDataSource("PackingList", dt);
                rpt.DataSources.Add(rs);

                string TrackingNo = dt.Rows[0]["TrackingNo"].ToString();

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.EnableExternalImages = true;
                string imagePath = Common.PackingQrCodePath + TrackingNo + ".png";
                ReportParameter parameter = new ReportParameter("QRCode", imagePath);
                rpt.SetParameters(parameter);
                rpt.Refresh();

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");
                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "PackingList.xls");
                else
                    return File(fileStream, "application/ms-word", "PackingList.doc");
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<ActionResult> SwatchCardNewBulk(int BpmId, int RUnitId, string Format)
        {
            string RptPath = "~/Reports/DataRelatedDashboard/ShadeCardNewBulk.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("DataRelatedDashboard/GetSwatchCardDataNewBulk?BpmId=" + BpmId + "&&RUnitId=" + RUnitId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("ShadeCard", dt);
                rpt.DataSources.Add(rs);

                rpt.ReportPath = Server.MapPath(RptPath);

                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                else if (Format == "Excel")
                    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

                else
                    return File(fileStream, "application/ms-word", "BatchCard.doc");
            }
            catch (Exception e)
            {
                throw;
            }
        }

        #endregion

    }
}