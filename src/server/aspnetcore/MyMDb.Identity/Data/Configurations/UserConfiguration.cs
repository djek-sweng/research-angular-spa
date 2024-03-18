namespace MyMDb.Identity.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<IdentityUser>
{
    public void Configure(EntityTypeBuilder<IdentityUser> builder)
    {
        builder.ToTable("_users");
    }
}
