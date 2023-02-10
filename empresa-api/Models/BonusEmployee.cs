using System;
using System.Collections.Generic;

namespace empresa_api.Models
{
    public partial class BonusEmployee
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int BonusId { get; set; }

        public virtual Bonus Bonus { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
