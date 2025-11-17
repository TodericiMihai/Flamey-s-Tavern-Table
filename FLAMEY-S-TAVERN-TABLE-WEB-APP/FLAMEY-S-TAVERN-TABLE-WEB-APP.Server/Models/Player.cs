using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models
{
    public class Player : Character
    {
        [Required]
        public string OwnerId { get; set; }  //FK to User 
        // This will be used to search for campains where the user is one of the players

        [ForeignKey(nameof(OwnerId))]
        public User Owner { get; set; }
        
    }
}
