namespace MyMDb.DataStore.UseCases;

public class ReadMoviesUseCase
{
    private readonly MovieDbContext _ctx;

    public ReadMoviesUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public Task<List<Movie>> ExecuteAsync(
        Guid userId,
        CancellationToken cancellationToken)
    {
        return _ctx.Movies.Where(m => m.UserId == userId).ToListAsync(cancellationToken);
    }
}
