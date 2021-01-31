using Fudge_It.Data;
using Fudge_It.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fudge_It.Repositories
{
    public class ExpenseTagRepository : IExpenseTagRepository
    {
        private readonly ApplicationDbContext _context;

        public ExpenseTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ExpenseTag> GetExpenseTagsByExpenseId(int expenseId)
        {
            return _context.ExpenseTag.Where(exTag => exTag.ExpenseId == expenseId).ToList();

        }

        public void Add(ExpenseTag exTag)
        {
            _context.Add(exTag);
            _context.SaveChanges();
        }
    }
}
