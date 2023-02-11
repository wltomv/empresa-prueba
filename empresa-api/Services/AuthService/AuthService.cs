
using empresa_api.DTO.Entitys;
using empresa_api.DTO.Request;
using empresa_api.Models;
using empresa_api.utils;
using Microsoft.EntityFrameworkCore;


namespace empresa_api.Services.AuthService
{
    public class AuthService: IAuthService
    {
        private readonly companyContext _context;
        public AuthService(companyContext context) => _context=context;

        public async Task<string> login(UserDTO user){
            var res= await _context.Users.Select(u => new{Id= u.Id,Username = u.Username, Password= u.Password}).FirstOrDefaultAsync(u => u.Username==user.Username);
    
            if (res != null && BCrypt.Net.BCrypt.Verify(user.Password, res.Password)){
                return JWTHandle.generateToken(user, res.Id);
            };
            return string.Empty;
        }
    }
}