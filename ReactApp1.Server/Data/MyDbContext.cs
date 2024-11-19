using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ReactApp1.Server.Data
{
	public class MyDbContext : IdentityDbContext<User>
	{
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}

	}
}
