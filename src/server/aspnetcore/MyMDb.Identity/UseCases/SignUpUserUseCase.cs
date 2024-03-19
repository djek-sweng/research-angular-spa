namespace MyMDb.Identity.UseCases;

public class SignUpUserUseCase
{
    private readonly CreateUserUseCase _createUserUseCase;
    private readonly GenerateTokenUseCase _generateTokenUseCase;

    public SignUpUserUseCase(
        CreateUserUseCase createUserUseCase,
        GenerateTokenUseCase generateTokenUseCase)
    {
        _createUserUseCase = createUserUseCase;
        _generateTokenUseCase = generateTokenUseCase;
    }

    public async Task<Token> ExecuteAsync(
        string email,
        string password)
    {
        var user = await _createUserUseCase.ExecuteAsync(email, password);

        return await _generateTokenUseCase.ExecuteAsync(user);
    }
}
