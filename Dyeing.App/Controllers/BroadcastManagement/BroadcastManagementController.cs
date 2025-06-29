using Dyeing.App;
using Dyeing.App.Models;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RDLC;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static Dyeing.App.Models.BroadcastDataModel;

namespace AMS.UI.Controllers
{
    public class BroadcastManagementController : Controller
    {
        PrintRDLC prn = new PrintRDLC();
        LocalReport rpt = new LocalReport();
        CommRptInfo _rptInfo = new CommRptInfo();
        DataProcessingModel _dpm = new DataProcessingModel();       
        public HttpClient client;
       
        public BroadcastManagementController()
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

        public async Task<ActionResult> GetBroadcastData(string rptComInfo, string rptParm, string SQL, string Dataset)
        {
            prn = new PrintRDLC();
            rpt = new LocalReport();
            _rptInfo = new CommRptInfo();
            DataTable dt=new DataTable();
            BasicBroadcast rptModel = new BasicBroadcast();
            //List<BasicBroadcast> _lobj = new List<BasicBroadcast>();
            List<object> _lobj = new List<object>();

            _rptInfo = _dpm.ProcessRptInfo(rptComInfo, rptParm, SQL, Dataset);

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
            HttpResponseMessage response = await client.GetAsync(_rptInfo.APIAction + "?SQL=" + _rptInfo.SQL + "&&rptParm=" + rptParm);
            if (response.IsSuccessStatusCode)
            {
                _lobj = await response.Content.ReadAsAsync<List<object>>();
                var json = JsonConvert.SerializeObject(_lobj);
                dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
            }            

            rpt.ReportPath = Server.MapPath(_rptInfo.ReportPath);

            ReportDataSource rs = new ReportDataSource(_rptInfo.Dataset, dt);
            rpt.DataSources.Add(rs);

            if(_rptInfo.SQL1 != null && _rptInfo.SQL1 !="")
            {
                HttpResponseMessage response1 = await client.GetAsync(_rptInfo.APIAction + "?SQL=" + _rptInfo.SQL1 + "&&rptParm=" + rptParm);
                if (response1.IsSuccessStatusCode)
                {
                    _lobj = await response1.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

                rpt.ReportPath = Server.MapPath(_rptInfo.ReportPath);

                ReportDataSource rs1 = new ReportDataSource(_rptInfo.Dataset1, dt);
                rpt.DataSources.Add(rs1);
            }

            var fileStream = prn.Export(_rptInfo.Format, rpt);

            if (_rptInfo.Format == "PDF")                
                return File(fileStream, "application/pdf");
            
            else if (_rptInfo.Format == "Excel")             
                return File(fileStream, "application/vnd.ms-excel", _rptInfo.FileName + ".xls");
            
            else         
                return File(fileStream, "application/ms-word", _rptInfo.FileName + ".doc");
            
        }


        public async Task<ActionResult> GetBroadcastDataLabSticker(string rptComInfo, string rptParm, string SQL, string Dataset, string PartialParam)
        {
            prn = new PrintRDLC();
            rpt = new LocalReport();
            _rptInfo = new CommRptInfo();
            DataTable dt = new DataTable();
            BasicBroadcast rptModel = new BasicBroadcast();
            //List<BasicBroadcast> _lobj = new List<BasicBroadcast>();
            List<object> _lobj = new List<object>();

            _rptInfo = _dpm.ProcessRptInfo(rptComInfo, rptParm, SQL, Dataset);

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
            HttpResponseMessage response = await client.GetAsync(_rptInfo.APIAction + "?SQL=" + _rptInfo.SQL + "&&rptParm=" + rptParm);
            if (response.IsSuccessStatusCode)
            {
                _lobj = await response.Content.ReadAsAsync<List<object>>();
                var json = JsonConvert.SerializeObject(_lobj);
                dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
            }
            rpt.ReportPath = Server.MapPath(_rptInfo.ReportPath);
            ReportDataSource rs = new ReportDataSource(_rptInfo.Dataset, dt);
            rpt.DataSources.Add(rs);


            //List<ReportParameter> paramList = new List<ReportParameter>();
            //paramList.Add(new ReportParameter("BatchQRCode", "http://example.com/yourqrcode.png")); // if passing QR code path

            rpt.EnableExternalImages = true;
            //rpt.SetParameters(paramList);


            if (_rptInfo.SQL1 != null && _rptInfo.SQL1 != "")
            {
                HttpResponseMessage response1 = await client.GetAsync(_rptInfo.APIAction + "?SQL=" + _rptInfo.SQL1 + "&&rptParm=" + rptParm);
                if (response1.IsSuccessStatusCode)
                {
                    _lobj = await response1.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }

                rpt.ReportPath = Server.MapPath(_rptInfo.ReportPath);

                ReportDataSource rs1 = new ReportDataSource(_rptInfo.Dataset1, dt);
                rpt.DataSources.Add(rs1);
            }

            var fileStream = prn.Export(_rptInfo.Format, rpt);

            if (_rptInfo.Format == "PDF")
                return File(fileStream, "application/pdf");

            else if (_rptInfo.Format == "Excel")
                return File(fileStream, "application/vnd.ms-excel", _rptInfo.FileName + ".xls");

            else
                return File(fileStream, "application/ms-word", _rptInfo.FileName + ".doc");

        }


    }
}