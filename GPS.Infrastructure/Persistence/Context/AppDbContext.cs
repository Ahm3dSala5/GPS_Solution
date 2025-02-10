using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace GraduationProjecrStore.Infrastructure.Persistence.Context
{
    public class AppDbContext : IdentityDbContext
    {
        public DbSet<Department> Departments { set; get; }  
        public DbSet<Project> Projects { set; get; }
        public DbSet<Student> Students { set; get; }
        public DbSet<Supervisor> Supervisors { set; get; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }

   
}
