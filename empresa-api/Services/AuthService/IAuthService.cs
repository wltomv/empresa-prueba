using empresa_api.DTO.Single;
using empresa_api.DTO.Request;

namespace empresa_api.Services.AuthService
{
    public interface IAuthService
    {
        Task<string> login(UserDTO user);
        Task<ResponseInfo> passwordRecovery(string email);
        Task<ResponseInfo> changePasswordByLink(string token, string pass);
    }
}