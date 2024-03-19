namespace MyMDb.WebApi.Controllers.Movies;

[Authorize(AuthPolicy.User)]
[ApiController]
[Route("api/movies")]
public class CreateMovieController : ControllerBase
{
    private readonly CreateMovieUseCase _createMovieUseCase;

    public CreateMovieController(CreateMovieUseCase createMovieUseCase)
    {
        _createMovieUseCase = createMovieUseCase;
    }

    [HttpPost]
    [Route("create-movie")]
    public async Task<IActionResult> CreateMovieAsync(
        [FromBody] MovieDto movie,
        CancellationToken cancellationToken)
    {
        var result = (await _createMovieUseCase.ExecuteAsync(
                movie.Title,
                movie.Description,
                movie.Rating,
                movie.ImageUrl,
                User.UserId(),
                cancellationToken))
            .ToMovieDto();

        return Ok(result);
    }
}
