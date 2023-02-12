using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.DTO.Single
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Dpi { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public int NumberChildren { get; set; }
        public decimal BaseSalary { get; set; }
    }
}