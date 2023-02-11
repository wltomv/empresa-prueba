using empresa_api.DTO.Entitys;
using empresa_api.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace empresa_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthService authService;

        public AuthController(IAuthService repo) => authService=repo;

        [HttpPost("login")]
        public async Task<ActionResult<string>> login([FromBody]UserDTO user){
            var jwt = await authService.login(user);
            if(jwt.Equals(string.Empty))return  NotFound("User not found, wrong data");
            return Ok(jwt);
        }

        [HttpPost("registrar")]
        [Authorize(Roles = ("Administrador"))]
        public  ActionResult<String> register([FromBody]UserDTO user){
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);//
            return Ok(passwordHash);
        }
    }
}