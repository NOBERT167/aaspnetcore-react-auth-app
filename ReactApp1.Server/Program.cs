
//using Microsoft.EntityFrameworkCore;
//using ReactApp1.Server.Data;
//using Microsoft.SqlServer.Server;
//using Microsoft.AspNetCore.Identity;
//using System.Security.Claims;

//namespace ReactApp1.Server
//{
//	public class Program
//	{
//		public static void Main(string[] args)
//		{
//			var builder = WebApplication.CreateBuilder(args);

//			// Add services to the container.
//			var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
//			builder.Services.AddDbContext<MyDbContext>(options =>
//				options.UseSqlServer(connectionString));

//			builder.Services.AddAuthentication();

//			builder.Services.AddIdentityApiEndpoints<User>()
//				.AddEntityFrameworkStores<MyDbContext>();

//			builder.Services.AddControllers();
//			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//			builder.Services.AddEndpointsApiExplorer();
//			builder.Services.AddSwaggerGen();

//			var app = builder.Build();

//			app.UseDefaultFiles();
//			app.UseStaticFiles();
//			app.MapIdentityApi<User>();

//			app.MapPost("/logout", async (SignInManager<User> signInManager) =>
//			{
//				await signInManager.SignOutAsync();
//				return Results.Ok();
//			}).RequireAuthorization();

//			app.MapPost("/pingauth", (ClaimsPrincipal user) =>
//			{
//				var email = user.FindFirstValue(ClaimTypes.Email);
//				var name = user.FindFirstValue(ClaimTypes.Name);

//				return Results.Json(new { email, name });
//			});

//			// Configure the HTTP request pipeline.
//			if (app.Environment.IsDevelopment())
//			{
//				app.UseSwagger();
//				app.UseSwaggerUI();
//			}

//			app.UseHttpsRedirection();

//			app.UseAuthorization();


//			app.MapControllers();

//			app.MapFallbackToFile("/index.html");

//			app.Run();
//		}
//	}
//}


using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using System.Security.Claims;

namespace ReactApp1.Server
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");

			builder.Services.AddDbContext<MyDbContext>(options => options.UseSqlServer(connectionString));

			builder.Services.AddAuthorization();
			builder.Services.AddIdentityApiEndpoints<User>()
				.AddEntityFrameworkStores<MyDbContext>();

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();
			app.MapIdentityApi<User>();

			app.MapPost("/logout", async (SignInManager<User> signInManager) =>
			{

				await signInManager.SignOutAsync();
				return Results.Ok();

			}).RequireAuthorization();


			app.MapGet("/pingauth", (ClaimsPrincipal user) =>
			{
				var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
				return Results.Json(new { Email = email }); ; // return the email as a plain text response
			}).RequireAuthorization();


			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();

			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}