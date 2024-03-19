namespace MyMDb.DataStore.UseCases;

public class CreateMovieUseCase
{
    private readonly MovieDbContext _ctx;
    private readonly PreventMovieByNameUseCase _preventMovieByNameUseCase;

    public CreateMovieUseCase(
        MovieDbContext ctx,
        PreventMovieByNameUseCase preventMovieByNameUseCase)
    {
        _ctx = ctx;
        _preventMovieByNameUseCase = preventMovieByNameUseCase;
    }

    public async Task<Movie> ExecuteAsync(
        string title,
        string? description,
        int rating,
        string imageUrl,
        Guid userId,
        CancellationToken cancellationToken)
    {
        await _preventMovieByNameUseCase.ExecuteAsync(Guid.Empty, title, userId, cancellationToken);

        var movie = Movie.Create(title, description, rating, imageUrl, userId);

        _ctx.Movies.Add(movie);

        await _ctx.SaveChangesAsync(cancellationToken);

        return movie;
    }
}
