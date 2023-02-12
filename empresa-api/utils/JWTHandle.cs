using empresa_api.DTO.Single;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace empresa_api.utils
{
    public static class JWTHandle
    {
        public static string generateToken(UserDTO user, int userId)
            {
                var key=DotNetEnv.Env.GetString("KEY");
                var issuer=DotNetEnv.Env.GetString("ISSUER");
                var audience=DotNetEnv.Env.GetString("AUDIENCE"); 
                var jwtMinutes=DotNetEnv.Env.GetString("JWTEXPIRATIONMINUTS");


                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim("id", Convert.ToString(userId)),
                    new Claim(ClaimTypes.NameIdentifier, user.Username),
                    new Claim(ClaimTypes.Role, "User"),
                };

                var token = new JwtSecurityToken(
                    issuer,
                    audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToInt16(jwtMinutes)),
                    signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }   
    }
}