using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;
using Microsoft.AspNetCore.Http;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public class Project : TableIdentity
    {
        public string Description { set; get; }
        public IFormFile file { set; get; }
        public DateTime UploadAt { set; get; }
    }
}
