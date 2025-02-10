using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public class Project : TableIdentity
    {
        public string Description { set; get; }
        public string ContentType { get; set; } 
        public byte[] Data { get; set; }
        public DateTime UploadAt { set; get; }
    }
}
