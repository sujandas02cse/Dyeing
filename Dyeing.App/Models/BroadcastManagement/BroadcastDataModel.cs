using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.App.Models
{
    public class BroadcastDataModel
    {
        public class BasicBroadcast
        {
            public string MachineId { get; set; }
            public string MachineName { get; set; }
            public string Type { get; set; }
            public string Brand { get; set; }
            public string Capacity { get; set; }
            public string Nozzle { get; set; }
            public string Asset { get; set; }
            public string Unit { get; set; }
            public string pUnitName { get; set; }
            public string pTypeName { get; set; }
        }

        public class CommRptInfo
        {
            public string APIAction { get; set; }
            public string ReportPath { get; set; }
            public string Format { get; set; }
            public string FileName { get; set; }
            public string SQL { get; set; }
            public string SQL1 { get; set; }
            public string SQL2 { get; set; }
            public string Dataset { get; set; }
            public string Dataset1 { get; set; }
            public string Dataset2 { get; set; }            
        }      

    }
}