using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace empresa_api.DTO.Single
{
    public class SalaryCalculation
    {
        public decimal Iggs { get; set; }
        public decimal Irtra { get; set; }
        public decimal DecreeBonus {get; set;}
        public decimal PaternityBonus { get; set; }
        public decimal TotalSalary { get; set; }
        public decimal NetSalary { get; set; }
    }
}