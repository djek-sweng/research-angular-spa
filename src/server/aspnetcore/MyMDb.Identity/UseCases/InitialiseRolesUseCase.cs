namespace MyMDb.Identity.UseCases;

public class InitialiseRolesUseCase
{
    private readonly RoleService _roleService;

    public InitialiseRolesUseCase(RoleService roleService)
    {
        _roleService = roleService;
    }

    public async Task ExecuteAsync()
    {
        if (false == await _roleService.RoleExistsAsync(Roles.Admin))
        {
            await _roleService.CreateAsync(new IdentityRole(Roles.Admin));
        }

        if (false == await _roleService.RoleExistsAsync(Roles.User))
        {
            await _roleService.CreateAsync(new IdentityRole(Roles.User));
        }
    }
}
