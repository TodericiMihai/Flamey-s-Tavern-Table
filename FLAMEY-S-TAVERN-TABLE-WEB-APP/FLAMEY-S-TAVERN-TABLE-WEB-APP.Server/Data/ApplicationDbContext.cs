using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data
{
    public class ApplicationDbContext:IdentityDbContext <User>
    {
        public ApplicationDbContext(DbContextOptions <ApplicationDbContext> options) : base(options) { }
    }
}
