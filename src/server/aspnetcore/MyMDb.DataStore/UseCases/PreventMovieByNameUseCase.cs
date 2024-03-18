namespace MyMDb.DataStore.UseCases;

public class PreventMovieByNameUseCase
{
    private readonly MovieDbContext _ctx;

    public PreventMovieByNameUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task ExecuteAsync(
        Guid id,
        string title,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var movie = await _ctx.Movies.FirstOrDefaultAsync(m =>
            m.Id != id
            && m.Title == title
            && m.UserId == userId, cancellationToken);
        if (movie is not null)
        {
            throw new InvalidParameterException("Movie already exists");
        }
    }
}
