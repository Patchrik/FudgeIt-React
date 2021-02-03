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

        public List<ExpenseTag> GetAllExpenseTags()
        {
            return _context.ExpenseTag.Include(ext => ext.Tag).Include(ext => ext.Expense).ToList();
        }

        public List<ExpenseTag> GetExpenseTagsByTagId(int tagId)
        {
            return _context.ExpenseTag.Include(ext => ext.Expense).Where(ext => ext.TagId == tagId).ToList();
        }

        public void Add(ExpenseTag exTag)
        {
            _context.Add(exTag);
            _context.SaveChanges();
        }

        
    }
}
