namespace MyMDb.Identity.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddMyMDbIdentity(this IServiceCollection services)
    {
        services.AddDbContext<AccountDbContext>(ExecuteOptionsBuilder);

        services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 4;
                options.Password.RequiredUniqueChars = 1;

                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);

                options.User.RequireUniqueEmail = true;

                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
            })
            .AddEntityFrameworkStores<AccountDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<UserService>();
        services.AddScoped<RoleService>();

        services.AddScoped<AdminDeleteUserUseCase>();
        services.AddScoped<AdminReadUsersUseCase>();
        services.AddScoped<CreateUserUseCase>();
        services.AddScoped<GenerateClaimsUseCase>();
        services.AddScoped<GenerateTokenUseCase>();
        services.AddScoped<InitialiseAdminUseCase>();
        services.AddScoped<InitialiseRolesUseCase>();
        services.AddScoped<SignInUserUseCase>();
        services.AddScoped<SignUpUserUseCase>();

        return services;
    }

    private static void ExecuteOptionsBuilder(DbContextOptionsBuilder builder)
    {
        var dataSource = Path.Combine(Environment.CurrentDirectory, "db_account.sqlite");
        var connectionString = $"Data Source={dataSource}";

        builder.UseSqlite(connectionString,
            options => options.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
    }
}
