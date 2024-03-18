namespace MyMDb.WebApi.Controllers.Admin.Movies;

[Authorize(AuthPolicy.Admin)]
[ApiController]
[Route("api/admin/movies")]
public class AdminDeleteMovieController : ControllerBase
{
    private readonly AdminDeleteMovieUseCase _adminDeleteMovieUseCase;

    public AdminDeleteMovieController(AdminDeleteMovieUseCase adminDeleteMovieUseCase)
    {
        _adminDeleteMovieUseCase = adminDeleteMovieUseCase;
    }

    [HttpDelete("{movieId}")]
    public async Task<IActionResult> DeleteMovieAsync(
        [FromRoute] Guid movieId,
        CancellationToken cancellationToken)
    {
        await _adminDeleteMovieUseCase.ExecuteAsync(
            movieId,
            cancellationToken);

        return NoContent();
    }
}
