using Dyeing.API.Models;
using Dyeing.API.Models.EnterpriseDataConfiguration.BatchConfiguration;
using Dyeing.API.Models.FabricDataConfiguration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting;
using System.Threading.Tasks;
using System.Web.Http;
using static Dyeing.API.Models.FabricDataConfiguration.FinishFabricInspectionConfigModel;

namespace Dyeing.API.Controllers.FabricDataConfiguration
{
    public class FinishFabricInsTableConfigController : ApiController
    {
        CommonModel.Response _res = new CommonModel.Response();
        [HttpGet]
        public async Task<IHttpActionResult> GetQcMcNo(string userid)
        {
            try
            {
                var queryData = await new FinishFabricInspectionConfigModel().GetQcMcNo(userid);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }
        [HttpGet]

        public IHttpActionResult GetInspectionInfo(string bCodeOrBatchId,int rollId,bool IsWithBarcode) 
        {
            try
            {
                DataTable dt = new DataTable();
                FinishFabricInspectionConfigModel cls = new FinishFabricInspectionConfigModel();
                Wrapper wrapper = new Wrapper();
                IEnumerable<FaultEntityDetail> lFdetail = new FaultEntityDetail[] { new FaultEntityDetail() };
                IEnumerable<FaultPointTemp> pointTemp;
                IEnumerable<FaultEntityDetail> faultTemp;
                wrapper.master = cls.GetBarcodeInfo(bCodeOrBatchId, rollId, IsWithBarcode == true ? 1 : 0);
                wrapper.grade = cls.GetInspectionGrade(IsWithBarcode == true? "barcode" : "", bCodeOrBatchId.ToString());
                pointTemp = cls.GetInspectionPoints();
                int DyedInspectionEntryID = 0;
                foreach (var item in wrapper.master)
                {
                    DyedInspectionEntryID = item.DyedInspectionEntryID;
                }
                faultTemp = cls.GetFaultEntityDetail(DyedInspectionEntryID);
                dt = ConvertToDataTable(pointTemp);
                List<DataTable> result = dt.AsEnumerable()
                  .GroupBy(row => row.Field<Int32>("NameID"))
                  .Select(g => g.CopyToDataTable())
                  .ToList();
                if (faultTemp.Count() > 0)
                {
                    int i = 0;
                    foreach (var lFault in faultTemp)
                    {

                        FaultEntityDetail fault = new FaultEntityDetail();
                        fault.DyedInspectionDetailID = lFault.DyedInspectionDetailID;
                        fault.NameID = lFault.NameID;
                        fault.FaultName = lFault.FaultName;
                        fault.TotalPoint = lFault.TotalPoint;
                        fault.PointData = lFault.PointData;
                        fault.sl = i;
                        foreach (DataTable dtb in result)
                        {
                            if (dtb.Rows[0]["NameID"].ToString() == lFault.NameID.ToString())
                            {
                                IEnumerable<FaultPoint> lPoints = new FaultPoint[] { new FaultPoint() };
                                string PointID = "";
                                for (var j = 0; j < dtb.Rows.Count; j++)
                                {
                                    FaultPoint pointObj = new FaultPoint();
                                    pointObj.PointID = dtb.Rows[j]["PHeadNo"].ToString();
                                    pointObj.PointName = dtb.Rows[j]["FromTo"].ToString();
                                    pointObj.PointValue = dtb.Rows[j]["Point"].ToString();
                                    PointID = pointObj.PointID;
                                    lPoints = lPoints.Concat(new[] { pointObj });
                                }
                                //lPoints.(0);
                                lPoints = lPoints.Where(u => u.PointID != null).ToList();
                                fault.lPoints = lPoints;
                                fault.PointID = PointID;
                                i++;
                                break;
                            }
                        }
                        //lFdetail.ToList().Add(fault);
                        lFdetail = lFdetail.Concat(new[] { fault });

                    }
                }
                lFdetail = lFdetail.Where(u => u.PointID != null).ToList();
                wrapper.fault = lFdetail;
                return Ok(wrapper);

            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }

        public List<InspectionFault> GetFaultObj(Wrapper objLists)
        {
            List<InspectionFault> list = new List<InspectionFault>();

            return list;
        }

        private DataTable ConvertToDataTable(IEnumerable<FaultPointTemp> point)
        {
            var props = typeof(FaultPointTemp).GetProperties();

            var dt = new DataTable();
            dt.Columns.AddRange(
              props.Select(p => new DataColumn(p.Name, p.PropertyType)).ToArray()
            );

            point.ToList().ForEach(
              i => dt.Rows.Add(props.Select(p => p.GetValue(i, null)).ToArray())
            );

            return dt;
        }
        [HttpPost]
        public async Task<IHttpActionResult> SaveUpdate(InspectionMasterSave _obj)
        {
            _res = new CommonModel.Response();
            try
            {
                var queryData = await new FinishFabricInspectionConfigModel().UpdateForQc2(_obj);
               // var queryData =0;
                if (queryData == 0)
                {
                    if (_obj.DyedInspectionEntryID == 0) _res.Msg = "Inspection Data Not Saved....";
                    else _res.Msg = "Inspection Data Not Updated....";
                    return Ok(_res);
                }
                _res.response = true;
                //if (_obj.DyedInspectionEntryID == 0) 
                _res.Msg = "Inspection Data Saved Successfully....";
                //else _res.Msg = "Inspection Data Updated Successfully....";
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.ErrorMsg = ex.Message;
                return Ok(_res);
            }
        }

        [HttpGet]
        public IHttpActionResult GetRollList(string bCodeOrBatchId)
        {
            try
            {
                var queryData = new FinishFabricInspectionConfigModel().GetRollList(bCodeOrBatchId);

                if (queryData == null)
                {
                    return InternalServerError(exception: new ServerException(message: "Database server temporarily unavailable."));
                }

                return Ok(queryData);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception: exception);
            }

        }
    }
}
