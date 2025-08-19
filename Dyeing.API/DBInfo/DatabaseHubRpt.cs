using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Dyeing.API.DBInfo
{
    public class DatabaseHubRpt : ConnectionRpt, IDatabaseHub
    {
        /// <summary>
        /// This function is used for validating if the Stored Procedure's name is correct.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <returns>Returns true if name is not empty and matches naming patter, otherwise returns false.</returns>

        private static bool IsStoredProcedureNameCorrect(string storedProcedureName)
        {
            if (string.IsNullOrEmpty(storedProcedureName))
            {
                return false;
            }

            if (storedProcedureName.StartsWith("[") && storedProcedureName.EndsWith("]"))
            {
                return Regex.IsMatch(storedProcedureName,
                    @"^[\[]{1}[A-Za-z0-9_]+[\]]{1}[\.]{1}[\[]{1}[A-Za-z0-9_]+[\]]{1}$");
            }
            return Regex.IsMatch(storedProcedureName, @"^[A-Za-z0-9]+[\.]{1}[A-Za-z0-9]+$");
        }       

        internal static Task<IEnumerable<T>> QueryAsync<T>(string storedProcedureName, DynamicParameters parameters, object dbName)
        {
            throw new NotImplementedException();
        }
        
        public long Execute<TModel>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return 0;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Execute(
                        sql: storedProcedureName,
                        param: model,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );

                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<long> ExecuteAsync<TModel>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return 0;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.ExecuteAsync(
                        sql: storedProcedureName,
                        param: model,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );

                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        /// <summary>
        /// This method is used to execute the stored procedures with parameter. This is the generic version of the method.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>        
        /// <returns>Returns how many rows have been affected.</returns>

        public long Execute(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return 0;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Execute(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }



        public async Task<long> ExecuteAsync(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return 0;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.ExecuteAsync(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );

                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <typeparam name="TModel">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>

        public IEnumerable<TModel> Query<TModel>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Query<TModel>(
                        sql: storedProcedureName,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<IEnumerable<TResult>> QueryAsync<TResult>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.QueryAsync<TResult>(
                        sql: storedProcedureName,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>

        public IEnumerable<TResult> Query<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Query<TResult>(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<IEnumerable<TResult>> QueryAsync<TResult>(string storedProcedureName,
            DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.QueryAsync<TResult>(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="model">The model object containing all the values that passes as Stored Procedure's parameter.</param>
        /// <typeparam name="TModel">This is the type of POCO class that will be sent as parameter. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <typeparam name="TResult">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        public IEnumerable<TResult> Query<TModel, TResult>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Query<TResult>(
                        sql: storedProcedureName,
                        param: model,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<IEnumerable<TResult>>
            QueryAsync<TModel, TResult>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.QueryAsync<TResult>(
                        sql: storedProcedureName,
                        param: model,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>
            MultiQuery<TResult1, TResult2>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>
            MultiQuery<TResult1, TResult2, TResult3>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4,
                        result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(result1, result2,
                        result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>,
                        IEnumerable<TResult7>>(result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();
                    var result8 = queryResult.Read<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>
            MultiQuery<TModel, TResult1, TResult2>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>
            MultiQuery<TModel, TResult1, TResult2, TResult3>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>
            MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>
            MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4,
                        result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>
            MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(result1,
                        result2, result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>
            MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(
            string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>
                        (result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>
            MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: model,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();
                    var result8 = queryResult.Read<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>
            MultiQuery<TResult1, TResult2>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>
            MultiQuery<TResult1, TResult2, TResult3>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4,
                        result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(result1, result2,
                        result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>(
                        result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>
            MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = queryResult.Read<TResult1>();
                    var result2 = queryResult.Read<TResult2>();
                    var result3 = queryResult.Read<TResult3>();
                    var result4 = queryResult.Read<TResult4>();
                    var result5 = queryResult.Read<TResult5>();
                    var result6 = queryResult.Read<TResult6>();
                    var result7 = queryResult.Read<TResult7>();
                    var result8 = queryResult.Read<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>>
            MultiQueryAsync<TResult1, TResult2>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>>
            MultiQueryAsync<TResult1, TResult2, TResult3>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4,
                        result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = connection.QueryMultiple(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(result1, result2,
                        result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(
            string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>,
                        IEnumerable<TResult7>>(result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();
                    var result8 = await queryResult.ReadAsync<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>>
            MultiQueryAsync<TModel, TResult1, TResult2>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(
                        result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>>
            MultiQueryAsync<TModel, TResult1, TResult2, TResult3>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>>
            MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>>
            MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4,
                        result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>>
            MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(
            string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(
                        result1, result2, result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(
            string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                    sql: storedProcedureName,
                    param: model,
                    commandTimeout: null,
                    commandType: CommandType.StoredProcedure
                    ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>(
                        result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>>
            MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, TModel model, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                        sql: storedProcedureName,
                        param: model,
                        commandTimeout: null,
                        commandType: CommandType.StoredProcedure
                        ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();
                    var result8 = await queryResult.ReadAsync<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>>
            MultiQueryAsync<TResult1, TResult2>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>(result1, result2);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>>
            MultiQueryAsync<TResult1, TResult2, TResult3>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>(
                        result1, result2, result3);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>>(result1, result2, result3, result4);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>>(result1, result2, result3, result4, result5);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>(result1, result2,
                        result3, result4, result5, result6);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(
            string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {
                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>(
                        result1, result2, result3, result4, result5, result6, result7);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>>
            MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(
            string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            using (var queryResult = await connection.QueryMultipleAsync(
                sql: storedProcedureName,
                param: parameters,
                commandTimeout: null,
                commandType: CommandType.StoredProcedure
                ))
            {
                try
                {

                    var result1 = await queryResult.ReadAsync<TResult1>();
                    var result2 = await queryResult.ReadAsync<TResult2>();
                    var result3 = await queryResult.ReadAsync<TResult3>();
                    var result4 = await queryResult.ReadAsync<TResult4>();
                    var result5 = await queryResult.ReadAsync<TResult5>();
                    var result6 = await queryResult.ReadAsync<TResult6>();
                    var result7 = await queryResult.ReadAsync<TResult7>();
                    var result8 = await queryResult.ReadAsync<TResult8>();

                    return new Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>,
                        IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>,
                        IEnumerable<TResult8>>(result1, result2, result3, result4, result5, result6, result7, result8);
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        #region new function for extra time
        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>

        public IEnumerable<TResult> QueryNew<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return connection.Query<TResult>(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: 1800,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }

        public async Task<IEnumerable<TResult>> QueryAsyncNew<TResult>(string storedProcedureName,
            DynamicParameters parameters, string dbName)
        {
            if (!IsStoredProcedureNameCorrect(storedProcedureName))
            {
                return null;
            }

            using (var connection = LiveConnection(dbName))
            {
                try
                {
                    return await connection.QueryAsync<TResult>(
                        sql: storedProcedureName,
                        param: parameters,
                        commandTimeout: 1800,
                        commandType: CommandType.StoredProcedure
                        );
                }
                catch (Exception exception)
                {
                    throw exception;
                }
                finally
                {
                    CloseConnection(connection);
                }
            }
        }
        #endregion
    }
}