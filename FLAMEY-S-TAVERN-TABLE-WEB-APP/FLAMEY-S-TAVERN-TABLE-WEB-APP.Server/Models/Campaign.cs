using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public  class Campaign
    {

        [Key]
        public string Id {  get; set; }

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

        // Many players per campaign via join table
        public ICollection<Player> Players { get; set; } = new List<Player>();

        [Required]
        public string DMId { get; set; }  //FK to User 
        // This will be used to search for campains where the user is the DM

        [ForeignKey(nameof(DMId))]
        public User DM { get; set; }

        [Required]
        [MaxLength(8)]
        public string JoinCode { get; set; } = string.Empty;

        public List<NPC> NPCs { get; set; } = new List<NPC>();

        public List<Location> Locations {  get; set; } =new List<Location> ();

    }
}
