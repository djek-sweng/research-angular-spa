namespace MyMDb.Identity.UseCases;

public class InitialiseAdminUseCase
{
    private readonly CreateUserUseCase _createUserUseCase;
    private readonly UserService _userService;

    public InitialiseAdminUseCase(
        CreateUserUseCase createUserUseCase,
        UserService userService)
    {
        _createUserUseCase = createUserUseCase;
        _userService = userService;
    }

    public async Task ExecuteAsync()
    {
        const string email = "admin@example.com";
        const string password = "pasSworD";

        var user = await _userService.FindByEmailAsync(email);

        if (user is not null)
        {
            return;
        }

        user = await _createUserUseCase.ExecuteAsync(email, password);

        var result = await _userService.AddToRoleAsync(user, Roles.Admin);

        if (false == result.Succeeded)
        {
            throw new InvalidResultException("Adding user to role failed");
        }
    }
}
