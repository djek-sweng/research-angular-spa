namespace MyMDb.DataStore.UseCases;

public class UpdateMovieUseCase
{
    private readonly MovieDbContext _ctx;
    private readonly PreventMovieByNameUseCase _preventMovieByNameUseCase;
    private readonly ReadMovieUseCase _readMovieUseCase;

    public UpdateMovieUseCase(
        MovieDbContext ctx,
        PreventMovieByNameUseCase preventMovieByNameUseCase,
        ReadMovieUseCase readMovieUseCase)
    {
        _ctx = ctx;
        _preventMovieByNameUseCase = preventMovieByNameUseCase;
        _readMovieUseCase = readMovieUseCase;
    }

    public async Task<Movie> ExecuteAsync(
        Guid id,
        string title,
        string? description,
        int rating,
        string imageUrl,
        Guid userId,
        CancellationToken cancellationToken)
    {
        await _preventMovieByNameUseCase.ExecuteAsync(id, title, userId, cancellationToken);

        var movie = await _readMovieUseCase.ExecuteAsync(id, userId, cancellationToken);
        if (movie is null)
        {
            throw new NotFoundException("Movie does not exist");
        }

        movie.SetTitle(title)
            .SetDescription(description)
            .SetRating(rating)
            .SetImageUrl(imageUrl)
            .SetUpdatedAtUtcNow();

        await _ctx.SaveChangesAsync(cancellationToken);

        return movie;
    }
}
