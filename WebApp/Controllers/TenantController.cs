using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class TenantController : Controller
    {
        public ActionResult Index()
        {
            using (var context = new MultiTenantContext())
            {
                var tenants = context.Tenants.ToList();
                return View(tenants);
            }
        }
    }
}