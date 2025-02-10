namespace GraduationProjectStore.Service.Abstraction.Security
{
    public interface IAuthorizationService
    {
        ValueTask<string> CreateRoleAsync();
        ValueTask<string> AssignRoleToUserAsync();
        ValueTask<string> RemoveUserFromRole();
    }
}
