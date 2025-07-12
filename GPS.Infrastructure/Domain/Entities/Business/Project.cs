﻿using GraduationProjecrStore.Infrastructure.Domain.Entities.Business.Common;

namespace GraduationProjecrStore.Infrastructure.Domain.Entities.Business
{
    public sealed class Project : TableIdentity
    {
        public string ?Description { set; get; }
        public string ?ContentType { get; set; }
        public string ?FileName { get; set; }
        public DateTime UploadAt { set; get; }
        public int ?DepartmentId { set; get; }
        public int ?SupervisorId { set; get; }
        public Supervisor ?Supervisor { set; get; }
        public Department ?Department { set; get; }
        public College ?College { set; get; }
        public int ?CollegeId { set; get; }
        public ICollection<Student> Students { set; get; } = new List<Student>();
    }
}
