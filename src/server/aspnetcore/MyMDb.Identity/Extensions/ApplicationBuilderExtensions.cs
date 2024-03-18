namespace MyMDb.Identity.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseMyMDbIdentity(this IApplicationBuilder builder)
    {
        var migrator = DbMigrator.CreateMigrator(builder);

        migrator.Migrate<AccountDbContext>();

        return builder;
    }
}
