
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<ApplicationDbContext>(Options =>
            {
                Options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
            });

            builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ApplicationDbContext>();
            
            //custom user identification constrains
            builder.Services.AddIdentityCore<User>(Options =>
            {
                Options.SignIn.RequireConfirmedAccount = true;

                //password settings
                Options.Password.RequireDigit = true;
                Options.Password.RequireNonAlphanumeric = true;
                Options.Password.RequireUppercase = true;
                Options.Password.RequiredLength = 6;
                Options.Password.RequiredUniqueChars = 0;

                //if incorrect for 5 times => five minutes locked
                Options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                Options.Lockout.MaxFailedAccessAttempts = 5;
                Options.Lockout.AllowedForNewUsers = true;

                //user settings
                Options.User.AllowedUserNameCharacters = 
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_@+";
                Options.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<ApplicationDbContext>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.MapIdentityApi<User>();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
