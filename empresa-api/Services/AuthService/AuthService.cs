
using empresa_api.DTO.Single;
using empresa_api.DTO.Request;
using empresa_api.Models;
using empresa_api.utils;
using empresa_api.utils.Mail;
using Microsoft.EntityFrameworkCore;


namespace empresa_api.Services.AuthService
{
    public class AuthService: IAuthService
    {
        private readonly companyContext _context;
        private Mailer _mailer;
        public AuthService(companyContext context, Mailer  mailer){
            _context=context;     
            _mailer = mailer;
        }
        

        public async Task<string> login(UserDTO user){
            var res= await _context.Users.Select(u => new{Id= u.Id,Username = u.Username, Password= u.Password}).FirstOrDefaultAsync(u => u.Username==user.Username);
    
            if (res != null && BCrypt.Net.BCrypt.Verify(user.Password, res.Password)){
                return JWTHandle.generateToken(user, res.Id);
            };
            return string.Empty;
        }

        public async Task<ResponseInfo> passwordRecovery(string email){
            var dbUser = _context.Users.Where(u => u.Email ==email).FirstOrDefault();

            if(dbUser != null){
                string basictoken = Guid.NewGuid().ToString();
                string token = Encrypt.getSHA256(basictoken);

                dbUser.Token_recovery = token;
                _context.Entry(dbUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var link= "http://localhost:3000/access/recovery/?token="+token;

                MailDefinition def = new MailDefinition(){
                    ToEmail =dbUser.Email,
                    Subject ="Recuperación de contraseña",
                    Body = _mailer.fillRecoveryPaswordTemplate(link)
                };
                var res = _mailer.sendMail(def);
                
                return res ? new ResponseInfo(){Status=true, Message="Correo enviado con exito"}: new ResponseInfo(){Status=false, Message="Error al enviar el correo"};
            }

            return new ResponseInfo(){Status=false, Message= "Usuario no encontrado"};
        }

        public async Task<ResponseInfo> changePasswordByLink(string token, string pass){
            try
            {
                if(token== null || token.Trim().Equals("")) throw new CustomError("Token no enviado");
                
                var dbUser = _context.Users.Where(u => u.Token_recovery == token).FirstOrDefault();
                
                if(dbUser == null)  throw new CustomError("Token invalido");
        
                dbUser.Password=Encrypt.getPasswordHash(dbUser.Password);
                dbUser.Token_recovery=null;
                _context.Entry(dbUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return new ResponseInfo(){Status=true, Message= "Contraseña cambiada con exito"};
            }
            catch (Exception ex)
            {
                return new ResponseInfo(){Status=false, Message= ex.Message};
            }
        }
    }
}