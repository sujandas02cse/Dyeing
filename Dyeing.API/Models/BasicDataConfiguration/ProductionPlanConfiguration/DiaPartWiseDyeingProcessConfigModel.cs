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
    public class DiaPartWiseDyeingProcessConfigModel : Base
    {
    
        public class DiaPart
        {
            public string DpnId { get; set; }
            public string DiaPartName { get; set; }
            public string HostIP { get; set; }


        }

        public class ProcessFlowName
        {
            public string DppId { get; set; }
            public string  DiaPart {get;set;}
            public string  DpfcId  {get;set;}
            public bool  Active  {get;set;}

        }

        public class DiaPartMaster
        {
            public string Mode { get; set; }
            public string DiaPartName { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
            public List<DiaPartDetails> Details { get; set; }

        }

        public class DiaPartDetails
        {
            public string DppId { get; set; }
            public string DpfcId { get; set; }
            public bool IsActive { get; set; }

        }




        public Task<IEnumerable<object>> GetDiaPartName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_DiaParName]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> DyeingProcessFlow_Get()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ProcessFlowConfigForDiaPart]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> sp_Get_ProcessByDiaPart(string DiaPartName)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@DiaPartName", value: DiaPartName, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[sp_Get_ProcessByDiaPart]", parameters: parameters, dbName: DyeingDB);
        
        }



        public long DiaPartConfig_SaveUpdate(DiaPartMaster _obj) 
        {
            var data = new
            {
                Mode = _obj.Mode,
                DiaPartName = _obj.DiaPartName,
                HostIP = getclientIP(),
                UserId = _obj.UserId,
                DiaPartDetails = _obj.Details.AsTableValuedParameter("dbo.DiaPartDetails",
                            new[] { "DppId", "DpfcId", "IsActive" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[sp_SaveUpdate_DiaPartConfig]", model: data, dbName: DyeingDB);
        }

    }
}