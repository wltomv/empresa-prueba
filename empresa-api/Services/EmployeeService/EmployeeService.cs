using empresa_api.DTO.Single;
using empresa_api.DTO.Request;
using empresa_api.Models;
using Microsoft.EntityFrameworkCore;

static class BonusConstants{
    public const int FIXEDBONUSID = 1; 
    public const int PATERNITYBONUSID = 2; 
}

namespace empresa_api.Services.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly companyContext _context;
        public EmployeeService(companyContext context) => _context=context;
        public async Task<EmployeeDTO?> AddEmployee(NewEmployeeReq req)
        {
            using(var dbContextTransaction = _context.Database.BeginTransaction()){
                try{
                    var newEmployee = new Employee(){
                    Dpi = req.Employee.Dpi,
                    FullName = req.Employee.FullName,
                    NumberChildren= req.Employee.NumberChildren,
                    BaseSalary = req.Employee.BaseSalary,
                    UserId = req.Userid,
                    CreatedAt  = DateTime.Now,
                    Status = true
                    };

                    await _context.AddAsync(newEmployee);
                    await _context.SaveChangesAsync();

                    
                    await _context.BonusEmployees.AddAsync(new BonusEmployee(){BonusId=BonusConstants.FIXEDBONUSID, EmployeeId = newEmployee.Id });
                    await _context.SaveChangesAsync();

                    if(req.Employee.NumberChildren > 0){
                        await _context.BonusEmployees.AddAsync(new BonusEmployee(){BonusId=BonusConstants.PATERNITYBONUSID, EmployeeId = newEmployee.Id });
                        await _context.SaveChangesAsync();
                    }

                    dbContextTransaction.Commit();
                    
                    req.Employee.Id=newEmployee.Id;
                    return req.Employee;
                }
                catch(Exception){
                    dbContextTransaction.Rollback();
                    return null;
                }
            }
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var updateEmployee= _context.Employees.FirstOrDefault( x => x.Id==id);

            if(updateEmployee != null){
                updateEmployee.Status=false;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> updateEmployee(EmployeeDTO employee){
            var dbEmployee = await _context.Employees.FindAsync(employee.Id);
            
            if(dbEmployee ==null){
                return false;
            }

            dbEmployee.FullName=employee.FullName;
            dbEmployee.Dpi= employee.Dpi;
            dbEmployee.NumberChildren=employee.NumberChildren;
            dbEmployee.BaseSalary= employee.BaseSalary;
            
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EmployeeDTO>?> GetAllEmployees()
        {
            return  await _context.Employees.Where(x => x.Status==true ).Select( x => new EmployeeDTO{Id= x.Id, Dpi=x.Dpi, FullName=x.FullName, NumberChildren= x.NumberChildren, BaseSalary= x.BaseSalary }).ToListAsync();
        }

        public async Task<EmployeeDTO?> GetEmployeeById(int id)
        {
            return await _context.Employees.Select(e => new EmployeeDTO{Id=e.Id,Dpi=e.Dpi,FullName = e.FullName, NumberChildren= e.NumberChildren, BaseSalary= e.BaseSalary}).FirstOrDefaultAsync(e => e.Id==id);
        }
    }
}