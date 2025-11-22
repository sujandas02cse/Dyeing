using Microsoft.Reporting.WebForms;
using Newtonsoft.Json;
using RDLC;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Dyeing.App
{
    public class Common
    {
        //string baseURL1 = HttpContext.Current.Request.Url.Host;
        static string Host = HttpContext.Current.Request.Url.Host.ToLower();
        static string scheme = HttpContext.Current.Request.Url.Scheme.ToLower();
        static string port = HttpContext.Current.Request.Url.Port.ToString();

        //public static string baseURL = "http://192.168.50.60:425/api/";
       // public static string baseURL ="http://"+ Host+ (Host=="localhost"? ":11886":":425")+ "/api/";//"http://localhost:11886/api/";
      
         public static string baseURL =
          // live 
          // "https://mis-dyeing.mascoknit.com/dyeingApi/api/";

        // for local testing  
          "http://localhost:34605/api/";

        // for new test server testing modified on 23-Oct-2025
        //  "http://192.168.50.61:91/dyeingApi/api/";


        #region Live 
        //public static string QrCodePath = "file:///D:/Websites/Dyeing/Dyeing.API/images/BatchQRCode/";
        //public static string PackingQrCodePath = "file:///D:/Websites/Dyeing/Dyeing.API/images/PackingList/";

        #endregion

        #region Test

        //public static string QrCodePath = "file:///E:/TestServer/Dyeing/Dyeing.API/images/BatchQRCode/";
        //public static string PackingQrCodePath = "file:///E:/TestServer/Dyeing/Dyeing.API/images/PackingList/";

        #endregion

        #region localHost

        public static string QrCodePath = "file:///I:/Dyeing/Dyeing.API/images/BatchQRCode/";
        public static string PackingQrCodePath = "file:///I:/Dyeing/Dyeing.API/images/PackingList/";

        #endregion

        //"file:///H:/MascoProject/Dyeing/Dyeing.API/images/PackingList/";

        //public static string baseURL = scheme + "://" + Host + (Host == "localhost" ? ":34605" : "/dyeingApi") + "/api/";//"http://localhost:34605/api/";
        public static string accessToken;

    }

}