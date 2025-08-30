using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Dyeing.API.DBInfo
{
    public abstract class Base
    {
        protected IDatabaseHub DatabaseHub = new DatabaseHub();
        protected IDatabaseHub DatabaseHubRpt = new DatabaseHubRpt();

        public string SCM = "SCM";
        public string ControlPanel = "ControlPanal";
        public string HRM = "DB-MASCOGROUP";
        public string KNIT = "KnittingDB";
        public string MER_DB = "MerchandisingDB";
        public string MSCHOOL = "MascoSchoolDB";
        public string GPDB = "GarmentsProductionDB";    
        public string AMSDB = "AMSDB";
        public string DyeingDB = "DyeingDBTest";
       // public string DyeingDB = "DyeingDB";
        public string MascoPrint = "MascoPrint";

        public static string getclientIP()
        {
            var HostIP = HttpContext.Current != null ? HttpContext.Current.Request.UserHostAddress : "";
            return HostIP;
        }

    }
}