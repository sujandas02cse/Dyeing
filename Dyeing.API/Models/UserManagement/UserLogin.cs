using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.Models.UserManagement
{
    public class Login : Base
    {
        public class UserLogin
        {
            //public string UserName { get; set; }
            //public int UserId { get; set; }
            //public string PassWord { get; set; }
            //public string EmpCode { get; set; }
            //public string EmpId { get; set; }
            //public string Email { get; set; }
            //public string AttachFileName { get; set; }
            //public bool IsPermitted { get; set; }
            public string UserName { get; set; }
            public string Name { get; set; }
            public string Designation { get; set; }
            public int UserId { get; set; }
            public string PassWord { get; set; }
            public string EmpCode { get; set; }
            public string EmpId { get; set; }
            public string Email { get; set; }
            public string EmpImage { get; set; }
            public byte[] Attachment { get; set; }
            public string AttachFileName { get; set; }
            public bool IsPermitted { get; set; }
        }
        public class AppDriverLogin
        {
            public string DriverId { get; set; }
            public string DPassword { get; set; }
            public string IMEINo { get; set; }
        }
        public async Task<UserLogin> GetUserLogin(UserLogin obj)
        {
            var parameters = new DynamicParameters();
            var PassWord = EncryptDecrypt.EncryptText(obj.PassWord);
            parameters.Add(name: "@UserName", value: obj.UserName, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@PassWord", value: PassWord, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@ModuleId", value: "18", dbType: DbType.String, direction: ParameterDirection.Input);
            return  (await DatabaseHub.QueryAsync<UserLogin>(
                    storedProcedureName: @"[dbo].[sp_GetUserLoginCheckData]", parameters: parameters, dbName: ControlPanel)).FirstOrDefault();
                    //storedProcedureName: @"[dbo].[sp_GetUserLoginCheckData_AMS]", parameters: parameters, dbName: ControlPanel)).FirstOrDefault();
           
        }

        public object AppLogin(AppDriverLogin obj)
        {
            var parameters = new DynamicParameters();
            parameters.Add(name: "@UserId", value: obj.DriverId, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@Password", value: obj.DPassword, dbType: DbType.String, direction: ParameterDirection.Input);
            parameters.Add(name: "@IMEINo", value: obj.IMEINo, dbType: DbType.String, direction: ParameterDirection.Input);
            return DatabaseHub.Query<object>(storedProcedureName: @"[dbo].[sp_m_GetAppLoginCheckData]", parameters: parameters, dbName: AMSDB).FirstOrDefault();
        }
    }
}