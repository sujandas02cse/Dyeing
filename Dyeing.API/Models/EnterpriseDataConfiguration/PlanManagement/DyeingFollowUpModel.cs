using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.PlanManagement
{
    public class DyeingFollowUpModel : Base
    {
        public class DetailDataDyeingFollowUp
        {
            public int KnittingFollowUpId { get; set; }
            public string KnittingStatus { get; set; }
            public string DyeingDeliveryStartDate { get; set; }
            public string DyeingDeliveryFinishedDate { get; set; }
            public double PerDeliveryQty { get; set; }
            public string DyeingComments { get; set; }
            public int ReviseNo { get; set; }
        }
        public IEnumerable<object> AllBuyerInfoForDyeingFollowUp()
        {
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BuyerForDyeingFollowUp]", dbName: DyeingDB);
        }

        public IEnumerable<object> JobInfoForDyeingFollowUp(int BuyerId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_JobForDyeingFollowUp]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> StyleInfoForDyeingFollowUp(int BuyerId,int JobId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_StyleForDyeingFollowUp]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> OrderInfoForDyeingFollowUp(int BuyerId,int JobId,int StyleId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_OrderForDyeingFollowUp]", parameters: parameters, dbName: DyeingDB);
        }

        public Tuple<IEnumerable<object>, IEnumerable<object>> DetailsInfoForDyeingFollowUp(int BuyerId, int JobId, int StyleId,int OrderId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderId", value: OrderId, dbType: DbType.Int32, direction: ParameterDirection.Input);


            return DatabaseHub.MultiQuery<object,object>(
                    storedProcedureName: @"[dbo].[usp_Get_DetailForDyeingFollowUp]", parameters: parameters, dbName: DyeingDB);
        }

        public IEnumerable<object> SaveUpdateDetailData(List<DetailDataDyeingFollowUp> detailDataDyeingFollowUp,string UserId)
        {

            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add("@dyeingFollowUp", detailDataDyeingFollowUp.AsTableValuedParameter("dbo.tvp_DyeingFollowUp",
                new[] { "KnittingFollowUpId", "KnittingStatus", "DyeingDeliveryStartDate", "DyeingDeliveryFinishedDate", "PerDeliveryQty", "DyeingComments",
                "ReviseNo"
                }));
            return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_DyeingFollowUp]", parameters: Parameter, dbName: DyeingDB);
        }
    }
}