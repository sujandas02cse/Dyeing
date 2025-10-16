using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.DashboardManagement
{
    public class DataRelatedDashboardModel:Base
    {
        public class BatchProcessing
        {
            public int Id { get; set; }
            public string McNo { get; set; }
            public string BatchNo { get; set; }
            public int BuyerId { get; set; }
            public string Buyer { get; set; }
            public int JobId { get; set; }
            public string Job { get; set; }
            public int StyleId { get; set; }
            public int BuyerReferenceId { get; set; }
            public string Style { get; set; }
            public string Color { get; set; }
            public string LDNo { get; set; }
            public string RN { get; set; }
            public string FabType { get; set; }
            public int ItemFabId { get; set; }            
            public string SystemFab { get; set; }
            public string FabricSpec { get; set; }
            public string YarnSource { get; set; }
            public string YarnLot { get; set; }
            public string DeliveryDate { get; set; }
            public string MatchingWith { get; set; }
            public string Enzyme { get; set; }
            public string Process { get; set; }
            public string Body { get; set; }
            public string Rib { get; set; }
            public string BNT { get; set; }
            public string FabQty { get; set; }
            public string NoOfBatch { get; set; }
            public string Remarks { get; set; }
            public List<ItemFabric> fabric { get; set; }

            public string IsSample { get; set; }

        }
        public class ItemFabric
        {
            public int id { get; set; }
            public string name { get; set; }
        }
        public Task<IEnumerable<object>> GetBatchNo()
        {
            var parameters = new DynamicParameters();           
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchNo]", dbName: DyeingDB);
        }
        public List<BatchProcessing> GetBatchProcessingData(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.Query<BatchProcessing>(
                    storedProcedureName: @"[dbo].[usp_get_BatchProcessingData]", parameters: parameters, dbName: DyeingDB).ToList();

            //return DatabaseHubRpt.Query<BatchProcessing>(
            //       storedProcedureName: @"[dbo].[usp_get_BatchProcessingData_Updated]", parameters: parameters, dbName: DyeingDB).ToList();


        }
        public List<ItemFabric> GetFabricData(int BuyerId, int JobId, int StyleId, int BuyerReferenceId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: JobId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@StyleId", value: StyleId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuyerReferenceId", value: BuyerReferenceId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHubRpt.Query<ItemFabric>(
                    storedProcedureName: @"[dbo].[usp_get_ItemFabricByStyleOrder]", parameters: parameters, dbName: DyeingDB).ToList();
        }

        public Task<IEnumerable<object>> GetBatchCardDataSample(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardDataSample]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardData(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);           
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);           
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);           
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardData]", parameters: parameters,  dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetStyleOrderData(int unitId, int buyerId, int jobId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuyerId", value: buyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: jobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_StyleOrderData]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchOperationData(int unitId, int buyerId, int jobId, string fromDate, string toDate, int bpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuyerId", value: buyerId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@JobId", value: jobId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@BpmId", value: bpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchOperationData]", parameters: parameters, dbName: DyeingDB);
        }
        //public object GetBatchCardData(int BpmId)
        //{
        //    var data = new
        //    {
        //        BpmId = BpmId
        //    };

        //    return DatabaseHub.MultiQuery<object,object,object,object,object>(
        //            storedProcedureName: @"[dbo].[usp_rpt_BatchCard]", model: data, dbName: DyeingDB);
        //}
        public Task<IEnumerable<object>> GetSwatchCardData(int BpmId, int RUnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RUnitId", value: RUnitId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_ShadeCard]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchPrepMaster(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchPrepMaster]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetSampleBatchPrepMasterReport(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_SampleBatchPrepMaster]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetSampleBatchPrepMasterDetailsReport(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_SampleBatchPrepMasterDetails]", parameters: parameters, dbName: DyeingDB);
        }



        public Task<IEnumerable<object>> GetBatchCardMaster(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardMaster]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchCardDetail(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardDetail]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchSpecData(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchSpecification]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchCardFinishing(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardFinishing]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetDyeingProcess(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_GetProcessFlow]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetNozzleData(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_NozzleData]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetTrolleyNozzle(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_NozzleTrolley]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBuyerByUnit(int UnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_BuyerByUnit]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetSampleBatchPrepMaster(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_SampleBatchPrepMaster]", parameters: parameters, dbName: DyeingDB);

        }

        public Task<IEnumerable<object>> GetJobByBuyer(int BuyerId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BuyerId", value: BuyerId, dbType: DbType.Int32, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_Get_JobByBuyer]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetFinishingReceipe(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchFinishingReceipe]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetKnittingSpec(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_KnittingSpec]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetProductionPlanDashboard(string UnitId, string FromDate, string ToDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: FromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: ToDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_ProductionPlanDashboard]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetDyeingMasterDataForDisplay(int unitId, DateTime fromdate, DateTime todate)
        {
            var parameters = new Dapper.DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Fromdate", value: fromdate, dbType: DbType.DateTime, direction: ParameterDirection.Input);
            parameters.Add(name: "@Todate", value: todate, dbType: DbType.DateTime, direction: ParameterDirection.Input);


            var result = DatabaseHubRpt.QueryAsync<object>(
                storedProcedureName: @"[dbo].[GetMasterData]", parameters: parameters, dbName: DyeingDB);

            return result;
           
        }
        public Task<IEnumerable<object>> GetPackingListData(int Id)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Id", value: Id, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_PackingList]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetPackingListDataSample(int Id)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Id", value: Id, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_PackingListSample]", parameters: parameters, dbName: DyeingDB);
        }

        #region reprocess data report for specification
        public Task<IEnumerable<object>> GetBatchReprocessSpecData(int BpmId, int ReprocessNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ReprocessNo", value: ReprocessNo, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchReprocessSpecification]", parameters: parameters, dbName: DyeingDB);
        }
        #endregion


        #region reprocess data report  for master
        public Task<IEnumerable<object>> GetBatchReprocessPrepMaster(int BpmId, int ReprocessNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ReprocessNo", value: ReprocessNo, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchReprocessMaster]", parameters: parameters, dbName: DyeingDB);
        }
        #endregion

        #region batch card v2 dashboard
        public Task<IEnumerable<object>> GetBatchPrepareMaster(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardHead]", parameters: parameters, dbName: DyeingDB);
        }
        public Task<IEnumerable<object>> GetBatchPrepareDetail(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardDetails]", parameters: parameters, dbName: DyeingDB);
        }
        #endregion

        #region batch card v2
        public Task<IEnumerable<object>> GetBatchCardDataV2(int unitId, string mode, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Mode", value: mode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardDataV2]", parameters: parameters, dbName: DyeingDB);
        }
        #endregion

        #region batch card v2 new 13.6.2024

        public Task<IEnumerable<object>> GetBatchCardMasterNew(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Master]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardDataNew(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Data]", parameters: parameters, dbName: DyeingDB);

            //return DatabaseHub.QueryAsync<object>(
            //       storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2DataNew]", parameters: parameters, dbName: DyeingDB);


            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_rpt_BatchWithCardPL]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardSpecificationNew(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Specification]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetTrolleyNozzleNew(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_NozzleTrolleyNew]", parameters: parameters, dbName: DyeingDB);
        }

        #endregion


        #region New Process Batch Card
        public Task<IEnumerable<object>> GetBatchCardMasterNewProcess(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Master]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardDataNewProcess(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Master]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardSpecificationNewProcess(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_BatchCardNewV2Master]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetSampleBatchCardSpecification(int bpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name:"BpmId",value:bpmId,dbType:DbType.String,direction:ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_rpt_SampleBatchSpecification]",parameters:parameters,dbName:DyeingDB);
        }

        public Task<IEnumerable<object>> GetSampleSwatchCardData(int BpmId, int RUnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RUnitId", value: RUnitId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_SampleShadeCard]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetBatchCardDataV2Sample(int unitId, string mode, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Mode", value: mode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_SampleBatchCardDataV2]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetPackingListDataAuto(int Id)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@Id", value: Id, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_rpt_PackingListNew]", parameters: parameters, dbName: DyeingDB);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[Usp_rpt_packinglistnew_updated1]", parameters: parameters, dbName: DyeingDB);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[Usp_rpt_packinglistnew_updated2]", parameters: parameters, dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetProcessFlowData(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_rpt_BatchCardDataNewProcessFlowData]", parameters: parameters, dbName: DyeingDB);

            //return DatabaseHub.QueryAsync<object>(
            //   storedProcedureName: @"[dbo].[usp_rpt_ShowProcessFlow]", parameters: parameters, dbName: DyeingDB);

            return DatabaseHub.QueryAsync<object>(
               storedProcedureName: @"[dbo].[usp_rpt_ShowProcessFlowV1]", parameters: parameters, dbName: DyeingDB);


        }

        public Task<IEnumerable<object>> GetOthersFlowData(int BpmId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHub.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_rpt_BatchCardDataNewOthersFlowData]", parameters: parameters, dbName: DyeingDB);

            return DatabaseHub.QueryAsync<object>(
                storedProcedureName: @"[dbo].[usp_rpt_OthersFlowData]", parameters: parameters, dbName: DyeingDB);




        }

        #endregion

        public Task<IEnumerable<object>> GetBatchCardDataNewBulk(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardDataNewBulk]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetBatchCardDataV2NewBulk(int unitId, string mode, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Mode", value: mode, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHubRpt.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_get_BatchCardDataV2NewBulk]", parameters: parameters, dbName: DyeingDB);
        }



        public Task<IEnumerable<object>> GetBatchCardDataBeforeIssue(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);

            //return DatabaseHubRpt.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_get_BatchCardDataNewBulkBeforeIssue]", parameters: parameters, dbName: DyeingDB);

            return DatabaseHubRpt.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_get_BatchCardDataNewBulkBeforeIssueNew]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetBatchCardDataAfterIssue(int unitId, string fromDate, string toDate)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: unitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@FromDate", value: fromDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ToDate", value: toDate, dbType: DbType.String, direction: ParameterDirection.Input);
            
            //return DatabaseHubRpt.QueryAsync<object>(
            //        storedProcedureName: @"[dbo].[usp_get_BatchCardDataNewBulkAfterIssue]", parameters: parameters, dbName: DyeingDB);


            return DatabaseHubRpt.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[usp_get_BatchCardDataNewBulkAfterIssueNew]", parameters: parameters, dbName: DyeingDB);
        }


        public Task<IEnumerable<object>> GetSwatchCardDataNewBulk(int BpmId, int RUnitId)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@BpmId", value: BpmId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@RUnitId", value: RUnitId, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_rpt_ShadeCardNewBulk]", parameters: parameters, dbName: DyeingDB);
        }


        #region Dyanmic Production Monitoring
        public Task<IEnumerable<object>> GetDynamicMonitoring(int UnitId,int BuildingId,string Date,string Issue)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@BuildingId", value: BuildingId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            parameters.Add(name: "@Date", value: Date, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@FabricIssue", value: Issue, dbType: DbType.String, direction: ParameterDirection.Input);

            return DatabaseHub.QueryAsync<object>(storedProcedureName: @"[dbo].[usp_get_DynamicProductionReport]", parameters: parameters, dbName: DyeingDB);
        }
        #endregion

    }
}