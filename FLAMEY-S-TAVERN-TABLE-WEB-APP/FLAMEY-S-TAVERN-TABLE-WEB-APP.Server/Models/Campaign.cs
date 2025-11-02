using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public  class Campaign
    {

        [Key]
        public int Id {  get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [MaxLength(500)]
        public string ?Description { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime StartDate { get; set; } = DateTime.Now;

        [Column(TypeName = "datetime")]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [Required]
        public bool IsActive { get; set; } = true;

        public  List<Player> Players { get; set; } = [];

        [Required]
        public string DMUserId { get; set; }
        public  DM DMUser { get; set; }

        [Required]
        [MaxLength(8)]
        public string JoinCode { get; set; } = string.Empty;


    }
}
