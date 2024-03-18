namespace MyMDb.Identity.UseCases;

public class AdminReadUsersUseCase
{
    private readonly UserService _userService;

    public AdminReadUsersUseCase(UserService userService)
    {
        _userService = userService;
    }

    public async Task<List<User>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var users = await _userService.Users.ToListAsync(cancellationToken);

        return users.Select(u =>
                new User
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    NormalizedUserName = u.NormalizedUserName
                })
            .ToList();
    }
}
