using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ImageCustom.Models
{
    public class ImageHandleRequest
    {
        public int Width { get; set; }
        public int Heigth { get; set; }
        public List<dynamic> Images { get; set; }
    }
}