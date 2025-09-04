using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.ApprovalManagement
{
    public class ApprovalManagementModel : Base
    {
        public class ApproveModelMaster
        {
            public string User { get; set; }
            public int BpmId { get; set; }
            public string Process { get; set; }
            public int ApprovedTime { get; set; }
            public Int16 ComApprove { get; set; }
            public string Reason { get; set; }
            public List<ApproveModel> MyProperty { get; set; }

        }
        public class ApproveModel
        {
            public int InsMasterId { get; set; }
            public bool Status { get; set; }
        }

        public  class FtsApproveModel
        {
            public int BpmId { get; set; }
            public bool FTApproved { get; set; }
            public bool ShadeApproved { get; set; }
            public bool ComApproved { get; set; }
            public string UserId { get; set; }
        }

        public class RFDApproval
        {
            public string UserId { get; set; }
            public int BpmId { get; set; }            
            public int ApprovedTime { get; set; }
            public List<RFDApproveModel> details { get; set; }

        }
        public class RFDApproveModel
        {
            public int BpmId { get; set; }
            public int InsMasterId { get; set; }
            public bool QualityApproved { get; set; }
            public bool FabricTestApproved { get; set; }
            public bool ShadeApproved { get; set; }
            public bool RFDApproved { get; set; }
            public string UserId { get; set; }
        }

        public class ShadeApproveModel
        {
            public int BpmId { get; set; }
            public string UserId { get; set; }
            public int ApprovedTime { get; set; }
            public bool? IHApproved { get; set; }
            public bool? GarmentsApproved { get; set; }
            public bool? MerchantApproved { get; set; }
            public bool? BuyerApproved { get; set; }
            public bool? ComApproved { get; set; }
            public string ReasonNOk { get; set; }
            public string ReasonCA { get; set; }
            public int BSpecId { get; set; }
        }
        public class CRApproveModel
        {
            public int BpmId { get; set; }           
            public bool? CRollApproved { get; set; }
            public bool? ComApproved { get; set; }            
            public string CRAReason { get; set; }
            public string CAReason { get; set; }
            public int ApprovedTime { get; set; }
            public string UserId { get; set; }
        }
        public class CRSendModel
        {
            public int BpmId { get; set; }
            public int RollSend { get; set; }            
            public int ApprovedTime { get; set; }
            public string UserId { get; set; }
        }
        public async Task<object> GetBodyPartbyBatchList(int BpmId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_get_BodyPartbyBpmId]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<object> GetBatchCRAprovaList(int UnitId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync< object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDetailsForCRApproval]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<object> GetBatchAprovalData(int BpmId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name:"@BpmId",value: BpmId,dbType: DbType.Int32,direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object,object,object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDetailsForApproval]", parameters : Parameter,dbName:DyeingDB);
        }

        public async Task<object> GetBatchShadeApprovalData(int BpmId,int ApprovalTime,int BSpecId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalTime", value: ApprovalTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BSpecId", value: BSpecId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object,object>(storedProcedureName: @"[dbo].[usp_Get_BatchDataForShadeApproval]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<object> GetBatchRFDAprovalData(int BpmId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDetailsForRFDApproval]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<object> GetBatchFTSAprovalData(int BpmId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDetailsForFTSApproval]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<object> GetAllTypeBatchAprovalData(int BpmId,string ApprovalType, int ApprovalTime)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalType", value: ApprovalType, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalTime", value: ApprovalTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object,object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDataForApproval]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<IEnumerable<Object>> SaveOrUpdateBatchApproveData(ApproveModelMaster approveModelMaster)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@User", value: approveModelMaster.User, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BpmId", value: approveModelMaster.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@Process", value: approveModelMaster.Process, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovedTime", value: approveModelMaster.ApprovedTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ComApprove", value: approveModelMaster.ComApprove, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@Reason", value: approveModelMaster.Reason, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add("@RollDataList", approveModelMaster.MyProperty.AsTableValuedParameter("dbo.RollDataForProve",
                new[] { "InsMasterId", "Status"}));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_ApprovalData]", parameters: Parameter, dbName: DyeingDB);
        }

        public async Task<IEnumerable<Object>> SaveOrUpdateFTSBatchApproveData(FtsApproveModel FtsApproveModel)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@UserId", value: FtsApproveModel.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BpmId", value: FtsApproveModel.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@FTAprroved", value: FtsApproveModel.FTApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ShadeApproved", value: FtsApproveModel.ShadeApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ComApproved", value: FtsApproveModel.ComApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[Usp_SaveUpdate_FTSApprovalBatchData]", parameters: Parameter, dbName: DyeingDB);
        }
        public async Task<IEnumerable<Object>> SaveUpdateRFDApproval(RFDApproval obj)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@UserId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BpmId", value: obj.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovedTime", value: obj.ApprovedTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add("@tvp_RFDApproval", obj.details.AsTableValuedParameter("dbo.tvp_RFDApproval",
                new[] { "InsMasterId", "QualityApproved", "FabricTestApproved", "ShadeApproved", "RFDApproved" }));

            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_RFDApproval]", parameters: Parameter, dbName: DyeingDB);
        }
        public object SaveUpdateCRApproval(CRApproveModel obj)
        {            

            return DatabaseHub.Query<object,object>(storedProcedureName: @"[dbo].[usp_Save_CheckRollData]", model: obj, dbName: DyeingDB);
        }
        public object SaveUpdateCRSend(CRSendModel obj)
        {
            return DatabaseHub.Query<object, object>(storedProcedureName: @"[dbo].[usp_Save_CheckRollSend]", model: obj, dbName: DyeingDB);
        }

        public object SaveUpdateShadeApproval(ShadeApproveModel obj)
        {           
            //var Parameter = new DynamicParameters();
            //Parameter.Add(name: "@UserId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@ApprovedTime", value: obj.ApprovedTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@BpmId", value: obj.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@IHApproved", value: obj.IHApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@GarmentsApproved", value: obj.GarmentsApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@BuyerApproved", value: obj.BuyerApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@MerchantApproved", value: obj.MerchantApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@ComApproved", value: obj.ComApproved, dbType: DbType.Boolean, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@ReasonNOk", value: obj.ReasonNOk, dbType: DbType.String, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@ReasonCA", value: obj.ReasonCA, dbType: DbType.String, direction: ParameterDirection.Input);
            //Parameter.Add(name: "@BSpecId", value: obj.BSpecId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHub.Query<object, object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_ShadeApproveData]", model: obj, dbName: DyeingDB);
        }

        public async Task<object> GetAllTypeBatchAprovalDataNew(int BpmId, string ApprovalType, int ApprovalTime)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalType", value: ApprovalType, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalTime", value: ApprovalTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object, object>(storedProcedureName: @"[dbo].[usp_get_GetBatchDataForApprovalNew]", parameters: Parameter, dbName: DyeingDB);
        }


        public async Task<IEnumerable<Object>> SaveOrUpdateBatchApproveDataNew(ApproveModelMaster approveModelMaster)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@User", value: approveModelMaster.User, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BpmId", value: approveModelMaster.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@Process", value: approveModelMaster.Process, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovedTime", value: approveModelMaster.ApprovedTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ComApprove", value: approveModelMaster.ComApprove, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@Reason", value: approveModelMaster.Reason, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add("@RollDataList", approveModelMaster.MyProperty.AsTableValuedParameter("dbo.RollDataForProve",
                new[] { "InsMasterId", "Status" }));
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_ApprovalDataNew]", parameters: Parameter, dbName: DyeingDB);
        }



        public async Task<object> GetBodyPartbyBatchListNew(int BpmId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_get_BodyPartbyBpmIdNew]", parameters: Parameter, dbName: DyeingDB);
        }


        public async Task<object> GetBatchShadeApprovalDataNew(int BpmId, int ApprovalTime, int BSpecId)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@BpmId", value: BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovalTime", value: ApprovalTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BSpecId", value: BSpecId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return await DatabaseHub.MultiQueryAsync<object, object, object>(storedProcedureName: @"[dbo].[usp_Get_BatchDataForShadeApprovalNew]", parameters: Parameter, dbName: DyeingDB);
        }

        public object SaveUpdateShadeApprovalNew(ShadeApproveModel obj)
        {
           
            return DatabaseHub.Query<object, object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_ShadeApproveDataNew]", model: obj, dbName: DyeingDB);
        }

        public async Task<IEnumerable<Object>> SaveUpdateRFDApprovalNew(RFDApproval obj)
        {
            var Parameter = new DynamicParameters();
            Parameter.Add(name: "@UserId", value: obj.UserId, dbType: DbType.String, direction: ParameterDirection.Input);
            Parameter.Add(name: "@BpmId", value: obj.BpmId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add(name: "@ApprovedTime", value: obj.ApprovedTime, dbType: DbType.Int32, direction: ParameterDirection.Input);
            Parameter.Add("@tvp_RFDApproval", obj.details.AsTableValuedParameter("dbo.tvp_RFDApproval",
                new[] { "InsMasterId", "QualityApproved", "FabricTestApproved", "ShadeApproved", "RFDApproved" }));

            return await DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_RFDApprovalNew]", parameters: Parameter, dbName: DyeingDB);
        }


        public object SaveUpdateCRApprovalNew(CRApproveModel obj)
        {

            return DatabaseHub.Query<object, object>(storedProcedureName: @"[dbo].[usp_Save_CheckRollDataNew]", model: obj, dbName: DyeingDB);
        }



        public object SaveUpdateCRSendNew(CRSendModel obj)
        {
            return DatabaseHub.Query<object, object>(storedProcedureName: @"[dbo].[usp_Save_CheckRollSendNew]", model: obj, dbName: DyeingDB);
        }


    }
}