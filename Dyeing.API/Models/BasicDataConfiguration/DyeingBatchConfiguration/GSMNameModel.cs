using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.DyeingBatchConfiguration
{
    public class GSMNameModel:Base
    {
        public class GSMNameM
        {
            public string GsmId { get; set; }
            public string ScmISZID { get; set; }
            public string GSMName { get; set; }          
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }

        public Task<IEnumerable<object>> GetGSMNameInfo()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_GSMNameInfo]", dbName: DyeingDB);
        }
        public Task<long> GSMName_SaveUpdate(GSMNameM obj)
        {
            obj.HostIP = getclientIP();

            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_GSMName]", model: obj, dbName: DyeingDB);
        }
    }
}