using Fudge_It.Data;
using Fudge_It.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ApplicationDbContext _context;

        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Expense> GetExpensesByUserProfileId(int userProfileId)
        {
            return _context.Expense.Where(up => up.UserProfileId == userProfileId).ToList();

        }

        public void Add(Expense expense)
        {
            _context.Add(expense);
            _context.SaveChanges();
        }
    }
}
