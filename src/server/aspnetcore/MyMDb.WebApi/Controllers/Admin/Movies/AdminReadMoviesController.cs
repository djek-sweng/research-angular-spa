namespace MyMDb.WebApi.Controllers.Admin.Movies;

[Authorize(AuthPolicy.Admin)]
[ApiController]
[Route("api/admin/movies")]
public class AdminReadMoviesController : ControllerBase
{
    private readonly AdminReadMoviesUseCase _adminReadMoviesUseCase;

    public AdminReadMoviesController(AdminReadMoviesUseCase adminReadMoviesUseCase)
    {
        _adminReadMoviesUseCase = adminReadMoviesUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> ReadMoviesAsync(CancellationToken cancellationToken)
    {
        var result = new ListDto
        {
            Items = (await _adminReadMoviesUseCase.ExecuteAsync(cancellationToken))
                .Select(m => m.ToMovieDto())
                .ToList()
        };

        return Ok(result);
    }
}
