namespace MyMDb.Identity.UseCases;

public class AdminDeleteUserUseCase
{
    private readonly UserService _userService;

    public AdminDeleteUserUseCase(UserService userService)
    {
        _userService = userService;
    }

    public async Task ExecuteAsync(Guid userId, Guid adminId)
    {
        if (userId == adminId)
        {
            throw new InvalidParameterException("Not allowed to delete user.");
        }

        var user = await _userService.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            throw new NotFoundException("User does not exist.");
        }

        await _userService.DeleteAsync(user);
    }
}
