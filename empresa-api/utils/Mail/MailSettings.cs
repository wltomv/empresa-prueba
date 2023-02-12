using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.utils.Mail
{
    public class MailSettings
    {
        public string Mail { get; set; } = string.Empty;
        public string DisplayName { get; set; }=string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Host { get; set; } = string.Empty;
        public string Port { get; set; } = string.Empty;

        public MailSettings(){
            Mail= DotNetEnv.Env.GetString("MAIL_SETTINGS_MAIL");
            DisplayName= DotNetEnv.Env.GetString("MAIL_SETTINGS_DISPLAYNAME");
            Password=DotNetEnv.Env.GetString("MAIL_SETTINGS_PASS");
            Host=DotNetEnv.Env.GetString("MAIL_SETTINGS_HOST");
            Port=DotNetEnv.Env.GetString("MAIL_SETTINGS_PORT");
        }
    }
}