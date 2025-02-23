using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjectStore.Core.Feature.Projects;
using GraduationProjectStore.Core.Feature.Projects.Command.Request;

namespace GraduationProjectStore.Core.Mapping.Projects
{
    public partial class ProjectProfile
    {
        //public void CreateProjectCommandMapping()
        //{
        //    CreateMap<Project, CreateProjectDTO>().
        //        ForMember(x => x.SupervisorId, x => x.MapFrom(x => x.SupervisorId)).
        //        ForMember(x => x.DepartmentId, x => x.MapFrom(x => x.DepartmentId)).
        //        ForMember(x => x.Description, x => x.MapFrom(x => x.Description)).
        //        ForMember(x => x.UploadAt, x => x.MapFrom(x => x.UploadAt)).
        //        ForMember(x => x.projectFile.FileName, x => x.MapFrom(x => x.Name)).
        //        ForMember(x => x.projectFile.ContentType, x => x.MapFrom(x => x.ContentType));
        //}

        //public void UpdateProjectCommandMapping()
        //{
        //    CreateMap<Project, UpdateProjectDTO>().
        //       ForMember(x => x.Id, x => x.MapFrom(x => x.Id)).
        //       ForMember(x => x.SupervisorId, x => x.MapFrom(x => x.SupervisorId)).
        //       ForMember(x => x.DepartmentId, x => x.MapFrom(x => x.DepartmentId)).
        //       ForMember(x => x.Description, x => x.MapFrom(x => x.Description)).
        //       ForMember(x => x.UploadAt, x => x.MapFrom(x => x.UploadAt)).
        //       ForMember(x => x.projectFile.FileName, x => x.MapFrom(x => x.Name)).
        //       ForMember(x => x.projectFile.ContentType, x => x.MapFrom(x => x.ContentType));
        //}
    }
}
