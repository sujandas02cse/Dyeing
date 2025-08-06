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

          // "http://192.168.50.60:93/dyeingApi/api/";

         //"https://mis-dyeing.mascoknit.com/dyeingApi/api/";

        //scheme+"://" + Host + (Host == "localhost" ? ":809/dyeingapi" : ":443/dyeingApi") + "/api/";//

         "http://localhost:34605/api/";

        //"http://192.168.50.60:91/dyeingApi/api/";

        #region Dyeing

        //public static string QrCodePath = "file:///D:/Websites/Dyeing/Dyeing.API/images/BatchQRCode/";
        //public static string PackingQrCodePath = "file:///D:/Websites/Dyeing/Dyeing.API/images/PackingList/";

        #endregion

        #region DyeingTest

        public static string QrCodePath = "file:///D:/PublishBackup/DyeingTest/Dyeing.API/images/BatchQRCode/";
        public static string PackingQrCodePath = "file:///D:/PublishBackup/DyeingTest/Dyeing.API/images/PackingList/";

        #endregion

        //"file:///H:/MascoProject/Dyeing/Dyeing.API/images/PackingList/";

        //public static string baseURL = scheme + "://" + Host + (Host == "localhost" ? ":34605" : "/dyeingApi") + "/api/";//"http://localhost:34605/api/";
        public static string accessToken;

    }

}