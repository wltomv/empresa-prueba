using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using empresa_api.DTO.Single;
using empresa_api.Services.SalaryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace empresa_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = ("User"))]
    public class SalaryController : ControllerBase
    {
        private ISalaryService salaryService;

        public SalaryController(ISalaryService repo) => salaryService=repo;
        
        [HttpGet("calculations/{employeeId}")]
        public async Task<ActionResult<SalaryCalculation>> getEmployees(int employeeId){
            var calculations = await salaryService.calculations(employeeId);
            
            if(calculations != null) return Ok(calculations);

            return BadRequest();
        }
    }
}