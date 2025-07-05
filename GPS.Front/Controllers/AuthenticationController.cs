using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjectStore.Core.Feature.Authentications.Command.Request;
using GraduationProjectStore.Core.Feature.Authentications.Query.Request;
using GraduationProjectStore.Service.Abstraction.Security;
using Microsoft.AspNetCore.Mvc;

namespace Graduation_Project_Store.API.Controllers
{
    public class AuthenticationController : Base
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromForm] RegisterDTO user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var registerCommand = await Mediator.Send(new RegisterUserCommand(user));
            return RedirectToAction("ConfirmRegister", "Home");
        }

        [HttpPost("Confirm-Registration")]
        public async Task<IActionResult> ConfirmRegistration([FromForm] string username, [FromForm] string confirmationcode)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var confirmregisterCommand = await Mediator.Send(new ConfirmRegisterationCommand(username, confirmationcode));
            return RedirectToAction("Index", "Home");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromForm]LoginDTO user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var loginCommand = await Mediator.Send(new LoginUserCommand(user));
            return RedirectToAction("Index", "Home");
        }

        [HttpPost("Forgot-Password-Request")]
        public async Task<IActionResult> ForgetPasswordRequest(string username)
        {
            var forgotRequest = await Mediator.Send(new ForgotPasswordCommand(username));
            return HandledResult(forgotRequest);
        }

        [HttpGet("Get/{username}")]
        public async Task<IActionResult> GetOne(string username)
        {
            var getbyUsernameQuery = await Mediator.Send(new GetUserByUsernameQuery(username));
            return HandledResult(getbyUsernameQuery);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var getAllQuery = await Mediator.Send(new GetAllUserQuery());
            return HandledResult(getAllQuery);
        }

        [HttpPut("Forgot-Password-Confirm")]
        public async Task<IActionResult> ForgetPasswordConfirm(ConfirmForgotPasswordDTO username)
        {
            var confirmforgotRequest = await Mediator.Send(new ConfirmForgotpasswordCommand(username));
            return HandledResult(confirmforgotRequest);
        }

        [HttpPut("Change-Password")]
        public async Task<IActionResult> ChnagePassword(ChangePassowrdDTO changePassword)
        {
            var changePasswordCommand = await Mediator.Send(new ChangePasswordCommand(changePassword));
            return HandledResult(changePasswordCommand);
        }

        [HttpDelete("Delete/{username}")]
        public async Task<IActionResult> ChnagePassword(string username)
        {
            var deleteUserCommand = await Mediator.Send(new DeleteUserCommand(username));
            return HandledResult(deleteUserCommand);
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await authenticationService.Logout();
            return RedirectToAction("Index", "Home");
        }
    }
}
