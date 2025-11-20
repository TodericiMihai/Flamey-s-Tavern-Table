using FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace FLAMEY_S_TAVERN_TABLE_WEB_APP.Server.Data
{
    public class ApplicationDbContext:IdentityDbContext <User>
    {
        public ApplicationDbContext(DbContextOptions <ApplicationDbContext> options) : base(options) { }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<NPC> NPCs { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<Spell> Spells { get; set; }
        public DbSet<Item> Items { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // ---------- User → Campaign (DM) ----------
            builder.Entity<User>()
                .HasMany(u => u.UserIsDm)
                .WithOne(c => c.DM)
                .HasForeignKey(c => c.DMId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- User → Player ----------
            builder.Entity<User>()
                .HasMany(u => u.UserIsPlayer)
                .WithOne(p => p.Owner)
                .HasForeignKey(p => p.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ---------- Campaign → Players ----------
            builder.Entity<Campaign>()
                .HasMany(c => c.Players)
                .WithOne(p => p.Campaign)
                .HasForeignKey(p => p.CampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- Character → Items ----------
            builder.Entity<Character>()
                .HasMany(p => p.Items)
                .WithOne(i => i.Character)
                .HasForeignKey(i => i.CharacterId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- Character → Spells ----------
            builder.Entity<Character>()
                .HasMany(p => p.Spells)
                .WithOne(s => s.Character)
                .HasForeignKey(s => s.CharacterId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- Campaign → NPCs ----------
            builder.Entity<Campaign>()
                .HasMany(c => c.NPCs)
                .WithOne(n => n.Campaign)
                .HasForeignKey(n => n.CampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            // ---------- Campaign → Locations ----------
            builder.Entity<Campaign>()
                .HasMany(c => c.Locations)
                .WithOne(l => l.Campaign)
                .HasForeignKey(l => l.CampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Character>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<Character>("Character")
                .HasValue<Player>("Player")
                .HasValue<NPC>("NPC");
        }
    }

}
