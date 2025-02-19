using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Authentication;
using GraduationProjectStore.Service.Abstraction.Security;
using Microsoft.AspNetCore.Mvc;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class AuthenticationController : Base
    {
        private readonly IAuthenticationService _service;
        public AuthenticationController(IAuthenticationService service)
        {
            this._service = service;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO user)
        {
            var result = await _service.RegisterAsync(user);
            return Ok(result);
        }
    }
}
