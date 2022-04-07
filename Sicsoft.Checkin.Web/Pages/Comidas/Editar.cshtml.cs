using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using APSAL.Models;
using InversionGloblalWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Refit;
using Sicsoft.Checkin.Web.Servicios;

namespace APSAL.Pages.Comidas
{
    public class EditarModel : PageModel
    {
        private readonly ICrudApi<DiasViewModel, int> service;

        [BindProperty]
        public DiasViewModel Dia { get; set; }

        public EditarModel(ICrudApi<DiasViewModel, int> service)
        {
            this.service = service;
        }
        public async Task<IActionResult> OnGetAsync(int id)
        {
            try
            {
                var Roles = ((ClaimsIdentity)User.Identity).Claims.Where(d => d.Type == "Roles").Select(s1 => s1.Value).FirstOrDefault().Split("|");
                if (string.IsNullOrEmpty(Roles.Where(a => a == "7").FirstOrDefault()))
                {
                    return RedirectToPage("/NoPermiso");
                }

                Dia = await service.ObtenerPorId(id);
                return Page();
            }
            catch (ApiException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                return Page();
            }
        }
    }
}
