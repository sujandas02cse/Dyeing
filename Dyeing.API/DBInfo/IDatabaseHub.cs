using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dyeing.API.DBInfo
{
    public interface IDatabaseHub
    {
        /// <summary>
        /// This method is used to execute the stored procedures with parameter. This is the generic version of the method.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="model">The model object containing all the values that passes as Stored Procedure's parameter.</param>
        /// <typeparam name="TModel">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns how many rows have been affected.</returns>
        long Execute<TModel>(string storedProcedureName, TModel model, string dbName);

        /// <summary>
        /// This method is used to execute the stored procedures with parameter.This is the generic version of the method.
        /// </summary>
        /// <param name="storedProcedureName">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </param>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="model">The model object containing all the values that passes as Stored Procedure's parameter.</param>
        /// <returns>Returns how many rows have been affected.</returns>
        Task<long> ExecuteAsync<TModel>(string storedProcedureName, TModel model, string dbName);

        /// <summary>
        /// This method is used to execute the stored procedures with parameter. This is the generic version of the method.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>        
        /// <returns>Returns how many rows have been affected.</returns>         
        long Execute(string storedProcedureName, DynamicParameters parameters, string dbName);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="storedProcedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task<long> ExecuteAsync(string storedProcedureName, DynamicParameters parameters, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <typeparam name="TResult">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        IEnumerable<TResult> Query<TResult>(string storedProcedureName, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Asynchronous Method, and it returns a list of POCO class.
        /// </summary>
        /// <typeparam name="TResult">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        Task<IEnumerable<TResult>> QueryAsync<TResult>(string storedProcedureName, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        IEnumerable<TResult> Query<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Asynchronous Method, and it returns a list of POCO class.
        /// </summary>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        Task<IEnumerable<TResult>> QueryAsync<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="model">The model object containing all the values that passes as Stored Procedure's parameter.</param>
        /// <typeparam name="TModel">This is the type of POCO class that will be sent as parameter. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <typeparam name="TResult">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        IEnumerable<TResult> Query<TModel, TResult>(string storedProcedureName, TModel model, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Asynchronous Method, and it returns a list of POCO class.
        /// </summary>
        /// <typeparam name="TModel">This is the type of POCO class that will be sent as parameter. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <typeparam name="TResult">This is the type of POCO class that will be returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="model">The model object containing all the values that passes as Stored Procedure's parameter.</param>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        Task<IEnumerable<TResult>> QueryAsync<TModel, TResult>(string storedProcedureName, TModel model, string dbName);

        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1">First table's Model class</typeparam>
        /// <typeparam name="TResult2">Second table's Model class</typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <returns>A tuple contatining two lists of model class</returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>> MultiQuery<TResult1, TResult2>(string storedProcedureName, string dbName);

        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1">First table's Model class</typeparam>
        /// <typeparam name="TResult2">Second table's Model class</typeparam>
        /// <typeparam name="TResult3">Third table's Model class</typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <returns>A tuple contatining three lists of model class</returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>> MultiQuery<TResult1, TResult2, TResult3>(string storedProcedureName, string dbName);


        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1"></typeparam>
        /// <typeparam name="TResult2"></typeparam>
        /// <typeparam name="TResult3"></typeparam>
        /// <typeparam name="TResult4"></typeparam>
        /// <param name="storedProcedureName"></param>
        /// <returns></returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>> MultiQuery<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, string dbName);

        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1"></typeparam>
        /// <typeparam name="TResult2"></typeparam>
        /// <typeparam name="TResult3"></typeparam>
        /// <typeparam name="TResult4"></typeparam>
        /// <typeparam name="TResult5"></typeparam>
        /// <param name="storedProcedureName"></param>
        /// <returns></returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, string dbName);

        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1"></typeparam>
        /// <typeparam name="TResult2"></typeparam>
        /// <typeparam name="TResult3"></typeparam>
        /// <typeparam name="TResult4"></typeparam>
        /// <typeparam name="TResult5"></typeparam>
        /// <typeparam name="TResult6"></typeparam>
        /// <param name="storedProcedureName"></param>
        /// <returns></returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, string dbName);
        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1"></typeparam>
        /// <typeparam name="TResult2"></typeparam>
        /// <typeparam name="TResult3"></typeparam>
        /// <typeparam name="TResult4"></typeparam>
        /// <typeparam name="TResult5"></typeparam>
        /// <typeparam name="TResult6"></typeparam>
        /// <typeparam name="TResult7"></typeparam>
        /// <param name="storedProcedureName"></param>
        /// <returns></returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, string dbName);
        /// <summary>
        /// This method is used to execute Stored Procedure containing multiple queries.
        /// This is the non-asynchronus method, and returns a Tuple of tables serialized into objects of Model class.
        /// </summary>
        /// <typeparam name="TResult1"></typeparam>
        /// <typeparam name="TResult2"></typeparam>
        /// <typeparam name="TResult3"></typeparam>
        /// <typeparam name="TResult4"></typeparam>
        /// <typeparam name="TResult5"></typeparam>
        /// <typeparam name="TResult6"></typeparam>
        /// <typeparam name="TResult7"></typeparam>
        /// <typeparam name="TResult8"></typeparam>
        /// <param name="storedProcedureName"></param>
        /// <returns></returns>
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, string dbName);

        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>> MultiQuery<TModel, TResult1, TResult2>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>> MultiQuery<TModel, TResult1, TResult2, TResult3>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>> MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>> MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>> MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>> MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, TModel model, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>> MultiQuery<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, TModel model, string dbName);

        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>> MultiQuery<TResult1, TResult2>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>> MultiQuery<TResult1, TResult2, TResult3>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>> MultiQuery<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>> MultiQuery<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, DynamicParameters parameters, string dbName);

        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>> MultiQueryAsync<TResult1, TResult2>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>> MultiQueryAsync<TResult1, TResult2, TResult3>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, string dbName);

        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>> MultiQueryAsync<TModel, TResult1, TResult2>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, TModel model, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>> MultiQueryAsync<TModel, TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, TModel model, string dbName);

        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>>> MultiQueryAsync<TResult1, TResult2>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>>> MultiQueryAsync<TResult1, TResult2, TResult3>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7>(string storedProcedureName, DynamicParameters parameters, string dbName);
        Task<Tuple<IEnumerable<TResult1>, IEnumerable<TResult2>, IEnumerable<TResult3>, IEnumerable<TResult4>, IEnumerable<TResult5>, IEnumerable<TResult6>, IEnumerable<TResult7>, IEnumerable<TResult8>>> MultiQueryAsync<TResult1, TResult2, TResult3, TResult4, TResult5, TResult6, TResult7, TResult8>(string storedProcedureName, DynamicParameters parameters, string dbName);

        #region new interface for time execption
        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Method, and it returns a list of POCO class.
        /// </summary>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        IEnumerable<TResult> QueryNew<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName);

        /// <summary>
        /// This method executes the Stored Procedure, gets the data from execution and returns that data in a list.
        /// This is a Generic Asynchronous Method, and it returns a list of POCO class.
        /// </summary>
        /// <typeparam name="TResult">This is the type of POCO class that will be sent as pamater and returned. For more info, refer to https://msdn.microsoft.com/en-us/library/vstudio/dd456872(v=vs.100).aspx. </typeparam>
        /// <param name="storedProcedureName">Stored Procedure's name. Expected to be a Verbatim String, e.g. @"[Schema].[Stored-Procedure-Name]"</param>
        /// <param name="parameters">Parameter required for executing Stored Procedure.</param>
        /// <returns>Returns a List of POCO class if successfully executed. If any exception is raised, it returns null.</returns>
        Task<IEnumerable<TResult>> QueryAsyncNew<TResult>(string storedProcedureName, DynamicParameters parameters, string dbName);
        #endregion
    }
}
