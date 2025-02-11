using GraduationProjecrStore.Infrastructure.Domain.DTOs;
using GraduationProjectStore.Core.ResultHandlers;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Departments.Command.Request
{
    public class UpdateDepartmentCommand : IRequest<Result<string>>
    {
        public UpdateDepartmentCommand(UpdateDepartmentDTO createDepartmentDto)
        {
            Department = createDepartmentDto;
        }
        public UpdateDepartmentDTO Department { get; set; }
    }
}
