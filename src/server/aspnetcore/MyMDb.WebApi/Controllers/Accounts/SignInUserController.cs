namespace MyMDb.WebApi.Controllers.Accounts;

[ApiController]
[Route("api/accounts")]
public class SignInUserController : ControllerBase
{
    private readonly SignInUserUseCase _signInUserUseCase;

    public SignInUserController(SignInUserUseCase signInUserUseCase)
    {
        _signInUserUseCase = signInUserUseCase;
    }

    [HttpPost]
    [Route("sign-in-user")]
    public async Task<IActionResult> SignInUserAsync([FromBody] UserCredentialsDto credentials)
    {
        var token = await _signInUserUseCase.ExecuteAsync(credentials.Email, credentials.Password);

        return Ok(token);
    }
}
