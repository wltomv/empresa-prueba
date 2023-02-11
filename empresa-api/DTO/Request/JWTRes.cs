using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.DTO.Request
{
    public class JWTRes
    {
        public bool status { get; set; }
        public string jwt { get; set; } = string.Empty;
    }
}