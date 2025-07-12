using Graduation_Project_Store.API.Bases;
using GraduationProjecrStore.Infrastructure.Domain.DTOs.Department;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Core.Feature.Projects;
using GraduationProjectStore.Core.Feature.Projects.Command.Request;
using GraduationProjectStore.Core.Feature.Projects.Query.Request;
using GraduationProjectStore.Service.Abstraction.Business;
using GraduationProjectStore.Service.Implementation.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Graduation_Project_Store.API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProjectController : Base
    {
        private readonly IProjectService projectService;
        private readonly AppDbContext _context;

        public ProjectController(IProjectService projectService, AppDbContext context)
        {
            this.projectService = projectService;
            _context = context;
        }

        public IActionResult PaginateAll(
        [FromQuery] string? search,
        [FromQuery] string? department,
        [FromQuery] string? year,
        [FromQuery] string? college)

        {
            var projects = _context.Projects
                .Include(p => p.Department)
                .Include(p => p.Supervisor)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
                projects = projects.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

            if (!string.IsNullOrEmpty(department))
                projects = projects.Where(p => p.Department.Name == department);

            if (!string.IsNullOrEmpty(year))
                projects = projects.Where(p => p.UploadAt.Year.ToString() == year);

            if (!string.IsNullOrEmpty(college))
                projects = projects.Where(p => p.College.Name == college); // Make sure `College` exists

            // Populate dropdown lists
            ViewBag.Departments = _context.Departments
                .Select(d => new SelectListItem { Value = d.Name, Text = d.Name })
                .ToList();

            ViewBag.Years = _context.Projects
                .Select(p => p.UploadAt.Year.ToString())
                .Distinct()
                .OrderBy(y => y)
                .Select(y => new SelectListItem { Value = y, Text = y })
                .ToList();

            ViewBag.Colleges = _context.Colleges
                .Select(p => p.Name)
                .Distinct()
                .Where(c => c != null)
                .Select(c => new SelectListItem { Value = c, Text = c })
                .ToList();

            var projectList = projects.Include(x=>x.Supervisor).ToList().Select(p => new ProjectModel
            {
                Id = p.Id,
                Name = p.Name,
                DepartmentName = p.Department.Name,
                SupervisorName = $"{p.Supervisor.FirstName} {p.Supervisor.LastName}",
                Year = p.UploadAt.Year,
                Description = p.Description,
                UploadAt = p.UploadAt,
            });

            return View(projectList);
        }


        [HttpGet("Get/ById")]
        public async Task<IActionResult> Get(int id)
        {
            var getCommand = await Mediator.Send(new GetProjectByIdQuery(id));
            return HandledResult(getCommand);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm]Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
            return RedirectToAction("PaginateAll", "Project");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleteCommand = await Mediator.Send(new DeleteProjectCommand(id));
            return HandledResult(deleteCommand);
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Upload([FromForm]CreateProjectDTO _project)
        {
            using var reader = new StreamReader(_project.projectFile.OpenReadStream());
            string content = await reader.ReadToEndAsync();

            var Project = new Project()
            {
                Name = _project.Name,
                FileName = _project.projectFile.FileName,
                ContentType = content,
                UploadAt = DateTime.UtcNow,
                SupervisorId = _project.SupervisorId,
                CollegeId = _project.CollegeId,
                Description = _project.Description,
                DepartmentId = _project.DepartmentId
            };

            await projectService.CreateAsync(Project);
            return RedirectToAction("PaginateAll", "Project");
        }

        [HttpGet("EditProj/{id}")]
        public async Task<IActionResult> EditProj(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();

            ViewBag.Departments = _context.Departments
                .Select(d => new SelectListItem { Value = d.Id.ToString(), Text = d.Name })
                .ToList();

            ViewBag.Supervisors = _context.Supervisors
                .Select(s => new SelectListItem { Value = s.Id.ToString(), Text = $"{s.FirstName} {s.LastName}" })
                .ToList();

            ViewBag.Colleges = _context.Colleges
                .Select(c => new SelectListItem { Value = c.Id.ToString(), Text = c.Name })
                .ToList();

            return View(project);
        }
    }
}
