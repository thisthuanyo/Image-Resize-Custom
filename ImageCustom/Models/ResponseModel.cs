using System.Collections.Generic;

namespace ImageCustom.Controllers
{
    public class ResponseEmptyModel
    {
        public int status { get; set; }
        public string message { get; set; }
        public ResponseEmptyModel()
        {
            message = string.Empty;
        }
    }
    public class ResponseModel<T> : ResponseEmptyModel
    {
        public T data { get; set; }
    }
    public class ResponseModel : ResponseModel<object> { }
    public class ResponseModels<T> : ResponseModel<List<T>>
    {
        public ResponseModels()
            : base()
        {
            data = new List<T>();
        }
    }
    public class ResponseModels : ResponseModel<List<object>> { }
}