using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Dyeing.API.DBInfo
{
    public class Connection: IDisposable
    {
        private static SqlConnection ConnectionString(string dbName)
        {
            SqlConnection conn = new SqlConnection();

            // Original Live server 
            conn.ConnectionString = @"Data Source=192.168.50.77;Initial Catalog=" + dbName + "; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=1ndex@2023%24#new; Connect Timeout=0;";

            //Local host and test
          //  conn.ConnectionString = @"Data Source=192.168.15.7;Initial Catalog=" + dbName + "; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=*systemmis@16#;Connect Timeout=0;";


            return conn;
        
        }

        private static SqlConnection ConnectionStringReadOnly(string dbName)
        {
            SqlConnection conn = new SqlConnection();

            // Original Live server 
            conn.ConnectionString = @"data source=192.168.50.78;Initial Catalog=" + dbName + ";Integrated Security=false; User Id=sa; password=1ndex@2023%24#new;ApplicationIntent=ReadOnly";

            // Local Host and test
          //  conn.ConnectionString = @"Data Source=192.168.15.7;Initial Catalog=" + dbName + "; PersistSecurityInfo = false; Integrated Security = false; Pooling = true; User id=sa;Password=*systemmis@16#;Connect Timeout=0;";


            return conn;
        
        }

        protected static IDbConnection LiveConnection(string dbName)
        {
            var connection = OpenConnection(ConnectionString(dbName));
            connection.Open();
            return connection;
        }
        protected static IDbConnection LiveConnectionReadOnly(string dbName)
        {
            var connection = OpenConnection(ConnectionStringReadOnly(dbName));
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