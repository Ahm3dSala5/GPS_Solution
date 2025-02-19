using GraduationProjectStore.Service.Abstraction.Security;

namespace GraduationProjectStore.Service.Implementation.Security
{
    public class AuthorizationService : IAuthorizationService
    {
        public ValueTask<string> AssignRoleToUserAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> CreateRoleAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> RemoveUserFromRole()
        {
            throw new NotImplementedException();
        }
    }
}
