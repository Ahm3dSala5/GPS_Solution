using GraduationProjecrStore.Infrastructure;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Core;
using GraduationProjectStore.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
// add database
var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<AppDbContext>(option => option.UseSqlServer(connectionString));

// add identity

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>().
    AddEntityFrameworkStores<AppDbContext>().
    AddDefaultTokenProviders();

// add business modules
builder.Services.AddServiceModules();
builder.Services.AddInfrastructureModules();
builder.Services.AddCoreModules();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
