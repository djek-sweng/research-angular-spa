namespace MyMDb.WebApi.Extensions;

public static class MovieExtensions
{
    public static MovieDto ToMovieDto(this Movie movie)
    {
        return new MovieDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Rating = movie.Rating,
            ImageUrl = movie.ImageUrl,
            UserId = movie.UserId,
            UpdatedAt = movie.UpdatedAt
        };
    }
}
