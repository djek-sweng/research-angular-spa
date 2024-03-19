namespace MyMDb.Shared.Extensions;

public static class ClaimsPrincipalExtensions
{
    private const string UserIdKey = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    private const string UserIdKeyAlt = "sub";

    public static Guid UserId(this ClaimsPrincipal identity)
    {
        if (Guid.TryParse(identity.FindFirst(UserIdKey)?.Value, out var userId))
        {
            return userId;
        }

        if (Guid.TryParse(identity.FindFirst(UserIdKeyAlt)?.Value, out var userIdAlt))
        {
            return userIdAlt;
        }

        throw new ForbiddenException("Invalid user identifier");
    }
}
