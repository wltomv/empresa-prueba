using empresa_api.DTO.Entitys;
using empresa_api.DTO.Request;
using empresa_api.Services.EmployeeService;
using Microsoft.AspNetCore.Mvc;

namespace empresa_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService employeeService;

        public  EmployeeController(IEmployeeService repo) => employeeService=repo;

        [HttpGet]
        public async Task<ActionResult<List<EmployeeDTO>>> getEmployees(){
            var employees = await employeeService.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{employeeId}")]
        public async Task<ActionResult<EmployeeDTO>> getEmployeeById(int employeeId){
            var employee = await employeeService.GetEmployeeById(employeeId);

            if(employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeDTO>> addEmployee([FromBody]NewEmployeeReq employee){
            var newEmployee= await employeeService.AddEmployee(employee);
            if(newEmployee==null) return BadRequest();
            return Ok(newEmployee);
        }

        [HttpPut]
        public async Task<ActionResult<bool>> updateEmployee([FromBody] EmployeeDTO employee){
            var res = await employeeService.updateEmployee(employee);

            if(res) return Ok();

            return NotFound();
        }    

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> deleteEmployee(int id){
            var res = await employeeService.DeleteEmployee(id);
            if(res) return Ok();
            return NotFound();
        }
    }
}