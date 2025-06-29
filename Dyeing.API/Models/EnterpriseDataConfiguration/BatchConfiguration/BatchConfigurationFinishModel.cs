using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration
{
    public class BatchConfigurationFinishModel : Base
    {

        public class BatchConfigurationMatchine 
        {
            public string TubeWtSpeed { get; set; }
            public string TubeWtPressure { get; set; }
            public string TubeWtStreching { get; set; }
            public string TubeWtBeforeWidth { get; set; }
            public string TubeWtOverFeed { get; set; }
            public string TubeWtAfterWidth { get; set; }
            public string TubeWtFrameWidth { get; set; }
            public string TubeDrySpeed { get; set; }
            public string TubeDryAfterWidth { get; set; }
            public string TubeDryOverFeed { get; set; }
            public string TubeDryAfterGSM { get; set; }
            public string TubeDryTempreature { get; set; } 
            public string TubeDryTempreature2 { get; set; }
            public string TubeDryTempreature3 { get; set; }
            public string TubeDryShrinkageL { get; set; }
            public string TubeDryShrinkageW { get; set; }
            public string TubeCompSpeed { get; set; }
            public string TubeCompTemperature { get; set; }
            public string TubeCompOverfeed { get; set; }
            public string TubeCompSetWidth { get; set; }
            public string TubeCompLowerShoe { get; set; }
            public string TubeCompAfterWidth { get; set; }
            public string TubeCompUpperShoe { get; set; }
            public string TubeCompAfterGSM { get; set; }


            public string OpenWtSpeed { get; set; }
            public string OpenWtPressure { get; set; }
            public string OpenWtOverfeed { get; set; }
            public string OpenWtAfterWidth { get; set; } 
            public string OpenStenSpeed { get; set; }
            public string OpenStenSetWidth { get; set; }
            public string OpenStenOverfeed { get; set; }
            public string OpenStenAfterWidth { get; set; }

            public string OpenStenTempreature { get; set; }
            public string OpenStenTempreature2 { get; set; }
            public string OpenStenTempreature3 { get; set; }
            public string OpenStenShrinkageL { get; set; }
            public string OpenStenShrinkageW { get; set; }
            public string OpenStenAfterGSM { get; set; }
            public string OpenStenAfterGSM2 { get; set; }
            public string OpenStenAfterGSM3 { get; set; }

            public string OpenCompSpeed { get; set; }
            public string OpenCompBeforeWidth { get; set; }
            public string OpenCompOverfeed { get; set; }
            public string OpenCompAfterWidth { get; set; }
            public string OpenCompTemperature { get; set; }
            public string OpenCompAfterGSM { get; set; }



            public string ResultFinalWidth { get; set; }
            public string ResultFinalGSM { get; set; }
            public string ResultGreyWeight { get; set; }
            public string ResultFinishedWeight { get; set; }
            public string ResultNoofRolls { get; set; }
            public string ResultShrinkageL { get; set; }
            public string ResultShrinkageW { get; set; }
            public string ResultSpirality { get; set; }
            public string ResultProcessLossKg { get; set; }
            public string ResultProcessLossPercent { get; set; }
      


            public int BatchId { get; set; }
     
            public string UserId { get; set; }
            public string QrCode { get; set; }
            public bool QualityOk { get; set; }
            public bool QualityNotOk { get; set; }
            public bool Rpcs { get; set; }
           

        }

        public class BatchConfigurationRecipe
        {
            public string RecipeDrescription { get; set; } 
            public string Unit { get; set; }
            public int BfrId { get; set; }
        }

        public class BatchConfigurationFinishing 
        {

            public int BatchId { get; set; }
            public string UserId { get; set; }  
            public string QrCode { get; set; } 
            public bool QualityOk { get; set; }
            public bool QualityNotOk { get; set; }
            public bool Rpcs { get; set; }
        }

        public class ObjectList
        {
            public ObjectList()
            {
                MatchineFins = new BatchConfigurationMatchine();
                BatchFins = new BatchConfigurationFinishing();
                //RecipeList = new List<BatchConfigurationRecipe>();
            }
            public BatchConfigurationMatchine MatchineFins { get; set; }  //  
            public BatchConfigurationFinishing BatchFins { get; set; }  
            //public List<BatchConfigurationRecipe> RecipeList { get; set; }
        }

        public long DyeingBatchConfigFinish_SaveUpdate(ObjectList _obj) 
        {

            var data = new
            {


                HostIP = getclientIP(),
                CreatedBy = _obj.MatchineFins.UserId,
                BatchId = _obj.MatchineFins.BatchId,
                //QRCode=_obj.MatchineFins.QrCode,
                //ShadeQuality = _obj.MatchineFins.QualityOk,
                //RPCS = _obj.MatchineFins.Rpcs,

                TFDwMcSpeed = _obj.MatchineFins.TubeWtSpeed,
                TFDwStretching = _obj.MatchineFins.TubeWtStreching,
                TFDwOverFeed = _obj.MatchineFins.TubeWtOverFeed,
                TFDwFrameWidth = _obj.MatchineFins.TubeWtOverFeed,
                TFDwPPressure = _obj.MatchineFins.TubeWtPressure,
                TFDwBeforeWidth = _obj.MatchineFins.TubeWtBeforeWidth,
                TFDwAfterWidth = _obj.MatchineFins.TubeWtAfterWidth,
                TFDrMcSpeed = _obj.MatchineFins.TubeDryOverFeed,
                TFDrOverFeed = _obj.MatchineFins.TubeDryOverFeed,
                TFDrTemperature = _obj.MatchineFins.TubeDryTempreature,
                TFDrShrinkageL = _obj.MatchineFins.TubeDryShrinkageL ,
                TFDrShrinkageW = _obj.MatchineFins.TubeDryShrinkageW ,
                TFDrAfterWidth = _obj.MatchineFins.TubeDryAfterWidth,
                TFDrAfterGsm = _obj.MatchineFins.TubeDryAfterGSM,

                TFComMcSpeed = _obj.MatchineFins.TubeCompSpeed,
                TFComOverFeed = _obj.MatchineFins.TubeCompOverfeed,
                TFComLowerShoe = _obj.MatchineFins.TubeCompLowerShoe,
                TFComUpperShoe = _obj.MatchineFins.TubeCompUpperShoe,
                TFComTemperature = _obj.MatchineFins.TubeCompTemperature,
                TFComSetWidth = _obj.MatchineFins.TubeCompSetWidth,
                TFComAfterWidth = _obj.MatchineFins.TubeCompAfterWidth,
                TFComAfterGSM = _obj.MatchineFins.TubeCompAfterGSM,

                OFDwMcSpeed = _obj.MatchineFins.OpenWtSpeed,
                OFDwOverFeed = _obj.MatchineFins.OpenWtOverfeed,
                OFPPressure = _obj.MatchineFins.OpenWtPressure,
                OFDwAfterWidth = _obj.MatchineFins.OpenWtAfterWidth,

                OFStMcSpeed = _obj.MatchineFins.OpenStenSpeed,
                OFStOverFeed = _obj.MatchineFins.OpenStenOverfeed,
                OFStTempreature = _obj.MatchineFins.OpenStenTempreature,
                OFStShrinkageL = _obj.MatchineFins.OpenStenShrinkageL ,
                OFStShrinkageW = _obj.MatchineFins.OpenStenShrinkageW ,
                OFStAfterGSM = _obj.MatchineFins.OpenStenAfterGSM,

                OFComMcSpeed = _obj.MatchineFins.OpenCompSpeed,
                OFComOverFeed = _obj.MatchineFins.OpenCompOverfeed,
                OFComTempreature = _obj.MatchineFins.OpenCompTemperature,
                OFComBeforeWidth = _obj.MatchineFins.OpenCompBeforeWidth,
                OFComAfterWidth = _obj.MatchineFins.OpenCompAfterWidth,
                OFComAfterGSM = _obj.MatchineFins.OpenCompAfterGSM,

                RFinalWidth = _obj.MatchineFins.ResultFinalWidth,
                RFinalGSM = _obj.MatchineFins.ResultFinalGSM,
                RGreyWeight = _obj.MatchineFins.ResultGreyWeight,
                RFinishedWeight = _obj.MatchineFins.ResultFinishedWeight,
                RNoOfRolls = _obj.MatchineFins.ResultNoofRolls,
                RShrinkageL = _obj.MatchineFins.ResultShrinkageL,
                RShrinkageW = _obj.MatchineFins.ResultShrinkageW,
                RSpirality = _obj.MatchineFins.ResultSpirality,
                RProcessLossKg = _obj.MatchineFins.ResultProcessLossKg,
                OFStSetWidth  = _obj.MatchineFins.OpenStenSetWidth,
                OFStAfterWidth = _obj.MatchineFins.OpenStenAfterWidth,
                RProcessLossPer = _obj.MatchineFins.ResultProcessLossPercent,
                ////BatchConfigFinRecipe = _obj.RecipeList.AsTableValuedParameter("dbo.DyeingBatchConfigFinishRecipe",
                ////            new[] { "RecipeDrescription", "Unit", "BfrId" })
            };
            return DatabaseHub.Execute(storedProcedureName: "[dbo].[SaveUpdate_DyeingBatchConfigFinish]", model: data, dbName: DyeingDB);

        }

        public object GetBatchConfigurationFinis(int batchId)
        {
            var data = new
            {
                BatchId = batchId,
               
            };
            var result= DatabaseHub.MultiQuery<object, object, object>( 
                    storedProcedureName: @"[dbo].[Get_DyeingBatchConfigFinish]", model: data, dbName: DyeingDB);
            return result;
        }


        public object GetBatchNoList(int batchId) 
        {
            var data = new
            {
                BatchId = batchId,

            };
            var result = DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[GetBactchList]", dbName: DyeingDB);
            return result;
        }
    }
}