namespace MyMDb.WebApi.Dtos;

public class MovieDto
{
    public Guid? Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required(ErrorMessage = "Rating is required")]
    public int Rating { get; set; }

    [Required(ErrorMessage = "ImageUrl is required")]
    public string ImageUrl { get; set; } = string.Empty;

    public Guid? UserId { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid Id_NotNull()
    {
        return Id ?? throw new NullReferenceException($"{nameof(Id)} must not be null");
    }

    public Guid UserId_NotNull()
    {
        return UserId ?? throw new NullReferenceException($"{nameof(UserId)} must not be null");
    }
}
