using Fudge_It.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { 
        
        }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<ExpenseTag> ExpenseTag { get; set; }
    }
}
