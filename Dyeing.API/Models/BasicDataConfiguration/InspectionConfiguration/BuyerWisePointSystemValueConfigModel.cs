using Dapper;
using Dyeing.API.DBInfo;
using System.Collections.Generic;
using System.Data;
namespace Dyeing.API.Models.BasicDataConfiguration.InspectionConfiguration
{
    public class BuyerWisePointSystemValueConfigModel:Base
    {
       public class BuyerWisePointSystemValueConfig
        {
            public int BuyerWPointNo{ get; set; }
            public int BuyerId{ get; set; }
            public int PointSystemNo{ get; set; }
            public string FCHID{ get; set; }
            public string CreateBy{ get; set; }
        }

        public long BuyerWisePointSystemValue_SaveUpdate(BuyerWisePointSystemValueConfig model)
        {
                return DatabaseHub.Execute(
                        storedProcedureName: @"[dbo].[SaveUpdate_BuyerWisePointSystemValue]", model:model, dbName: DyeingDB);
        }

        public IEnumerable<object> GetBuyerWisePointSystemValue(int buyerId, int pointSystemNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId",value:buyerId,dbType:DbType.Int32,direction:ParameterDirection.Input);
            parameter.Add(name: "@PointSystemNo", value: pointSystemNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[GetBuyerWisePointSystem]",parameters:parameter,dbName:DyeingDB);
        }

    }
}