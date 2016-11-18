using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class SpeakerController : MultiTenantMvcController
    {
        public ActionResult Index()
        {
            var speakers = new List<Speaker>();
            using (var context = new MultiTenantContext())
            {
                speakers =
                    (from speaker in context.Speakers
                     let sessionInTenant = speaker.Sessions.
                     Any(a => a.Tenant.Name == Tenant.Name)
                     where sessionInTenant
                     select speaker).ToList();
            }
            return View("Index", speakers);
        }
    }
}