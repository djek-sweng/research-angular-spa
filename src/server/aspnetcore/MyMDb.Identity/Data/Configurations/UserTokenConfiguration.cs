namespace MyMDb.Identity.Data.Configurations;

public class UserTokenConfiguration : IEntityTypeConfiguration<IdentityUserToken<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder)
    {
        builder.ToTable("_user_tokens");
    }
}
