using GraduationProjectStore.Service.Abstraction.Business;

namespace GraduationProjectStore.Service.UnitOfWorks
{
    public interface IUnitOfWork : IDisposable
    {
         IDepartmentService DepartmentService { get; }
         IStudentService StudentService { get; }
         IProjectService ProjectService { get; }
         ISupervisorService SupervisorService { get; }
        Task<int> SaveChanges();
    }
}
