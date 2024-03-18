namespace MyMDb.WebApi.Controllers.Admin.Movies;

[Authorize(AuthPolicy.Admin)]
[ApiController]
[Route("api/admin/movies")]
public class AdminUpdateMovieController : ControllerBase
{
    private readonly UpdateMovieUseCase _updateMovieUseCase;

    public AdminUpdateMovieController(UpdateMovieUseCase updateMovieUseCase)
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
                movie.UserId_NotNull(),
                cancellationToken))
            .ToMovieDto();

        return Ok(result);
    }
}
