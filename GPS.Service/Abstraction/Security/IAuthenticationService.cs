using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;

namespace GraduationProjectStore.Service.Abstraction.Security
{
    public interface IAuthenticationService
    {
        ValueTask<string> RegisterAsync(RegisterDTO user);
        ValueTask<string> ConfirmRegisterAsync(string username,string confirmationCode);
        ValueTask<string> LoginAsync(LoginDTO user);
        ValueTask<string> ChangePasswordAsync(ChangePassowrdDTO changePassword);
        ValueTask<string> ForgetPasswordAsync(string username);
        ValueTask<string> ConfirmForgetPasswordAsync(ConfirmForgetPasswordDTO confirmforgetPassword);
    }
}
