using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{

    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
                  : base(options)
        {
        }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Module> Modules { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Module>(b =>
            {
                b.HasKey(p => p.Id);
                b.HasMany(p => p.Applications)
                .WithOne(p => p.Module)
                .HasForeignKey(p => p.ModuleId)
                .HasPrincipalKey(p => p.Id);
            });

            modelBuilder.Entity<Application>(b =>
           {
               b.HasKey(p => new { p.Id, p.Version });
           });



            base.OnModelCreating(modelBuilder);
        }
    }
}