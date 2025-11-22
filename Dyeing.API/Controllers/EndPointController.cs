using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Routing;

namespace Dyeing.API.Controllers
{
    [RoutePrefix("api/endpoint")]
    public class EndPointController : ApiController
    {
        [HttpGet]
        [Route("list")]
        public IHttpActionResult GetEndpoints()
        {
            // 🔹 Base folder where your models are stored
            var projectPath = AppDomain.CurrentDomain.BaseDirectory;
            var modelsFolder = Path.Combine(projectPath, "Models");

            var controllers = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(a => a.GetTypes())
                .Where(t => typeof(ApiController).IsAssignableFrom(t) && !t.IsAbstract)
                .ToList();

            var result = new List<object>();

            foreach (var controller in controllers)
            {
                var methods = controller.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);

                foreach (var method in methods)
                {
                    var httpMethod = GetHttpMethod(method);
                    if (string.IsNullOrEmpty(httpMethod))
                        continue;

                    var route = GetRoute(controller, method);

                    string modelClassName = null;
                    string modelMethodName = null;
                    string storedProcedure = null;

                    // 🔹 Find a model class with a matching method name
                    var modelType = AppDomain.CurrentDomain.GetAssemblies()
                        .SelectMany(a => a.GetTypes())
                        .FirstOrDefault(t => t.GetMethods().Any(m => m.Name == method.Name));

                    if (modelType != null)
                    {
                        modelClassName = modelType.Name;
                        modelMethodName = method.Name;

                        // ✅ Now extract the stored procedure name by reading the .cs file
                        storedProcedure = ExtractStoredProcedureNameFromSource(modelsFolder, modelClassName, modelMethodName);
                    }

                    result.Add(new
                    {
                        Controller = controller.Name.Replace("Controller", ""),
                        Action = method.Name,
                        HttpMethod = httpMethod,
                        Route = route,
                        Model = modelClassName,
                        ModelMethod = modelMethodName,
                        StoredProcedure = storedProcedure
                    });
                }
            }

            return Ok(result);
        }

        // ✅ Detect HTTP method
        private string GetHttpMethod(MethodInfo method)
        {
            if (method.GetCustomAttributes(true).OfType<HttpGetAttribute>().Any()) return "GET";
            if (method.GetCustomAttributes(true).OfType<HttpPostAttribute>().Any()) return "POST";
            if (method.GetCustomAttributes(true).OfType<HttpPutAttribute>().Any()) return "PUT";
            if (method.GetCustomAttributes(true).OfType<HttpDeleteAttribute>().Any()) return "DELETE";
            return null;
        }

        // ✅ Combine [RoutePrefix] and [Route]
        private string GetRoute(Type controller, MethodInfo method)
        {
            var routeAttr = method.GetCustomAttributes(true).OfType<RouteAttribute>().FirstOrDefault();
            var routePrefix = controller.GetCustomAttributes(true).OfType<RoutePrefixAttribute>().FirstOrDefault();

            string route = "";
            if (routePrefix != null)
                route += routePrefix.Prefix;
            if (routeAttr != null)
            {
                if (!string.IsNullOrEmpty(route))
                    route += "/";
                route += routeAttr.Template;
            }

            return route;
        }

        // ✅ Read model file and extract stored procedure name
        private string ExtractStoredProcedureNameFromSource(string modelsFolder, string modelClass, string methodName)
        {
            try
            {
                var files = Directory.GetFiles(modelsFolder, "*.cs", SearchOption.AllDirectories);
                var file = files.FirstOrDefault(f => Path.GetFileNameWithoutExtension(f)
                    .Equals(modelClass, StringComparison.OrdinalIgnoreCase));

                if (file == null) return null;

                var lines = File.ReadAllLines(file);
                bool insideTargetMethod = false;

                foreach (var line in lines)
                {
                    if (line.Contains($"public") && line.Contains(methodName))
                        insideTargetMethod = true;

                    if (insideTargetMethod)
                    {
                        var match = Regex.Match(line, @"storedProcedureName\s*:\s*@?""(\[dbo\]\.\[[^\]]+\])""");
                        if (match.Success)
                            return match.Groups[1].Value;

                        // If method ends
                        if (line.Contains("}"))
                            insideTargetMethod = false;
                    }
                }
            }
            catch
            {
                // ignore
            }

            return null;
        }


    }
}
