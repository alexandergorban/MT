using System.Web.Mvc;

namespace WebApp.Controllers
{
    public class SpeakerController : MultiTenantMvcController
    {
        public ActionResult Index()
        {
            return View("Index", Tenant);
        }
    }
}