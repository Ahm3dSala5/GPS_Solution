using GraduationProjecrStore.Infrastructure;
using GraduationProjecrStore.Infrastructure.Domain.Entities.Security;
using GraduationProjecrStore.Infrastructure.Persistence.Context;
using GraduationProjectStore.Core;
using GraduationProjectStore.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// register Database
var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<AppDbContext>(option=>option.UseSqlServer(connectionString));


//

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>().
    AddEntityFrameworkStores<AppDbContext>().
    AddDefaultTokenProviders();


// register business modules
builder.Services.AddServiceModules();
builder.Services.AddInfrastructureModules();
builder.Services.AddCoreModules();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
