using System.ComponentModel.DataAnnotations;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.DTO
{
    public class CreateCampaignDto
    {
        [Required]
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
