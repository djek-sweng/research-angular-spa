namespace MyMDb.WebApi.Controllers.Accounts;

[ApiController]
[Route("api/accounts")]
public class SignUpUserController : ControllerBase
{
    private readonly SignUpUserUseCase _signUpUserUseCase;

    public SignUpUserController(SignUpUserUseCase signUpUserUseCase)
    {
        _signUpUserUseCase = signUpUserUseCase;
    }

    [HttpPost]
    [Route("sign-up-user")]
    public async Task<IActionResult> SignUpUserAsync([FromBody] UserCredentialsDto credentials)
    {
        var token = await _signUpUserUseCase.ExecuteAsync(credentials.Email, credentials.Password);

        return Ok(token);
    }
}
