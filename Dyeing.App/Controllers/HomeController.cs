using Dyeing.App.Model.MenuOperation;
using Dyeing.App.Models.Common;
using Dyeing.App.Models.UserManagement;
using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
//using RabbitMQ.Client;
//using RabbitMQ.Client.Events;
using RDLC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Dyeing.App.Controllers
{
    [NoCacheAttribute]
    public class HomeController : Controller
    {
        PrintRDLC prn = new PrintRDLC();
        LocalReport rpt = new LocalReport();        

        HttpClient client = new HttpClient();
        public HomeController()
        {
            client.BaseAddress = new Uri(Common.baseURL);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));            
        }


        // GET: Login
        public ActionResult Index()
        {
            if (Session["UserId"] != null)
                return View();
            else
                return RedirectToAction("Login", "Home");
        }

        public ActionResult Routing() // Routing
        {
            return View();
        }

        public ActionResult Login()
        {
            //ConnectionFactory connectionFactory = new ConnectionFactory();
            //IConnection connection = connectionFactory.CreateConnection();

            //Send("IDG", "Hello World!");
            //Receive("IDG");

            if (Session["UserId"] == null)
                return View();
            else
                return RedirectToAction("Index", "Home");
        }
        
        public ActionResult Login1()
        {
            if (Session["UserId"] == null)
                return View();
            else
                return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<ActionResult> UserLogin(UserLogin userLogin)
        {
            UserLogin ul = new UserLogin();
            string url = Common.baseURL + "CommonAPI/GetUserLogin?UserName=" + Uri.EscapeDataString(userLogin.UserName) + "&&PassWord=" + Uri.EscapeDataString(userLogin.PassWord) + "";

            await GetAccessToken(userLogin.UserName, userLogin.PassWord);

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
            HttpResponseMessage response = await client.GetAsync(url);
            ul = await response.Content.ReadAsAsync<UserLogin>();
            //var data = await response.Content.ReadAsStringAsync();
            //ul = JsonConvert.DeserializeObject<UserLogin>(data);
            if (ul.IsPermitted)
            {
                ViewBag.msg = "Home";
                if (ul.Attachment == null)
                {
                    //Byte[] bytes = System.IO.File.ReadAllBytes(Server.MapPath("/Template/assets/img/logo.png"));
                    Byte[] bytes = System.IO.File.ReadAllBytes(Server.MapPath("/content/img/logo.jpg"));
                    ul.EmpImage = Convert.ToBase64String(bytes);
                    Session["UserImage"] = ul.EmpImage;
                    Session["EmpName"] = ul.Name;
                    Session["Designation"] = ul.Designation;
                }
                else
                {
                    ul.EmpImage = Convert.ToBase64String(ul.Attachment);
                    Session["UserImage"] = ul.EmpImage;//"/Template/assets/img/logo.png";
                    Session["EmpName"] = ul.Name;
                    Session["Designation"] = ul.Designation;
                }


                Session["UserId"] = userLogin.UserName;
                Session["AssemblyVersion"] = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();                
                return Json(ul, JsonRequestBehavior.AllowGet);
            }            
            return Json(ul, JsonRequestBehavior.AllowGet); //View("Login");
        }
        //public ActionResult GetUserData()
        //{

        //}
        public ActionResult Logout()
        {
            Common.accessToken = null;
            Session.Clear();
            return RedirectToAction("Login");
        }


        public ActionResult DynamicMenuLoad()
        {
            List<MainMenuOperation> ObjParrentMenus = null;
            try
            {               
                string url = Common.baseURL + "CommonAPI/getParentMenu?userId=" + Session["UserId"];
                List<ListOfMenus> _listOfMenus = new List<ListOfMenus>();
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
                HttpResponseMessage response = client.GetAsync(url).Result;
                _listOfMenus = response.Content.ReadAsAsync<List<ListOfMenus>>().Result;

                List<MainMenuOperation> MenuOperationList = new List<MainMenuOperation>();
                ObjParrentMenus = _listOfMenus.Where(x => x.ParantManuId == 0).ToList().Select(p => new MainMenuOperation
                {
                    ManuId = p.ManuId,
                    ManuName = p.ManuName,
                    ChildMenuNameList = _listOfMenus.Where(m => m.ParantManuId == p.ManuId)
                  .ToList()
                  .Select(m => new ChildMenuName
                  {
                      MenuIdChild = m.ManuId,
                      ManuName_Child = m.ManuName,
                      PageFolder = m.PageFolder,
                      PageName = m.PageName,
                      ChildChildMenuNameList = _listOfMenus.Where(s => s.ParantManuId == m.ManuId).ToList().Select
                          (x => new ChildChildMenuName
                          {
                              MenuIdChildChild = x.ManuId,
                              ManuName_ChildChild = x.ManuName,
                              PageFolder = x.PageFolder,
                              PageName = x.PageName,
                              ChildChildChildMenuNameList = _listOfMenus.Where(c => c.ParantManuId == x.ManuId).ToList().Select(z => new ChildChildChildMenuName
                              {
                                  MenuIdChildChildChild = z.ManuId,
                                  ManuName_ChildChildChild = z.ManuName,
                                  PageFolder = z.PageFolder,
                                  PageName = z.PageName
                              }).ToList(),
                          }).ToList(),
                  }).ToList(),
                }).ToList();

            }
            catch (Exception ex)
            {

            }
            return PartialView("~/Views/Shared/_LayoutDynamicMenu.cshtml", ObjParrentMenus);
        }

        public ActionResult Notifications()
        {
            //  var model = 3;
            string url = Common.baseURL + "CommonMerchandisingApi/SampleNotifications?ModuleId=18";
            //List<ListOfMenus> _listOfMenus = new List<ListOfMenus>();
            //client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Common.accessToken);
            HttpResponseMessage response = client.GetAsync(url).Result;            

            //var dataBookingTracking = BookingTrackingCount(moduelId);
            return new JsonResult { Data = response.Content.ReadAsAsync<List< NotificationModel>>().Result };
        }
        public class NotificationModel
        {
            public int Count { get; set; }
            public int BuyerId { get; set; }
            public int StyleId { get; set; }
            public int JobId { get; set; }
            public int StageSetId { get; set; }
            public string BuyerName { get; set; }
            public string StyleInfo { get; set; }
            public string JobInfo { get; set; }
            public DateTime ShipmentDate { get; set; }
            public string SampleStage { get; set; }
        }

        private async Task<string> GetAccessToken(string UserId, string Password)
        {
            if (Common.accessToken == null)
            {
                List<KeyValuePair<string, string>> postData = new List<KeyValuePair<string, string>>();

                postData.Add(new KeyValuePair<string, string>("grant_type", "password"));
                postData.Add(new KeyValuePair<string, string>("username", UserId));
                postData.Add(new KeyValuePair<string, string>("password", Password));

                FormUrlEncodedContent content = new FormUrlEncodedContent(postData);

                
                HttpResponseMessage response = await client.PostAsync("Token", content);
                string jsonString = await response.Content.ReadAsStringAsync();
                object responseData = JsonConvert.DeserializeObject(jsonString);

                Common.accessToken = ((dynamic)responseData).access_token;
            }

            return Common.accessToken;
        }

        //public IConnection GetConnection(string hostName, string userName, string password)
        //{
        //    ConnectionFactory connectionFactory = new ConnectionFactory();
        //    connectionFactory.HostName = hostName;
        //    connectionFactory.UserName = userName;
        //    connectionFactory.Password = password;
        //    return connectionFactory.CreateConnection();
        //}
        //public static void Send(string queue, string data)
        //{
        //    using (IConnection connection = new ConnectionFactory().CreateConnection())
        //    {
        //        using (IModel channel = connection.CreateModel())
        //        {
        //            channel.QueueDeclare(queue, false, false, false, null);
        //            channel.BasicPublish(string.Empty, queue, null, Encoding.UTF8.GetBytes(data));
        //        }
        //    }
        //}
        //public static void Receive(string queue)
        //{
        //    using (IConnection connection = new ConnectionFactory().CreateConnection())
        //    {
        //        using (IModel channel = connection.CreateModel())
        //        {
        //            channel.QueueDeclare(queue, false, false, false, null);
        //            var consumer = new EventingBasicConsumer(channel);
        //            BasicGetResult result = channel.BasicGet(queue, true);
        //            if (result != null)
        //            {
        //                string data =
        //                Encoding.UTF8.GetString(result.Body);
        //                Console.WriteLine(data);
        //            }
        //        }
        //    }
        //}
    }
}