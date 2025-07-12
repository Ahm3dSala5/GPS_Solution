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
                    SupervisorId = Random.Shared.Next(1, 4),
                    Level = Random.Shared.Next(1, 5),
                    GPA = Math.Round(Random.Shared.NextDouble() * 4, 2)
                };
                context.Students.Add(student);
            }
            var save = context.SaveChanges();
        }

        public static void FillProjectData(AppDbContext context)
        {

            for (int i = 0; i <= 300; i++)
            {
                var project = new Project()
                {
                    Name = ProjectData.Data()[Random.Shared.Next(0, 49)].Name,
                    Description = ProjectData.Data()[Random.Shared.Next(0, 49)].Description,
                    SupervisorId = Random.Shared.Next(1, 2),
                    DepartmentId = Random.Shared.Next(1, 4),
                    CollegeId = Random.Shared.Next(1, 4),
                    UploadAt = DateTime.Now.AddYears(Random.Shared.Next(0,10)),
                };
                context.Projects.Add(project);
            }
            var save = context.SaveChanges();
        }

        public static void FillCollegeData(AppDbContext context)
        {
            var Names = new List<string>()
            {
                "Engineering",
                "Computer Science",
                "Science"
            };
            for (int i =0;i<=2; i++)
            {
                var college = new College()
                {
                    Name = Names[i],
                };
                context.Colleges.Add(college);
            }

            context.SaveChanges();
        }

        public static void FillDepartmentData(AppDbContext context)
        {
            var Names = new List<string>()
            {
                "CS",
                "IT",
                "DS",
                "IS"
            };

            var Managers = new List<string>()
            {
                "Nabil Mustafa",
                "Eslam Samy",
                "Amr Mustafa",
                "El Mahdy"
            };

            for (int i = 0; i <= 3; i++)
            {
                var department = new Department()
                {
                    Name = Names[i],
                    Manager = Managers[Random.Shared.Next(1, 3)]
                };
                context.Departments.Add(department);
            }
            context.SaveChanges();
        }

        public static void FillSupervisor(AppDbContext context)
        {
            var firstNames = new[] { "Ahmed", "Sara", "John", "Lina", "Mark", "Fatima" };
            var lastNames = new[] { "Salah", "Ibrahim", "Smith", "Brown", "Ali", "Kamal" };
            var positions = new[] { "Developer", "Designer", "Manager", "Analyst" };
            var addresses = new[] { "Cairo", "Alexandria", "Giza", "Mansoura", "Tanta" };

            var random = new Random();
            var supervisor = new List<Supervisor>();

            for (int i = 0; i < 4; i++)
            {

                supervisor.Add(new Supervisor
                {
                    FirstName = firstNames[random.Next(firstNames.Length)],
                    LastName = lastNames[random.Next(lastNames.Length)],
                    Position = positions[random.Next(positions.Length)],
                    Address = addresses[random.Next(addresses.Length)],
                    BirthDate = DateTime.Now,
                    DepartmentId = random.Next(1, 4),
                });
                context.Supervisors.Add(supervisor[i]);
            }
            context.SaveChanges();
        }
    }
}

