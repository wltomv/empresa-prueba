
namespace empresa_api.DTO.Single
{
    public class CustomError: Exception
    {
        public CustomError(string message): base(message){
        }
    }
}