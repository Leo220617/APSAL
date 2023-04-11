using System;
using System.ComponentModel.DataAnnotations;

namespace APSAL.Models
{
    public class RecibidoComidasViewModel
    {
        public int id { get; set; }
        public int idUsuario { get; set; }
        [StringLength(20)]
        public string Dia { get; set; }

        [StringLength(20)]
        public string Mes { get; set; }

        [StringLength(20)]
        public string Anno { get; set; }

        public DateTime? Fecha { get; set; }

        [StringLength(500)]
        public string Observaciones { get; set; }

        public ComidasViewModel[] Comidas { get; set; }
    


    }
}
