namespace MyMDb.WebApi.Controllers.Movies;

[Authorize(AuthPolicy.User)]
[ApiController]
[Route("api/movies")]
public class DeleteMovieController : ControllerBase
{
    private readonly DeleteMovieUseCase _deleteMovieUseCase;

    public DeleteMovieController(DeleteMovieUseCase deleteMovieUseCase)
    {
        _deleteMovieUseCase = deleteMovieUseCase;
    }

    [HttpDelete("{movieId}")]
    public async Task<IActionResult> DeleteMovieAsync(
        [FromRoute] Guid movieId,
        CancellationToken cancellationToken)
    {
        await _deleteMovieUseCase.ExecuteAsync(
            movieId,
            User.UserId(),
            cancellationToken);

        return NoContent();
    }
}
