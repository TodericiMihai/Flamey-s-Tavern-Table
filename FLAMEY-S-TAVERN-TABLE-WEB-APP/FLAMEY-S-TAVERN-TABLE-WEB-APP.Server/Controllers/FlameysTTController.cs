using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.DTO;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlameyTTController: ControllerBase
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly ApplicationDbContext context;

        public FlameyTTController(SignInManager<User> signInManager,
                          UserManager<User> userManager,
                          ApplicationDbContext context)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.context = context;
        }


        [HttpPost("register")]
        //mod here to use a dto
        public async Task<ActionResult> registerUser(User user)
        {
     
            IdentityResult result = new();

            try
            {
                User user_ = new User()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Name = user.Name,
                };
                result = await userManager.CreateAsync(user_,user.PasswordHash);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }


            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again.", error = ex.Message });
            }

            return Ok(new { message = "Register Successfully.", result = result });

        }

        [HttpPost("login")]

        public async Task<ActionResult> logInUser(Login login)
        {

            try
            {
                User user_ = await userManager.FindByEmailAsync(login.Email);

                if (user_ != null) {
                    login.Username = user_.UserName;
                }

                if (!user_.EmailConfirmed) {

                    user_.EmailConfirmed = true;
                }

                var result = await signInManager.PasswordSignInAsync(user_, login.Password, login.Remember, false);


                if (!result.Succeeded)
                {
                    return Unauthorized(new { message = "Check your login credentials and try again." });
                }

                user_.LastLogin = DateTime.Now;

                var updateResult = await userManager.UpdateAsync(user_);

                

            }
            catch (Exception ex)
            {
                return BadRequest(new { mesasge = "Something went wrong, please try again." + ex.Message });
            }

            return Ok(new { message = "Login Successfully." });

        }

        [HttpGet("logout"), Authorize]

        public async Task<ActionResult> logOutUser()
        {


            try
            {
                await signInManager.SignOutAsync();

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Somethign went wrong, please try again. " + ex.Message });
            }

            return Ok(new { message = "You are free to go" });

        }

        [HttpGet("admin"), Authorize]

        public ActionResult adminPage()
        {
            string[] parteners = { "Mikhalos", "GorgobaldZola", "Bobby Mineru", "Balerina Cappucina" };

            return Ok(new { trustedParteners = parteners });
        }

        [HttpGet("home/{email}"), Authorize]
        public async Task<ActionResult> homePage(string email)
        {
            // Safe Identity lookup
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
                return BadRequest(new { message = "User not found" });

            // Load navigation properties (Campaigns)
            var userInfo = await userManager.Users
                .Where(u => u.Id == user.Id)
                .Include(u => u.Campaigns)
                .FirstOrDefaultAsync();

            return Ok(new
            {
                user = new
                {
                    userInfo.Id,
                    userInfo.Name,
                    userInfo.Email,
                    userInfo.UserName,
                    campaigns = userInfo.Campaigns.Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Description
                    })
                }
            });
        }

        [HttpPost("campaign/create"), Authorize]
        public async Task<IActionResult> CreateCampaign(CreateCampaignDto dto)
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



        [HttpGet("iahjwevdf")]

        public async Task<ActionResult> CheckUser()
        {

            User currentuser = new();

            try
            {
                var user_ = HttpContext.User;
                var principals = new ClaimsPrincipal(user_);
                var result = signInManager.IsSignedIn(principals);
                if (result)
                {
                    currentuser = await signInManager.UserManager.GetUserAsync(principals);
                }
                else
                {
                    return Forbid();
                }

            }
            catch (Exception ex) 
            {
                return BadRequest(new { message = "Something went wrong, please try again" + ex.Message });
            }

            return Ok(new { message = "LogIn", user = currentuser });

        }
    }
}
