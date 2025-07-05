using System.Diagnostics;
using GPS.Front.Models;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Business;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace GPS.Front.Controllers
{
    public class HomeController : Controller
    {
        private AppDbContext app;

        public HomeController(AppDbContext app)
        {
            this.app = app;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpGet]
        public IActionResult About()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Contact()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Project()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> NewIdea()
        {
            var colleges = await app.Colleges.ToListAsync();
            var departments = await app.Departments.ToListAsync();
            var supervisors = await app.Supervisors.ToListAsync();

            ViewBag.Colleges = new SelectList(colleges, "Id", "Name");
            ViewBag.Departments = new SelectList(departments, "Id", "Name");
            ViewBag.Supervisors = new SelectList(supervisors, "Id", "FirstName","LastName"); // أو Name حسب جدولك

            return View();
        }


        [HttpGet]
        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult ChangePassword()
        {
            return View();
        }
        
        public IActionResult ConfirmRegister()
        {
            return View();
        }
    }
}
