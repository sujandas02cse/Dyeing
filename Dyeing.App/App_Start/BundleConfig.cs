using System;
using System.Web;
using System.Web.Optimization;

namespace Dyeing.App
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            //// Use the development version of Modernizr to develop with and learn from. Then, when you're
            //// ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));

            string bInf = DateTime.Now.ToString("yyMMddHHmmss");
            //bundles.Add(new ScriptBundle("~/Content/angular/Controller").Include(
            //          "~/Content/angular/Controller/BasicDataConfiguration/MachineDataConfiguration/*.js?"+ bInf+"",
            //          "~/Content/angular/Controller/MachineDataConfiguration/*.js?"+ bInf+"",
            //          "~/Content/angular/Controller/BroadcastManagement/BasicBroadcast/*.js?"+ bInf+""
            //          ));
            //bundles.Add(new ScriptBundle("~/Content/angular/Factory").Include(
            //         "~/Content/angular/Factory/BasicDataConfiguration/MachineDataConfiguration/*.js?" + bInf+"",
            //         "~/Content/angular/Factory/MachineDataConfiguration/*.js?"+ bInf+"",
            //         "~/Content/angular/Factory/BroadcastManagement/BasicBroadcast/*.js?"+ bInf+""DyeingBatchConfiguration
            //         ));
            bundles.Add(new ScriptBundle("~/App/Scripts/Controller").Include(
                      "~/App/Scripts/Controller/BasicDataConfiguration/MachineDataConfiguration/*.js",
                      "~/App/Scripts/Controller/MachineDataConfiguration/*.js",
                      "~/App/Scripts/Controller/BroadcastManagement/BasicBroadcast/*.js",
                      "~/App/Scripts/Controller/BroadcastManagement/QCManagement/*.js",
                       "~/App/Scripts/Controller/BroadcastManagement/FabricManagement/*.js",
                      "~/App/Scripts/Controller/BasicDataConfiguration/OperationDataConfiguration/*.js",
                      "~/App/Scripts/Controller/BasicDataConfiguration/ProductionPlanConfiguration/*.js",
                      "~/App/Scripts/Controller/BasicDataConfiguration/DyeingBatchConfiguration/*.js",
                      "~/App/Scripts/Controller/EnterpriseDataConfiguration/ProductionPlanConfiguration/*.js",
                      "~/App/Scripts/Controller/EnterpriseDataConfiguration/BatchConfiguration/*.js",
                      "~/App/Scripts/Controller/EnterpriseDataConfiguration/ApprovalManagement/*.js",
                       "~/App/Scripts/Controller/BasicDataConfiguration/InspectionConfiguration/*.js",
                       "~/App/Scripts/Controller/FabricDataConfiguration/*.js",
                       "~/App/Scripts/Controller/Home/*.js",
                       "~/App/Scripts/Controller/FabricDataConfiguration/InventoryOperation/*.js",
                      "~/App/Scripts/Controller/DashboardManagement/*.js",
                      "~/App/Scripts/Controller/DashboardManagement/DataRelatedDashboard/*.js",
                      "~/App/Scripts/Controller/EnterpriseDataConfiguration/PlanManagement/*.js"
                      ));
            bundles.Add(new ScriptBundle("~/App/Scripts/Factory").Include(
                     "~/App/Scripts/Factory/BasicDataConfiguration/MachineDataConfiguration/*.js",
                     "~/App/Scripts/Factory/MachineDataConfiguration/*.js",
                     "~/App/Scripts/Factory/BroadcastManagement/BasicBroadcast/*.js",
                     "~/App/Scripts/Factory/BroadcastManagement/QCManagement/*.js",
                     "~/App/Scripts/Factory/BroadcastManagement/FabricManagement/*.js",
                     "~/App/Scripts/Factory/BasicDataConfiguration/OperationDataConfiguration/*.js",
                     "~/App/Scripts/Factory/BasicDataConfiguration/ProductionPlanConfiguration/*.js",
                     "~/App/Scripts/Factory/BasicDataConfiguration/DyeingBatchConfiguration/*.js",
                     "~/App/Scripts/Factory/EnterpriseDataConfiguration/ProductionPlanConfiguration/*.js",
                     "~/App/Scripts/Factory/EnterpriseDataConfiguration/ApprovalManagement/*.js",
                     "~/App/Scripts/Factory/EnterpriseDataConfiguration/BatchConfiguration/*.js",
                     "~/App/Scripts/Factory/BasicDataConfiguration/InspectionConfiguration/*.js",
                     "~/App/Scripts/Factory/FabricDataConfiguration/*.js",
                     "~/App/Scripts/Factory/Home/*.js",
                     "~/App/Scripts/Factory/FabricDataConfiguration/InventoryOperation/*.js",
                     "~/App/Scripts/Factory/DashboardManagement/*.js",
                     "~/App/Scripts/Factory/DashboardManagement/DataRelatedDashboard/*.js",
                      "~/App/Scripts/Factory/EnterpriseDataConfiguration/PlanManagement/*.js"
                     ));
            BundleTable.EnableOptimizations = false;
        }
    }
}
