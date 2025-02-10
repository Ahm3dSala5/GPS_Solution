using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public class Department : TableIdentity
    {
         public string Manager { set; get; }

    }
}
