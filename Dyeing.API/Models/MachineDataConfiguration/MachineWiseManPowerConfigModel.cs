using Dapper;
using Dyeing.API.DBInfo;
//using Dyeing.API.HelpingData;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.MachineDataConfiguration
{
    public class MachineWiseManPowerConfigModel:Base
    {
        public class MachineWiseManPower
        {
            public int MwMPId { get; set; }
            public int UnitId { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public string HostIP { get; set; }
            public string UserId { get; set; }
            public List<MachineWiseManPowerDetails> lDetails = new List<MachineWiseManPowerDetails>();
            public List<MachineWiseManPowerDetailsChild> lChild = new List<MachineWiseManPowerDetailsChild>();
        }
        public class MachineWiseManPowerDetails
        {
            public int sl { get; set; }
            public int MwMPdId { get; set; }
            public int MwMPId { get; set; }
            public int McTypeId { get; set; }
            public int McId { get; set; }
            public int EmpId { get; set; }
            public string EmpName { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public string FromShift { get; set; }
            public string ShiftName { get; set; }
            public string ToShift { get; set; }
            
        }
        public Task<long> SaveUpdate(MachineWiseManPower _obj)
        {
            var data = new
            {
                MwMPId=_obj.MwMPId,
                UnitId =_obj.UnitId,
                FromDate=_obj.FromDate,
                ToDate=_obj.ToDate,
                UserId=_obj.UserId,
                HostIP = getclientIP(),
                MachineWiseManPowerDetails = _obj.lDetails.AsTableValuedParameter("dbo.MachineWiseManPowerDetails",
                            new[] { "sl", "MwMPdId", "MwMPId", "McTypeId", "McId", "EmpId", "FromDate", "ToDate", "FromShift", "ToShift" }),
                MachineWiseManPowerDetailsChild = _obj.lChild.AsTableValuedParameter("dbo.MachineWiseManPowerDetailsChild",
                            new[] { "Sl", "MwMPcId", "MwMPdId", "MwMPId", "DDate", "EmpId", "ShiftId", "McId" })

            };
            return DatabaseHub.ExecuteAsync(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_MachineDataConfiguration]", model: data, dbName: DyeingDB);
        }
        public class MachineWiseManPowerDetailsChild
        {
            public int Sl { get; set; }
            public int MwMPcId { get; set; }
            public int MwMPdId { get; set; }
            public int MwMPId { get; set; }
            public string DDate { get; set; }
            public int EmpId { get; set; }
            public int ShiftId { get; set; }
            public string ShiftName { get; set; }
            public int McId { get; set; }
        }
        public Task<IEnumerable<object>> GetUnitName()
        {
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[sp_Select_DyeingUnit]", dbName: DyeingDB);
        }

        public Task<IEnumerable<object>> GetEmp(int UnitNo)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UnitId", value: UnitNo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetEmp_StaffUnitWise]", parameters: parameters, dbName: HRM);          
        }

        public Task<IEnumerable<object>> GetShift()
        {
            //throw new NotImplementedException();
            return DatabaseHub.QueryAsync<object>(
                   storedProcedureName: @"[dbo].[sp_RosterShift_Select]", dbName: DyeingDB); 
        }

        public Task<IEnumerable<object>> GetEmpShift(string fDate, string tDate, int empId)
        {
            var parameters = new DynamicParameters();
            //parameters.Add(name: "@FDate", value: fDate, dbType: DbType.String, direction: ParameterDirection.Input);
            //parameters.Add(name: "@TDate", value: tDate, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@EmpId", value: empId, dbType: DbType.Int32, direction: ParameterDirection.Input);
            return DatabaseHub.QueryAsync<object>(
                    storedProcedureName: @"[dbo].[usp_GetEmpShiftDet]", parameters: parameters, dbName: DyeingDB);
        }

        
    }
}