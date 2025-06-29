using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Dyeing.API.DBInfo
{
    public class ConnectionRpt : IDisposable
    {
        private static SqlConnection ConnectionString(string dbName)
        {
            SqlConnection conn = new SqlConnection();
            //conn.ConnectionString = "data source=MISDCLS;Initial Catalog=" + dbName + ";Integrated Security=SSPI;ApplicationIntent=ReadOnly;";
            //conn.ConnectionString = @"data source=192.168.50.78;Initial Catalog=" + DbName + ";Integrated Security=false; User Id=sa; password=MIS@SERVER2;ApplicationIntent=ReadOnly";

            conn.ConnectionString = @"Data Source=192.168.50.77;Initial Catalog=" + dbName + "; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=1ndex@2023%24#new;";
            //conn.ConnectionString = @"Data Source=192.168.50.22\MSSQLSERVER14;Initial Catalog="+ dbName + "; ApplicationIntent=ReadOnly; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=*systemmis@16#;";
            //conn.ConnectionString = @"Data Source=192.168.50.78;Initial Catalog=" + dbName + "; ApplicationIntent=ReadOnly; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=1ndex@2023%24#new;";
            //conn.ConnectionString = @"Data Source=192.168.15.9;Initial Catalog=" + dbName + "; ApplicationIntent=ReadOnly; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=*systemmis@16#;";
            return conn;
            //return new SqlConnectionStringBuilder
            //{
            //    ApplicationName = "AMS",
            //    DataSource = @"192.168.50.22\MSSQLSERVER14",
            //    IntegratedSecurity = false,
            //    InitialCatalog = dbName,
            //    Password = "*systemmis@16#",
            //    PersistSecurityInfo = false,
            //    UserID = "sa",
            //    Pooling = true
            //};
        }

        protected static IDbConnection LiveConnection(string dbName)
        {
            var connection = OpenConnection(ConnectionString(dbName));
            connection.Open();
            return connection;
        }

        private static IDbConnection OpenConnection(SqlConnection conn)
        {
            return new SqlConnection(conn.ConnectionString);
        }

        protected static bool CloseConnection(IDbConnection connection)
        {
            if (connection.State != ConnectionState.Closed)
            {
                connection.Close();
                // connection.Dispose();
            }
            return true;
        }
        private static void ClearPool()
        {
            SqlConnection.ClearAllPools();
        }

        public void Dispose()
        {
            ClearPool();
        }
    }
}