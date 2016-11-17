using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Microsoft.Owin;
using Owin;
using WebApp.Models;

[assembly: OwinStartup(typeof(WebApp.Startup))]

namespace WebApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.Use(async (ctx, next) =>
            {
                Tenant tenant = GetTenantBasedOnUrl(ctx.Request.Uri.Host);
                if (tenant == null)
                {
                    throw new ApplicationException("tenant not found");
                }

                ctx.Environment.Add("MultiTenant", tenant);
                await next();
            });
        }

        private Tenant GetTenantBasedOnUrl(string uriHost)
        {
            if (String.IsNullOrEmpty(uriHost))
            {
                throw new ApplicationException("urlHost must be specified");
            }

            Tenant tenant;
            using (var context = new MultiTenantContext())
            {
                DbSet<Tenant> tenants = context.Tenants;
                tenant = tenants.FirstOrDefault(a => a.DomainName.ToLower().Equals(uriHost)) ??
                         tenants.FirstOrDefault(a => a.Default);
                if (tenant == null)
                {
                    throw new ApplicationException("tenant not found based on URL, no default found");
                }
            }
            return tenant;
        }
    }
}