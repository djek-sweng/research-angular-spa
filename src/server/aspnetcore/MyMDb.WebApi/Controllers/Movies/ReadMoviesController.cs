namespace MyMDb.WebApi.Controllers.Movies;

[Authorize(AuthPolicy.User)]
[ApiController]
[Route("api/movies")]
public class ReadMoviesController : ControllerBase
{
    private readonly ReadMoviesUseCase _readMoviesUseCase;

    public ReadMoviesController(ReadMoviesUseCase readMoviesUseCase)
    {
        _readMoviesUseCase = readMoviesUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> ReadMoviesAsync(CancellationToken cancellationToken)
    {
        var result = new ListDto
        {
            Items = (await _readMoviesUseCase.ExecuteAsync(
                    User.UserId(),
                    cancellationToken))
                .Select(m => m.ToMovieDto())
                .ToList()
        };

        return Ok(result);
    }
}
