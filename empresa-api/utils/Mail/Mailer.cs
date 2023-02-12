using System.Net;
using System.Net.Mail;
using System.Text;
using empresa_api.DTO.Single;
namespace empresa_api.utils.Mail
{
    public  class Mailer
    {
        private MailSettings _mailSettings;
        public Mailer(MailSettings mailSettings) => _mailSettings=mailSettings;

        public  bool sendMail(MailDefinition mailRequest){
            try{
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(_mailSettings.Mail, _mailSettings.DisplayName);
                mail.To.Add(mailRequest.ToEmail);

                mail.Subject= mailRequest.Subject;
                mail.Body= mailRequest.Body;
                mail.IsBodyHtml = true;


                SmtpClient client = new SmtpClient(_mailSettings.Host, Convert.ToInt16(_mailSettings.Port));
                client.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
                client.EnableSsl = true;
                client.Send(mail);
                return true;
            }
            catch(Exception){
                return false;
            }
        }

        public string fillRecoveryPaswordTemplate(string enlace){
            //TODO  change the code, use an external template in html format
            string template=@"
                    <p>
                        Ha solicitado de recuperación de contraseña, haga clic en el botón de abajo
                    </p>
                    <a href='[enlace]' style = 'padding: 10px; background-color: bisque; text-decoration: none; color: black;'>Cambiar contraseña</a>
                <div style= 'padding-top: 20px;'>
                    <span style='font-size: 16px\'
                        >Si el botón de cambiar contraseña no funciona por favor
                        copia y pega el siguiente enlace en tu navegador</span
                    >
                    <span style='font-size: 11px; color: blue'> [enlace] </span>
                </div>
            ";
            StringBuilder templateWithData = new StringBuilder(template);
            templateWithData.Replace("[enlace]",enlace);
            return templateWithData.ToString();
        }
    }

}