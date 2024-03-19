namespace MyMDb.WebApi.Controllers.Admin.Accounts;

[Authorize(AuthPolicy.Admin)]
[ApiController]
[Route("api/admin/accounts")]
public class AdminDeleteUserController : ControllerBase
{
    private readonly AdminDeleteUserUseCase _adminDeleteUserUseCase;

    public AdminDeleteUserController(AdminDeleteUserUseCase adminDeleteUserUseCase)
    {
        _adminDeleteUserUseCase = adminDeleteUserUseCase;
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUserAsync([FromRoute] Guid userId)
    {
        await _adminDeleteUserUseCase.ExecuteAsync(userId, adminId: User.UserId());

        return NoContent();
    }
}
