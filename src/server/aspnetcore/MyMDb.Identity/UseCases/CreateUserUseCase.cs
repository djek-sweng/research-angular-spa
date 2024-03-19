namespace MyMDb.Identity.UseCases;

public class CreateUserUseCase
{
    private readonly UserService _userService;

    public CreateUserUseCase(UserService userService)
    {
        _userService = userService;
    }

    public async Task<IdentityUser> ExecuteAsync(
        string email,
        string password)
    {
        var user = await _userService.FindByEmailAsync(email);

        if (user is not null)
        {
            throw new InvalidParameterException("User already exists");
        }

        user = new IdentityUser
        {
            Email = email,
            UserName = email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userService.CreateAsync(user, password);

        if (false == result.Succeeded)
        {
            throw new InvalidResultException("Creating user failed");
        }

        result = await _userService.AddToRoleAsync(user, Roles.User);

        if (false == result.Succeeded)
        {
            throw new InvalidResultException("Adding user role failed");
        }

        return user;
    }
}
