using System.ComponentModel.DataAnnotations;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public abstract class Character
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string? Description { get; set; }

        public int Age { get; set; }

        public Background? Background { get; set; }

        public Race? Race { get; set; }

        public Class? Class { get; set; }

        public List<Item>? Items { get; set; }

        public List<Spell>? Spells { get; set; }

        public Location? Location { get; set; }


    }
}
