using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class SpeakerController : MultiTenantMvcController
    {
        private MultiTenantContext context = new MultiTenantContext();

        public async Task<ActionResult> Index()
        {
            //var speakersAll = await context.Speakers.ToListAsync();

            Task<List<Speaker>> speakersAll = new TCache<Task<List<Speaker>>>().
                Get("s-cache", 20,
                    () =>
                    {
                        var speakersAll1 = context.Speakers.ToListAsync();
                        return speakersAll1;
                    });

            var speakers = new List<Speaker>();
            foreach (var speaker in await speakersAll)
            {
                bool speakersInTenant = speaker.Sessions.Any(a => a.Tenant.Name == Tenant.Name);
                if (speakersInTenant)
                {
                    speakers.Add(new Speaker
                    {
                        FirstName = speaker.FirstName,
                        LastName = speaker.LastName,
                        Id = speaker.Id,
                        PictureId = speaker.Id,
                        Bio = speaker.Bio,
                        AllowHtml = speaker.AllowHtml,
                        WebSite = speaker.WebSite,
                        Sessions = speaker.Sessions.
                            Where(a => a.Tenant.Name == Tenant.Name).
                            OrderBy(a => a.Title).ToList()
                    });
                }
            }

            speakers =
                (from speaker in context.Speakers
                 let sessionInTenant = speaker.Sessions.
                 Any(a => a.Tenant.Name == Tenant.Name)
                 where sessionInTenant
                 select speaker).ToList();

            return View("Index", speakers);
        }
    }
}