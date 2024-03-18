namespace MyMDb.WebApi.Controllers.Initialisation;

[ApiController]
[Route("api/init")]
public class InitialiseDatabaseController : ControllerBase
{
    private readonly InitialiseRolesUseCase _initialiseRolesUseCase;
    private readonly InitialiseAdminUseCase _initialiseAdminUseCase;
    private readonly AdminReadUsersUseCase _adminReadUsersUseCase;
    private readonly InitialiseMoviesUseCase _initialiseMoviesUseCase;

    public InitialiseDatabaseController(
        InitialiseRolesUseCase initialiseRolesUseCase,
        InitialiseAdminUseCase initialiseAdminUseCase,
        AdminReadUsersUseCase adminReadUsersUseCase,
        InitialiseMoviesUseCase initialiseMoviesUseCase)
    {
        _initialiseRolesUseCase = initialiseRolesUseCase;
        _initialiseAdminUseCase = initialiseAdminUseCase;
        _adminReadUsersUseCase = adminReadUsersUseCase;
        _initialiseMoviesUseCase = initialiseMoviesUseCase;
    }

    [HttpPost]
    [Route("database")]
    public async Task<IActionResult> InitialiseDatabaseAsync(CancellationToken cancellationToken)
    {
        await _initialiseRolesUseCase.ExecuteAsync();
        await _initialiseAdminUseCase.ExecuteAsync();

        var users = await _adminReadUsersUseCase.ExecuteAsync(cancellationToken);

        await _initialiseMoviesUseCase.ExecuteAsync(Guid.Parse(users[0].Id!), cancellationToken);

        return NoContent();
    }
}
