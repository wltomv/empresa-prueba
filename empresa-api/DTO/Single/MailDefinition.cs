using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.DTO.Single
{
    public class MailDefinition
    {
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; }=string.Empty;
        public string Body { get; set; }= string.Empty;

    }
}