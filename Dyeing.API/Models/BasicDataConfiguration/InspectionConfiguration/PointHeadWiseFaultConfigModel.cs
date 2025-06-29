using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration
{
    public class PointHeadWiseFaultConfigModel : Base
    {
        public class PointHeadWiseFaultConfig
        {
            public int HFaultNo { get; set; }
            public int PHeadNo { get; set; }
            public string FaultName { get; set; }
            public bool IsActive { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
            public List<PointHeadWiseFaultConfigDetails> lDetails = new List<PointHeadWiseFaultConfigDetails>();
        }
        public class PointHeadWiseFaultConfigDetails
        {
            public int NameID { get; set; }
        }
        public Task<IEnumerable<object>> GetPointHead()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_PointHeadInfo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetPointHead(int pheadId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@pheadId", pheadId);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_pheadWiseFaultName]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<long> SaveUpdate(PointHeadWiseFaultConfig _obj)
        {
            var data = new
            {
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                PHeadNo = _obj.PHeadNo,
                PointHeadWiseFaultConfigDetails = _obj.lDetails.AsTableValuedParameter("dbo.PointHeadWiseFaultConfigDetails",
                            new[] { "NameID" })

            };
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_pheadWiseFaultName]", model: data, dbName: DyeingDB);
        }
    }
}