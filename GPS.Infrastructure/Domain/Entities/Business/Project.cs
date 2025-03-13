using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public sealed class Project : TableIdentity
    {
        public string Description { set; get; }
        public string ContentType { get; set; }
        public byte[] Data { get; set; }
        public DateTime UploadAt { set; get; }
        public int DepartmentId { set; get; }
        public int SupervisorId { set; get; }
        public Supervisor Supervisor { set; get; }
        public Department Department { set; get; }
        public ICollection<Student> Students { set; get; } = new List<Student>();
    }
}
