using System;
using System.Collections.Generic;

namespace empresa_api.Models
{
    public partial class Employee
    {
        public Employee()
        {
            BonusEmployees = new HashSet<BonusEmployee>();
        }

        public int Id { get; set; }
        public string Dpi { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public int NumberChildren { get; set; }
        public decimal BaseSalary { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Status { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<BonusEmployee> BonusEmployees { get; set; }
    }
}
