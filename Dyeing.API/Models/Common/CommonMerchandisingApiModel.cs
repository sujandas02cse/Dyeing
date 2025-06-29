using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.Common
{
    public class CommonMerchandisingApiModel: Base
    {
        public class DiaModel
        {
            public string FinishedDiaName { get; set; }
            public string MachineDia { get; set; }
        }
        public IEnumerable<object> GetAllBuyers()
        {
           
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetBuyerName]", dbName: MER_DB);
        }
        public IEnumerable<object> GetAllBuyersMasterData()
        {

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetBuyerNameMasterData]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetAllBuyersMasterData(int buyerId)
        {

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetBuyerNameMasterData]", dbName: DyeingDB);
        }

        public IEnumerable<object> GetAllJobsByBuyer(int buyerId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value:buyerId, dbType:DbType.Int32, direction:ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetAllJobByBuyer]", parameters:parameter, dbName: MER_DB);
        }
        public IEnumerable<object> GetAllStylesByBuyerAndJob(int buyerId, int jobNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: jobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetAllStyleByBuyer]", parameters: parameter, dbName: MER_DB);
        }

        public IEnumerable<object> GetAllOrdersByBuyerJobAndStyle(int buyerId, int jobNo, int styleId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@JobNo", value: jobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@StyleId", value: styleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[GetAllOrderByBuyerJobOrTrackingOrStyleId]", parameters: parameter, dbName: MER_DB);
        }
        public IEnumerable<object> GetBodyPartSetUp_All()
        {            
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_BodyPartSetUp_All]", dbName: MER_DB);
        }
        public IEnumerable<object> GetDressPart()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_DressPart]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabricNameByPlanId(int MppmId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_FabricName]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabricByBuyer(int BuyerId, int OrderId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@OrderId", value: OrderId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_FabricByBuyer]", parameters: parameter, dbName: DyeingDB);
        }
        public DiaModel GetDiaInfoByFabric(int MppmId, int FabNameId, int DressPartId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@MppmId", value: MppmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@FabNameId", value: FabNameId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@DressPartId", value: DressPartId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<DiaModel>(
                    storedProcedureName: @"[dbo].[usp_get_DiaInfoByFabric]", parameters: parameter, dbName: DyeingDB).FirstOrDefault();
        }
        public IEnumerable<object> GetFabricsInfo(int loadingType, int buyerId, int jobNo, int styleId,int orderNo)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@loadingType", value: loadingType, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@buyerId", value: buyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@jobNo", value: jobNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@styleId", value: styleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameter.Add(name: "@orderNo", value: orderNo, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_mer_GetFabricsInfo]", parameters: parameter, dbName: DyeingDB);
        }
        public IEnumerable<object> GetColorType()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_mer_GetColorType]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetColorShade()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_mer_GetColorShade]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetAOPBackground()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_mer_GetAOPBackground]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetFabric()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_scm_GetFabric]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetColorTypeSpec()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_mer_GetColorTypeSpec]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetOFabricOperationData()
        {
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_select_tbl_OtherFabricsOperation]", dbName: DyeingDB);
        }
        public IEnumerable<object> GetPantonType()
        {

            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[usp_get_PantonType]", dbName: DyeingDB);
        }
        public IEnumerable<object> SampleNotifications(int ModuleId)
        {
            var parameter = new DynamicParameters();
            parameter.Add(name: "@ModuleId", value: ModuleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<object>(
                    storedProcedureName: @"[dbo].[sp_GetModuleWiseBookingTracking]", parameters: parameter, dbName: MER_DB);
        }
    }
}