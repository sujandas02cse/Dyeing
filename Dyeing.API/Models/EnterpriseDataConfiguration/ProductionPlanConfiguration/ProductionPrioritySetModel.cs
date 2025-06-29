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
    public class ProductionPrioritySetModel:Base
    {
        public class ProductionPrioritySet
        {
            public string PpscId { get; set; }
            public string MId { get; set; }
            public string MachineEng { get; set; }            
            public string MppmId { get; set; }            

            public string PDate { get; set; }
            public string PlanNo { get; set; }
            public string BatchNo { get; set; }
            public string BuyerName { get; set; }
            public string Job { get; set; }
            public string Style { get; set; }
            public string OrderN { get; set; }
            public string ShipDate { get; set; }
            public string MCNo { get; set; }
            public string PlanQty { get; set; }
            public string PriorityNo { get; set; }

            public string UserId { get; set; }
            public string HostIP { get; set; }

            //public List<ProductionPrioritySet> obj { get; set; }
        }

        //public class ProductionPriority
        //{            
        //    public List<ProductionPrioritySet> obj { get; set; }
        //}

       
        public Task<IEnumerable<object>> GetMachineName(string UserId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@Category", value: Category, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_UnitPerWiseMachineNo]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetProdPrioritySetDetails(string MDId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@MDId", value: MDId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ProdPlanPrioritySetByMId]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<long> ProductionPriority_SaveUpdate(List<ProductionPrioritySet> obj)
        {           
            var data = new
            {
                ProdPlanPriority = obj.AsTableValuedParameter("dbo.ProdPlanPriority",
                                new[] { "PpscId", "MId", "MppmId", "PriorityNo", "HostIP", "UserId" })
            };
            return DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_SaveUpdate_MachineProdPlanPriority]", model: data, dbName: DyeingDB);
        }
    }
}