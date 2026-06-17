using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LabDipReceipeModel : Base
    {
        public class LabDipReceipe
        {
            public int? LabReceivedId { get; set; }
            public string RNNo { get; set; }
            public string PrimaryLightSource { get; set; }
            public string SecondaryLightSource { get; set; }
            public string PreTreatmentFabricType { get; set; }
            public string MLRatio { get; set; }
            public string ProgramType { get; set; }
            public string LevelpH { get; set; }
            public string AlkalipH { get; set; }
            public string Remarks { get; set; }

            public double? CSynoULTYellowDSDyes { get; set; }
            public double? PSynoULTYellowDSDyes { get; set; }
            public double? CSynoULTRedDSDyes { get; set; }
            public double? PSynoULTRedDSDyes { get; set; }
            public double? CRemaBlueRRDyes { get; set; }
            public double? PRemaBlueRRDyes { get; set; }

            public string CSynoULTYellowDSDyesLot { get; set; }
            public string PSynoULTYellowDSDyesLot { get; set; }
            public string CSynoULTRedDSDyesLot { get; set; }
            public string PSynoULTRedDSDyesLot { get; set; }
            public string CRemaBlueRRDyesLot { get; set; }
            public string PRemaBlueRRDyesLot { get; set; }

            public string DSalt { get; set; }
            public string DSoda { get; set; }
            public string DCaustic { get; set; }
            public string Temp { get; set; }
            public string pH { get; set; }
            public string PSDGL { get; set; }
            public string RI { get; set; }
            public string DFM { get; set; }
            public string TOP { get; set; }

            public string RCausticSoda { get; set; }
            public string RHydrogenPerOxide { get; set; }
            public string RTemp { get; set; }
        }

        public IEnumerable<object> GetAllLabDipBookingData()
        {
            
            return (IEnumerable<object>)DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_AllLabDipReceipe]",
                dbName: DyeingDB);
        }

        public IEnumerable<object> GetLabDipReceipeCardData(int LabReceiveId)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LabReceiveId", LabReceiveId, DbType.Int32, ParameterDirection.Input);
            

            return DatabaseHub.Query<object>(
                storedProcedureName: @"[dbo].[usp_Get_LabDipReceipeByReceiveId]",
                parameters: parameters,
                dbName: DyeingDB);
        }

        public IEnumerable<object> SaveLabDipDeclare(LabDipReceipe model)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@LabReceivedId", model.LabReceivedId);
            parameters.Add("@RNNo", model.RNNo);
            parameters.Add("@PrimaryLightSource", model.PrimaryLightSource);
            parameters.Add("@SecondaryLightSource", model.SecondaryLightSource);
            parameters.Add("@PreTreatmentFabricType", model.PreTreatmentFabricType);
            parameters.Add("@MLRatio", model.MLRatio);
            parameters.Add("@ProgramType", model.ProgramType);
            parameters.Add("@LevelpH", model.LevelpH);
            parameters.Add("@AlkalipH", model.AlkalipH);
            parameters.Add("@Remarks", model.Remarks);

            parameters.Add("@CSynoULTYellowDSDyes", model.CSynoULTYellowDSDyes);
            parameters.Add("@PSynoULTYellowDSDyes", model.PSynoULTYellowDSDyes);
            parameters.Add("@CSynoULTRedDSDyes", model.CSynoULTRedDSDyes);
            parameters.Add("@PSynoULTRedDSDyes", model.PSynoULTRedDSDyes);
            parameters.Add("@CRemaBlueRRDyes", model.CRemaBlueRRDyes);
            parameters.Add("@PRemaBlueRRDyes", model.PRemaBlueRRDyes);

            parameters.Add("@CSynoULTYellowDSDyesLot", model.CSynoULTYellowDSDyesLot);
            parameters.Add("@PSynoULTYellowDSDyesLot", model.PSynoULTYellowDSDyesLot);
            parameters.Add("@CSynoULTRedDSDyesLot", model.CSynoULTRedDSDyesLot);
            parameters.Add("@PSynoULTRedDSDyesLot", model.PSynoULTRedDSDyesLot);
            parameters.Add("@CRemaBlueRRDyesLot", model.CRemaBlueRRDyesLot);
            parameters.Add("@PRemaBlueRRDyesLot", model.PRemaBlueRRDyesLot);

            parameters.Add("@DSalt", model.DSalt);
            parameters.Add("@DSoda", model.DSoda);
            parameters.Add("@DCaustic", model.DCaustic);
            parameters.Add("@Temp", model.Temp);
            parameters.Add("@pH", model.pH);
            parameters.Add("@PSDGL", model.PSDGL);
            parameters.Add("@RI", model.RI);
            parameters.Add("@DFM", model.DFM);
            parameters.Add("@TOP", model.TOP);

            parameters.Add("@RCausticSoda", model.RCausticSoda);
            parameters.Add("@RHydrogenPerOxide", model.RHydrogenPerOxide);
            parameters.Add("@RTemp", model.RTemp);

            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[usp_SaveUpdate_tbl_LabDipReceipe]", parameters: parameters,dbName: DyeingDB);
        }
    }
}