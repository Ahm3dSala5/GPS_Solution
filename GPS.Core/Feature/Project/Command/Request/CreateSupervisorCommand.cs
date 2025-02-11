using GraduationProjecrStore.Infrastructure.Domain.DTOs.Supervisor;
using GraduationProjectStore.Core.ResultHandlers;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Project.Command.Request
{
    public class CreateSupervisorCommand : IRequest<Result<string>>
    {
        public CreateSupervisorDto Supervisor { get; set; }
        public CreateSupervisorCommand(CreateSupervisorDto supervisor) 
        {
          this.Supervisor = supervisor;
        }
    }
}
