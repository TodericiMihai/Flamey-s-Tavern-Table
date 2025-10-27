using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlameyTavernTableController(SignInManager<User> sm, UserManager<User> um) : ControllerBase
    {
        private readonly SignInManager<User> signInManager = sm;
        private readonly UserManager<User> userManager = um;


        [HttpPost("register")]

        public async Task<ActionResult> registerUser(User user)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                User user_ = new User()
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Name = user.Name,
                };
                result = await userManager.CreateAsync(user_);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                message = "Register Successfully.";

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again.", error = ex.Message });
            }

            return Ok(new { message = message, result = result });

        }

        [HttpPost("login")]

        public async Task<ActionResult> logInUser(Login login)
        {
            string message = "";


            try
            {
                User user_ = await userManager.FindByEmailAsync(login.Email);

                if (user_ != null && !user_.EmailConfirmed)
                {
                    user_.EmailConfirmed = true;
                }

                var result = await signInManager.PasswordSignInAsync(user_, login.Password, login.Remember, false);


                if (!result.Succeeded)
                {
                    return Unauthorized("Check your login credentials and try again.");
                }

                user_.LastLogin = DateTime.Now;

                var updateResult = await userManager.UpdateAsync(user_);

                message = "Login Successfully.";

            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong, please try again." + ex.Message);
            }

            return Ok(new { message = message });

        }

        [HttpGet("logout"), Authorize]

        public async Task<ActionResult> logOutUser()
        {
            string message = "You are free to go";

            try
            {
                await signInManager.SignOutAsync();

            }
            catch (Exception ex)
            {
                return BadRequest("Somethign went wrong, please try again. " + ex.Message);
            }

            return Ok(new { message = message });

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
            User userInfo = await userManager.FindByEmailAsync(email);

            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again" });
            }

            return Ok(new { userInfo = userInfo });
        }

        [HttpGet("iahjwevdf"), Authorize]

        public async Task<ActionResult> checkUser(string email)
        {
            string message = "LogIn";
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
                    return Forbid("Access Denied!");
                }

            }
            catch (Exception ex) 
            {
                return BadRequest("Something went wrong, please try again" + ex.Message);
            }

            return Ok(new { message = message, user = currentuser });

        }
    }
}
