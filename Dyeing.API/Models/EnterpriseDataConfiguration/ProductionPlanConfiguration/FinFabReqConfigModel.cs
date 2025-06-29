using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.ProductionPlanConfiguration
{
    public class FinFabReqConfigModel : Base
    {
        public class FinFabReqConfigMaster
        {
            public int FfrmId { get; set; }
            public int BuyerId { get; set; }
            public int JobId { get; set; }
            public int StyleId { get; set; }
            public int OrderId { get; set; }
            public string ShipmentDate { get; set; }
            public int LoadingType { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
            public List<FinFabReqConfigDetails> Details { get; set; }
        }
        public class FinFabReqConfigDetails
        {
            public int FfrdId { get; set; }
            public int FfrmId { get; set; }
            public int BodyPartId { get; set; }
            public int FabNameId { get; set; }
            public int GSMId { get; set; }
            public int YarnCompositionId { get; set; }
            public int ColorId { get; set; }
            public int ColorCodeId { get; set; }
            public int PantonId { get; set; }
            public decimal FinFabReq { get; set; }
            public decimal Consumption { get; set; }
            public decimal GrFabMF { get; set; }

        }

        public long FinFabReqConfig_SaveUpdate(FinFabReqConfigMaster _obj)
        {
            var data = new
            {
                FfrmId = _obj.FfrmId,
                BuyerId = _obj.BuyerId,
                JobId = _obj.JobId,
                StyleId = _obj.StyleId,
                OrderId = _obj.OrderId,
                ShipmentDate = _obj.ShipmentDate,
                LoadingType=_obj.LoadingType,
                HostIP = getclientIP(),
                CreatedBy = _obj.UserId,
                FinFabReqConfigDetails = _obj.Details.AsTableValuedParameter("dbo.FinFabReqConfigDetails",
                            new[] { "FfrdId", "FfrmId", "BodyPartId", "FabNameId", "GSMId", "YarnCompositionId", "ColorId", "ColorCodeId", "PantonId", "FinFabReq", "Consumption", "GrFabMF" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[SaveUpdate_FinFabReqConfig]", model: data, dbName: DyeingDB);
        }

        public  IEnumerable<FinFabReqConfigDetails> GetFinFabReqConfig(int LoadingType, int BuyerId,int JobId,int StyleId,int OrderId, string ShipmentDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@LoadingType", value: LoadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@OrderId", value: OrderId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@ShipmentDate", value: ShipmentDate, dbType: DbType.String, direction: ParameterDirection.Input);          


            return  DatabaseHub.Query<FinFabReqConfigDetails>(
                    storedProcedureName: @"[dbo].[Get_FinFabReqConfigDetails]", parameters: parameters, dbName: DyeingDB);
        }
        

    }
}