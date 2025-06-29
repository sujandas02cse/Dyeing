using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace RDLC
{
    public class PrintRDLC
    {
        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        public Stream Export(LocalReport rpt, string filePath)
        {         

            byte[] bytes = rpt.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);
            FileStream stream = File.OpenWrite(filePath);            
            stream.Write(bytes, 0, bytes.Length);

            return stream;
        }
        public void Export_Server(ServerReport rpt, string filePath)
        {            
            byte[] bytes = rpt.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);
            using (FileStream stream = File.OpenWrite(filePath))
            {
                stream.Write(bytes, 0, bytes.Length);
            }
           // return stream;
        }
        
        public byte[] Export(string Format,LocalReport rpt)
        {          
            //byte[] bytes = rpt.Render(Format, null, out mimeType, out encoding, out extension, out streamids, out warnings);              
            return rpt.Render(Format, null, out mimeType, out encoding, out extension, out streamids, out warnings); 
        }     
        
    }
}