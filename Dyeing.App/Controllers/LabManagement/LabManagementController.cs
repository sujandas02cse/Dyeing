using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RDLC;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.SqlServer.Server;
using System.Data;

namespace Dyeing.App.Controllers.LabManagement
{
    public class LabManagementController : Controller
    {
        PrintRDLC prn = new PrintRDLC();
        LocalReport rpt = new LocalReport();
        public HttpClient client;

        public LabManagementController()
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


        public async Task<ActionResult> LabDipReceipeCardReport(int LabBookReceiveId,string Format)
        {
            string RptPath = "~/Reports/LabManagement/LabDipReceipeReport1.rdlc";
            //string DataSet = "BatchCard";
            try
            {
                prn = new PrintRDLC();
                rpt = new LocalReport();
                DataTable dt = new DataTable();
                List<object> _lobj = new List<object>();

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = await client.GetAsync("LabRelatedDashboard/GetLabDipReceipeMasterData?LabBookReceiveId=" + LabBookReceiveId);
                if (response.IsSuccessStatusCode)
                {
                    _lobj = await response.Content.ReadAsAsync<List<object>>();
                    var json = JsonConvert.SerializeObject(_lobj);
                    dt = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
                }
                ReportDataSource rs = new ReportDataSource("LabDipReceipe", dt);
                rpt.DataSources.Add(rs);

                rpt.ReportPath = Server.MapPath(RptPath);

                rpt.Refresh();
                var fileStream = prn.Export(Format, rpt);

                if (Format == "PDF")
                    return File(fileStream, "application/pdf");//,"BatchCard_"+ BatchNo + ".pdf");

                //else if (Format == "Excel")
                //    return File(fileStream, "application/vnd.ms-excel", "BatchCard.xls");

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