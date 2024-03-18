namespace MyMDb.WebApi.Controllers.Admin.Accounts;

[Authorize(AuthPolicy.Admin)]
[ApiController]
[Route("api/admin/accounts")]
public class AdminReadUsersController : ControllerBase
{
    private readonly AdminReadUsersUseCase _adminReadUsersUseCase;

    public AdminReadUsersController(AdminReadUsersUseCase adminReadUsersUseCase)
    {
        _adminReadUsersUseCase = adminReadUsersUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> ReadUsersAsync(CancellationToken cancellationToken)
    {
        var result = new ListDto
        {
            Items = (await _adminReadUsersUseCase.ExecuteAsync(cancellationToken))
                .Select(u => u.ToUserDto())
                .ToList()
        };

        return Ok(result);
    }
}
