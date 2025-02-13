using GraduationProjecrStore.Infrastructure.Domain.DTOs.Supervisors;
using GraduationProjectStore.Core.ResultHandlers;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Supervisors.Command.Request
{
    public class CreateSupervisorCommand : IRequest<Result<string>>
    {
        public CreateSupervisorDTO Supervisor { get; set; }
        public CreateSupervisorCommand(CreateSupervisorDTO supervisor)
        {
            Supervisor = supervisor;
        }
    }
}
