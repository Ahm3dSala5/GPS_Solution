using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Supervisor;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Core.Feature.Supervisors.Command.Request;
using GraduationProjectStore.Core.Feature.Supervisors.Query.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/supervisor")]
    public class SupervisorController : Base
    {
        private readonly AppDbContext app;

        public SupervisorController(AppDbContext app)
        {
            this.app = app;
        }

        [HttpGet("OpenSupervisor")]
        public async Task<IActionResult> OpenSupervisor()
        {
            return View(await app.Supervisors.ToListAsync());
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] CreateSupervisorDTO supervisor)
        {
            var createCommand = await Mediator.Send(new CreateSupervisorCommand(supervisor));
            return RedirectToAction("OpenSupervisor", "Supervisor");
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var GetAllSupervisorQuery = await Mediator.Send(new GetAllSupervisorQuery());
            return HandledResult(GetAllSupervisorQuery);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Update(int id)
        {
            var GetOneQuery = await Mediator.Send(new GetSupervisorByIdQuery(id));
            return HandledResult(GetOneQuery);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm] UpdateSupervisorDTO supervisor)
        {
            var updateCommand = await Mediator.Send(new UpdateSupervisorCommand(supervisor));
            return RedirectToAction("OpenSupervisor", "Supervisor");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleteCommand = await Mediator.Send(new DeleteSupervisorCommand(id));
            return HandledResult(deleteCommand);
        }

        [HttpGet("OpenEdit")]
        public async Task<IActionResult> OpenEdit(int id)
        {
            return View(await app.Supervisors.FirstOrDefaultAsync(x => x.Id == id));
        }

        [HttpGet("OpenCreate")]
        public IActionResult OpenCreate()
        {
            return View();
        }
    }
}
