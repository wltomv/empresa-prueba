using System.Text;
using empresa_api.Models;
using empresa_api.Services.AuthService;
using empresa_api.Services.EmployeeService;
using empresa_api.Services.SalaryService;
using empresa_api.utils.Mail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Loading environment variables
DotNetEnv.Env.Load();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Middleware to validate user authentication
var key=DotNetEnv.Env.GetString("KEY");
var issuer=DotNetEnv.Env.GetString("ISSUER");
var audience=DotNetEnv.Env.GetString("AUDIENCE"); 
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = audience,
        ValidIssuer = issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependency injection
var connectionString=DotNetEnv.Env.GetString("CONNECTIONSTRING");
builder.Services.AddDbContext<companyContext>(
    o => o.UseSqlServer(connectionString)
    );

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<ISalaryService, SalaryService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<MailSettings>();
builder.Services.AddSingleton<Mailer>();

string _MyCors = "Cors";
builder.Services.AddCors(options => {
    options.AddPolicy(_MyCors, b =>{
        b.SetIsOriginAllowed(origin => new Uri(origin).Host== "localhost")
        .AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors(_MyCors);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
