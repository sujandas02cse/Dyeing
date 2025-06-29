using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Dyeing.API.App_Start
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class CorsPolicyAttribute : Attribute, ICorsPolicyProvider
    {
        private readonly CorsPolicy _corsPolicy;

        public CorsPolicyAttribute()
        {
            _corsPolicy = new CorsPolicy()
            {
                AllowAnyHeader = true,
                AllowAnyMethod = false,
                AllowAnyOrigin = false,               
                Methods = { "get", "post" },
                Origins =
                {
                     "http://203.202.252.126:86",
                     "https://mis-dyeing.mascoknit.com",                     
                     "http://192.168.50.60:86",
                     "https://192.168.50.61",
                     "http://localhost:34592",
                     "http://localhost:8081/"

                }
            };
        }
        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            return Task.FromResult(_corsPolicy);
        }
    }
}