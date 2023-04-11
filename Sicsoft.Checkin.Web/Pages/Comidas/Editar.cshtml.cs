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
        private readonly ICrudApi<ComidasViewModel, int> serviceComida;


        [BindProperty]
        public DiasViewModel Dia { get; set; }


        [BindProperty]
        public ComidasViewModel[] Comidas { get; set; }

        public EditarModel(ICrudApi<DiasViewModel, int> service, ICrudApi<ComidasViewModel, int> serviceComida)
        {
            this.service = service;
            this.serviceComida = serviceComida;
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

                ParametrosFiltros filtro = new ParametrosFiltros();
                filtro.Codigo1 = Dia.id;

                Comidas = await serviceComida.ObtenerLista(filtro);

                return Page();
            }
            catch (ApiException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                return Page();
            }
        }

        public async Task<IActionResult> OnPostGenerarAsync(RecibidoComidasViewModel recibidos)
        {
            try
            {

                DiasViewModel dia = new DiasViewModel();
                dia.id = recibidos.id;
                dia.idUsuario = recibidos.idUsuario;
                dia.Observaciones = recibidos.Observaciones;
                dia.Dia = recibidos.Dia;
                dia.Anno = recibidos.Anno;
                dia.Fecha = recibidos.Fecha;
                dia.Mes = recibidos.Mes;
                

                await service.Editar(dia);

                await serviceComida.AgregarBulk(recibidos.Comidas);

                var obj = new
                {
                    success = true,
                    mensaje = ""
                };

                return new JsonResult(obj);
            }
            catch (ApiException ex)
            {

                var obj = new
                {
                    success = false,
                    mensaje = "Error en el exception: -> " + ex.Content.ToString()
                };
                return new JsonResult(obj);
            }
            catch (Exception ex)
            {

                var obj = new
                {
                    success = false,
                    mensaje = "Error en el exception: -> " + ex.Message.ToString()
                };
                return new JsonResult(obj);
            }
        }
    }
}
