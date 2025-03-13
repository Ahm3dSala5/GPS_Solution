using Graduation_Project_Store.API.Bases;
using GraduationProjectStore.Core.Feature.Projects;
using GraduationProjectStore.Core.Feature.Projects.Command.Request;
using GraduationProjectStore.Core.Feature.Projects.Query.Request;
using Microsoft.AspNetCore.Mvc;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/project")]
    public class ProjectController : Base
    {
        [HttpPost("Create")]
        public async Task<IActionResult> Create(CreateProjectDTO project)
        {
            var createCommand = await Mediator.Send(new CreateProjectCommand(project));
            return HandledResult(createCommand);
        }

        [HttpGet("Get/ById")]
        public async Task<IActionResult> Get(int id)
        {
            var getCommand = await Mediator.Send(new GetProjectByIdQuery(id));
            return HandledResult(getCommand);
        }

        [HttpGet("Get/ByYear")]
        public async Task<IActionResult> GetByYear(int Year)
        {
            var getByYear = await Mediator.Send(new GetProjectByYearQuery(Year));
            return HandledResult(getByYear);
        }

        [HttpGet("Get/ByDepartment")]
        public async Task<IActionResult> GetByDepartment(int id)
        {
            var getBydepartment = await Mediator.Send(new GetProjectByDepartmentQuery(id));
            return HandledResult(getBydepartment);
        }

        [HttpGet("Get/BySupervisor")]
        public async Task<IActionResult> GetBySupervisor(int id)
        {
            var getBysupervisor = await Mediator.Send(new GetProjectBySupervisorQuery(id));
            return HandledResult(getBysupervisor);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var getAllCommand = await Mediator.Send(new GetAllProjectQuery());
            return HandledResult(getAllCommand);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(UpdateProjectDTO project)
        {
            var updateCommand = await Mediator.Send(new UpdateProjectCommand(project));
            return HandledResult(updateCommand);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleteCommand = await Mediator.Send(new DeleteProjectCommand(id));
            return HandledResult(deleteCommand);
        }
    }
}
