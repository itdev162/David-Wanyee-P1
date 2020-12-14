using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Value> Values { get; set; }

        public DbSet<Post> Posts {get;set;}

        public DbSet<ImageCollection> ImageCollections{get; set;}
        
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Value>().HasData(
            new Value { Id = 1, Name = "Value1"},
            new Value { Id = 2, Name = "Value2"},
            new Value { Id = 3, Name = "Value3"}
            );
        }

        
    }
}