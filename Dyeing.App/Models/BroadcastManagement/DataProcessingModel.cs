using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using static Dyeing.App.Models.BroadcastDataModel;

namespace Dyeing.App.Models
{
    public class DataProcessingModel
    {
        public CommRptInfo ProcessRptInfo(string rptComInfo, string rptParm, string SQL, string Dataset)
        {
            CommRptInfo _rptInfo = new CommRptInfo();

            JArray jsonArray = JArray.Parse(rptComInfo);
            foreach (var item in jsonArray)
            {
                string Key = item.First.ToString().Split(':')[0].Replace('"', ' ').Trim();
                if (Key == "APIAction") _rptInfo.APIAction = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "ReportPath") _rptInfo.ReportPath = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "FileName") _rptInfo.FileName = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "Format") _rptInfo.Format = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
            }

            jsonArray = JArray.Parse(SQL);
            foreach (var item in jsonArray)
            {
                string Key = item.First.ToString().Split(':')[0].Replace('"', ' ').Trim();
                if (Key == "SQL") _rptInfo.SQL = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "SQL1") _rptInfo.SQL1 = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "SQL2") _rptInfo.SQL2 = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
            }

            jsonArray = JArray.Parse(Dataset);
            foreach (var item in jsonArray)
            {
                string Key = item.First.ToString().Split(':')[0].Replace('"', ' ').Trim();
                if (Key == "Dataset") _rptInfo.Dataset = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "Dataset1") _rptInfo.Dataset1 = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
                else if (Key == "Dataset2") _rptInfo.Dataset2 = item.First.ToString().Split(':')[1].Replace('"', ' ').Trim();
            }

            return _rptInfo;
        }
        public DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties by using reflection   
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names  
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {

                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
        public DataTable ConvertJsonToDatatable(string jsonString)
        {
            // string json = @"[{""MachineEng"":""undefined""},{""Type"":""undefined""}]";
            var jsonLinq = JArray.Parse(jsonString);

            var dict = JObject.Parse(@"{""1"":""Name 1"",""2"":""Name 2""}");

            // Find the first array using Linq
            var linqArray = dict.Descendants().FirstOrDefault();
            var jsonArray = new JArray();
            foreach (JObject row in linqArray)
            {
                var createRow = new JObject();
                foreach (JProperty column in row.Properties())
                {
                    // Only include JValue types
                    if (column.Value is JValue)
                    {
                        createRow.Add(column.Name, column.Value);
                    }
                }
                jsonArray.Add(createRow);
            }

            return JsonConvert.DeserializeObject<DataTable>(jsonArray.ToString());
        }
    }
}