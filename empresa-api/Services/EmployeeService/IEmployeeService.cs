using empresa_api.DTO.Single;
using empresa_api.DTO.Request;

namespace empresa_api.Services.EmployeeService
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDTO>?> GetAllEmployees();
        Task<EmployeeDTO?> AddEmployee(NewEmployeeReq req, int userid);
        Task<EmployeeDTO?> GetEmployeeById(int id);
        Task<bool> DeleteEmployee(int id);
        Task<bool> updateEmployee(EmployeeDTO employee);
    }
}