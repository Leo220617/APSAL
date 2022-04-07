using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APSAL.Models
{
    public class ComidasViewModel
    {
        public int id { get; set; }

        public int? idDia { get; set; }

        [StringLength(500)]
        public string Descripcion { get; set; }

        public string Foto { get; set; }

        public int? Calorias { get; set; }
    }
}
