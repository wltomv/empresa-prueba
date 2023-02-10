using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace empresa_api.Models
{
    
    [Table("Bonus")]
    public partial class Bonus
    {
        public Bonus()
        {
            BonusEmployees = new HashSet<BonusEmployee>();
        }

        public int Id { get; set; }
        public string BonusName { get; set; } = null!;
        public decimal Amount { get; set; }

        public virtual ICollection<BonusEmployee> BonusEmployees { get; set; }
    }
}
