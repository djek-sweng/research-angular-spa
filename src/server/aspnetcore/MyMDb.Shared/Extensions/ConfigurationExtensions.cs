namespace MyMDb.Shared.Extensions;

public static class ConfigurationExtensions
{
    public static string GetJwtSecret(this IConfiguration configuration)
    {
        return configuration["JWT:Secret"]
               ?? throw new NotFoundException("JWT:Secret");
    }

    public static string GetJwtIssuer(this IConfiguration configuration)
    {
        return configuration["JWT:Issuer"]
               ?? throw new NotFoundException("JWT:Issuer");
    }

    public static string GetJwtAudience(this IConfiguration configuration)
    {
        return configuration["JWT:Audience"]
               ?? throw new NotFoundException("JWT:Audience");
    }

    public static DateTime GetJwtExpiresDateTime(this IConfiguration configuration)
    {
        var expires = configuration.GetJwtExpires();

        return DateTime.UtcNow.AddSeconds(expires);
    }

    public static int GetJwtExpires(this IConfiguration configuration)
    {
        var expires = configuration["JWT:Expires"]
                      ?? throw new NotFoundException("JWT:Expires");

        return int.Parse(expires);
    }

    public static bool IsAuthorizationAllowAnonymous(this IConfiguration configuration)
    {
        var allowAnonymous = configuration["Authorization:AllowAnonymous"];

        if (string.IsNullOrWhiteSpace(allowAnonymous))
        {
            return false;
        }

        return allowAnonymous.Equals(
            bool.TrueString,
            StringComparison.OrdinalIgnoreCase);
    }
}
