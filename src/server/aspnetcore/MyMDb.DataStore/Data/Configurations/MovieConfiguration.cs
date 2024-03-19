namespace MyMDb.DataStore.Data.Configurations;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.ToTable("_movies");

        builder.HasKey(m => m.Id);

        builder.HasIndex(m => m.UserId);

        builder.Property(m => m.Id)
            .IsRequired();

        builder.Property(m => m.Title)
            .HasMaxLength(Movie.TitleMaxLength)
            .IsRequired();

        builder.Property(m => m.Description)
            .HasMaxLength(Movie.DescriptionMaxLength)
            .IsRequired(false);

        builder.Property(m => m.Rating)
            .IsRequired();

        builder.Property(m => m.ImageUrl)
            .HasMaxLength(Movie.ImageUrlMaxLength)
            .IsRequired();

        builder.Property(m => m.ImageUrl)
            .HasMaxLength(Movie.ImageUrlMaxLength)
            .IsRequired();

        builder.Property(m => m.UserId)
            .IsRequired();

        builder.Property(m => m.UpdatedAt)
            .IsRequired();
    }
}
