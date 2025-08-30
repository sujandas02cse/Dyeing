using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration
{
    public class MasterDataDisplayModel:Base
    {
        public class MasterDataModel
        {
            public int MDataId { get; set; }
            public int BuyerId { get; set; }
            public int JobId { get; set; }
            public int StyleId { get; set; }
            public int OrderId { get; set; }
            public string ShipDate { get; set; }
            public string BookingDate { get; set; }
            public int IFID { get; set; }
            public int ColorId { get; set; }
            public int DiaId { get; set; }
            public string FinishDia { get; set; }
            public decimal OrderQty { get; set; }
            public decimal RGreigeQty { get; set; }
            public string TDelvDate { get; set; }
            public string FGReqDate { get; set; }
            public string DyeingEndDate { get; set; }
            public string LDNo { get; set; }
            public string Enzyme { get; set; }
            public string DpfcId { get; set; }
            public string OFabOpNo { get; set; }            
            public string BodyPartId { get; set; }
            public string ColorTypeId { get; set; }
            public string ColorShadeId { get; set; }
            public string ColorSpecId { get; set; }
            public string PantoneId { get; set; }
            public string AopBackNo { get; set; }
            public string DyeingFactory { get; set; }
            public int UnitId { get; set; }
            public string InhouseFacId { get; set; }
            public string OuterFacId { get; set; }
            public string OrderStatus { get; set; }
            public string Remarks { get; set; }
            public string Mode { get; set; }
            public string UserId { get; set; }
            public string HostIP { get; set; }
        }           
        public class Response
        {
            public string PlanNo { get; set; }
            public string BatchNo { get; set; }
            public string Msg { get; set; }
            public string ErrorMsg { get; set; }
        }      

        public class NewFabric
        {
            public int ItemIdEdit { get; set; }
            public string item { get; set; }
            public string userId { get; set; }
            public string mode { get; set; }
            public int IFID { get; set; }
            public string ItemDes { get; set; }
            public int ItemID { get; set; }
            public int BuyerId { get; set; }
            public int OrderId { get; set; }
            public int JobId { get; set; }
        }

    
        public object GetDropDataByBuyerId(int buyerId, int id, string Info)
        {           
            var data = new
            {
                BuyerId = buyerId,
                Id = id,
                Info = Info
            };

            var result = DatabaseHub.MultiQuery<object, object, object, object>(
                   storedProcedureName: @"[dbo].[usp_GetDropDataByBuyerId]", model: data, dbName: DyeingDB);

            //var parameters = new DynamicParameters();
            //parameters.Add(name: "@BuyerId", value: 0, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@JobId", value: 1, dbType: DbType.String, direction: ParameterDirection.Input);

            //var result1 = DatabaseHub.MultiQuery<object, object>(
            //       storedProcedureName: @"[dbo].[usp_GetDropDataByBuyerId]", parameters: parameters, dbName: DyeingDB);

            return result;
        }
        public Response MasterData_SaveUpdate(List<MasterDataModel> obj)
        {
            obj[0].HostIP = getclientIP();
            var data = new
            {
                UserId=obj[0].UserId,
                HostIP= obj[0].HostIP,
                tvp_MasterData = obj.AsTableValuedParameter("dbo.type_DyeingMasterData",
                           new[] { "MDataId", "UnitId","BuyerId", "JobId", "StyleId", "OrderId", "ShipDate", "BookingDate", "IFID", "ColorId", "DiaId", "FinishDia", "OrderQty", "RGreigeQty", "TDelvDate", "FGReqDate", "DyeingEndDate", "LDNo", "Enzyme", "DpfcId", "OFabOpNo",
                         "BodyPartId", "ColorTypeId", "ColorShadeId", "ColorSpecId", "PantoneId", "AopBackNo", "DyeingFactory", "InhouseFacId", "OuterFacId", "OrderStatus", "Remarks","HostIP","UserId"
                })
            };
            return DatabaseHub.Query<object, Response>(storedProcedureName: "[dbo].[usp_saveUpdate_MasterData]", model: data, dbName: DyeingDB).FirstOrDefault();
          
        }

        public Task<IEnumerable<object>> GetDyeingMasterUnitData(string userCode)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UserId", value: userCode, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitByUser]", parameters: parameters, dbName: DyeingDB);

        }

        public Task<IEnumerable<object>> GetDyeingMasterData(int BuyerId, string JobId, string StyleId, string OrderId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: StyleId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderId", value: OrderId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_DyeingMasterData]", parameters: parameters, dbName: DyeingDB);

        }

     

        public Task<IEnumerable<object>> GenNewFabric(NewFabric fabric)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@ItemIdEdit", value: fabric.ItemIdEdit, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@item", value: fabric.item, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@userId", value: fabric.userId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@mode", value: fabric.mode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@IFID", value: fabric.IFID, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ItemDes", value: fabric.ItemDes, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ItemID", value: fabric.ItemID, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuyerId", value: fabric.BuyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: fabric.JobId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_gen_new_fabric]", parameters: parameters, dbName: DyeingDB);

        }
        public object GetBuyerJobOrderForMasterData(int BuyerId, int Id, string Info, string Flag)
        {           
            var data = new
            {
                BuyerId = BuyerId,
                Id = Id,
                Info = Info,
                Flag= Flag
            };

            return DatabaseHub.MultiQuery<object, object, object, object>(
                    storedProcedureName: @"[dbo].[usp_GetBuyerJobOrderForMasterData]", model: data, dbName: DyeingDB);

        }


        public Task<IEnumerable<object>> GetUnitWithoutUser()
        {
            var parameters = new DynamicParameters();
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_UnitWithoutUser]", parameters: parameters, dbName: DyeingDB);

        }

    }
}