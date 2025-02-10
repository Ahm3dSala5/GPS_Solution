using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjectStore.Service.Abstraction.Security;

namespace GraduationProjectStore.Service.Implementation.Business
{
    public class AuthenticationService : IAuthenticationService
    {
        public ValueTask<string> ChangePasswordAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ConfirmForgetPasswordAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ConfirmRegisterAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ForgetPasswordAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> LoginAsync()
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> RegisterAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }
    }
}
