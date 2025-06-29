using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dyeing.App.Model.MenuOperation
{
    public class ListOfMenus
    {
        public int ManuId { get; set; }
        public int MainModuleId { get; set; }
        public string ManuName { get; set; }
        public string PageFolder { get; set; }
        public string PageName { get; set; }
        public string PageURL { get; set; }
        public int ManuTypeId { get; set; }
        public int ManuStepId { get; set; }
        public int ParantManuId { get; set; }
        public bool IsActive { get; set; }
        public int Priority { get; set; }
        public bool IsOutline { get; set; }
    }
    public class MainMenuOperation : ListOfMenus
    {
        public int MenuId { get; set; }
        //public string ManuName { get; set; }
        public byte[] ImgFile { get; set; }
        public List<ChildMenuName> ChildMenuNameList { get; set; }
        //public List<ChildChildMenuName> ChildChildMenuNameList { get; set; }
    }
    public class ChildMenuName
    {
        public int MenuIdChild { get; set; }
        public string ManuName_Child { get; set; }
        public string PageFolder { get; set; }
        public string PageName { get; set; }
        public List<ChildChildMenuName> ChildChildMenuNameList { get; set; }
    }
    public class ChildChildMenuName
    {
        public int MenuIdChildChild { get; set; }
        public string ManuName_ChildChild { get; set; }
        public string PageFolder { get; set; }
        public string PageName { get; set; }
        public List<ChildChildChildMenuName> ChildChildChildMenuNameList { get; set; }
    }
    public class ChildChildChildMenuName
    {
        public int MenuIdChildChildChild { get; set; }
        public string ManuName_ChildChildChild { get; set; }
        public string PageFolder { get; set; }
        public string PageName { get; set; }
    }
}
