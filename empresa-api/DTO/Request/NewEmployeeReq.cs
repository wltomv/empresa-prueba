using empresa_api.DTO.Single;
namespace empresa_api.DTO.Request
{
    public class NewEmployeeReq
    {
        public int Userid { get; set; }
        public EmployeeDTO? Employee { get; set; } = null!;
    }
}