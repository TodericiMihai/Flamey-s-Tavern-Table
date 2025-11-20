using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Controllers.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController: ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly ApplicationDbContext context;

        public DashboardController(SignInManager<User> signInManager,
                          UserManager<User> userManager,
                          ApplicationDbContext context)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.context = context;
        }


        [HttpGet("admin"), Authorize]

        public ActionResult adminPage()
        {
            string[] parteners = { "Mikhalos", "GorgobaldZola", "Bobby Mineru", "Balerina Cappucina" };

            return Ok(new { trustedParteners = parteners });
        }

        [HttpGet("home/{email}"), Authorize]// split this into data about user and data about campaigns and players
        public async Task<ActionResult> homePage(string email)
        {
            // Safe Identity lookup
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest(new { message = "User not found" });

            // Load navigation properties (Campaigns)
            var userInfo = await userManager.Users
                .Where(u => u.Id == user.Id)
                .Include(u => u.UserIsDm)
                .Include(u => u.UserIsPlayer)
                .FirstOrDefaultAsync();

            return Ok(new
            {
                userInfo = new
                {
                    userInfo.Id,
                    userInfo.Email,
                    userInfo.UserName,
                    userInfo.CreatedDate,
                    campaigns = userInfo.UserIsDm.Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Description,
                        c.JoinCode
                    }),
                    characters =userInfo.UserIsPlayer.Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Description
                    })
                }
            });
        }

        [HttpPost("campaign/create"), Authorize]
        public async Task<ActionResult> CreateCampaign(CreateCampaignDto dto)
        {
            try
            {
                // Get logged-in user
                var user = await userManager.GetUserAsync(User);

                if (user == null)
                    return Unauthorized(new { message = "You must be logged in" });

                // Generate unique join code
                string joinCode;
                do
                {
                    joinCode = JoinCodeGenerator.Generate(8);
                } while (await context.Campaigns.AnyAsync(c => c.JoinCode == joinCode));

                // Create campaign
                var campaign = new Campaign
                {

                    Id = Guid.NewGuid().ToString(),
                    Name = dto.Name,
                    Description = dto.Description,
                    DMId = user.Id,
                    JoinCode = joinCode,
                    StartDate = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                // Save to database
                context.Campaigns.Add(campaign);
                await context.SaveChangesAsync();

                // Return new campaign
                return Ok(new
                {
                    message = "Campaign created",
                    campaign = new
                    {
                        campaign.Id,
                        campaign.Name,
                        campaign.Description,
                        campaign.JoinCode
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error creating campaign", error = ex.Message });
            }
        }

        [HttpPost("campaign/delete"), Authorize]
        public async Task<ActionResult> DeleteCampaign(DeleteCampaignDto dto)
        {
            try
            {
                var CampaignToDeleteId = dto.CampaignToDeleteId;
                // Get logged-in user
                var user = await userManager.GetUserAsync(User);

                if (user == null)
                    return Unauthorized(new { message = "You must be logged in" });

                // Find the campaign by ID and ensure it belongs to this user (DM)
                var campaign = await context.Campaigns
                    .FirstOrDefaultAsync(c => c.Id == CampaignToDeleteId && c.DMId == user.Id);
                
                if (campaign == null)
                {
                    return NotFound(new { message = "Campaign not found or you do not have permission to delete it." });
                }

                // Delete the campaign
                context.Campaigns.Remove(campaign);
                await context.SaveChangesAsync();


                // Return new campaign
                return Ok(new { message = "Campaign deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error deleting campaign", error = ex.Message });
            }
        }
        [HttpPost("campaign/join"), Authorize]
        public async Task<ActionResult> JoinCampaign(JoinCampaignDto dto)
        {
            try
            {
                var JoinCode = dto.JoinCode;

                // Get logged-in user
                var user = await userManager.GetUserAsync(User);

                if (user == null)
                    return Unauthorized(new { message = "You must be logged in" });

                // Find the campaign by ID and ensure it belongs to this user (DM)
                var campaign = await context.Campaigns
                    .FirstOrDefaultAsync(c => c.JoinCode == JoinCode);

                if (campaign == null)
                {
                    return NotFound(new { message = "Campaign not found or you do not have permission to delete it." });
                }

                if (campaign.DMId == user.Id)
                    return Unauthorized(new { message = "You cannot join your own campaign" });

                var player = new Player
                {

                    Id = Guid.NewGuid().ToString(),
                    Name = " ",
                    Description = " ",
                    OwnerId = user.Id,
                    CampaignId = campaign.Id,   
                };


                context.Players.Add(player);
                await context.SaveChangesAsync();

                return Ok(new
                {
                    message = "You joined a campaign",
                    player = new
                    {
                        player.Id,
                        
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error deleting campaign", error = ex.Message });
            }
        }
    }
}
