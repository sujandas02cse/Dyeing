using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models
{
    public class DiaPartWiseSpecConfigurationModel : Base
    {

        public class DiaPart
        {
            public string DpnId { get; set; }
            public string DiaPartName { get; set; }
            public string HostIP { get; set; }


        }

        public class ProcessFlowName
        {
            public string DiaPartName { get; set; }
            public string DiaPart { get; set; }
            public string DpfcId { get; set; }
            public bool Active { get; set; }

        }

        public class DiaPartSpecificationMaster
        {
            public string DpsmId { get; set; }
            public string DiaPartName { get; set; }
            public string DpfcId { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
            public List<DiaPartSpecificationDetails> Details { get; set; }

        }

        public class DiaPartSpecificationDetails
        {
            public string DpsdId { get; set; }
            public string DpsmId { get; set; }
            public string FbscId { get; set; }
            public string Priority { get; set; }

        }


          public Task<IEnumerable<object>> DiaPartForSpecification()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_DiaPartForSpecification]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> NameofSpecification()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_GetSpecificationName]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> Get_ProcessByDiaPart(string DiaPartName)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@DiaPartName", value: DiaPartName, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_GetProcessNamebyDiaPart]", parameters: parameters, dbName: DyeingDB);

        }

        public Task<IEnumerable<object>> GetSpecificByDiaProcess(string DiaPartName, string DpfcId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@DiaPartName", value: DiaPartName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@DpfcId", value: DpfcId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_GetSpecificByDiaProcess]", parameters: parameters, dbName: DyeingDB);

        }



        public long DiaPartSpecificationConfig_SaveUpdate(DiaPartSpecificationMaster _obj)
        {
            var data = new
            {
                DpsmId=_obj.DpsmId,
                DiaPartName = _obj.DiaPartName,
                DpfcId = _obj.DpfcId,
                HostIP = getclientIP(),
                UserId = _obj.UserId,   
                DiaPartSpecificationDetails = _obj.Details.AsTableValuedParameter("dbo.DiaPartSpecificationDetails",
                            new[] { "DpsdId", "DpsmId", "FbscId", "Priority" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[sp_SaveUpdate_DiaPartSpecificationConfig]", model: data, dbName: DyeingDB);
        }

    }
}