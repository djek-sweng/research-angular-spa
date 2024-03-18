namespace MyMDb.DataStore.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseMyMDbDataStore(this IApplicationBuilder builder)
    {
        var migrator = DbMigrator.CreateMigrator(builder);

        migrator.Migrate<MovieDbContext>();

        return builder;
    }
}
