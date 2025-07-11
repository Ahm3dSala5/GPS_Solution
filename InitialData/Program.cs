using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjecrStore.Infrastructure.Persistence.Context;

namespace GraduationProjectStore.InitialData
{
    public class App
    {
        static void Main()
        {

            var context = new AppDbContext();
            FillData.FillCollegeData(context);
            FillData.FillDepartmentData(context);
            FillData.FillSupervisor(context);
            FillData.FillStudentData(context);
            FillData.FillProjectData(context);
        }
    }
}

