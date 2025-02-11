using GraduationProjecrStore.Infrastructure.Domain.DTOs.Supervisor;
using GraduationProjectStore.Core.ResultHandlers;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Project.Command.Request
{
    public class CreateSupervisorCommand : IRequest<Result<string>>
    {
        public CreateSupervisorDTO Supervisor { get; set; }
        public CreateSupervisorCommand(CreateSupervisorDTO supervisor) 
        {
          this.Supervisor = supervisor;
        }
    }
}
