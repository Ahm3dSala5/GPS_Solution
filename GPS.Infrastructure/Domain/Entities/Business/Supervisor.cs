using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{

    public class Supervisor : TableIdentity 
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Position { set; get; }    
        public string Address { set; get; }
        public DateTime BirthDate { set; get; }
    }
}
