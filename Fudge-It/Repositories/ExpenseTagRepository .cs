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
        
        public List<ExpenseTag> GetExpenseTagsByExpId(int expId)
        {
            return _context.ExpenseTag.Include(ext => ext.Expense).Where(ext => ext.ExpenseId == expId).ToList();
        }

        public ExpenseTag GetById(int id)
        {
            return _context.ExpenseTag.Include(expTag => expTag.Expense).Include(expTag => expTag.Tag).Where(expTag => expTag.Id == id).FirstOrDefault();
        }
        public ExpenseTag GetByExpenseIdAndTagId(int Exid, int TagId)
        {
            return _context.ExpenseTag.Where(expTag => expTag.ExpenseId == Exid && expTag.TagId == TagId).FirstOrDefault();
        }

        public void Add(ExpenseTag exTag)
        {
            _context.Add(exTag);
            _context.SaveChanges();
        }

        public void Delete(int id) 
        {
            var expTag = GetById(id);

            _context.ExpenseTag.Remove(expTag);
            _context.SaveChanges();
        }
        
    }
}
