using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public class Item
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public string CharacterId { get; set; }

        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }



    }
}
