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
        public DbSet<ApplicationVersion> ApplicationVersions { get; set; }
        public DbSet<ApplicationDependency> ApplicationDependencies { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>(b =>
            {
                b.HasKey(p => p.Id);

                b.HasMany(p => p.Versions)
                .WithOne(p => p.Application)
                .HasForeignKey(p => p.Id)
                .HasPrincipalKey(p => p.Id);

                b.HasMany(p => p.Dependencies)
                .WithOne(p => p.Application)
                .HasForeignKey(p => p.Id)
                .HasPrincipalKey(p => p.Id);
            });

            modelBuilder.Entity<ApplicationVersion>(b =>
            {
                b.HasKey(p => new { p.Id, p.Version });
            });

            modelBuilder.Entity<ApplicationDependency>(b =>
            {
                b.HasKey(p => new { p.Id, p.DependencyId });

                b.HasOne(p => p.Dependency)
                .WithMany(p => p.Dependents)
                .HasForeignKey(p => p.DependencyId)
                .HasPrincipalKey(p => p.Id);

                b.HasOne(p => p.DependencyVersion)
                .WithMany(p => p.Dependents)
                .HasForeignKey(p => new { p.DependencyId, p.Version })
                .HasPrincipalKey(p => new { p.Id, p.Version });
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}