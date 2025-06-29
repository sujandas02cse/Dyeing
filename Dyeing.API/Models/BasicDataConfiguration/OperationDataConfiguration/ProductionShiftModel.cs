using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.OperationDataConfiguration
{
    public class ProductionShiftModel : Base
    {
        public class ProductionShift
        {
            public string PsmId { get; set; }
            public string PsdId { get; set; }
            public string UnitId { get; set; }
            public string UnitEName { get; set; }            
            public string ShiftTypeId { get; set; }
            public string ShiftTypeName { get; set; }

            public string OscId { get; set; }//section id
            public string SectionName { get; set; }

            public string ShiftNo { get; set; }
            public string ShiftName { get; set; }
            public string ShiftIn { get; set; }
            public string ShiftOut { get; set; }
            public string Category { get; set; }           
            
           
            public string UserId { get; set; }
            public string HostIP { get; set; }

        }

        public class ProductionShiftMaster
        {
            public string PsmId { get; set; }            
            public string UnitId { get; set; }           
            public string ShiftTypeId { get; set; }
            public string OscId { get; set; }//section id
            public string UserId { get; set; }
            public string HostIP { get; set; }          

            public List<ProductionShiftDetail> _details { get; set; }

        }
        public class ProductionShiftDetail
        {
            public string PsdId { get; set; }
            public string PsmId { get; set; }
            public string ShiftNo { get; set; }//section id           
            public string IsChecked { get; set; }
        }

        public Task<IEnumerable<object>> GetUnitName()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_ProductionShift_Get_UnitInfo]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetShiftType()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ShiftType]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetSection()
        {
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_OperationSection]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetShitTime(string ShiftTypeId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@ShiftTypeId", value: ShiftTypeId, dbType: DbType.String, direction: ParameterDirection.Input);            
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ShiftTimeByShiftTypeId]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetSelectedSection(string ShiftTypeId, string UnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@ShiftTypeId", value: ShiftTypeId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_UnitSection]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> getCheckedShift(string UnitId, string ShiftTypeId, string OscId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@ShiftTypeId", value: ShiftTypeId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OscId", value: OscId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_ShiftTimeChecked]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<long> ProductionShift_SaveUpdate(ProductionShiftMaster _master)
        {
            var data = new
            {
                PsmId=_master.PsmId,               
                UnitId = _master.UnitId,
                ShiftTypeId = _master.ShiftTypeId,
                OscId= _master.OscId,
                HostIP = getclientIP(),
                UserId = _master.UserId,
                PShiftDetails = _master._details.AsTableValuedParameter("dbo.PShiftDetails",
                            new[] { "PsdId", "ShiftNo", "IsChecked" })
            };
            return DatabaseHub.ExecuteAsync(storedProcedureName: "[dbo].[usp_SaveUpdate_ProductionShift]", model: data, dbName: DyeingDB);
        }
       
    }
}