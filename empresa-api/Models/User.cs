using System;
using System.Collections.Generic;

namespace empresa_api.Models
{
    public partial class User
    {
        public User()
        {
            Employees = new HashSet<Employee>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime BirthDate { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
