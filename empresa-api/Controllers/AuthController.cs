using empresa_api.DTO.Single;
using empresa_api.DTO.Request;
using empresa_api.Services.AuthService;
using empresa_api.utils.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using empresa_api.utils;

namespace empresa_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthService authService;
        

        public AuthController(IAuthService repo, Mailer mailer){
            authService=repo;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> login([FromBody]UserDTO user){
            var jwt = await authService.login(user);
            if(jwt.Equals(string.Empty))return  NotFound("User not found, wrong data");
            return Ok(jwt);
        }

        [HttpPost("registrar")]
        [Authorize(Roles = ("Administrador"))]
        public  ActionResult<String> register([FromBody]UserDTO user){
            string passwordHash = Encrypt.getPasswordHash(user.Password);//
            return Ok(passwordHash);
        }

        [HttpPost("recoveryPassword")]
        public  async Task<ActionResult<String>> recoveryPassword([FromBody]MailReq req){
            var response = await authService.passwordRecovery(req.Mail);
            if (response.Status) return Ok(response.Message);
            return BadRequest(response.Message);
        }

        [HttpPost("recoveryPassword/change")]
        public async Task<ActionResult<String>> changePasswordByLink([FromQuery]string token, [FromBody]PasswordDTO req){
            var response=await authService.changePasswordByLink(token,req.Password);
            if(response.Status) return Ok(response.Message);

            return BadRequest(response.Message);
        }

    }
}