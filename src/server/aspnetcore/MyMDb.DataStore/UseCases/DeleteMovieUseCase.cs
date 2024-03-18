namespace MyMDb.DataStore.UseCases;

public class DeleteMovieUseCase
{
    private readonly MovieDbContext _ctx;
    private readonly ReadMovieUseCase _readMovieUseCase;

    public DeleteMovieUseCase(
        MovieDbContext ctx,
        ReadMovieUseCase readMovieUseCase)
    {
        _ctx = ctx;
        _readMovieUseCase = readMovieUseCase;
    }

    public async Task ExecuteAsync(
        Guid id,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var movie = await _readMovieUseCase.ExecuteAsync(id, userId, cancellationToken);
        if (movie is null)
        {
            throw new NotFoundException("Movie does not exist");
        }

        _ctx.Movies.Remove(movie);

        await _ctx.SaveChangesAsync(cancellationToken);
    }
}
