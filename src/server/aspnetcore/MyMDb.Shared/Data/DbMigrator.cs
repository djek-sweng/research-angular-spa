namespace MyMDb.Shared.Data;

public class DbMigrator
{
    private readonly IApplicationBuilder _applicationBuilder;

    private DbMigrator(IApplicationBuilder applicationBuilder)
    {
        _applicationBuilder = applicationBuilder;
    }

    public static DbMigrator CreateMigrator(IApplicationBuilder applicationBuilder)
    {
        return new DbMigrator(applicationBuilder);
    }

    public void Migrate<T>()
        where T : DbContext
    {
        using var scope = _applicationBuilder.ApplicationServices.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<T>();

        // context.Database.Migrate();
        // context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
    }
}
