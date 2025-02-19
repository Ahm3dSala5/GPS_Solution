using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjectStore.Core.Feature.Projects.Query.Model;

namespace GraduationProjectStore.Core.Mapping.Projects
{
    public partial class ProjectProfile
    {
        public void GetProjectsQueryMapping()
        {
            CreateMap<ProjectModel, Project>().
               ForMember(x => x.Id, x => x.MapFrom(x => x.Project_Id)).
               ForMember(x => x.SupervisorId, x => x.MapFrom(x => x.Project_SupervisorId)).
               ForMember(x => x.DepartmentId, x => x.MapFrom(x => x.Project_DepartmentId)).
               ForMember(x => x.Description, x => x.MapFrom(x => x.Project_Description)).
               ForMember(x => x.UploadAt, x => x.MapFrom(x => x.Project_UploadAt)).
               ForMember(x => x.ContentType, x => x.MapFrom(x => x.Project_ContentType)).
               ForMember(x => x.Data, x => x.MapFrom(x => x.Project_Data));
        }
    }
}
