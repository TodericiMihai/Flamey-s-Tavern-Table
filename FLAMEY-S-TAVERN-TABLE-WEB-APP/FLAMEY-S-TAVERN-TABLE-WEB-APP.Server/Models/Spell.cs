using System.ComponentModel.DataAnnotations;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public class Spell
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }



    }
}
