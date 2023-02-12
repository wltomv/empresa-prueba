using empresa_api.Constants;
using empresa_api.DTO.Single;
using empresa_api.Models;

namespace empresa_api.Services.SalaryService
{
    public class SalaryService: ISalaryService
    {

        private readonly companyContext _context;

        public SalaryService(companyContext context) => _context=context;

        public async Task<SalaryCalculation?> calculations(int employeeId){
            var dbEmployee = await _context.Employees.FindAsync(employeeId);            
            
            if(dbEmployee == null) return null;

            var decreeBonus =  _context.Bonus.FirstOrDefault( b => b.BonusName=="Decreto");
            var paternityBonus =  _context.Bonus.FirstOrDefault( b => b.BonusName=="Paternidad");

            if(decreeBonus ==null || paternityBonus ==null) return null;

            decimal iggs = (dbEmployee.BaseSalary* SalaryConstants.IGSS);
            decimal irtra = dbEmployee.BaseSalary * SalaryConstants.IRTRA;

            decimal paternityBonusValue = dbEmployee.NumberChildren * paternityBonus.Amount;
            decimal totalSalary = dbEmployee.BaseSalary + paternityBonusValue + decreeBonus.Amount;

            var netSalary = totalSalary - iggs - irtra;

            SalaryCalculation calculations = new SalaryCalculation(){
                Iggs=decimal.Round((iggs),2),
                Irtra=decimal.Round(irtra,2),
                PaternityBonus=decimal.Round(paternityBonusValue,2),
                TotalSalary=decimal.Round(totalSalary,2),
                NetSalary=decimal.Round(netSalary,2)
            };

            return calculations;
        }
    }
}