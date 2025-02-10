using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Security
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string Address { set; get; }
    }
}
