using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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

        internal static readonly object Locker = new object();

        private Tenant GetTenantBasedOnUrl(string uriHost)
        {
            if (String.IsNullOrEmpty(uriHost))
            {
                throw new ApplicationException("urlHost must be specified");
            }

            Tenant tenant;
            
            string cacheName = "all-tenants-cache-name";
            int cacheTimeOutSeconds = 30;

            List<Tenant> tenants = new TCache<List<Tenant>>().Get(cacheName, cacheTimeOutSeconds,
                () =>
                {
                    List<Tenant> tenants1;
                    using (var context = new MultiTenantContext())
                    {
                        tenants1 = context.Tenants.ToList();
                    }
                    return tenants1;
                });

            tenant = tenants.FirstOrDefault(a => a.DomainName.ToLower().Equals(uriHost)) ??
                     tenants.FirstOrDefault(a => a.Default);
            if (tenant == null)
            {
                throw new ApplicationException("tenant not found based on URL, no default found");
            }

            return tenant;
        }
    }
}