using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public class Student : TableIdentity
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Address { set; get; }
        public DateTime BirthDate { set; get; }
        public double GPA { set; get; }
        public int Level { set; get; }
    }
}
