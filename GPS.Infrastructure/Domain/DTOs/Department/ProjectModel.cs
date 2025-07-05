using Microsoft.AspNetCore.Http;

namespace GraduationProjecrStore.Infrastructure.Domain.DTOs.Department
{
    public class ProjectModel
    {
        public string Name { set; get;}
        public string Description { set; get; }
        public string SupervisorName { set; get; }
        public string DepartmentName { set; get; }
        public DateTime UploadAt { set; get; }
        public int Year { set; get; }
        public IFormFile PFile { set; get; }
    }
}
