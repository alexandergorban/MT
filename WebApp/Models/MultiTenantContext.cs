using System.Data.Entity;

namespace WebApp.Models
{
    public class MultiTenantContext : DbContext
    {
        public MultiTenantContext() : base("DefaultConnection")
        {
            
        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<Session> Sessions { get; set; }
    }
}