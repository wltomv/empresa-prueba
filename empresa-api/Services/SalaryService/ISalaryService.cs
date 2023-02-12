using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using empresa_api.DTO.Single;

namespace empresa_api.Services.SalaryService
{
    public interface ISalaryService
    {
        Task<SalaryCalculation?> calculations(int employeeId);
    }
}