using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.Services.MailService
{
    public interface IMailService
    {
        Task SendEmailAsync(string mailRequest);
    }
}