using Dyeing.API.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dyeing.API.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            MemoryCacher memCacher = new MemoryCacher();
            memCacher.Add("userId", "76924", DateTimeOffset.UtcNow.AddHours(12));
            var result = memCacher.GetValue("userId");

            return View();
        }
        
    }
}
