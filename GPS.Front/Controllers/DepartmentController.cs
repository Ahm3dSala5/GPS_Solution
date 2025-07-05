using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Department;
using GraduationProjectStore.Core.Feature.Departments.Command.Request;
using GraduationProjectStore.Core.Feature.Departments.Query.Request;
using GraduationProjectStore.Service.Abstraction.Business;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/department")]
    public class DepartmentController : Base
    {
        private readonly IDepartmentService departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            this.departmentService = departmentService;
        }

        [HttpGet("CreateDept")]
        public IActionResult CreateDept()
        {
            return View();
        }

        public async Task<IActionResult> OpenDepts()
        {
            return View(await departmentService.GetAll());
        }

        [HttpPost("Create")]
        public async Task<IActionResult>Create([FromForm]DepartmentDTO department)
        {
            var createCommand = await Mediator.Send(new CreateDepartmentCommand(department));
            return RedirectToAction("OpenDepts", "Department");
        }

        [HttpGet("Get{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var getOneQuery = await Mediator.Send(new GetDepartmentByIdQuery(id));
            return HandledResult(getOneQuery);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll( )
        {
            var getAllQuery = await Mediator.Send(new GetAllDepartmetsQuery()); 
            return HandledResult(getAllQuery);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm]UpdateDepartmentDTO department)
        {
            var updateCommand = await Mediator.Send(new UpdateDepartmentCommand(department));
            return RedirectToAction("OpenDepts", "Department");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleteCommand = await Mediator.Send(new DeleteDepartmentCommand(id));
            return HandledResult(deleteCommand);
        }

        [HttpGet("EditDept")]
        public async Task<IActionResult> EditDept(int id)
        {
            return View(await departmentService.GetOne(id));
        }
    }
}
