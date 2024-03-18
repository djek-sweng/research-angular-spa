var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddMyMDbIdentity();
builder.Services.AddMyMDbDataStore();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ClockSkew = TimeSpan.Zero,
            ValidateLifetime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration.GetJwtAudience(),
            ValidIssuer = builder.Configuration.GetJwtIssuer(),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetJwtSecret()))
        };
    });

builder.Services.AddAuthorizationCore(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();

    options.AddPolicy(AuthPolicy.Admin, policy =>
    {
        policy.RequireAuthenticatedUser()
            .RequireClaim("scope", AuthPolicy.Admin);
    });
    options.AddPolicy(AuthPolicy.User, policy =>
    {
        policy.RequireAuthenticatedUser()
            .RequireClaim("scope", AuthPolicy.User);
    });
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ForbiddenExceptionFilterAttribute());
    options.Filters.Add(new InvalidParameterExceptionFilterAttribute());
    options.Filters.Add(new InvalidResultExceptionFilterAttribute());
    options.Filters.Add(new NotFoundExceptionFilterAttribute());
    options.Filters.Add(new NullReferenceExceptionFilterAttribute());
    options.Filters.Add(new UnauthorizedExceptionFilterAttribute());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMyMDbIdentity();
app.UseMyMDbDataStore();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

if (app.Configuration.IsAuthorizationAllowAnonymous())
{
    app.MapControllers().AllowAnonymous();
}
else
{
    app.MapControllers();
}

app.UseCors();

app.Run();
