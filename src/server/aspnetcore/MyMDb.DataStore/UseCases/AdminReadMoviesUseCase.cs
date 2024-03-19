namespace MyMDb.DataStore.UseCases;

public class AdminReadMoviesUseCase
{
    private readonly MovieDbContext _ctx;

    public AdminReadMoviesUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public Task<List<Movie>> ExecuteAsync(CancellationToken cancellationToken)
    {
        return _ctx.Movies.ToListAsync(cancellationToken);
    }
}
