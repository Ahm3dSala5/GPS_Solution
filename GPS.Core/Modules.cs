using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace GraduationProjectStore.Core
{
    public static class Modules
    {
        public static void AddCoreModules(this IServiceCollection service)
        {
            service.Configure<IdentityOptions>
            (
                options => 
                {
                    options.Password.RequiredLength = 8;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                }
            );
        }
    }
}
