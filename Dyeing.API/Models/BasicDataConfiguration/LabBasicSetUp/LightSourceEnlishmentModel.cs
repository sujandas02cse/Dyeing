using Dapper;
using Dyeing.API.DBInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Dyeing.API.Models.BasicDataConfiguration.LabBasicSetUp
{
    public class LightSourceEnlishmentModel
    {
        public class LightSourceModel : Base
        {
            public class LightSource
            {
                public int Id { get; set; }
                public string LightSourceName { get; set; }
                public string IsActive { get; set; }
                public string UserId { get; set; }
            }

            // ================= GET ALL =================
            public IEnumerable<object> GetAllLightSource()
            {
                return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Get_AllLightSource]",
                    dbName: DyeingDB);
            }

            // ================= SAVE / UPDATE =================
            public IEnumerable<object> SaveUpdateLightSource(LightSource obj)
            {
                var parameters = new DynamicParameters();

                parameters.Add("@LightSource", obj.LightSourceName,DbType.String, ParameterDirection.Input);
                parameters.Add("@IsActive", obj.IsActive,DbType.String, ParameterDirection.Input);
                parameters.Add("@UserId", obj.UserId,DbType.String, ParameterDirection.Input);
                parameters.Add("@Id", obj.Id,DbType.Int32, ParameterDirection.Input);

                return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_SaveUpdate_LightSource]",
                    parameters: parameters,
                    dbName: DyeingDB);
            }

            // ================= DELETE =================
            public IEnumerable<object> DeleteLightSource(int Id, string UserId)
            {
                var parameters = new DynamicParameters();

                parameters.Add("@Id", Id,DbType.Int32, ParameterDirection.Input);
                parameters.Add("@UserId", UserId,DbType.String, ParameterDirection.Input);

                return DatabaseHub.Query<object>(
                    storedProcedureName: @"[dbo].[usp_Delete_LightSource]",
                    parameters: parameters,
                    dbName: DyeingDB);
            }
        }
    }
}