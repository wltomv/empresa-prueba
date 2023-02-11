using empresa_api.DTO.Entitys;
using empresa_api.DTO.Request;

namespace empresa_api.Services.EmployeeService
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDTO>?> GetAllEmployees();
        Task<EmployeeDTO?> AddEmployee(NewEmployeeReq req);
        EmployeeDTO GetEmployeeById(int id);
        Task<bool> DeleteEmployee(int id);
        Task<bool> updateEmployee(EmployeeDTO employee);
    }
}