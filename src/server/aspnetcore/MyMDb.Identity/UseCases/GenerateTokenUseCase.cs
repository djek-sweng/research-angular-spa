namespace MyMDb.Identity.UseCases;

public class GenerateTokenUseCase
{
    private readonly IConfiguration _configuration;
    private readonly GenerateClaimsUseCase _generateClaimsUseCase;
    private readonly UserService _userService;

    public GenerateTokenUseCase(
        IConfiguration configuration,
        GenerateClaimsUseCase generateClaimsUseCase,
        UserService userService)
    {
        _configuration = configuration;
        _generateClaimsUseCase = generateClaimsUseCase;
        _userService = userService;
    }

    public async Task<Token> ExecuteAsync(IdentityUser user)
    {
        if (string.IsNullOrWhiteSpace(user.UserName))
        {
            throw new UnauthorizedException("Invalid user name");
        }

        if (string.IsNullOrWhiteSpace(user.Email))
        {
            throw new UnauthorizedException("Invalid user email");
        }

        var secret = _configuration.GetJwtSecret();
        var key = Encoding.UTF8.GetBytes(secret);

        var securityKey = new SymmetricSecurityKey(key);
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = await _generateClaimsUseCase.ExecuteAsync(user);

        var token = new JwtSecurityToken(
            issuer: _configuration.GetJwtIssuer(),
            audience: _configuration.GetJwtAudience(),
            notBefore: DateTime.UtcNow,
            expires: _configuration.GetJwtExpiresDateTime(),
            claims: claims,
            signingCredentials: signingCredentials);

        var tokenHandler = new JwtSecurityTokenHandler();
        tokenHandler.OutboundClaimTypeMap.Clear();

        return new Token
        {
            UserId = user.Id,
            UserName = user.UserName,
            UserEmail = user.Email,
            Expires = _configuration.GetJwtExpires(),
            ExpiresAt = token.ValidTo,
            AccessToken = tokenHandler.WriteToken(token),
            Roles = (await _userService.GetRolesAsync(user)).AsReadOnly()
        };
    }
}
