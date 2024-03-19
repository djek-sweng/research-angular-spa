namespace MyMDb.DataStore.Entities;

[EntityTypeConfiguration(typeof(MovieConfiguration))]
public class Movie
{
    public Guid Id { get; private init; }
    public string Title { get; private set; }
    public string? Description { get; private set; }
    public int Rating { get; private set; }
    public string ImageUrl { get; private set; }
    public Guid UserId { get; private init; }
    public DateTime UpdatedAt { get; private set; }

    public const int TitleMaxLength = 400;
    public const int DescriptionMaxLength = 2000;
    public const int ImageUrlMaxLength = 2_083;

    private const int RatingMinValue = 0;
    private const int RatingMaxValue = 5;

    private Movie(
        Guid id,
        string title,
        string? description,
        int rating,
        string imageUrl,
        Guid userId,
        DateTime updatedAt)
    {
        Id = id;
        Title = title;
        Description = description;
        Rating = rating;
        ImageUrl = imageUrl;
        UserId = userId;
        UpdatedAt = updatedAt;
    }

    public static Movie Create(
        string title,
        string? description,
        int rating,
        string imageUrl,
        Guid userId)
    {
        return new Movie(
                Guid.NewGuid(),
                string.Empty,
                null,
                -1,
                string.Empty,
                userId,
                DateTime.MinValue)
            .SetTitle(title)
            .SetDescription(description)
            .SetRating(rating)
            .SetImageUrl(imageUrl)
            .SetUpdatedAtUtcNow();
    }

    public Movie SetTitle(string title)
    {
        Guard.MaxLength(title, TitleMaxLength);

        Title = title;
        return this;
    }

    public Movie SetDescription(string? description)
    {
        Guard.MaxLength(description, DescriptionMaxLength);

        Description = description;
        return this;
    }

    public Movie SetRating(int rating)
    {
        Guard.MinMaxLimit(rating, RatingMinValue, RatingMaxValue);

        Rating = rating;
        return this;
    }

    public Movie SetImageUrl(string imageUrl)
    {
        Guard.MaxLength(imageUrl, ImageUrlMaxLength);

        ImageUrl = imageUrl;
        return this;
    }

    public Movie SetUpdatedAtUtcNow()
    {
        UpdatedAt = DateTime.UtcNow;
        return this;
    }
}
