namespace MyMDb.Identity.UseCases;

public class SignInUserUseCase
{
    private readonly UserService _userService;
    private readonly GenerateTokenUseCase _generateTokenUseCase;

    public SignInUserUseCase(
        UserService userService,
        GenerateTokenUseCase generateTokenUseCase)
    {
        _userService = userService;
        _generateTokenUseCase = generateTokenUseCase;
    }

    public async Task<Token> ExecuteAsync(
        string email,
        string password)
    {
        var user = await _userService.FindByEmailAsync(email);

        if (user is null)
        {
            throw new UnauthorizedException("Invalid username or password");
        }

        if (false == await _userService.CheckPasswordAsync(user, password))
        {
            throw new UnauthorizedException("Invalid username or password");
        }

        return await _generateTokenUseCase.ExecuteAsync(user);
    }
}
