namespace MyMDb.Identity.Services;

public class RoleService : RoleManager<IdentityRole>
{
    public RoleService(
        IRoleStore<IdentityRole> store,
        IEnumerable<IRoleValidator<IdentityRole>> roleValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        ILogger<RoleManager<IdentityRole>> logger)
        : base(
            store,
            roleValidators,
            keyNormalizer,
            errors,
            logger)
    {
    }
}
