namespace MyMDb.DataStore.UseCases;

public class InitialiseMoviesUseCase
{
    private readonly MovieDbContext _ctx;

    public InitialiseMoviesUseCase(MovieDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task ExecuteAsync(
        Guid userId,
        CancellationToken cancellationToken)
    {
        if (_ctx.Movies.Any())
        {
            return;
        }

        const string imageUrl = "https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg";

        _ctx.Movies.AddRange(
            Movie.Create(
                title: "Tatort",
                description: "Tatort is ARD's cult crime series. Here fans can find previews of new cases and reruns, plus videos and information about the commissioners.",
                rating: 5,
                imageUrl: imageUrl,
                userId: userId),
            Movie.Create(
                title: "Polizeiruf",
                description: "Polizeiruf 110 is a German-language crime film series, which was produced since 1971 in the German Television (DFF; 1972-1990: Television of the GDR) and continued after the dissolution of the DFF from 1993 by various ARD stations.",
                rating: 4,
                imageUrl: imageUrl,
                userId: userId)
        );

        await _ctx.SaveChangesAsync(cancellationToken);
    }
}
