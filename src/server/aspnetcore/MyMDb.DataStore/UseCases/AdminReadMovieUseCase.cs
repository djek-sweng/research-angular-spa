namespace MyMDb.DataStore.UseCases;

public class AdminReadMovieUseCase
{
    private readonly MovieDbContext _ctx;

    public AdminReadMovieUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public Task<Movie?> ExecuteAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        return _ctx.Movies.FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
    }
}
