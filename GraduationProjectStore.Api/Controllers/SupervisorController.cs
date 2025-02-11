using Graduation_Project_Store.API.Base;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Supervisor;
using GraduationProjectStore.Core.Feature.Project.Command.Request;
using Microsoft.AspNetCore.Mvc;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/supervisor")]
    public class SupervisorController : MainController
    {
        [HttpPost("Create")]
        public async Task<IActionResult> Create(CreateSupervisorDto supervisor)
        {
            var createCommand = await Mediator.Send(new CreateSupervisorCommand(supervisor));
            return HandledResult(createCommand);    
        }
    }


}
