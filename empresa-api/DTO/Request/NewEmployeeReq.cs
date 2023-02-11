using empresa_api.DTO.Entitys;
namespace empresa_api.DTO.Request
{
    public class NewEmployeeReq
    {
        public int Userid { get; set; }
        public EmployeeDTO Employee { get; set; }
    }
}