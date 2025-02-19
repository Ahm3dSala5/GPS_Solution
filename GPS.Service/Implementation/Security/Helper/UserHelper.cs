using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjectStore.Service.Abstraction.Security;
using Microsoft.AspNetCore.Identity;

namespace GraduationProjectStore.Service.Implementation.Business.Helper
{
    public static class UserHelper
    {
        public async static ValueTask<string> GenerateConfirmationCode
            (ApplicationUser user, IMailService mail,UserManager<ApplicationUser> userManager)
        {
            var code = Random.Shared.Next(100000, 999999).ToString();
            var generateResult = await userManager.SetAuthenticationTokenAsync
                (user,"ConfirmationCode","ConfirmationCode",code);

            if (!generateResult.Succeeded)
                return "Invalid Generate Confirmation Code";

            var emailMessage = $@"
                <h1>Hello {user.UserName},</h1>
                <p>Thank you for registering with Graduation Project Store.</p>
                <p>Your verification code is:</p>
                <h2>{code}</h2>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you,<br>Ahmed Salah Team</p>
            ";

            var sendResult = await mail.SendMail(user.Email,"Confirmation Code", emailMessage);
            return sendResult == "Successfully" ? "Please Check on Your Email Notification To Get Confirmation Code"
                : "Invalid Send Verification Code";
        }
    }
}
