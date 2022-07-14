using ImageCustom.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ImageCustom.Controllers
{
    public class HomeController : Controller
    {
        protected ContentResult Content(object content)
        {
            return Content(JsonConvert.SerializeObject(content), "application/json", Encoding.UTF8);
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        //[HttpPost]
        //public ActionResult Index(List<HttpPostedFileBase> FileData)
        //{
        //    string path = Server.MapPath("~/Uploads/");
        //    foreach (HttpPostedFileBase postedFile in FileData)
        //    {
        //        if (postedFile != null)
        //        {
        //            string fileName = Path.GetFileName(postedFile.FileName);
        //            postedFile.SaveAs(path + fileName);
        //        }
        //    }

        //    return View();
        //}
        [HttpPost]
        public ContentResult UploadFiles(ImageHandleRequest req)
        {
            var res = new ResponseEmptyModel();
            try
            {
                var a = Imager.Base64ToImage(req.Images[0]);
                var i = 0;
                foreach(var item in req.Images)
                {
                    string imgPath = Server.MapPath("~/Uploads/last_img_"+ i++ +".jpg");
                    Image img = Imager.Base64ToImage(item);
                    img.Save(imgPath);
                }
            }
            catch (Exception ex)
            {
                res.status = -1;
                res.message = ex.Message;
            }
            return Content(res);
        }

    }
}