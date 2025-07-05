using System;
using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Student;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Core.Feature.Students.Command.Requsst;
using GraduationProjectStore.Core.Feature.Students.Query.Request;
using GraduationProjectStore.Service.Abstraction.Business;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Graduation_Project_Store.API.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : Base
    {
        private readonly AppDbContext AppDbContext;

        public StudentController(AppDbContext appDbContext) 
        {
            this.AppDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> OpenStudents()
        {
            return View(await AppDbContext.Students.Include(x=>x.Department).Include(x=>x.Project).ToListAsync());
        }

        [HttpGet("OpemCreate")]
        public  IActionResult OpenCreate()
        {
            return View();
        }

        [HttpGet("OpenEdit")]
        public async Task<IActionResult> OpenEdit(int id )
        {
            var student = await AppDbContext.Students.FirstOrDefaultAsync(x => x.Id == id);
            return View(student);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm]CreateStudentDTO student)
        {
            var createCommand = await Mediator.Send(new CreateStudentCommand(student));
            return RedirectToAction("OpenStudents","Student");

        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var getCommand = await Mediator.Send(new GetStudentByIdQuery(id));
            return HandledResult(getCommand);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var getAllCommand = await Mediator.Send(new GetAllStudentQuery());
            return HandledResult(getAllCommand);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm]UpdateStudentDTO student)
        {
            var updateCommand = await Mediator.Send(new UpdateStudentCommand(student));
            return RedirectToAction("OpenStudents", "Student");
        }

        [HttpDelete("Delete/{id}")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var deleteCommand = await Mediator.Send(new DeleteStudentCommand(id));
            return Ok();
        }
    }
}
