using System;
using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Service.Abstraction.Security;
using GraduationProjectStore.Service.Implementation.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace GraduationProjectStore.InitialData
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var services = new ServiceCollection();

            services.AddLogging();

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer("Server=DESKTOP-UFQ365U\\SQLEXPRESS;Database=GraduationProjectStore;Integrated Security=SSPI;TrustServerCertificate=True;"));

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();


            var serviceProvider = services.BuildServiceProvider();

            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            FillData.FillCollegeData(context);
            FillData.FillDepartmentData(context);
            FillData.FillSupervisor(context);
            FillData.FillStudentData(context);
            FillData.FillProjectData(context);

            await RegisterAdminAsync(scope);
            await RegisterStudentRole(scope);
        }

        private static async Task RegisterAdminAsync(IServiceScope scope)
        {
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var signInManager = scope.ServiceProvider.GetRequiredService<SignInManager<ApplicationUser>>();

            var adminUser = new ApplicationUser()
            {
                UserName = "Ahmed_Salah",
                Address = "Cairo, Egypt",
                Email = "ahmed557slah@gmail.com"
            };

            await userManager.CreateAsync(adminUser,"Aa123456#");
            var role = new ApplicationRole()
            {
                Name = "Admin"
            };

            await roleManager.CreateAsync(role);
            await userManager.AddToRoleAsync(adminUser, role.Name);

        }

        private static async Task RegisterStudentRole(IServiceScope scope)
        {
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var signInManager = scope.ServiceProvider.GetRequiredService<SignInManager<ApplicationUser>>();

            var studentUser = new ApplicationUser()
            {
                UserName = "Esraa_Mohamed",
                Address = "Cairo, Egypt",
                Email = "ayadesraa535@gmail.com"
            };

            await userManager.CreateAsync(studentUser, "Aa123456#");
            var role = new ApplicationRole()
            {
                Name = "Student"
            };

            await roleManager.CreateAsync(role);
            await userManager.AddToRoleAsync(studentUser, role.Name);
        }
    }
}
