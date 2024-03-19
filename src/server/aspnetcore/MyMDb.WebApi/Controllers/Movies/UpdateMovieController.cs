namespace MyMDb.WebApi.Controllers.Movies;

[Authorize(AuthPolicy.User)]
[ApiController]
[Route("api/movies")]
public class UpdateMovieController : ControllerBase
{
    private readonly UpdateMovieUseCase _updateMovieUseCase;

    public UpdateMovieController(UpdateMovieUseCase updateMovieUseCase)
    {
        _updateMovieUseCase = updateMovieUseCase;
    }

    [HttpPost]
    [Route("update-movie")]
    public async Task<IActionResult> UpdateMovieAsync(
        [FromBody] MovieDto movie,
        CancellationToken cancellationToken)
    {
        var result = (await _updateMovieUseCase.ExecuteAsync(
                movie.Id_NotNull(),
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
