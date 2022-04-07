using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APSAL.Models
{
    public class DiasViewModel
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
    }
}
