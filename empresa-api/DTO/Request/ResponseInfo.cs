using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.DTO.Request
{
    public class ResponseInfo
    {
        public bool Status { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}