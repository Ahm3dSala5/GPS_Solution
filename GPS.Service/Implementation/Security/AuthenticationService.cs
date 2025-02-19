using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjectStore.Service.Abstraction.Security;
using GraduationProjectStore.Service.Implementation.Business.Helper;
using GraduationProjectStore.Service.Implementation.Security.Helper;
using Microsoft.AspNetCore.Identity;

namespace GraduationProjectStore.Service.Implementation.Security
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IMailService _mail;
        private readonly UserManager<ApplicationUser> _userManager;
        public AuthenticationService
            (UserManager<ApplicationUser> user, IMailService mail)
        {
            this._userManager = user;
           this._mail = mail;
        }


        public ValueTask<string> ChangePasswordAsync
            (ChangePassowrdDTO changePassword)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ConfirmForgetPasswordAsync(ConfirmForgetPasswordDTO confirmforgetPassword)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ConfirmRegisterAsync(string username, string confirmationCode)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> ForgetPasswordAsync(string username)
        {
            throw new NotImplementedException();
        }

        public ValueTask<string> LoginAsync(LoginDTO user)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<string> RegisterAsync(RegisterDTO user)
        {
            var appUser = new ApplicationUser()
            {
                UserName = user.UserName,
                Address = user.Address,
                PasswordHash = user.Password,
                Email = user.Email
            };

            var createResult = await _userManager.CreateAsync(appUser, user.Password);
            if (!createResult.Succeeded)
                return "Invalid";

            // afterv this pice user created successfully 
            // then we will send confirmation code for user bny using it email
            return await UserHelper.GenerateConfirmationCode(appUser,_mail,_userManager);
        }
    }
}
