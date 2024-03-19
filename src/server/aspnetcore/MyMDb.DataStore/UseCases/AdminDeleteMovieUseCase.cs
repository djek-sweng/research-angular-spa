namespace MyMDb.DataStore.UseCases;

public class AdminDeleteMovieUseCase
{
    private readonly MovieDbContext _ctx;
    private readonly AdminReadMovieUseCase _adminReadMovieUseCase;

    public AdminDeleteMovieUseCase(
        MovieDbContext ctx,
        AdminReadMovieUseCase adminReadMovieUseCase)
    {
        _ctx = ctx;
        _adminReadMovieUseCase = adminReadMovieUseCase;
    }

    public async Task ExecuteAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var movie = await _adminReadMovieUseCase.ExecuteAsync(id, cancellationToken);
        if (movie is null)
        {
            throw new NotFoundException("Movie does not exist");
        }

        _ctx.Movies.Remove(movie);

        await _ctx.SaveChangesAsync(cancellationToken);
    }
}
