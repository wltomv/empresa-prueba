using empresa_api.DTO.Single;
using empresa_api.DTO.Request;
using empresa_api.Services.EmployeeService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace empresa_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = ("User"))]
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
            var identity= HttpContext.User.Identity as ClaimsIdentity;


            if(identity!=null){
                var id = identity.Claims.FirstOrDefault(o => o.Type=="id")?.Value;
                var newEmployee= await employeeService.AddEmployee(employee, Convert.ToInt16(id));
                if(newEmployee!=null) return Ok(newEmployee);
            }
            return BadRequest();
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

    // private string getUser(){
    //     var identity= HttpContext.User.Identity as ClaimsIdentity;
    //     return "";
    // }
}