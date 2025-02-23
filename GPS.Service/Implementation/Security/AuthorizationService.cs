using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjectStore.Service.Abstraction.Security;
using Microsoft.AspNetCore.Identity;

namespace GraduationProjectStore.Service.Implementation.Security
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        public AuthorizationService(SignInManager<ApplicationUser> siginInManager) 
        {
            this._signInManager = siginInManager;
        }

        public ValueTask<string> AssignRoleToUserAsync(string username, string rolename)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> CreateRoleAsync(string username)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> RemoveRoleAsync(string roleName)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> RemoveUserFromRole(string username, string rolename)
        {
            throw new NotImplementedException();
        }
    }
}
