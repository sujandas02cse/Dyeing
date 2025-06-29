using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dyeing.App.Models.UserManagement
{
    public class UserLogin
    {
        //public string UserName { get; set; }
        //public int UserId { get; set; }
        //public string PassWord { get; set; }
        //public string EmpCode { get; set; }
        //public string EmpId { get; set; }
        //public string Email { get; set; }
        //public string AttachFileName { get; set; }
        //public bool IsPermitted { get; set; }

        public string UserName { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public int UserId { get; set; }
        public string PassWord { get; set; }
        public string EmpCode { get; set; }
        public string EmpId { get; set; }
        public string Email { get; set; }
        public string EmpImage { get; set; }
        public byte[] Attachment { get; set; }
        public string AttachFileName { get; set; }
        public bool IsPermitted { get; set; }
    }
}