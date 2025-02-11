using AutoMapper;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjectStore.Core.Feature.Project.Command.Request;
using GraduationProjectStore.Core.ResultHandlers;
using GraduationProjectStore.Service.Implementation.Security;
using GraduationProjectStore.Service.UnitOfWorks;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Project.Command.Handler
{
    public class SupervisorCommandHandler
        : ResultHandler,
        IRequestHandler<CreateSupervisorCommand, Result<string>>
    {
        private readonly IUnitOfWork _service;
        private readonly IMapper _mapper;

        public SupervisorCommandHandler(IUnitOfWork service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
        }
        public async Task<Result<string>> Handle
            (CreateSupervisorCommand request, CancellationToken cancellationToken)
        {
            if (request == null)
                return BadRequest<string>(_message:"Invalid Supervisor Date");

            var supervisorMapped = _mapper.Map<Supervisor>(request.Supervisor);
            var createResult = await _service.SupervisorService.CreateAsync(supervisorMapped);

            return createResult == "Successfully" ? Created<string>(_message: "Created Successfully")
                :BadRequest<string>(_message:"Invalid");
        }


    }
}
