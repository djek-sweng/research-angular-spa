namespace MyMDb.WebApi.Extensions;

public static class UserExtensions
{
    public static UserDto ToUserDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            UserName = user.UserName,
            NormalizedUserName = user.NormalizedUserName
        };
    }
}
