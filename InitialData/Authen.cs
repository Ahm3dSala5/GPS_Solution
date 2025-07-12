using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjectStore.Service.Implementation.Security;

namespace GraduationProjectStore.InitialData
{
    public class Authen
    {
        private readonly AuthenticationService authenticationService;
        private readonly AuthorizationService authorizationService;
        public Authen(AuthenticationService authenticationService, AuthorizationService authorizationService)
        {
            this.authenticationService = authenticationService;
            this.authorizationService = authorizationService;
        }

        public async Task RegisterWithAdmin(RegisterDTO user)
        {
            await authenticationService.RegisterAsync(user);

            var _user = await authenticationService.GetUserByNameAsync(user.UserName);
            await authorizationService.CreateRoleAsync("Admin");
            await authorizationService.AssignRoleToUserAsync(_user.UserName, "Admin");
        }

        public async Task RegisterWithStudent(RegisterDTO user)
        {
            await authenticationService.RegisterAsync(user);

            var _user = await authenticationService.GetUserByNameAsync(user.UserName);
            await authorizationService.CreateRoleAsync("Student");
            await authorizationService.AssignRoleToUserAsync(_user.UserName, "Student");
        }
    }
}

