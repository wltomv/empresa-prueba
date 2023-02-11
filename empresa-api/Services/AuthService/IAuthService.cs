using empresa_api.DTO.Entitys;

namespace empresa_api.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> login(UserDTO user);
    }
}