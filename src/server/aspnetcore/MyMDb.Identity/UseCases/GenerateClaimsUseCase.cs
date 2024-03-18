namespace MyMDb.Identity.UseCases;

public class GenerateClaimsUseCase
{
    private readonly UserService _userService;

    public GenerateClaimsUseCase(UserService userService)
    {
        _userService = userService;
    }

    public async Task<IEnumerable<Claim>> ExecuteAsync(IdentityUser user)
    {
        if (string.IsNullOrWhiteSpace(user.UserName))
        {
            throw new UnauthorizedException("Invalid user name");
        }

        if (string.IsNullOrWhiteSpace(user.Email))
        {
            throw new UnauthorizedException("Invalid user email");
        }

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Name, user.UserName),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Iat, EpochTime.GetIntDate(DateTime.UtcNow).ToString())
        };

        var roles = await _userService.GetRolesAsync(user);

        foreach (var role in roles)
        {
            claims.Add(new Claim("scope", role));
        }

        return claims;
    }
}
