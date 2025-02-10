using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;

namespace GraduationProjectStore.Service.Abstraction.Security
{
    public interface IAuthenticationService
    {
        ValueTask<string> RegisterAsync(ApplicationUser user);
        ValueTask<string> ConfirmRegisterAsync();
        ValueTask<string> LoginAsync();
        ValueTask<string> ChangePasswordAsync();
        ValueTask<string> ForgetPasswordAsync();
        ValueTask<string> ConfirmForgetPasswordAsync();
    }
}
