using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjecrStore.Infrastructure.Persistence.Context;

namespace GraduationProjectStore.InitialData
{
    public static class FillData
    {
        public static void FillStudentData(AppDbContext context)
        {
            for (int i = 0; i < 100; i++)
            {
                var student = new Student()
                {
                    FirstName = StudentData.FNames[Random.Shared.Next(0, 30)],
                    LastName = StudentData.LNames[Random.Shared.Next(0, 30)],
                    Address = StudentData.Addresses[Random.Shared.Next(0, 30)],
                    BirthDate = StudentData.BirthDates[Random.Shared.Next(0, 30)],
                    DepartmentId = Random.Shared.Next(1, 4),
                    SupervisorId = Random.Shared.Next(1, 2),
                    Level = Random.Shared.Next(1, 5),
                    GPA = Math.Round(Random.Shared.NextDouble() * 4, 2)
                };
                context.Students.Add(student);
            }
            var save = context.SaveChanges();
        }
    }
}

