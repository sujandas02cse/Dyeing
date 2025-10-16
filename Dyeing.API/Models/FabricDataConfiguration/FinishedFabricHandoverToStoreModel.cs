using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Dyeing.API.Models.FabricDataConfiguration
{
    public class FinishedFabricHandoverToStoreModel : Base
    {

        //FinishedFabricHandoverToStoreList
        public class FinishedFabricHandoverToStoreList
        {
            public IEnumerable<PackingList> PackingList { get; set; }
            public string UserId { get; set; }
        }

        public class MultiStickerNo
        {
            public string StickerNo { get; set; }
        }

        public class MultiStickerNoList
        {
            public IEnumerable<MultiStickerNo> multiStickerNos { get; set; }
            public string UserId { get; set; }

        }


        public class PackingList
        {
            public string BatchNo { get; set; }
            public int BpmId { get; set; }
            public string Buyer { get; set; }
            public int BuyerId { get; set; }
            public string Color { get; set; }
            public int ColorId { get; set; }
            public string Composition { get; set; }
            public string FabType { get; set; }
            public int Id { get; set; }
            public int IsHandoverToStore { get; set; }
            public string Job { get; set; }
            public int JobId { get; set; }
            public int McId { get; set; }
            public int OrderId { get; set; }
            public string OrderNo { get; set; }
            public Double Qty { get; set; }
            public string RequiredDia { get; set; }
            public string RequiredGSM { get; set; }
            public int RollNo { get; set; }
            public int StyleId { get; set; }
            public string StyleNo { get; set; }
            public string TrackingNo { get; set; }
            public int UnitId { get; set; }
            public int  RequiredDiaPartId { get; set; }
            public int CompTime { get; set; }
            public int ItemId { get; set; }

            public string FinishedDia { get; set; }
            public int ActualDiaPartId { get; set; }
            public string FinishedGSM { get; set; }
            public string  FinishedBarcodeId { get; set; }
            public int  FabricForId { get; set; }
            public string BodyPart { get; set; }

            public string ProductionAlias { get; set; }
            public string SCMAlias { get; set; }

            public string StitchLength { get; set; }

            public int RequiresISZID { get; set; }
            public int FinishedISZID { get; set; }

        }

        public Task<IEnumerable<object>> GetDataByTracking(string Id,string RollType,string UserId)
        {

            var parameters = new DynamicParameters();

            parameters.Add(name: "@Id", value: Id, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RollType", value: RollType, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@UserId", value: UserId, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_get_PackingHandoveredToStore]", parameters: parameters, dbName: DyeingDB);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_FinishedFabricHandoverByTrackingNo]", parameters: parameters, dbName: DyeingDB);
        }

        public async Task<object> SaveUpdate(FinishedFabricHandoverToStoreList Obj)
        {
            var data = new
            {
                UserId = Obj.UserId,
                tvpFabricHandover = Obj.PackingList.AsTableValuedParameter("dbo.tvp_FinishedFabricHandoverToStore",
                            new[] { "BatchNo", "BpmId",
                                    "Buyer", "BuyerId",
                                    "Color", "ColorId",
                                    "Composition", "FabType",
                                    "Id", "IsHandoverToStore",
                                    "Job","JobId",
                                    "McId","OrderId","OrderNo",
                                    "Qty", "RequiredDia","RequiredGSM",
                                    "RollNo","StyleId","StyleNo","TrackingNo","UnitId",
                                    "RequiredDiaPartId","CompTime","ItemId",
                                    "FinishedDia","ActualDiaPartId","FinishedGSM",
                                    "FinishedBarcodeId","FabricForId","BodyPart","ProductionAlias",
                                    "SCMAlias","StitchLength","RequiresISZID","FinishedISZID"

                            })
            };
            return await DatabaseHub.QueryAsync<object,object>(
                  storedProcedureName: @"[dbo].[usp_InsertFinishedFabricHandoverToStore]", model: data, dbName: DyeingDB);
        }

      
        public Task<IEnumerable<object>> GetDataBySingleRoll(string SingleRollStickerNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@SingleRollStickerNo", value: SingleRollStickerNo, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_PackingHandoveredToStoreByStickerNo]", parameters: parameters, dbName: DyeingDB);

        }


     
       public async Task<IEnumerable<object>> GetDataByMultiRoll(MultiStickerNoList payload)
        {
            var data = new
            {
                UserId = payload.UserId,
                Stickers = payload.multiStickerNos.AsTableValuedParameter("dbo.tvp_FinishedFabricMultiSticker",
                               new[] { "StickerNo" })
            };
            return await DatabaseHub.QueryAsync<object, object>(
                  storedProcedureName: @"[dbo].[usp_get_FinishedFabricHandoverMultiRoll]", model: data, dbName: DyeingDB);
        }
    }
}