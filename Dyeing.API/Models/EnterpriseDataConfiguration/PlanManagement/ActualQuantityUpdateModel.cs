using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement
{
    public class ActualQuantityUpdateModel : Base
    {
        public class ActualQuantityRequest
        {
            public int BpmId { get; set; }
            public int UserId { get; set; }
            public List<ProductionRow> ProductionList { get; set; }
        }

        public class ProductionRow
        {
            public int Id { get; set; }
            public string BodyPart { get; set; }
            public decimal PlanQty { get; set; }
            public decimal ActualQty_DB { get; set; }
            public decimal ActualQty { get; set; }
            public int Rolls { get; set; }
            public string FDia { get; set; }
            public string Remarks { get; set; }
            public int ItemId { get; set; }
            public string Composition { get; set; }
            public string FabricType { get; set; }
            public string StitchLength { get; set; }
            public float UnitValueInTk { get; set; }
            public string YarnBrand { get; set; }
            public string YarnLot { get; set; }
            public string YarnType { get; set; }
        }

        public Tuple<IEnumerable<object>, IEnumerable<object>> GetBatchDataWithoutHandover(int BpmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.MultiQuery<object, object>(
                    storedProcedureName: @"[dbo].[usp_Get_AllBatchDataWithoutHandOver]", parameters: parameter, dbName: DyeingDB);
        }

        public object SaveUpdateActualQuantity(ActualQuantityRequest _obj)
        {
            if (_obj == null || _obj.ProductionList == null || !_obj.ProductionList.Any())
                throw new ArgumentNullException(nameof(_obj));

            var data = new
            {
                BpmId = _obj.BpmId,
                UserId = _obj.UserId,
                ProductionTable = _obj.ProductionList.AsTableValuedParameter("dbo.ActualQuantityType",
                    new[]
                    {
                "Id", "BodyPart", "PlanQty", "ActualQty_DB", "ActualQty", "Rolls", "FDia",
                "Remarks", "ItemId", "Composition", "FabricType", "StitchLength",
                "UnitValueInTk", "YarnBrand", "YarnLot", "YarnType"
                    })
            };

            return DatabaseHub.Query<object, object>(
                storedProcedureName: "[dbo].[usp_SaveUpdate_ActualQuantity]",
                model: data,
                dbName: "DyeingDB"
            ).ToList();
        }
    }
}