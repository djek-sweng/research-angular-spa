namespace MyMDb.DataStore.Data;

public class MovieDbContext : DbContext
{
    public DbSet<Movie> Movies { get; set; } = null!;

    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }
}
