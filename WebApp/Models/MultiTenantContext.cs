using System.Collections.Generic;
using System.Data.Entity;

namespace WebApp.Models
{
    [DbConfigurationType(typeof(DatacConfiguration))]
    public class MultiTenantContext : DbContext
    {
        public MultiTenantContext() : base("DefaultConnection")
        {

        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<Session> Sessions { get; set; }
    }

    public class DatacConfiguration : DbConfiguration
    {
        public DatacConfiguration()
        {
            SetDatabaseInitializer(new MultiTenantContextInitializer());
        }
    }

    public class MultiTenantContextInitializer : CreateDatabaseIfNotExists<MultiTenantContext>
    {
        protected override void Seed(MultiTenantContext context)
        {
            var tenants = new List<Tenant>
                {
                    new Tenant()
                    {
                        Name = "SVCC",
                        DomainName = "www.siliconvalley-codecamp.com",
                        Id = 1,
                        Default = true
                    },
                    new Tenant()
                    {
                        Name = "ANGU",
                        DomainName = "angular.com",
                        Id = 3,
                        Default = false
                    },
                    new Tenant()
                    {
                        Name = "CSSC",
                        DomainName = "codestarssummit.com",
                        Id = 2,
                        Default = false
                    }
                };
            tenants.ForEach(a => context.Tenants.Add(a));
            context.SaveChanges();
        }
    }
}