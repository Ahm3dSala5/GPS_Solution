using AutoMapper;
using GraduationProjectStore.Core.Feature.Students.Query.Model;
using GraduationProjectStore.Core.Feature.Students.Query.Request;
using GraduationProjectStore.Core.ResultHandlers;
using GraduationProjectStore.Service.UnitOfWorks;
using MediatR;

namespace GraduationProjectStore.Core.Feature.Students.Query.Handler
{
    public class StudentQueryHandler :
        ResultHandler,
        IRequestHandler<GetAllStudentQuery, Result<ICollection<StudentModel>>> ,
        IRequestHandler<GetStudentByIdQuery, Result<StudentModel>> 
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _service;
        public StudentQueryHandler(IUnitOfWork service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public Task<Result<ICollection<StudentModel>>> Handle
            (GetAllStudentQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Result<StudentModel>> Handle
            (GetStudentByIdQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
