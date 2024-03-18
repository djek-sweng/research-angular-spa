namespace MyMDb.DataStore.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyMDbDataStore(this IServiceCollection services)
    {
        services.AddDbContext<MovieDbContext>(ExecuteOptionsBuilder);

        services.AddScoped<InitialiseMoviesUseCase>();

        services.AddScoped<AdminReadMovieUseCase>();
        services.AddScoped<AdminReadMoviesUseCase>();
        services.AddScoped<AdminDeleteMovieUseCase>();

        services.AddScoped<CreateMovieUseCase>();
        services.AddScoped<ReadMovieUseCase>();
        services.AddScoped<ReadMoviesUseCase>();
        services.AddScoped<UpdateMovieUseCase>();
        services.AddScoped<DeleteMovieUseCase>();

        services.AddScoped<PreventMovieByNameUseCase>();

        return services;
    }

    private static void ExecuteOptionsBuilder(DbContextOptionsBuilder builder)
    {
        var dataSource = Path.Combine(Environment.CurrentDirectory, "db_movie.sqlite");
        var connectionString = $"Data Source={dataSource}";

        builder.UseSqlite(connectionString,
            options => options.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
    }
}
