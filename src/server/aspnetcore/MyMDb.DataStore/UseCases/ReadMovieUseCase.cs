namespace MyMDb.DataStore.UseCases;

public class ReadMovieUseCase
{
    private readonly MovieDbContext _ctx;

    public ReadMovieUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public Task<Movie?> ExecuteAsync(
        Guid id,
        Guid userId,
        CancellationToken cancellationToken)
    {
        return _ctx.Movies.FirstOrDefaultAsync(m =>
            m.Id == id
            && m.UserId == userId, cancellationToken);
    }
}
